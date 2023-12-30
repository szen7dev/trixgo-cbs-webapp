import { FC, useEffect } from "react";
import { NavLink, useParams } from 'react-router-dom';
import { useAuth } from "services/hooks/auth/useAuth";
import {
  useCheckPerAccessApp,
} from "services/hooks/auth/usePermissions";
import {APP_ID} from "apis/localdb";
import iconFolder from "assets/images/bullet.svg";
import whiteIcon from "assets/images/icons8-white.svg";

const LinkMenuLeftSideBar: FC = () => {
  useEffect(() => {
		document.title = "Trixgo | Kế toán";
	}, []);
  const { hasPermission, dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.ACCOUNTING.id })

  return (
    <div className="t-leftsidebar-navigation t-leftsidebar-navigation-v2 t-leftsidebar-navigation-type2 fixed left-64px top-14 bottom-0 transition-all duration-500 ease-out border-secondary-light z-10 bg-primary-light">
      <div className="t-leftsidebar-navigation-container-v2  overflow-auto transition-all duration-500 ease-out p-3">
          <div className="t-link-menu-container">
            {hasPermission && dataUserAccess?.level == 0 ?
                <NavLink to={`/accounting/admin`} className={"left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"}>
                    <img width={'7px'} src={iconFolder} alt="Menu item" />
                    <span className={"flex-1 ml-2 text-left text-[14px]"}>Quản trị ứng dụng</span>
                </NavLink> : <></>
            }
            {hasPermission && dataUserAccess?.level == 0 ?
               <NavLink to={`/accounting/support-tools`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                <img width={'7px'} src={iconFolder} alt="Menu item" />
                <span className={"flex-1 ml-2 text-left text-[14px]"}>Công cụ hỗ trợ</span>
              </NavLink> : <></>
            }
              <NavLink to={`/accounting/home`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                  <img width={'7px'} src={iconFolder} alt="Menu item" />
                  <span className={"flex-1 ml-2 text-left text-[14px]"}>Trang chủ</span>
              </NavLink>
              <div className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                <img width={'7px'} src={iconFolder} alt="Menu item" />
                <span className={"flex-1 ml-2 text-left text-[14px]"}>Phiếu/chứng từ</span>
              </div>
              <NavLink to={`/accounting/accbill`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                <img width={'7px'} src={whiteIcon} alt="Menu item" />
                <span className={"flex-1 ml-2 text-left text-[14px]"}>Phiếu kế toán</span>
              </NavLink>
              <NavLink to={`/accounting/receipt`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                <img width={'7px'} src={whiteIcon} alt="Menu item" />
                <span className={"flex-1 ml-2 text-left text-[14px]"}>Phiếu thu</span>
              </NavLink>
              <NavLink to={`/accounting/payment`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                <img width={'7px'} src={whiteIcon} alt="Menu item" />
                <span className={"flex-1 ml-2 text-left text-[14px]"}>Phiếu chi</span>
              </NavLink>
              <NavLink to={`/accounting/goods-import`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                <img width={'7px'} src={whiteIcon} alt="Menu item" />
                <span className={"flex-1 ml-2 text-left text-[14px]"}>Phiếu nhập</span>
              </NavLink>
              <NavLink to={`/accounting/goods-export`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                <img width={'7px'} src={whiteIcon} alt="Menu item" />
                <span className={"flex-1 ml-2 text-left text-[14px]"}>Phiếu xuất</span>
              </NavLink>
              <NavLink to={`/accounting/invoices`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                <img width={'7px'} src={whiteIcon} alt="Menu item" />
                <span className={"flex-1 ml-2 text-left text-[14px]"}>Hóa đơn dịch vụ</span>
              </NavLink>
              <NavLink to={`/accounting/debit-note`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                <img width={'7px'} src={whiteIcon} alt="Menu item" />
                <span className={"flex-1 ml-2 text-left text-[14px]"}>Giấy báo nợ</span>
              </NavLink>
              <NavLink to={`/accounting/credit-note`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                <img width={'7px'} src={whiteIcon} alt="Menu item" />
                <span className={"flex-1 ml-2 text-left text-[14px]"}>Giấy báo có</span>
              </NavLink>
              <NavLink to={`/accounting/detail`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                <img width={'7px'} src={iconFolder} alt="Menu item" />
                <span className={"flex-1 ml-2 text-left text-[14px]"}>Chi tiết tài khoản</span>
              </NavLink>
              {/* <NavLink to={`/accounting/tbook`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                <img width={'7px'} src={iconFolder} alt="Menu item" />
                <span className={"flex-1 ml-2 text-left text-[14px]"}>Tổng hợp tài khoản chữ T</span>
              </NavLink> */}
              <NavLink to={`/accounting/diary`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                <img width={'7px'} src={iconFolder} alt="Menu item" />
                <span className={"flex-1 ml-2 text-left text-[14px]"}>Sổ nhật ký chung</span>
              </NavLink>
              <NavLink to={`/accounting/import-export`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                <img width={'7px'} src={iconFolder} alt="Menu item" />
                <span className={"flex-1 ml-2 text-left text-[14px]"}>Nhập xuất tồn</span>
              </NavLink>
              <NavLink to={`/accounting/debt-tracking`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                <img width={'7px'} src={iconFolder} alt="Menu item" />
                <span className={"flex-1 ml-2 text-left text-[14px]"}>Theo dõi công nợ</span>
              </NavLink>
              <NavLink to={`/accounting/vatin`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                <img width={'7px'} src={iconFolder} alt="Menu item" />
                <span className={"flex-1 ml-2 text-left text-[14px]"}>Bảng kê mua vào</span>
              </NavLink>
              <NavLink to={`/accounting/vatout`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                <img width={'7px'} src={iconFolder} alt="Menu item" />
                <span className={"flex-1 ml-2 text-left text-[14px]"}>Bảng kê bán ra</span>
              </NavLink>
              <NavLink to={`/accounting/financial-report`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                <img width={'7px'} src={iconFolder} alt="Menu item" />
                <span className={"flex-1 ml-2 text-left text-[14px]"}>Báo cáo tài chính</span>
              </NavLink>
            <div >
          </div>
        </div>
      </div>
    </div>
  )
}

export default LinkMenuLeftSideBar