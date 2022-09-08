import react, { FC, useState } from 'react'
import './App.css'
import Dialog from '../src/components/Dialog'
import SideBar from './components/SideBar'
import Authentication from './components/authentication/section/Authentication'

const App = () => {
	const [openAuthenticationDialog, setOpenAuthenticationDialog] = useState<boolean>(false)

	return (
		<>
			<Dialog
				open={openAuthenticationDialog}
				onClose={() => setOpenAuthenticationDialog(false)}
				title="Authentication"
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				size="sm"
			>
				<Authentication />
			</Dialog>
			<SideBar setOpenAuthenticationDialog={setOpenAuthenticationDialog} />
		</>
	)
}

export default App
