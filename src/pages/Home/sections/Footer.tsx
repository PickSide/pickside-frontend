import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'

import { Button } from '@components'
import { NavLink } from 'react-router-dom'
import { useDevice } from '@hooks'
import { useTranslation } from 'react-i18next'

const Footer = () => {
	const { t } = useTranslation()
	const [device] = useDevice()

	const MobileFooter = () => (
		<section id="footer" className="bg-primary text-white">
			<div className="flex flex-col px-10 py-5">
				<div className="text-center space-x-6">
					<p className="text-[15px] font-semibold">{t('Post your sport event')}</p>
				</div>
				<div className="border border-white my-4"></div>
				<div className="flex justify-between">
					<div className="block text-[14px] space-y-3">
						<div className="flex flex-col">
							<p className="font-semibold mb-1">{t('Your Account')}</p>
							<NavLink to="">{t('Sign up')}</NavLink>
							<NavLink to="">{t('Login')}</NavLink>
							<NavLink to="">{t('Help')}</NavLink>
						</div>
						<div className="flex flex-col">
							<p className="font-semibold mb-1">{t('App')}</p>
							<NavLink to="">{t('About us')}</NavLink>
							<NavLink to="">{t('Contact us')}</NavLink>
						</div>
					</div>
					<div className="block text-[14px] space-y-3">
						<div className="flex flex-col">
							<p className="font-semibold mb-1">{t('Discover')}</p>
							<NavLink to="">{t('Events')}</NavLink>
							<NavLink to="">{t('Calendar')}</NavLink>
						</div>
						<div className="flex flex-col">
							<p className="font-semibold mb-1">{t('Follow us')}</p>
							<NavLink to="" className="flex items-center gap-x-1">
								<AiOutlineInstagram size={20} />
								{t('Instagram')}
							</NavLink>
							<NavLink to="" className="flex items-center gap-x-1">
								<AiOutlineFacebook size={20} />
								{t('Facebook')}
							</NavLink>
							<NavLink to="" className="flex items-center gap-x-1">
								<AiOutlineTwitter size={20} />
								{t('Twitter')}
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		</section>
	)

	return device !== 'desktop' ? (
		<MobileFooter />
	) : (
		<section id="footer" className="bg-primary text-white">
			<div className="flex flex-col px-40 py-10">
				<div className="flex items-center space-x-6">
					<p className="text-[20px] font-semibold">{t('Post your sport event')}</p>
					<Button type="button" variant="secondary" className="border border-white text-white">
						{t('Get Started')}
					</Button>
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
							{t('Twitter')}
						</NavLink>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Footer
