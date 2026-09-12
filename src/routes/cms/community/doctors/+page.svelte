<script lang="ts">
	import Sidebar from '$lib/components/dashboard/Sidebar.svelte';
	import Topbar from '$lib/components/dashboard/Topbar.svelte';
	import { enhance } from '$app/forms';

	export let data;

	$: profile = data.profile;
	$: doctors = (data.doctors ?? []).filter(d => d.id !== profile?.id);
	$: followedDoctorIds = new Set(data.followedDoctorIds ?? []);

	let loadingId: string | null = null;

	function getInitials(name: string) {
		if (!name) return 'DR';

		return name
			.split(' ')
			.filter(Boolean)
			.slice(0, 2)
			.map((part) => part.charAt(0).toUpperCase())
			.join('');
	}

	function getAvatar(doctor: any) {
		return (
			doctor.avatar_url ||
			doctor.image_url ||
			doctor.photo_url ||
			doctor.profile_picture ||
			doctor.avatar ||
			null
		);
	}
</script>

<svelte:head>
	<title>Community Doctors | Jarurat Care</title>
</svelte:head>

<div class="dashboard">
	<Sidebar isReviewer={profile?.is_reviewer === true} />

	<div class="content">
		<Topbar
			doctorName={profile?.full_name || ''}
			email={profile?.email || ''}
			unreadCount={0}
		/>

		<main class="page">
			<div class="page-header">
				<div>
					<div class="eyebrow">COMMUNITY</div>
					<h1>Doctors Community</h1>
					<p>Connect with doctors and explore their professional profiles.</p>
				</div>

				<div class="doctor-count">
					{doctors.length} {doctors.length === 1 ? 'Doctor' : 'Doctors'}
				</div>
			</div>

			{#if doctors.length === 0}
				<div class="empty-state">
					<div class="empty-icon">👨‍⚕️</div>
					<h2>No doctors found</h2>
					<p>There are currently no registered doctors in the community.</p>
				</div>
			{:else}
				<div class="doctor-grid">
					{#each doctors as doctor}
						{@const avatar = getAvatar(doctor)}
						{@const isSelf = doctor.id === profile?.id}
						{@const isFollowed = followedDoctorIds.has(doctor.id)}

						<article class="doctor-card">
							<div class="card-top">
								<div class="avatar">
									{#if avatar}
										<img src={avatar} alt={doctor.full_name || 'Doctor'} />
									{:else}
										<span>{getInitials(doctor.full_name)}</span>
									{/if}
								</div>

								<div class="doctor-main">
									<h2>{doctor.full_name || 'Doctor'}</h2>

									{#if doctor.specialization && !doctor.specialization.includes('@')}
										<p class="specialization">{doctor.specialization}</p>
									{:else}
										<p class="specialization">Medical Professional</p>
									{/if}

									{#if doctor.organization}
										<p class="organization">{doctor.organization}</p>
									{/if}
								</div>
							</div>

							<div class="stats">
								<div>
									<strong>{doctor.followers_count ?? 0}</strong>
									<span>Followers</span>
								</div>

								<div>
									<strong>{doctor.following_count ?? 0}</strong>
									<span>Following</span>
								</div>
							</div>

							<div class="actions">
								<a class="profile-btn" href={`/cms/community/doctors/${doctor.id}`}>
									View Profile
								</a>

								{#if !isSelf}
									<form
										method="POST"
										action={followedDoctorIds.has(doctor.id) ? '?/unfollow' : '?/follow'}
										use:enhance={() => {
											loadingId = doctor.id;
											const currentlyFollowed = followedDoctorIds.has(doctor.id);
											// Optimistic UI Update
											if (currentlyFollowed) {
												followedDoctorIds.delete(doctor.id);
												doctor.followers_count = Math.max(0, (doctor.followers_count || 0) - 1);
											} else {
												followedDoctorIds.add(doctor.id);
												doctor.followers_count = (doctor.followers_count || 0) + 1;
											}
											followedDoctorIds = followedDoctorIds; // Trigger reactivity
											doctors = doctors;

											return async ({ result, update }) => {
												loadingId = null;
												if (result.type !== 'success') {
													// Revert on failure
													await update();
												} else {
													await update({ reset: false });
												}
											};
										}}
									>
										<input type="hidden" name="doctor_id" value={doctor.id} />

										<button
											type="submit"
											class:following={followedDoctorIds.has(doctor.id)}
											class="follow-btn"
											disabled={loadingId === doctor.id}
										>
											{#if loadingId === doctor.id}
												<span class="loading-spinner"></span>
												Wait...
											{:else}
												{followedDoctorIds.has(doctor.id) ? 'Following' : 'Follow'}
											{/if}
										</button>
									</form>
								{:else}
									<div class="self-badge">You</div>
								{/if}
							</div>
						</article>
					{/each}
				</div>
			{/if}
		</main>
	</div>
</div>

<style>
	.dashboard {
		min-height: 100vh;
		display: flex;
		background: #f5f7fb;
	}

	.content {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
	}

	.page {
		width: 100%;
		padding: 32px;
		box-sizing: border-box;
	}

	.page-header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;
		margin-bottom: 28px;
	}

	.eyebrow {
		color: #526b91;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 1px;
		margin-bottom: 7px;
	}

	.page-header h1 {
		margin: 0 0 7px;
		color: #102044;
		font-size: 30px;
		font-weight: 700;
	}

	.page-header p {
		margin: 0;
		color: #687892;
		font-size: 15px;
	}

	.doctor-count {
		padding: 10px 17px;
		border-radius: 999px;
		background: #eaf1ff;
		color: #315bdc;
		font-size: 14px;
		font-weight: 700;
		white-space: nowrap;
	}

	.doctor-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
		gap: 22px;
	}

	.doctor-card {
		background: white;
		border: 1px solid #e3e8f0;
		border-radius: 20px;
		padding: 22px;
		box-shadow: 0 5px 18px rgba(15, 23, 42, 0.05);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.doctor-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 10px 28px rgba(15, 23, 42, 0.09);
	}

	.card-top {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.avatar {
		width: 68px;
		height: 68px;
		min-width: 68px;
		border-radius: 50%;
		background: linear-gradient(135deg, #e7efff, #dbeafe);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		color: #315bdc;
		font-size: 20px;
		font-weight: 700;
	}

	.avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.doctor-main {
		min-width: 0;
	}

	.doctor-main h2 {
		margin: 0 0 5px;
		color: #172554;
		font-size: 18px;
		font-weight: 700;
	}

	.specialization {
		margin: 0 0 4px;
		color: #315bdc;
		font-size: 14px;
		font-weight: 600;
	}

	.organization {
		margin: 0;
		color: #7a879c;
		font-size: 13px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.stats {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin: 22px 0;
		padding: 15px 0;
		border-top: 1px solid #edf0f5;
		border-bottom: 1px solid #edf0f5;
		text-align: center;
	}

	.stats > div:first-child {
		border-right: 1px solid #edf0f5;
	}

	.stats strong {
		display: block;
		color: #172554;
		font-size: 18px;
		margin-bottom: 3px;
	}

	.stats span {
		color: #8490a4;
		font-size: 12px;
	}

	.actions {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}

	.actions form {
		margin: 0;
	}

	.profile-btn,
	.follow-btn,
	.self-badge {
		width: 100%;
		min-height: 42px;
		box-sizing: border-box;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 13px;
		font-weight: 600;
		text-decoration: none;
		cursor: pointer;
	}

	.profile-btn {
		background: #f1f5ff;
		color: #315bdc;
		border: 1px solid #dce6ff;
	}

	.profile-btn:hover {
		background: #e7efff;
	}

	.follow-btn {
		border: 1px solid #315bdc;
		background: #315bdc;
		color: white;
	}

	.follow-btn:hover:not(:disabled) {
		background: #264bc4;
	}

	.follow-btn.following {
		background: white;
		color: #315bdc;
	}

	.follow-btn.following:hover:not(:disabled) {
		background: #e7efff;
	}

	.follow-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.loading-spinner {
		width: 14px;
		height: 14px;
		border: 2px solid currentColor;
		border-right-color: transparent;
		border-radius: 50%;
		animation: spin 0.75s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.self-badge {
		background: #f4f6f8;
		color: #778399;
		border: 1px solid #e4e8ee;
	}

	.empty-state {
		background: white;
		border: 1px solid #e3e8f0;
		border-radius: 20px;
		padding: 70px 30px;
		text-align: center;
	}

	.empty-icon {
		font-size: 45px;
		margin-bottom: 12px;
	}

	.empty-state h2 {
		margin: 0 0 8px;
		color: #172554;
		font-size: 20px;
	}

	.empty-state p {
		margin: 0;
		color: #718096;
		font-size: 14px;
	}

	@media (max-width: 768px) {
		.page {
			padding: 20px;
		}

		.page-header {
			align-items: flex-start;
			flex-direction: column;
		}

		.doctor-grid {
			grid-template-columns: 1fr;
		}
	}
</style>