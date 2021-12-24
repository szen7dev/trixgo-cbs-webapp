import { FC } from "react";

import fakeThumbnail from "assets/images/avatar.jpg";
import iconFolder from "assets/images/icons8-application-window-100.png";
import { Link } from 'react-router-dom';
import { useAuth } from "services/hooks/useAuth";

const LinkMenuLeftSideBar: FC = () => {
    const { user } = useAuth();

  return (
    <div className="t-leftsidebar-navigation t-leftsidebar-navigation-type2 fixed left-0 top-14 bottom-0 transition-all duration-500 ease-out border-r border-secondary-light z-10 bg-primary-light">
      <div className="t-leftsidebar-navigation-container overflow-auto transition-all duration-500 ease-out">
        {/* title */}
        <div className="t-leftsidebar-title flex items-center py-5 pl-8 pr-3 text-[14px] font-bold">
        <img src={user?.image ? `${process.env.REACT_APP_URL_S3_USER}/${user?.image}` : fakeThumbnail} alt="Thumbnail" className="w-10 h-10 rounded-full mr-3" />
          <span>Quản lý dự án</span>
        </div>

        {/* menu block */}
        <div className="t-link-menu-container">
          <Link to={`/pcm/project/home`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px] active">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Trang chủ</span>
          </Link>
          <Link to={`/pcm/project/dashboard`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Báo cáo quản trị</span>
          </Link>
          <Link to={`/pcm/project/folder`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Thư mục dữ liệu</span>
          </Link>
          <Link to={`/pcm/project/schedule`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Tiến độ</span>
          </Link>
          <Link to={`/pcm/project/budget`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Ngân sách</span>
          </Link>
          <Link to={`/pcm/project/bidding`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Lựa chọn nhà thầu</span>
          </Link>
          <Link to={`/pcm/project/payment`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Thanh toán</span>
          </Link>
          <Link to={`/pcm/project/document`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Hồ sơ văn bản</span>
          </Link>
          <Link to={`/pcm/project/photo`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Hình ảnh</span>
          </Link>
          <Link to={`/pcm/project/drawing`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Bản vẽ</span>
          </Link>
          <Link to={`/pcm/project/rfi`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Yêu cầu thông tin</span>
          </Link>
          <Link to={`/pcm/project/rfa`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Đệ trình phê duyệt</span>
          </Link>
          <Link to={`/pcm/project/punch`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Yêu cầu sửa chữa</span>
          </Link>
          <Link to={`/pcm/project/inspection`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Nghiệm thu chất lượng</span>
          </Link>
          <Link to={`/pcm/project/resource`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Quản lý vật tư</span>
          </Link>
          <Link to={`/pcm/project/mom`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Họp</span>
          </Link>
          <Link to={`/pcm/project/report`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Báo cáo</span>
          </Link>
          <Link to={`/pcm/project/directory`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Danh bạ</span>
          </Link>
          <Link to={`/pcm/project/other`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Khác</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LinkMenuLeftSideBar;
