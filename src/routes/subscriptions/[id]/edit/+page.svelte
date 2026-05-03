<script lang="ts">
	import SubscriptionForm from '$lib/components/SubscriptionForm.svelte';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
	const initial = $derived((form?.values as never) ?? data.subscription);
</script>

<h1 class="mb-4 text-xl font-semibold tracking-tight">Edit subscription</h1>

<SubscriptionForm
	subscription={initial}
	errors={form?.errors ?? null}
	submitLabel="Save changes"
/>
