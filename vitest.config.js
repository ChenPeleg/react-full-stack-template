import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
export default defineConfig({
     plugins: [react() , tsconfigPaths(),],
    test: {

        globals: true,
        environment: 'jsdom',
        includeSource: ['app/**/*.{js,jsx,ts,tsx}', 'tests/**/*.{js,jsx,ts,tsx}'],
    },

    // setupFiles: './tests/setupTests.js',
});
