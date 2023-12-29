import { FC } from "react";

import { NavLink, useParams } from 'react-router-dom';
import { useAuth } from "services/hooks/auth/useAuth";

import iconFolder from "assets/images/bullet.svg";

const LinkMenuLeftSideBar: FC = () => {
  const { user } = useAuth();
  const { fundaID } = useParams<any>();
  
  const menuItems = [
    "home",
    "accbill",
    "receipt",
    "payment",
    "goods-import",
    "goods-export",
    "invoices",
    "debit-note",
    "credit-note"
  ]

  return (
    <div className="t-leftsidebar-navigation t-leftsidebar-navigation-v2 t-leftsidebar-navigation-type2 fixed left-64px top-14 bottom-0 transition-all duration-500 ease-out border-secondary-light z-10 bg-primary-light">
      <div className="t-leftsidebar-navigation-container-v2  overflow-auto transition-all duration-500 ease-out p-3">
        {/* menu block */}
        <div className="t-link-menu-container">
            <NavLink to={`/accounting/admin`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
              <img width={'7px'} src={iconFolder} alt="Menu item" />
              <span className={"flex-1 ml-2 text-left text-[14px]"}>Quản trị ứng dụng (ok)</span>
            </NavLink>
            <NavLink to={`/accounting/home`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                <img width={'7px'} src={iconFolder} alt="Menu item" />
                <span className={"flex-1 ml-2 text-left text-[14px]"}>Trang chủ</span>
            </NavLink>
            <NavLink to={`/accounting/dashboard`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                <img width={'7px'} src={iconFolder} alt="Menu item" />
                <span className={"flex-1 ml-2 text-left text-[14px]"}>Báo cáo quản trị</span>
            </NavLink>
            <NavLink to={`/accounting/detail`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
              <img width={'7px'} src={iconFolder} alt="Menu item" />
              <span className={"flex-1 ml-2 text-left text-[14px]"}>Chi tiết tài khoản (ok)</span>
            </NavLink>
            {/* <NavLink to={`/accounting/tbook`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
              <img width={'7px'} src={iconFolder} alt="Menu item" />
              <span className={"flex-1 ml-2 text-left text-[14px]"}>Tổng hợp tài khoản chữ T</span>
            </NavLink> */}
            <NavLink to={`/accounting/diary`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
              <img width={'7px'} src={iconFolder} alt="Menu item" />
              <span className={"flex-1 ml-2 text-left text-[14px]"}>Sổ nhật ký chung (ok)</span>
            </NavLink>
            <NavLink to={`/accounting/import-export`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
              <img width={'7px'} src={iconFolder} alt="Menu item" />
              <span className={"flex-1 ml-2 text-left text-[14px]"}>Nhập xuất tồn (ok)</span>
            </NavLink>
            <NavLink to={`/accounting/debt-tracking`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
              <img width={'7px'} src={iconFolder} alt="Menu item" />
              <span className={"flex-1 ml-2 text-left text-[14px]"}>Theo dõi công nợ (ok)</span>
            </NavLink>
            <NavLink to={`/accounting/vat`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
              <img width={'7px'} src={iconFolder} alt="Menu item" />
              <span className={"flex-1 ml-2 text-left text-[14px]"}>Bảng kê VAT</span>
            </NavLink>
            <NavLink to={`/accounting/financial-report`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
              <img width={'7px'} src={iconFolder} alt="Menu item" />
              <span className={"flex-1 ml-2 text-left text-[14px]"}>Báo cáo tài chính</span>
            </NavLink>
            <NavLink to={`/accounting/support-tools`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
              <img width={'7px'} src={iconFolder} alt="Menu item" />
              <span className={"flex-1 ml-2 text-left text-[14px]"}>Công cụ hỗ trợ</span>
            </NavLink>
          <div >
            {
              !menuItems.includes(fundaID) ? <>
                  <NavLink to={`/accounting/${fundaID}/accbill`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                    <img width={'7px'} src={iconFolder} alt="Menu item" />
                    <span className={"flex-1 ml-2 text-left text-[14px]"}>***Phiếu kế toán</span>
                  </NavLink>
                  <NavLink to={`/accounting/${fundaID}/receipt`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                    <img width={'7px'} src={iconFolder} alt="Menu item" />
                    <span className={"flex-1 ml-2 text-left text-[14px]"}>***Phiếu thu</span>
                  </NavLink>
                  <NavLink to={`/accounting/${fundaID}/payment`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                    <img width={'7px'} src={iconFolder} alt="Menu item" />
                    <span className={"flex-1 ml-2 text-left text-[14px]"}>***Phiếu chi</span>
                  </NavLink>
                  <NavLink to={`/accounting/${fundaID}/goods-import`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                    <img width={'7px'} src={iconFolder} alt="Menu item" />
                    <span className={"flex-1 ml-2 text-left text-[14px]"}>***Phiếu nhập</span>
                  </NavLink>
                  <NavLink to={`/accounting/${fundaID}/goods-export`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                    <img width={'7px'} src={iconFolder} alt="Menu item" />
                    <span className={"flex-1 ml-2 text-left text-[14px]"}>***Phiếu xuất</span>
                  </NavLink>
                  <NavLink to={`/accounting/${fundaID}/invoices`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                    <img width={'7px'} src={iconFolder} alt="Menu item" />
                    <span className={"flex-1 ml-2 text-left text-[14px]"}>***Hóa đơn dịch vụ</span>
                  </NavLink>
                  <NavLink to={`/accounting/${fundaID}/debit-note`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                    <img width={'7px'} src={iconFolder} alt="Menu item" />
                    <span className={"flex-1 ml-2 text-left text-[14px]"}>***Giấy báo nợ</span>
                  </NavLink>
                  <NavLink to={`/accounting/${fundaID}/credit-note`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                    <img width={'7px'} src={iconFolder} alt="Menu item" />
                    <span className={"flex-1 ml-2 text-left text-[14px]"}>***Giấy báo có</span>
                  </NavLink>
                </> : <></>
            }
          </div>
        </div>

      </div>
    </div>
  );
};

export default LinkMenuLeftSideBar;