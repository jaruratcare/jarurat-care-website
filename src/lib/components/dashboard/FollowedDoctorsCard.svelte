<script lang="ts">
	export let doctors: Array<{
		id: string;
		name: string;
		specialization: string | null;
		organization: string | null;
		avatar: string | null;
	}> = [];
</script>

<div class="followed-card">
	<div class="card-header">
		<h3>Followed Doctors</h3>
		<a href="/cms/reader-dashboard/doctors" class="find-more-btn">Find more doctors</a>
	</div>

	{#if doctors.length === 0}
		<div class="empty-state">
			<div class="icon">🩺</div>
			<h4>No doctors followed yet</h4>
			<p>When you follow a doctor, their profile will appear here.</p>
		</div>
	{:else}
		<div class="doctors-grid">
			{#each doctors as doc}
				<div class="doctor-item">
					<div class="avatar-wrapper">
						{#if doc.avatar}
							<img src={doc.avatar} alt="{doc.name}{doc.specialization ? ', ' + doc.specialization : ', Medical Professional'}" class="avatar-img" />
						{:else}
							<div class="avatar-fallback">{doc.name.charAt(0).toUpperCase()}</div>
						{/if}
					</div>
					<div class="doc-info">
						<a href="/doctors/{doc.id}" class="doc-name">{doc.name}</a>
						{#if doc.specialization}
							<span class="doc-spec">{doc.specialization}</span>
						{/if}
						{#if doc.organization}
							<span class="doc-org">{doc.organization}</span>
						{/if}
					</div>
					<div class="actions">
						<button class="btn-unfollow" title="Unfollow">Following</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.followed-card {
		background: white;
		border-radius: 16px;
		padding: 24px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
		margin-bottom: 24px;
	}

	.card-header {
		margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.find-more-btn {
		font-size: 13px;
		color: #1e4ed8;
		text-decoration: none;
		font-weight: 600;
		padding: 6px 12px;
		border-radius: 6px;
		background: #eff6ff;
		transition: all 0.2s;
	}

	.find-more-btn:hover {
		background: #dbeafe;
		color: #1d4ed8;
	}

	.card-header h3 {
		margin: 0;
		color: #1e2a5e;
		font-size: 18px;
		font-weight: 700;
	}

	.empty-state {
		padding: 40px 20px;
		text-align: center;
		color: #666;
		background: #f8fafc;
		border-radius: 12px;
		border: 1px dashed #cbd5e1;
	}

	.icon {
		font-size: 32px;
		margin-bottom: 12px;
		opacity: 0.5;
		filter: grayscale(1);
	}

	.empty-state h4 {
		color: #1e2a5e;
		margin-bottom: 8px;
	}

	.empty-state p {
		margin: 0;
		font-size: 13px;
	}

	.doctors-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 16px;
	}

	.doctor-item {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 16px;
		border: 1px solid #f1f5f9;
		border-radius: 12px;
		background: #fdfdfd;
		transition: border-color 0.2s, box-shadow 0.2s;
	}

	.doctor-item:hover {
		border-color: #cbd5e1;
		box-shadow: 0 4px 12px rgba(0,0,0,0.03);
	}

	.avatar-wrapper {
		flex-shrink: 0;
	}

	.avatar-img {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		object-fit: cover;
	}

	.avatar-fallback {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: #e0e7ff;
		color: #4f46e5;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		font-weight: 700;
	}

	.doc-info {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.doc-name {
		font-size: 15px;
		font-weight: 700;
		color: #1e2a5e;
		text-decoration: none;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.doc-name:hover {
		color: #4f46e5;
	}

	.doc-spec {
		font-size: 12px;
		color: #4f46e5;
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.doc-org {
		font-size: 11px;
		color: #64748b;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.actions {
		flex-shrink: 0;
	}

	.btn-unfollow {
		background: #f1f5f9;
		border: none;
		padding: 6px 12px;
		border-radius: 20px;
		font-size: 11px;
		font-weight: 600;
		color: #475569;
		cursor: pointer;
		transition: all 0.2s;
	}

	.btn-unfollow:hover {
		background: #fee2e2;
		color: #ef4444;
	}
</style>
