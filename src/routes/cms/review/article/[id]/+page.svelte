<script lang="ts">
	import { enhance } from '$app/forms';
	import { ArrowLeft, CheckCircle, XCircle, AlertCircle } from 'lucide-svelte';
	import toast from 'svelte-french-toast';

	export let data;
	export let form;
	const { article } = data;

	let showRejectForm = false;

	function formatDate(dateStr: string) {
		if (!dateStr) return '';
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Review Article | {article.title}</title>
</svelte:head>

<div class="review-container">
	<!-- BACK NAVIGATION -->
	<a href="/cms/doctor-dashboard/review-articles" class="back-link">
		<ArrowLeft size={16} />
		Back to Pending Articles
	</a>

	<!-- PAPER CONTENT -->
	<div class="paper-content">
		<div class="paper-header">
			<h1>{article.title}</h1>
			{#if article.subtitle}
				<h2>{article.subtitle}</h2>
			{/if}

			<div class="meta">
				<span class="author">By {article.author_name}</span>
				<span class="date">{formatDate(article.created_at)}</span>
			</div>
		</div>

		<div class="article-body prose prose-lg max-w-none text-gray-800">
			{@html article.content || '<p>No content provided.</p>'}
		</div>
	</div>

	<!-- REVIEWER ACTIONS -->
	{#if form?.message}
		<div class="error-message">
			{form.message}
		</div>
	{/if}

	<div class="action-bar">
		<h3>Reviewer Actions</h3>
		
		{#if showRejectForm}
			<form method="POST" action="?/rejectArticle" class="reject-form" use:enhance={() => {
				return async ({ result, update }) => {
					if (result.type === 'redirect' || result.type === 'success') {
						toast.success('Changes requested successfully!');
					} else {
						toast.error(Object(result).data?.message || 'Could not request changes');
					}
					await update();
				};
			}}>
				<label for="feedback">Please provide feedback or changes requested:</label>
				<textarea id="feedback" name="feedback" required rows="4" placeholder="Explain why this is being rejected or what changes are required..."></textarea>
				
				<div class="form-actions">
					<button type="button" class="btn-cancel" on:click={() => showRejectForm = false}>Cancel</button>
					<button type="submit" class="btn-submit-reject">
						<AlertCircle size={16} />
						Request Changes
					</button>
				</div>
			</form>
		{:else}
			<div class="action-buttons">
				<form method="POST" action="?/approveArticle" use:enhance={() => {
					return async ({ result, update }) => {
						if (result.type === 'redirect' || result.type === 'success') {
							toast.success('Article successfully approved!');
						} else {
							toast.error(Object(result).data?.message || 'Could not approve article');
						}
						await update();
					};
				}}>
					<button type="submit" class="btn-approve">
						<CheckCircle size={18} />
						Approve
					</button>
				</form>

				<button type="button" class="btn-reject" on:click={() => showRejectForm = true}>
					<XCircle size={18} />
					Request Changes
				</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.review-container {
		max-width: 900px;
		margin: 40px auto;
		padding: 0 20px;
		font-family: 'DM Sans', sans-serif;
		padding-bottom: 100px;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		color: #64748b;
		text-decoration: none;
		font-weight: 600;
		margin-bottom: 24px;
		transition: color 0.2s;
	}

	.back-link:hover {
		color: #0f172a;
	}

	.paper-content {
		background: #ffffff;
		border-radius: 12px;
		padding: 40px;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
		border: 1px solid #e2e8f0;
		margin-bottom: 30px;
	}

	.paper-header {
		margin-bottom: 40px;
		border-bottom: 1px solid #e2e8f0;
		padding-bottom: 30px;
	}

	.paper-header h1 {
		font-size: 32px;
		font-weight: 800;
		color: #0f172a;
		margin: 0 0 12px 0;
		line-height: 1.3;
	}

	.paper-header h2 {
		font-size: 20px;
		color: #475569;
		margin: 0 0 20px 0;
		font-weight: 500;
	}

	.meta {
		display: flex;
		gap: 16px;
		color: #64748b;
		font-size: 14px;
	}

	.meta .author {
		font-weight: 600;
		color: #334155;
	}

	.article-body {
		font-size: 18px;
		line-height: 1.8;
		color: #334155;
	}

	.action-bar {
		margin-top: 32px;
		background: #f8fafc;
		border-radius: 12px;
		padding: 24px;
		border: 1px solid #e2e8f0;
	}

	.success-message {
		margin-top: 32px;
		background: #ecfdf5;
		color: #059669;
		padding: 40px;
		border-radius: 12px;
		border: 1px solid #a7f3d0;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
	}

	.success-message h3 {
		margin: 0;
		font-size: 24px;
	}

	.btn-return {
		margin-top: 16px;
		padding: 12px 24px;
		background: #059669;
		color: #ffffff;
		text-decoration: none;
		border-radius: 8px;
		font-weight: 600;
		transition: all 0.2s;
	}

	.btn-return:hover {
		background: #047857;
	}

	.error-message {
		background: #fee2e2;
		color: #b91c1c;
		padding: 12px 16px;
		border-radius: 8px;
		margin-bottom: 16px;
		font-weight: 500;
	}

	.action-bar h3 {
		margin: 0 0 16px 0;
		font-size: 16px;
		color: #0f172a;
	}

	.action-buttons {
		display: flex;
		gap: 16px;
	}

	.btn-approve, .btn-reject {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 12px 24px;
		border-radius: 8px;
		font-weight: 600;
		font-size: 15px;
		cursor: pointer;
		border: none;
		transition: all 0.2s;
	}

	.btn-approve {
		background: #10b981;
		color: white;
	}

	.btn-approve:hover {
		background: #059669;
	}

	.btn-reject {
		background: #fff1f2;
		color: #e11d48;
		border: 1px solid #fecdd3;
	}

	.btn-reject:hover {
		background: #ffe4e6;
	}

	.reject-form {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.reject-form label {
		font-weight: 600;
		font-size: 14px;
		color: #334155;
	}

	.reject-form textarea {
		padding: 12px;
		border-radius: 8px;
		border: 1px solid #cbd5e1;
		font-family: inherit;
		font-size: 15px;
		resize: vertical;
	}

	.form-actions {
		display: flex;
		justify-content: flex-end;
		gap: 12px;
		margin-top: 8px;
	}

	.btn-cancel {
		background: transparent;
		border: none;
		color: #64748b;
		font-weight: 600;
		cursor: pointer;
		padding: 10px 16px;
	}

	.btn-submit-reject {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		background: #e11d48;
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
	}

	.btn-submit-reject:hover {
		background: #be123c;
	}
</style>
