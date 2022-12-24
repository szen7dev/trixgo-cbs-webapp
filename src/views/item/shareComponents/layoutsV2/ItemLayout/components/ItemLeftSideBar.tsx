import { FC } from "react";

import fakeThumbnail from "assets/images/avatar.jpg";
import { NavLink } from "react-router-dom";
import { useAuth } from "services/hooks/auth/useAuth";

export const ItemLeftSideBar: FC = () => {
  const { user } = useAuth();

  return (
    <div className="t-leftsidebar-navigation t-leftsidebar-navigation-v2 t-leftsidebar-navigation-type2 fixed left-64px top-14 bottom-0 transition-all duration-500 ease-out border-secondary-light z-10 bg-primary-light">
      <div className="t-leftsidebar-navigation-container-v2  overflow-auto transition-all duration-500 ease-out p-3">

        {/* menu block */}
        <div className="t-link-menu-container">
          <NavLink
            to="/item/contact"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Danh bạ"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Danh bạ công ty</span>
          </NavLink>
          <NavLink
            to="/item/storage"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Danh bạ"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Dụng cụ lưu trữ hồ sơ</span>
          </NavLink>
          <NavLink
            to="/item/goods"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Goods"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Hàng hóa, nguyên vật liệu, công cụ dụng cụ, tài sản</span>
          </NavLink>
          <NavLink
            to="/item/fundas"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Fundas"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Đơn vị cơ sở</span>
          </NavLink>
          <NavLink
            to="/item/home/1"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Lĩnh vực hồ sơ"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Lĩnh vực hồ sơ</span>
          </NavLink>
          <NavLink
            to="/item/home/2"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Phân loại hồ sơ"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Phân loại hồ sơ</span>
          </NavLink>
          <NavLink
            to="/item/home/3"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Lĩnh vực kinh doanh"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Lĩnh vực kinh doanh</span>
          </NavLink>
          <NavLink
            to="/item/home/4"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Phân loại khách hàng"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Phân loại khách hàng</span>
          </NavLink>
          <NavLink
            to="/item/home/5"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Tính chất công việc"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Tính chất công việc</span>
          </NavLink>
          <NavLink
            to="/item/home/6"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Trình độ nhân sự"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Trình độ nhân sự</span>
          </NavLink>
          <NavLink
            to="/item/home/7"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Chuyên ngành nhân sự"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Chuyên ngành nhân sự</span>
          </NavLink>
          <NavLink
            to="/item/home/8"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Loại hợp đồng lao động"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Loại hợp đồng lao động</span>
          </NavLink>
          <NavLink
            to="/item/home/9"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Tình trạng làm việc"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Tình trạng làm việc</span>
          </NavLink>
          <NavLink
            to="/item/home/10"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Thâm niên công tác"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Thâm niên công tác</span>
          </NavLink>
          <NavLink
            to="/item/home/11"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Phân loại giai đoạn CRM"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Phân loại giai đoạn CRM</span>
          </NavLink>
          <NavLink
            to="/item/home/12"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Hồ sơ chi tiết CRM"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Hồ sơ chi tiết CRM</span>
          </NavLink>
          <NavLink
            to="/item/home/13"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Chức vụ nhân sự"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Chức vụ nhân sự</span>
          </NavLink>
          <NavLink
            to="/item/home/14"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Loại chứng chỉ nhân sự"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Loại chứng chỉ nhân sự</span>
          </NavLink>
          <NavLink
            to="/item/home/15"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Nội dung chứng chỉ nhân sự"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Nội dung chứng chỉ nhân sự</span>
          </NavLink>
          <NavLink
            to="/item/home/16"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Công nợ hợp đồng"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Công nợ hợp đồng</span>
          </NavLink>
          <NavLink
            to="/item/home/17"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Nguyên nhân phát sinh"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Nguyên nhân phát sinh</span>
          </NavLink>
          <NavLink
            to="/item/home/18"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Nguyên nhân thất bại"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Nguyên nhân thất bại</span>
          </NavLink>
          <NavLink
            to="/item/home/19"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Các lỗi hay gặp"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Các lỗi hay gặp</span>
          </NavLink>
          <NavLink
            to="/item/home/20"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Đánh giá chất lượng"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Đánh giá chất lượng</span>
          </NavLink>
          <NavLink
            to="/item/home/21"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="NPS-Điểm số"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>NPS-Dịch vụ</span>
          </NavLink>
          <NavLink
            to="/item/home/22"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="NPS-Điểm số"
          >
            <img
              width={'20px'}
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Chiến dịch</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};