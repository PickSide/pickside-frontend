import 'i18next'
import en from '/assets/locales/en/translations.json'
import fr from '/assets/locales/fr/translations.json'

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: 'translations'
		returnNull: false
	}
}
