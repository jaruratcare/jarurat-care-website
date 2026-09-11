<script lang="ts">
    import { page } from '$app/stores';
    import Sidebar from '$lib/components/dashboard/Sidebar.svelte';
    import Topbar from '$lib/components/dashboard/Topbar.svelte';

    export let data;

    // 1. Extract profile safely from server layout data
    $: profile = data?.profile;
    
    // 2. Evaluate reviewer status (handles boolean or truthy values)
    $: isReviewer = Boolean(profile?.is_reviewer);
</script>

<div class="dashboard">
    <!-- 3. Pass isReviewer directly into the Sidebar component -->
    <Sidebar {isReviewer} />

    <div class="content">
        <Topbar 
            doctorName={profile?.full_name || ''} 
            unreadCount={0} 
            {isReviewer} 
            email={profile?.email || $page.data.session?.user?.email || ''}
            avatar={profile?.avatar_url || ''}
            userId={profile?.id || $page.data.session?.user?.id || ''}
        />
        
        <main class="page">
            <slot />
        </main>
    </div>
</div>

<style>
    .dashboard {
        display: flex;
        min-height: 100vh;
        background: #f4f6fa;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0;
    }

    .page {
        padding: 28px 36px;
        max-width: 1600px;
        margin: 0 auto;
        width: 100%;
        box-sizing: border-box;
    }
</style>