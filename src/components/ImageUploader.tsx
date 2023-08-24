import { forwardRef, useId, useState } from 'react'

import { Upload } from '@components'
import uploadPlaceholder from '../assets/upload_placeholder.png'
import { useDevice } from '@hooks'
import { useTranslation } from 'react-i18next'

const ImageUploader = ({ onChange, ...rest }, ref) => {
	const id = useId()
	const { t } = useTranslation()
	const [device] = useDevice()

	const [selectedImages, setSelectedImages] = useState<any>([])

	const handleSelect = (e) => {
		setSelectedImages((prev) => {
			const next = [...prev, e.target.files]
			onChange(next)
			return next
		})
	}

	const removeFile = (idx) => setSelectedImages(selectedImages.toSpliced(idx, 1))

	const File = ({ file, idx }) => (
		<div className="flex items-center space-x-2">
			<p className="text-primary/60 truncate max-w-xs">{file[0].name}</p>
			<button className="rounded-md bg-primary/70 w-5 h-5 text-accent text-[10px]" onClick={() => removeFile(idx)}>
				X
			</button>
		</div>
	)

	return (
		<div className="block text-gray-400">
			<label htmlFor={id} className="text-gray-800">
				{t('Image')}
			</label>
			<div id={id} className="rounded-lg flex justify-between border border-gray-500 border-dashed w-full p-6">
				{!selectedImages.length ? (
					<div className="flex space-x-4">
						{device !== 'mobile' && <img alt="img_upload" src={uploadPlaceholder} />}
						<div className="flex flex-col">
							<p>{t('Upload a picture of your venue.')}</p>
							<p>{t('PNG, JPG or GIF')}</p>
						</div>
					</div>
				) : (
					<div className="flex flex-col">
						{selectedImages.map((img, idx) => (
							<File key={idx} file={img} idx={idx} />
						))}
					</div>
				)}
				<div className="flex flex-col space-y-4">
					<Upload variant="secondary" text={t('Your images')} onChange={handleSelect} multiple />
					<Upload variant="secondary" text={t('Our collection')} onChange={handleSelect} multiple />
				</div>
			</div>
		</div>
	)
}

export default forwardRef(ImageUploader)
