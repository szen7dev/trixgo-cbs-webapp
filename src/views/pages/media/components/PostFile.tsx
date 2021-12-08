import { FC } from 'react';
import { PostFileProps } from 'typings/social';

const PostFile: FC<PostFileProps> = ({ files }) => {
	if (!files?.length) return null;
	return (
		<>
			{
				files.map((file, index) => {
					return (
						<div key={file.name + index} className="post__files-image">
							<img src={URL.createObjectURL(file)} alt="" />
						</div>
					)
				})
			}
		</>
	)
}

export default PostFile
