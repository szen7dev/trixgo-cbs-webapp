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
          <span>CHG.THT.Xây dựng cụm trường Tiểu học và THCS Tây Hồ Tây</span>
        </div>
        {/* menu block */}
        <div className="t-link-menu-container">
          <Link to={`/pcm/project/12345/home`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px] active">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Trang chủ</span>
          </Link>
          <Link to={`/pcm/project/12345/dashboard`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Báo cáo quản trị</span>
          </Link>
          <Link to={`/pcm/project/12345/folder`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Thư mục dữ liệu</span>
          </Link>
          <Link to={`/pcm/project/12345/schedule`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Tiến độ</span>
          </Link>
          <Link to={`/pcm/project/12345/budget`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Ngân sách và kế hoạch</span>
          </Link>
          <Link to={`/pcm/project/12345/bidding`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Lựa chọn nhà thầu</span>
          </Link>
          <Link to={`/pcm/project/12345/payment`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Hồ sơ thanh toán</span>
          </Link>
          <Link to={`/pcm/project/12345/document`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Hồ sơ văn bản</span>
          </Link>
          <Link to={`/pcm/project/12345/photo`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Hình ảnh</span>
          </Link>
          <Link to={`/pcm/project/12345/drawing`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Bản vẽ</span>
          </Link>
          <Link to={`/pcm/project/12345/rfi`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Yêu cầu thông tin</span>
          </Link>
          <Link to={`/pcm/project/12345/rfa`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Đệ trình phê duyệt</span>
          </Link>
          <Link to={`/pcm/project/12345/inspection`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Nghiệm thu chất lượng</span>
          </Link>
          <Link to={`/pcm/project/12345/punch`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Yêu cầu sửa chữa</span>
          </Link>
          <Link to={`/pcm/project/12345/resource`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Quản lý vật tư</span>
          </Link>
          <Link to={`/pcm/project/12345/mom`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Họp</span>
          </Link>
          <Link to={`/pcm/project/12345/report`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Báo cáo</span>
          </Link>
          <Link to={`/pcm/project/12345/directory`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Danh bạ dự án</span>
          </Link>
          <Link to={`/pcm/project/12345/admin`} className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-[13px]">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Quản trị viên</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LinkMenuLeftSideBar;