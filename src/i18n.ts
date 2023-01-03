import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.use(HttpApi)
	.init({
		debug: true,
		backend: {
			loadPath: `/assets/locales/{{lng}}/translations.json`,
		},
		fallbackLng: 'fr',
		ns: ['translations'],
		react: { useSuspense: false },
		returnNull: false,
		supportedLngs: ['en', 'fr'],
	})

export default i18n
