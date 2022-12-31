/*=====1.LIBRARY=====*/
import { FC, useState } from "react";
import { NavLink } from 'react-router-dom';
import moment from "moment";
import debounce from "lodash/debounce";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import budgetLogo from "assets/logos/budget.png";
import iconFolder from "assets/images/icons8-application-window-100.png";
import iconPlus from "assets/images/icons8-plus-math-96 3.svg";
import iconPlusBlue from "assets/images/icons8-plus-math-96 1.svg";
import sampleAvaT from "assets/images/Frame 3581.svg";
import iconStore from 'assets/images/icons8-store.svg';
import iconExpense from 'assets/images/icons8-expense.svg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import adminIcon from "assets/images/icons8-user-shield-48.svg"
import homeIcon from 'assets/images/icons-home.svg';
import reportIcon from 'assets/images/icons-report.svg';
import contactIcon from 'assets/images/icons8-contacts-96.svg';
import riskIcon from 'assets/images/icons8-high-risk-100.svg';
import menuIcon from 'assets/images/icons8-order.svg';
import shiftcon from 'assets/images/icons-shift.svg';
import { ModalCreateOrUpdateCustomer, ModalConfirm } from 'views/item/shareComponents/common';

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
import { useDispatch } from "react-redux";
import { resetQueryFnb } from "redux/reducer/FnbSlice";

export const FnbLeftSideBar: FC = () => {
    const { user } = useAuth();
    // console.log(user)
    const { openModal } = useModal();
    const dispath = useDispatch();
    const [menuShowList, setMenuState] = useState(false);
    const { hasPermission, dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.FNB.id });
    const [initialValues, setInitialValues] = useState({
        // parent: parentID,
        contactID: '',
        type: '',
        name: '',
        address: '',
        note: '',
        taxid: '',
        phone: '',
        description: '',
        funda: '',
        gender: 1,
        birthday: ''
    });
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

    const handleSearch = debounce(
      (e: any) => setKeyword(e.target.value),
    200)
    const handleConfirmCreateOrUpdate = () => refetch();

    const handleOpenModalCreateOrUpdate = (modalType: 'create' | 'update') => {

        let initValues: any = {...initialValues};

        // setItemsChecked([]);

        // Mở modal tạo mới
        if(modalType === 'create') {
            // clearData();
            initValues = {
                // parent: parentID,
                contactID: '',
                type: '',
                name: '',
                address: '',
                taxid: '',
                phone: '',
                description: '',
            };
        }

        openModal(
            <div
                className={"inline-block w-[521px] h-[620px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"}
                style={{
                    height: "820px",
                }}
            >
                <ModalCreateOrUpdateCustomer
                    modalType={modalType}
                    initialValues={initValues}
                    onConfirm={handleConfirmCreateOrUpdate}
                />
            </div>
        )
    }

    return (
        <div className="t-leftsidebar-navigation t-leftsidebar-navigation-v2 t-leftsidebar-navigation-type2 fixed left-64px top-14 bottom-0 transition-all duration-500 ease-out border-secondary-light z-10 bg-primary-light">
            <div className="t-leftsidebar-navigation-container-v2  overflow-auto transition-all duration-500 ease-out p-3">

                {/* menu block */}
                <div>
                    <button
                        className="flex gap-2 items-center justify-center text-primary-gray bg-cbs-blue-button  rounded-md font-bold px-6 py-2 mb-3"
                        onClick={() =>
                            openModal(
                                <div 
                                className="w-full text-left transition-all transform bg-primary-light shadow-xl rounded my-6 align-top inline-block"
                                style={{maxWidth:" calc(100vw - 50px)"}}
                                >
                                    <ModalAddNewOrder />
                                </div>
                            )
                        }
                    >
                        <img src={iconPlusBlue} alt="" /> Tạo mới
                    </button>
                </div>
                <div className="t-link-menu-container">
                    <NavLink
                        to={'/fnb/admin'}
                        className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
                    >
                        <img width={'20px'} src={adminIcon} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Quản trị viên</span>
                    </NavLink>

                    <NavLink to={`/fnb/home`} onClick={() => dispath(resetQueryFnb())} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img width={'20px'} src={homeIcon} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Trang chủ</span>
                    </NavLink>
                    <NavLink to={`/fnb/revenue-report`} onClick={() => dispath(resetQueryFnb())} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img width={'20px'} src={reportIcon} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Báo cáo doanh thu</span>
                    </NavLink>
                    <NavLink to={`/fnb/risk-report`} onClick={() => dispath(resetQueryFnb())} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img width={'20px'} src={riskIcon} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Báo cáo lỗi</span>
                    </NavLink>
                    <NavLink to={`/fnb/contacts`} onClick={() => dispath(resetQueryFnb())} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img width={'20px'} src={contactIcon} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Danh bạ khách hàng</span>
                    </NavLink>
                    <NavLink to={`/fnb/shift`} onClick={() => dispath(resetQueryFnb())} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img width={'20px'} src={shiftcon} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Ca làm việc</span>
                    </NavLink>
                    {
                        user?.email.toString() === 'assistant.c686.trx@gmail.com' ? 
                        <NavLink to={`/fnb/store`} onClick={() => dispath(resetQueryFnb())} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                            <img width={'20px'} src={iconStore} alt="Menu item" />
                            <span className={"flex-1 ml-2 text-left text-[14px]"}>Quản lý kho</span>
                        </NavLink>
                        : <></>
                    }
                    {
                        user?.email.toString() === 'assistant.c686.trx@gmail.com' ? 
                        <NavLink to={`/fnb/expense`} onClick={() => dispath(resetQueryFnb())} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                            <img width={'20px'} src={iconExpense} alt="Menu item" />
                            <span className={"flex-1 ml-2 text-left text-[14px]"}>Quản lý chi phí</span>
                        </NavLink>
                        : <></>
                    }
                    {
                        user?.email.toString() === 'assistant.c686.trx@gmail.com' ? 
                        <NavLink to={`/fnb/product`} onClick={() => dispath(resetQueryFnb())} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                            <img width={'20px'} src={menuIcon} alt="Menu item" />
                            <span className={"flex-1 ml-2 text-left text-[14px]"}>Thực đơn</span>
                        </NavLink>
                        : <></>
                    }

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
                            onClick={() => handleOpenModalCreateOrUpdate('create')}
                            // onClick={() =>
                            //     openModal(
                            //         <div className=" text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block"
                            //         style={{width:"600px"}}>
                            //             <ModalAddNewContact onClosed ={() => refetch()}/>
                            //         </div>
                            //     )
                            // }
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
                                        onChange={handleSearch}
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
                                                    <div>{item?.name} ({item?.numberOfOrders | 0})</div>
                                                    <div className="text-cbs-subtext">{moment(item?.createAt).format('DD/MM/YY')}</div>
                                                </div>
                                                <div className="text-cbs-subtext">{item?.phone}-{item?.note}</div>
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