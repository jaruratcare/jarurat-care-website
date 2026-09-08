<script lang="ts">
	import { Search, Bell, ChevronDown } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import { cmsSupabase } from '$lib/cmsSupabase';

	export let doctorName: string = '';
	export let unreadCount: number = 0;
	export let isReviewer: boolean = false;
	export let email: string = 'doctor@jarurat.care';
	export let avatar: string = '';
	export let userId: string = '';

	let showDropdown = false;
	let dropdownRef: HTMLElement;
	let showNotifDropdown = false;
	let notifDropdownRef: HTMLElement;
	let notifications: any[] = [];
	let realtimeChannel: any;

	function closeDropdown(e: MouseEvent) {
		if (showDropdown && dropdownRef && !dropdownRef.contains(e.target as Node)) {
			showDropdown = false;
		}
		if (showNotifDropdown && notifDropdownRef && !notifDropdownRef.contains(e.target as Node)) {
			showNotifDropdown = false;
		}
	}

	import { page } from '$app/stores';

	let query = '';
	
	// Keep input synced with URL if it changes externally
	$: {
		const currentQ = $page.url.searchParams.get('q');
		if (currentQ !== null && query === '') {
			query = currentQ;
		}
	}

	function handleSearch(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			if (query.trim()) {
				goto(`?q=${encodeURIComponent(query.trim())}`);
			} else {
				// Clear search from URL
				const url = new URL($page.url);
				url.searchParams.delete('q');
				goto(url.pathname + url.search);
			}
		}
	}

	$: user = $page.data.session?.user;

	let pollInterval: any;
	let isInitialized = false;

	async function loadNotifications() {
		try {
			const res = await fetch('/api/notifications', { cache: 'no-store' });
			if (res.ok) {
				const { notifications: data } = await res.json();
				notifications = data;
				unreadCount = data.filter((n: any) => !n.is_read).length;
			}
		} catch (err) {
			console.error('Failed to load notifications', err);
		}
	}

	async function markAsRead(id: string) {
		try {
			const res = await fetch('/api/notifications', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id })
			});
			if (res.ok) {
				notifications = notifications.map(n => n.id === id ? { ...n, is_read: true } : n);
				unreadCount = notifications.filter(n => !n.is_read).length;
			}
		} catch (err) {
			console.error('Failed to mark as read', err);
		}
	}

	async function handleNotificationClick(notif: any) {
		if (!notif.is_read) {
			await markAsRead(notif.id);
		}
		if (notif.link) {
			goto(notif.link);
			showNotifDropdown = false;
		}
	}

	async function markAllAsRead() {
		try {
			const res = await fetch('/api/notifications', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: 'all' })
			});
			if (res.ok) {
				notifications = notifications.map(n => ({ ...n, is_read: true }));
				unreadCount = 0;
			}
		} catch (err) {
			console.error('Failed to mark all as read', err);
		}
	}

	function setupRealtime() {
		if (pollInterval) return; // already setup
		pollInterval = setInterval(() => {
			loadNotifications();
		}, 10000);
	}

	onMount(() => {
		if (!isInitialized) {
			isInitialized = true;
			loadNotifications();
			setupRealtime();
		}
	});

	onDestroy(() => {
		if (pollInterval) clearInterval(pollInterval);
	});

	$: notificationGroups = [
		{ label: 'Today', items: [] as any[] },
		{ label: 'Yesterday', items: [] as any[] },
		{ label: 'Older', items: [] as any[] }
	];

	$: {
		const today = new Date();
		const yesterday = new Date(today);
		yesterday.setDate(yesterday.getDate() - 1);
		
		const groups = { Today: [] as any[], Yesterday: [] as any[], Older: [] as any[] };
		
		notifications.forEach(notif => {
			const date = new Date(notif.created_at);
			if (date.toDateString() === today.toDateString()) {
				groups.Today.push(notif);
			} else if (date.toDateString() === yesterday.toDateString()) {
				groups.Yesterday.push(notif);
			} else {
				groups.Older.push(notif);
			}
		});
		
		notificationGroups = [
			{ label: 'Today', items: groups.Today },
			{ label: 'Yesterday', items: groups.Yesterday },
			{ label: 'Older', items: groups.Older }
		].filter(g => g.items.length > 0);
	}
</script>

<svelte:window on:click={closeDropdown} />

<header class="topbar">
	<div class="search-box">
		<Search size={16} class="text-slate-400" />
		<input 
			type="text" 
			placeholder="Search here..." 
			bind:value={query}
			on:keydown={handleSearch}
		/>
	</div>

	<div class="actions">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="notif-wrap" bind:this={notifDropdownRef}>
			<button class="icon-notification" aria-label="Notifications" on:click={() => showNotifDropdown = !showNotifDropdown}>
				<Bell size={20} />
				{#if unreadCount > 0}
					<span class="dot-badge">{unreadCount}</span>
				{/if}
			</button>
			{#if showNotifDropdown}
				<div class="notif-dropdown">
					<div class="notif-header">
						<span>Notifications</span>
					</div>
					<div class="notif-list">
						{#if notifications.length === 0}
							<div class="empty-notif">
								<div class="empty-icon">
									<Bell size={24} class="text-slate-300" />
								</div>
								<p>No notifications yet.</p>
								<span>When you get notifications, they'll show up here.</span>
							</div>
						{:else}
							{#each notificationGroups as group}
								<div class="notif-group-label">{group.label}</div>
								{#each group.items as notif}
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<!-- svelte-ignore a11y-no-static-element-interactions -->
									<div class="notif-item {notif.is_read ? 'read' : 'unread'}" on:click={() => handleNotificationClick(notif)}>
										<div class="notif-icon-wrap">
											<div class="notif-icon">
												<Bell size={16} />
											</div>
											{#if !notif.is_read}
												<div class="unread-dot"></div>
											{/if}
										</div>
										<div class="notif-content-wrap">
											<div class="notif-title">{notif.title}</div>
											<div class="notif-msg">{notif.message}</div>
										</div>
									</div>
								{/each}
							{/each}
						{/if}
					</div>
					{#if unreadCount > 0}
						<div class="notif-footer">
							<a href="#" on:click|preventDefault={markAllAsRead}>Mark all as read</a>
						</div>
					{/if}
				</div>
			{/if}
		</div>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="profile-wrap" bind:this={dropdownRef}>
			<div class="profile-trigger" on:click={() => showDropdown = !showDropdown}>
				{#if avatar}
					<img src={avatar} alt="Doctor Avatar" class="profile-avatar" onerror="this.style.display='none'" />
				{:else}
					<div class="avatar-circle">{doctorName ? doctorName.charAt(0).toUpperCase() : 'D'}</div>
				{/if}
				<div class="user-info">
					<span class="name">{doctorName || 'Doctor'}</span>
					<span class="role" class:role-reviewer={isReviewer}>{isReviewer ? 'Medical Reviewer' : 'Verified Specialist'}</span>
				</div>
				<ChevronDown size={14} class="text-slate-500" />
			</div>

			{#if showDropdown}
				<div class="profile-dropdown">
					<div class="dd-head">
						<strong>{doctorName || 'Doctor'}</strong>
						<span>{email || 'doctor@jarurat.care'}</span>
					</div>
					<hr />
					<a href={`/cms/community/doctors/${userId}`} on:click={() => showDropdown = false}>View Profile</a>
					<hr />
					<a href="/cms/logout" data-sveltekit-reload class="text-red-600 font-medium">Logout</a>
				</div>
			{/if}
		</div>
	</div>
</header>

<style>
	@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

	* {
		box-sizing: border-box;
		font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
	}

	.topbar {
		height: 64px;
		background: #FFFFFF;
		border-bottom: 1px solid #E2E8F0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 32px;
		position: sticky;
		top: 0;
		z-index: 20;
	}

	.search-box {
		display: flex;
		align-items: center;
		background: #F8FAFC;
		border: 1px solid #E2E8F0;
		border-radius: 8px;
		padding: 8px 14px;
		width: 380px;
		gap: 10px;
		transition: all 0.2s;
	}

	.search-box:focus-within {
		background: #FFFFFF;
		border-color: #CBD5E1;
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.05);
	}

	.search-box input {
		border: none;
		background: transparent;
		outline: none;
		width: 100%;
		font-size: 13px;
		color: #334155;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.icon-notification {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 1px solid #E2E8F0;
		background: #FFFFFF;
		color: #475569;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		cursor: pointer;
		transition: all 0.2s;
	}

	.icon-notification:hover {
		background: #F8FAFC;
		color: #0F172A;
	}

	.dot-badge {
		position: absolute;
		top: 4px;
		right: 4px;
		background: #ef4444; /* bright red */
		color: white;
		font-size: 10px;
		font-weight: 700;
		min-width: 16px;
		height: 16px;
		padding: 0 4px;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid white;
		line-height: 1;
	}

	.notif-wrap {
		position: relative;
	}

	.notif-dropdown {
		position: absolute;
		right: 0;
		top: calc(100% + 12px);
		width: 420px;
		background: rgba(255, 255, 255, 0.98);
		backdrop-filter: blur(12px);
		border: 1px solid rgba(226, 232, 240, 0.8);
		border-radius: 16px;
		box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.05);
		z-index: 100;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1);
	}

	@keyframes slideDown {
		from { opacity: 0; transform: translateY(-10px) scale(0.98); }
		to { opacity: 1; transform: translateY(0) scale(1); }
	}

	.notif-header {
		padding: 16px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #F1F5F9;
		background: #FAFAF9;
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.notif-header strong {
		font-size: 15px;
		font-weight: 700;
		color: #0F172A;
		letter-spacing: -0.01em;
	}

	.notif-badge-header {
		background: #EEF2FF;
		color: #4F46E5;
		font-size: 11px;
		font-weight: 700;
		padding: 4px 8px;
		border-radius: 100px;
	}

	.mark-all-read {
		font-size: 12px;
		font-weight: 600;
		color: #3B82F6;
		cursor: pointer;
		transition: color 0.2s;
	}

	.mark-all-read:hover {
		color: #2563EB;
		text-decoration: underline;
	}

	.notif-list {
		max-height: 380px;
		overflow-y: auto;
	}

	.notif-list::-webkit-scrollbar {
		width: 6px;
	}
	.notif-list::-webkit-scrollbar-thumb {
		background: #CBD5E1;
		border-radius: 10px;
	}

	.empty-notif {
		padding: 40px 20px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
	}

	.empty-icon {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: #F8FAFC;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 8px;
	}

	.empty-notif p {
		margin: 0;
		font-size: 14px;
		font-weight: 600;
		color: #334155;
	}

	.empty-notif span {
		font-size: 13px;
		color: #94A3B8;
	}

	.notif-item {
		padding: 16px 20px;
		cursor: pointer;
		display: flex;
		gap: 14px;
		border-bottom: 1px solid #F8FAFC;
		transition: all 0.2s;
	}

	.notif-item:last-child {
		border-bottom: none;
	}

	.notif-item:hover {
		background: #F8FAFC;
	}

	.notif-icon-wrap {
		position: relative;
		flex-shrink: 0;
	}

	.notif-icon {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: #F1F5F9;
		color: #64748B;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s;
	}

	.notif-item.unread .notif-icon {
		background: #EFF6FF;
		color: #3B82F6;
	}

	.notif-item.unread:hover .notif-icon {
		background: #DBEAFE;
	}

	.unread-dot {
		position: absolute;
		top: -2px;
		right: -2px;
		width: 10px;
		height: 10px;
		background: #EF4444;
		border: 2px solid #FFFFFF;
		border-radius: 50%;
	}

	.notif-content-wrap {
		flex: 1;
		min-width: 0;
	}

	.notif-title {
		font-size: 14px;
		font-weight: 700;
		color: #0F172A;
		margin-bottom: 4px;
	}

	.notif-msg {
		font-size: 13px;
		color: #475569;
		line-height: 1.5;
	}

	.notif-group-label {
		padding: 12px 20px 8px;
		font-size: 12px;
		font-weight: 700;
		color: #94A3B8;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.notif-item.read .notif-title,
	.notif-item.read .notif-msg {
		opacity: 0.7;
	}

	.notif-footer {
		padding: 12px;
		text-align: center;
		border-top: 1px solid #E2E8F0;
		background: #F8FAFC;
	}

	.notif-footer a {
		font-size: 13px;
		font-weight: 600;
		color: #3B82F6;
		text-decoration: none;
	}

	.notif-footer a:hover {
		color: #2563EB;
		text-decoration: underline;
	}

	.profile-wrap {
		position: relative;
		margin-left: 8px;
	}

	.profile-trigger {
		display: flex;
		align-items: center;
		gap: 10px;
		cursor: pointer;
		padding: 4px 8px;
		border-radius: 999px;
		border: 1px solid transparent;
		transition: all 0.2s;
	}

	.profile-trigger:hover {
		background: #F8FAFC;
		border-color: #E2E8F0;
	}

	.profile-avatar {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		object-fit: cover;
	}

	.avatar-circle {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: #2563EB;
		color: #FFFFFF;
		font-size: 15px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.user-info {
		display: flex;
		flex-direction: column;
		line-height: 1.2;
	}

	.name {
		font-size: 13px;
		font-weight: 700;
		color: #1E293B;
	}

	.role {
		font-size: 11px;
		color: #64748B;
		font-weight: 500;
	}

	.role.role-reviewer {
		color: #D97706;
		font-weight: 700;
	}

	.profile-dropdown {
		position: absolute;
		right: 0;
		top: calc(100% + 8px);
		width: 240px;
		background: #FFFFFF;
		border: 1px solid #E2E8F0;
		border-radius: 12px;
		box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
		padding: 8px 0;
		z-index: 100;
		display: flex;
		flex-direction: column;
	}

	.dd-head {
		padding: 10px 16px;
		display: flex;
		flex-direction: column;
		line-height: 1.3;
	}

	.dd-head strong {
		font-size: 14px;
		font-weight: 700;
		color: #0F172A;
	}

	.dd-head span {
		font-size: 12px;
		color: #64748B;
		word-break: break-all;
	}

	.profile-dropdown hr {
		margin: 6px 0;
		border: none;
		border-top: 1px solid #F1F5F9;
	}

	.profile-dropdown a {
		padding: 8px 16px;
		font-size: 13px;
		color: #334155;
		text-decoration: none;
		display: flex;
		align-items: center;
		transition: all 0.15s;
		font-weight: 500;
	}

	.profile-dropdown a:hover {
		background: #F8FAFC;
		color: #0F172A;
	}

	.profile-dropdown a.text-red-600 {
		color: #DC2626;
		font-weight: 600;
	}

	.profile-dropdown a.text-red-600:hover {
		background: #FEF2F2;
	}

	.text-xs {
		font-size: 0.75rem;
		line-height: 1rem;
	}
</style>