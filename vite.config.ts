import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import path from 'path'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
	return {
		define: {
			'process.env': {},
		},
		build: {
			outDir: 'build',
		},
		plugins: [
			react(), 
			eslint(), 
			viteTsconfigPaths(),
			svgr({ svgrOptions: { icon: true } })
		],
		resolve: {
			alias: [
				{find: '@', replacement: path.resolve(__dirname, 'src')}
			]
		},
		server: {
			open: true,
			port: 3000,
			host: true,
		},
	}
})
