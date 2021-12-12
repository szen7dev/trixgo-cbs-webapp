import { FC, Fragment, useState } from "react";

import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";

import cn from 'classnames';

import ModalFullContainer from "../components/ModalFullContainer";
import ModalContainer from "../components/ModalContainer";
import PostFile from '../components/post/PostFile';
import ViewPost from "../components/post/ViewPost";

import avatar from 'assets/images/avatar.jpg';
import iconThumb from 'assets/images/icons8-thumbs-up-96 1.png';
import iconTrash from 'assets/images/icons8-remove.svg';
import iconPencil from 'assets/images/icons8-pencil.svg';
import iconEye from 'assets/images/icons8-eye-96 1.png';
import iconCopy from 'assets/images/icons8-copy-96.png';
import iconPrint from 'assets/images/icons8-print-96.png';
import iconComment from 'assets/images/icon-chat-project.png';
import '../style.css';

// Types
import { FileProps, ImageProps } from "typings/social";
import ReplyCommentField from "../components/ReplyCommentField";

const SocialPostPage: FC = () => {
	const [modalShowReact, setModalShowReact] = useState<boolean>(false);
	const [modalShowImage, setModalShowImage] = useState<{ show: boolean, index: number }>({ show: false, index: 0 });

	const toggleModalReact = () => setModalShowReact(!modalShowReact);
	const closeModalImage = () => setModalShowImage({ show: false, index: 0 });
	const openModalImage = (index: number) => setModalShowImage({ show: true, index });

	const files: Array<FileProps> = Array.from(Array(2).keys()).map((_, i) => ({ id: _, url: '/logo.png', name: "test", size: 123123 }))
	const images: Array<ImageProps> = Array.from(Array(4).keys()).map((_, i) => ({
		id: _,
		url: i % 2
			? 'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455_960_720.jpg'
			: 'https://images2.fanpop.com/images/photos/7800000/Nature-Full-HD-Wallpaper-national-geographic-7822527-1920-1080.jpg',
		name: "test",
		size: 123123
	}))

	return (
		<>
			<div className="page__post text-sm custom-scroll">
				<div className="page__post-container">
					{/* Header */}
					<div className="page__post-header text-black">
						<div className="flex justify-between">
							<h1 className="page__post-title mr-6">Hơn 110.000 người đi tàu Cát Linh - Hà Đông sau một tuần có phí, liệu có hiệu quả?</h1>
							<Menu as="div" className="relative inline-block">
								<Menu.Button className="w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
									</svg>
								</Menu.Button>
								<Transition
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<div className="z-10 absolute right-0 mt-2 text-right origin-top-right border border-gray-300 bg-white divide-y divide-gray-100 rounded-md whitespace-nowrap" style={{ width: "264px" }}>
										<button className="block px-8 py-2 hover:bg-gray-200 w-full text-left">
											<img src={iconPrint} alt="Icon Edit" className="inline-block mr-6" />
											In ấn
										</button>
										<button className="block px-8 py-2 hover:bg-gray-200 w-full text-left">
											<img src={iconCopy} alt="Icon Edit" className="inline-block mr-6" />
											Copy link
										</button>
										<button className="block px-8 py-2 hover:bg-gray-200 w-full text-left">
											<img src={iconPencil} alt="Icon Edit" className="inline-block mr-6" />
											Cập nhật
										</button>
										<button className="block px-8 py-2 hover:bg-gray-200 w-full text-left">
											<img src={iconTrash} alt="Icon trash" className="inline-block mr-6" />
											Xóa
										</button>
									</div>
								</Transition>
							</Menu>
						</div>
						<div className="flex justify-between items-center mt-4">
							<div className="post__author">
								<div className="post__author-avt">
									<Link to="/">
										<img src={avatar} alt="" className="object-cover" />
									</Link>
								</div>
								<div className="post__author-info">
									<p className="text-lg leading-5 font-bold">
										<Link to="/">
											Lê Văn Thành
										</Link>
									</p>
									<p className="text-primary-gray text-base leading-[18px] mt-1.5">
										<Link to="/">
											Kiến trúc sư giải pháp, Google
										</Link>
										<span className="mx-2">•</span>
										<Link to="/">
											Phòng kế toán
										</Link>
									</p>
								</div>
							</div>
							<div className=" text-primary-gray">
								<span className="mr-6">29/11/2021 15:37</span>
								<button className="post__follow">Theo dõi</button>
							</div>
						</div>
					</div>
					{/* Content */}
					<div className="flex pr-6 text-black">
						{/* Main post */}
						<div className="post__content pb-2.5">
							<div className="post__content-images">
								{images.slice(0, 3).map((image, i) => (
									<div key={image.id} className="mt-4 cursor-pointer relative" onClick={() => openModalImage(i)} >
										<img src={image.url} alt="" className="object-cover h-full w-full" />
										{i === 2 && images.length > 3 && <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-60 text-3xl leading-9">
											+{images.length - 2}
										</div>}
									</div>
								))}
							</div>
							<div className={cn("pl-6 pr-8", { "pb-10": files.length })}>
								<PostFile files={files} />
							</div>
							<p>
								Buổi sáng tháng 10 sáu năm trước, người phụ trách kinh doanh thị trường phía Nam vừa bay từ Sài Gòn ra, bước vào phòng họp và chia sẻ tin đồn hãng Dell sẽ mua lại công ty chúng tôi.
							</p>
							<p>
								Đó là cuộc họp đầu tuần tại trụ sở văn phòng đại diện EMC Việt Nam, tầng 14, toà nhà IPH, đường Xuân Thuỷ, Hà Nội. Tôi lúc đó đang là trưởng nhóm tư vấn công nghệ tại Việt Nam của công ty hàng đầu thế giới về hệ thống lưu trữ này.
							</p>
							<p>
								Vị sếp lớn trấn an rằng tin đồn này có từ lâu, &quot;việc đó gần như không thể xảy ra&quot;, anh nói, &quot;cá bé không thể nuốt cá lớn được&quot;.
							</p>
							<p>
								Gọi là cá bé vì khi đó Dell là công ty tư nhân, giá trị ước tính khoảng 24 tỷ USD. Trong khi đó, EMC có vốn hoá thị trường ước tính 35 tỷ USD, chưa kể EMC còn sở hữu khoảng 80% cổ phần của Vmware, một tên tuổi về ảo hoá hạ tầng công nghệ thông tin thị giá tương đương 23 tỷ USD nữa.
							</p>
							<div className="flex justify-between text-primary-gray mt-7 px-6 text-[13px] leading-[15px]">
								<span>
									<img src={iconThumb} alt="Like" className="inline-block mr-2" />
									<button onClick={toggleModalReact}>
										28,7k
									</button>
								</span>
								<span>
									<img src={iconComment} alt="Comment" className="inline-block mr-2" />
									<Link to="/social/comments">
										21,3k
									</Link>
								</span>
								<span>
									<img src={iconEye} alt="View" className="inline-block mr-2" />
									<button onClick={toggleModalReact}>
										11,2k
									</button>
								</span>
							</div>
							<div className="border-b border-gray-300"></div>
							<div className='flex flex-col w-full max-h-full overflow-y-auto'>
								
								<ReplyCommentField attachFile inputContainerClassName="flex w-full p-2" fileContainerClassName="border-t"/>
							</div>
						</div>
						{/* Post Suggest */}
						<div className="post__suggest">
							<p>Liên quan</p>
							<div>
								<Link to="/"><div>21,3k</div></Link>
								<Link to="/">Đề xuất thanh toán hồ sơ chỉ gồm 01 bước duy nhất</Link>
								<Link to="/"><div>21,3k</div></Link>
								<Link to="/">Đề xuất thanh toán hồ sơ chỉ gồm 01 bước duy nhất</Link>
								<Link to="/"><div>21,3k</div></Link>
								<Link to="/">Đề xuất thanh toán hồ sơ chỉ gồm 01 bước duy nhất</Link>
								<Link to="/"><div>21,3k</div></Link>
								<Link to="/">Đề xuất thanh toán hồ sơ chỉ gồm 01 bước duy nhất</Link>
								<Link to="/"><div>21,3k</div></Link>
								<Link to="/">Đề xuất thanh toán hồ sơ chỉ gồm 01 bước duy nhất</Link>
								<Link to="/"><div>21,3k</div></Link>
								<Link to="/">Đề xuất thanh toán hồ sơ chỉ gồm 01 bước duy nhất</Link>
								<Link to="/"><div>21,3k</div></Link>
								<Link to="/">Đề xuất thanh toán hồ sơ chỉ gồm 01 bước duy nhất</Link>
								<Link to="/"><div>21,3k</div></Link>
								<Link to="/">Đề xuất thanh toán hồ sơ chỉ gồm 01 bước duy nhất</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ModalContainer isModalOpen={modalShowReact} toggle={() => ''}>
				<div className="inline-flex flex-col text-black my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl" style={{ width: "550px", maxHeight: "440px" }}>
					<div className="flex items-center justify-between border-b border-secondary-gray border-opacity-30 px-3">
						<div className="flex">
							<div className="flex items-center justify-center border-b-2 border-primary py-4 text-primary" style={{ minWidth: "100px" }}>
								<img src={iconThumb} alt="Like" className="inline-block" />
								<span>
									28,7k
								</span>
							</div>
						</div>
						<button className="bg-primary-gray bg-opacity-20 p-2 rounded-3xl mr-1 h-10 w-10" onClick={() => toggleModalReact()}>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
					<ul className="py-1 overflow-y-auto custom-scroll">
						{Array.from(Array(30).keys()).map(id => (
							<li key={id} className="flex justify-between pl-4 pr-2 py-2">
								<div className="flex">
									<img src="https://gamek.mediacdn.vn/133514250583805952/2021/9/17/photo-1-1631856680040545802895.jpg" alt="avatar" className="h-10 w-10 rounded-full mr-3" />
									<div>
										<p className="text-black text-[15px]">Nguyễn Văn Dương-TRX</p>
										<p className="leading-[15px] mt-1">Đã là bạn</p>
									</div>
								</div>
								<div>
									<button className="flex items-center text-black py-1.5 pl-1.5 pr-4 bg-gray-100 rounded-md">
										<img src={iconComment} alt="" className="inline-block w-6 h-6 mr-1" />
										Nhắn tin
									</button>
								</div>
							</li>
						))}
					</ul>
				</div>
			</ModalContainer>
			<ModalFullContainer isModalOpen={modalShowImage.show} toggle={closeModalImage}>
				<div className="flex overflow-hidden transition-all transform w-full h-full">
					<ViewPost show={modalShowImage.show} toggle={closeModalImage} images={images} index={modalShowImage.index} />
				</div>
			</ModalFullContainer>
		</>
	);
};

export default SocialPostPage;
