/**
 * Libraries
 */
import React, { FC, Fragment, useContext, useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import moment from 'moment';
import cn from 'classnames';

/**
 * Components
 */
// import ModalFullContainer from "../components/ModalFullContainer";
// import ViewPost from "../components/post/ViewPost";
import { ModalContainer, Loader } from "shareComponents/common";
import { PostFile } from 'views/media/shareComponents/common';
import { ReplyCommentField, RootCommentsList } from 'views/media/shareComponents/common/Comment';
import { ModalCreateArticle, ModalListUser } from 'views/media/shareComponents/common/Modal';

/**
 * Assets
 */
import avatar from 'assets/images/avatar.jpg';
import iconThumb from 'assets/images/icons8-thumbs-up-96 1.png';
import iconTrash from 'assets/images/icons8-remove.svg';
import iconPencil from 'assets/images/icons8-pencil.svg';
import iconEye from 'assets/images/icons8-eye-96 1.png';
import iconCopy from 'assets/images/icons8-copy-96.png';
// import iconPrint from 'assets/images/icons8-print-96.png';
import iconComment from 'assets/images/icon-chat-project.png';
import 'views/media/styles/index.css';

/**
 * Types, Services, Utils
 */
import { FileProps, ListMediasPayload, MediaProps } from "typings/media";
import MediaRepository from "apis/media";
import { typePostSelected } from 'views/media/utils';
import { abbreviateNumber, nl2p } from 'utils';
import { useAuth } from 'services/hooks/useAuth';
import { useMedia, useCommentMedia } from 'services/hooks/useMedia';
import { ModalZoomView } from "shareComponents/common/ZoomView";
import { ContextModalPost } from "views/media/contexts/post";

export const MediaDetailPage: FC = () => {
	const history = useHistory();
	const { state, toggleModal, openPost } = useContext(ContextModalPost);

	const { mediaID } = useParams<{ mediaID: string }>();
	const { user } = useAuth();
	const { data, refetch } = useQuery(`media_info.${mediaID}`,
		() => MediaRepository.mediaInfo(mediaID),
		{
			enabled: true,
			refetchOnWindowFocus: false
		});

	const media = data?.data;

	const [paramsMedia, setParamsMedia] = useState<ListMediasPayload>({
		type: typePostSelected(media?.type || 0),
		mediaID,
		isRelated: true
	});

	const [isFetchReactions, setIsFetchReactions] = useState(false);
	const [isFetchSeens, setIsFetchSeens] = useState(false);

	useEffect(() => {
		if (paramsMedia.type === 'company') {
			setParamsMedia(previousParams => ({
				...previousParams,
				companyID: user?.company._id
			}))
		}
	}, [user])
	
	const { deleteMediaAsync, reactionMediaAsync, listMedias: listMediasRelated } = 
		useMedia({
			key: `list_medias__related`,
			params: paramsMedia,
			isFetchMedias: true
		});

	const { listReactions, listSeens, totalRecordSeen, refetchListReactions } =
		useMedia({
			key: mediaID,
			params: { mediaID },
			isFetchReactions,
			isFetchSeens
		});

	const { listComments, totalRecord, limit } =
		useCommentMedia({
			key: `list_comments.${mediaID}`,
			params: { mediaID },
			isFetchComment: true
		});

	const [modalEditMedia, setModalEditMedia] = useState<boolean>(false);
	const [modalShowReact, setModalShowReact] = useState<boolean>(false);
	const [modalShowSeen, setModalShowSeen] = useState<boolean>(false);
	const [msUpdateView, setMsUpdateView] = useState<number>(0);

	const toggleModalEditMedia = () => {
		modalEditMedia && refetch();
		setModalEditMedia(!modalEditMedia);
	};
	const toggleModalEditMediaEdit = () => setModalEditMedia(!modalEditMedia);

	const toggleModalReact = () => {
		!isFetchReactions && setIsFetchReactions(true);
		setModalShowReact(!modalShowReact);
	}

	const toggleModalSeen = () => {
		!isFetchSeens && setIsFetchSeens(true);
		setModalShowSeen(!modalShowSeen);
	}

	const handleDeleteMedia = async () => {
		try {
			const { error, data } = await deleteMediaAsync(mediaID);
			if (error) return toast.warning(data.message);

			toast.success('Xóa bài viết thành công', { autoClose: 900 });
			setTimeout(() => history.push('/media/home'), 1000);
		} catch (error) {
			if (typeof error === "string") {
				toast.error(error);
			} else if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	}

	const handleReactionMedia = async () => {
		try {
			await reactionMediaAsync({ mediaID });
			refetch();
			refetchListReactions();
		} catch (error: unknown) {
			if (typeof error === "string") {
				toast.error(error);
			} else if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	}

	const readingTime = () => {
		const text = media?.content;
		const wpm = 200;
		const words = text?.trim()?.split(/\s+/).length || 0;
		const time = Math.ceil(words / wpm);
		const ms = time * 60000;
		setMsUpdateView(ms);
	}

	// Update view and user seen for media
	useEffect(() => {
		if (msUpdateView <= 0) return;

		const timeout: NodeJS.Timeout = setTimeout(async () => {
			await MediaRepository.updateViewMedia(mediaID);
		}, msUpdateView);

		return () => { clearTimeout(timeout) }
	}, [msUpdateView])

	useEffect(() => {
		readingTime();
	}, [media?.content])

	if (!media) {
		return <Loader className="border-primary" />;
	}

	const initialState = {
		mediaID,
		title: media.title,
		content: media.content,
		type: typePostSelected(media.type),
	}
	const images: FileProps[] = media.images || [];
	const files: FileProps[] = media.files || [];

	return (
		<>
			<div className="page__post text-sm custom-scroll">
				<div className="page__post-container">
					{/* Header */}
					<div className="page__post-header text-black">
						<div className="flex justify-between">
							<h1 className="page__post-title mr-6">
								{media.title}
							</h1>
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
									<Menu.Items className="z-10 absolute right-0 mt-2 text-right origin-top-right border border-gray-300 bg-white divide-y divide-gray-100 rounded-md whitespace-nowrap" style={{ width: "264px" }}>
										{/* <Menu.Item>
											<button className="block px-8 py-2 hover:bg-gray-200 w-full text-left">
												<img src={iconPrint} alt="Icon Edit" className="inline-block mr-6" />
												In ấn
											</button>
										</Menu.Item> */}
										<Menu.Item>
											<button className="block px-8 py-2 hover:bg-gray-200 w-full text-left" onClick={() => {
												navigator.clipboard.writeText(window.location.href);
												toast.success('Copy link bài viết thành công', { autoClose: 2000 })
											}}>
												<img src={iconCopy} alt="Icon Edit" className="inline-block mr-6" />
												Copy link
											</button>
										</Menu.Item>
										{user?._id === media.author._id ? (
											<>
												<Menu.Item onClick={toggleModalEditMediaEdit}>
													<button className="block px-8 py-2 hover:bg-gray-200 w-full text-left">
														<img src={iconPencil} alt="Icon Edit" className="inline-block mr-6" />
														Cập nhật
													</button>
												</Menu.Item>
												<Menu.Item onClick={handleDeleteMedia}>
													<button className="block px-8 py-2 hover:bg-gray-200 w-full text-left">
														<img src={iconTrash} alt="Icon trash" className="inline-block mr-6" />
														Xóa
													</button>
												</Menu.Item>
											</>
										) : ''}
									</Menu.Items>
								</Transition>
							</Menu>
						</div>
						<div className="flex justify-between items-center mt-4">
							<div className="post__author">
								<div className="post__author-avt">
									<Link to="/">
										<img src={media.author?.image ? `${process.env.REACT_APP_URL_S3_USER}/${media.author?.image}` : avatar} alt="" className="object-cover" />
									</Link>
								</div>
								<div className="post__author-info">
									<p className="text-lg leading-5 font-bold">
										<Link to="/">
											{media.author?.bizfullname}
										</Link>
									</p>
									<p className="text-primary-gray text-base leading-[18px] mt-1.5">
										<Link to="/">
											{media.author?.department?.name}
										</Link>
										<span className="mx-2">•</span>
										<Link to="/">
											{media.author?.position?.name}
										</Link>
									</p>
								</div>
							</div>
							<div className=" text-primary-gray">
								<span className="mr-6">{moment(media.createAt).format('DD/MM/YYYY HH:mm')}</span>
								{/* <button className="post__follow">Theo dõi</button> */}
							</div>
						</div>
					</div>
					{/* Content */}
					<div className="flex px-1 text-black gap-x-6">
						{/* Main post */}
						<div className="post__content pb-2.5 flex-grow" >
							<div className="post__content-images">
								{images.length ? images.slice(0, 3).map((image, i) => {
									const id = image.file ? image.file._id : image._id;
									const name = image.file ? image.file.nameOrg : image.nameOrg;
									const url = image.file ? `${process.env.REACT_APP_URL_S3}${image.file.path}` : `${process.env.REACT_APP_URL_S3}${image.path}`;
									console.log({ id, name, url })

									return (
										<div key={id} className="mt-4 mb-9 cursor-pointer relative" onClick={() => {
											openPost({ author: media.author, images, index: i, createAt: media.createAt, mediaId: media._id })
										}} >
											<img src={url} alt={name} className="object-cover h-full w-full" />
											{i === 2 && images.length > 3 && (
												<div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-60 text-3xl leading-9">
													+{images.length - 2}
												</div>
											)}
										</div>
									)
								}) : ''}
							</div>
							<div className={cn("pl-6 pr-8", { "pb-10": files?.length })}>
								<PostFile files={files} />
							</div>
							<p
								dangerouslySetInnerHTML={{
									__html: nl2p(media.content)
								}}>
							</p>
							<div className="flex justify-between text-primary-gray mt-7 px-6 text-[13px] leading-[15px] pb-2.5">
								<span>
									<button onClick={handleReactionMedia}>
										{/* <img src={iconLike} alt="Like" className="inline-block mr-2" style={{ width: '30px' }} /> */}
										<img src={iconThumb} alt="Like" className="inline-block mr-2" />
									</button>
									<button onClick={toggleModalReact}>
										{abbreviateNumber(media.amountReaction)}
									</button>
								</span>
								<span>
									<Link to={`/media/${mediaID}/comments`}>
										<img src={iconComment} alt="Comment" className="inline-block mr-2" />
										{abbreviateNumber(media.amountComment)}
									</Link>
								</span>
								<span>
									<button onClick={toggleModalSeen}>
										<img src={iconEye} alt="View" className="inline-block mr-2" />
										{abbreviateNumber(media.amountView)}
									</button>
								</span>
							</div>
							<div className="border-b border-gray-300"></div>
							<RootCommentsList
								className="px-5"
								userID={user?._id}
								comments={listComments}
								totalRecord={totalRecord}
								limit={limit}
								mediaID={mediaID}
							/>
							<div className='flex flex-col w-full max-h-full overflow-y-auto'>
								<ReplyCommentField
									attachFile
									inputContainerClassName="flex w-full p-2"
									fileContainerClassName="border-t"
									mediaID={mediaID} />
							</div>
						</div>
						{/* Post Suggest */}
						<div className="post__suggest flex-shrink-0">
							<p>Liên quan</p>
							<div>
								{listMediasRelated.length ? listMediasRelated.map((media: MediaProps) => (
									<React.Fragment key={media._id}>
										<Link to={`/media/post/${media._id}`}><div>{abbreviateNumber(media.amountView)}</div></Link>
										<Link to={`/media/post/${media._id}`}>
											{media.title}
										</Link>
									</React.Fragment>
								)) : ''}
								{/* <Link to="/"><div>21,3k</div></Link>
								<Link to="/">Đề xuất thanh toán hồ sơ chỉ gồm 01 bước duy nhất</Link> */}
							</div>
						</div>
					</div>
				</div>
			</div>
			<ModalContainer isModalOpen={modalEditMedia} toggle={toggleModalEditMedia}>
				<div className="inline-flex flex-col text-black w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl">
					<ModalCreateArticle
						modalType="update"
						show={modalEditMedia}
						toggle={toggleModalEditMedia}
						initialValues={initialState}
						files={media.files}
						images={media.images} />
				</div>
			</ModalContainer>
			<ModalListUser
				isModalOpen={modalShowReact}
				toggle={toggleModalReact}
				icon={iconThumb}
				userID={user?._id}
				data={listReactions}
				total={media.amountReaction}
			/>
			<ModalListUser
				isModalOpen={modalShowSeen}
				toggle={toggleModalSeen}
				icon={iconEye}
				userID={user?._id}
				data={listSeens}
				total={totalRecordSeen}
			/>
			<ModalZoomView isShow={state.isShow} toggle={toggleModal} initialData={{
				createAt: state.createAt,
				images: state.images,
				index: state.index,
				mediaID: state.mediaID,
				author: state.author
			}} />
		</>
	);
};