import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		paths: {
			// Build-time base path. Set BASE_PATH=/subs when running `npm run build`
			// for the reverse-proxy deployment; empty for local dev.
			base: process.env.BASE_PATH || ''
		}
	}
};

export default config;
