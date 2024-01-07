import { Upload } from '@components'
import uploadPlaceholder from '@assets/upload-placeholder.svg'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ImageUploader = ({ onChange }) => {
	const { t } = useTranslation()

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
			<p className="text-ocean/60 truncate max-w-xs">{file[0].name}</p>
			<button className="rounded-[4px] bg-ocean w-4 h-4 text-xs text-light hover:bg-ocean-2 transition-all" onClick={() => removeFile(idx)}>
				X
			</button>
		</div>
	)

	return (
		<div className="block text-gray-400">
			<p className="text-gray-800">
				{t('Image')}
			</p>
			<div className="rounded-lg flex justify-between items-center gap-x-6 border border-gray-500 border-dashed w-full px-4 py-6">
				{!selectedImages.length ? (
					<>
						<img alt="img_upload" src={uploadPlaceholder} />
						<div className="flex flex-col">
							<p>{t('Upload a picture of your venue.')}</p>
							<p>{t('PNG, JPG or GIF')}</p>
						</div>
					</>
				) : (
					<div className="flex flex-col">
						{selectedImages.map((img, idx) => (
							<File key={idx} file={img} idx={idx} />
						))}
					</div>
				)}
				<Upload text={t('Your images')} onChange={handleSelect} multiple />
			</div>
		</div>
	)
}

export default ImageUploader
