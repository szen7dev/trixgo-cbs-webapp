/*=====1.LIBRARY=====*/
import { FC, useState } from "react";
import { NavLink } from 'react-router-dom';
import moment from "moment";

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
import { useContact } from 'services/hooks/items/useContact';

/*=====7.OTHER=====*/
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useModal } from "services/hooks/useModal";
import { ModalAddNewOrder } from "./ModalAddNewOrder";
import { ModalAddNewContact } from "./ModalAddNewContact";

export const FnbLeftSideBar: FC = () => {
    const { user } = useAuth();
    const { openModal } = useModal();
    const [menuShowList, setMenuState] = useState(false);
    const { hasPermission, dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.FNB.id });

    /**
	 * List mẩu tin
	 */
    const [keyword, setKeyword] = useState("");
    const { isLoading, fetchNextPage, hasNextPage, totalRecord, listWithPager, totalPage, refetch } = useContact({ 
		params: { 
			keyword: keyword,  
			limit: 5
		}, 
		isFetchList: true, 
		isFetchInfo: false
	});

    const [pageIndex, setPageIndex] = useState(0);

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
                    <NavLink to={`/fnb/shift`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img width={'20px'} src={iconFolder} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Ca làm việc</span>
                    </NavLink>
                    <NavLink to={`/fnb/material`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img width={'20px'} src={iconFolder} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Nhập xuất tồn kho</span>
                    </NavLink>
                    <NavLink to={`/fnb/expense`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img width={'20px'} src={iconFolder} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Quản lý chi phí</span>
                    </NavLink>
                    <NavLink to={`/fnb/product`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img width={'20px'} src={iconFolder} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Thực đơn</span>
                    </NavLink>
                    <NavLink to={`/fnb/revenue-report`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img width={'20px'} src={iconFolder} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Báo cáo doanh thu</span>
                    </NavLink>
                    {/* <div onClick={() => setMenuState(!menuShowList)} className="text-primary-gray px-4 py-1 cursor-pointer hover:bg-slate-200">
                        {(menuShowList ? <ExpandLessIcon className="w-[20px]" fontSize="small"/> : <ExpandMoreIcon className="w-[20px]" fontSize="small"/>)}
                        <span className="ml-2 text-[14px]">{(menuShowList ? 'Báo cáo' : 'Báo cáo')}</span>
                    </div>
                    <div className={"transition-1s h-0 overflow-hidden " + (menuShowList ? ' h-[45px]' : '')}>
                        <NavLink to={`/fnb/revenue-report`} className={"left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray"}>
                            <img width={'20px'} src={iconFolder} />
                            <span className={"flex-1 ml-2 text-left text-[14px]"}>Báo cáo doanh thu</span>
                        </NavLink>
                    </div> */}
                </div>
                <div>
                    <div className="flex justify-between text-primary-gray px-4 py-1 cursor-pointer hover:bg-slate-200">
                        <div>
                            <ExpandMoreIcon sx={{ width: "24px", height: "24px" }} fontSize="small" />
                            <span className="ml-2 text-[14px] align-middle"> Khách hàng</span>
                        </div>
                        <button
                            onClick={() =>
                                openModal(
                                    <div className=" text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block"
                                    style={{width:"600px"}}>
                                        <ModalAddNewContact onClosed ={() => refetch()}/>
                                    </div>
                                )
                            }
                        >
                            <img src={iconPlus} alt="" />
                        </button>
                    </div>
                    <div className={"transition-1s overflow-hidden "}>
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
                            <div className="ml- mr-0.5">
                                {
                                    (listWithPager[pageIndex]??[]).map((item: any, i: any) => (
                                        <div key={item._id} className="flex gap-3 mt-3">
                                            <div className="w-[28px] h-[28px] min-w-[28px] min-h-[28px] rounded-full flex items-center justify-center text-white text-lg min-w-[28px] min-h-[28px]" style={{ background: "#FCC4A2" }}>{item?.name.charAt(0)}</div>
                                            <div className="w-full">
                                                <div className="flex justify-between">
                                                    <div>{item?.name}</div>
                                                    <div className="text-cbs-subtext">{moment(item?.createAt).format('DD/MM/YY')}</div>
                                                </div>
                                                <div className="text-cbs-subtext">{item?.phone} - {item?.address}</div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};