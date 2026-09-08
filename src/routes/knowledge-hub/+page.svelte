<script lang="ts">
	import { onMount } from 'svelte';
	import Nav from '$lib/components/nav.svelte';
	import NewsFooter from '$lib/components/news-footer.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import {
		Search,
		LayoutGrid,
		List,
		ChevronRight,
		X,
		ArrowLeft,
		Bell,
		Bookmark,
		Share2,
		Heart,
		Clock,
		TrendingUp,
		FileText,
		BookOpen,
		CalendarDays,
		MessageCircleQuestion,
		Newspaper,
		User,
		LayoutDashboard,
		LogOut
	} from 'lucide-svelte';
	import { cmsSupabase } from '$lib/cmsSupabase';
	import toast from 'svelte-french-toast';
	import { deserialize } from '$app/forms';

	type ContentItem = {
		id: string;
		title: string;
		subtitle?: string;
		excerpt: string;
		content: string;
		thumbnail: string;
		category: string;
		type:
			| 'article'
			| 'research'
			| 'blog'
			| 'news'
			| 'event'
			| 'faq'
			| 'testimonials'
			| 'campaign';
		date: string;
		author: string;
		slug?: string;
		likes_count?: number;
		saves_count?: number;
		views_count?: number;

		abstract?: string;
		introduction?: string;
		methods?: string;
		results?: string;
		discussion?: string;
		conclusion?: string;
		funding?: string;
		ethics_statement?: string;
		acknowledgements?: string;
	};

	const TYPE_LABELS: Record<string, string> = {
		article: 'Article',
		research: 'Research Article',
		blog: 'Blog',
		news: 'News',
		event: 'Event',
		faq: 'FAQ',
		testimonials: 'Testimonial',
		campaign: 'Campaign'
	};

	const TYPE_COLORS: Record<string, string> = {
		article: '#2563EB',
		research: '#0155bd',
		blog: '#7c3aed',
		news: '#0891b2',
		event: '#16a34a',
		faq: '#d97706',
		testimonials: '#db2777',
		campaign: '#dc2626'
	};

	const DEFAULT_IMAGE_COUNTS: Record<string, number> = {
		article: 8,
		blog: 2,
		campaign: 3,
		event: 3,
		faq: 3,
		news: 3,
		testimonials: 3,
		research: 8
	};

	const FOLDER_MAP: Record<string, string> = {
		article: 'Articles',
		blog: 'Blogs',
		campaign: 'Campaign',
		event: 'Events',
		faq: 'FAQs',
		news: 'News',
		testimonials: 'Testimonials',
		research: 'Articles'
	};

	function getDefaultThumbnail(type: string, id: string | number) {
		const safeType = type || 'article';
		const count = DEFAULT_IMAGE_COUNTS[safeType] || 1;
		const folder = FOLDER_MAP[safeType] || 'Articles';

		let numId = 0;

		if (typeof id === 'number') {
			numId = id;
		} else {
			for (let i = 0; i < id.length; i++) {
				numId = (numId << 5) - numId + id.charCodeAt(i);
				numId |= 0;
			}

			numId = Math.abs(numId);
		}

		const index = (numId % count) + 1;
		const filePrefix = safeType === 'research' ? 'article' : safeType;

		return `/defaults/${folder}/${filePrefix}-${index}.jpeg`;
	}

	export let data: any;

	let allContent: ContentItem[] = [];

	$: allContent = data?.publications || [];

	let selectedItem: ContentItem | null = null;
	let loading = false;
	let errorMsg = '';

	let searchQuery = $page.url.searchParams.get('q') || '';
	let activeFilter = 'all';

	let viewMode: 'grid' | 'list' = 'grid';

	let sortBy: 'date' | 'date_asc' | 'title' | 'title_desc' | 'views_desc' = 'date';

	const PAGE_SIZE = 9;
	let currentPage = 1;

	let isLoggedIn = false;
	let userRole = '';
	let userEmail = '';
	let userId = '';
	let isDropdownOpen = false;

	let localLikes: Record<string, boolean> = {};
	let localSaves: Record<string, boolean> = {};

	const FILTERS = [
		{ label: 'All Content', value: 'all', icon: LayoutGrid },
		{ label: 'Articles', value: 'article', icon: FileText },
		{ label: 'Research Articles', value: 'research', icon: BookOpen },
		{ label: 'Blogs', value: 'blog', icon: BookOpen },
		{ label: 'News', value: 'news', icon: Newspaper },
		{ label: 'Events', value: 'event', icon: CalendarDays },
		{ label: 'FAQs', value: 'faq', icon: MessageCircleQuestion }
	];

	function stripHtml(html: string) {
		return (html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
	}

	function makeExcerpt(text: string, max = 160) {
		const plain = stripHtml(text);
		return plain.length > max ? plain.slice(0, max) + '…' : plain;
	}

	function formatDate(date: string) {
		if (!date) return '';

		const parsed = new Date(date);

		if (Number.isNaN(parsed.getTime())) return date;

		return new Intl.DateTimeFormat('en-IN', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		}).format(parsed);
	}

	$: filtered = allContent.filter((item) => {
		const matchFilter =
			activeFilter === 'all' || item.type === activeFilter;

		const q = searchQuery.toLowerCase().trim();

		const matchSearch =
			!q ||
			item.title?.toLowerCase().includes(q) ||
			item.excerpt?.toLowerCase().includes(q) ||
			item.author?.toLowerCase().includes(q) ||
			item.category?.toLowerCase().includes(q);

		return matchFilter && matchSearch;
	});

	$: sorted = [...filtered].sort((a, b) => {
		if (sortBy === 'views_desc') {
			return (b.views_count || 0) - (a.views_count || 0);
		}

		if (sortBy === 'title') {
			return a.title.localeCompare(b.title);
		}

		if (sortBy === 'title_desc') {
			return b.title.localeCompare(a.title);
		}

		if (sortBy === 'date_asc') {
			return (
				new Date(a.date).getTime() -
				new Date(b.date).getTime()
			);
		}

		return (
			new Date(b.date).getTime() -
			new Date(a.date).getTime()
		);
	});

	$: totalPages = Math.max(
		1,
		Math.ceil(sorted.length / PAGE_SIZE)
	);

	$: paged = sorted.slice(
		(currentPage - 1) * PAGE_SIZE,
		currentPage * PAGE_SIZE
	);

	$: if (currentPage > totalPages) {
		currentPage = 1;
	}

	onMount(async () => {
		if (data?.savedArticleIds) {
			data.savedArticleIds.forEach((id: string) => {
				localSaves[id] = true;
			});
		}

		if (data?.likedArticleIds) {
			data.likedArticleIds.forEach((id: string) => {
				localLikes[id] = true;
			});
		}

		const {
			data: { user }
		} = await cmsSupabase.auth.getUser();

		if (user) {
			isLoggedIn = true;
			userEmail = user.email || '';
			userId = user.id;

			const { data: profile } = await cmsSupabase
				.from('profiles')
				.select('role')
				.eq('id', user.id)
				.single();

			userRole = profile?.role || 'user';
		}

		const { data: { subscription } } = cmsSupabase.auth.onAuthStateChange(async (_event, session) => {
			isLoggedIn = !!session?.user;

			if (session?.user) {
				userEmail = session.user.email || '';
				const { data: profile } = await cmsSupabase
					.from('profiles')
					.select('role')
					.eq('id', session.user.id)
					.single();

				userRole = profile?.role || 'user';
			} else {
				userRole = '';
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	async function logout() {
		await cmsSupabase.auth.signOut();

		isLoggedIn = false;
		userRole = '';
		userEmail = '';
		isDropdownOpen = false;

		toast.success('Logged out successfully');

		await goto('/knowledge-hub', {
			invalidateAll: true
		});
	}

	async function toggleSave(e: Event, item: ContentItem) {
		e.stopPropagation();

		if (!isLoggedIn) {
			toast.error('Please login to save articles!');
			return;
		}

		const previousState = localSaves[item.id] || false;
		localSaves[item.id] = !previousState;
		localSaves = localSaves; // Trigger reactivity
		
		if (item.saves_count !== undefined) {
			item.saves_count = Math.max(0, item.saves_count + (localSaves[item.id] ? 1 : -1));
			allContent = allContent;
		}

		const formData = new FormData();
		formData.append('contentId', item.id);
		formData.append('contentType', item.type);

		try {
			const endpoint = `/content/${item.type}/${item.slug || item.id}?/toggleSave`;
			const response = await fetch(endpoint, {
				method: 'POST',
				body: formData,
				headers: {
					'x-sveltekit-action': 'true'
				}
			});

			const result = deserialize(await response.text());

			if (result.type === 'success') {
				toast.success(
					localSaves[item.id]
						? 'Saved for later! 🔖'
						: 'Removed from saved items'
				);
			} else {
				localSaves[item.id] = previousState;
				localSaves = localSaves;
				if (item.saves_count !== undefined) {
					item.saves_count = Math.max(0, item.saves_count + (previousState ? 1 : -1));
					allContent = allContent;
				}
				toast.error('Failed to save article.');
			}
		} catch (error) {
			localSaves[item.id] = previousState;
			localSaves = localSaves;
			if (item.saves_count !== undefined) {
				item.saves_count = Math.max(0, item.saves_count + (previousState ? 1 : -1));
				allContent = allContent;
			}
			toast.error('Network error saving article.');
		}
	}

	async function toggleLike(e: Event, item: ContentItem) {
		e.stopPropagation();

		if (!isLoggedIn) {
			toast.error('Please login to like articles!');
			return;
		}

		const previousState = localLikes[item.id] || false;
		localLikes[item.id] = !previousState;
		localLikes = localLikes; // Trigger reactivity
		
		if (item.likes_count !== undefined) {
			item.likes_count = Math.max(0, item.likes_count + (localLikes[item.id] ? 1 : -1));
			allContent = allContent;
		}

		const formData = new FormData();
		formData.append('contentId', item.id);
		formData.append('contentType', item.type);

		try {
			const endpoint = `/content/${item.type}/${item.slug || item.id}?/toggleLike`;
			const response = await fetch(endpoint, {
				method: 'POST',
				body: formData,
				headers: {
					'x-sveltekit-action': 'true'
				}
			});

			const result = deserialize(await response.text());

			if (result.type === 'success') {
				toast.success(
					localLikes[item.id]
						? 'Liked! ❤️'
						: 'Removed like'
				);
			} else {
				localLikes[item.id] = previousState;
				localLikes = localLikes;
				if (item.likes_count !== undefined) {
					item.likes_count = Math.max(0, item.likes_count + (previousState ? 1 : -1));
					allContent = allContent;
				}
				toast.error('Failed to like article.');
			}
		} catch (error) {
			localLikes[item.id] = previousState;
			localLikes = localLikes;
			if (item.likes_count !== undefined) {
				item.likes_count = Math.max(0, item.likes_count + (previousState ? 1 : -1));
				allContent = allContent;
			}
			toast.error('Network error liking article.');
		}
	}

	function shareArticle(e: Event, item: ContentItem) {
		e.stopPropagation();

		const url = `${window.location.origin}/content/${item.type}/${item.slug || item.id}`;

		if (navigator.clipboard) {
			navigator.clipboard
				.writeText(url)
				.then(() => toast.success('Link copied to clipboard!'))
				.catch(() => toast.error('Could not copy link.'));
		}
	}

	function openItem(item: ContentItem) {
		if (item.slug || item.id) {
			goto(
				`/content/${item.type}/${item.slug || item.id}`
			);
		} else {
			toast.error('Publication link is missing.');
		}
	}

	function closeItem() {
		selectedItem = null;

		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	function selectFilter(value: string) {
		activeFilter = value;
		currentPage = 1;
	}

	function goToLatest() {
		activeFilter = 'all';
		sortBy = 'date';
		searchQuery = '';
		currentPage = 1;
	}
</script>

<svelte:head>
	<title>Community — Jarurat Care Foundation</title>

	<meta
		name="description"
		content="Explore research articles, blogs, news, events, FAQs and more from Jarurat Care Foundation. Your one-stop hub for health knowledge."
	/>

	<meta
		name="keywords"
		content="jarurat care, health articles, cancer research, blogs, news, events, FAQ, health knowledge"
	/>

	<meta
		property="og:title"
		content="Community — Jarurat Care Foundation"
	/>

	<meta
		property="og:description"
		content="Explore research, blogs, news and events from Jarurat Care Foundation."
	/>

	<meta property="og:type" content="website" />

	<meta name="robots" content="index, follow" />

	<link
		rel="canonical"
		href="https://jarurat.care/knowledge-hub"
	/>
</svelte:head>

<!-- EXISTING WEBSITE NAV  -->

<Nav />

<!--  COMMUNITY PAGE  -->

<div class="community-page">

	<!-- COMMUNITY SEARCH BAR -->

	<div class="community-topbar">
		<div class="topbar-inner">

			<button
				class="back-home"
				on:click={() => goto('/')}
				aria-label="Go back"
			>
				<ArrowLeft size={16} />
			</button>

			<div class="top-search">
				<Search size={17} />

				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search articles, journals, authors, topics..."
					on:input={() => (currentPage = 1)}
				/>

				{#if searchQuery}
					<button
						class="clear-top-search"
						on:click={() => {
							searchQuery = '';
							currentPage = 1;
						}}
					>
						<X size={14} />
					</button>
				{/if}
			</div>

			<div class="top-actions">

				<button
					class="icon-button"
					aria-label="Notifications"
				>
					<Bell size={18} />
				</button>

				{#if isLoggedIn}

					<div class="profile-dropdown-container">
						<button
							class="profile-button"
							on:click={() => (isDropdownOpen = !isDropdownOpen)}
						>
							<span class="avatar">
								{userRole
									? userRole.charAt(0).toUpperCase()
									: 'U'}
							</span>

							<span class="profile-label">
								{userRole || 'Account'}
							</span>
						</button>

						{#if isDropdownOpen}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<div class="dropdown-overlay" on:click={() => (isDropdownOpen = false)}></div>
							<div class="dropdown-menu">
								<div class="dropdown-header">
									<p class="user-email" title={userEmail || 'User'}>{userEmail || 'User'}</p>
									<p class="user-role-label">{userRole || 'Member'}</p>
								</div>
								
								<div class="dropdown-actions">
									<a class="dropdown-item" href={`/cms/community/doctors/${userId}`}>
										<User size={16} />
										<span>View Profile</span>
									</a>
									
									<a
										class="dropdown-item"
										href={
											userRole === 'Super_Admin' 
												? '/cms/super-admin'
												: userRole === 'Admin'
													? '/cms/admin-dashboard'
													: userRole === 'Doctor'
														? '/cms/doctor-dashboard'
														: '/cms/reader-dashboard'
										}
									>
										<LayoutDashboard size={16} />
										<span>View Dashboard</span>
									</a>
								</div>

								<div class="dropdown-footer">
									<button class="dropdown-item logout" on:click={logout}>
										<LogOut size={16} />
										<span>Logout</span>
									</button>
								</div>
							</div>
						{/if}
					</div>

				{:else}

					<div class="auth-actions">
						<a href="/cms/login">
							Login
						</a>

						<a
							href="/cms/signup"
							class="register-link"
						>
							Register
						</a>
					</div>

				{/if}

			</div>
		</div>
	</div>

	<!-- =========================================================
	     MAIN COMMUNITY LAYOUT
	========================================================= -->

	<div class="community-layout">

		<!-- =====================================================
		     SIDEBAR
		===================================================== -->

		<aside class="community-sidebar">

			<div class="sidebar-brand">

				<div class="sidebar-arrow">
					←
				</div>

				<div>
					<span>Jarurat Care</span>
					<strong>Community</strong>
				</div>

			</div>

			<div class="sidebar-section">

				<p class="sidebar-heading">
					Explore
				</p>

				<button
					class="sidebar-item"
					class:active={activeFilter === 'all' && sortBy !== 'views_desc'}
					on:click={goToLatest}
				>
					<Clock size={15} />
					<span>Latest</span>
				</button>

				<button
					class="sidebar-item"
					class:active={sortBy === 'views_desc'}
					on:click={() => {
						activeFilter = 'all';
						sortBy = 'views_desc';
						searchQuery = '';
						currentPage = 1;
					}}
				>
					<TrendingUp size={15} />
					<span>Popular Content</span>
				</button>

			</div>

			<div class="sidebar-section">

				<p class="sidebar-heading">
					Content
				</p>

				{#each FILTERS.filter(
					(filter) => filter.value !== 'all'
				) as filter}

					<button
						class="sidebar-item"
						class:active={
							activeFilter === filter.value
						}
						on:click={() =>
							selectFilter(filter.value)}
					>

						<svelte:component
							this={filter.icon}
							size={15}
						/>

						<span>
							{filter.label}
						</span>

						<span class="sidebar-count">
							{allContent.filter(
								(c) =>
									c.type === filter.value
							).length}
						</span>

					</button>

				{/each}

			</div>

			<div class="author-box">

				<div class="author-icon">
					<BookOpen size={17} />
				</div>

				<h3>
					For Authors
				</h3>

				<p>
					Are you a doctor or researcher?
					Share your knowledge with the
					Jarurat Care community.
				</p>

				<a href="/cms/login">
					Author Guidelines →
				</a>

			</div>

			<div class="newsletter-box">

				<div class="newsletter-icon">
					✦
				</div>

				<h3>
					Stay Updated
				</h3>

				<p>
					Subscribe to our newsletter and
					never miss an important update.
				</p>

				<button
					on:click={() =>
						toast.success(
							'Newsletter subscription coming soon!'
						)}
				>
					Subscribe Now
				</button>

			</div>

		</aside>

		<!-- =====================================================
		     MAIN CONTENT
		===================================================== -->

		<main class="community-main">

			{#if selectedItem}

				<!-- DETAIL -->

				<section class="detail-view">

					<button
						class="detail-back"
						on:click={closeItem}
					>
						<ArrowLeft size={16} />
						Back to Community
					</button>

					<article class="detail-card">

						<div class="detail-hero">

							<img
								src={
									selectedItem.thumbnail ||
									getDefaultThumbnail(
										selectedItem.type,
										selectedItem.id
									)
								}
								alt={selectedItem.title}
							/>

							<div class="detail-type">
								{TYPE_LABELS[
									selectedItem.type
								] || selectedItem.type}
							</div>

						</div>

						<div class="detail-body">

							<div class="detail-category">
								{TYPE_LABELS[
									selectedItem.type
								] || selectedItem.type}
							</div>

							<h1>
								{selectedItem.title}
							</h1>

							{#if selectedItem.subtitle}
								<p class="detail-subtitle">
									{selectedItem.subtitle}
								</p>
							{/if}

							<div class="detail-meta">

								<span>
									✍
									{selectedItem.author}
								</span>

								<span>•</span>

								<span>
									📅
									{formatDate(
										selectedItem.date
									)}
								</span>

							</div>

							<div class="detail-content">

								{#if selectedItem.type === 'article'}

									{#if selectedItem.abstract}
										<div class="content-section">
											<h2>Abstract</h2>

											<div>
												{@html selectedItem.abstract}
											</div>
										</div>
									{/if}

									{#if selectedItem.introduction}
										<div class="content-section">
											<h2>Introduction</h2>

											<div>
												{@html selectedItem.introduction}
											</div>
										</div>
									{/if}

									{#if selectedItem.methods}
										<div class="content-section">
											<h2>Methods</h2>

											<div>
												{@html selectedItem.methods}
											</div>
										</div>
									{/if}

									{#if selectedItem.results}
										<div class="content-section">
											<h2>Results</h2>

											<div>
												{@html selectedItem.results}
											</div>
										</div>
									{/if}

									{#if selectedItem.discussion}
										<div class="content-section">
											<h2>Discussion</h2>

											<div>
												{@html selectedItem.discussion}
											</div>
										</div>
									{/if}

									{#if selectedItem.conclusion}
										<div class="content-section">
											<h2>Conclusion</h2>

											<div>
												{@html selectedItem.conclusion}
											</div>
										</div>
									{/if}

									{#if selectedItem.funding}
										<div class="content-section">
											<h2>Funding</h2>

											<div>
												{@html selectedItem.funding}
											</div>
										</div>
									{/if}

									{#if selectedItem.acknowledgements}
										<div class="content-section">
											<h2>Acknowledgements</h2>

											<div>
												{@html selectedItem.acknowledgements}
											</div>
										</div>
									{/if}

								{:else}

									<div class="prose">
										{@html selectedItem.content}
									</div>

								{/if}

							</div>

						</div>

					</article>

				</section>

			{:else}

				<!-- =================================================
				     HERO
				================================================= -->

				<section class="community-hero">

					<div class="hero-copy">

						<span class="hero-eyebrow">
							JARURAT CARE FOUNDATION
						</span>

						<h1>
							Cancer News &
							<br />
							<span>Expert Insights</span>
						</h1>

						<p>
							Stay informed with the latest
							research, expert insights, health
							news and resources from our
							medical community.
						</p>

					</div>

					{#if sorted.length > 0}

						<button
							class="featured-card"
							on:click={() =>
								openItem(sorted[0])}
						>

							<img
								src={
									sorted[0].thumbnail ||
									getDefaultThumbnail(
										sorted[0].type,
										sorted[0].id
									)
								}
								alt={sorted[0].title}
							/>

							<div class="featured-overlay"></div>

							<div class="featured-content">

								<span class="featured-badge">
									{TYPE_LABELS[
										sorted[0].type
									] || sorted[0].type}
								</span>

								<h2>
									{sorted[0].title}
								</h2>

								<p>
									{makeExcerpt(
										sorted[0].excerpt ||
											sorted[0].content,
										115
									)}
								</p>

								<span class="featured-read">
									Read Full Article
									<ChevronRight
										size={15}
									/>
								</span>

							</div>

						</button>

					{:else}

						<div class="featured-empty">
							<BookOpen size={35} />
							<p>
								No featured content available.
							</p>
						</div>

					{/if}

				</section>

				<!-- =================================================
				     TRENDING
				================================================= -->

				<section
					class="trending-section"
					id="trending-section"
				>

					<div class="section-label">

						<TrendingUp size={16} />

						<span>
							Trending
						</span>

					</div>

					<div class="topic-list">

						<button
							class:topic-active={
								activeFilter === 'research'
							}
							on:click={() =>
								selectFilter('research')}
						>
							Research
						</button>

						<button
							class:topic-active={
								activeFilter === 'news'
							}
							on:click={() =>
								selectFilter('news')}
						>
							Cancer News
						</button>

						<button
							class:topic-active={
								activeFilter === 'article'
							}
							on:click={() =>
								selectFilter('article')}
						>
							Clinical Research
						</button>

						<button
							class:topic-active={
								activeFilter === 'blog'
							}
							on:click={() =>
								selectFilter('blog')}
						>
							Blogs
						</button>

						<button
							class:topic-active={
								activeFilter === 'faq'
							}
							on:click={() =>
								selectFilter('faq')}
						>
							FAQs
						</button>

						<button
							class:topic-active={
								activeFilter === 'event'
							}
							on:click={() =>
								selectFilter('event')}
						>
							Events
						</button>

					</div>

				</section>

				<!-- =====    CONTENT TOOLBAR   ======= -->

				<section class="content-toolbar">

					<div>

						<h2>
							{#if sortBy === 'views_desc'}
								Popular Content
							{:else if activeFilter === 'all'}
								Latest Research
							{:else}
								{TYPE_LABELS[activeFilter] || activeFilter}
							{/if}
						</h2>

						<p>
							{sorted.length}
							{sorted.length === 1
								? ' publication'
								: ' publications'}
						</p>

					</div>

					<div class="toolbar-actions">

						<div class="toolbar-search">

							<Search size={15} />

							<input
								type="text"
								bind:value={searchQuery}
								placeholder="Search community..."
								on:input={() =>
									(currentPage = 1)}
							/>

							{#if searchQuery}

								<button
									on:click={() => {
										searchQuery = '';
										currentPage = 1;
									}}
								>
									<X size={13} />
								</button>

							{/if}

						</div>

						<select bind:value={sortBy}>
							<option value="views_desc">
								Most Views
							</option>

							<option value="date">
								Newest First
							</option>

							<option value="date_asc">
								Oldest First
							</option>

							<option value="title">
								A – Z
							</option>

							<option value="title_desc">
								Z – A
							</option>
						</select>

						<div class="view-toggle">

							<button
								class:active={
									viewMode === 'grid'
								}
								on:click={() =>
									(viewMode = 'grid')}
								aria-label="Grid view"
							>
								<LayoutGrid size={16} />
							</button>

							<button
								class:active={
									viewMode === 'list'
								}
								on:click={() =>
									(viewMode = 'list')}
								aria-label="List view"
							>
								<List size={16} />
							</button>

						</div>

					</div>

				</section>

				<!-- CONTENT  -->

				{#if loading}

					<div class="loading-grid">

						{#each Array(6) as _}
							<div class="loading-card"></div>
						{/each}

					</div>

				{:else if errorMsg}

					<div class="empty-state">

						<h3>
							Something went wrong
						</h3>

						<p>
							{errorMsg}
						</p>

					</div>

				{:else if sorted.length === 0}

					<div class="empty-state">

						<div class="empty-icon">
							<Search size={30} />
						</div>

						<h3>
							No content found
						</h3>

						<p>
							Try a different filter or
							search term.
						</p>

						<button
							on:click={() => {
								searchQuery = '';
								activeFilter = 'all';
								currentPage = 1;
							}}
						>
							Clear Filters
						</button>

					</div>

				{:else if viewMode === 'grid'}

					<div class="content-grid">

						{#each paged as item}

							<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
							<article
								class="content-card"
								on:click={() =>
									openItem(item)}
								role="button"
								tabindex="0"
								on:keydown={(e) => {
									if (e.key === 'Enter') {
										openItem(item);
									}
								}}
							>

								<div class="card-image">

									<img
										src={
											item.thumbnail ||
											getDefaultThumbnail(
												item.type,
												item.id
											)
										}
										alt={item.title}
										loading="lazy"
									/>

									<span
										class="type-badge"
										style={`background:${TYPE_COLORS[item.type] || '#0155bd'}`}
									>
										{TYPE_LABELS[
											item.type
										] || item.type}
									</span>

								</div>

								<div class="card-content">

									<div class="card-meta">

										<span>
											{formatDate(
												item.date
											)}
										</span>

										<span class="dot">
											•
										</span>

										<span>
											{item.category ||
												TYPE_LABELS[
													item.type
												]}
										</span>

									</div>

									<h3>
										{item.title}
									</h3>

									<p>
										{makeExcerpt(
											item.excerpt ||
												item.content,
											145
										)}
									</p>

									<div class="card-bottom">

										<div class="author">

											<div class="author-avatar">
												{(
													item.author ||
													'J'
												)
													.charAt(0)
													.toUpperCase()}
											</div>

											<span>
												{item.author ||
													'Jarurat Care'}
											</span>

										</div>

										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<!-- svelte-ignore a11y-no-static-element-interactions -->
										<div
											class="card-actions"
											on:click|stopPropagation
										>

											<button
												class="flex items-center gap-1.5"
												class:liked={
													localLikes[
														item.id
													]
												}
												on:click={(e) =>
													toggleLike(
														e,
														item
													)}
												aria-label="Like"
											>
												<Heart
													size={15}
													fill={
														localLikes[
															item.id
														]
															? 'currentColor'
															: 'none'
													}
												/>
												{#if item.likes_count}
													<span class="text-xs font-medium">{item.likes_count}</span>
												{/if}
											</button>

											<button
												on:click={(e) =>
													shareArticle(
														e,
														item
													)}
												aria-label="Share"
											>
												<Share2
													size={15}
												/>
											</button>

											<button
												class:saved={
													localSaves[
														item.id
													]
												}
												on:click={(e) =>
													toggleSave(
														e,
														item
													)}
												aria-label="Save"
											>
												<Bookmark
													size={15}
													fill={
														localSaves[
															item.id
														]
															? 'currentColor'
															: 'none'
													}
												/>
											</button>

										</div>

									</div>

								</div>

							</article>

						{/each}

					</div>

				{:else}

					<div class="list-view">

						{#each paged as item}

							<div
								class="list-card"
								on:click={() =>
									openItem(item)}
								role="button"
								tabindex="0"
								on:keydown={(e) => {
									if (e.key === 'Enter') {
										openItem(item);
									}
								}}
							>

								<img
									src={
										item.thumbnail ||
										getDefaultThumbnail(
											item.type,
											item.id
										)
									}
									alt={item.title}
									loading="lazy"
								/>

								<div class="list-content">
									<div class="list-meta">

										<span
											style={`color:${TYPE_COLORS[item.type] || '#0155bd'}`}
										>
											{TYPE_LABELS[
												item.type
											] || item.type}
										</span>

										<span>
											•
										</span>

										<span>
											{formatDate(
												item.date
											)}
										</span>

									</div>

									<h3>
										{item.title}
									</h3>

									<p>
										{makeExcerpt(
											item.excerpt ||
												item.content,
											220
										)}
									</p>

									<span class="list-author">
										{item.author ||
											'Jarurat Care'}
									</span>

								</div>

								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<div
									class="list-actions"
									on:click|stopPropagation
								>

									<button
										class="flex items-center gap-1.5"
										class:liked={
											localLikes[
												item.id
											]
										}
										on:click={(e) =>
											toggleLike(
												e,
												item
											)}
										aria-label="Like"
									>
										<Heart
											size={16}
											fill={
												localLikes[
													item.id
												]
													? 'currentColor'
													: 'none'
											}
										/>
										{#if item.likes_count}
											<span class="text-xs font-medium">{item.likes_count}</span>
										{/if}
									</button>

									<button
										on:click={(e) =>
											shareArticle(
												e,
												item
											)}
										aria-label="Share"
									>
										<Share2 size={16} />
									</button>

									<button
										class:saved={
											localSaves[
												item.id
											]
										}
										on:click={(e) =>
											toggleSave(
												e,
												item
											)}
										aria-label="Save"
									>
										<Bookmark
											size={16}
											fill={
												localSaves[
													item.id
												]
													? 'currentColor'
													: 'none'
											}
										/>
									</button>

									<ChevronRight size={18} />

								</div>

							</div>

						{/each}

					</div>

				{/if}


				<!-- =================================================
				     PAGINATION
				================================================= -->

				{#if totalPages > 1}

					<div class="pagination">

						<button
							disabled={currentPage === 1}
							on:click={() =>
								currentPage--}
						>
							← Previous
						</button>

						<span>
							Page {currentPage} of
							{totalPages}
						</span>

						<button
							disabled={
								currentPage === totalPages
							}
							on:click={() =>
								currentPage++}
						>
							Next →
						</button>

					</div>

				{/if}

			{/if}

		</main>

	</div>

	<div class="footer-wrap">
		<NewsFooter />
	</div>

</div>

<style>
	/* Optimistic UI Animation */
	@keyframes pop-icon {
		0% { transform: scale(1); }
		50% { transform: scale(1.4); }
		100% { transform: scale(1); }
	}
	button.liked svg,
	button.saved svg,
	button.active svg {
		animation: pop-icon 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
	}
	:global(body) {
		margin: 0;
	}

	:global(*) {
		box-sizing: border-box;
	}

	/* =========================================================
	   COMMUNITY PAGE
	   IMPORTANT:
	   The existing main Nav is outside this container.
	   Padding keeps this page BELOW that navbar.
	========================================================= */

	.community-page {
	min-height: 100vh;
	background: #f7f9fc;
	color: #172554;
	font-family:
		'DM Sans',
		Arial,
		sans-serif;

	/* Space for the main JCF website navbar */
	padding-top: 96px;
}

	/* =========================================================
	   COMMUNITY TOPBAR
	========================================================= */

	.community-topbar {
	background: #ffffff;
	border-bottom: 1px solid #e5eaf2;

	/* Keep community toolbar completely below main navbar */
	position: sticky;
	top: 96px;
	z-index: 40;
}

	.topbar-inner {
	max-width: 1440px;
	margin: 0 auto;
	padding: 10px 28px;
	min-height: 62px;
	display: flex;
	align-items: center;
	gap: 16px;
}

	.back-home {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		border: 1px solid #dce4ef;
		background: white;
		color: #334155;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		flex-shrink: 0;
	}

	.back-home:hover {
		background: #eef4ff;
		color: #0155bd;
	}

	.top-search {
		width: min(520px, 55vw);
		height: 40px;
		display: flex;
		align-items: center;
		gap: 9px;
		padding: 0 13px;
		border: 1px solid #cdd9eb;
		border-radius: 7px;
		background: white;
		color: #94a3b8;
	}

	.top-search input {
		border: 0;
		outline: 0;
		width: 100%;
		font-size: 12px;
		color: #172554;
		background: transparent;
	}

	.clear-top-search {
		border: 0;
		background: transparent;
		color: #94a3b8;
		cursor: pointer;
	}

	.top-actions {
		margin-left: auto;
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.icon-button {
		border: 0;
		background: transparent;
		color: #172554;
		cursor: pointer;
		padding: 7px;
	}

	.profile-dropdown-container {
		position: relative;
	}

	.profile-button {
		display: flex;
		align-items: center;
		gap: 9px;
		text-decoration: none;
		color: #172554;
		font-size: 13px;
		font-weight: 600;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
	}

	.dropdown-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 99;
	}

	.dropdown-menu {
		position: absolute;
		top: calc(100% + 12px);
		right: 0;
		background: white;
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
		min-width: 230px;
		z-index: 100;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1);
	}

	@keyframes slideDown {
		from { opacity: 0; transform: translateY(-8px); }
		to { opacity: 1; transform: translateY(0); }
	}

	.dropdown-header {
		padding: 12px 14px;
		border-bottom: 1px solid #f1f5f9;
		background: #f8fafc;
	}

	.user-email {
		margin: 0;
		font-size: 14px;
		font-weight: 600;
		color: #0f172a;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.user-role-label {
		margin: 4px 0 0;
		font-size: 11px;
		font-weight: 500;
		color: #64748b;
		text-transform: capitalize;
		display: inline-flex;
		padding: 2px 8px;
		background: #e2e8f0;
		border-radius: 12px;
	}

	.dropdown-actions {
		padding: 4px 6px;
		display: flex;
		flex-direction: column;
		gap: 0px;
	}

	.dropdown-footer {
		padding: 4px 6px;
		border-top: 1px solid #f1f5f9;
	}

	.dropdown-item {
		padding: 8px 10px;
		text-decoration: none;
		color: #475569;
		font-size: 13.5px;
		font-weight: 500;
		background: transparent;
		border: none;
		border-radius: 6px;
		text-align: left;
		cursor: pointer;
		transition: all 0.2s;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.dropdown-item:hover {
		background: #f1f5f9;
		color: #0f172a;
	}

	.dropdown-item.logout {
		color: #ef4444;
		width: 100%;
	}

	.dropdown-item.logout:hover {
		background: #fef2f2;
		color: #dc2626;
	}

	.avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: #29317b;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
	}

	.auth-actions {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	.auth-actions a {
		text-decoration: none;
		font-size: 12px;
		font-weight: 700;
		padding: 8px 14px;
		border-radius: 7px;
		color: #29317b;
	}

	.auth-actions .register-link {
		background: #29317b;
		color: white;
	}

	/* =========================================================
	   MAIN LAYOUT
	========================================================= */

	.community-layout {
		max-width: 1440px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 230px minmax(0, 1fr);
		min-height: 900px;
	}

	/* =========================================================
	   SIDEBAR
	========================================================= */

	.community-sidebar {
		background: #ffffff;
		border-right: 1px solid #e5eaf2;
		padding: 20px 12px;
	}

	.sidebar-brand {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 4px 8px 20px;
		border-bottom: 1px solid #edf1f6;
		margin-bottom: 15px;
	}

	.sidebar-arrow {
		width: 26px;
		height: 26px;
		border-radius: 50%;
		background: #eef3ff;
		color: #29317b;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 13px;
	}

	.sidebar-brand span,
	.sidebar-brand strong {
		display: block;
	}

	.sidebar-brand span {
		font-size: 10px;
		color: #64748b;
	}

	.sidebar-brand strong {
		font-size: 15px;
		color: #172554;
	}

	.sidebar-section {
		padding: 8px 0 15px;
	}

	.sidebar-heading {
		margin: 0 10px 7px;
		font-size: 10px;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: #94a3b8;
	}

	.sidebar-item {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 9px;
		padding: 9px 10px;
		border: 0;
		background: transparent;
		color: #475569;
		font-size: 12px;
		border-radius: 7px;
		cursor: pointer;
		text-align: left;
		transition: 0.2s ease;
	}

	.sidebar-item:hover,
	.sidebar-item.active {
		background: #eef3ff;
		color: #29317b;
		font-weight: 700;
	}

	.sidebar-count {
		margin-left: auto;
		font-size: 10px;
		color: #94a3b8;
	}

	.author-box,
	.newsletter-box {
		margin: 10px 0;
		padding: 15px;
		border-radius: 10px;
		border: 1px solid #e5eaf2;
		background: #fbfcff;
	}

	.author-icon,
	.newsletter-icon {
		width: 29px;
		height: 29px;
		border-radius: 8px;
		background: #eef3ff;
		color: #29317b;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 10px;
	}

	.author-box h3,
	.newsletter-box h3 {
		font-size: 12px;
		margin: 0 0 6px;
		color: #172554;
	}

	.author-box p,
	.newsletter-box p {
		font-size: 10px;
		line-height: 1.55;
		color: #64748b;
		margin: 0 0 10px;
	}

	.author-box a {
		color: #29317b;
		text-decoration: none;
		font-size: 10px;
		font-weight: 700;
	}

	.newsletter-box {
		background: #f5f8ff;
		border-color: #dce7ff;
	}

	.newsletter-icon {
		background: #29317b;
		color: white;
	}

	.newsletter-box button {
		width: 100%;
		padding: 8px;
		border: 1px solid #b9c9ef;
		border-radius: 6px;
		background: white;
		color: #29317b;
		font-size: 10px;
		font-weight: 700;
		cursor: pointer;
	}

	/* =========================================================
	   MAIN
	========================================================= */

	.community-main {
		padding: 24px 32px 70px;
		min-width: 0;
	}

	/* =========================================================
	   HERO
	========================================================= */

	.community-hero {
		display: grid;
		grid-template-columns: 0.9fr 1.4fr;
		gap: 30px;
		align-items: center;
		margin-bottom: 25px;
	}

	.hero-copy {
		padding: 8px 0;
	}

	.hero-eyebrow {
		font-size: 10px;
		font-weight: 800;
		color: #5b67b5;
		letter-spacing: 0.12em;
	}

	.hero-copy h1 {
		font-family: Georgia, serif;
		font-size: clamp(28px, 3vw, 42px);
		line-height: 1.08;
		color: #172554;
		margin: 10px 0 14px;
	}

	.hero-copy h1 span {
		color: #29317b;
	}

	.hero-copy p {
		max-width: 420px;
		color: #64748b;
		font-size: 13px;
		line-height: 1.7;
		margin: 0;
	}

	.featured-card {
		min-height: 240px;
		border: 0;
		border-radius: 12px;
		overflow: hidden;
		position: relative;
		cursor: pointer;
		text-align: left;
		background: #172554;
		padding: 0;
		color: white;
	}

	.featured-card img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.featured-overlay {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(
				90deg,
				rgba(13, 36, 96, 0.94),
				rgba(13, 36, 96, 0.48),
				rgba(13, 36, 96, 0.1)
			);
	}

	.featured-content {
		position: relative;
		z-index: 2;
		max-width: 430px;
		padding: 30px;
	}

	.featured-badge {
		display: inline-flex;
		padding: 5px 9px;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.25);
		font-size: 9px;
		font-weight: 800;
		text-transform: uppercase;
	}

	.featured-content h2 {
		font-family: Georgia, serif;
		font-size: 24px;
		line-height: 1.2;
		margin: 13px 0 9px;
	}

	.featured-content p {
		font-size: 11px;
		line-height: 1.6;
		color: #e4eaf7;
		margin: 0 0 15px;
	}

	.featured-read {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 11px;
		font-weight: 700;
	}

	.featured-empty {
		min-height: 240px;
		border-radius: 12px;
		background: white;
		border: 1px solid #e5eaf2;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		color: #94a3b8;
		gap: 8px;
	}

	/* =========================================================
	   TRENDING
	========================================================= */

	.trending-section {
		display: flex;
		align-items: center;
		gap: 18px;
		margin-bottom: 23px;
	}

	.section-label {
		display: flex;
		align-items: center;
		gap: 7px;
		font-size: 11px;
		font-weight: 800;
		color: #172554;
		white-space: nowrap;
	}

	.section-label svg {
		color: #29317b;
	}

	.topic-list {
		display: flex;
		gap: 7px;
		flex-wrap: wrap;
	}

	.topic-list button {
		border: 1px solid #e1e7f0;
		background: white;
		border-radius: 999px;
		padding: 6px 11px;
		font-size: 10px;
		color: #64748b;
		cursor: pointer;
	}

	.topic-list button:hover,
	.topic-list button.topic-active {
		color: #29317b;
		border-color: #aeb9e9;
		background: #f2f5ff;
	}

	/* =========================================================
	   TOOLBAR
	========================================================= */

	.content-toolbar {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;
		margin-bottom: 18px;
		padding-bottom: 13px;
		border-bottom: 1px solid #e4e9f1;
	}

	.content-toolbar h2 {
		font-family: Georgia, serif;
		color: #172554;
		font-size: 22px;
		margin: 0 0 4px;
	}

	.content-toolbar p {
		font-size: 10px;
		color: #94a3b8;
		margin: 0;
	}

	.toolbar-actions {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.toolbar-search {
		display: flex;
		align-items: center;
		gap: 7px;
		border: 1px solid #dbe3ee;
		background: white;
		border-radius: 7px;
		padding: 7px 9px;
		width: 210px;
		color: #94a3b8;
	}

	.toolbar-search input {
		width: 100%;
		border: 0;
		outline: 0;
		font-size: 10px;
		color: #172554;
	}

	.toolbar-search button {
		border: 0;
		background: transparent;
		color: #94a3b8;
		cursor: pointer;
	}

	.toolbar-actions select {
		border: 1px solid #dbe3ee;
		background: white;
		border-radius: 7px;
		padding: 8px 9px;
		font-size: 10px;
		color: #475569;
		outline: 0;
	}

	.view-toggle {
		display: flex;
		gap: 2px;
		padding: 3px;
		border: 1px solid #dbe3ee;
		border-radius: 7px;
		background: white;
	}

	.view-toggle button {
		border: 0;
		background: transparent;
		color: #94a3b8;
		border-radius: 5px;
		padding: 5px 6px;
		cursor: pointer;
		display: flex;
	}

	.view-toggle button.active {
		background: #29317b;
		color: white;
	}

	/* =========================================================
	   CARDS
	========================================================= */

	.content-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 18px;
	}

	.content-card {
		background: white;
		border: 1px solid #e3e8f0;
		border-radius: 10px;
		overflow: hidden;
		cursor: pointer;
		transition: 0.22s ease;
	}

	.content-card:hover {
		transform: translateY(-3px);
		border-color: #bcc8ec;
		box-shadow: 0 12px 30px rgba(35, 49, 123, 0.09);
	}

	.card-image {
		height: 145px;
		position: relative;
		overflow: hidden;
		background: #eef2f7;
	}

	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.content-card:hover .card-image img {
		transform: scale(1.04);
	}

	.type-badge {
		position: absolute;
		left: 10px;
		top: 10px;
		padding: 4px 7px;
		border-radius: 4px;
		color: white;
		font-size: 8px;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.card-content {
		padding: 13px;
	}

	.card-meta {
		display: flex;
		gap: 6px;
		font-size: 8px;
		color: #94a3b8;
		margin-bottom: 7px;
		text-transform: uppercase;
		font-weight: 700;
	}

	.card-meta .dot {
		color: #cbd5e1;
	}

	.card-content h3 {
		font-family: Georgia, serif;
		font-size: 15px;
		line-height: 1.35;
		color: #172554;
		margin: 0 0 7px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card-content > p {
		font-size: 10px;
		line-height: 1.6;
		color: #64748b;
		margin: 0 0 12px;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card-bottom {
		border-top: 1px solid #edf1f6;
		padding-top: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
	}

	.author {
		display: flex;
		align-items: center;
		gap: 6px;
		min-width: 0;
	}

	.author-avatar {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background: #eef3ff;
		color: #29317b;
		font-size: 9px;
		font-weight: 800;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.author span {
		font-size: 8px;
		color: #64748b;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.card-actions {
		display: flex;
		align-items: center;
		gap: 1px;
	}

	.card-actions button,
	.list-actions button,
	.recent-actions button {
		border: 0;
		background: transparent;
		color: #94a3b8;
		padding: 5px;
		cursor: pointer;
		border-radius: 5px;
		display: flex;
	}

	.card-actions button:hover,
	.list-actions button:hover,
	.recent-actions button:hover {
		background: #f1f4f9;
		color: #29317b;
	}

	.card-actions button.liked {
		color: #ef4444;
	}

	.card-actions button.saved,
	.list-actions button.saved,
	.recent-actions button.saved {
		color: #29317b;
	}

	/* =========================================================
	   LIST VIEW
	========================================================= */

	.list-view {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.list-card {
		background: white;
		border: 1px solid #e3e8f0;
		border-radius: 10px;
		padding: 11px;
		display: flex;
		align-items: center;
		gap: 14px;
		cursor: pointer;
		transition: 0.2s ease;
	}

	.list-card:hover {
		border-color: #bcc8ec;
		box-shadow: 0 8px 20px rgba(35, 49, 123, 0.07);
	}

	.list-card > img {
		width: 105px;
		height: 75px;
		border-radius: 7px;
		object-fit: cover;
		flex-shrink: 0;
	}

	.list-content {
		flex: 1;
		min-width: 0;
	}

	.list-meta {
		display: flex;
		gap: 6px;
		font-size: 8px;
		font-weight: 800;
		text-transform: uppercase;
		margin-bottom: 5px;
		color: #94a3b8;
	}

	.list-content h3 {
		font-family: Georgia, serif;
		font-size: 15px;
		margin: 0 0 5px;
		color: #172554;
	}

	.list-content p {
		font-size: 10px;
		color: #64748b;
		line-height: 1.5;
		margin: 0 0 6px;
	}

	.list-author {
		font-size: 8px;
		font-weight: 700;
		color: #94a3b8;
	}

	.list-actions {
		display: flex;
		align-items: center;
		gap: 3px;
		color: #94a3b8;
	}

	/* =========================================================
	   RECENTLY PUBLISHED
	========================================================= */

	.recent-section {
		margin-top: 45px;
	}

	.recent-header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		margin-bottom: 14px;
	}

	.section-eyebrow {
		font-size: 8px;
		font-weight: 800;
		color: #6c78c5;
		letter-spacing: 0.12em;
	}

	.recent-header h2 {
		font-family: Georgia, serif;
		color: #172554;
		font-size: 21px;
		margin: 4px 0 0;
	}

	.recent-header > button {
		display: flex;
		align-items: center;
		gap: 3px;
		border: 0;
		background: transparent;
		color: #29317b;
		font-size: 10px;
		font-weight: 800;
		cursor: pointer;
	}

	.recent-table {
		background: white;
		border: 1px solid #e3e8f0;
		border-radius: 10px;
		overflow: hidden;
	}

	.recent-row {
		display: grid;
		grid-template-columns: 2.5fr 1fr 1.2fr 0.9fr 65px;
		align-items: center;
		gap: 15px;
		padding: 10px 13px;
		border-bottom: 1px solid #edf1f6;
		cursor: pointer;
	}

	.recent-row:last-child {
		border-bottom: 0;
	}

	.recent-row:not(.recent-head):hover {
		background: #fafbff;
	}

	.recent-head {
		cursor: default;
		background: #fafbfc;
		color: #94a3b8;
		font-size: 8px;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.recent-title {
		display: flex;
		align-items: center;
		gap: 9px;
		min-width: 0;
	}

	.recent-title img {
		width: 42px;
		height: 30px;
		object-fit: cover;
		border-radius: 5px;
		flex-shrink: 0;
	}

	.recent-title strong,
	.recent-title small {
		display: block;
	}

	.recent-title strong {
		font-size: 9px;
		color: #172554;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.recent-title small {
		font-size: 8px;
		color: #94a3b8;
		margin-top: 2px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.recent-type,
	.recent-author,
	.recent-date {
		font-size: 8px;
	}

	.recent-type {
		font-weight: 800;
	}

	.recent-author,
	.recent-date {
		color: #64748b;
	}

	.recent-actions {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 2px;
		color: #94a3b8;
	}

	/* =========================================================
	   PAGINATION
	========================================================= */

	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 15px;
		margin-top: 28px;
	}

	.pagination button {
		border: 1px solid #dbe3ee;
		background: white;
		border-radius: 7px;
		padding: 8px 13px;
		color: #29317b;
		font-size: 10px;
		font-weight: 700;
		cursor: pointer;
	}

	.pagination button:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.pagination span {
		font-size: 10px;
		color: #64748b;
		font-weight: 700;
	}

	/* =========================================================
	   LOADING
	========================================================= */

	.loading-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 18px;
	}

	.loading-card {
		height: 310px;
		border-radius: 10px;
		background: linear-gradient(
			90deg,
			#eef2f7 25%,
			#f8fafc 50%,
			#eef2f7 75%
		);
		background-size: 200% 100%;
		animation: shimmer 1.4s infinite;
	}

	@keyframes shimmer {
		0% {
			background-position: 200% 0;
		}

		100% {
			background-position: -200% 0;
		}
	}

	/* =========================================================
	   EMPTY STATE
	========================================================= */

	.empty-state {
		background: white;
		border: 1px solid #e3e8f0;
		border-radius: 10px;
		padding: 70px 20px;
		text-align: center;
	}

	.empty-icon {
		width: 58px;
		height: 58px;
		border-radius: 50%;
		background: #eef3ff;
		color: #29317b;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 15px;
	}

	.empty-state h3 {
		font-family: Georgia, serif;
		color: #172554;
		margin: 0 0 7px;
	}

	.empty-state p {
		color: #64748b;
		font-size: 12px;
		margin-bottom: 15px;
	}

	.empty-state button {
		border: 0;
		background: #29317b;
		color: white;
		padding: 9px 15px;
		border-radius: 7px;
		font-size: 10px;
		font-weight: 700;
		cursor: pointer;
	}

	/* =========================================================
	   DETAIL VIEW
	========================================================= */

	.detail-view {
		max-width: 900px;
		margin: 0 auto;
	}

	.detail-back {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		border: 1px solid #dce4ef;
		background: white;
		color: #29317b;
		border-radius: 7px;
		padding: 8px 12px;
		font-size: 10px;
		font-weight: 700;
		cursor: pointer;
		margin-bottom: 16px;
	}

	.detail-card {
		background: white;
		border: 1px solid #e3e8f0;
		border-radius: 14px;
		overflow: hidden;
	}

	.detail-hero {
		height: 300px;
		position: relative;
	}

	.detail-hero img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.detail-type {
		position: absolute;
		left: 20px;
		bottom: 20px;
		background: #29317b;
		color: white;
		padding: 7px 11px;
		border-radius: 5px;
		font-size: 9px;
		font-weight: 800;
		text-transform: uppercase;
	}

	.detail-body {
		padding: 35px;
	}

	.detail-category {
		color: #6c78c5;
		font-size: 9px;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 8px;
	}

	.detail-body h1 {
		font-family: Georgia, serif;
		font-size: 34px;
		line-height: 1.2;
		color: #172554;
		margin: 0 0 10px;
	}

	.detail-subtitle {
		color: #64748b;
		font-size: 14px;
		line-height: 1.6;
		margin: 0 0 15px;
	}

	.detail-meta {
		display: flex;
		gap: 10px;
		align-items: center;
		color: #64748b;
		font-size: 10px;
		border-bottom: 1px solid #e8edf4;
		padding-bottom: 20px;
		margin-bottom: 25px;
	}

	.detail-content {
		color: #334155;
		font-size: 14px;
		line-height: 1.85;
	}

	.content-section {
		margin-bottom: 30px;
	}

	.content-section h2 {
		font-family: Georgia, serif;
		color: #172554;
		font-size: 20px;
		border-bottom: 1px solid #e8edf4;
		padding-bottom: 8px;
		margin-bottom: 12px;
	}

	.prose {
		line-height: 1.9;
	}

	.footer-wrap {
		margin-top: 0;
	}

	/* =========================================================
	   RESPONSIVE
	========================================================= */

	@media (max-width: 1100px) {

		.community-layout {
			grid-template-columns: 200px minmax(0, 1fr);
		}

		.community-main {
			padding: 22px;
		}

		.community-hero {
			grid-template-columns: 1fr;
		}

		.content-grid {
			grid-template-columns: repeat(
				2,
				minmax(0, 1fr)
			);
		}

		.loading-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.recent-row {
			grid-template-columns:
				2fr
				1fr
				1fr
				65px;
		}

		.recent-row > :nth-child(4) {
			display: none;
		}
	}

	@media (max-width: 800px) {

		/*
		 * Mobile main Nav is usually shorter.
		 * Keep the community page below it.
		 */

		.community-page {
			--main-nav-height: 64px;
			padding-top: var(--main-nav-height);
		}

		.community-topbar {
			top: var(--main-nav-height);
		}

		.community-layout {
			display: block;
		}

		.community-sidebar {
			display: none;
		}

		.topbar-inner {
			padding: 10px 15px;
		}

		.top-search {
			width: auto;
			flex: 1;
		}

		.profile-label {
			display: none;
		}

		.community-main {
			padding: 20px 15px 50px;
		}

		.community-hero {
			grid-template-columns: 1fr;
		}

		.content-toolbar {
			align-items: stretch;
			flex-direction: column;
		}

		.toolbar-actions {
			width: 100%;
			flex-wrap: wrap;
		}

		.toolbar-search {
			flex: 1;
			width: auto;
		}

		.content-grid {
			grid-template-columns: 1fr;
		}

		.loading-grid {
			grid-template-columns: 1fr;
		}

		.trending-section {
			align-items: flex-start;
			flex-direction: column;
		}

		.recent-table {
			overflow-x: auto;
		}

		.recent-row {
			min-width: 650px;
		}
	}

	@media (max-width: 560px) {

		.community-page {
			--main-nav-height: 58px;
			padding-top: var(--main-nav-height);
		}

		.community-topbar {
			top: var(--main-nav-height);
		}

		.auth-actions a {
			padding: 7px 9px;
		}

		.back-home {
			display: none;
		}

		.featured-content {
			padding: 22px;
		}

		.featured-content h2 {
			font-size: 20px;
		}

		.card-image {
			height: 190px;
		}

		.list-card {
			align-items: flex-start;
		}

		.list-card > img {
			width: 85px;
			height: 65px;
		}

		.list-actions {
			display: none;
		}

		.detail-body {
			padding: 22px;
		}

		.detail-body h1 {
			font-size: 26px;
		}

		.detail-hero {
			height: 220px;
		}
	}
</style>