import React from 'react'
import { BREAKPOINTS } from 'utils'

const useIsMobile = () => {
    const [screenSize, setScreenSize] = React.useState<any>({})

    const getNumber = (value) => Number.parseInt(value.replace('px', ''))

    const isMobile = React.useMemo(() => {
        const { md } = BREAKPOINTS
        const { width } = screenSize
        return width <= getNumber(md)
    }, [screenSize])

    React.useEffect(() => {
        function handleResize() {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);

        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return isMobile
}

export default useIsMobile