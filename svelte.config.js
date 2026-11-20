import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: false,
      strict: true
    }),
    prerender: {
      entries: ['*'],
      // /visibility/[week] has no pages until the synia-data bot pushes the first week; any other unseen route still fails.
      handleUnseenRoutes: ({ routes, message }) => {
        if (routes.some((r) => r !== '/visibility/[week]')) throw new Error(message);
      }
    }
  }
};
