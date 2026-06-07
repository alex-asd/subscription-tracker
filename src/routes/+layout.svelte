<script lang="ts">
	import { base } from '$app/paths';
	import '../app.css';
	let { children } = $props();
</script>

<div class="min-h-screen">
	<header class="border-b border-slate-800 bg-slate-900">
		<div class="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
			<a href="{base}/" class="text-lg font-semibold tracking-tight text-slate-100">Subscription Tracker</a>
			<a
				href="{base}/subscriptions/new"
				class="rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-400"
			>
				+ New
			</a>
		</div>
	</header>
	<main class="mx-auto max-w-3xl px-4 py-8">
		{@render children()}
	</main>
</div>
