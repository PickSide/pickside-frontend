import React from 'react'
import { Alert, Button, Dropdown, IconDropdown, MenuItem, Toggle } from 'components'
import { Toast } from 'widgets'
import { BiAddToQueue } from 'react-icons/bi'

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
			<div className="flex justify-center gap-x-4">
				<Alert severity="info">Info alert</Alert>
				<Alert severity="success">Success alert</Alert>
				<Alert severity="warning">Warning alert</Alert>
				<Alert severity="error">Error alert</Alert>
			</div>
			<div className="flex justify-center gap-x-4">
				<Dropdown text="Dropdown">
					<MenuItem icon={<BiAddToQueue size={25} />}>With icon</MenuItem>
					<MenuItem>No icon</MenuItem>
					<MenuItem disabled>Disabled</MenuItem>
					<MenuItem>Option with elipsis text yessssss</MenuItem>
				</Dropdown>
				<IconDropdown icon={<BiAddToQueue size={25} />}>
					<MenuItem icon={<BiAddToQueue size={25} />}>With icon</MenuItem>
					<MenuItem>No icon</MenuItem>
					<MenuItem disabled>Disabled</MenuItem>
					<MenuItem>Option with elipsis text yessssss</MenuItem>
				</IconDropdown>
			</div>
			<div className="flex justify-center gap-x-4">
				<Dropdown text="Dropdown">
					<MenuItem icon={<BiAddToQueue size={25} />}>With icon</MenuItem>
					<MenuItem>No icon</MenuItem>
					<MenuItem disabled>Disabled</MenuItem>
					<MenuItem>Option with elipsis text yessssss</MenuItem>
				</Dropdown>
				<IconDropdown icon={<BiAddToQueue size={25} />}>
					<MenuItem icon={<BiAddToQueue size={25} />}>With icon</MenuItem>
					<MenuItem>No icon</MenuItem>
					<MenuItem disabled>Disabled</MenuItem>
					<MenuItem>Option with elipsis text yessssss</MenuItem>
				</IconDropdown>
			</div>
		</section>
	)
}

export default About
