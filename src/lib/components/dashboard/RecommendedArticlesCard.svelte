<script lang="ts">
	export let articles: Array<{
		id: string;
		title: string;
		category: string | null;
		authorName: string;
		date: string;
		thumbnail: string;
	}> = [];
</script>

<div class="recommended-card">
	<div class="card-header">
		<h3>Recommended for You</h3>
		<p class="subtitle">Based on your Area of Interest</p>
	</div>

	{#if articles.length === 0}
		<div class="empty-state">
			<h4>No recommendations yet</h4>
			<p>We'll suggest articles when they match your interests.</p>
		</div>
	{:else}
		<div class="article-list">
			{#each articles as article}
				<a href="/cms/articles/{article.id}" class="article-row">
					<div class="article-info">
						<span class="article-title">{article.title}</span>
						<span class="article-meta">
							{article.authorName}
							{#if article.category}
								• {article.category}
							{/if}
						</span>
					</div>
					<img src={article.thumbnail} alt="Thumbnail for the article: {article.title} by {article.authorName}" class="article-thumb" />
				</a>
			{/each}
		</div>
	{/if}
</div>

<style>
	.recommended-card {
		background: white;
		border-radius: 16px;
		padding: 24px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
	}

	.card-header {
		margin-bottom: 16px;
	}

	.card-header h3 {
		margin: 0;
		color: #1e2a5e;
		font-size: 16px;
	}

	.subtitle {
		margin: 4px 0 0;
		font-size: 12px;
		color: #6b7280;
	}

	.empty-state {
		padding: 40px 20px;
		text-align: center;
		color: #666;
	}

	.empty-state h4 {
		color: #1e2a5e;
		margin-bottom: 8px;
	}

	.empty-state p {
		margin: 0;
		font-size: 13px;
	}

	.article-list {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.article-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 14px 8px;
		border-bottom: 1px solid #f0f1f5;
		text-decoration: none;
		color: inherit;
		transition: background 0.15s;
		border-radius: 8px;
	}

	.article-row:hover {
		background: #f9fafb;
	}

	.article-row:last-child {
		border-bottom: none;
	}

	.article-info {
		display: flex;
		flex-direction: column;
		gap: 4px;
		min-width: 0;
		flex: 1;
	}

	.article-title {
		font-size: 14px;
		font-weight: 600;
		color: #111827;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.article-meta {
		font-size: 12px;
		color: #6b7280;
	}

	.article-thumb {
		width: 60px;
		height: 60px;
		border-radius: 8px;
		object-fit: cover;
		flex-shrink: 0;
	}
</style>
