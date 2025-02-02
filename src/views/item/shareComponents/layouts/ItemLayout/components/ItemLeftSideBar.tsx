import { FC, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { useAuth } from "services/hooks/auth/useAuth";
import iconFolder from "assets/images/bullet.svg";
import { toast } from "react-toastify";
import { APP_ID } from "apis/localdb";
import { useCheckPerAccessApp, useGetListAppMenu, useGetListAppRoleMenu } from "services/hooks/auth/usePermissions"

export const ItemLeftSideBar: FC = () => {
  const { user } = useAuth();
  const history = useHistory();
  const { listAppMenu } = useGetListAppMenu({ appID: APP_ID.ITEM.id, parentID: APP_ID.ITEM.menuItemApp.id })
  const { hasPermission, isSuccess, dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.ITEM.id });
  const { listAppRoleMenu } = useGetListAppRoleMenu({ appID: APP_ID.ITEM.id, type: "1" })

  useEffect(() => {
  if (isSuccess && !(hasPermission)) {
    toast.error("Bạn không có quyền truy cập chức năng này. Vui lòng liên hệ ban quản trị.");
    history.push("/")
  }
}, [hasPermission]);

  return (
    <div className="t-leftsidebar-navigation t-leftsidebar-navigation-v2 t-leftsidebar-navigation-type2 fixed left-64px top-14 bottom-0 transition-all duration-500 ease-out border-secondary-light z-10 bg-primary-light">
      <div className="t-leftsidebar-navigation-container-v2  overflow-auto transition-all duration-500 ease-out p-3">

        {/* menu block */}
        <div className="t-link-menu-container">
          {hasPermission && dataUserAccess?.level == 0 ?
              <NavLink
              to={`/item/admin`}
              className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
              >
              <img width={'20px'} src={'/images/pcm/admin.png'} alt="Menu item" />
              <span className={"flex-1 ml-2 text-left text-[14px]"}>Quản trị ứng dụng</span>
              </NavLink> : <></>
          }

          {listAppMenu && listAppMenu.length ?
              <>
              {listAppMenu.map((item: any, index: number) => {
                  const roleApp = listAppRoleMenu.find((e: any) => e?._id?.menu == item?._id);
                  if (roleApp && roleApp.read >= 1) {
                  return (
                      <NavLink
                      key={index}
                      to={`/item/${item.slug}`}
                      className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray"
                      >
                      <img
                          width={'7px'}
                          src={iconFolder}
                          alt="Menu item"
                      />
                      <span className={"flex-1 ml-2 text-left text-[14px]"}>{item.name}</span>
                      </NavLink>
                  )
                  };
                  return <div key={index}></div>
              })
              }              
              </> : <></>
          }

          {/* <NavLink
            to="/item/contact"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Danh bạ"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>ACC-Danh bạ</span>
          </NavLink>
          <NavLink
            to="/item/fundas"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Fundas"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>ACC-Đơn vị cơ sở</span>
          </NavLink>
          <NavLink
            to="/item/home/23"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Fundas"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>ACC-Khoản mục phí</span>
          </NavLink>
          <NavLink
            to="/item/goods"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Goods"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>SELL-Sản phẩm, dịch vụ</span>
          </NavLink>
          <NavLink
            to="/item/home/3"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Lĩnh vực kinh doanh"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>SELL-Lĩnh vực kinh doanh</span>
          </NavLink>
          <NavLink
            to="/item/home/24"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Lĩnh vực kinh doanh"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>SELL-Kênh bán hàng</span>
          </NavLink>
          <NavLink
            to="/item/home/22"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Chiến dịch"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>SELL-Chiến dịch</span>
          </NavLink>
          <NavLink
            to="/item/home/11"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Hành trình trải nghiệm"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>CR-Hành trình trải nghiệm</span>
          </NavLink>
          <NavLink
            to="/item/home/12"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Hồ sơ hành trình CRM"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>CR-Hồ sơ hành trình</span>
          </NavLink>
          <NavLink
            to="/item/home/19"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Các lỗi hay gặp"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>CR-Các lỗi hay gặp</span>
          </NavLink>
          <NavLink
            to="/item/storage"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Danh bạ"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>DOC-Dụng cụ lưu hồ sơ</span>
          </NavLink>

          <NavLink
            to="/item/home/1"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Lĩnh vực hồ sơ"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>DOC-Lĩnh vực hồ sơ</span>
          </NavLink>
          <NavLink
            to="/item/home/2"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Phân loại hồ sơ"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>DOC-Phân loại hồ sơ</span>
          </NavLink>
          <NavLink
            to="/item/home/5"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Tính chất công việc"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>PCM-Tính chất công việc</span>
          </NavLink>
          <NavLink
            to="/item/home/6"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Trình độ nhân sự"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>HR-Trình độ nhân sự</span>
          </NavLink>
          <NavLink
            to="/item/home/7"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Chuyên ngành nhân sự"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>HR-Chuyên ngành</span>
          </NavLink>
          <NavLink
            to="/item/home/8"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Loại hợp đồng lao động"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>HR-Loại hợp đồng</span>
          </NavLink>
          <NavLink
            to="/item/home/9"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Tình trạng làm việc"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>HR-Tình trạng làm việc</span>
          </NavLink>
          <NavLink
            to="/item/home/10"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Thâm niên công tác"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>HR-Thâm niên công tác</span>
          </NavLink>
          <NavLink
            to="/item/home/13"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Chức vụ nhân sự"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>HR-Chức vụ nhân sự</span>
          </NavLink>
          <NavLink
            to="/item/home/14"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Loại chứng chỉ"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>HR-Loại chứng chỉ</span>
          </NavLink>
          <NavLink
            to="/item/home/15"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="HR-Nội dung chứng chỉ"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>HR-Nội dung chứng chỉ</span>
          </NavLink>
          <NavLink
            to="/item/home/16"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Công nợ hợp đồng"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>CM-Công nợ hợp đồng</span>
          </NavLink>
          <NavLink
            to="/item/home/17"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Nguyên nhân phát sinh"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>CM-Nguyên nhân phát sinh</span>
          </NavLink> */}
          {/* <NavLink
            to="/item/home/18"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Nguyên nhân thất bại"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>Nguyên nhân thất bại</span>
          </NavLink> */}
          {/* <NavLink
            to="/item/home/20"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="Đánh giá chất lượng"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>Đánh giá chất lượng</span>
          </NavLink> */}
          {/* <NavLink
            to="/item/home/21"
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            title="NPS-Điểm số"
          >
             <img  width={'7px'} src={iconFolder}  alt="Menu item"/>
            <span className={"flex-1 ml-2 text-left text-[13px]"}>Dịch vụ</span>
          </NavLink> */}
        </div>
      </div>
    </div>
  );
};