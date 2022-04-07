import { FC } from "react";

import fakeThumbnail from "assets/images/avatar.jpg";
import { NavLink } from "react-router-dom";
import { useAuth } from "services/hooks/auth/useAuth";

export const ItemLeftSideBar: FC = () => {
  const { user } = useAuth();

  return (
    <div className="t-leftsidebar-navigation t-leftsidebar-navigation-type2 fixed left-0 top-14 bottom-0 transition-all duration-500 ease-out border-r border-secondary-light z-10 bg-primary-light">
      <div className="t-leftsidebar-navigation-container overflow-auto transition-all duration-500 ease-out">
        {/* title */}
        <div className="t-leftsidebar-title flex items-center py-2 pl-3 pr-3 text-[14px] font-bold">
          <img
            src={
              user?.image
                ? `${process.env.REACT_APP_URL_S3_USER}/${user?.image}`
                : fakeThumbnail
            }
            alt="Thumbnail"
            className="w-10 h-10 rounded-full mr-3"
          />
          <span>{user?.bizfullname}</span>
        </div>

        {/* menu block */}
        <div className="t-link-menu-container">
          <NavLink
            to="/item/contact"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="Danh bạ"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">Danh bạ công ty</span>
          </NavLink>
          <NavLink
            to="/item/storage"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="Danh bạ"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">Dụng cụ lưu trữ</span>
          </NavLink>
          <NavLink
            to="/item/home/1"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="Lĩnh vực hồ sơ"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">Lĩnh vực hồ sơ</span>
          </NavLink>
          <NavLink
            to="/item/home/2"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="Tính chất hồ sơ"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">Tính chất hồ sơ</span>
          </NavLink>
          <NavLink
            to="/item/home/3"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="Lĩnh vực kinh doanh"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">Lĩnh vực kinh doanh</span>
          </NavLink>
          <NavLink
            to="/item/home/4"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="Phân loại khách hàng"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">Phân loại khách hàng</span>
          </NavLink>
          <NavLink
            to="/item/home/5"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="Phân loại công việc"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">Phân loại công việc</span>
          </NavLink>
          <NavLink
            to="/item/home/6"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="Trình độ nhân sự"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">Trình độ nhân sự</span>
          </NavLink>
          <NavLink
            to="/item/home/7"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="Chuyên ngành nhân sự"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">Chuyên ngành nhân sự</span>
          </NavLink>
          <NavLink
            to="/item/home/8"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="Loại hợp đồng lao động"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">Loại hợp đồng lao động</span>
          </NavLink>
          <NavLink
            to="/item/home/9"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="Tình trạng làm việc"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">Tình trạng làm việc</span>
          </NavLink>
          <NavLink
            to="/item/home/10"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="Thâm niên công tác"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">Thâm niên công tác</span>
          </NavLink>
          <NavLink
            to="/item/home/11"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="Phân loại giai đoạn CRM"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">Phân loại giai đoạn CRM</span>
          </NavLink>
          <NavLink
            to="/item/home/12"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="Hồ sơ chi tiết CRM"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">Hồ sơ chi tiết CRM</span>
          </NavLink>
          <NavLink
            to="/item/home/13"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="Chức vụ nhân sự"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">Chức vụ nhân sự</span>
          </NavLink>
          <NavLink
            to="/item/home/14"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="Loại chứng chỉ nhân sự"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">Loại chứng chỉ nhân sự</span>
          </NavLink>
          <NavLink
            to="/item/home/15"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="Nội dung chứng chỉ nhân sự"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">Nội dung chứng chỉ nhân sự</span>
          </NavLink>
          <NavLink
            to="/item/home/16"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="Công nợ hợp đồng"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">Công nợ hợp đồng</span>
          </NavLink>
          <NavLink
            to="/item/home/17"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="Nguyên nhân phát sinh"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">Nguyên nhân phát sinh</span>
          </NavLink>
          <NavLink
            to="/item/home/18"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="Nguyên nhân thất bại"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">Nguyên nhân thất bại</span>
          </NavLink>
          <NavLink
            to="/item/home/19"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="Các lỗi hay gặp"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">Các lỗi hay gặp</span>
          </NavLink>
          <NavLink
            to="/item/home/20"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="Đánh giá chất lượng"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">Đánh giá chất lượng</span>
          </NavLink>
          <NavLink
            to="/item/home/21"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="NPS-Điểm số"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">NPS-Điểm số</span>
          </NavLink>
          <NavLink
            to="/item/home/22"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="NPS-Lý do"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">NPS-Lý do</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};