/*=====1.LIBRARY=====*/
import { FC, useState } from "react";
import { NavLink } from 'react-router-dom';

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import budgetLogo from "assets/logos/budget.png";
// import fakeThumbnail from "assets/images/avatar.jpg";
import iconFolder from "assets/images/icons8-application-window-100.png";
import iconPlus from "assets/images/icons8-plus-math-96 3.svg";
import iconPlusBlue from "assets/images/icons8-plus-math-96 1.svg";
import sampleAvaT from "assets/images/Frame 3581.svg";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

/*=====4.PAGES/COMPONENTS=====*/

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useAuth } from "services/hooks/auth/useAuth";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";

/*=====7.OTHER=====*/
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useModal } from "services/hooks/useModal";
import { ModalAddNewOrder } from "./ModalAddNewOrder";

export const FnBLeftSideBar: FC = () => {
    const { user } = useAuth();
    const { openModal } = useModal();
    const [menuShowList, setMenuState] = useState(false);
    const { hasPermission, dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.BUDGET.id });

    return (
        <div className="t-leftsidebar-navigation t-leftsidebar-navigation-v2 t-leftsidebar-navigation-type2 fixed left-64px top-14 bottom-0 transition-all duration-500 ease-out border-secondary-light z-10 bg-primary-light">
            <div className="t-leftsidebar-navigation-container-v2  overflow-auto transition-all duration-500 ease-out p-3">

                {/* menu block */}
                <div>
                    <button
                        className="flex gap-2 items-center justify-center text-primary-gray bg-cbs-blue-button  rounded-md font-bold px-6 py-2 mb-3"
                        onClick={() =>
                            openModal(
                                <div className="t-add-new-task-dialog text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block">
                                    <ModalAddNewOrder />
                                </div>
                            )
                        }
                    >
                        <img src={iconPlusBlue} alt="" /> Tạo mới
                    </button>
                </div>
                <div className="t-link-menu-container">
                    <NavLink to={`/fnb/home`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img width={'20px'} src={iconFolder} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Trang chủ</span>
                    </NavLink>
                    <a href="#" className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img width={'20px'} src={iconFolder} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Ca làm việc</span>
                    </a>
                    <a href="#" className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img width={'20px'} src={iconFolder} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Thực đơn</span>
                    </a>
                    <a href="#" className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img width={'20px'} src={iconFolder} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Báo cáo</span>
                    </a>

                </div>
                <div>
                    <div onClick={() => setMenuState(!menuShowList)} className="flex justify-between text-primary-gray px-4 py-1 cursor-pointer hover:bg-slate-200">
                        <div>
                            {(menuShowList ? <ExpandLessIcon sx={{ width: "24px", height: "24px" }} fontSize="small" /> : <ExpandMoreIcon sx={{ width: "24px", height: "24px" }} fontSize="small" />)}
                            <span className="ml-2 text-[14px] align-middle"> Khách hàng</span>
                        </div>
                        <img src={iconPlus} alt="" />
                    </div>
                    <div className={"transition-1s h-0 overflow-hidden " + (menuShowList ? ' h-[300px]' : '')}>
                        <div>
                            <div>
                                <Paper
                                    component="form"
                                    sx={{ boxShadow: "none", height: "32px" }}
                                    className="flex items-center border-0.5 mt-2"
                                >
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                    <InputBase
                                        className="placeholder:text-primary-gray"
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Tìm kiếm ..."
                                        inputProps={{ 'aria-label': 'Tìm kiếm ...' }}
                                    />
                                </Paper>
                            </div>
                            <div>
                                <div className="flex gap-3 mt-3">
                                    <img src={sampleAvaT} alt="" />
                                    <div>
                                        <div className="flex justify-between">
                                            <div>Nguyễn Đắc Toàn</div>
                                            <div className="text-cbs-subtext">15/2/22</div>
                                        </div>
                                        <div className="text-cbs-subtext">0986777355 - Khách quen</div>
                                    </div>
                                </div>
                                <div className="flex gap-3 mt-3">
                                    <img src={sampleAvaT} alt="" />
                                    <div>
                                        <div className="flex justify-between">
                                            <div>Nguyễn Đắc Toàn</div>
                                            <div className="text-cbs-subtext">15/2/22</div>
                                        </div>
                                        <div className="text-cbs-subtext">0986777355 - Khách quen</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};