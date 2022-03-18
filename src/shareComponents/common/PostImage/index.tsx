import { FC, HTMLAttributes, memo } from 'react';
import { FileProps, FilePropsUpload, PostImageProps } from 'typings/common';

const ImageUploading: FC<{ d: FilePropsUpload }> = ({ d }) => {
	return <img src={'_id' in d.file ? `${process.env.REACT_APP_URL_S3}${d.file.path}` : URL.createObjectURL(d.file)} alt="" />
}
const ImageUploaded: FC<{ d: FileProps }> = ({ d }) => {
	return <img src={`${process.env.REACT_APP_URL_S3}${d.path}`} alt="" />
}

const MemoImageUploading = memo(ImageUploading, (prevProps, nextProps) => prevProps.d.id === nextProps.d.id);
const MemoImageUploaded = memo(ImageUploaded, (prevProps, nextProps) => prevProps.d._id === nextProps.d._id);

export const PostImage: FC<PostImageProps & HTMLAttributes<HTMLDivElement>> = ({ images, onRemove, ...props }) => {
	if (!images?.length) return <></>;
	const isHide = images.every(image => Object.keys(image).length === 1);
	if(isHide) return <></>;

	return (
		<div {...props}>
			{
				images.map((d, _index) => {
					if(Object.keys(d).length === 1) return <></>;

					if ('id' in d) {
						return (
							<div key={d.id} className="post__files-image">
								<MemoImageUploading d={d} />
								{'progress' in d && d.progress >= 0 && d.progress < 100 ? <div className="absolute bottom-3 right-3 left-3 h-2 bg-black opacity-60 rounded-sm border border-gray-300">
									<div className="bg-white h-full" style={{ width: d.progress + '%' }}></div>
								</div> : null}
								<button
									type="button"
									className="close-btn absolute top -top-3.5 -right-3 bg-white rounded-3xl h-6 w-6 flex justify-center items-center"
									onClick={() => onRemove && onRemove(d, 'IMAGE')}
								>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
						)
					}

					return (
						<div key={d._id} className="post__files-image">
							<MemoImageUploaded d={d} />
							<button
								type="button"
								className="close-btn absolute top -top-3.5 -right-3 bg-white rounded-3xl h-6 w-6 flex justify-center items-center"
								onClick={() => onRemove && onRemove(d, 'IMAGE')}
							>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					)
				})}
		</div>
	)
}