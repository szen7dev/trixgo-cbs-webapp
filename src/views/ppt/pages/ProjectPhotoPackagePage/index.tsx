import { FC, memo, MouseEventHandler, useEffect, useState } from "react";

import { SearchInput, ButtonMore } from "shareComponents/common";
// import DropdownFilterButton from "views/pages/document/components/DocumentFilterButton";

import { ModalZoomView } from "shareComponents/common/ZoomView";
import { ImageProps } from "typings/social";

const CardItem = memo(({ index, onClick }: { index: number, onClick: MouseEventHandler<HTMLDivElement> }) => <div className="w-32 cursor-pointer" onClick={onClick}>
	<div className="relative w-32 h-32">
		<img src="https://trx-demo-003.s3-ap-southeast-1.amazonaws.com/root/test/3d049844-5477-4cb0-9333-f3a0cd5fae59.jpeg" alt="test" width={130} height={130} className="w-full h-full object-cover" />
		{index >= 10 && <div className="absolute inset-0 flex flex-1 items-center justify-center text-white text-2x-large bg-white bg-opacity-60">
			+1
		</div>}
	</div>
	<p className="line-clamp-2">Kiểm tra trạm trộn bê tông an phát tại...</p>
</div>)

CardItem.displayName = "CardItem";

const ProjectPhotoPackagePage: FC = () => {
	const [defaultState, setDefaultState] = useState({ mediaID: '', images: [] as ImageProps[], index: 0, author: undefined, createAt: '' });
	const [isShow, setIsShow] = useState(false);

	useEffect(() => {
		document.title = "CHG.THT-Hình ảnh"
	}, []);

	const mediaID = '620b09c36a97815180b079b5';
	const handleOpenPost = (i = 0) => {
		setDefaultState({
			mediaID,
			images: [
				{
					"_id": "620b09c06a97815180b079af",
					"nameOrg": "photo1642003084205-1642003084324182971234-1642003102108379400375.jpg",
					"name": "ba3fcd4f-2bd0-4126-81f5-09e4e38acd60.jpg",
					"path": "root/test/ba3fcd4f-2bd0-4126-81f5-09e4e38acd60.jpg",
					"size": 77000,
					"type": "image/jpeg"
				},
				{
					"_id": "620b09c06a97815180b079b1",
					"nameOrg": "musk3-16357315967521765044075-16357316113371296920407-1644889832128738911430.jpg",
					"name": "14f65386-95b8-40d4-856d-676d5b71f8d8.jpg",
					"path": "root/test/14f65386-95b8-40d4-856d-676d5b71f8d8.jpg",
					"size": 24251,
					"type": "image/jpeg"
				},
				{
					"_id": "620b09c06a97815180b079b3",
					"nameOrg": "photo1644889415337-16448894154671522529919.jpg",
					"name": "3d2da7de-f5b6-4d8a-9999-292d46c303b1.jpg",
					"path": "root/test/3d2da7de-f5b6-4d8a-9999-292d46c303b1.jpg",
					"size": 68159,
					"type": "image/jpeg"
				}
			],
			index: i,
			author: undefined,
			createAt: ''
		});
		setIsShow(true)
	}
	const toggle = () => setIsShow(!isShow)

	return (
		<>
			<div className="flex flex-col h-full overflow-hidden">
				<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
					<span className="line-clamp-1 max-w-sm text-x-large mr-7">CHG.THT.Thi công san lấp mặt bằng, đường giao...</span>
					<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={() => 1} />
					{/* <DropdownFilterButton className="mr-auto" /> */}

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
									<img src="https://trx-demo-003.s3-ap-southeast-1.amazonaws.com/root/test/3d049844-5477-4cb0-9333-f3a0cd5fae59.jpeg" alt="" className="w-10 h-10 mr-3.5 object-cover rounded-full" />
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
			<ModalZoomView isShow={isShow} toggle={toggle} initialData={defaultState} />
		</>
	);
};

export default ProjectPhotoPackagePage;