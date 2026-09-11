<script lang="ts">
	import { enhance } from '$app/forms';
	import { ArrowLeft, CheckCircle, XCircle, AlertCircle } from 'lucide-svelte';
	import toast from 'svelte-french-toast';

	export let data;
	export let form;
	const { research } = data;

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
	<title>Review Research | {research.title}</title>
</svelte:head>

<div class="review-container">
	<!-- BACK NAVIGATION -->
	<a href="/cms/doctor-dashboard/review-research" class="back-link">
		<ArrowLeft size={16} />
		Back to Pending Research
	</a>

	<!-- PAPER CONTENT -->
	<div class="paper-content">
		<div class="paper-header">
			<h1>{research.title}</h1>
			{#if research.subtitle}
				<h2>{research.subtitle}</h2>
			{/if}

			<div class="meta">
				<span class="author">By {research.author_name}</span>
				<span class="date">{formatDate(research.created_at)}</span>
			</div>
		</div>

		{#if research.abstract}
			<section class="research-section abstract">
				<h3>Abstract</h3>
				<div class="whitespace-pre-line">{research.abstract}</div>
			</section>
		{/if}

		{#if research.introduction}
			<section class="research-section">
				<h3>Introduction</h3>
				<div class="whitespace-pre-line">{research.introduction}</div>
			</section>
		{/if}

		{#if research.literature_review}
			<section class="research-section">
				<h3>Literature Review</h3>
				<div class="whitespace-pre-line">{research.literature_review}</div>
			</section>
		{/if}

		{#if research.methods}
			<section class="research-section">
				<h3>Methods</h3>
				<div class="whitespace-pre-line">{research.methods}</div>
			</section>
		{/if}

		{#if research.results}
			<section class="research-section">
				<h3>Results</h3>
				<div class="whitespace-pre-line">{research.results}</div>
			</section>
		{/if}

		{#if research.discussion}
			<section class="research-section">
				<h3>Discussion</h3>
				<div class="whitespace-pre-line">{research.discussion}</div>
			</section>
		{/if}

		{#if research.conclusion}
			<section class="research-section">
				<h3>Conclusion</h3>
				<div class="whitespace-pre-line">{research.conclusion}</div>
			</section>
		{/if}

		{#if research.references_text}
			<section class="research-section">
				<h3>References</h3>
				<div class="whitespace-pre-line">{research.references_text}</div>
			</section>
		{/if}
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
			<form method="POST" action="?/rejectResearch" class="reject-form" use:enhance={() => {
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
				<form method="POST" action="?/approveResearch" use:enhance={() => {
					return async ({ result, update }) => {
						if (result.type === 'redirect' || result.type === 'success') {
							toast.success('Research Paper successfully approved!');
						} else {
							toast.error(Object(result).data?.message || 'Could not approve research paper');
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

	.research-section {
		margin-bottom: 36px;
	}

	.research-section h3 {
		font-size: 20px;
		font-weight: 700;
		color: #1e293b;
		margin: 0 0 16px 0;
	}

	.research-section div {
		font-size: 16px;
		line-height: 1.8;
		color: #334155;
	}

	.abstract {
		background: #f8fafc;
		padding: 24px;
		border-radius: 8px;
		border-left: 4px solid #3b82f6;
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

	.action-bar {
		background: #ffffff;
		border-radius: 12px;
		padding: 24px;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
		border: 1px solid #e2e8f0;
		position: sticky;
		bottom: 24px;
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

	.whitespace-pre-line {
		white-space: pre-line;
	}
</style>
