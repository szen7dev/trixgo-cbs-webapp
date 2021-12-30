import { FC, useState } from "react";
import cn from "classnames";

import ModalContainer from "../components/ModalContainer";

import iconPencil from 'assets/images/icons8-pencil-100 1.png';
import iconFilter from 'assets/images/icons8-filter-96.png';
import '../style.css';

import SocialMainArticle from "../components/home/SocialMainArticle";
import SocialAdvertisement from "../components/home/SocialAdvertisement";
import SocialSpecializedTopics from "../components/home/SocialSpecializedTopics";
import SocialInternalArticles from "../components/home/SocialInternalArticles";
import SocialCommunityPost from "../components/home/SocialCommunityPost";
import ModalCreateArticle from "../components/home/ModalCreateArticle";

import { useAuth } from "services/hooks/useAuth";
import { useSocial } from 'services/hooks/useSocial';

const pages = [
	{ id: "0", title: 'Nội bộ công ty' },
	{ id: "1", title: 'Dự án phòng ban' },
	{ id: "2", title: 'Chuyển đổi số' },
	{ id: "3", title: 'Tin hệ thống' },
	{ id: "4", title: 'Lưu trữ cá nhân' },
]

const SocialHomePage: FC = () => {
	const { user } = useAuth();
	const { listMedias: listMediasCompany, isLoadingListMedias } = useSocial('list_medias_internal_company', {
		limit: 1, type: 'company', companyID: user?.company._id
	});
	const [isShowCreateModal, setIsShowCreateModal] = useState(false);

	const toggleCreateModal = () => setIsShowCreateModal(!isShowCreateModal);

	if(isLoadingListMedias) return null;
	return (
		<>
			<div className="flex flex-col text-sm text-black overflow-hidden h-full">
				{/* Header */}
				<div className="px-4 flex justify-between w-full text-primary-gray bg-white border-gray-300">
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
						{/* Top content */}
						<div className="text-black flex flex-wrap xl:flex-nowrap mb-7">
							{/* Main Article */}
							<SocialMainArticle 
								className="flex bg-secondary-gray bg-opacity-10 mt-4 mx-3.5 w-full flex-wrap lg:flex-nowrap" 
								media={listMediasCompany[0]}
							/>
							{/* Advertisement */}
							<SocialAdvertisement className="social__ad hidden xl:block flex-1 mt-4 w-full lg:w-min px-3.5" style={{ minWidth: "406px" }} />
						</div>
						{/* Divide */}
						<div className="border-gray-300 border-t mx-3.5"></div>
						{/* Bottom content */}
						<div className="flex flex-wrap 2xl:flex-nowrap mx-3.5 text-black">
							{/* Company internal articles */}
							<SocialInternalArticles className="w-full mt-3.5" />
							{/* Specialized topics */}
							<SocialSpecializedTopics className="w-1/2 2xl:w-min px-5 mt-3.5 box-content" style={{ minWidth: "287px" }} />
							{/* Community Posts */}
							<SocialCommunityPost className="flex-1 py-3.5 w-1/2 lg:w-min px-3.5" style={{ minWidth: "406px" }} />
						</div>
					</div>
					<button className="button-newpost flex" onClick={() => toggleCreateModal()}>
						<img src={iconPencil} alt="icon pencil" />
					</button>
				</div>
			</div>
			<ModalContainer isModalOpen={isShowCreateModal} toggle={() => ''}>
				<div className="inline-flex flex-col text-black w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl">
					<ModalCreateArticle show={isShowCreateModal} toggle={toggleCreateModal} modalType="create" />
				</div>
			</ModalContainer>
		</>
	);
};

export default SocialHomePage;
