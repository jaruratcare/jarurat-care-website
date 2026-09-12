<script lang="ts">
	import AdminTopbar from '$lib/components/dashboard/AdminTopbar.svelte';
	import { ArrowLeft, Check, X, FileText, AlertCircle, Calendar, User } from 'lucide-svelte';
	import { fade, slide } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';

	export let data;
	$: article = data.article;
	$: type = data.type;

	let isSubmitting = false;
	let showRejectForm = false;
	let rejectReason = '';

	function formatDate(date: string) {
		if (!date) return '';
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function handleAction() {
		isSubmitting = true;
		return async ({ result, update }: any) => {
			isSubmitting = false;
			if (result.type === 'success' && result.data?.success) {
				toast.success(result.data.message);
				if (result.data.action === 'rejected') {
					showRejectForm = false;
				}
				window.location.href = '/cms/doctor-dashboard/review-articles';
			} else {
				toast.error(result.data?.message || 'Action failed');
			}
			update();
		};
	}
</script>

<svelte:head>
	<title>Review Content | Reviewer Portal</title>
	<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="page-wrapper">
	<AdminTopbar data={data} />

	<main class="review-layout">
		
		<!-- Back Button -->
		<div class="nav-container">
			<a href="/cms/doctor-dashboard/review-articles" class="back-button">
				<ArrowLeft size={18} />
				<span>Back to Pending</span>
			</a>
		</div>

		{#if article}
			<article class="publication-article">
				
				<!-- Cover Image -->
				{#if article.cover_image_url || article.featured_image}
					<figure class="hero-image-container">
						<img src={article.cover_image_url || article.featured_image} alt={article.title} class="hero-image" />
					</figure>
				{/if}

				<header class="article-header">
					{#if article.category}
						<div class="category-tag">{article.category}</div>
					{/if}

					<h1 class="article-title">{article.title}</h1>
					
					{#if article.excerpt || article.subtitle}
						<p class="article-excerpt">{article.excerpt || article.subtitle}</p>
					{/if}

					<div class="article-meta">
						<div class="author-info">
							<div class="author-avatar">
								<User size={20} />
							</div>
							<div class="author-details">
								<span class="byline">Written by</span>
								<span class="author-name">{article.author_name_credentials || article.author_name || 'Anonymous'}</span>
							</div>
						</div>
						<div class="meta-divider"></div>
						<div class="publish-date">
							<Calendar size={16} />
							<span>{formatDate(article.created_at)}</span>
						</div>
					</div>
				</header>

				<div class="article-content">
					
					{#if article.abstract}
						<div class="content-section abstract-section">
							<h3 class="section-heading">Abstract</h3>
							<div class="prose-text">{@html article.abstract}</div>
						</div>
					{/if}

					<!-- Research Specific Sections -->
					{#if type === 'research' || article.introduction || article.methods}
						{#if article.introduction}
							<div class="content-section">
								<h3 class="section-heading">Introduction</h3>
								<div class="prose-text">{@html article.introduction}</div>
							</div>
						{/if}
						{#if article.methods}
							<div class="content-section">
								<h3 class="section-heading">Methodology</h3>
								<div class="prose-text">{@html article.methods}</div>
							</div>
						{/if}
						{#if article.results}
							<div class="content-section">
								<h3 class="section-heading">Results</h3>
								<div class="prose-text">{@html article.results}</div>
							</div>
						{/if}
						{#if article.discussion}
							<div class="content-section">
								<h3 class="section-heading">Discussion</h3>
								<div class="prose-text">{@html article.discussion}</div>
							</div>
						{/if}
						{#if article.conclusion || article.conclusion_summary}
							<div class="content-section">
								<h3 class="section-heading">Conclusion</h3>
								<div class="prose-text">{@html article.conclusion || article.conclusion_summary}</div>
							</div>
						{/if}
						{#if article.takeaways}
							<div class="content-section takeaways">
								<h3 class="section-heading">Key Takeaways</h3>
								<div class="prose-text">{@html article.takeaways}</div>
							</div>
						{/if}
						{#if article.references_text}
							<div class="content-section references-section">
								<h3 class="section-heading">References</h3>
								<div class="prose-text references-text">{@html article.references_text}</div>
							</div>
						{/if}
					{/if}

					<!-- Normal Article Content -->
					{#if article.content}
						<div class="prose-text main-content">
							{@html article.content}
						</div>
					{/if}
					
					{#if !article.abstract && !article.introduction && !article.content && !article.takeaways}
						<div class="empty-state">
							<p>This article does not have any detailed content.</p>
						</div>
					{/if}

				</div>
			</article>

			<!-- Floating Action Bar -->
			<div class="glass-action-bar">
				<div class="action-bar-inner">
					<div class="action-info">
						<span class="status-dot"></span>
						<span class="status-text">Pending Review</span>
					</div>
					
					<div class="action-buttons">
						<button 
							type="button"
							class="btn-reject"
							on:click={() => showRejectForm = !showRejectForm}
							disabled={isSubmitting}
						>
							{#if showRejectForm}
								<X size={18} /> Cancel
							{:else}
								<AlertCircle size={18} /> Request Changes
							{/if}
						</button>

						<form method="POST" action="?/approveArticle" use:enhance={handleAction} class="inline-form">
							<input type="hidden" name="articleId" value={article.id} />
							<input type="hidden" name="type" value={type} />
							<button type="submit" class="btn-approve" disabled={isSubmitting || showRejectForm}>
								<Check size={18} />
								Approve Publication
							</button>
						</form>
					</div>
				</div>

				{#if showRejectForm}
					<div class="reject-popover" transition:slide={{ duration: 300, axis: 'y' }}>
						<form method="POST" action="?/rejectArticle" use:enhance={handleAction}>
							<input type="hidden" name="articleId" value={article.id} />
							<input type="hidden" name="type" value={type} />
							
							<div class="form-header">
								<h4>Request Changes</h4>
								<p>Provide specific feedback for the author to improve this article.</p>
							</div>

							<textarea
								name="feedback"
								bind:value={rejectReason}
								placeholder="E.g., The methodology section lacks detail on the sample size..."
								required
								rows="4"
							></textarea>
							
							<div class="form-footer">
								<button type="submit" class="btn-submit-reject" disabled={isSubmitting || !rejectReason.trim()}>
									Send Feedback
								</button>
							</div>
						</form>
					</div>
				{/if}
			</div>

		{:else}
			<div class="not-found">
				<FileText size={48} />
				<h2>Content Not Found</h2>
				<p>The article you're trying to review might have been deleted or moved.</p>
			</div>
		{/if}
	</main>
</div>

<style>
	/* Base Variables & Setup */
	:global(body) {
		background-color: #fafaf9;
	}

	.page-wrapper {
		min-height: 100vh;
		background-color: #fafaf9;
		padding-bottom: 150px;
	}

	/* Navigation */
	.nav-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 40px 20px 20px;
	}

	.back-button {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		color: #57534e;
		font-family: 'Inter', sans-serif;
		font-size: 14px;
		font-weight: 500;
		text-decoration: none;
		transition: color 0.2s;
	}

	.back-button:hover {
		color: #1c1917;
	}

	/* Publication Layout */
	.publication-article {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 20px;
		font-family: 'Lora', serif;
		color: #1c1917;
	}

	/* Hero Image */
	.hero-image-container {
		margin: 0 -20px 40px;
		border-radius: 0;
	}
	
	@media (min-width: 840px) {
		.hero-image-container {
			margin: 0 0 40px;
			border-radius: 16px;
			overflow: hidden;
		}
	}

	.hero-image {
		width: 100%;
		max-height: 450px;
		object-fit: cover;
		display: block;
	}

	/* Header */
	.article-header {
		margin-bottom: 48px;
		text-align: center;
	}

	.category-tag {
		display: inline-block;
		font-family: 'Inter', sans-serif;
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #ea580c;
		margin-bottom: 16px;
	}

	.article-title {
		font-size: clamp(2.5rem, 5vw, 3.5rem);
		font-weight: 700;
		line-height: 1.15;
		letter-spacing: -0.02em;
		color: #1c1917;
		margin-bottom: 24px;
	}

	.article-excerpt {
		font-size: 1.25rem;
		line-height: 1.6;
		color: #57534e;
		font-style: italic;
		margin-bottom: 32px;
		max-width: 700px;
		margin-left: auto;
		margin-right: auto;
	}

	/* Meta Info */
	.article-meta {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 20px;
		font-family: 'Inter', sans-serif;
		padding-top: 24px;
		border-top: 1px solid #e7e5e4;
	}

	.author-info {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.author-avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: #f5f5f4;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #a8a29e;
	}

	.author-details {
		display: flex;
		flex-direction: column;
		text-align: left;
	}

	.byline {
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #78716c;
	}

	.author-name {
		font-size: 15px;
		font-weight: 600;
		color: #292524;
	}

	.meta-divider {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: #d6d3d1;
	}

	.publish-date {
		display: flex;
		align-items: center;
		gap: 6px;
		color: #78716c;
		font-size: 14px;
	}

	/* Content Styling */
	.article-content {
		font-size: 1.125rem;
		line-height: 1.8;
		color: #292524;
	}

	.content-section {
		margin-bottom: 48px;
	}

	.section-heading {
		font-family: 'Inter', sans-serif;
		font-size: 1.25rem;
		font-weight: 700;
		color: #1c1917;
		margin-bottom: 16px;
		text-transform: uppercase;
		letter-spacing: 0.02em;
	}

	.abstract-section {
		font-size: 1.25rem;
		line-height: 1.7;
		color: #44403c;
		padding: 32px;
		background: #ffffff;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0,0,0,0.03);
		border-left: 4px solid #ea580c;
		font-style: italic;
	}

	.takeaways {
		background: linear-gradient(to right, #f0fdf4, #ffffff);
		padding: 32px;
		border-left: 5px solid #16a34a;
		border-radius: 16px;
	}

	.prose-text :global(p) {
		margin-bottom: 1.5em;
	}

	.prose-text :global(h2), .prose-text :global(h3) {
		font-family: 'Inter', sans-serif;
		font-weight: 700;
		color: #1c1917;
		margin-top: 2em;
		margin-bottom: 1em;
		line-height: 1.3;
	}

	.prose-text :global(ul), .prose-text :global(ol) {
		padding-left: 24px;
		margin-bottom: 1.5em;
	}

	.prose-text :global(li) {
		margin-bottom: 0.5em;
	}

	.references-section {
		margin-top: 64px;
		padding-top: 32px;
		border-top: 1px solid #e7e5e4;
	}

	.references-text {
		font-size: 0.95rem;
		color: #57534e;
		white-space: pre-line;
	}

	.empty-state {
		text-align: center;
		padding: 60px;
		background: #f8fafc;
		border-radius: 16px;
		color: #64748b;
		font-style: italic;
		border: 1px dashed #cbd5e1;
	}

	/* Glassmorphic Action Bar */
	.glass-action-bar {
		position: fixed;
		bottom: 32px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 100;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: 600px;
		padding: 0 20px;
	}

	.action-bar-inner {
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.5);
		border-radius: 100px;
		padding: 12px 24px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0,0,0,0.05);
		font-family: 'Inter', sans-serif;
	}

	.action-info {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.status-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #f59e0b;
		box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.2);
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
		70% { box-shadow: 0 0 0 6px rgba(245, 158, 11, 0); }
		100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
	}

	.status-text {
		font-size: 14px;
		font-weight: 600;
		color: #57534e;
	}

	.action-buttons {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.btn-reject {
		display: flex;
		align-items: center;
		gap: 6px;
		background: transparent;
		color: #ef4444;
		border: none;
		font-size: 14px;
		font-weight: 600;
		padding: 10px 16px;
		border-radius: 50px;
		cursor: pointer;
		transition: background 0.2s;
	}

	.btn-reject:hover {
		background: #fef2f2;
	}

	.btn-approve {
		display: flex;
		align-items: center;
		gap: 6px;
		background: #10b981;
		color: white;
		border: none;
		font-size: 14px;
		font-weight: 600;
		padding: 10px 20px;
		border-radius: 50px;
		cursor: pointer;
		transition: transform 0.2s, box-shadow 0.2s;
		box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
	}

	.btn-approve:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
	}

	.btn-approve:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
	}

	/* Reject Popover */
	.reject-popover {
		margin-top: 16px;
		background: white;
		border-radius: 20px;
		padding: 24px;
		width: 100%;
		box-shadow: 0 20px 40px rgba(0,0,0,0.1);
		border: 1px solid #fee2e2;
		font-family: 'Inter', sans-serif;
	}

	.form-header {
		margin-bottom: 16px;
	}

	.form-header h4 {
		font-size: 16px;
		font-weight: 700;
		color: #991b1b;
		margin: 0 0 4px 0;
	}

	.form-header p {
		font-size: 13px;
		color: #7f1d1d;
		margin: 0;
	}

	.reject-popover textarea {
		width: 100%;
		border: 1px solid #fecaca;
		border-radius: 12px;
		padding: 12px 16px;
		font-family: inherit;
		font-size: 14px;
		resize: vertical;
		outline: none;
		background: #fef2f2;
		color: #7f1d1d;
		transition: border-color 0.2s;
	}

	.reject-popover textarea:focus {
		border-color: #ef4444;
		background: white;
	}

	.form-footer {
		display: flex;
		justify-content: flex-end;
		margin-top: 16px;
	}

	.btn-submit-reject {
		background: #ef4444;
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 12px;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s;
	}

	.btn-submit-reject:hover:not(:disabled) {
		background: #dc2626;
	}

	.btn-submit-reject:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.inline-form {
		margin: 0;
		display: inline-block;
	}

	/* Not Found */
	.not-found {
		text-align: center;
		padding: 100px 20px;
		color: #a8a29e;
		font-family: 'Inter', sans-serif;
	}

	.not-found h2 {
		color: #44403c;
		margin: 20px 0 10px;
		font-size: 24px;
	}

	@media (max-width: 640px) {
		.action-bar-inner {
			flex-direction: column;
			gap: 16px;
			border-radius: 20px;
			padding: 16px;
		}

		.action-buttons {
			width: 100%;
			justify-content: stretch;
		}

		.btn-reject, .btn-approve {
			flex: 1;
			justify-content: center;
		}
	}
</style>
