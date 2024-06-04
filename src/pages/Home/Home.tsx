import About from './sections/About'
import Footer from './sections/Footer'
import HowItWorks from './sections/HowItWorks'
import LandingPage from './sections/LandingPage'
import UpcomingEvents from './sections/UpcomingEvents'
import { motion } from 'framer-motion'
import { pageTransition } from '@utils'

const Home = () => {
	return (
		<motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition} className='overflow-hidden'>
			<LandingPage />
			<About />
			<UpcomingEvents />
			<HowItWorks />
			<Footer />
		</motion.div>
	)
}

export default Home
