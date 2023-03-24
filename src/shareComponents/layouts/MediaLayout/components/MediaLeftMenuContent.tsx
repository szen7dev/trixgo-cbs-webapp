import React, { FC, useEffect, useState } from "react";
import socialIcon from "assets/images/icons8-social-64.svg"
import commercialIcon from "assets/images/icons8-commercial-64 1.svg"

import { useModal } from "../../../../services/hooks/useModal";
import { NavLink } from 'react-router-dom';

/*=====6.HOOKS/APIS=====*/
import { ModalCreateArticle } from "views/media/shareComponents/common";
import { ModalContainer } from "../../../common";

export const MediaLeftMenuContent: FC = () => {

    const [isShowCreateModal, setIsShowCreateModal] = useState(false);
    const toggleCreateModal = () => setIsShowCreateModal(!isShowCreateModal);

    return (
        <>
            <button
                onClick={() => toggleCreateModal()}
                className={"bg-cbs-blue-button rounded-md flex items-center justify-center text-xl text-primary-gray py-2 px-4"}>
                <img src={commercialIcon} alt={"Tạo mới"} />
                <span className={"ml-2"}>Tạo mới</span>
            </button>

            <ModalContainer isModalOpen={isShowCreateModal} toggle={() => ''}>
                <div className="inline-flex flex-col text-black w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl">
                    <ModalCreateArticle show={isShowCreateModal} toggle={toggleCreateModal} modalType="create" />
                </div>
            </ModalContainer>
            <div className="t-link-menu-container mt-4">
                <NavLink to={`/media/home`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
                >
                    <img width={'20px'} src={socialIcon} alt="Menu item" />
                    <span className={"flex-1 ml-2 text-left text-[14px]"}>Trang chủ</span>
                </NavLink>
                <NavLink to={`/media/2`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray">
                    <img width={'20px'} src={socialIcon} alt="Menu item" />
                    <span className={"flex-1 ml-2 text-left text-[14px]"}>Dự án phòng ban</span>
                </NavLink>
                <NavLink to={`/media/3`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray">
                    <img width={'20px'} src={socialIcon} alt="Menu item" />
                    <span className={"flex-1 ml-2 text-left text-[14px]"}>Chuyển đổi số</span>
                </NavLink>
                <NavLink to={`/media/4`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray">
                    <img width={'20px'} src={socialIcon} alt="Menu item" />
                    <span className={"flex-1 ml-2 text-left text-[14px]"}>Tin hệ thống</span>
                </NavLink>

                <NavLink to={`/media/5`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray">
                    <img width={'20px'} src={socialIcon} alt="Menu item" />
                    <span className={"flex-1 ml-2 text-left text-[14px]"}>Lưu trữ cá nhân</span>
                </NavLink>
            </div>
        </>
    )
}