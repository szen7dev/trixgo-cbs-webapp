/**
 * ? Import orders:
 * ? 1. react importation
 * ? 2. third party libraries importation
 * ? 3. libs, services, data, api importation
 * ? 4. components, assets importation
 * ? 5. helpers, util importation
 * ? 6. typings importation
 */
import { FC, useEffect, useState } from "react";
import { useSocial } from "services/hooks/useSocial";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { Formik, Form } from "formik";
import { object, string, array } from "yup";
import cn from "classnames";

import ModalContainer from "./components/ModalContainer";
import TabsClassifyArticle from "./components/TabsClassifyArticle";
import TabsClassifyArticleCommunity from "./components/TabsClassifyArticleCommunity";
import TabsClassifyDepartment from "./components/TabsClassifyDepartment";
import TabsOverlay from "./components/TabsOverlay";

import image from 'assets/images/media/hoi-thao-khoa-hoc-la-gi 1.png';
import ad from 'assets/images/media/image 175.png';
import imageV from 'assets/images/media/image 177.png';
import iconPencil from 'assets/images/icons8-pencil-100 1.png';
import iconFilter from 'assets/images/icons8-filter-96.png';
import iconDown from 'assets/images/Frame 1745.png';
import iconThumb from 'assets/images/icons8-thumbs-up-96 1.png';
import iconEye from 'assets/images/icons8-eye-96 1.png';
import iconComment from 'assets/images/icon-chat-project.png';
import './style.css';

import { ListMediasPayload, PostPayload } from "typings/social";
import PostImage from "./components/PostImage";
import PostFile from "./components/PostFile";
import IconImage from "./components/IconImage";
import IconFile from "./components/IconFile";

const pages = [
	{ id: "0", title: 'Nội bộ công ty' },
	{ id: "1", title: 'Phòng ban' },
	{ id: "2", title: 'Phòng ban' },
	{ id: "3", title: 'Phòng ban' },
]

type _TypeSetFieldValue = (field: string, values: File[]) => void;

const SocialHomePage: FC = () => {
	const { listMedias } = useSocial();
	console.log("listMedias", listMedias);

	const [isShowCreateModal, setIsShowCreateModal] = useState(false);
	const [showClassifyArticle, setShowClassifyArticle] = useState(false);
	const [showClassifyDepartment, setShowClassifyDepartment] = useState(false);
	const [showClassifyArticleCommunity, setShowClassifyArticleCommunity] = useState(false);

	const toggleCreateModal = () => setIsShowCreateModal(!isShowCreateModal);
	const toggleClassifyArticle = () => setShowClassifyArticle(!showClassifyArticle);
	const toggleClassifyDepartment = () => setShowClassifyDepartment(!showClassifyDepartment);
	const toggleClassifyArticleCommunity = () => setShowClassifyArticleCommunity(!showClassifyArticleCommunity);

	const initialValues: PostPayload = {
		title: "",
		content: "",
		files: [],
		images: [],
		type: 'just-me',
	};

	const registerSchema = object().shape({
		title: string().required("First and last name required!"),
		content: string().required("First and last name required!"),
		files: array()
			.nullable()
			.test('is-correct-file', 'VALIDATION_FIELD_FILE_BIG', () => true) // Check if file too big
			.test(
				'is-big-file',
				'VALIDATION_FIELD_FILE_WRONG_TYPE',
				() => true // Check if file invalid type
			),
		images: array()
			.nullable()
			.test('is-correct-file', 'VALIDATION_FIELD_FILE_BIG', () => true) // Check if file too big
			.test(
				'is-big-file',
				'VALIDATION_FIELD_FILE_WRONG_TYPE',
				() => true // Check if file invalid type
			),
	});

	const currentSelected = (key: string) => {
		switch (key) {
			case 'company':
				return "Thành viên trong công ty";
			case 'just-me':
				return "Chỉ mình tôi";
			case 'departments':
				return "Dự án, phòng ban";
			case 'community':
				return "Cộng đồng";
			case 'system':
				return "Hệ thống";
			default:
				return "Thành viên trong công ty";
		}
	}

	return (
		<>
			<div className="flex flex-col text-sm text-black overflow-hidden h-full">
				{/* Header */}
				<div className="px-4 flex justify-between w-full text-primary-gray bg-white border border-gray-300">
					<div className="flex flex-1 text-[14px]">
						{pages.map(page => <button key={page.id} className={cn("border-b-2 border-transparent mx-2 leading-4", { 'border-primary text-black font-bold': page.id === '0' })} style={{ minWidth: "110px" }}>
							{page.title}
						</button>)}
					</div>
					<div className="flex items-center">
						<div className="rounded-full flex my-2.5 bg-gray-100 mr-5" style={{ minWidth: "284px" }}>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-4 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
							<input className="bg-transparent focus:outline-none py-3 px-2.5 flex-1 leading-[15px]" placeholder="Tìm kiếm" />
						</div>
						<div className="w-10 h-10 rounded bg-gray-100 flex justify-center items-center">
							<img src={iconFilter} alt="icon filter" />
						</div>
					</div>
				</div>
				{/* Content */}
				<div className="custom-scroll overflow-y-auto flex-1 z-0">
					<div className="mx-auto" style={{ maxWidth: "1400px" }}>
						<div className="text-black flex flex-wrap xl:flex-nowrap mb-7">
							<div className="flex bg-secondary-gray bg-opacity-10 mt-4 mx-3.5 w-full flex-wrap lg:flex-nowrap">
								<div className="w-full">
									<img src={image} alt="" className="w-full h-full object-cover" />
								</div>
								<div className="inline-flex flex-col px-5 pt-4 pb-3 w-full lg:w-min box-content" style={{ minWidth: "287px", minHeight: "363px" }}>
									<h4 className="text-2xl leading-7 font-bold px-2.5">
										<Link to="/social/post">
											PGI Partners tổ chức buổi workshop về thanh toán các gói thầu xây lắp
										</Link>
									</h4>
									<div className="line-clamp flex-1">
										<p className="mt-5 px-2.5 flex-1 text-base">Sở Y tế Hà Nội vừa đồng ý với đề xuất của Trung tâm Kiểm soát Bệnh tật phương án rút khoảng cách giữa 2 mũi vaccine AstraZeneca về còn tối thiểu 4 tuần nhằm tăng tốc độ tiêm chủng toàn quốc.</p>
									</div>
									<p className="text-[13px] leading-[15px] px-2 border-b border-primary-gray border-opacity-20 text-secondary-gray pb-2.5 mt-3">
										Nguyễn Văn Tuấn-CBS
										<span className="h-0.5 w-0.5 bg-primary-gray rounded-md inline-block align-middle mx-2"></span>
										Phòng kế toán
										<span className="h-0.5 w-0.5 bg-primary-gray rounded-md inline-block align-middle mx-2"></span>
										6h
									</p>
									<p className="flex justify-between text-primary-gray mt-3 px-1">
										<span>
											<img src={iconThumb} alt="Like" className="inline-block mr-2" />
											28,7k
										</span>
										<span>
											<img src={iconComment} alt="Comment" className="inline-block mr-2" />
											21,3k
										</span>
										<span>
											<img src={iconEye} alt="View" className="inline-block mr-2" />
											11,2k
										</span>
									</p>
								</div>
							</div>
							<div className="social__ad hidden xl:block flex-1 mt-4 w-full lg:w-min px-3.5" style={{ minWidth: "406px" }}>
								<img src={ad} alt="" className="h-full object-cover" />
							</div>
						</div>
						<div className="border-gray-300 border-t mx-3.5"></div>
						<div className="flex flex-wrap 2xl:flex-nowrap mx-3.5 text-black">
							<div className="w-full mt-3.5">
								<span className="text-24px font-bold inline-block border-b border-primary pb-3 mt-3">Nội bộ công ty</span>
								<ul>
									<li className="border-primary-gray border-opacity-20 pt-3.5 pb-3.5 mr-7" style={{ borderBottomWidth: '0.5px' }}>
										<p className="font-bold text-lg leading-5">
											<Link to="/social/post">
												Tăng hạn sử dụng gần 3 triệu liều vaccine Pfizer lên 9 tháng
											</Link>
										</p>
										<div className="flex mt-3">
											<Link to="/social/post" className="inline-block mr-7" style={{ minWidth: "180px" }}>
												<img src={imageV} alt="vaccine" />
											</Link>
											<div className="flex flex-col">
												<p className="text-sm leading-4">Trong 13.972 ca nhiễm Bộ Y tế công bố tối 30/11 có 13.966 ca tại 62 tỉnh thành, tăng 208 ca so với hôm qua, và cao nhất kể từ khi &quot;bình thường mới&quot;; 14.624 người khỏi bệnh; 197 ca tử vong.</p>
												<p className="mt-auto text-[13px] leading-[15px] text-secondary-gray mb-1.5">
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
									<li className="border-primary-gray border-opacity-20 pt-3.5 pb-3.5 mr-7" style={{ borderBottomWidth: '0.5px' }}>
										<p className="font-bold text-lg leading-5">
											<Link to="/social/post">
												Tăng hạn sử dụng gần 3 triệu liều vaccine Pfizer lên 9 tháng
											</Link>
										</p>
										<div className="flex mt-3">
											<Link to="/social/post" className="inline-block mr-7" style={{ minWidth: "180px" }}>
												<img src={imageV} alt="vaccine" />
											</Link>
											<div className="flex flex-col">
												<p className="text-sm leading-4">Trong 13.972 ca nhiễm Bộ Y tế công bố tối 30/11 có 13.966 ca tại 62 tỉnh thành, tăng 208 ca so với hôm qua, và cao nhất kể từ khi &quot;bình thường mới&quot;; 14.624 người khỏi bệnh; 197 ca tử vong.</p>
												<p className="mt-auto text-[13px] leading-[15px] text-secondary-gray mb-1.5">
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
								<span className="text-24px font-bold inline-block border-b border-black text-primary pb-3 mt-3">Chủ đề chuyên ngành</span>
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
							<div className="flex-1 py-3.5 w-1/2 lg:w-min px-3.5" style={{ minWidth: "406px" }}>
								<span className="text-24px font-bold inline-block border-b border-primary pb-3 mt-3">Cộng đồng</span>
								<ul>
									<li className="border-primary-gray border-opacity-20 pt-5 pb-3.5" style={{ borderBottomWidth: '0.5px' }}>
										<div className='max-w-xs'>
											<Link to="/social/post" className="text-lg leading-5"><b>
												Thầy trò HLV Park luyện tập trong mưa
											</b></Link>
											<p className="mt-4 text-sm leading-[18px]">
												Một ngày trước khi sang Singapore dự AFF Cup, HLV Park Hang-seo cho các cầu thủ tập luyện bất chấp mưa to.
												<div className="inline-flex items-start align-middle ml-1.5">
													<img src={iconComment} alt="Comment" className="w-4 h-4 inline-block mr-2" />
													<span className="text-primary" style={{ fontSize: "10px", lineHeight: '11.5px' }}>
														21,3k
													</span>
												</div>
											</p>
										</div>
									</li>
									<li className="border-primary-gray border-opacity-20 pt-5 pb-3.5" style={{ borderBottomWidth: '0.5px' }}>
										<div className='max-w-xs'>
											<Link to="/social/post" className="text-lg leading-5"><b>
												Thầy trò HLV Park luyện tập trong mưa
											</b></Link>
											<p className="mt-4 text-sm leading-[18px]">
												Một ngày trước khi sang Singapore dự AFF Cup, HLV Park Hang-seo cho các cầu thủ tập luyện bất chấp mưa to.
												<div className="inline-flex items-start align-middle ml-1.5">
													<img src={iconComment} alt="Comment" className="w-4 h-4 inline-block mr-2" />
													<span className="text-primary" style={{ fontSize: "10px", lineHeight: '11.5px' }}>
														21,3k
													</span>
												</div>
											</p>
										</div>
									</li>
									<li className="border-primary-gray border-opacity-20 pt-5 pb-3.5" style={{ borderBottomWidth: '0.5px' }}>
										<div className='max-w-xs'>
											<Link to="/social/post" className="text-lg leading-5"><b>
												Thầy trò HLV Park luyện tập trong mưa
											</b></Link>
											<p className="mt-4 text-sm leading-[18px]">
												Một ngày trước khi sang Singapore dự AFF Cup, HLV Park Hang-seo cho các cầu thủ tập luyện bất chấp mưa to.
												<div className="inline-flex items-start align-middle ml-1.5">
													<img src={iconComment} alt="Comment" className="w-4 h-4 inline-block mr-2" />
													<span className="text-primary" style={{ fontSize: "10px", lineHeight: '11.5px' }}>
														21,3k
													</span>
												</div>
											</p>
										</div>
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
			<ModalContainer isModalOpen={isShowCreateModal} toggle={() => ''}>
				<div className="inline-flex flex-col text-black w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl">
					<Formik
						initialValues={initialValues}
						validationSchema={registerSchema}
						onSubmit={(_values) => { return }}
					>
						{
							formik => {
								const { setFieldValue, values } = formik;
								const handlePopItem = (items: File[], field: string, index: number, _setFieldValue: _TypeSetFieldValue) => {
									const newImages = [...items];
									newImages.splice(index, 1);
									_setFieldValue(field, newImages)
								}
								return (
									<Form autoComplete="off" >
										<div className="flex items-center px-6 py-2.5 justify-between border-b border-secondary-gray border-opacity-30">
											<Dialog.Title
												as="h3"
												className="text-lg leading-6 font-bold"
											>
												Bài viết mới
											</Dialog.Title>
											<button className="bg-primary-gray bg-opacity-20 p-2 rounded-3xl" onClick={() => toggleCreateModal()}>
												<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
												</svg>
											</button>
										</div>
										<div className="px-6 mt-3">
											<button type="button" onClick={toggleClassifyArticle} className="btn__select w-56 flex justify-between items-center">
												<span>
													{currentSelected(values.type)}
												</span>
												<img src={iconDown} alt="icon down" className="inline-block" />
											</button>
										</div>
										<div className="px-6 mt-2 pt-3.5 flex-1">
											<input type="text" placeholder="Tiêu đề bài viết" className="post__title focus:outline-none w-full" {...formik.getFieldProps('title')} />
											<textarea
												rows={5}
												placeholder="Biên soạn nội dung"
												className="w-full border-t border-secondary focus:outline-none resize-none mt-3.5 pt-3.5 text-lg leading-5"
												{...formik.getFieldProps('content')}
											></textarea>
											<div className={cn("flex flex-wrap border custom-scroll overflow-x-hidden overflow-y-auto", (!values.images.length && !values.files.length) ? "h-0 border-none" : "post__files pt-2 pb-6 px-9")}>
												<PostImage
													images={values.images}
													onRemove={(index: number) => { handlePopItem(values.images, 'images', index, setFieldValue) }}
												/>
												<PostFile
													files={values.files}
													onRemove={(index: number) => { handlePopItem(values.files, 'files', index, setFieldValue) }}
													className="w-full mx-2.5"
												/>
											</div>
										</div>
										<div className="flex justify-between pt-5 px-6 pb-6 mb-0.5">
											<div className="flex pl-11">
												<label className="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-300 flex justify-center items-center cursor-pointer mr-4">
													<IconImage />
													<input type="file" name="files" id="file" className="hidden" accept="image/*" multiple onChange={event => {
														const files: Array<File> = [];
														for (const key in event.target.files) {
															if (isNaN(Number(key))) continue;
															files.push(event.target.files[Number(key)]);
														}
														setFieldValue('images', values.images.concat(files))
													}} />
												</label>
												<label className="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-300 flex justify-center items-center cursor-pointer">
													<IconFile />
													<input type="file" name="files" id="file" className="hidden" accept="*" multiple onChange={event => {
														const files: Array<File> = [];
														for (const key in event.target.files) {
															if (isNaN(Number(key))) continue;
															files.push(event.target.files[Number(key)]);
														}
														setFieldValue('files', values.files.concat(files))
													}} />
												</label>
											</div>
											<div>
												<button type="submit" className="px-7 py-3.5 rounded-md bg-primary text-white font-bold text-sm leading-4">Xác nhận</button>
											</div>
										</div>
										<TabsOverlay show={showClassifyArticle} />
										<TabsClassifyArticle
											show={showClassifyArticle}
											toggle={toggleClassifyArticle}
											showMore={(type: string) => {
												switch (type) {
													case 'community':
														toggleClassifyArticleCommunity()
														break;
													default:
														toggleClassifyDepartment();
														break;
												}
											}}
										/>
										<TabsClassifyDepartment
											show={showClassifyDepartment}
											toggle={toggleClassifyDepartment}
											afterEnter={() => {
												toggleClassifyArticle()
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
			</ModalContainer>
		</>
	);
};

export default SocialHomePage;
