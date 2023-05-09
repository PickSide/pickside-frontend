import About from './Sections/About'
import LandingPage from './Sections/LandingPage'
import SportSelection from './Sections/SportSelection'
import Footer from './Sections/Footer'

const Home = () => {
	return (
		<div className=''>
			<LandingPage />
			<SportSelection />
			<About />
			<Footer />
		</div>
	)
}

export default Home
