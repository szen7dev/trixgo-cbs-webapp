import { FC } from 'react';

import cn from 'classnames';

import pdfIcon from 'assets/images/icons8-pdf-48 1.png';
import downloadIcon from 'assets/images/icons8-download-48.png';

import { FileProps, PostFileProps } from 'typings/social';

const PostFile: FC<PostFileProps & React.HTMLAttributes<HTMLDivElement>> = ({ files, onRemove, ...props }) => {
	if (!files?.length) return null;

	const handleDownload = (file: FileProps | File) => {
		if ('url' in file) {
			const a = document.createElement('a');
			a.href = file.url
			a.download = file.name
			document.body.appendChild(a)
			a.click()
			document.body.removeChild(a)
		}
	};

	return (
		<>
			{
				files.map((d, index) => {
					const name = 'progress' in d ? d.file.name : d.name;
					const size = 'progress' in d ? d.file.size : d.size;
					const download = 'progress' in d ? d.file : d;
					const key = 'progress' in d ? d.id : d._id;

					return (
						<div key={key}  {...props} className={cn("post__files-file flex pl-3.5 py-2.5 pr-6", props.className, { loading: 'progress' in d && d.progress < 100 })}>
							<div className="mr-3.5"><img src={pdfIcon} alt="pdf icon" /></div>
							<div className="flex-1">
								<p className="text-sm leading-4 mt-2.5">{name}</p>
								<p className="text-secondary-gray mt-2.5" style={{ lineHeight: "13.8px" }}>{size}KB</p>
							</div>
							<button type="button" className="btn-download text-primary" onClick={() => handleDownload(download)}>
								{
									'progress' in d && d.progress < 100
										? d.progress + '%'
										: <img src={downloadIcon} alt="download icon" />
								}
							</button>
							<button
								type="button"
								className={cn("close-btn absolute top -top-3.5 -right-3 bg-white rounded-3xl h-6 w-6 flex justify-center items-center", { "hidden": !onRemove })}
								onClick={() => onRemove && onRemove(d)}
							>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					)
				})
			}
		</>
	)
}

export default PostFile
