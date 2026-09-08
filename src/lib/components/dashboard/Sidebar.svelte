<script lang="ts">
	import { page } from '$app/stores';
	import {
		Home,
		FileText,
		BookOpen,
		Folder,
		ClipboardCheck,
		Globe,
		ExternalLink,
		LogOut,
		ShieldCheck,
		Users,
		MessageSquare,
		Bookmark
	} from 'lucide-svelte';

	export let isReviewer: boolean = false;

	$: currentPath = $page.url.pathname;
</script>

<aside class="sidebar">
	<!-- Logo -->
	<div class="sidebar-logo">
		<div class="logo-icon-wrap">
			<img
				src="/logo.png"
				alt="JCF Logo"
				class="logo-img"
				onerror="this.src='https://cdn-icons-png.flaticon.com/512/3062/3062634.png'"
			/>
		</div>

		<div class="logo-text">
			<span class="main-title">Jarurat Care</span>
			<span class="sub-title">
				{isReviewer ? 'Reviewer Portal' : 'Doctor Portal'}
			</span>
		</div>
	</div>

	<!-- Scrollable Navigation -->
	<div class="sidebar-scroll">

		<!-- MAIN -->
		<div class="group-title">MAIN</div>

		<a
			href="/cms/doctor-dashboard"
			class="nav-item"
			class:active={currentPath === '/cms/doctor-dashboard'}
		>
			<Home size={18} />
			<span>Dashboard</span>
		</a>


		<!-- COMMUNITY -->
		<div class="group-title">COMMUNITY</div>

		<a
			href="/cms/community/doctors"
			class="nav-item"
			class:active={currentPath.startsWith('/cms/community/doctors')}
		>
			<Users size={18} />
			<span>Community - Doctors</span>
		</a>


		<!-- CONTENT MANAGEMENT -->
		<div class="group-title">CONTENT MANAGEMENT</div>

		<a
			href="/cms/doctor-dashboard/articles"
			class="nav-item"
			class:active={currentPath.startsWith('/cms/doctor-dashboard/articles')}
		>
			<FileText size={18} />
			<span>My Articles</span>
		</a>

		<a
			href="/cms/doctor-dashboard/my-research-papers"
			class="nav-item"
			class:active={currentPath.startsWith(
				'/cms/doctor-dashboard/my-research-papers'
			)}
		>
			<BookOpen size={18} />
			<span>Research Papers</span>
		</a>

		<a
			href="/cms/doctor-dashboard/drafts"
			class="nav-item"
			class:active={currentPath.startsWith(
				'/cms/doctor-dashboard/drafts'
			)}
		>
			<Folder size={18} />
			<span>Drafts</span>
		</a>

		<a
			href="/cms/doctor-dashboard/saved-articles"
			class="nav-item"
			class:active={currentPath.startsWith(
				'/cms/doctor-dashboard/saved-articles'
			)}
		>
			<Bookmark size={18} />
			<span>Saved Articles</span>
		</a>

		<!-- TESTIMONIAL -->
		<a
			href="/cms/doctor-dashboard/testimonials"
			class="nav-item"
			class:active={currentPath.startsWith(
				'/cms/doctor-dashboard/testimonials'
			)}
		>
			<MessageSquare size={18} />
			<span>Write Testimonial</span>
		</a>


		<!-- REVIEWER WORKSPACE -->
		{#if isReviewer}
			<div class="group-title reviewer-highlight">
				REVIEWER WORKSPACE
			</div>

			<a
				href="/cms/doctor-dashboard/review-articles"
				class="nav-item reviewer-nav"
				class:active={currentPath.startsWith(
					'/cms/doctor-dashboard/review-articles'
				)}
			>
				<ClipboardCheck size={18} />
				<span>Review Articles</span>
				<span class="pulse-dot"></span>
			</a>

			<a
				href="/cms/doctor-dashboard/review-research"
				class="nav-item reviewer-nav"
				class:active={currentPath.startsWith(
					'/cms/doctor-dashboard/review-research'
				)}
			>
				<ShieldCheck size={18} />
				<span>Review Research Papers</span>
			</a>
		{/if}


	</div>


	<!-- SIDEBAR BOTTOM ACTIONS -->
	<div class="sidebar-bottom">

		<a
			href="/"
			target="_blank"
			class="nav-item bottom-link"
		>
			<Globe size={18} />
			<span>View Website</span>
			<ExternalLink size={16} class="ml-auto opacity-60" />
		</a>

		<a
			href="/cms/logout"
			data-sveltekit-reload
			class="nav-item logout-btn"
		>
			<LogOut size={18} />
			<span>Logout</span>
		</a>

	</div>
</aside>


<style>
	@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

	* {
		box-sizing: border-box;
		font-family:
			'DM Sans',
			-apple-system,
			BlinkMacSystemFont,
			sans-serif;
	}

	/* =========================
	   SIDEBAR
	========================= */

	.sidebar {
		width: 265px;

		background: #0f172a;

		color: #94a3b8;

		display: flex;
		flex-direction: column;

		flex-shrink: 0;

		border-right: 1px solid #1e293b;

		height: 100vh;

		position: sticky;
		top: 0;
	}


	/* =========================
	   LOGO
	========================= */

	.sidebar-logo {
		padding: 18px 20px;

		display: flex;
		align-items: center;

		gap: 12px;

		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.logo-icon-wrap {
		width: 36px;
		height: 36px;

		display: flex;
		align-items: center;
		justify-content: center;

		flex-shrink: 0;
	}

	.logo-img {
		max-width: 100%;
		max-height: 100%;
	}

	.logo-text {
		display: flex;
		flex-direction: column;

		line-height: 1.2;
	}

	.main-title {
		font-size: 20px;

		font-weight: 800;

		color: #ffffff;

		letter-spacing: -0.02em;
	}

	.sub-title {
		font-size: 12px;

		color: #94a3b8;

		font-weight: 500;
	}


	/* =========================
	   SIDEBAR SCROLL
	========================= */

	.sidebar-scroll {
		flex: 1;

		overflow-y: auto;

		padding: 12px 14px;

		display: flex;
		flex-direction: column;

		gap: 2px;
	}

	.sidebar-scroll::-webkit-scrollbar {
		width: 5px;
	}

	.sidebar-scroll::-webkit-scrollbar-thumb {
		background: #334155;

		border-radius: 4px;
	}


	/* =========================
	   GROUP TITLES
	========================= */

	.group-title {
		font-size: 11px;

		font-weight: 700;

		letter-spacing: 0.05em;

		color: #64748b;

		margin: 14px 8px 6px 8px;
	}

	.reviewer-highlight {
		color: #d97706;
	}


	/* =========================
	   NAVIGATION
	========================= */

	.nav-item {
		display: flex;
		align-items: center;

		gap: 12px;

		padding: 10px 14px;

		border-radius: 8px;

		color: #94a3b8;

		text-decoration: none;

		font-size: 14px;

		font-weight: 500;

		transition: all 0.2s ease;
	}

	.nav-item:hover {
		background: #1e293b;

		color: #ffffff;
	}

	.nav-item.active {
		background: #2563eb;

		color: #ffffff;

		font-weight: 600;

		box-shadow:
			0 4px 12px rgba(37, 99, 235, 0.2);
	}


	/* =========================
	   REVIEWER NAV
	========================= */

	.reviewer-nav:hover {
		background: #1e293b;

		color: #fbbf24;
	}

	.reviewer-nav.active {
		background: #d97706;

		color: #ffffff;

		box-shadow:
			0 4px 12px rgba(217, 119, 6, 0.25);
	}


	/* =========================
	   REVIEWER PULSE
	========================= */

	.pulse-dot {
		width: 8px;
		height: 8px;

		background: #f59e0b;

		border-radius: 50%;

		margin-left: auto;

		box-shadow:
			0 0 0 3px rgba(245, 158, 11, 0.2);
	}

	.nav-item.active .pulse-dot {
		background: #ffffff;

		box-shadow:
			0 0 0 3px rgba(255, 255, 255, 0.3);
	}


	/* =========================
	   BOTTOM ACTIONS
	========================= */

	.sidebar-bottom {
		padding: 12px 14px;

		border-top: 1px solid rgba(255, 255, 255, 0.08);

		display: flex;
		flex-direction: column;

		gap: 4px;
	}

	.bottom-link {
		color: #94a3b8;
	}

	.bottom-link:hover {
		color: #ffffff;
	}


	/* =========================
	   LOGOUT
	========================= */

	.logout-btn {
		color: #f87171;
	}

	.logout-btn:hover {
		background: rgba(239, 68, 68, 0.15);

		color: #ef4444;
	}


	/* =========================
	   UTILITY
	========================= */

	.ml-auto {
		margin-left: auto;
	}

	.opacity-60 {
		opacity: 0.6;
	}
</style>