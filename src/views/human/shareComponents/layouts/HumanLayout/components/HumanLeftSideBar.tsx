/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Link } from 'react-router-dom';

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import humanLogo from "assets/logos/human.png";
import fakeThumbnail from "assets/images/avatar.jpg";
import iconFolder from "assets/images/icons8-application-window-100.png";

/*=====4.PAGES/COMPONENTS=====*/

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useAuth } from "services/hooks/auth/useAuth";

/*=====7.OTHER=====*/

export const HumanLeftSideBar: FC = () => {
    const { user } = useAuth();

    return (
        <div className="t-leftsidebar-navigation t-leftsidebar-navigation-type2 fixed left-0 top-14 bottom-0 transition-all duration-500 ease-out border-r border-secondary-light z-10 bg-primary-light">
            <div className="t-leftsidebar-navigation-container overflow-auto transition-all duration-500 ease-out">
                {/* title */}
                <div className="t-leftsidebar-title flex items-center py-2 pl-3 pr-3 text-[14px] font-bold">
                    <img src={humanLogo} alt="Thumbnail" className="w-10 h-10 rounded-full mr-3" />
                    <span>Quản lý nhân sự</span>
                </div>

                {/* menu block */}
                <div className="t-link-menu-container">
                    <Link to={`/human/home`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px] active">
                        <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                        <span className="truncate">Trang chủ</span>
                    </Link>
                    {/* <Link to={`/human/cetificate`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]">
                        <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                        <span className="truncate">Tra cứu chứng chỉ</span>
                    </Link>
                    <Link to={`/human/other`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]">
                        <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                        <span className="truncate">Tra cứu khác</span>
                    </Link>
                    <Link to={`/human/expired`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]">
                        <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                        <span className="truncate">Theo dõi thời hạn</span>
                    </Link> */}
                </div>
            </div>
        </div>
    );
};