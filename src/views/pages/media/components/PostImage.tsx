import { FC } from 'react';
import { PostImageProps } from 'typings/social';

const PostImage: FC<PostImageProps> = ({ images }) => {
	if (!images?.length) return null;
	return (
		<>
			{
				images.map((file, index) => {
					return (
						<div key={file.name + index} className="post__files-image">
							<img src={URL.createObjectURL(file)} alt="" />
							<div className="">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</div>
						</div>
					)
				})
			}
		</>
	)
}

export default PostImage
