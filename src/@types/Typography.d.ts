import '@mui/material/styles'

declare module '@mui/material/styles' {
	interface TypographyVariants {
		headerSmall: React.CSSProperties
		headerMedium: React.CSSProperties
		headerLarge: React.CSSProperties
		bodySmall: React.CSSProperties
		bodyMedium: React.CSSProperties
		bodyLarge: React.CSSProperties
	}

	// allow configuration using `createTheme`
	interface TypographyVariantsOptions {
		headerSmall?: React.CSSProperties
		headerMedium?: React.CSSProperties
		headerLarge?: React.CSSProperties
		bodySmall?: React.CSSProperties
		bodyMedium?: React.CSSProperties
		bodyLarge?: React.CSSProperties
	}
}

declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		headerSmall: true
		headerMedium: true
		headerLarge: true
		bodySmall: true
		bodyMedium: true
		bodyLarge: true
	}
}
