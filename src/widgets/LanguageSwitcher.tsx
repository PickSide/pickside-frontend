// https://www.iso.org/obp/ui/#search
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaGlobe } from 'react-icons/fa'
import { ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import { Button } from 'components'
import { useLocaleSwitcher } from 'hooks'
import { AppState } from 'state'
import '/node_modules/flag-icons/css/flag-icons.min.css'

const LanguageSwitcher: FC<any> = ({ ...props }) => {
	const { current, handleLocaleChange } = useLocaleSwitcher()

	const locales = useSelector((state: AppState) => state.locales)

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	// useEffect(() => {
	// 	if (!locales) {
	// 		dispatch<any>(getLocales())
	// 	}
	// }, [dispatch, getLocales, locales])

	const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const LocalesEl = (): JSX.Element => (
		<>
			{locales?.results?.map((locale, idx) => (
				<MenuItem
					key={idx}
					disabled={current === locale.value}
					onClick={() => {
						handleLocaleChange(locale.value)
						handleClose()
					}}
					value={locale.value}
				>
					<ListItemIcon>
						<span className={`fi fi-${locale.flagCode}`}></span>
					</ListItemIcon>
					<ListItemText>
						<Typography>{locale.description}</Typography>
					</ListItemText>
				</MenuItem>
			))}
		</>
	)

	return (
		<div>
			<Button id="locale-open-btn" isIcon onClick={handleOpen}>
				<FaGlobe size={25} />
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<LocalesEl />
			</Menu>
		</div>
	)
}

export default LanguageSwitcher
