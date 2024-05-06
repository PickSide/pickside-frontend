import { defineConfig, splitVendorChunkPlugin } from 'vite'

import eslint from 'vite-plugin-eslint'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths'

//import path from 'path'

export default defineConfig(() => {
	return {
		build: {
			outDir: 'build',
			commonjsOptions: {
				include: [/linked-dep/, /node_modules/],
			},
		},
		esbuild: {
			jsxInject: `import React from 'react'`,
		},
		plugins: [
			react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
			//eslint(),
			viteTsconfigPaths({ parseNative: false }),
			svgr({ svgrOptions: { icon: true } }),
			splitVendorChunkPlugin(),
		],
		server: {
			open: true,
			host: 'localhost',
			port: 3000,
		},
	}
})
