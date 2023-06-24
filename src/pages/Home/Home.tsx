import About from './Sections/About'
import LandingPage from './Sections/LandingPage'
import SportSelection from './Sections/ServiceDescription'
import Footer from './Sections/Footer'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils'

const Home = () => {
	return (
		<motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
			<LandingPage />
			<SportSelection />
			{/* <About /> */}
			<Footer />
		</motion.div>
	)
}

export default Home
