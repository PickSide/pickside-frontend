import About from './components/About'
import Footer from './components/Footer'
import LandingPage from './components/LandingPage'
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
