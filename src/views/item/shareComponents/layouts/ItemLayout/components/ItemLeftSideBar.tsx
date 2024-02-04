import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "services/hooks/auth/useAuth";
import iconFolder from "assets/images/bullet.svg";

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
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>ACC-Danh bạ</span>
          </NavLink>
          <NavLink
            to="/item/fundas"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Fundas"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>ACC-Đơn vị cơ sở</span>
          </NavLink>
          <NavLink
            to="/item/home/23"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Fundas"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>ACC-Khoản mục phí</span>
          </NavLink>
          <NavLink
            to="/item/goods"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Goods"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>SELL-Sản phẩm, dịch vụ</span>
          </NavLink>
          <NavLink
            to="/item/home/3"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Lĩnh vực kinh doanh"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>SELL-Lĩnh vực kinh doanh</span>
          </NavLink>
          <NavLink
            to="/item/home/24"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Lĩnh vực kinh doanh"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>SELL-Kênh bán hàng</span>
          </NavLink>
          <NavLink
            to="/item/home/22"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Chiến dịch"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>SELL-Chiến dịch</span>
          </NavLink>
          <NavLink
            to="/item/home/11"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Hành trình khách hàng"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>CR-Hành trình khách hàng</span>
          </NavLink>
          <NavLink
            to="/item/home/12"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Hồ sơ hành trình CRM"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>CR-Hồ sơ hành trình</span>
          </NavLink>
          <NavLink
            to="/item/home/19"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Các lỗi hay gặp"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>CR-Các lỗi hay gặp</span>
          </NavLink>
          <NavLink
            to="/item/storage"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Danh bạ"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>DOC-Dụng cụ lưu hồ sơ</span>
          </NavLink>

          <NavLink
            to="/item/home/1"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Lĩnh vực hồ sơ"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>DOC-Lĩnh vực hồ sơ</span>
          </NavLink>
          <NavLink
            to="/item/home/2"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Phân loại hồ sơ"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>DOC-Phân loại hồ sơ</span>
          </NavLink>
          {/* <NavLink
            to="/item/home/4"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Phân loại khách hàng"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Phân loại khách hàng</span>
          </NavLink> */}
          <NavLink
            to="/item/home/5"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Tính chất công việc"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>PCM-Tính chất công việc</span>
          </NavLink>
          <NavLink
            to="/item/home/6"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Trình độ nhân sự"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>HR-Trình độ nhân sự</span>
          </NavLink>
          <NavLink
            to="/item/home/7"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Chuyên ngành nhân sự"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>HR-Chuyên ngành</span>
          </NavLink>
          <NavLink
            to="/item/home/8"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Loại hợp đồng lao động"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>HR-Loại hợp đồng</span>
          </NavLink>
          <NavLink
            to="/item/home/9"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Tình trạng làm việc"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>HR-Tình trạng làm việc</span>
          </NavLink>
          <NavLink
            to="/item/home/10"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Thâm niên công tác"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>HR-Thâm niên công tác</span>
          </NavLink>
          <NavLink
            to="/item/home/13"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Chức vụ nhân sự"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>HR-Chức vụ nhân sự</span>
          </NavLink>
          <NavLink
            to="/item/home/14"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Phân loại chứng chỉ"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>HR-Phân loại chứng chỉ</span>
          </NavLink>
          <NavLink
            to="/item/home/15"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Nội dung chứng chỉ nhân sự"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>HR-Chứng chỉ nhân sự</span>
          </NavLink>
          <NavLink
            to="/item/home/16"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Công nợ hợp đồng"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>CM-Công nợ hợp đồng</span>
          </NavLink>
          <NavLink
            to="/item/home/17"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Nguyên nhân phát sinh"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>CM-Nguyên nhân phát sinh</span>
          </NavLink>
          {/* <NavLink
            to="/item/home/18"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Nguyên nhân thất bại"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Nguyên nhân thất bại</span>
          </NavLink> */}
          {/* <NavLink
            to="/item/home/20"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Đánh giá chất lượng"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Đánh giá chất lượng</span>
          </NavLink> */}
          {/* <NavLink
            to="/item/home/21"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="NPS-Điểm số"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Dịch vụ</span>
          </NavLink> */}
        </div>
      </div>
    </div>
  );
};