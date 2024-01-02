import { Button, Upload } from '@components'
import { useId, useState } from 'react'

import Avatar from '@components/Avatar'
import { convertToBase64 } from '@utils/base64'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useUpdateAvatar, } from '@hooks'

const AvatarUploadForm = () => {
    const id = useId()
    const { handleSubmit, register, watch, setValue, formState } = useForm({
        defaultValues: {
            avatar: ''
        }
    })
    const { updateAvatar, isLoading } = useUpdateAvatar()
    const { t } = useTranslation()

    const [preview, setPreview] = useState<any>()

    const handleSelect = (e) => {
        setPreview(URL.createObjectURL(e.target.files[0]))
        setValue('avatar', e.target.files[0])
    }

    const onSubmit = async ({ avatar }: any) => {
        const base64 = await convertToBase64(avatar)
        await updateAvatar({ avatar: base64 })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="block text-gray-400 mb-4">
                <div id={id} className="rounded-lg border grid grid-flow-row grid-row-12 gap-5 content-center border-gray-500 border-dashed w-full p-6">
                    {!preview ? (
                        <div className="block">
                            <p>{t('Update your avatar')}</p>
                            <p>{t('PNG, JPG or GIF')}</p>
                        </div>
                    ) : (
                        <Avatar size='xxlg' src={preview} alt='avatar' />
                    )}
                    <div className="block my-auto">
                        <Upload {...register('avatar')} text={preview ? t('Change') : t('Upload picture')} onChange={handleSelect} />
                    </div>
                </div>
            </div>
            <Button type='submit' className='w-full' disabled={!watch('avatar') || formState.isSubmitting || isLoading} isLoading={formState.isSubmitting || isLoading}>{t('Submit')}</Button>
        </form>
    )
}

export default AvatarUploadForm