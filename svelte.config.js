// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// CHANGE THIS TO THE NAME OF YOUR GITHUB REPOSITORY
const dev = process.argv.includes('dev');
const repoName = 'my-site'; // <--- ⚠️ IMPORTANT: Change this!

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// The default fallback for SPAs is `index.html`. 
			// We will copy this to 404.html in our build process later.
			fallback: 'index.html'
		}),
		paths: {
			// This must match your repository name for GitHub Pages to work.
			base: dev ? '' : `/${repoName}`,
		}
	}
};

export default config;
