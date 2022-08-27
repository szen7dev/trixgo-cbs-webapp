import React, { useContext } from 'react'
import { ContextModalPost } from "views/media/contexts/post";
import { Project } from 'typings/items/project';
import Carousel from 'react-elastic-carousel'

type Props = {
	projectInfo: Project | undefined,
} & React.HTMLAttributes<HTMLDivElement>

const ReportImage: React.FC<Props> = ({ projectInfo, ...props }) => {
	const {openPost } = useContext(ContextModalPost);
	if(!projectInfo || !projectInfo?.photos?.length) return <></>;

	const renderPrevNextButton = (type: string, onClick: () => void) => {
		return (
			<div className={"flex items-center absolute z-10 h-full " + (type === "PREV" ? "left-0" : "right-0")}>
				<button
					onClick={onClick}
					className={"w-10 h-10 flex items-center justify-center border-0.5 rounded-lg border-primary-border bg-cbs-next-prev-button " + (type === "PREV" ? "" : "rotate-180")}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
			</div>
		)
	}

	return (
		<div {...props}>
			<div className='bg-white relative w-full mt-4 py-2 flex px-3'>
				<Carousel
					itemsToShow={5}
					isRTL={false}
					itemPadding={[0,5,0,5]}
					pagination={false}
					renderArrow={({type, onClick}) => renderPrevNextButton(type, onClick)}
				>
					{projectInfo?.photos?.map((photo,i) => (
						<div key={photo._id} className='w-full pb-[100%] relative' onClick={()=> openPost({ author: photo.author, images: projectInfo.photos, index: i, createAt: photo.createAt, mediaId: photo._id.toString() })}>
							<p className='opacity-0 invisible h-0'>{photo.name}</p>
							<div className='absolute inset-0 overflow-hidden'>
								<img src={`${process.env.REACT_APP_URL_S3}${photo.path}`} alt={`Report ${photo.path}`} className="object-cover h-full w-full" />
							</div>
						</div>
					))}
				</Carousel>
			</div>
		</div>
	)
}

export default ReportImage
