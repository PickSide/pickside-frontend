import ChatWithYourTeam from '../svgs/ChatWithYourTeam.svg'
import EnjoyYourMatch from '../svgs/EnjoyYourMatch.svg'
import JoinOrCreateSvg from '../svgs/JoinOrCreateSvg.svg'
import { useTranslation } from 'react-i18next'

const About = () => {
	const { t } = useTranslation()

	return (
		<section id="about" className="block w-[90%] px-10 py-10 mx-auto text-center">
			<h3 className="text-primary border-b-8 border-primary font-semibold">{t('How It Works')}</h3>
			<div className="flex justify-center gap-x-20">
				<div className="block w-[552px] h-[447px] mt-[94px]">
					<img className="float-right" src={JoinOrCreateSvg} alt="join_or_create" />
					<div className="float-left w-3/4 space-y-2">
						<h6 className="font-medium">{t('Join or create a team')}</h6>
						<p>
							{t(
								"Whether you're a seasoned pro or just looking for some casual fun, you can easily join existing events or create your own. It's as simple as choosing your match, picking your team, and setting the rules. The soccer pitch is yours to conquer!",
							)}
						</p>
					</div>
				</div>
				<div className="block w-[434px] h-fit max-h-[440px] mt-[142px]">
					<div className="space-y-2">
						<h6 className="font-medium">{t('Chat with your team')}</h6>
						<p>
							{t(
								"Winning starts with teamwork. Communicate and strategize with your teammates using our built-in chat feature. Get to know each other, discuss tactics, and build a strong bond before the big day. Winning is sweeter when you're on the same page.",
							)}
						</p>
					</div>
					<img className="inline-block" src={ChatWithYourTeam} alt="enjoy_your_match" />
				</div>
				<div className="block w-[488px] h-[481px] mt-[46px]">
					<img className="float-right" src={EnjoyYourMatch} alt="chat_with_your_team" />
					<div className="float-left w-3/4 space-y-2">
						<h6 className="font-medium">{t('Enjoy your match')}</h6>
						<p>
							{t(
								"The day has arrived, and it's time to shine. Gather at the assigned field, meet your fellow soccer enthusiasts, and take the field with confidence. Enjoy the thrill of the game, play your heart out, and create memories that will last a lifetime. It's match day, and your victory awaits",
							)}
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default About
