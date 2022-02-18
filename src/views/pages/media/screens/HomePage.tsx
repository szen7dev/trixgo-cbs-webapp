import { FC, useState } from "react";

import ModalContainer from "components/common/modals/ModalContainer";

import iconPencil from 'assets/images/icons8-pencil-100 1.png';
import '../style.css';

import SocialMainArticle from "../components/home/SocialMainArticle";
import SocialAdvertisement from "../components/home/SocialAdvertisement";
import SocialSpecializedTopics from "../components/home/SocialSpecializedTopics";
import SocialArticles from "../components/home/SocialArticles";
import SocialDepartmentArticles from "../components/home/SocialDepartmentArticles";
import ModalCreateArticle from "../components/home/ModalCreateArticle";

import { useAuth } from "services/hooks/useAuth";
import { useSocial } from 'services/hooks/useSocial';

const SocialHomePage: FC = () => {
	const { user } = useAuth();
	const { listMedias: listMediasCompany, isLoadingListMedias } = useSocial('list_media__company__mainpage', {
		limit: 1, type: 'company', companyID: user?.company._id
	});
	const [isShowCreateModal, setIsShowCreateModal] = useState(false);

	const toggleCreateModal = () => setIsShowCreateModal(!isShowCreateModal);

	if (isLoadingListMedias) return null;

	return (
		<>
			{/* Content */}
			<div className="custom-scroll overflow-y-auto flex-1 z-0 pb-20">
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
						<SocialArticles className="w-full mt-3.5" headerComponent={() => <span className="text-24px font-bold inline-block border-b border-primary pb-3 mt-3">Nội bộ công ty</span>} type="company" />
						{/* Specialized topics */}
						<SocialSpecializedTopics className="w-1/2 2xl:w-min px-5 mt-3.5 box-content" style={{ minWidth: "287px" }} />
						{/* Community Posts */}
						<SocialDepartmentArticles className="flex-1 py-3.5 w-1/2 lg:w-min px-3.5" style={{ minWidth: "406px" }} />
					</div>
				</div>
				<button className="button-newpost flex" onClick={() => toggleCreateModal()}>
					<img src={iconPencil} alt="icon pencil" />
				</button>
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
