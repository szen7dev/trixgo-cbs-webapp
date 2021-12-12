import { FC, HTMLAttributes } from 'react';
import { PostImageProps } from 'typings/social';

const PostImage: FC<PostImageProps & HTMLAttributes<HTMLDivElement>> = ({ images, onRemove, ...props }) => {
	if (!images?.length) return null;

	return (
		<div {...props}>
			{
				images.map((d, _index) => {
					const src = 'progress' in d ? URL.createObjectURL(d.file) : d.url;
					return (
						<div key={d.id} className="post__files-image">
							<img src={src} alt="" />
							{'progress' in d && d.progress > 0 && d.progress < 100 ? <div className="absolute bottom-3 right-3 left-3 h-2 bg-black opacity-60 rounded-sm border border-gray-300">
								<div className="bg-white h-full" style={{ width: d.progress + '%' }}></div>
							</div> : null}
							<button
								type="button"
								className="close-btn absolute top -top-3.5 -right-3 bg-white rounded-3xl h-6 w-6 flex justify-center items-center"
								onClick={() => onRemove && onRemove(d)}
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

export default PostImage
