import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: ['platform/*', 'domains/*', 'integrations/*', 'data/*', 'apps/*'],
  },
});
