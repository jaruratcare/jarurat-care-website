<script lang="ts">
	import { page } from '$app/stores';
	import {
		Home,
		FileText,
		Newspaper,
		HelpCircle,
		Calendar as CalendarIcon,
		Settings,
		Globe,
		ExternalLink,
		LogOut,
		Megaphone,
		MessageCircle
	} from 'lucide-svelte';

	let collapsed = false;
</script>

<aside class="new-sidebar" class:collapsed>
	<!-- ==================== LOGO ==================== -->
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
			<span class="sub-title">Admin Portal</span>
		</div>
	</div>

	<!-- ==================== NAVIGATION ==================== -->
	<div class="sidebar-scroll">
		<!-- DASHBOARD -->
		<a
			href="/cms/admin-dashboard"
			class="nav-btn"
			class:active={$page.url.pathname === '/cms/admin-dashboard'}
		>
			<Home size={18} />
			<span>Dashboard</span>
		</a>

		<!-- ==================== CONTENT ==================== -->
		<div class="nav-section">
			<span class="nav-section-title">CONTENT</span>

			<a
				href="/cms/admin-dashboard/blogs"
				class="nav-btn"
				class:active={$page.url.pathname.startsWith('/cms/admin-dashboard/blogs')}
			>
				<FileText size={18} />
				<span>Blogs</span>
			</a>

			<a
				href="/cms/admin-dashboard/news"
				class="nav-btn"
				class:active={$page.url.pathname.startsWith('/cms/admin-dashboard/news')}
			>
				<Newspaper size={18} />
				<span>News</span>
			</a>

			<a
				href="/cms/admin-dashboard/faqs"
				class="nav-btn"
				class:active={$page.url.pathname.startsWith('/cms/admin-dashboard/faqs')}
			>
				<HelpCircle size={18} />
				<span>FAQs</span>
			</a>

			<!-- TESTIMONIALS -->
			<a
				href="/cms/admin-dashboard/testimonials"
				class="nav-btn"
				class:active={$page.url.pathname.startsWith('/cms/admin-dashboard/testimonials')}
			>
				<MessageCircle size={18} />
				<span>Testimonials</span>
			</a>
		</div>

		<!-- ==================== EVENTS ==================== -->
		<div class="nav-section">
			<span class="nav-section-title">EVENTS</span>

			<a
				href="/cms/admin-dashboard/events"
				class="nav-btn"
				class:active={$page.url.pathname.startsWith('/cms/admin-dashboard/events')}
			>
				<CalendarIcon size={18} />

				<div class="flex-col-label">
					<span>Events Management</span>
					<span class="sub-text">(Webinars)</span>
				</div>
			</a>

			<a
				href="/cms/admin-dashboard/campaigns"
				class="nav-btn"
				class:active={$page.url.pathname.startsWith('/cms/admin-dashboard/campaigns')}
			>
				<Megaphone size={18} />

				<div class="flex-col-label">
					<span>Campaigns</span>
				</div>

				<span class="badge red-badge ml-auto">New</span>
			</a>
		</div>
	</div>

	<!-- ==================== SIDEBAR BOTTOM ==================== -->
	<div class="sidebar-bottom">
		<a href="/" target="_blank" class="nav-btn bottom-link">
			<Globe size={18} />
			<span>View Website</span>
			<ExternalLink size={16} class="ml-auto opacity-60" />
		</a>

		<a href="/cms/logout" data-sveltekit-reload class="nav-btn logout-btn">
			<LogOut size={18} />
			<span>Logout</span>
		</a>
	</div>
</aside>

<style>
	@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

	* {
		box-sizing: border-box;
		font-family: 'DM Sans', sans-serif;
	}

	.new-sidebar {
		width: 265px;
		background: #0b1729;
		color: #cbd5e1;
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		border-right: 1px solid #1e293b;
		height: 100vh;
		position: sticky;
		top: 0;
		transition: width 0.2s ease;
	}

	.sidebar-logo {
		padding: 18px 20px;
		display: flex;
		align-items: center;
		gap: 12px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.logo-icon-wrap {
		width: 32px;
		height: 32px;
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
		font-size: 11px;
		color: #94a3b8;
	}

	.sidebar-scroll {
		flex: 1;
		overflow-y: auto;
		padding: 16px 12px;
	}

	.sidebar-scroll::-webkit-scrollbar {
		width: 4px;
	}

	.sidebar-scroll::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.15);
		border-radius: 4px;
	}

	.nav-btn {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px 14px;
		border: none;
		background: transparent;
		color: #cbd5e1;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		text-align: left;
		transition: all 0.2s;
		border-radius: 8px;
		margin-bottom: 4px;
		text-decoration: none;
		white-space: nowrap;
	}

	.nav-btn span {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.nav-btn:hover {
		background: rgba(255, 255, 255, 0.06);
		color: #ffffff;
	}

	.nav-btn.active {
		background: #2563eb;
		color: #ffffff;
		font-weight: 600;
	}

	.nav-section {
		margin-top: 24px;
		display: flex;
		flex-direction: column;
	}

	.nav-section-title {
		font-size: 11px;
		text-transform: uppercase;
		font-weight: 700;
		color: #64748b;
		letter-spacing: 0.08em;
		padding: 4px 14px;
		margin-bottom: 6px;
	}

	.flex-col-label {
		display: flex;
		flex-direction: column;
		line-height: 1.2;
	}

	.flex-col-label .sub-text {
		font-size: 11px;
		color: #94a3b8;
	}

	.badge {
		font-size: 11px;
		font-weight: 600;
		padding: 2px 8px;
		border-radius: 999px;
		flex-shrink: 0;
	}

	.red-badge {
		background: #dc2626;
		color: #ffffff;
	}

	.ml-auto {
		margin-left: auto;
	}

	.opacity-60 {
		opacity: 0.6;
	}

	.sidebar-bottom {
		margin-top: auto;
		padding: 12px;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	.bottom-link {
		margin-bottom: 2px;
	}

	.logout-btn {
		color: #f87171;
	}

	.logout-btn:hover {
		background: rgba(239, 68, 68, 0.15);
		color: #ef4444;
	}
</style>