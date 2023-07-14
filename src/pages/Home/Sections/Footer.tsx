import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'

import { Button } from 'components'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Footer = () => {
	const { t } = useTranslation()

	return (
		<div className="bg-primary text-white h-72">
			<div className="flex flex-col p-10">
				<div className="flex items-center space-x-4">
					<p className="text-[20px] font-semibold">{t('Post your sport event')}</p>
					<Button
						type="button"
						variant="secondary"
						text={t('Get Started')}
						className="border border-white text-white"
					/>
				</div>
				<div className="border border-white my-4"></div>
				<div className="flex space-x-56">
					<div className="flex flex-col justify-center space-y-3">
						<p className="font-semibold">{t('Your Account')}</p>
						<NavLink to="">{t('Sign up')}</NavLink>
						<NavLink to="">{t('Login')}</NavLink>
						<NavLink to="">{t('Help')}</NavLink>
					</div>
					<div className="flex flex-col space-y-3">
						<p className="font-semibold">{t('Discover')}</p>
						<NavLink to="">{t('Events')}</NavLink>
						<NavLink to="">{t('Calendar')}</NavLink>
					</div>
					<div className="flex flex-col space-y-3">
						<p className="font-semibold">{t('App')}</p>
						<NavLink to="">{t('About us')}</NavLink>
						<NavLink to="">{t('Contact us')}</NavLink>
					</div>
					<div className="flex flex-col space-y-3">
						<p className="font-semibold">{t('Follow us')}</p>
						<NavLink to="" className="flex items-center gap-x-3">
							<AiOutlineInstagram size={20} />
							{t('Instagram')}
						</NavLink>
						<NavLink to="" className="flex items-center gap-x-3">
							<AiOutlineFacebook size={20} />
							{t('Facebook')}
						</NavLink>
						<NavLink to="" className="flex items-center gap-x-3">
							<AiOutlineTwitter size={20} />
							{t('TWitter')}
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer
