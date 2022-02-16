import React, { FC, Fragment, useContext, useState } from "react";

/**
 * LIBRARIES
 */
import { Link, useParams, useHistory } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { useQuery } from "react-query";
import moment from 'moment';
import cn from 'classnames';

/**
 * COMPONENTS
 */
import ModalContainer from "components/common/modals/ModalContainer";
import PostFile from '../components/post/PostFile';
import Loader from "components/shared/Loader";
import ReplyCommentField from "../components/ReplyCommentField";
import ModalCreateArticle from "../components/home/ModalCreateArticle";
import RootCommentsList from '../components/RootCommentsList';

/**
 * ASSETS
 */
import avatar from 'assets/images/avatar.jpg';
import iconThumb from 'assets/images/icons8-thumbs-up-96 1.png';
import iconTrash from 'assets/images/icons8-remove.svg';
import iconPencil from 'assets/images/icons8-pencil.svg';
import iconEye from 'assets/images/icons8-eye-96 1.png';
import iconCopy from 'assets/images/icons8-copy-96.png';
import iconPrint from 'assets/images/icons8-print-96.png';
import iconComment from 'assets/images/icon-chat-project.png';
import '../style.css';

/**
 * Types, Services, Utils
 */
import { FileProps, ImageProps, ReactionProps } from "typings/social";
import SocialRepository from "apis/social";
import { typePostSelected } from '../utils';
import { abbreviateNumber } from 'utils';
import { useAuth } from 'services/hooks/useAuth';
import { useSocial, useCommentSocial } from 'services/hooks/useSocial';

import CommentProvider from '../context/comment/comment.provider';
import { ProviderModalPost } from "../context/post";
import CommentModal from "components/common/detail-post";

const SocialPost: FC = () => {
	const history = useHistory();
	const { mediaID } = useParams<{ mediaID: string }>();
	const { user } = useAuth();
	const { data, refetch } = useQuery(`media_info.${mediaID}`, () => SocialRepository.mediaInfo(mediaID));
	const media = data?.data;

	const conditionListMedia: any = {
		type: typePostSelected(media?.type || 0),
		mediaID,
		isRelated: true
	}

	switch (conditionListMedia.type) {
		case 'company':
			conditionListMedia.companyID = user?.company._id;
			break;
		default:
			break;
	}

	const { deleteMedia, reactionMedia, listMedias } = useSocial(`list_media__related.${mediaID}`, conditionListMedia);
	const { listReactions, refetchListReactions } = useSocial(`list_reactions.${mediaID}`, { mediaID });
	const { listComments, totalRecord, limit } = useCommentSocial({
		mediaID,
		key: `list_comments.${mediaID}`
	});

	// State manage image comments
	const [defaultState, setDefaultState] = useState({ mediaID: '', images: [] as ImageProps[], index: 0, });
	const [isShow, setIsShow] = useState(false);

	const [modalEditMedia, setModalEditMedia] = useState<boolean>(false);
	const [modalShowReact, setModalShowReact] = useState<boolean>(false);

	const toggleModalEditMedia = () => {
		refetch();
		setModalEditMedia(!modalEditMedia);
	};
	const toggleModalEditMediaEdit = () => setModalEditMedia(!modalEditMedia);
	const toggleModalReact = () => setModalShowReact(!modalShowReact);

	const handleDeleteMedia = async () => {
		await deleteMedia(mediaID);
		history.push('/social/home');
	}

	const handleReactionMedia = async () => {
		await reactionMedia({ mediaID });
		refetch();
		refetchListReactions();
	}

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
										<Menu.Item>
											<button className="block px-8 py-2 hover:bg-gray-200 w-full text-left">
												<img src={iconPrint} alt="Icon Edit" className="inline-block mr-6" />
												In ấn
											</button>
										</Menu.Item>
										<Menu.Item>
											<button className="block px-8 py-2 hover:bg-gray-200 w-full text-left">
												<img src={iconCopy} alt="Icon Edit" className="inline-block mr-6" />
												Copy link
											</button>
										</Menu.Item>
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
											{media.author?.fullname}
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
								<button className="post__follow">Theo dõi</button>
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
									const url = image.file ? `${process.env.REACT_APP_URL_S3}/${image.file.path}` : `${process.env.REACT_APP_URL_S3}/${image.path}`;

									return (
										<div key={id} className="mt-4 mb-9 cursor-pointer relative" onClick={() => {
											// openModal(mediaID, images, i)
											setDefaultState({ mediaID, images, index: i })
											setIsShow(true)
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
							<div className={cn("pl-6 pr-8", { "pb-10": files.length })}>
								<PostFile files={files} />
							</div>
							<p>
								{media.content}
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
									<img src={iconComment} alt="Comment" className="inline-block mr-2" />
									<Link to="/social/comments">
										{abbreviateNumber(media.amountComment)}
									</Link>
								</span>
								<span>
									<img src={iconEye} alt="View" className="inline-block mr-2" />
									{abbreviateNumber(media.amountView)}
								</span>
							</div>
							<div className="border-b border-gray-300"></div>
							{totalRecord && <RootCommentsList
								className="px-5"
								comments={listComments}
								totalRecord={totalRecord}
								limit={limit}
								mediaID={mediaID} />}
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
								{listMedias.length ? listMedias.map(media => (
									<React.Fragment key={media._id}>
										<Link to="/"><div>{abbreviateNumber(media.amountView)}</div></Link>
										<Link to={`/social/post/${media._id}`}>
											{media.title}
										</Link>
									</React.Fragment>
								)) : ''}
								{/* <Link to="/"><div>21,3k</div></Link>
								<Link to="/">Đề xuất thanh toán hồ sơ chỉ gồm 01 bước duy nhất</Link>
								<Link to="/"><div>21,3k</div></Link>
								<Link to="/">Đề xuất thanh toán hồ sơ chỉ gồm 01 bước duy nhất</Link> */}
							</div>
						</div>
					</div>
				</div>
			</div>
			<ModalContainer isModalOpen={modalEditMedia} toggle={() => ''}>
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
			<ModalContainer isModalOpen={modalShowReact} toggle={() => ''}>
				<div className="inline-flex flex-col text-black my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl" style={{ width: "550px", maxHeight: "440px" }}>
					<div className="flex items-center justify-between border-b border-secondary-gray border-opacity-30 px-3">
						<div className="flex">
							<div className="flex items-center justify-center border-b-2 border-primary py-4 text-primary" style={{ minWidth: "100px" }}>
								<img src={iconThumb} alt="Like" className="inline-block" />
								<span>
									{abbreviateNumber(media.amountReaction)}
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
						{(listReactions && listReactions.length) ? listReactions.map((reaction: ReactionProps) => (
							<li key={reaction._id} className="flex justify-between pl-4 pr-2 py-2">
								<div className="flex">
									<img src={`${process.env.REACT_APP_URL_S3_USER}/${reaction.userCreate?.image}`} alt="avatar" className="h-10 w-10 rounded-full mr-3" />
									<div>
										<p className="text-black text-[15px]">{reaction.userCreate?.bizfullname}</p>
										<p className="leading-[15px] mt-1">
											{user?._id === reaction.userCreate?._id ? 'Đã là bạn' : ''}
										</p>
									</div>
								</div>
								<div>
									<Link to={`/messages/#${reaction.userCreate?._id}`} className="flex items-center text-black py-1.5 pl-1.5 pr-4 bg-gray-100 rounded-md">
										<img src={iconComment} alt="" className="inline-block w-6 h-6 mr-1" />
										Nhắn tin
									</Link>
								</div>
							</li>
						)) : ''}
					</ul>
				</div>
			</ModalContainer>
			<CommentModal isShow={isShow} toggle={() => setIsShow(false)} initialData={defaultState} />
		</>
	);
};

const SocialPostPage: FC = () => {
	return (
		<ProviderModalPost>
			<CommentProvider>
				<SocialPost />
			</CommentProvider>
		</ProviderModalPost>
	)
}

export default SocialPostPage;
