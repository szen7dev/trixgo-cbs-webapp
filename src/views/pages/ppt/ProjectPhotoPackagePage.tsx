import { FC, memo, MouseEventHandler, useContext, useEffect } from "react";

import SearchInput from "components/common/SearchInput";
import DropdownFilterButton from "views/pages/document/components/DocumentFilterButton";
import ButtonMore from "views/pages/document/components/common/ButtonMore";
import generateImageLink from 'views/pages/media/utils/images'
import ModalViewPost from "views/pages/media/components/post/ModalViewPost";
import { ContextModalPost, ProviderModalPost } from "views/pages/media/context/post";

const CardItem = memo(({ index, onClick }: { index: number, onClick: MouseEventHandler<HTMLDivElement> }) => <div className="w-32 cursor-pointer" onClick={onClick}>
	<div className="relative w-32 h-32">
		<img src={generateImageLink()} alt="test" width={130} height={130} className="w-full h-full object-cover" />
		{index >= 10 && <div className="absolute inset-0 flex flex-1 items-center justify-center text-white text-2x-large bg-white bg-opacity-60">
			+1
		</div>}
	</div>
	<p className="line-clamp-2">Kiểm tra trạm trộn bê tông an phát tại...</p>
</div>)

CardItem.displayName = "CardItem";

const ProjectPhotoPackage: FC = () => {
	const { openPost } = useContext(ContextModalPost);
	useEffect(() => {
		document.title = "CHG.THT-Hình ảnh"
	}, []);

	const mediaID = '61c6caf6f92c4e0d68779554';
	const handleOpenPost = (i = 0) => openPost({
		mediaId: mediaID,
		images: Array.from({ length: 4 }).map((_, index) => ({ id: index.toString(), url: generateImageLink() })),
		index: i
	})

	return (
		<>
			<div className="flex flex-col h-full overflow-hidden">
				<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
					<span className="line-clamp-1 max-w-sm text-x-large mr-7">CHG.THT.Thi công san lấp mặt bằng, đường giao...</span>
					<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={() => 1} />
					<DropdownFilterButton className="mr-auto" />

					{/* <ButtonCreate onClick={toggleModal} /> */}
					<ButtonMore />
				</div>
				{/* Content */}
				<div className="overflow-auto">
					{
						Array.from({ length: 4 }).map((_, i) => (
							<div key={i} className="px-5 py-4 border-b border-cbs-border">
								{/* Card header */}
								<div className="flex cursor-pointer" onClick={() => handleOpenPost()}>
									<img src={generateImageLink()} alt="" className="w-10 h-10 mr-3.5 object-cover rounded-full" />
									<div>
										<p>Thi công ép cọc thí nghiệm, thí nghiệm cọc thí nghiệm và thi công ép cọc đại trà</p>
										<p>Vũ Đình Khiên-CPMI|<span className="text-cbs-subtext">13:37 6/7/21 - 18 giờ trước</span></p>
									</div>
								</div>

								{/* List images */}
								<div className="flex flex-wrap gap-x-3 mt-5">
									{
										Array.from({ length: 12 }).map((_, index) => <CardItem key={index} index={index} onClick={() => handleOpenPost(index)} />)
									}
								</div>
							</div>
						))
					}
				</div>
			</div>
			<ModalViewPost listComments={[]} mediaID={mediaID} />
		</>
	);
};

const ProjectPhotoPackagePage: FC = () => {
	return (
		<ProviderModalPost>
			<ProjectPhotoPackage />
		</ProviderModalPost>
	)
}

export default ProjectPhotoPackagePage;