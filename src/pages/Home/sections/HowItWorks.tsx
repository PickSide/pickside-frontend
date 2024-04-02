import ChatWithYourTeam from '../svgs/ChatWithYourTeam.svg'
import EnjoyYourMatch from '../svgs/EnjoyYourMatch.svg'
import JoinOrCreateSvg from '../svgs/JoinOrCreateSvg.svg'
import { useTranslation } from 'react-i18next'

const HowItWorks = () => {
	const { t } = useTranslation()

	return (
		<section id="about" className="text-center dark:bg-charcoal-black/20">
			<div className='max-w-screen-xl py-10 mx-auto '>

				<h3 className="text-ocean border-b-8 border-ocean font-semibold mb-10 lg:mb-[171px]">{t('How It Works')}</h3>
				<div className="flex flex-col items-center gap-y-20 lg:flex-row lg:justify-between">
					<div className="flex flex-col justify-between items-center gap-y-10">
						<img className="float-right" src={JoinOrCreateSvg} alt="join_or_create" />
						<div className="float-left w-3/4 space-y-2">
							<h4 className="font-medium">{t('Join or create a team')}</h4>
							<p>
								{t(
									"Whether you're a seasoned pro or just looking for some casual fun, you can easily join existing events or create your own. It's as simple as choosing your match, picking your team, and setting the rules. The soccer pitch is yours to conquer!",
								)}
							</p>
						</div>
					</div>
					<div className="flex flex-col justify-between items-center gap-y-10">
						<img className="inline-block" src={ChatWithYourTeam} alt="enjoy_your_match" />
						<div className="space-y-2">
							<h4 className="font-medium">{t('Chat with your team')}</h4>
							<p>
								{t(
									"Winning starts with teamwork. Communicate and strategize with your teammates using our built-in chat feature. Get to know each other, discuss tactics, and build a strong bond before the big day. Winning is sweeter when you're on the same page.",
								)}
							</p>
						</div>
					</div>
					<div className="flex flex-col justify-between items-center gap-y-10">
						<img className="float-right" src={EnjoyYourMatch} alt="chat_with_your_team" />
						<div className="float-left w-3/4 space-y-2">
							<h4 className="font-medium">{t('Enjoy your match')}</h4>
							<p>
								{t(
									"The day has arrived, and it's time to shine. Gather at the assigned field, meet your fellow soccer enthusiasts, and take the field with confidence. Enjoy the thrill of the game, play your heart out, and create memories that will last a lifetime. It's match day, and your victory awaits",
								)}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default HowItWorks
