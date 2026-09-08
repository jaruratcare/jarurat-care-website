import { fail, redirect } from '@sveltejs/kit';
import { createAdminNotification } from '$lib/server/notifications';
import type { PageServerLoad, Actions } from './$types';

/*
 * Cancer-related interests
 *
 * These interests are available to both Readers and Doctors.
 * They are stored in the existing profiles.interests ARRAY column.
 */
const CANCER_INTERESTS = [
	'Cancer Research',
	'Cancer Prevention',
	'Cancer Diagnosis',
	'Cancer Treatment',
	'Cancer Immunotherapy',
	'Cancer Genomics',
	'Cancer Genetics',
	'Precision Oncology',
	'Clinical Trials',
	'Breast Cancer',
	'Lung Cancer',
	'Blood Cancer',
	'Colorectal Cancer',
	'Prostate Cancer',
	'Gynecologic Cancers',
	'Pediatric Cancer',
	'Cancer Nutrition',
	'Cancer Survivorship',
	'Palliative Care',
	'Psycho-Oncology'
];

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, '/cms/login');
	}

	const { data: profile, error } = await locals.supabase
		.from('profiles')
		.select('*')
		.eq('id', session.user.id)
		.maybeSingle();

	if (error) {
		console.error('Error loading profile:', error);
	}

	return {
		profile: profile ?? null,
		userId: session.user.id,
		userEmail: session.user.email ?? '',
		cancerInterests: CANCER_INTERESTS
	};
};

/*
 * Extract form data
 */
function extractFormData(formData: FormData) {
	const role = (formData.get('role') as string) ?? '';

	const common = {
		full_name: (formData.get('fullName') as string) ?? '',
		email: (formData.get('email') as string) ?? '',
		bio: (formData.get('bio') as string) ?? '',
		role,

		email_notifications:
			formData.get('emailNotifications') === 'on',

		newsletters:
			formData.get('newsletters') === 'on',

		event_updates:
			formData.get('eventUpdates') === 'on'
	};

	/*
	 * ============================
	 * READER PROFILE
	 * ============================
	 */
	if (role === 'Reader') {
		return {
			...common,

			profession:
				(formData.get('profession') as string) ?? '',

			location:
				(formData.get('location') as string) ?? '',

			organization:
				(formData.get('organization') as string) ?? '',

			/*
			 * Cancer interests
			 */
			interests:
				formData.getAll('interests') as string[]
		};
	}

	/*
	 * ============================
	 * DOCTOR PROFILE
	 * ============================
	 */
	return {
		...common,

		qualification:
			(formData.get('qualification') as string) ?? '',

		designation:
			(formData.get('designation') as string) ?? '',

		specialization:
			(formData.get('specialization') as string) ?? '',

		affiliation:
			(formData.get('affiliation') as string) ?? '',

		medical_reg_id:
			(formData.get('medicalRegId') as string) ?? '',

		city_state:
			(formData.get('cityState') as string) ?? '',

		experience:
			(formData.get('experience') as string) ?? '',

		patients_treated:
			(formData.get('patientsTreated') as string) ?? '',

		publications:
			(formData.get('publications') as string) ?? '',

		awards:
			(formData.get('awards') as string) ?? '',

		citations:
			(formData.get('citations') as string) ?? '',

		/*
		 * Existing Doctor expertise
		 */
		expertise:
			formData.getAll('expertise') as string[],

		/*
		 * Doctors can also select cancer interests.
		 */
		interests:
			formData.getAll('interests') as string[],

		is_confirmed:
			formData.get('isConfirmed') === 'on'
	};
}

export const actions: Actions = {
	/*
	 * ============================
	 * SAVE AS DRAFT
	 * ============================
	 */
	save: async ({ request, locals }) => {
		const session = await locals.getSession();

		if (!session) {
			return fail(401, {
				message: 'Not logged in'
			});
		}

		const formData = await request.formData();

		const profileData = extractFormData(formData);

		const { error } = await locals.supabase
			.from('profiles')
			.upsert(
				{
					id: session.user.id,
					...profileData,
					profile_completed: false
				},
				{
					onConflict: 'id'
				}
			);

		if (error) {
			console.error('Save draft error:', error);

			return fail(500, {
				message:
					'Could not save draft. Please try again.'
			});
		}

		return {
			success: true,
			draft: true
		};
	},

	/*
	 * ============================
	 * SUBMIT PROFILE
	 * ============================
	 */
	submit: async ({ request, locals }) => {
		const session = await locals.getSession();

		if (!session) {
			return fail(401, {
				message: 'Not logged in'
			});
		}

		const formData = await request.formData();

		const profileData = extractFormData(formData);

		/*
		 * Doctors must confirm their information.
		 */
		if (
			profileData.role === 'Doctor' &&
			!('is_confirmed' in profileData
				? profileData.is_confirmed
				: false)
		) {
			return fail(400, {
				message:
					'Please confirm your details are accurate before submitting.'
			});
		}

		/*
		 * ============================
		 * VERIFICATION STATUS
		 * ============================
		 *
		 * Doctors:
		 *     pending
		 *
		 * Readers:
		 *     approved immediately
		 */
		const verification_status =
			profileData.role === 'Doctor'
				? 'pending'
				: 'approved';

		/*
		 * ============================
		 * REVIEWER STATUS
		 * ============================
		 *
		 * A newly registered doctor must
		 * NEVER become a reviewer before
		 * Super Admin approval.
		 *
		 * Super Admin will later change
		 * this to true when approving
		 * the doctor as a Reviewer.
		 */
		const is_reviewer =
			profileData.role === 'Doctor'
				? false
				: false;

		const { error } = await locals.supabase
			.from('profiles')
			.upsert(
				{
					id: session.user.id,
					...profileData,

					/*
					 * Profile is now complete.
					 */
					profile_completed: true,

					/*
					 * Doctor = pending
					 * Reader = approved
					 */
					verification_status,

					/*
					 * New doctors are NOT reviewers
					 * until Super Admin approves them.
					 */
					is_reviewer
				},
				{
					onConflict: 'id'
				}
			);

		if (error) {
			console.error('Submit error:', error);

			return fail(500, {
				message:
					'Could not submit profile. Please try again.'
			});
		}

		/*
		 * ============================
		 * ADMIN NOTIFICATION
		 * ============================
		 *
		 * Notify Super Admin that a
		 * doctor is waiting for approval.
		 */
		if (profileData.role === 'Doctor') {
			try {
				await createAdminNotification(
					'New Verification Request',
					`A new user (${profileData.full_name}) has submitted their profile for verification as a ${profileData.role}.`,
					'info',
					undefined,
					'/cms/super-admin?tab=doctor_verification',
					'super_admin_only'
				);
			} catch (notificationError) {
				/*
				 * Do not fail profile submission
				 * just because notification failed.
				 */
				console.error(
					'Error creating admin notification:',
					notificationError
				);
			}
		}

		/*
		 * ============================
		 * REDIRECT
		 * ============================
		 *
		 * IMPORTANT:
		 *
		 * Doctor:
		 *     /cms/pending
		 *
		 * Reader:
		 *     /
		 *
		 * Doctor cannot enter the dashboard
		 * until Super Admin approves them.
		 */
		if (profileData.role === 'Doctor') {
			throw redirect(
				303,
				'/cms/pending'
			);
		}

		throw redirect(303, '/');
	}
};