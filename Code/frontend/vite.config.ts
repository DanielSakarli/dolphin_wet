/// <reference types="vitest" />
import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:3309', // Set the target URL for your backend server
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
		port: 8100, // Sets the port for the frontend server
	},
	plugins: [vue(), legacy()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
	},
});
