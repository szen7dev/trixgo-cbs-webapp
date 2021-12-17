import { FC } from "react";

import fakeThumbnail from "assets/images/thumbnail1.jpg";
import dollarIcon from "assets/images/icons8-us-dollar-80.png";
import chevronRight from "assets/images/icon-expand-arrow-right.png";
import iconFolder from "assets/images/icons8-application-window-100.png";
import icon3dots from "assets/images/icon-3dots.png";
import iconBigFolder from "assets/images/icons8-opened-folder-240.png";
import { useAuth } from "services/hooks/useAuth";
import { Link } from 'react-router-dom';

const HomeNavigation: FC = () => {
  const { user } = useAuth();
  return (
    <div className="t-leftsidebar-navigation fixed left-0 top-14 bottom-0 transition-all duration-500 ease-out border-r border-secondary-light z-10 bg-primary-light">
      <div className="t-leftsidebar-navigation-container overflow-auto transition-all duration-500 ease-out">
        {/* user */}
        <div className="t-leftsidebar-user flex items-center mb-6">
          <img src={fakeThumbnail} alt="Thumbnail" className="w-10 h-10 rounded-full mr-3" />
          <div className="t-leftsidebar-user-text">
            <p className="t-leftsidebar-user-text-name font-bold mb-1">{user?.fullname}</p>
            <div className="t-leftsidebar-user-text-price flex items-center">
              <img className="t-leftsidebar-user-text-price-currency mr-3 h-6 w-6" src={dollarIcon} alt="Dollar" />
              <span>đ 125.001.200 </span>
              <img className="t-leftsidebar-user-text-price-arrow h-3 ml-2" src={chevronRight} alt="Dollar" />
            </div>
          </div>
        </div>

        {/* menu block */}
        <div className="t-leftsidebar-menu-block mb-6">
          <p className="t-leftsidebar-menu-title mb-5">Quản trị doanh nghiệp</p>
          <div className="t-leftsidebar-menu-container">
            {/* <a className="t-leftsidebar-menu-item flex items-center mb-4 text-primary-gray" href="/pcm/home" >
              <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
              <span className="truncate">Quản lý công việc</span>
            </a> */}
            <Link to={`/pcm/home`} className="t-leftsidebar-menu-item flex items-center mb-4 text-primary-gray">
              <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
              <span className="truncate">Quản lý công việc</span>
						</Link>
            <Link to={`/document/home`} className="t-leftsidebar-menu-item flex items-center mb-4 text-primary-gray">
              <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
              <span className="truncate">Quản lý hồ sơ</span>
						</Link>
            <Link to={`/cmcs/home`} className="t-leftsidebar-menu-item flex items-center mb-4 text-primary-gray" title="Contract Management Control System">
              <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
              <span className="truncate">Quản lý hợp đồng</span>
						</Link>
            <Link to={`/fin/home`} className="t-leftsidebar-menu-item flex items-center mb-4 text-primary-gray">
              <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
              <span className="truncate">Quản trị tài chính</span>
						</Link>
            <Link to={`/ppt`} className="t-leftsidebar-menu-item flex items-center mb-4 text-primary-gray">
              <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
              <span className="truncate">Quản lý dự án</span>
						</Link>
            {/* <a className="t-leftsidebar-menu-item flex items-center mb-6 text-primary-gray" href="/social/home">
              <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
              <span className="truncate">Quản lý truyền thông</span>
            </a> */}
            <Link to={`/social/home`} className="t-leftsidebar-menu-item flex items-center mb-4 text-primary-gray">
              <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
              <span className="truncate">Quản lý truyền thông</span>
						</Link>
            <Link to={`/human/home`} className="t-leftsidebar-menu-item flex items-center mb-4 text-primary-gray">
              <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
              <span className="truncate">Quản lý nhân sự</span>
						</Link>
            <Link to={`/accounting/accbill`} className="t-leftsidebar-menu-item flex items-center mb-4 text-primary-gray">
              <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
              <span className="truncate">Kế toán</span>
						</Link>
          </div>
          <div className="t-leftsidebar-menu-showmore">
            <button className="t-leftsidebar-menu-showmore-btn flex items-center">
              <img className="h-1 mr-3" src={icon3dots} alt="Show more" /> Xem thêm
            </button>
          </div>
        </div>

        {/* menu block */}
        {/* <div className="t-leftsidebar-menu-block mb-6">
          <p className="t-leftsidebar-menu-title mb-5">Danh sách dự án</p>
          <div className="t-leftsidebar-menu-container">
            <a className="t-leftsidebar-menu-item flex items-center mb-6 text-primary-gray" href="/">
              <img className="w-6 h-6 object-contain mr-3" src={iconMissile} alt="Menu item" />
              <span className="truncate">CHG.THT.Xây dựng cụmm thông tin truyền thông và thiết bị</span>
            </a>
            <a className="t-leftsidebar-menu-item flex items-center mb-6 text-primary-gray5" href="/">
              <img className="w-6 h-6 object-contain mr-3" src={iconMissile} alt="Menu item" />
              <span className="truncate">ARM.CAL.Apartmetn Quy</span>
            </a>
            <a className="t-leftsidebar-menu-item flex items-center mb-6 text-primary-gray" href="/">
              <img className="w-6 h-6 object-contain mr-3" src={iconMissile} alt="Menu item" />
              <span className="truncate">HAR.MAR.Court Yard By</span>
            </a>
          </div>
          <div className="t-leftsidebar-menu-showmore">
            <button className="t-leftsidebar-menu-showmore-btn flex items-center">
              <img className="h-1 mr-3" src={icon3dots} alt="Show more" /> Xem thêm
            </button>
          </div>
        </div> */}

        {/* customize data block */}
        <div className="t-leftsidebar-customize-data text-center">
          <img className="block ml-auto mr-auto mb-4 w-16 h-16" src={iconBigFolder} alt="Folder" />
          <div className="font-bold text-2xl text-dark mb-4" role="none">Tùy chỉnh dữ liệu?</div>
          <p className="text-secondary-gray mb-6">Tạo và sắp xếp các dữ liệu được quyền truy cập theo cách mà bạn mong muốn</p>
          <button className="font-bold text-[14px] bg-primary pt-3 pb-3 pl-4 pr-4 text-primary-light rounded">Thực hiện ngay</button>
        </div>

      </div>
    </div>
  );
};

export default HomeNavigation;
