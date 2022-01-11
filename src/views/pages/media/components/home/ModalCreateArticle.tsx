import React, { FC, useState } from 'react';

/**
 * LIBRARIES
 */
import { Dialog } from '@headlessui/react';
import { Form, Formik, ErrorMessage } from 'formik';
import { string, object } from 'yup';
import { toArray } from 'lodash';
import cn from "classnames";

/**
 * ASSETS, COMPONENTS
 */
import IconFile from '../Icon/IconFile';
import IconImage from '../Icon/IconImage';
import PostFile from '../post/PostFile';
import PostImage from '../post/PostImage';
import TabsClassifyArticle from './TabsClassifyArticle';
import TabsClassifyArticleCommunity from './TabsClassifyArticleCommunity';
import TabsClassifyDepartment from './TabsClassifyDepartment';
import TabsOverlay from './TabsOverlay';
import ChevronDownIcon from 'assets/icons/ChevronDown';
import iconDown from 'assets/images/Frame 1745.png';

/**
 * CONTEXTS
 */
import fileUploadReducer, { INITIAL_STATE } from '../../context/upload.reducer';
import useCustomReducer from '../../context/useCustomReducer';
import uploadActions from '../../context/upload.actions';
import { IMethodFiles, IMethodImages } from '../../context/upload';
import { modifyUploadedFiles, modifyUploadedFilesV2 } from '../../context/upload.utils';

/**
 * Types, Services
 */
import { FileProps, FilePropsUpload, ModalProps, MediaPayload } from 'typings/social';
import { useAuth } from 'services/hooks/useAuth';
import { useSocial } from 'services/hooks/useSocial';
import { useUpload } from 'services/hooks/useUpload';
import { typeTextSelected } from '../../utils';

const ModalCreateArticle: FC<ModalProps> = ({ toggle, modalType, files, images, initialValues = {
	mediaID: "",
	title: "",
	content: "",
	type: 'just-me',
} }) => {

	const [uploads,
		{
			setUploadImageProgress,
			setUploadFileProgress,
			setIDImageUploaded,
			setIDFileUploaded,
			setUploadImage,
			setUploadFile,
			removeUploadedImage,
			removeUploadedFile,
		}] = useCustomReducer<IMethodFiles & IMethodImages>(fileUploadReducer, uploadActions, modifyUploadedFiles(INITIAL_STATE, files, images))

	const { user } = useAuth();
	const { refetchListMedias: refetchListMediasCompany } = useSocial('list_media__company', {
		type: 'company',
		companyID: user?.company._id
	});
	const { refetchListMedias: refetchListMediasDepartment } = useSocial('list_media__department', {
		type: 'department',
		companyID: user?.company._id
	});
	const { refetchListMedias: refetchListMediasDigitalConversion } = useSocial('list_media__digital-conversion', { 
		type: 'digital-conversion'
	});

	const { createMedia, updateMedia } = useSocial();
	const { addFileToUpload } = useUpload('MEDIA');

	const [showClassifyArticle, setShowClassifyArticle] = useState(false);
	const [showClassifyDepartment, setShowClassifyDepartment] = useState(false);
	const [showClassifyArticleCommunity, setShowClassifyArticleCommunity] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	const toggleClassifyArticle = () => setShowClassifyArticle(!showClassifyArticle);
	const toggleClassifyDepartment = () => setShowClassifyDepartment(!showClassifyDepartment);
	const toggleClassifyArticleCommunity = () => setShowClassifyArticleCommunity(!showClassifyArticleCommunity);

	const mediaSchema = object().shape({
		title: string().required("Bạn cần nhập tiêu đề cho bài viết"),
		content: string().required("Bạn cần nhập nội dung cho bài viết"),
		type: string().required("Loại bài viết không hợp lệ"),
	});

	const handleSetFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files || !event.target.files.length) return;

		// Modify file to with key with each file;
		const [files, images] = modifyUploadedFilesV2({
			imgLastKey: Object.keys(uploads.images).length || null,
			fileLastKey: Object.keys(uploads.files).length || null,
		}, event.target.files);

		setUploadImage(images);
		setUploadFile(files);

		// Upload images
		for (const [key, { file }] of Object.entries(images)) {
			const { _id } = await addFileToUpload({
				files: file,
				progress: percentCompleted => {
					console.log(`${percentCompleted}%`, key);
					setUploadImageProgress(key, percentCompleted)
				},
				// compressConfig: {
				// 	useCompress: false
				// }
			})
			setIDImageUploaded(key, _id);
		}

		// Upload files
		for (const [key, { file }] of Object.entries(files)) {
			const { _id } = await addFileToUpload({
				files: file,
				progress: percentCompleted => {
					console.log(`${percentCompleted}%`, key);
					setUploadFileProgress(key, percentCompleted)
				}
			})
			setIDFileUploaded(key, _id);
		}
	}

	// Xử lý hứng giá trị các biến từ Client truyền lên sau khi Submit
	const handleSubmit = async (values: MediaPayload) => {
		values.images = [];
		values.files = [];

		// Get list file uploaded
		for (const [, { _id }] of Object.entries(uploads.images)) {
			_id && (values.images = [...values.images || [], _id]);
		}

		for (const [, { _id }] of Object.entries(uploads.files)) {
			_id && (values.files = [...values.files || [], _id]);
		}

		// Handle api here!
		switch (modalType) {
			case 'create':
				values.companyID = user?.company?._id;
				values.departmentID = user?.department?._id;

				// Tạo bài viết
				await createMedia(values);
				break;
			case 'update':
				values.mediaID = initialValues.mediaID;

				// Cập nhật bài viết
				await updateMedia(values);
				break;
			default:
				break;
		}

		// Refetch list media
		switch (values.type) {
			case 'company':
				refetchListMediasCompany();
				break;
			case 'department':
				refetchListMediasDepartment();
				break;
			case 'digital-conversion':
				refetchListMediasDigitalConversion();
				break;
			default:
				break;
		}

		toggle();
		return [values, uploads];
	};

	const handleRemoveUpload = (file: FileProps | FilePropsUpload, type: 'FILE' | 'IMAGE') => {
		if ('id' in file) {
			type === 'IMAGE' ? removeUploadedImage(file.id) : removeUploadedFile(file.id);
		} else {
			type === 'IMAGE' ? removeUploadedImage(file._id) : removeUploadedFile(file._id);
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={mediaSchema}
			onSubmit={handleSubmit}
		>
			{
				formik => {
					const { values } = formik;
					return (
						<Form autoComplete="off">
							<div className="flex items-center px-6 py-2.5 justify-between border-b border-secondary-gray border-opacity-30">
								<Dialog.Title
									as="h3"
									className="text-lg leading-6 font-bold"
								>
									{initialValues.mediaID ? 'Cập nhật bài viết' : 'Bài viết mới'}
								</Dialog.Title>
								<button className="bg-primary-gray bg-opacity-20 p-2 rounded-3xl" type="button" onClick={() => toggle()}>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
							<div className="px-6 mt-3">
								<button type="button" onClick={toggleClassifyArticle} className="btn__select w-56 flex justify-between items-center">
									<span>
										{typeTextSelected(values.type)}
									</span>
									<img src={iconDown} alt="icon down" className="inline-block" />
								</button>
							</div>
							<div className="px-6 mt-2 pt-3.5 flex-1 md:h-[568px] flex flex-col">
								<input type="text" placeholder="Tiêu đề bài viết" className="post__title focus:outline-none w-full" {...formik.getFieldProps('title')} />
								<ErrorMessage
									name="title"
									component="span"
									className="font-normal text-sm text-negative italic"
								/>
								<textarea
									rows={5}
									placeholder="Biên soạn nội dung"
									className="w-full border-t border-secondary focus:outline-none resize-none mt-3.5 pt-3.5 text-lg leading-5 flex-grow"
									{...formik.getFieldProps('content')}
								></textarea>
								<ErrorMessage
									name="content"
									component="span"
									className="font-normal text-sm text-negative italic"
								/>
								<div
									className={
										cn("flex flex-wrap border custom-scroll overflow-x-hidden relative rounded-md",
											(!Object.keys(uploads.images).length && !Object.keys(uploads.files).length) ? "h-0 border-none" : "post__files pt-4 pb-4 px-9",
											collapsed ? 'overflow-y-hidden max-h-0' : 'overflow-y-auto'
										)
									}
								>
									<div className='flex text-black sticky top-0 h-0 w-full justify-between items-center'>
										<div className={cn('text-large', { 'opacity-0': !collapsed })}>
											File/ảnh đính kèm
										</div>
										<button
											type='button'
											className='h-6 w-6 -mr-4 text-center rounded-md bg-cbs-left-menu'
											onClick={() => setCollapsed(!collapsed)}
										>
											<ChevronDownIcon className={cn('h-4 w-4 text-cbs-subtext inline transition-transform', { 'transform rotate-180': collapsed })} />
										</button>
									</div>
									<PostImage
										images={toArray(uploads.images)}
										onRemove={handleRemoveUpload}
										className={cn("post__files-row pt-2 pb-3 text-black gap-9 flex-wrap transition-opacity", { 'opacity-0': collapsed })}
									/>
									<PostFile
										files={toArray(uploads.files)}
										onRemove={handleRemoveUpload}
										className={cn("w-full mx-2.5 text-black transition-opacity", { 'opacity-0': collapsed })}
									/>
								</div>
							</div>
							<div className="flex justify-between pt-5 px-6 pb-6 mb-0.5">
								<div className="flex pl-11">
									<label className="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-300 flex justify-center items-center cursor-pointer mr-4">
										<IconImage />
										<input type="file" name="files" id="file" className="hidden" accept="image/*" multiple onChange={event => handleSetFiles(event)} />
									</label>
									<label className="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-300 flex justify-center items-center cursor-pointer">
										<IconFile />
										<input type="file" name="files" id="file" className="hidden" accept="*" multiple onChange={event => handleSetFiles(event)} />
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
	)
}

export default ModalCreateArticle