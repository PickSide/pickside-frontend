import { io } from 'socket.io-client'

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.PROD ? undefined : import.meta.env.VITE_APP_API_BASE_URL

export default io(URL, { autoConnect: false })
