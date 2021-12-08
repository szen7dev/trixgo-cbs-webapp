import { FC } from 'react';
import { PostImageProps } from 'typings/social';

const PostImage: FC<PostImageProps> = ({ images, onRemove }) => {
	if (!images?.length) return null;

	const cloneImages = [...images];
	const arrays = [], size = 3;

	while (cloneImages.length > 0)
		arrays.push(cloneImages.splice(0, size));

	return (
		<>
			{
				arrays.map((files, index) => {
					return (
						<div className="post__files-row pt-5" key={`${index}`}>
							{
								files.map((file, _index) => (
									<div key={file.name + index + _index} className="post__files-image">
										<img src={URL.createObjectURL(file)} alt="" />
										<button
											className="close-btn absolute top -top-3.5 -right-3 bg-white rounded-3xl h-6 w-6 flex justify-center items-center"
											onClick={() => onRemove(index * 3 + _index)}
										>
											<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
											</svg>
										</button>
									</div>
								))
							}
						</div>
					)
				})
			}
		</>
	)
}

export default PostImage
