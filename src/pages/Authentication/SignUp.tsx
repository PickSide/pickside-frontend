import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SignUpForm } from 'widgets'
import { BiArrowBack } from 'react-icons/bi'

const SignUp = () => {
	const navigate = useNavigate()

	return (
		<div className="relative w-screen h-screen flex">
			<div className="flex-1 p-20 m-auto">
				<SignUpForm onClose={() => {}} />
			</div>
			<div className="flex-1 bg-primary p-20"></div>
			<div
				onClick={() => navigate('/login')}
				className="absolute top-5 left-5 flex gap-x-3 text-secondary cursor-pointer ease-in hover:text-slate-500 hover:scale-110 duration-[30] transition-all"
			>
				<BiArrowBack size={25} />
				<span>Back to login</span>
			</div>
		</div>
	)
}

export default SignUp
