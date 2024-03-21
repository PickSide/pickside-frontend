import Basketball from '@assets/basketball.png'
import { useTranslation } from 'react-i18next'

const About = () => {
    const { t } = useTranslation()

    return (
        <section id='about'>
            <div className="max-w-screen-xl flex mx-auto">
                <div className='min-w-[756px] h-[413px]'>
                    <img src={Basketball} className='w-full h-full object-cover' />
                </div>
                <div className='flex flex-col'>
                    <h1 className='text-ocean'>{t('What is PICK SIDE?')}</h1>
                    <p className='text-lg'>
                        {t(`
                        Our platform offers effortless matchmaking, transparency, 
                        and control, ensuring you're paired with compatible teammates 
                        while providing detailed profiles and ratings. 
                        Join our vibrant community today for reliable, 
                        enjoyable game experiences tailored to your needs.
                    `)}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default About