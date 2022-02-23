import React from 'react'

export const SearchInput: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	return (
		<div className="rounded-sm flex my-2.5 bg-cbs-left-menu mr-2" {...props}>
			<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 ml-3 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
			</svg>
			<input className="bg-transparent focus:outline-none py-1.5 px-2.5 flex-1 text-medium" placeholder="Nhập từ khoá tìm kiếm" />
		</div>
	)
}