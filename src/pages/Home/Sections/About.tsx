import React from 'react'
import {
	Accordion,
	AccordionSection,
	Alert,
	Button,
	Chip,
	ChipGroup,
	Dropdown,
	DatePicker,
	IconDropdown,
	MenuItem,
	Switch,
	Stepper,
	Radio,
	RadioGroup,
	TimePicker,
	Toggle,
	ToggleGroup,
	Map,
	NumberField,
} from 'components'
import { Toast } from 'widgets'
import { BiAddToQueue } from 'react-icons/bi'
import { CiLight } from 'react-icons/ci'
import { TfiSharethis } from 'react-icons/tfi'
import { FiSettings } from 'react-icons/fi'

const About = () => {
	return (
		<section id="about" className="bg-[#e0f2f1] flex flex-col gap-y-4">
			<div className="flex justify-center gap-x-4">
				<Button primary>Button</Button>
				<Button secondary>Button</Button>
				<Button tertiary>Button</Button>
			</div>
			<div className="flex justify-center gap-x-4">
				<Switch primary />
				<Switch secondary />
				<Switch tertiary />
			</div>
			<div className="flex justify-center gap-x-4">
				<ChipGroup defaultValue="green" label="Chip labels" name="test" onChange={(e) => console.log(e)}>
					<Chip text="Primary" value="primary" />
					<Chip text="Green" value="green" icon={<CiLight size={15} />} chipColor="green" />
					<Chip text="Blue" value="blue" chipColor="blue" />
					<Chip text="Red" value="red" chipColor="red" />
				</ChipGroup>
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
				<RadioGroup name="test" label="A group radio button" onChange={(option) => console.log(option)}>
					<Radio text="Radio Normal" value="a" description="This button is clickable" />
					<Radio
						text="Radio with icon"
						value="b"
						icon={<TfiSharethis size={30} />}
						description="This button is clickable"
					/>
					<Radio text="Radio disabled" value="c" description="This button is disabled" disabled />
				</RadioGroup>
			</div>
			<div className="flex justify-center gap-x-4 w-[50%] mx-auto">
				<Stepper
					steps={[
						{
							id: 'cabin',
							title: 'Cabin',
							required: false,
							content: <p>This is step one</p>,
						},
						{
							id: 'means',
							title: 'Meals',
							required: false,
							content: <p>This is step two</p>,
						},
						{
							id: 'upgrades',
							title: 'Upgrades',
							required: false,
							content: <p>This is step three</p>,
						},
						{
							id: 'payment',
							title: 'Payment',
							required: false,
							content: <p>This is step four</p>,
						},
					]}
				/>
			</div>
			<div className="flex justify-center gap-x-4">
				<DatePicker onChange={(option) => console.log(option)} />
				<TimePicker onChange={(option) => console.log(option)} />
			</div>
			<div className="flex justify-center gap-x-4">
				<ToggleGroup name="test" onChange={(e) => console.log('checked', e.target.checked)} defaultValue="hi">
					<Toggle text="Hi" value="hi" />
					<Toggle text="Bye" value="bye" />
				</ToggleGroup>
			</div>
			<div className="flex justify-center gap-x-4">
				<Accordion>
					<AccordionSection title="Header" icon={<FiSettings size={25} />} expanded={true}>
						<p>Hello</p>
					</AccordionSection>
					<AccordionSection title="Header" icon={<FiSettings size={25} />}>
						<p>Hello</p>
					</AccordionSection>
					<AccordionSection title="Header" icon={<FiSettings size={25} />}>
						<p>Hello</p>
					</AccordionSection>
				</Accordion>
			</div>
			<div className="flex justify-center gap-x-4">
				<NumberField label="Input stepper" />
			</div>
			{/* <div className="flex justify-center gap-x-4">
				<div className="relative w-72 h-44">
					<Map />
				</div>
			</div> */}
		</section>
	)
}

export default About
