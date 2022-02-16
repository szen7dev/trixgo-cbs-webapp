import classNames from 'classnames';
import React, { FC, HTMLAttributes } from 'react';
import { FileProps, FilePropsUpload } from 'typings/social';

function byteToSize(bytes: number): string {
	if (bytes < 1024) {
		return `${bytes} B`;
	} else if (bytes < 1024 * 1024) {
		return `${Math.round(bytes / 1024)} KB`;
	} else if (bytes < 1024 * 1024 * 1024) {
		return `${Math.round(bytes / 1024 / 1024)} MB`;
	} else {
		return `${Math.round(bytes / 1024 / 1024 / 1024)} GB`;
	}
}

interface Props {
	index: number,
	onRemove?: (file: FileProps | FilePropsUpload, type: 'IMAGE' | 'FILE') => void,
	data?: FilePropsUpload
}

const FileUploadRow: FC<HTMLAttributes<HTMLDivElement> & Props> = ({ data, onRemove, ...props }) => {
	const { file, progress = 0 } = data || {};
	
	return <div className="col-span-8 py-1 pl-2 pr-1 max-w-md flex mb-3" style={{ backgroundColor: '#EDEBEB' }} {...props}>
		<a className={classNames("font-bold whitespace-nowrap flex overflow-hidden", { 'text-cbs-primary': progress >= 100 })} href='/' target="_blank" rel="noreferrer">
			<div className="document__line-min inline-block mr-1.5 py-1 align-bottom">{file?.name || "Screen Shot 2021-12-22 at 10.15.22.png"}</div>
			<div className="inline-block py-1" style={{ color: '#777' }}>({byteToSize(file?.size || 0)})</div>
		</a>
		{progress < 100 && <div className="inline-block w-[124px] min-w-[124px] bg-white border border-cbs-primary p-0.5 h-3 ml-3 my-2">
			<div className="bg-cbs-primary h-full" style={{ width: progress + '%' }}></div>
		</div>}
		<button type="button" className="ml-auto p-1" onClick={() => onRemove && data && onRemove(data, 'FILE')}>
			<svg aria-label="Xóa tệp đính kèm" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	</div>;
};

export default FileUploadRow;
