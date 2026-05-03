<script lang="ts">
	import SubscriptionForm from '$lib/components/SubscriptionForm.svelte';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<h1 class="mb-4 text-xl font-semibold tracking-tight">New subscription</h1>

<SubscriptionForm
	subscription={form?.values as never}
	errors={form?.errors ?? null}
	submitLabel="Create"
/>
