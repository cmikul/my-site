import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const dev = process.env.NODE_ENV === 'development';
const repoName = dev ? '' : '/my-site'; // replace with your repo name

export default {
	preprocess: preprocess({ typescript: false }),
	kit: {
		adapter: adapter({
			fallback: 'index.html'
		}),
		paths: {
			base: repoName
		}
	}
};