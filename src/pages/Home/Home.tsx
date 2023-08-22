import About from './Sections/About'
import Footer from './Sections/Footer'
import LandingPage from './Sections/LandingPage'
import { motion } from 'framer-motion'
import { pageTransition } from '@utils'

const Home = () => {
	return (
		<motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
			<LandingPage />
			<About />
			<Footer />
		</motion.div>
	)
}

export default Home
