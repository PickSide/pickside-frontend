import React from 'react'
import { BREAKPOINTS } from 'utils'

const useDevice = () => {
    const [screenSize, setScreenSize] = React.useState<any>({})

    const getNumber = (value) => Number.parseInt(value.replace('px', ''))

    const isMobile = React.useMemo(() => {
        const { md } = BREAKPOINTS
        const { width } = screenSize
        return width <= getNumber(md)
    }, [screenSize])

    const isTablet = React.useMemo(() => {
        const { md, lg } = BREAKPOINTS
        const { width } = screenSize
        return width >= getNumber(md) && width < getNumber(lg)
    }, [screenSize])

    const isPc = React.useMemo(() => {
        const { lg } = BREAKPOINTS
        const { width } = screenSize
        return width >= getNumber(lg)
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

    return { isMobile, isTablet, isPc }
}

export default useDevice