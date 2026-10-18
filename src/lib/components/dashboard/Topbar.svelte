<script lang="ts">
	import { Search, Bell, ChevronDown } from 'lucide-svelte';

	export let doctorName: string = '';
	export let unreadCount: number = 0;
	export let isReviewer: boolean = false;
	export let email: string = 'doctor@jarurat.care';
	export let avatar: string = '';

	let showDropdown = false;
	let dropdownRef: HTMLElement;

	function closeDropdown(e: MouseEvent) {
		if (showDropdown && dropdownRef && !dropdownRef.contains(e.target as Node)) {
			showDropdown = false;
		}
	}
</script>

<svelte:window on:click={closeDropdown} />

<header class="topbar">
	<div class="search-box">
		<Search size={16} class="text-slate-400" />
		<input type="text" placeholder="Search articles, research papers, topics..." />
	</div>

	<div class="actions">
		<button class="icon-notification" aria-label="Notifications">
			<Bell size={20} />
			{#if unreadCount > 0}
				<span class="dot-badge">{unreadCount}</span>
			{/if}
		</button>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="profile-wrap" bind:this={dropdownRef}>
			<div class="profile-trigger" on:click={() => showDropdown = !showDropdown}>
				{#if avatar}
					<img src={avatar} alt="Profile photo of {doctorName || 'Doctor'}" class="profile-avatar" onerror="this.style.display='none'" />
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
					<a href="/cms/complete-profile" on:click={() => showDropdown = false}>View Profile</a>
					<a href="/cms/doctor-dashboard/settings" on:click={() => showDropdown = false}>Account Settings</a>
					<hr />
					<a href="/cms/login" class="text-red-600 font-medium">Logout</a>
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
		top: -2px;
		right: -2px;
		background: #E11D48;
		color: white;
		font-size: 10px;
		font-weight: 700;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
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

	.text-slate-500 { color: #64748B; }
	.text-slate-400 { color: #94A3B8; }
</style>