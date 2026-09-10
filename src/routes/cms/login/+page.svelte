<script lang="ts">
	import { cmsSupabase } from '$lib/cmsSupabase';
	import Nav from '$lib/components/nav.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PageLoader from '$lib/components/PageLoader.svelte';

	export let data;

	let email = '';
	let password = '';
	let error = '';
	let loading = false;
	let googleLoading = false;
	let showLoader = false;

	async function signInWithGoogle() {
		googleLoading = true;
		let timer = setTimeout(() => { showLoader = true; }, 300);
		const { error } = await cmsSupabase.auth.signInWithOAuth({
			provider: 'google',
			options: { redirectTo: `${window.location.origin}/cms/auth-callback` }
		});
		clearTimeout(timer);
		if (error) { googleLoading = false; showLoader = false; }
	}

	async function login() {
		error = '';
		loading = true;
		let timer = setTimeout(() => { showLoader = true; }, 300);

		try {
			const { data: authData, error: authError } = await cmsSupabase.auth.signInWithPassword({
				email,
				password
			});

			if (authError) throw authError;

			const user = authData.user;

			const { data: profile, error: profileError } = await cmsSupabase
	.from('profiles')
	.select('role, profile_completed, verification_status')
	.eq('id', user.id)
	.limit(1)
	.maybeSingle();

			if (profileError) throw profileError;

			const { profile_completed, role, verification_status } = profile || {};

			if (role === 'Super_Admin') {
				window.location.href = '/cms/super-admin';
				return;
			} else if (role === 'Admin') {
				window.location.href = '/cms/admin-dashboard';
				return;
			}

			if (!profile_completed) {
				window.location.href = '/cms/complete-profile';
				return;
			}

			if (role === 'Doctor') {
				if (verification_status === 'approved') {
					window.location.href = '/cms/doctor-dashboard';
				} else {
					window.location.href = '/cms/pending';
				}
			} else if (role === 'Reader') {
				window.location.href = '/cms/reader-dashboard';
			} else {
				window.location.href = '/';
			}
		} catch (err: any) {
			error = err.message || 'Login failed';
		} finally {
			clearTimeout(timer);
			loading = false;
			showLoader = false;
		}
	}
</script>

<Nav />

{#if showLoader}
	<PageLoader />
{/if}
<div class="page">
	<div class="container">
		<!-- Left: Form -->
		<div class="form-side">

			<h2>Welcome Back!</h2>
			<p class="subtitle">Sign in to comment, publish research and manage your saved articles.</p>

			<!-- ORCID Button -->
			<a href={data?.orcidAuthUrl || '#'} class="btn-orcid">
				<img src="https://orcid.org/sites/default/files/images/orcid_16x16.png" alt="ORCID" width="18" height="18" />
				Continue with ORCID
			</a>

			<!-- Google Button -->
			<button class="btn-google" on:click={signInWithGoogle} disabled={googleLoading} type="button">
				<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
					<path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
					<path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
					<path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
					<path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
				</svg>
				{googleLoading ? 'Redirecting...' : 'Continue with Google'}
			</button>

			<div class="divider"><span>or sign in with email</span></div>

			<form on:submit|preventDefault={login}>
				<div class="field">
					<label for="email">Email Address *</label>
					<input
						id="email"
						name="email"
						type="email"
						placeholder="you@hospital.org"
						bind:value={email}
						required
					/>
				</div>

				<div class="field" style="margin-bottom: 8px;">
					<label for="password">Password *</label>
					<input
						id="password"
						name="password"
						type="password"
						placeholder="Enter your password"
						bind:value={password}
						required
					/>
				</div>

				<div class="form-options">
					<label class="remember-me">
						<input type="checkbox" />
						Remember me
					</label>
					<a href="/cms/forgot" class="forgot-password">Forgot password?</a>
				</div>

				{#if error}
					<div class="alert-error">{error}</div>
				{/if}

				<button type="submit" class="btn-primary" disabled={loading}>
					{loading ? 'Signing In...' : 'Sign In'}
				</button>
			</form>

			<p class="switch-link">
				New to JCF? <a href="/cms/signup">Create your account</a>
			</p>
		</div>

		<!-- Right: Info panel -->
		<div class="info-side">
			<h3>Why Join JCF?</h3>
			<ul class="benefits">
				<li>
					<span class="check">✓</span>
					Publish your research to a global medical community
				</li>
				<li>
					<span class="check">✓</span>
					Connect with verified healthcare professionals
				</li>
				<li>
					<span class="check">✓</span>
					Share knowledge that supports patients and caregivers
				</li>
				<li>
					<span class="check">✓</span>
					Participate in expert discussions and article reviews
				</li>
			</ul>

			<div class="trust-box">
				<span>🛡️</span>
				<p>Every published article and comment comes from a registered and verified medical professional.</p>
			</div>

			<div class="stats">
				<div class="stat">
					<strong>86+</strong>
					<span>Verified doctors</span>
				</div>
				<div class="stat">
					<strong>150+</strong>
					<span>Published articles</span>
				</div>
			</div>

			<div class="orcid-info">
				<img src="https://orcid.org/sites/default/files/images/orcid_16x16.png" alt="ORCID" width="20" height="20" />
				<p>ORCID iD connects your research identity across institutions worldwide.</p>
			</div>
		</div>

	</div>
</div>

<style>
	.page {
		min-height: 100vh;
		background: #f5f7fb;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 100px 20px 40px;
		font-family: 'DM Sans', sans-serif;
	}

	.container {
		width: 100%;
		max-width: 920px;
		background: white;
		border-radius: 20px;
		box-shadow: 0 20px 60px rgba(0,0,0,0.1);
		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	/* ── Form side ── */
	.form-side {
		padding: 48px 40px;
	}

	h2 {
		margin: 0 0 6px;
		color: #0d2460;
		font-size: 26px;
		font-weight: 800;
	}

	.subtitle {
		color: #6b7280;
		font-size: 14px;
		margin-bottom: 24px;
	}

	.alert-error {
		background: #fef2f2;
		border: 1px solid #fca5a5;
		color: #991b1b;
		font-size: 13px;
		padding: 10px 14px;
		border-radius: 10px;
		margin-bottom: 12px;
	}

	/* OAuth buttons */
	.btn-orcid {
		width: 100%;
		padding: 12px;
		border: 1px solid #a6ce39;
		border-radius: 10px;
		background: white;
		font-size: 14px;
		font-weight: 600;
		color: #374151;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		margin-bottom: 10px;
		text-decoration: none;
		transition: all 0.2s;
	}

	.btn-orcid:hover {
		background: #f9ffe6;
		border-color: #7aab1e;
	}

	.btn-google {
		width: 100%;
		padding: 12px;
		border: 1px solid #e2e8f0;
		border-radius: 10px;
		background: white;
		font-size: 14px;
		font-weight: 600;
		color: #374151;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		margin-bottom: 16px;
		transition: all 0.2s;
	}

	.btn-google:hover { background: #f8faff; border-color: #0155bd; }
	.btn-google:disabled { opacity: 0.6; cursor: not-allowed; }

	.divider {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 16px;
		color: #9ca3af;
		font-size: 12px;
	}

	.divider::before,
	.divider::after {
		content: '';
		flex: 1;
		height: 1px;
		background: #e5e7eb;
	}

	/* Fields */
	.field {
		margin-bottom: 14px;
	}

	label {
		display: block;
		font-size: 13px;
		font-weight: 600;
		color: #374151;
		margin-bottom: 5px;
	}

	input[type="email"],
	input[type="password"] {
		width: 100%;
		padding: 11px 14px;
		border: 1px solid #d1d5db;
		border-radius: 10px;
		font-size: 14px;
		font-family: inherit;
		outline: none;
		box-sizing: border-box;
		transition: border-color 0.2s;
	}

	input[type="email"]:focus,
	input[type="password"]:focus {
		border-color: #0155bd;
	}

	.form-options {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 8px;
		margin-bottom: 16px;
	}

	.remember-me {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 13px;
		font-weight: 500;
		color: #475569;
		margin: 0;
	}

	.remember-me input {
		width: auto;
	}

	.forgot-password {
		font-size: 13px;
		font-weight: 600;
		color: #0155bd;
		text-decoration: none;
	}

	.forgot-password:hover { text-decoration: underline; }

	.btn-primary {
		width: 100%;
		padding: 13px;
		background: #0155bd;
		color: white;
		border: none;
		border-radius: 10px;
		font-size: 15px;
		font-weight: 700;
		cursor: pointer;
		margin-top: 4px;
		transition: background 0.2s;
		display: block;
		text-align: center;
		box-sizing: border-box;
	}

	.btn-primary:hover { background: #0046a8; }
	.btn-primary:disabled { background: #93c5fd; cursor: not-allowed; }

	.switch-link {
		text-align: center;
		margin-top: 16px;
		font-size: 14px;
		color: #6b7280;
	}

	.switch-link a { color: #0155bd; text-decoration: none; font-weight: 600; }

	/* ── Info side ── */
	.info-side {
		background: #1e40af;
		padding: 48px 40px;
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0;
	}

	.info-side h3 {
		font-size: 22px;
		font-weight: 800;
		margin: 0 0 20px;
	}

	.benefits {
		list-style: none;
		padding: 0;
		margin: 0 0 20px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.benefits li {
		display: flex;
		gap: 10px;
		font-size: 13px;
		line-height: 1.5;
		opacity: 0.9;
	}

	.check {
		color: #86efac;
		font-weight: 900;
		flex-shrink: 0;
	}

	.trust-box {
		background: rgba(255,255,255,0.1);
		border-radius: 12px;
		padding: 14px;
		display: flex;
		gap: 10px;
		align-items: flex-start;
		margin-bottom: 20px;
		font-size: 13px;
		line-height: 1.5;
		opacity: 0.9;
	}

	.stats {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
		margin-bottom: 20px;
	}

	.stat {
		background: rgba(255,255,255,0.1);
		border-radius: 10px;
		padding: 14px;
		text-align: center;
	}

	.stat strong { display: block; font-size: 22px; font-weight: 900; }
	.stat span { font-size: 11px; opacity: 0.8; }

	.orcid-info {
		display: flex;
		gap: 10px;
		align-items: flex-start;
		background: rgba(166,206,57,0.15);
		border: 1px solid rgba(166,206,57,0.3);
		border-radius: 10px;
		padding: 12px;
		font-size: 12px;
		line-height: 1.5;
		opacity: 0.9;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.container { grid-template-columns: 1fr; }
		.info-side { display: none; }
		.form-side { padding: 32px 24px; }
	}
</style>