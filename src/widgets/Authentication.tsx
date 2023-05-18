import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { BsPersonCircle, BsFillPersonPlusFill } from 'react-icons/bs'
import { TabProps, Tabs } from 'components'
import { LoginForm, SignUpForm } from 'widgets'

const Authentication: FC<any> = ({ ...props }) => {
	const { t } = useTranslation()

	const tabs: TabProps[] = [
		{
			title: t('Login'),
			path: 'login',
			content: <LoginForm onClose={props.onClose} />,
			icon: <BsPersonCircle size={20} />,
			selected: true,
		},
		{
			title: t('Sign up'),
			path: 'signup',
			content: <SignUpForm onClose={props.onClose} />,
			icon: <BsFillPersonPlusFill size={20} />,
		},
	]

	return <Tabs tabs={tabs} />
}

export default Authentication
