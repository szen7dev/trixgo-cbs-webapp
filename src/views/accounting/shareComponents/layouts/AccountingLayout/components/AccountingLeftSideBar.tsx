import { FC } from "react";

import { NavLink, useParams } from 'react-router-dom';

import { useAuth } from "services/hooks/auth/useAuth";

import fakeThumbnail from "assets/images/avatar.jpg";
import iconFolder from "assets/images/icons8-application-window-100.png";

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
    <div className="t-leftsidebar-navigation t-leftsidebar-navigation-type2 fixed left-0 top-14 bottom-0 transition-all duration-500 ease-out border-r border-secondary-light z-10 bg-primary-light">
      <div className="t-leftsidebar-navigation-container overflow-auto transition-all duration-500 ease-out">
        {/* title */}
        <div className="t-leftsidebar-title flex items-center py-2 pl-3 pr-3 text-[14px] font-bold">
          <img src={user?.image ? `${process.env.REACT_APP_URL_S3_USER}/${user?.image}` : fakeThumbnail} alt="Thumbnail" className="w-10 h-10 rounded-full mr-3" />
          <span>Kế toán</span>
        </div>

        {/* menu block */}
        <div className="t-link-menu-container">
          <NavLink to={`/accounting/home`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Trang chủ</span>
          </NavLink>
          <div >
            {
              !menuItems.includes(fundaID) ? <><NavLink to={`/accounting/dashboard`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
                <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                <span className="truncate">Báo cáo quản trị</span>
              </NavLink>
                <NavLink to={`/accounting/${fundaID}/accbill`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
                  <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                  <span className="truncate">Phiếu kế toán</span>
                </NavLink>
                <NavLink to={`/accounting/${fundaID}/receipt`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
                  <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                  <span className="truncate">Phiếu thu</span>
                </NavLink>
                <NavLink to={`/accounting/${fundaID}/payment`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
                  <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                  <span className="truncate">Phiếu chi</span>
                </NavLink>
                <NavLink to={`/accounting/${fundaID}/goods-import`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
                  <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                  <span className="truncate">Phiếu nhập</span>
                </NavLink>
                <NavLink to={`/accounting/${fundaID}/goods-export`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
                  <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                  <span className="truncate">Phiếu xuất</span>
                </NavLink>
                <NavLink to={`/accounting/${fundaID}/invoices`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
                  <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                  <span className="truncate">Hóa đơn dịch vụ</span>
                </NavLink>
                <NavLink to={`/accounting/${fundaID}/debit-note`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
                  <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                  <span className="truncate">Giấy báo nợ</span>
                </NavLink>
                <NavLink to={`/accounting/${fundaID}/credit-note`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
                  <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                  <span className="truncate">Giấy báo có</span>
                </NavLink>
                <NavLink to={`/accounting/detail`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
                  <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                  <span className="truncate">Chi tiết tài khoản</span>
                </NavLink>
                <NavLink to={`/accounting/tbook`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
                  <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                  <span className="truncate">Tổng hợp tài khoản chữ T</span>
                </NavLink>
                <NavLink to={`/accounting/diary`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
                  <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                  <span className="truncate">Sổ nhật ký chung</span>
                </NavLink>
                <NavLink to={`/accounting/import-export`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
                  <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                  <span className="truncate">Nhập xuất tồn</span>
                </NavLink>
                <NavLink to={`/accounting/debt-tracking`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
                  <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                  <span className="truncate">Theo dõi công nợ</span>
                </NavLink>
                <NavLink to={`/accounting/vat`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
                  <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                  <span className="truncate">Bảng kê VAT</span>
                </NavLink>
                <NavLink to={`/accounting/financial-report`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
                  <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                  <span className="truncate">Báo cáo tài chính</span>
                </NavLink>
                <NavLink to={`/accounting/support-tools`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
                  <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                  <span className="truncate">Công cụ hỗ trợ</span>
                </NavLink>
                <NavLink to={`/accounting/admin`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
                  <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                  <span className="truncate">Quản trị ứng dụng</span>
                </NavLink></> : <></>
            }

          </div>
        </div>

      </div>
    </div>
  );
};

export default LinkMenuLeftSideBar;