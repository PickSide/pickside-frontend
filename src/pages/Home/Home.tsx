import About from './sections/About'
import Footer from './sections/Footer'
import LandingPage from './sections/LandingPage'
import ResetDbButton from './components/ResetDbButton'
import { motion } from 'framer-motion'
import { pageTransition } from '@utils'

const Home = () => {
	return (
		<motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
			<LandingPage />
			<About />
			<Footer />
			{import.meta.env.MODE === 'development' && <ResetDbButton />}
		</motion.div>
	)
}

export default Home
