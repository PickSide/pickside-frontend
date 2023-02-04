import { Theme, ThemeOptions, Mixins } from '@mui/material/styles'

declare module '@mui/material/styles/createMixins' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface (remove this line if you don't have the rule enabled)

	interface Mixins {
		filterToolbar: CSSProperties
	}
	interface MixinsOptions {
		filterToolbar?: CSSProperties
	}
}
