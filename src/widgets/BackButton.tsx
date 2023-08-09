import { FaArrowUp } from 'react-icons/fa'
import { Link } from 'react-scroll'

const BackButton = () => {
	return (
		<Link
			to="home"
			offset={-96}
			smooth={true}
			spy={true}
			className="fixed z-[999] m-auto right-5 bottom-5 rounded-full bg-primary text-white w-[40px] h-[40px] drop-shadow-lg cursor-pointer ease-in-out duration-75 hover:scale-110"
		>
			<div className="absolute top-[50%] left-[25%] -translate-y-[50%] w-full text-center">
				<FaArrowUp size={20} />
			</div>
		</Link>
	)
}

export default BackButton
