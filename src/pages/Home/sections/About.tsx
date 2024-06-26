import Basketball from '@assets/basketball.png'
import { useTranslation } from 'react-i18next'

const About = () => {
	const { t } = useTranslation()

	return (
		<section id="about">
			<div className="max-w-screen-xl flex flex-col gap-y-10 lg:flex-row mx-auto">
				<div className="w-full lg:min-w-[756px] h-[413px]">
					<img src={Basketball} alt="basketball_img" className="w-full h-full object-cover" />
				</div>
				<div className="flex flex-col items-center lg:items-start px-8 gap-y-4">
					<h1 className="hidden md:block text-ocean">{t('What is PICK SIDE?')}</h1>
					<h3 className="md:hidden text-ocean text-center">{t('What is PICK SIDE?')}</h3>
					<p className="text-lg">
						{t(`
                        Our platform offers effortless matchmaking, transparency,
                        and control, ensuring you're paired with compatible teammates
                        while providing detailed profiles and ratings.
                        Join our vibrant community today for reliable,
                        enjoyable game experiences tailored to your needs.
                    `)}
					</p>
				</div>
			</div>
		</section>
	)
}

export default About
