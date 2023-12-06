/*=====1.LIBRARY=====*/
import { FC } from "react";
import { NavLink } from 'react-router-dom';

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import iconPeople from "assets/images/icons8-people-64.svg";

/*=====4.PAGES/COMPONENTS=====*/

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useAuth } from "services/hooks/auth/useAuth";
import { useDispatch } from "react-redux";

/*=====7.OTHER=====*/

export const HumanLeftSideBar: FC = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();

    return (
        <div className="t-leftsidebar-navigation t-leftsidebar-navigation-v2 t-leftsidebar-navigation-type2 fixed left-64px top-14 bottom-0 transition-all duration-500 ease-out border-secondary-light z-10 bg-primary-light">
            <div className="t-leftsidebar-navigation-container-v2  overflow-auto transition-all duration-500 ease-out p-3">
                <div className="t-link-menu-container">
                    <NavLink to={`/human/home`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
                    >
                        <img width={'20px'} src={iconPeople} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Trang chủ</span>
                    </NavLink>
                    {/* <NavLink to={`/human/capacity`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray">
                        <img width={'20px'} src={iconPeople} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Tra cứu hồ sơ nhân sự</span>
                    </NavLink> */}
                    {/* <NavLink to={`/human/partner`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray">
                        <img width={'20px'} src={iconPeople} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Nhân sự đối tác</span>
                    </NavLink>
                    <NavLink to={`/human/capacity`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray">
                        <img width={'20px'} src={iconPeople} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Tra cứu năng lực</span>
                    </NavLink>
                    <NavLink to={`/human/certificate`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray">
                        <img width={'20px'} src={iconPeople} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Tra cứu chứng chỉ</span>
                    </NavLink>

                    <NavLink to={`/human/expired`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray">
                        <img width={'20px'} src={iconPeople} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Theo dõi thời hạn</span>
                    </NavLink> */}
                </div>
            </div>
        </div>
    );
};