import Footer from './sections/Footer'
import HowItWorks from './sections/HowItWorks'
import LandingPage from './sections/LandingPage'
import ResetDbButton from './components/ResetDbButton'
import UpcomingEvents from './sections/UpcomingEvents'
import { motion } from 'framer-motion'
import { pageTransition } from '@utils'

const Home = () => {
	return (
		<motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
			<LandingPage />
			<UpcomingEvents />
			<HowItWorks />
			<Footer />
			{import.meta.env.MODE === 'development' && <ResetDbButton />}
		</motion.div>
	)
}

export default Home
