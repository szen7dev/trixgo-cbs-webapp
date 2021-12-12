import React, { FC, useEffect, useRef, useState } from 'react'

import { Dialog } from '@headlessui/react';
import { Form, Formik } from 'formik';
import { string, object } from 'yup';
import { toArray } from 'lodash';
import cn from "classnames";

import IconFile from '../components/IconFile';
import IconImage from '../components/IconImage';
import PostFile from '../components/PostFile';
import PostImage from '../components/PostImage';
import TabsClassifyArticle from './TabsClassifyArticle';
import TabsClassifyArticleCommunity from './TabsClassifyArticleCommunity';
import TabsClassifyDepartment from './TabsClassifyDepartment';
import TabsOverlay from './TabsOverlay';

import iconDown from 'assets/images/Frame 1745.png';

import { FileProps, FilePropsUpload, MediaPayload } from 'typings/social';
import fileUploadReducer, { INITIAL_STATE } from '../context/upload.reducer';
import useUpload from '../context/useUpload';
import uploadActions from '../context/upload.actions';
import { useSocial } from "services/hooks/useSocial";

type _TypeSetFieldValue = (field: string, values: File[]) => void

interface IProps {
	show: boolean
	toggle(): void
}

const ModalCreateArticle: FC<IProps> = ({ toggle, show }) => {
	const [uploads, { setUploadFile, setUploadImage, uploadImage, uploadFile, cancelUploadImage, cancelUploadFile }] = useUpload(fileUploadReducer, uploadActions, INITIAL_STATE)

	const { createPost } = useSocial();

	const [showClassifyArticle, setShowClassifyArticle] = useState(false);
	const [showClassifyDepartment, setShowClassifyDepartment] = useState(false);
	const [showClassifyArticleCommunity, setShowClassifyArticleCommunity] = useState(false);

	const refsImages = useRef<{ [key: string]: NodeJS.Timeout }>({});
	const refsFiles = useRef<{ [key: string]: NodeJS.Timeout }>({});

	useEffect(() => {
		let isMounted = false;
		const filetoUpload = toArray(uploads.files).filter(file => file.progress === 0);
		uploadFile(filetoUpload, isMounted, refsFiles.current);
		return () => { isMounted = true };
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [uploads.files])

	useEffect(() => {
		let isMounted = false;
		const imageToUpload = toArray(uploads.images).filter(file => file.progress === 0);
		uploadImage(imageToUpload, isMounted, refsImages.current);
		return () => { isMounted = true };
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [uploads.images])

	const toggleClassifyArticle = () => setShowClassifyArticle(!showClassifyArticle);
	const toggleClassifyDepartment = () => setShowClassifyDepartment(!showClassifyDepartment);
	const toggleClassifyArticleCommunity = () => setShowClassifyArticleCommunity(!showClassifyArticleCommunity);

	const initialValues: MediaPayload = {
		title: "",
		content: "",
		files: [],
		images: [],
		type: 'just-me',
	};

	const mediaSchema = object().shape({
		title: string().required("Title of post required!"),
		content: string().required("Content of post required!"),
		type: string().required("Type of post required!"),
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

	const handleSetFiles = (event: React.ChangeEvent<HTMLInputElement>, values: MediaPayload, attribute: 'files' | 'images', setFieldValue: _TypeSetFieldValue) => {
		if (attribute === 'files') setUploadFile(event.target.files);
		if (attribute === 'images') setUploadImage(event.target.files);
	}

	const handleSubmit = async (values: MediaPayload) => {
		// Handle api here!
		console.log({ values, uploads })
		await createPost(values);
		toggle();
		return [values, uploads];
	};

	const handleCancleUploadFile = (file: FileProps | FilePropsUpload) => {
		if (refsFiles.current[file.id]) clearInterval(refsFiles.current[file.id])
		cancelUploadFile(file)
	}

	const handleCancleUploadImage = (file: FileProps | FilePropsUpload) => {
		if (refsImages.current[file.id]) clearInterval(refsImages.current[file.id])
		cancelUploadImage(file)
	}

	return (
		// <div className="inline-flex flex-col text-black w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl" {...props}>
		<Formik
			initialValues={initialValues}
			validationSchema={mediaSchema}
			onSubmit={handleSubmit}
		>
			{
				formik => {
					const { setFieldValue, values } = formik;
					return (
						<Form autoComplete="off" >
							<div className="flex items-center px-6 py-2.5 justify-between border-b border-secondary-gray border-opacity-30">
								<Dialog.Title
									as="h3"
									className="text-lg leading-6 font-bold"
								>
									Bài viết mới
								</Dialog.Title>
								<button className="bg-primary-gray bg-opacity-20 p-2 rounded-3xl" onClick={() => toggle()}>
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
								<div
									className={
										cn("flex flex-wrap border custom-scroll overflow-x-hidden overflow-y-auto",
											(!Object.keys(uploads.images).length && !Object.keys(uploads.files).length) ? "h-0 border-none" : "post__files pt-2 pb-6 px-9")
									}
								>
									<PostImage
										images={toArray(uploads.images)}
										onRemove={handleCancleUploadImage}
									/>
									<PostFile
										files={toArray(uploads.files)}
										onRemove={handleCancleUploadFile}
										className="w-full mx-2.5"
									/>
								</div>
							</div>
							<div className="flex justify-between pt-5 px-6 pb-6 mb-0.5">
								<div className="flex pl-11">
									<label className="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-300 flex justify-center items-center cursor-pointer mr-4">
										<IconImage />
										<input type="file" name="files" id="file" className="hidden" accept="image/*" multiple onChange={event => handleSetFiles(event, values, 'images', setFieldValue)} />
									</label>
									<label className="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-300 flex justify-center items-center cursor-pointer">
										<IconFile />
										<input type="file" name="files" id="file" className="hidden" accept="*" multiple onChange={event => handleSetFiles(event, values, 'files', setFieldValue)} />
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
											toggleClassifyArticleCommunity();
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
		// </div>
	)
}

export default ModalCreateArticle
