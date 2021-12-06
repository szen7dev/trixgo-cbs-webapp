/**
 * ? Import orders:
 * ? 1. react importation
 * ? 2. third party libraries importation
 * ? 3. libs, services, data, api importation
 * ? 4. components, assets importation
 * ? 5. helpers, util importation
 * ? 6. typings importation
 */
import { FC, useState } from "react";

import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string, array } from "yup";
import cn from "classnames";

import ModalCreatePost from "./components/ModalCreatePost";
import TabsClassifyArticle from "./components/TabsClassifyArticle";
import TabsClassifyArticleCommunity from "./components/TabsClassifyArticleCommunity";
import TabsOverlay from "./components/TabsOverlay";

import image from 'assets/images/media/hoi-thao-khoa-hoc-la-gi 1.png';
import ad from 'assets/images/media/image 175.png';
import imageV from 'assets/images/media/image 177.png';
import iconPencil from 'assets/images/icons8-pencil-100 1.png';
import './style.css';

import { PostPayload } from "typings/social";

const pages = [
	{ id: "0", title: 'Nội bộ công ty' },
	{ id: "1", title: 'Phòng ban' },
	{ id: "2", title: 'Phòng ban' },
	{ id: "3", title: 'Phòng ban' },
]

const SocialHomePage: FC = () => {
	/**
	 * ? Define orders:
	 * ? 1. redux definition
	 * ? 2. react definition
	 * ? 3. third party libraries definition
	 * ? 4. libs, services, data definition
	 * ? 5. helpers, util definition
	 * ? 6. local definition
	 */
	const [isShowCreateModal, setIsShowCreateModal] = useState(false);
	const [showClassifyArticle, setShowClassifyArticle] = useState(false);
	const [showClassifyArticleCommunity, setShowClassifyArticleCommunity] = useState(false);

	const toggleCreateModal = () => setIsShowCreateModal(!isShowCreateModal);
	const toggleClassifyArticle = () => setShowClassifyArticle(!showClassifyArticle);
	const toggleClassifyArticleCommunity = () => setShowClassifyArticleCommunity(!showClassifyArticleCommunity);

	const initialValues: PostPayload = {
		title: "",
		content: "",
		files: [],
		type: "",
	};

	const registerSchema = object().shape({
		title: string().required("First and last name required!"),
		content: string().required("First and last name required!"),
		files: array()
			.nullable()
			.required('VALIDATION_FIELD_REQUIRED')
			.test('is-correct-file', 'VALIDATION_FIELD_FILE_BIG', () => true) // Check if file too big
			.test(
				'is-big-file',
				'VALIDATION_FIELD_FILE_WRONG_TYPE',
				() => false // Check if file invalid type
			),
		type: string().required("First and last name required!"),
	});

	return (
		/**
		 * ? Props and attribute orders
		 * ? 1. key
		 * ? 2. type
		 * ? 3. value
		 * ? 4. props
		 * ? 5. className
		 * ? 6. styles
		 * ? 7. events handle
		 */
		<>
			<div className="flex flex-col text-sm text-black overflow-hidden h-full">
				{/* Header */}
				<div className="px-4 flex justify-between w-full bg-white border border-primary-gray border-opacity-25">
					<div className="flex flex-1">
						{pages.map(page => <button key={page.id} className={cn("border-b-2 border-transparent mx-2", { 'border-primary font-bold': page.id === '0' })} style={{ minWidth: "110px" }}>
							{page.title}
						</button>)}
					</div>
					<div className="rounded-full flex my-2.5 bg-secondary-gray bg-opacity-10">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-4 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
						<input className="bg-transparent focus:outline-none py-3 px-2.5 flex-1" placeholder="Tìm kiếm" />
					</div>
				</div>
				{/* Content */}
				<div className="custom-scroll overflow-y-auto flex-1 z-0">
					<div className="text-black mx-auto" style={{ maxWidth: "1400px" }}>
						<div className="text-black flex flex-wrap xl:flex-nowrap mb-7">
							<div className="flex bg-secondary-gray bg-opacity-10 mt-4 mx-3.5 w-full flex-wrap lg:flex-nowrap">
								<div className="w-full">
									<img src={image} alt="" className="w-full h-full object-cover" />
								</div>
								<div className="inline-flex flex-col px-5 py-4 w-full lg:w-min box-content" style={{ minWidth: "287px" }}>
									<h4 className="text-24px font-bold px-2.5">
										PGI Partners tổ chức buổi workshop về thanh toán các gói thầu xây lắp
									</h4>
									<div className="line-clamp">
										<p className="mt-5 px-2.5 flex-1">Sở Y tế Hà Nội vừa đồng ý với đề xuất của Trung tâm Kiểm soát Bệnh tật phương án rút khoảng cách giữa 2 mũi vaccine AstraZeneca về còn tối thiểu 4 tuần nhằm tăng tốc độ tiêm chủng toàn quốc.</p>
									</div>
									<p className="text-xs border-b border-primary-gray border-opacity-20 text-secondary-gray pb-3 mt-3">
										Nguyễn Văn Tuấn-CBS
										<span className="h-0.5 w-0.5 bg-primary-gray rounded-md inline-block align-middle mx-2"></span>
										Phòng kế toán
										<span className="h-0.5 w-0.5 bg-primary-gray rounded-md inline-block align-middle mx-2"></span>
										6h
									</p>
								</div>
							</div>
							<div className="hidden xl:block flex-1 mt-4 w-full lg:w-min px-3.5" style={{ minWidth: "30%" }}>
								<img src={ad} alt="" />
							</div>
						</div>
						<div className="flex flex-wrap 2xl:flex-nowrap mx-3.5 border-t">
							<div className="w-full mt-3.5">
								<span className="text-24px inline-block border-b border-secondary pb-3 mt-3.5">Nội bộ công ty</span>
								<ul>
									<li className="border-primary-gray border-opacity-20 pt-5 pb-3.5" style={{ borderBottomWidth: '0.5px' }}>
										<p>Tăng hạn sử dụng gần 3 triệu liều vaccine Pfizer lên 9 tháng</p>
										<div className="flex">
											<img src={imageV} alt="vaccine" className="inline-block mr-7 object-cover" style={{ width: "180px" }} />
											<div className="flex flex-col">
												<p>Trong 13.972 ca nhiễm Bộ Y tế công bố tối 30/11 có 13.966 ca tại 62 tỉnh thành, tăng 208 ca so với hôm qua, và cao nhất kể từ khi &quot;bình thường mới&quot;; 14.624 người khỏi bệnh; 197 ca tử vong.</p>
												<p className="mt-auto">
													<Link to="/">
														Nguyễn Văn Tuấn-CBS
													</Link>
													<span className="h-0.5 w-0.5 bg-primary-gray rounded-md inline-block align-middle mx-2"></span>
													<Link to="/">
														Phòng kế toán
													</Link>
													<span className="h-0.5 w-0.5 bg-primary-gray rounded-md inline-block align-middle mx-2"></span>
													6h
												</p>
											</div>
										</div>
									</li>
									<li className="border-primary-gray border-opacity-20 pt-5 pb-3.5" style={{ borderBottomWidth: '0.5px' }}>
										<p>Tăng hạn sử dụng gần 3 triệu liều vaccine Pfizer lên 9 tháng</p>
										<div className="flex">
											<img src={imageV} alt="vaccine" className="inline-block mr-7" style={{ width: "180px" }} />
											<div className="flex flex-col">
												<p>Trong 13.972 ca nhiễm Bộ Y tế công bố tối 30/11 có 13.966 ca tại 62 tỉnh thành, tăng 208 ca so với hôm qua, và cao nhất kể từ khi &quot;bình thường mới&quot;; 14.624 người khỏi bệnh; 197 ca tử vong.</p>
												<p className="mt-auto">
													<Link to="/">
														Nguyễn Văn Tuấn-CBS
													</Link>
													<span className="h-0.5 w-0.5 bg-primary-gray rounded-md inline-block align-middle mx-2"></span>
													<Link to="/">
														Phòng kế toán
													</Link>
													<span className="h-0.5 w-0.5 bg-primary-gray rounded-md inline-block align-middle mx-2"></span>
													6h
												</p>
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div className="w-1/2 2xl:w-min px-5 mt-3.5 box-content" style={{ minWidth: "287px" }}>
								<span className="text-24px inline-block border-b border-secondary pb-3 mt-3.5">Chủ đề chuyên ngành</span>
								<ul>
									<li className="mt-4 5 mb-1">
										<Link to="/">Quản lý dự án</Link>
									</li>
									<li className="mt-4 5 mb-1">
										<Link to="/">Quản lý thanh toán</Link>
									</li>
									<li className="mt-4 5 mb-1">
										<Link to="/">Hồ sơ thanh quyết toán</Link>
									</li>
									<li className="mt-4 5 mb-1">
										<Link to="/">Quản lý dự án</Link>
									</li>
									<li className="mt-4 5 mb-1">
										<Link to="/">Quản lý thanh toán</Link>
									</li>
									<li className="mt-4 5 mb-1">
										<Link to="/">Hồ sơ thanh quyết toán</Link>
									</li>
								</ul>
							</div>
							<div className="flex-1 py-3.5 w-1/2 lg:w-min px-3.5" style={{ minWidth: "30%" }}>
								<span className="text-24px inline-block border-b border-secondary pb-3 mt-3.5">Cộng đồng</span>
								<ul>
									<li className="border-primary-gray border-opacity-20 pt-5 pb-3.5" style={{ borderBottomWidth: '0.5px' }}>
										<Link to="/" className="hover:text-dark"><b>
											Thầy trò HLV Park luyện tập trong mưa
										</b></Link>
										<p className="mt-4">
											Một ngày trước khi sang Singapore dự AFF Cup, HLV Park Hang-seo cho các cầu thủ tập luyện bất chấp mưa to.
										</p>
									</li>
									<li className="border-primary-gray border-opacity-20 pt-5 pb-3.5" style={{ borderBottomWidth: '0.5px' }}>
										<Link to="/" className="hover:text-dark"><b>
											Thầy trò HLV Park luyện tập trong mưa
										</b></Link>
										<p className="mt-4">
											Một ngày trước khi sang Singapore dự AFF Cup, HLV Park Hang-seo cho các cầu thủ tập luyện bất chấp mưa to.
										</p>
									</li>
									<li className="border-primary-gray border-opacity-20 pt-5 pb-3.5" style={{ borderBottomWidth: '0.5px' }}>
										<Link to="/" className="hover:text-dark"><b>
											Thầy trò HLV Park luyện tập trong mưa
										</b></Link>
										<p className="mt-4">
											Một ngày trước khi sang Singapore dự AFF Cup, HLV Park Hang-seo cho các cầu thủ tập luyện bất chấp mưa to.
										</p>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<button className="button-newpost flex" onClick={() => toggleCreateModal()}>
						<img src={iconPencil} alt="icon pencil" />
					</button>
				</div>
			</div>
			<ModalCreatePost isModalOpen={isShowCreateModal} toggle={() => ''}>
				<div className="inline-flex flex-col w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl">
					<Formik
						initialValues={initialValues}
						validationSchema={registerSchema}
						onSubmit={(values) => console.log(values)}
					>
						{
							formik => {
								const { errors } = formik;
								return (
									<Form >
										<div className="flex items-center px-6 py-2.5 justify-between border-b border-secondary-gray border-opacity-30">
											<Dialog.Title
												as="h3"
												className="text-lg leading-6 text-accent-gray font-bold"
											>
												Bài viết mới
											</Dialog.Title>
											<button className="bg-primary-gray bg-opacity-20 p-2 rounded-3xl" onClick={() => toggleCreateModal()}>
												<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
												</svg>
											</button>
										</div>
										<div className="px-6">
											<button type="button" onClick={toggleClassifyArticle}>Chỉ mình tôi</button>
										</div>
										<div className="px-6 mt-2 pt-3.5 flex-1">
											<input type="text" placeholder="Tiêu đề bài viết" className="focus:outline-none" {...formik.getFieldProps('title')} />
											<textarea
												rows={10}
												placeholder="Biên soạn nội dung"
												className="w-full border-t border-secondary focus:outline-none resize-none mt-3.5"
												{...formik.getFieldProps('content')}
											></textarea>
											<p className="px-6 text-sm text-primary-gray">
												Your payment has been successfully submitted. We’ve sent your
												an email with all of the details of your order.
											</p>
										</div>
										<div className="flex justify-between pt-5 px-6 pb-6 mb-0.5">
											<div></div>
											<div>
												<button type="submit" className="px-7 py-3.5 rounded-md bg-primary text-primary-light">Xác nhận</button>
											</div>
										</div>
										<TabsOverlay show={showClassifyArticle} />
										<TabsClassifyArticle
											show={showClassifyArticle}
											toggle={toggleClassifyArticle}
											showMore={() => {
												toggleClassifyArticleCommunity()
											}}
										/>
										<TabsClassifyArticleCommunity
											show={showClassifyArticleCommunity}
											toggle={toggleClassifyArticleCommunity}
											afterEnter={() => {
												toggleClassifyArticle()
											}}
										/>
									</Form>
								)
							}
						}
					</Formik>
				</div>
			</ModalCreatePost>
		</>
	);
};

/**
 * ? Export rules:
 * ? export default must be capital syntax
 * ? export const must be camel case syntax
 */
export default SocialHomePage;
