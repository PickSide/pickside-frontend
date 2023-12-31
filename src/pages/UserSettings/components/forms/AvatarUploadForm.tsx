import { Button, Upload } from '@components'
import { Controller, useForm } from 'react-hook-form'
import { useId, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useUpdateAvatar, } from '@hooks'

const AvatarUploadForm = () => {
    const id = useId()
    const { control, handleSubmit } = useForm({
        defaultValues: {
            avatar: ''
        }
    })
    const { updateAvatar } = useUpdateAvatar()
    const { t } = useTranslation()

    const [file, setFile] = useState<any>()
    const [preview, setPreview] = useState<any>()

    const handleSelect = (e) => {
        setFile(e.target.files[0])
        setPreview(URL.createObjectURL(e.target.files[0]))
        //setValue('avatar', e.target.files[0])
    }

    const onSubmit = async (values: any) => {
        // const formData = new FormData()
        // formData.append('avatar', file, file.name)
        // console.log(formData)
        // await updateAvatar(file)
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
                        <div className="block w-40 h-40 m-auto rounded-full overflow-clip">
                            <img className='max-w-full h-auto' src={preview} alt='avatar' />
                        </div>
                    )}
                    <div className="block my-auto">
                        <Controller
                            name='avatar'
                            control={control}
                            render={({ field }) => <Upload {...field} text={preview ? t('Change') : t('Upload picture')} onChange={handleSelect} />}
                        />
                    </div>
                </div>
            </div>
            <Button className='w-full' disabled={!file} onClick={onSubmit}>{t('Submit')}</Button>
        </form>
    )
}

export default AvatarUploadForm