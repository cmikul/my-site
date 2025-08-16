import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

export default {
	preprocess: preprocess({
		typescript: false
	}),
	kit: {
		adapter: adapter({
			// Single-page fallback
			fallback: 'index.html'
		}),
		// Optional: if your repo is not at root
		// paths: {
		//   base: '/your-repo-name'
		// }
	}
};