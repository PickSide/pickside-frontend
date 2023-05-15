import React from 'react'
import { Button, Toggle } from 'components'
import { Toast } from 'widgets'

const About = () => {
	return (
		<section id="about" className="bg-[#e0f2f1] flex flex-col gap-y-4">
			<div className="flex justify-center gap-x-4">
				<Button primary>Button</Button>
				<Button secondary>Button</Button>
				<Button tertiary>Button</Button>
			</div>
			<div className="flex justify-center gap-x-4">
				<Toggle primary />
				<Toggle secondary />
				<Toggle tertiary />
			</div>
			<div className="flex justify-center gap-x-4">
				<Toast show type="info">
					Successful toast
				</Toast>
				<Toast show type="success">
					Toast info
				</Toast>
				<Toast show type="warning">
					Warningtoast
				</Toast>
				<Toast show type="error">
					Error toast
				</Toast>
			</div>
		</section>
	)
}

export default About
