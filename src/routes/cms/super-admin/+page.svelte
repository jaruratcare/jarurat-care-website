<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import {
		LayoutDashboard,
		Users,
		FileText,
		BookOpen,
		ShieldCheck,
		LogOut,
		Globe,
		CheckCircle,
		Clock,
		AlertCircle,
		Search,
		TrendingUp,
		Heart,
		Bookmark,
		MessageCircle,
		Eye,
		BarChart3,
		UserCheck,
		Stethoscope,
		Star,
		ArrowUpRight,
		Loader2
	} from 'lucide-svelte';
	import AdminTopbar from '$lib/components/admin/AdminTopbar.svelte';

	export let data;
	let actionLoading: string | null = null;

	$: pendingDoctors = data?.pendingDoctors || [];
	$: verifiedDoctors = data?.verifiedDoctors || [];
	$: users = data?.users || [];
	$: approvedArticles = data?.approvedArticles || [];
	$: approvedResearch = data?.approvedResearch || [];
	$: cmsContents = data?.cmsContents || [];
	$: publishingDoctors = data?.publishingDoctors || [];
	$: publishedContent = data?.publishedContent || [];
	$: currentUser = data?.currentUser || {};
	$: analytics = data?.analytics || {};

	$: uniqueVisitors = Number(analytics.uniqueVisitors ?? 0);

	$: totalShares = Number(
		analytics.totalShares ??
			analytics.shares ??
			0
	);

	$: dailyActiveUsersValue = Array.isArray(analytics.dailyActiveUsers)
		? analytics.dailyActiveUsers.reduce(
				(sum: number, item: any) =>
					sum +
					Number(
						item.users ??
							item.count ??
							item.value ??
							0
					),
				0
			)
		: Number(analytics.dailyActiveUsers ?? 0);

	$: dailyActiveUsersTrend = Array.isArray(
		analytics.dailyActiveUsers
	)
		? analytics.dailyActiveUsers
		: [];

	/*
	 * IMPORTANT:
	 * pendingDoctors should already contain only doctors
	 * whose verification_status is pending.
	 */
	$: pendingVerificationCount = pendingDoctors.length;

	$: recentContent = publishedContent.slice(0, 6);

	$: topPublishingDoctors = [...publishingDoctors]
		.sort(
			(a: any, b: any) =>
				(b.articles || 0) -
				(a.articles || 0)
		)
		.slice(0, 5);

	let activeSection = 'overview';
	let isMounted = false;
	
	onMount(() => {
		const tabParam = $page.url.searchParams.get('tab');
		if (tabParam) {
			activeSection = tabParam;
		} else {
			const stored = localStorage.getItem('superAdminActiveTab');
			if (stored) {
				activeSection = stored;
			}
		}
		isMounted = true;
	});

	$: {
		if (isMounted) {
			const tabParam = $page.url.searchParams.get('tab');
			if (tabParam && tabParam !== activeSection) {
				activeSection = tabParam;
			}
		}
	}

	$: {
		if (isMounted && typeof localStorage !== 'undefined') {
			localStorage.setItem('superAdminActiveTab', activeSection);
		}
	}

	let searchTerm = '';

	$: filteredUsers = users.filter((user: any) => {
		const search = (searchTerm || '')
			.toString()
			.toLowerCase();

		return (
			String(user.full_name || '')
				.toLowerCase()
				.includes(search) ||
			String(user.email || '')
				.toLowerCase()
				.includes(search) ||
			String(user.role || '')
				.toLowerCase()
				.includes(search)
		);
	});

	function formatNumber(
		value: number | null | undefined
	) {
		if (!value) return '0';

		return new Intl.NumberFormat('en-US', {
			notation: 'compact',
			maximumFractionDigits: 1
		}).format(value);
	}

	function formatDate(date: string) {
		if (!date) return 'N/A';

		return new Date(date).toLocaleDateString(
			'en-US',
			{
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			}
		);
	}

	function getStatusClass(status: string) {
		switch (status) {
			case 'published':
				return 'status published';

			case 'approved':
				return 'status approved';

			case 'under_review':
				return 'status review';

			case 'changes_requested':
			case 'rejected':
				return 'status rejected';

			case 'pending':
				return 'status pending';

			default:
				return 'status';
		}
	}

	/*
	 * =========================================================
	 * DOCTOR APPROVAL
	 * =========================================================
	 */

	function handleDoctorApproval(
		role: 'author' | 'reviewer',
		doctorId: string
	) {
		return () => {
			actionLoading = `${role}-${doctorId}`;
			
			// Optimistic UI Update: Immediately remove the doctor from pending list
			if (data && data.pendingDoctors) {
				data.pendingDoctors = data.pendingDoctors.filter((d: any) => d.id !== doctorId);
				data = { ...data };
			}

			return async ({
				result,
				update
			}: any) => {
				actionLoading = null;
				if (result.type === 'success') {
					if (role === 'author') {
						toast.success(
							'Doctor approved as Author.'
						);
					} else {
						toast.success(
							'Doctor approved as Reviewer.'
						);
					}

					await update({
						reset: false
					});
				} else {
					toast.error(
						role === 'author'
							? 'Failed to approve doctor as Author.'
							: 'Failed to approve doctor as Reviewer.'
					);
				}
			};
		};
	}

	/*
	 * =========================================================
	 * DOCTOR REJECTION
	 * =========================================================
	 */

	function handleDoctorReject(doctorId: string) {
		return ({
			cancel
		}: any) => {
			const confirmed = confirm(
				'Are you sure you want to reject this doctor verification request?'
			);

			if (!confirmed) {
				cancel();
				return;
			}

			actionLoading = `reject-${doctorId}`;

			return async ({ result, update }: any) => {
				actionLoading = null;
				if (result.type === 'success') {
					toast.success(
						'Doctor verification request rejected.'
					);
				} else {
					toast.error(
						'Failed to reject doctor verification request.'
					);
				}

				await update({
					reset: false
				});
			};
		};
	}

	/*
	 * =========================================================
	 * ROLE UPDATE
	 * =========================================================
	 */

	const handleRoleUpdate = () => {
		return async ({
			formData
		}: any) => {
			const userId = formData.get('userId');
			const newRole = formData.get('newRole');

			const userIndex = users.findIndex(
				(u: any) => u.id === userId
			);

			let oldRole = null;

			if (userIndex !== -1) {
				oldRole = users[userIndex].role;

				users[userIndex].role = newRole;
				users = [...users];
			}

			return async ({
				result,
				update
			}: any) => {
				if (result.type === 'success') {
					toast.success(
						'Role updated successfully!'
					);

					await update({
						reset: false
					});
				} else {
					if (
						userIndex !== -1 &&
						oldRole
					) {
						users[userIndex].role =
							oldRole;

						users = [...users];
					}

					toast.error(
						'Failed to update role.'
					);

					await update({
						reset: false
					});
				}
			};
		};
	};

	/*
	 * =========================================================
	 * CMS CREATE
	 * =========================================================
	 */

	const handleCMSCreate = () => {
		return async ({
			result,
			update
		}: any) => {
			if (result.type === 'success') {
				toast.success(
					'CMS content created successfully!'
				);

				await update({
					reset: false
				});
			} else {
				toast.error(
					'Failed to create CMS content.'
				);

				await update({
					reset: false
				});
			}
		};
	};

	/*
	 * =========================================================
	 * CMS PUBLISH
	 * =========================================================
	 */

	const handleCMSPublish = () => {
		return async ({
			result,
			update
		}: any) => {
			if (result.type === 'success') {
				const status =
					result.data?.action ===
					'cms_published'
						? 'published'
						: 'draft';

				toast.success(
					`Content successfully marked as ${status}.`
				);

				await update({
					reset: false
				});
			} else {
				toast.error(
					'Failed to change content status.'
				);

				await update({
					reset: false
				});
			}
		};
	};
</script>

<svelte:head>
	<title>Super Admin Dashboard | Jarurat Care</title>
</svelte:head>

<div class="dashboard">

	<!-- ===================================================== -->
	<!-- SIDEBAR -->
	<!-- ===================================================== -->

	<aside class="sidebar">

		<div class="sidebar-brand">

			<div class="brand-icon">
				<img
					src="/logo.png"
					alt="Jarurat Care"
				/>
			</div>

			<div>
				<div class="brand-name">
					Jarurat Care
				</div>

				<div class="brand-role">
					Super Admin
				</div>
			</div>

		</div>

		<div class="sidebar-content">

			<div class="menu-label">
				MAIN
			</div>

			<button
				class:active={
					activeSection === 'overview'
				}
				class="menu-item"
				on:click={() =>
					(activeSection = 'overview')
				}
			>
				<LayoutDashboard size={18} />
				<span>Overview</span>
			</button>

			<div class="menu-label">
				MANAGEMENT
			</div>

			<button
				class:active={
					activeSection ===
					'doctor-verification'
				}
				class="menu-item"
				on:click={() =>
					(activeSection =
						'doctor-verification')
				}
			>
				<ShieldCheck size={18} />

				<span>
					Doctor Verification
				</span>

				{#if pendingDoctors.length > 0}
					<span class="menu-count">
						{pendingDoctors.length}
					</span>
				{/if}
			</button>

			<button
				class:active={activeSection === 'verified-doctors'}
				class="menu-item"
				on:click={() => (activeSection = 'verified-doctors')}
			>
				<CheckCircle size={18} />
				<span>Verified Doctors</span>

				{#if verifiedDoctors.length > 0}
					<span class="menu-count">
						{verifiedDoctors.length}
					</span>
				{/if}
			</button>

			<button
				class:active={
					activeSection === 'publishing'
				}
				class="menu-item"
				on:click={() =>
					(activeSection = 'publishing')
				}
			>
				<UserCheck size={18} />
				<span>Publishing Power</span>
			</button>

			<button
				class:active={
					activeSection === 'articles'
				}
				class="menu-item"
				on:click={() =>
					(activeSection = 'articles')
				}
			>
				<FileText size={18} />
				<span>Articles</span>
			</button>

			<button
				class:active={
					activeSection === 'research'
				}
				class="menu-item"
				on:click={() =>
					(activeSection = 'research')
				}
			>
				<BookOpen size={18} />
				<span>Research Papers</span>
			</button>

			<button
				class:active={
					activeSection === 'cms'
				}
				class="menu-item"
				on:click={() =>
					(activeSection = 'cms')
				}
			>
				<Globe size={18} />
				<span>CMS Content</span>
			</button>

			<button
				class:active={
					activeSection === 'users'
				}
				class="menu-item"
				on:click={() =>
					(activeSection = 'users')
				}
			>
				<Users size={18} />
				<span>Manage Users</span>
			</button>

			<button
				class:active={
					activeSection === 'community'
				}
				class="menu-item"
				on:click={() =>
					(activeSection = 'community')
				}
			>
				<Users size={18} />
				<span>Community</span>
			</button>

			<div class="menu-label">
				ANALYTICS
			</div>

			<button
				class:active={
					activeSection === 'analytics'
				}
				class="menu-item"
				on:click={() =>
					(activeSection = 'analytics')
				}
			>
				<BarChart3 size={18} />
				<span>Analytics</span>
			</button>

		</div>

		<div class="sidebar-bottom">

			<a
				href="/"
				target="_blank"
				class="website-link"
			>
				<Globe size={17} />
				<span>View Website</span>
				<ArrowUpRight size={14} />
			</a>

			<a
				href="/cms/logout"
				data-sveltekit-reload
				class="logout-link"
			>
				<LogOut size={17} />
				<span>Logout</span>
			</a>

		</div>

	</aside>

	<!-- ===================================================== -->
	<!-- MAIN CONTENT -->
	<!-- ===================================================== -->

	<main class="main">

		<AdminTopbar />

		<div class="page-content">

			<!-- ================================================= -->
			<!-- OVERVIEW -->
			<!-- ================================================= -->

			{#if activeSection === 'overview'}

				<div class="section-heading">
					<div>
						<h2>
							Admin Overview
						</h2>

						<p>
							A quick snapshot of platform
							activity and content.
						</p>
					</div>
				</div>

				<div class="overview-grid">

					<div class="stat-card">
						<div class="stat-icon blue">
							<Users size={20} />
						</div>

						<div>
							<span>Total Users</span>

							<strong>
								{formatNumber(
									analytics.totalUsers
								)}
							</strong>
						</div>
					</div>

					<div class="stat-card">
						<div class="stat-icon purple">
							<Stethoscope size={20} />
						</div>

						<div>
							<span>Total Doctors</span>

							<strong>
								{formatNumber(
									analytics.totalDoctors
								)}
							</strong>
						</div>
					</div>

					<div class="stat-card">
						<div class="stat-icon green">
							<FileText size={20} />
						</div>

						<div>
							<span>
								Published Content
							</span>

							<strong>
								{formatNumber(
									(analytics.totalArticles ||
										0) +
										(analytics.totalResearchPapers ||
											0)
								)}
							</strong>
						</div>
					</div>

					<div class="stat-card">
						<div class="stat-icon orange">
							<Clock size={20} />
						</div>

						<div>
							<span>
								Pending Verifications
							</span>

							<strong>
								{formatNumber(
									pendingVerificationCount
								)}
							</strong>
						</div>
					</div>

				</div>

				<div class="overview-two-column">

					<div class="panel">

						<div class="panel-header">
							<div>
								<h3>
									Recent Published Content
								</h3>

								<p>
									Latest articles, research
									and CMS updates
								</p>
							</div>

							<button
								class="text-button"
								on:click={() =>
									(activeSection =
										'articles')
								}
							>
								View All
							</button>
						</div>

						{#if recentContent.length}

							<div class="content-list">

								{#each recentContent as item}

									<div class="content-row">

										<div class="content-type-icon">

											{#if item.type === 'Research'}
												<BookOpen size={16} />
											{:else if item.type === 'CMS'}
												<Globe size={16} />
											{:else}
												<FileText size={16} />
											{/if}

										</div>

										<div class="content-row-main">

											<strong>
												{item.title ||
													'Untitled'}
											</strong>

											<span>
												{item.type} •
												{formatDate(
													item.created_at
												)}
											</span>

										</div>

									</div>

								{/each}

							</div>

						{:else}

							<div class="empty-small">
								No published content yet.
							</div>

						{/if}

					</div>

					<div class="panel">

						<div class="panel-header">

							<div>
								<h3>Quick Stats</h3>

								<p>
									Overall engagement snapshot
								</p>
							</div>

						</div>

						<div class="quick-stats">

							<div>
								<span>Total Views</span>
								<strong>
									{formatNumber(
										analytics.totalViews
									)}
								</strong>
							</div>

							<div>
								<span>Total Engagement</span>
								<strong>
									{formatNumber(
										analytics.totalEngagement
									)}
								</strong>
							</div>

							<div>
								<span>Total Likes</span>
								<strong>
									{formatNumber(
										analytics.totalLikes
									)}
								</strong>
							</div>

							<div>
								<span>CMS Content</span>
								<strong>
									{formatNumber(
										analytics.totalCMSContent
									)}
								</strong>
							</div>

						</div>

					</div>

				</div>

				<div class="panel">

					<div class="panel-header">

						<div>
							<h3>
								Top Publishing Doctors
							</h3>

							<p>
								Ranked by published articles
								and research
							</p>
						</div>

						<Star size={16} />

					</div>

					{#if topPublishingDoctors.length}

						<div class="author-list">

							{#each topPublishingDoctors as doctor, index}

								<div class="author-row">

									<div class="author-rank">
										{index + 1}
									</div>

									<div class="author-avatar">
										{(
											doctor.name ||
											'D'
										).charAt(0)}
									</div>

									<div class="author-main">

										<strong>
											{doctor.name}
										</strong>

										<span>
											{doctor.specialization}
										</span>

									</div>

									<div class="author-count">

										<strong>
											{doctor.articles}
										</strong>

										<span>
											articles
										</span>

									</div>

								</div>

							{/each}

						</div>

					{:else}

						<div class="empty-small">
							No publishing activity yet.
						</div>

					{/if}

				</div>

			<!-- ================================================= -->
			<!-- DOCTOR VERIFICATION -->
			<!-- ================================================= -->

			{:else if activeSection === 'doctor-verification'}

				<div class="section-heading">

					<div>

						<h2>
							Doctor Verification
						</h2>

						<p>
							Review and manage doctor
							verification requests.
						</p>

					</div>

				</div>

				<div class="panel">

					<div class="panel-header">

						<div>

							<h3>
								Doctor Requests
							</h3>

							<p>
								{pendingDoctors.length}
								pending doctor
								{pendingDoctors.length === 1
									? ''
									: 's'}
							</p>

						</div>

					</div>

					{#if pendingDoctors.length === 0}

						<div class="empty-small">
							<CheckCircle
								size={28}
							/>

							<div>
								No pending doctor
								verification requests.
							</div>
						</div>

					{:else}

						<div class="table-wrapper">

							<table>

								<thead>

									<tr>
										<th>Doctor</th>
										<th>Email</th>
										<th>Specialization</th>
										<th>Status</th>
										<th>Action</th>
									</tr>

								</thead>

								<tbody>

									{#each pendingDoctors as doctor}

										<tr>

											<td>

												<div class="user-cell">

													<div class="user-avatar">
														{(
															doctor.full_name ||
															'D'
														).charAt(0)}
													</div>

													<div>

														<strong>
															{doctor.full_name ||
																'Unnamed Doctor'}
														</strong>

														<span>
															{doctor.designation ||
																'Doctor'}
														</span>

													</div>

												</div>

											</td>

											<td>
												{doctor.email ||
													'N/A'}
											</td>

											<td>
												{doctor.specialization ||
													'General'}
											</td>

											<td>

												<span
													class={getStatusClass(
														doctor.verification_status ||
															'pending'
													)}
												>
													{doctor.verification_status ||
														'pending'}
												</span>

											</td>

											<td>

												{#if doctor.verification_status === 'pending' ||
													!doctor.verification_status}

													<div class="verification-actions">

														<!-- AUTHOR -->
														<form
															method="POST"
															action="?/approve"
															class="inline-form"
															use:enhance={handleDoctorApproval(
																'author',
																doctor.id
															)}
														>

															<input
																type="hidden"
																name="doctorId"
																value={doctor.id}
															/>

															<input
																type="hidden"
																name="assignedRole"
																value="author"
															/>

															<button
																type="submit"
																class="action-button approve-button"
																disabled={actionLoading !== null}
															>
																{#if actionLoading === `author-${doctor.id}`}
																	<Loader2 size={14} class="spin-icon" />
																	Approving...
																{:else}
																	<CheckCircle
																		size={14}
																	/>
																	Approve as
																	Author
																{/if}
															</button>

														</form>

														<!-- REVIEWER -->
														<form
															method="POST"
															action="?/approve"
															class="inline-form"
															use:enhance={handleDoctorApproval(
																'reviewer',
																doctor.id
															)}
														>

															<input
																type="hidden"
																name="doctorId"
																value={doctor.id}
															/>

															<input
																type="hidden"
																name="assignedRole"
																value="reviewer"
															/>

															<button
																type="submit"
																class="action-button reviewer-button"
																disabled={actionLoading !== null}
															>
																{#if actionLoading === `reviewer-${doctor.id}`}
																	<Loader2 size={14} class="spin-icon" />
																	Approving...
																{:else}
																	<ShieldCheck
																		size={14}
																	/>
																	Approve as
																	Reviewer
																{/if}
															</button>

														</form>

														<!-- REJECT -->
														<form
															method="POST"
															action="?/reject"
															class="inline-form"
															use:enhance={handleDoctorReject(doctor.id)}
														>

															<input
																type="hidden"
																name="doctorId"
																value={doctor.id}
															/>

															<button
																type="submit"
																class="action-button reject-button"
																disabled={actionLoading !== null}
															>
																{#if actionLoading === `reject-${doctor.id}`}
																	<Loader2 size={14} class="spin-icon" />
																	Rejecting...
																{:else}
																	<AlertCircle
																		size={14}
																	/>
																	Reject
																{/if}
															</button>

														</form>

													</div>

												{:else if doctor.verification_status === 'approved'}

													<span class="published-label">
														Approved
													</span>

												{:else if doctor.verification_status === 'rejected'}

													<span class="rejected-label">
														Rejected
													</span>

												{/if}

											</td>

										</tr>

									{/each}

								</tbody>

							</table>

						</div>

					{/if}

				</div>

			<!-- ================================================= -->
			<!-- VERIFIED DOCTORS -->
			<!-- ================================================= -->

			{:else if activeSection === 'verified-doctors'}

				<div class="section-heading">

					<div>
						<h2>Verified Doctors</h2>
						<p>
							List of all fully verified doctors on the platform.
						</p>
					</div>

				</div>

				<div class="panel">

					<div class="panel-header">

						<div>
							<h3>Verified Doctors</h3>
							<p>
								{verifiedDoctors.length} verified doctor records found
							</p>
						</div>

					</div>

					<div class="table-wrapper">

						<table class="popular-table">

							<thead>
								<tr>
									<th>Doctor</th>
									<th>Email</th>
									<th>Specialization</th>
									<th>Status</th>
								</tr>
							</thead>

							<tbody>

								{#each verifiedDoctors as doctor}

									<tr>

										<td>
											<div class="user-cell">
												<div class="user-avatar">
													{(doctor.full_name || 'D').charAt(0)}
												</div>
												<div>
													<strong>{doctor.full_name}</strong>
													<div class="meta">{doctor.specialization || ''}</div>
												</div>
											</div>
										</td>

										<td>
											<div class="meta">{doctor.email}</div>
										</td>

										<td>
											<div class="meta">{doctor.specialization || 'Not specified'}</div>
										</td>

										<td>
											<span class={getStatusClass(doctor.verification_status)}>
												{doctor.verification_status.replace('_', ' ')}
											</span>
										</td>

									</tr>

								{/each}

							</tbody>
						</table>
					</div>
				</div>

			<!-- ================================================= -->
			<!-- PUBLISHING POWER -->
			<!-- ================================================= -->

			{:else if activeSection === 'publishing'}

				<div class="section-heading">

					<div>

						<h2>
							Publishing Power
						</h2>

						<p>
							Control which verified doctors
							can publish content.
						</p>

					</div>

				</div>

				<div class="panel">

					<div class="table-wrapper">

						<table>

							<thead>

								<tr>
									<th>Doctor</th>
									<th>Specialization</th>
									<th>Published Content</th>
									<th>Permission</th>
									<th>Action</th>
								</tr>

							</thead>

							<tbody>

								{#each publishingDoctors as doctor}

									<tr>

										<td>

											<div class="user-cell">

												<div class="user-avatar">
													{(
														doctor.name ||
														'D'
													).charAt(0)}
												</div>

												<div>

													<strong>
														{doctor.name}
													</strong>

													<span>
														Verified Doctor
													</span>

												</div>

											</div>

										</td>

										<td>
											{doctor.specialization}
										</td>

										<td>
											{doctor.articles}
										</td>

										<td>

											<span
												class:granted={
													doctor.status ===
													'granted'
												}
												class:revoked={
													doctor.status ===
													'revoked'
												}
												class="permission-badge"
											>
												{doctor.status}
											</span>

										</td>

										<td>

											<form
												method="POST"
												action="?/togglePublishingPower"
											>

												<input
													type="hidden"
													name="doctorId"
													value={doctor.id}
												/>

												<input
													type="hidden"
													name="status"
													value={
														doctor.status ===
														'granted'
															? 'revoked'
															: 'granted'
													}
												/>

												<button class="action-button">
													{doctor.status ===
													'granted'
														? 'Revoke'
														: 'Grant'}
												</button>

											</form>

										</td>

									</tr>

								{/each}

							</tbody>

						</table>

					</div>

				</div>

			<!-- ================================================= -->
			<!-- ARTICLES -->
			<!-- ================================================= -->

			{:else if activeSection === 'articles'}

				<div class="section-heading">

					<div>
						<h2>Articles</h2>
						<p>
							Manage article publication
							workflow.
						</p>
					</div>

				</div>

				<div class="panel">

					<div class="table-wrapper">

						<table>

							<thead>

								<tr>
									<th>Title</th>
									<th>Author</th>
									<th>Status</th>
									<th>Created</th>
									<th>Action</th>
								</tr>

							</thead>

							<tbody>

								{#each approvedArticles as article}

									<tr>

										<td>
											<strong>
												{article.title}
											</strong>
										</td>

										<td>
											{article.author_name_credentials ||
												'Unknown'}
										</td>

										<td>
											<span
												class={getStatusClass(
													article.status
												)}
											>
												{article.status}
											</span>
										</td>

										<td>
											{formatDate(
												article.created_at
											)}
										</td>

										<td>

											{#if article.status !== 'published'}

												<form
													method="POST"
													action="?/publishContent"
												>

													<input
														type="hidden"
														name="articleId"
														value={article.id}
													/>

													<input
														type="hidden"
														name="articleType"
														value="article"
													/>

													<button
														class="action-button approve-button"
													>
														Publish
													</button>

												</form>

											{:else}

												<span class="published-label">
													Published
												</span>

											{/if}

										</td>

									</tr>

								{/each}

							</tbody>

						</table>

					</div>

				</div>

			<!-- ================================================= -->
			<!-- RESEARCH -->
			<!-- ================================================= -->

			{:else if activeSection === 'research'}

				<div class="section-heading">

					<div>
						<h2>
							Research Papers
						</h2>

						<p>
							Manage research publication
							workflow.
						</p>
					</div>

				</div>

				<div class="panel">

					<div class="table-wrapper">

						<table>

							<thead>

								<tr>
									<th>Title</th>
									<th>Author</th>
									<th>Status</th>
									<th>Created</th>
									<th>Action</th>
								</tr>

							</thead>

							<tbody>

								{#each approvedResearch as research}

									<tr>

										<td>
											<strong>
												{research.title}
											</strong>
										</td>

										<td>
											{research.author_name_credentials ||
												'Unknown'}
										</td>

										<td>

											<span
												class={getStatusClass(
													research.status
												)}
											>
												{research.status}
											</span>

										</td>

										<td>
											{formatDate(
												research.created_at
											)}
										</td>

										<td>

											{#if research.status !== 'published'}

												<form
													method="POST"
													action="?/publishContent"
												>

													<input
														type="hidden"
														name="articleId"
														value={research.id}
													/>

													<input
														type="hidden"
														name="articleType"
														value="research"
													/>

													<button
														class="action-button approve-button"
													>
														Publish
													</button>

												</form>

											{:else}

												<span class="published-label">
													Published
												</span>

											{/if}

										</td>

									</tr>

								{/each}

							</tbody>

						</table>

					</div>

				</div>

			<!-- ================================================= -->
			<!-- CMS CONTENT -->
			<!-- ================================================= -->

			{:else if activeSection === 'cms'}

				<div class="section-heading">

					<div>

						<h2>
							CMS Content
						</h2>

						<p>
							Manage website content from
							the central CMS.
						</p>

					</div>

				</div>

				<div class="panel">

					<div class="panel-header">

						<div>

							<h3>
								Create CMS Content
							</h3>

							<p>
								Publish blogs, news, events,
								FAQs and other website
								content.
							</p>

						</div>

					</div>

					<form
						method="POST"
						use:enhance={handleCMSCreate}
						action="?/createCMSContent"
						class="cms-create-form"
					>

						<select name="contentType">
							<option value="blog">
								Blog
							</option>

							<option value="news">
								News
							</option>

							<option value="event">
								Event
							</option>

							<option value="faq">
								FAQ
							</option>

							<option value="campaign">
								Campaign
							</option>
						</select>

						<input
							name="title"
							placeholder="Title"
							required
						/>

						<input
							name="slug"
							placeholder="Slug (optional)"
						/>

						<input
							name="category"
							placeholder="Category"
						/>

						<input
							name="tags"
							placeholder="Tags separated by commas"
						/>

						<input
							name="featuredImage"
							placeholder="Featured image URL"
						/>

						<textarea
							name="excerpt"
							placeholder="Excerpt"
						></textarea>

						<textarea
							name="content"
							placeholder="Content"
							rows="8"
							required
						></textarea>

						<input
							name="seoTitle"
							placeholder="SEO title"
						/>

						<textarea
							name="seoDescription"
							placeholder="SEO description"
						></textarea>

						<select name="status">
							<option value="draft">
								Save Draft
							</option>

							<option value="published">
								Publish Now
							</option>
						</select>

						<button
							class="action-button approve-button"
							type="submit"
						>
							Create Content
						</button>

					</form>

				</div>

				<div class="panel">

					<div class="table-wrapper">

						<table>

							<thead>

								<tr>
									<th>Title</th>
									<th>Type</th>
									<th>Category</th>
									<th>Status</th>
									<th>Created</th>
									<th>Actions</th>
								</tr>

							</thead>

							<tbody>

								{#each cmsContents as content}

									<tr>

										<td>
											<strong>
												{content.title}
											</strong>
										</td>

										<td>
											<span class="category-badge">
												{content.content_type}
											</span>
										</td>

										<td>
											{content.category ||
												'—'}
										</td>

										<td>

											<span
												class={getStatusClass(
													content.status
												)}
											>
												{content.status}
											</span>

										</td>

										<td>
											{formatDate(
												content.created_at
											)}
										</td>

										<td class="cms-actions-cell">

											<form
												method="POST"
												use:enhance={handleCMSPublish}
												action="?/toggleCMSPublish"
												class="inline-form"
											>

												<input
													type="hidden"
													name="id"
													value={content.id}
												/>

												<input
													type="hidden"
													name="newStatus"
													value={
														content.status ===
														'published'
															? 'draft'
															: 'published'
													}
												/>

												<button
													class="action-button approve-button"
													type="submit"
												>
													{content.status ===
													'published'
														? 'Unpublish'
														: 'Publish'}
												</button>

											</form>

											<form
												method="POST"
												action="?/deleteCMSContent"
												class="inline-form"
												use:enhance={({ cancel }) => {

													if (
														!confirm(
															'Are you sure you want to delete this content?'
														)
													) {
														cancel();
													}

													return async ({
														result,
														update
													}) => {

														if (
															result.type ===
															'success'
														) {
															toast.success(
																'Content deleted.'
															);
														} else {
															toast.error(
																'Failed to delete content.'
															);
														}

														await update({
															reset: false
														});
													};
												}}
											>

												<input
													type="hidden"
													name="id"
													value={content.id}
												/>

												<button
													class="action-button reject-button"
													type="submit"
												>
													Delete
												</button>

											</form>

										</td>

									</tr>

								{/each}

							</tbody>

						</table>

					</div>

				</div>

			<!-- ================================================= -->
			<!-- COMMUNITY -->
			<!-- ================================================= -->

			{:else if activeSection === 'community'}

				<div class="section-heading">

					<div>

						<h2>
							Community
						</h2>

						<p>
							Browse all doctors and their
							community activity.
						</p>

					</div>

				</div>

				<div class="panel">

					<div class="table-wrapper">

						<table>

							<thead>

								<tr>
									<th>Doctor</th>
									<th>Specialization</th>
									<th>Organization</th>
									<th>Followers</th>
									<th>Following</th>
									<th>Content</th>
									<th>Status</th>
								</tr>

							</thead>

							<tbody>

								{#each data.communityDoctors || [] as doctor}

									<tr>

										<td>

											<div class="user-cell">

												<div class="user-avatar">
													{(
														doctor.name ||
														'D'
													).charAt(0)}
												</div>

												<div>

													<strong>
														{doctor.name}
													</strong>

													<span>
														{doctor.email ||
															'Doctor'}
													</span>

												</div>

											</div>

										</td>

										<td>
											{doctor.specialization ||
												'General'}
										</td>

										<td>
											{doctor.organization ||
												'—'}
										</td>

										<td>
											{formatNumber(
												doctor.followersCount
											)}
										</td>

										<td>
											{formatNumber(
												doctor.followingCount
											)}
										</td>

										<td>
											{formatNumber(
												(doctor.articlesCount ||
													0) +
													(doctor.researchCount ||
														0)
											)}
										</td>

										<td>

											<span
												class={getStatusClass(
													doctor.verification_status
												)}
											>
												{doctor.verification_status ||
													'pending'}
											</span>

										</td>

									</tr>

								{/each}

							</tbody>

						</table>

					</div>

				</div>

			<!-- ================================================= -->
			<!-- USERS -->
			<!-- ================================================= -->

			{:else if activeSection === 'users'}

				<div class="section-heading">

					<div>

						<h2>
							Manage Users
						</h2>

						<p>
							View and manage registered
							platform users.
						</p>

					</div>

				</div>

				<div class="panel">

					<div class="panel-header">

						<div>

							<h3>Users</h3>

							<p>
								{users.length}
								registered users
							</p>

						</div>

						<div class="search-box">

							<Search size={16} />

							<input
								type="text"
								bind:value={searchTerm}
								placeholder="Search users..."
							/>

						</div>

					</div>

					<div class="table-wrapper">

						<table>

							<thead>

								<tr>
									<th>User</th>
									<th>Email</th>
									<th>Role</th>
									<th>Verification</th>
									<th>Joined</th>
								</tr>

							</thead>

							<tbody>

								{#each filteredUsers as user}

									<tr>

										<td>

											<div class="user-cell">

												<div class="user-avatar">
													{(
														user.full_name ||
														'U'
													).charAt(0)}
												</div>

												<div>

													<strong>
														{user.full_name ||
															'Unnamed User'}
													</strong>

													<span>
														{user.profession ||
															'User'}
													</span>

												</div>

											</div>

										</td>

										<td>
											{user.email}
										</td>

										<td>

											<form
												method="POST"
												use:enhance={handleRoleUpdate}
												action="?/updateRole"
												class="role-form"
											>

												<input
													type="hidden"
													name="userId"
													value={user.id}
												/>

												<select
													name="newRole"
													value={user.role}
													disabled={
														user.id ===
														currentUser.id
													}
												>

													<option value="Reader">
														Reader
													</option>

													<option value="Doctor">
														Doctor
													</option>

													<option value="Admin">
														Admin
													</option>

													<option value="Super_Admin">
														Super_Admin
													</option>

												</select>

												{#if user.id !== currentUser.id}

													<button
														type="submit"
														class="save-button"
													>
														<CheckCircle
															size={14}
														/>

														Save
													</button>

												{/if}

											</form>

										</td>

										<td>

											<span
												class={getStatusClass(
													user.verification_status
												)}
											>
												{user.verification_status ||
													'N/A'}
											</span>

										</td>

										<td>
											{formatDate(
												user.created_at
											)}
										</td>

									</tr>

								{/each}

							</tbody>

						</table>

					</div>

				</div>

			<!-- ================================================= -->
			<!-- ANALYTICS -->
			<!-- ================================================= -->

			{:else if activeSection === 'analytics'}

				<div class="section-heading">

					<div>

						<h2>
							Data Analytics
						</h2>

						<p>
							Monitor content performance,
							reader activity and engagement
							across Jarurat Care.
						</p>

					</div>

				</div>

				<div class="analytics-grid analytics-grid-primary">

					<div class="analytics-card">

						<div class="analytics-card-top">
							<div class="analytics-icon views">
								<Eye size={19} />
							</div>

							<span class="analytics-label">
								TOTAL VIEWS
							</span>
						</div>

						<strong>
							{formatNumber(
								analytics.totalViews
							)}
						</strong>

						<span class="analytics-description">
							Total views across published
							content
						</span>

					</div>

					<div class="analytics-card">

						<div class="analytics-card-top">

							<div class="analytics-icon visitors">
								<Users size={19} />
							</div>

							<span class="analytics-label">
								UNIQUE VISITORS
							</span>

						</div>

						<strong>
							{formatNumber(
								uniqueVisitors
							)}
						</strong>

						<span class="analytics-description">
							Distinct visitors from tracked
							sessions
						</span>

					</div>

					<div class="analytics-card">

						<div class="analytics-card-top">

							<div class="analytics-icon active">
								<TrendingUp size={19} />
							</div>

							<span class="analytics-label">
								DAILY ACTIVE USERS
							</span>

						</div>

						<strong>
							{formatNumber(
								dailyActiveUsersValue
							)}
						</strong>

						<span class="analytics-description">
							Active users from tracked
							activity
						</span>

					</div>

					<div class="analytics-card">

						<div class="analytics-card-top">

							<div class="analytics-icon likes">
								<Heart size={19} />
							</div>

							<span class="analytics-label">
								LIKES
							</span>

						</div>

						<strong>
							{formatNumber(
								analytics.totalLikes
							)}
						</strong>

						<span class="analytics-description">
							Article likes recorded
						</span>

					</div>

					<div class="analytics-card">

						<div class="analytics-card-top">

							<div class="analytics-icon saves">
								<Bookmark size={19} />
							</div>

							<span class="analytics-label">
								SAVES
							</span>

						</div>

						<strong>
							{formatNumber(
								analytics.totalSaves
							)}
						</strong>

						<span class="analytics-description">
							Articles saved by readers
						</span>

					</div>

					<div class="analytics-card">

						<div class="analytics-card-top">

							<div class="analytics-icon shares">
								<ArrowUpRight
									size={19}
								/>
							</div>

							<span class="analytics-label">
								SHARES
							</span>

						</div>

						<strong>
							{formatNumber(
								totalShares
							)}
						</strong>

						<span class="analytics-description">
							Content shares recorded
						</span>

					</div>

					<div class="analytics-card">

						<div class="analytics-card-top">

							<div class="analytics-icon comments">
								<MessageCircle
									size={19}
								/>
							</div>

							<span class="analytics-label">
								COMMENTS
							</span>

						</div>

						<strong>
							{formatNumber(
								analytics.totalComments
							)}
						</strong>

						<span class="analytics-description">
							Reader comments
						</span>

					</div>

				</div>

				<div class="analytics-two-column">

					<div class="panel large-panel">

						<div class="panel-header">

							<div>

								<h3>
									Reader Engagement Trends
								</h3>

								<p>
									Likes, saves and comments
									recorded over time
								</p>

							</div>

							<div class="legend">

								<span>
									<i class="legend-dot likes-dot"></i>
									Likes
								</span>

								<span>
									<i class="legend-dot saves-dot"></i>
									Saves
								</span>

								<span>
									<i class="legend-dot comments-dot"></i>
									Comments
								</span>

							</div>

						</div>

						{#if analytics.engagementTrend?.length}

							<div class="trend-chart">

								{#each analytics.engagementTrend as day}

									<div class="trend-column">

										<div class="bars">

											<div
												class="bar likes-bar"
												style={`height:${Math.min(
													100,
													Number(
														day.likes || 0
													) *
														12 +
														8
												)}%`}
												title={`Likes: ${
													day.likes || 0
												}`}
											></div>

											<div
												class="bar saves-bar"
												style={`height:${Math.min(
													100,
													Number(
														day.saves || 0
													) *
														12 +
														8
												)}%`}
												title={`Saves: ${
													day.saves || 0
												}`}
											></div>

											<div
												class="bar comments-bar"
												style={`height:${Math.min(
													100,
													Number(
														day.comments ||
															0
													) *
														12 +
														8
												)}%`}
												title={`Comments: ${
													day.comments ||
													0
												}`}
											></div>

										</div>

										<span>
											{new Date(
												day.date
											).toLocaleDateString(
												'en-US',
												{
													month: 'short',
													day: 'numeric'
												}
											)}
										</span>

									</div>

								{/each}

							</div>

						{:else}

							<div class="chart-empty">

								<BarChart3
									size={34}
								/>

								<p>
									No engagement activity
									recorded yet.
								</p>

							</div>

						{/if}

					</div>

					<div class="panel">

						<div class="panel-header">

							<div>

								<h3>
									Daily Active Users
								</h3>

								<p>
									Unique users active during
									tracked days
								</p>

							</div>

						</div>

						{#if dailyActiveUsersTrend.length}

							<div class="dau-chart">

								{#each dailyActiveUsersTrend as day}

									<div class="dau-row">

										<div class="dau-row-top">

											<span>
												{new Date(
													day.date
												).toLocaleDateString(
													'en-US',
													{
														month: 'short',
														day: 'numeric'
													}
												)}
											</span>

											<strong>
												{formatNumber(
													day.users ??
														day.count ??
														day.value ??
														0
												)}
											</strong>

										</div>

										<div class="dau-progress">

											<div
												style={`width:${Math.min(
													100,
													(Number(
														day.users ??
															day.count ??
															day.value ??
															0
													) /
														Math.max(
															1,
															dailyActiveUsersValue
														)) *
														100
												)}%`}
											></div>

										</div>

									</div>

								{/each}

							</div>

						{:else}

							<div class="chart-empty">

								<TrendingUp
									size={34}
								/>

								<p>
									No daily active user
									events recorded yet.
								</p>

							</div>

						{/if}

					</div>

				</div>

				<div class="panel">

					<div class="panel-header">

						<div>

							<h3>
								Most Popular Content
							</h3>

							<p>
								Published content ranked
								by views
							</p>

						</div>

					</div>

					{#if analytics.mostPopularContent?.length}

						<div class="popular-table-wrapper">

							<table class="popular-table">

								<thead>

									<tr>
										<th>#</th>
										<th>Content</th>
										<th>Category</th>
										<th>Views</th>
										<th>Likes</th>
										<th>Saves</th>
									</tr>

								</thead>

								<tbody>

									{#each analytics.mostPopularContent as item, index}

										<tr>

											<td>
												<span class="rank">
													{index + 1}
												</span>
											</td>

											<td>

												<div class="popular-content">

													<div class="popular-icon">
														<FileText
															size={16}
														/>
													</div>

													<div>

														<strong>
															{item.title ||
																'Untitled'}
														</strong>

														<small>
															{formatDate(
																item.created_at
															)}
														</small>

													</div>

												</div>

											</td>

											<td>

												<span class="category-badge">
													{item.category ||
														'General'}
												</span>

											</td>

											<td>
												<strong>
													{formatNumber(
														item.views
													)}
												</strong>
											</td>

											<td>

												<span class="metric likes-metric">

													<Heart
														size={13}
													/>

													{formatNumber(
														item.likes
													)}

												</span>

											</td>

											<td>

												<span class="metric saves-metric">

													<Bookmark
														size={13}
													/>

													{formatNumber(
														item.saves
													)}

												</span>

											</td>

										</tr>

									{/each}

								</tbody>

							</table>

						</div>

					{:else}

						<div class="chart-empty">

							<Eye size={34} />

							<p>
								No published content
								available yet.
							</p>

						</div>

					{/if}

				</div>

				<div class="analytics-two-column">

					<div class="panel">

						<div class="panel-header">

							<div>

								<h3>
									Content Categories
								</h3>

								<p>
									Published article
									distribution
								</p>

							</div>

						</div>

						<div class="category-list">

							{#if analytics.articlesByCategory?.length}

								{#each analytics.articlesByCategory as category}

									<div class="category-row">

										<div class="category-row-top">

											<span>
												{category.category}
											</span>

											<strong>
												{category.count}
											</strong>

										</div>

										<div class="category-progress">

											<div
												style={`width:${category.percentage}%`}
											></div>

										</div>

										<small>
											{category.percentage}%
											of published
											articles
										</small>

									</div>

								{/each}

							{:else}

								<div class="empty-small">
									No category data
									available.
								</div>

							{/if}

						</div>

					</div>

					<div class="panel">

						<div class="panel-header">

							<div>

								<h3>
									User Breakdown
								</h3>

								<p>
									Registered account types
								</p>

							</div>

						</div>

						<div class="user-breakdown">

							<div class="breakdown-item">

								<div class="breakdown-icon reader">
									<Users size={18} />
								</div>

								<div class="breakdown-main">

									<span>
										Readers
									</span>

									<div class="progress">

										<div
											style={`width:${
												analytics.totalUsers
													? (analytics.totalReaders /
															analytics.totalUsers) *
														100
													: 0
											}%`}
										></div>

									</div>

								</div>

								<strong>
									{formatNumber(
										analytics.totalReaders
									)}
								</strong>

							</div>

							<div class="breakdown-item">

								<div class="breakdown-icon doctor">
									<Stethoscope
										size={18}
									/>
								</div>

								<div class="breakdown-main">

									<span>
										Doctors
									</span>

									<div class="progress">

										<div
											style={`width:${
												analytics.totalUsers
													? (analytics.totalDoctors /
															analytics.totalUsers) *
														100
													: 0
											}%`}
										></div>

									</div>

								</div>

								<strong>
									{formatNumber(
										analytics.totalDoctors
									)}
								</strong>

							</div>

							<div class="breakdown-item">

								<div class="breakdown-icon admin">
									<ShieldCheck
										size={18}
									/>
								</div>

								<div class="breakdown-main">

									<span>
										Admins
									</span>

									<div class="progress">

										<div
											style={`width:${
												analytics.totalUsers
													? (analytics.totalAdmins /
															analytics.totalUsers) *
														100
													: 0
											}%`}
										></div>

									</div>

								</div>

								<strong>
									{formatNumber(
										analytics.totalAdmins
									)}
								</strong>

							</div>

						</div>

					</div>

				</div>

			{/if}

		</div>

	</main>

</div>

<style>

	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		font-family:
			Inter,
			-apple-system,
			BlinkMacSystemFont,
			"Segoe UI",
			sans-serif;
		background: #f8fafc;
		color: #0f172a;
	}

	.dashboard {
		min-height: 100vh;
		display: flex;
		background: #f8fafc;
	}

	.sidebar {
		width: 260px;
		min-height: 100vh;
		background: #0f172a;
		color: #94a3b8;
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		position: sticky;
		top: 0;
		height: 100vh;
	}

	.sidebar-brand {
		height: 76px;
		padding: 16px 20px;
		display: flex;
		align-items: center;
		gap: 12px;
		border-bottom: 1px solid
			rgba(255,255,255,0.07);
	}

	.brand-icon {
		width: 38px;
		height: 38px;
		border-radius: 9px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background: white;
	}

	.brand-icon img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.brand-name {
		font-size: 17px;
		font-weight: 800;
		color: white;
	}

	.brand-role {
		font-size: 11px;
		color: #64748b;
		margin-top: 2px;
	}

	.sidebar-content {
		flex: 1;
		padding: 16px;
		overflow-y: auto;
	}

	.menu-label {
		font-size: 10px;
		font-weight: 800;
		letter-spacing: 0.08em;
		color: #475569;
		padding: 10px 12px 5px;
	}

	.menu-item {
		width: 100%;
		border: none;
		background: transparent;
		color: #94a3b8;
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px 14px;
		border-radius: 8px;
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		text-align: left;
		text-decoration: none;
		transition: all 0.2s;
		margin-bottom: 2px;
	}

	.menu-item:hover {
		background: #1e293b;
		color: white;
	}

	.menu-item.active {
		background: #2563eb;
		color: white;
		font-weight: 650;
		box-shadow:
			0 4px 12px
			rgba(37,99,235,0.22);
	}

	.menu-count {
		margin-left: auto;
		min-width: 20px;
		height: 20px;
		padding: 0 5px;
		border-radius: 10px;
		background: #ef4444;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 10px;
		font-weight: 700;
	}

	.sidebar-bottom {
		padding: 12px;
		border-top: 1px solid
			rgba(255,255,255,0.07);
	}

	.website-link,
	.logout-link {
		display: flex;
		align-items: center;
		gap: 9px;
		padding: 10px 12px;
		text-decoration: none;
		font-size: 13px;
		border-radius: 8px;
		margin-bottom: 3px;
	}

	.website-link {
		color: #94a3b8;
	}

	.website-link:hover {
		background: #1e293b;
		color: white;
	}

	.website-link :global(svg:last-child) {
		margin-left: auto;
	}

	.logout-link {
		color: #f87171;
	}

	.logout-link:hover {
		background:
			rgba(239,68,68,0.1);
	}

	.main {
		flex: 1;
		min-width: 0;
	}

	.page-content {
		padding: 30px;
		max-width: 1500px;
		margin: 0 auto;
	}

	.section-heading {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 24px;
	}

	.section-heading h2 {
		font-size: 24px;
		font-weight: 800;
		margin: 0 0 5px;
		color: #0f172a;
	}

	.section-heading p {
		margin: 0;
		color: #64748b;
		font-size: 13px;
	}

	.overview-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
		margin-bottom: 22px;
	}

	.stat-card {
		background: white;
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		padding: 18px;
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.stat-icon {
		width: 42px;
		height: 42px;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.stat-icon.blue {
		background: #eff6ff;
		color: #2563eb;
	}

	.stat-icon.purple {
		background: #faf5ff;
		color: #9333ea;
	}

	.stat-icon.green {
		background: #f0fdf4;
		color: #16a34a;
	}

	.stat-icon.orange {
		background: #fff7ed;
		color: #ea580c;
	}

	.stat-card span {
		display: block;
		font-size: 11px;
		color: #64748b;
		margin-bottom: 4px;
	}

	.stat-card strong {
		font-size: 23px;
		color: #0f172a;
	}

	.overview-two-column,
	.analytics-two-column {
		display: grid;
		grid-template-columns: 1.5fr 1fr;
		gap: 18px;
		margin-bottom: 18px;
	}

	.panel {
		background: white;
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		overflow: hidden;
		margin-bottom: 18px;
	}

	.panel-header {
		padding: 18px 20px;
		border-bottom: 1px solid #f1f5f9;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 15px;
	}

	.panel-header h3 {
		font-size: 15px;
		margin: 0 0 3px;
		font-weight: 750;
		color: #0f172a;
	}

	.panel-header p {
		font-size: 11px;
		color: #94a3b8;
		margin: 0;
	}

	.text-button {
		border: none;
		background: transparent;
		color: #2563eb;
		font-size: 12px;
		font-weight: 650;
		cursor: pointer;
	}

	.content-list {
		padding: 4px 20px;
	}

	.content-row {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 13px 0;
		border-bottom: 1px solid #f1f5f9;
	}

	.content-row:last-child {
		border-bottom: none;
	}

	.content-type-icon {
		width: 34px;
		height: 34px;
		border-radius: 8px;
		background: #eff6ff;
		color: #2563eb;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.content-row-main {
		flex: 1;
		min-width: 0;
	}

	.content-row-main strong {
		display: block;
		font-size: 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.content-row-main span {
		display: block;
		font-size: 10px;
		color: #94a3b8;
		margin-top: 3px;
	}

	.quick-stats {
		padding: 12px 20px 20px;
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.quick-stats > div {
		padding: 15px 10px;
		border-bottom: 1px solid #f1f5f9;
	}

	.quick-stats span {
		display: block;
		font-size: 11px;
		color: #64748b;
		margin-bottom: 4px;
	}

	.quick-stats strong {
		font-size: 21px;
	}

	.author-list {
		padding: 7px 20px 15px;
	}

	.author-row {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 0;
		border-bottom: 1px solid #f8fafc;
	}

	.author-row:last-child {
		border-bottom: none;
	}

	.author-rank {
		width: 22px;
		font-size: 10px;
		font-weight: 750;
		color: #94a3b8;
		text-align: center;
	}

	.author-avatar {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background: #eff6ff;
		color: #2563eb;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-weight: 750;
	}

	.author-main {
		flex: 1;
		min-width: 0;
	}

	.author-main strong {
		display: block;
		font-size: 11px;
		color: #0f172a;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.author-main span {
		display: block;
		font-size: 9px;
		color: #94a3b8;
		margin-top: 2px;
	}

	.author-count {
		text-align: right;
	}

	.author-count strong {
		display: block;
		font-size: 13px;
		color: #0f172a;
	}

	.author-count span {
		font-size: 8px;
		color: #94a3b8;
	}

	/* TABLES */

	.table-wrapper {
		overflow-x: auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	table th {
		padding: 12px 20px;
		background: #f8fafc;
		color: #64748b;
		font-size: 10px;
		font-weight: 750;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		text-align: left;
		border-bottom: 1px solid #e2e8f0;
		white-space: nowrap;
	}

	table td {
		padding: 14px 20px;
		border-bottom: 1px solid #f1f5f9;
		font-size: 12px;
		color: #475569;
		vertical-align: middle;
	}

	table tbody tr:hover {
		background: #f8fafc;
	}

	.user-cell {
		display: flex;
		align-items: center;
		gap: 10px;
		min-width: 180px;
	}

	.user-avatar {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background: #eff6ff;
		color: #2563eb;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 750;
		font-size: 12px;
		flex-shrink: 0;
	}

	.user-cell strong {
		display: block;
		font-size: 11px;
		color: #0f172a;
	}

	.user-cell span {
		display: block;
		font-size: 9px;
		color: #94a3b8;
		margin-top: 2px;
	}

	/* STATUS */

	.status {
		display: inline-flex;
		padding: 4px 8px;
		border-radius: 5px;
		font-size: 9px;
		font-weight: 700;
		background: #f1f5f9;
		color: #64748b;
		text-transform: capitalize;
	}

	.status.published,
	.status.approved {
		background: #f0fdf4;
		color: #16a34a;
	}

	.status.review {
		background: #fffbeb;
		color: #d97706;
	}

	.status.pending {
		background: #fff7ed;
		color: #ea580c;
	}

	.status.rejected {
		background: #fef2f2;
		color: #dc2626;
	}

	.permission-badge {
		display: inline-flex;
		padding: 4px 9px;
		border-radius: 5px;
		font-size: 9px;
		font-weight: 700;
		text-transform: capitalize;
	}

	.permission-badge.granted {
		background: #f0fdf4;
		color: #16a34a;
	}

	.permission-badge.revoked {
		background: #fef2f2;
		color: #dc2626;
	}

	.action-button {
		border: 1px solid #dbe3ee;
		background: white;
		color: #334155;
		padding: 7px 11px;
		border-radius: 6px;
		font-size: 10px;
		font-weight: 650;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		gap: 5px;
		transition: 0.15s;
		white-space: nowrap;
	}

	.action-button:hover {
		background: #f8fafc;
	}

	.approve-button {
		background: #2563eb;
		border-color: #2563eb;
		color: white;
	}

	.approve-button:hover {
		background: #1d4ed8;
	}

	.reviewer-button {
		background: #7c3aed;
		border-color: #7c3aed;
		color: white;
	}

	.reviewer-button:hover {
		background: #6d28d9;
	}

	.reject-button {
		background: #fff;
		border-color: #fecaca;
		color: #dc2626;
	}

	.reject-button:hover {
		background: #fef2f2;
		border-color: #fca5a5;
	}

	.verification-actions {
		display: flex;
		gap: 7px;
		flex-wrap: wrap;
		align-items: center;
	}

	.inline-form {
		margin: 0;
		padding: 0;
		display: inline-block;
	}

	.published-label {
		font-size: 10px;
		color: #16a34a;
		font-weight: 650;
	}

	.rejected-label {
		display: inline-flex;
		align-items: center;
		padding: 5px 9px;
		border-radius: 5px;
		background: #fef2f2;
		color: #dc2626;
		font-size: 10px;
		font-weight: 700;
	}

	/* SEARCH */

	.search-box {
		display: flex;
		align-items: center;
		gap: 7px;
		background: #f8fafc;
		border: 1px solid #e2e8f0;
		border-radius: 7px;
		padding: 7px 10px;
		width: 220px;
		color: #94a3b8;
	}

	.search-box input {
		border: none;
		outline: none;
		background: transparent;
		width: 100%;
		font-size: 11px;
		color: #334155;
	}

	.role-form {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.role-form select,
	.cms-create-form input,
	.cms-create-form textarea,
	.cms-create-form select {
		border: 1px solid #e2e8f0;
		border-radius: 7px;
		padding: 8px 9px;
		font-size: 11px;
		background: #fff;
		color: #0f172a;
	}

	.save-button {
		display: flex;
		align-items: center;
		gap: 6px;
		background: #4f46e5;
		color: #ffffff;
		border: none;
		padding: 8px 12px;
		border-radius: 6px;
		font-size: 11px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.save-button:hover {
		background: #4338ca;
		transform: translateY(-1px);
		box-shadow: 0 2px 8px rgba(79, 70, 229, 0.25);
	}

	.cms-create-form {
		display: grid;
		grid-template-columns:
			repeat(2, minmax(0, 1fr));
		gap: 10px;
		padding: 18px 20px 20px;
	}

	.cms-create-form textarea {
		resize: vertical;
	}

	.cms-create-form textarea[name="content"] {
		grid-column: 1 / -1;
	}

	.cms-create-form button {
		width: max-content;
	}

	.cms-actions-cell {
		display: flex;
		gap: 6px;
		align-items: center;
	}

	/* EMPTY */

	.empty-small {
		padding: 35px 20px;
		text-align: center;
		color: #94a3b8;
		font-size: 12px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}

	/* ANALYTICS */

	.analytics-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 14px;
		margin-bottom: 18px;
	}

	.analytics-card {
		background: white;
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		padding: 17px;
		transition: 0.18s ease;
	}

	.analytics-card:hover {
		border-color: #cbd5e1;
		box-shadow:
			0 6px 18px
			rgba(15, 23, 42, 0.05);
		transform: translateY(-1px);
	}

	.action-button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	:global(.spin-icon) {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.analytics-card-top {
		display: flex;
		align-items: center;
		gap: 9px;
		margin-bottom: 11px;
	}

	.analytics-icon {
		width: 34px;
		height: 34px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.analytics-icon.views {
		background: #eff6ff;
		color: #2563eb;
	}

	.analytics-icon.visitors {
		background: #f5f3ff;
		color: #7c3aed;
	}

	.analytics-icon.active {
		background: #ecfdf5;
		color: #059669;
	}

	.analytics-icon.likes {
		background: #fef2f2;
		color: #ef4444;
	}

	.analytics-icon.saves {
		background: #fff7ed;
		color: #ea580c;
	}

	.analytics-icon.shares {
		background: #eef2ff;
		color: #4f46e5;
	}

	.analytics-icon.comments {
		background: #f0fdf4;
		color: #16a34a;
	}

	.analytics-label {
		font-size: 9px;
		font-weight: 750;
		color: #64748b;
		letter-spacing: 0.05em;
	}

	.analytics-card > strong {
		display: block;
		font-size: 26px;
		font-weight: 800;
		color: #0f172a;
		margin-bottom: 4px;
	}

	.analytics-description {
		font-size: 10px;
		color: #94a3b8;
		line-height: 1.4;
	}

	.large-panel {
		min-height: 300px;
	}

	.legend {
		display: flex;
		gap: 14px;
	}

	.legend span {
		font-size: 10px;
		color: #64748b;
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.legend-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		display: inline-block;
	}

	.likes-dot {
		background: #ef4444;
	}

	.saves-dot {
		background: #f97316;
	}

	.comments-dot {
		background: #16a34a;
	}

	.trend-chart {
		height: 220px;
		padding: 25px 25px 18px;
		display: flex;
		align-items: stretch;
		gap: 8px;
		border-top: 1px solid #f8fafc;
		overflow-x: auto;
	}

	.trend-column {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		min-width: 30px;
	}

	.bars {
		height: 165px;
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		gap: 2px;
	}

	.bar {
		width: 7px;
		min-height: 3px;
		border-radius: 4px 4px 0 0;
		transition: height 0.3s ease;
	}

	.likes-bar {
		background: #ef4444;
	}

	.saves-bar {
		background: #f97316;
	}

	.comments-bar {
		background: #16a34a;
	}

	.trend-column > span {
		font-size: 8px;
		color: #94a3b8;
		margin-top: 8px;
		white-space: nowrap;
	}

	.dau-chart {
		padding: 12px 20px 18px;
		max-height: 250px;
		overflow-y: auto;
	}

	.dau-row {
		padding: 10px 0;
	}

	.dau-row-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 10px;
		margin-bottom: 6px;
	}

	.dau-row-top span {
		color: #64748b;
	}

	.dau-row-top strong {
		color: #0f172a;
	}

	.dau-progress {
		height: 6px;
		background: #f1f5f9;
		border-radius: 10px;
		overflow: hidden;
	}

	.dau-progress div {
		height: 100%;
		background: #059669;
		border-radius: 10px;
	}

	.chart-empty {
		min-height: 220px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #94a3b8;
		gap: 8px;
	}

	.chart-empty p {
		margin: 0;
		font-size: 12px;
	}

	.user-breakdown {
		padding: 15px 20px 20px;
	}

	.breakdown-item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 12px 0;
	}

	.breakdown-icon {
		width: 34px;
		height: 34px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.breakdown-icon.reader {
		background: #eff6ff;
		color: #2563eb;
	}

	.breakdown-icon.doctor {
		background: #ecfeff;
		color: #0891b2;
	}

	.breakdown-icon.admin {
		background: #faf5ff;
		color: #9333ea;
	}

	.breakdown-main {
		flex: 1;
	}

	.breakdown-main > span {
		font-size: 11px;
		color: #334155;
		display: block;
		margin-bottom: 6px;
	}

	.progress {
		height: 5px;
		background: #f1f5f9;
		border-radius: 10px;
		overflow: hidden;
	}

	.progress div {
		height: 100%;
		background: #2563eb;
		border-radius: 10px;
	}

	.breakdown-item:nth-child(2)
		.progress
		div {
		background: #0891b2;
	}

	.breakdown-item:nth-child(3)
		.progress
		div {
		background: #9333ea;
	}

	.breakdown-item strong {
		font-size: 12px;
		color: #0f172a;
		min-width: 32px;
		text-align: right;
	}

	.popular-table-wrapper {
		overflow-x: auto;
	}

	.popular-table {
		width: 100%;
		border-collapse: collapse;
	}

	.popular-table th {
		padding: 11px 20px;
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: #94a3b8;
		font-weight: 750;
		text-align: left;
		border-bottom: 1px solid #f1f5f9;
	}

	.popular-table td {
		padding: 14px 20px;
		border-bottom: 1px solid #f8fafc;
		font-size: 12px;
		color: #334155;
	}

	.popular-table tbody tr:hover {
		background: #f8fafc;
	}

	.rank {
		width: 24px;
		height: 24px;
		border-radius: 6px;
		background: #f8fafc;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 10px;
		font-weight: 750;
		color: #64748b;
	}

	.popular-content {
		display: flex;
		align-items: center;
		gap: 10px;
		min-width: 260px;
	}

	.popular-icon {
		width: 34px;
		height: 34px;
		border-radius: 7px;
		background: #eff6ff;
		color: #2563eb;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.popular-content strong {
		display: block;
		font-size: 12px;
		color: #0f172a;
		max-width: 300px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.popular-content small {
		display: block;
		color: #94a3b8;
		font-size: 9px;
		margin-top: 3px;
	}

	.category-badge {
		display: inline-block;
		background: #eff6ff;
		color: #2563eb;
		border: 1px solid #dbeafe;
		border-radius: 5px;
		padding: 4px 8px;
		font-size: 9px;
		font-weight: 650;
	}

	.metric {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: 11px;
	}

	.likes-metric {
		color: #ef4444;
	}

	.saves-metric {
		color: #ea580c;
	}

	.category-list {
		padding: 16px 20px 20px;
	}

	.category-row {
		padding: 10px 0;
	}

	.category-row-top {
		display: flex;
		justify-content: space-between;
		font-size: 11px;
		margin-bottom: 6px;
	}

	.category-row-top span {
		color: #334155;
		font-weight: 600;
	}

	.category-row-top strong {
		color: #0f172a;
	}

	.category-progress {
		height: 6px;
		background: #f1f5f9;
		border-radius: 10px;
		overflow: hidden;
	}

	.category-progress div {
		height: 100%;
		background: #2563eb;
		border-radius: 10px;
	}

	.category-row small {
		display: block;
		margin-top: 4px;
		color: #94a3b8;
		font-size: 9px;
	}

	@media (max-width: 1100px) {

		.sidebar {
			width: 220px;
		}

		.overview-grid {
			grid-template-columns:
				repeat(2, 1fr);
		}

		.analytics-grid {
			grid-template-columns:
				repeat(2, 1fr);
		}

	}

	@media (max-width: 850px) {

		.sidebar {
			width: 72px;
		}

		.brand-name,
		.brand-role,
		.menu-label,
		.menu-item span,
		.menu-count,
		.website-link span,
		.logout-link span {
			display: none;
		}

		.sidebar-brand {
			justify-content: center;
			padding: 15px 10px;
		}

		.menu-item {
			justify-content: center;
		}

		.website-link,
		.logout-link {
			justify-content: center;
		}

		.overview-two-column,
		.analytics-two-column {
			grid-template-columns: 1fr;
		}

	}

	@media (max-width: 650px) {

		.page-content {
			padding: 20px 15px;
		}

		.overview-grid,
		.analytics-grid {
			grid-template-columns: 1fr;
		}

		.section-heading h2 {
			font-size: 20px;
		}

		.legend {
			display: none;
		}

		.search-box {
			width: 100%;
		}

		.panel-header {
			align-items: flex-start;
			flex-direction: column;
		}

		.cms-create-form {
			grid-template-columns: 1fr;
		}

		.cms-create-form textarea[name="content"] {
			grid-column: auto;
		}

		.verification-actions {
			flex-direction: column;
			align-items: stretch;
		}

		.verification-actions .inline-form,
		.verification-actions .action-button {
			width: 100%;
		}

		.role-form {
			flex-wrap: wrap;
		}

	}

</style>