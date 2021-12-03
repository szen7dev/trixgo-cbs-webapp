import { FC } from "react";

import { map as _map } from "lodash";

import fakeThumbnail from "assets/images/thumbnail1.jpg";
import dollarIcon from "assets/images/icons8-us-dollar-80.png";
import chevronRight from "assets/images/icon-expand-arrow-right.png";
import iconFolder from "assets/images/icons8-application-window-100.png";
import icon3dots from "assets/images/icon-3dots.png";
import iconMissile from "assets/images/icon-missile.png";
import iconPlus from "assets/images/icons8-plus-math-24.png";

const HomeNavigation: FC = () => {
  return (
    <div className="t-leftsidebar-navigation fixed left-0 top-16 bottom-0 transition-all duration-500 ease-out border-r border-secondary-light z-10 bg-primary-light">
      <div className="t-leftsidebar-navigation-container overflow-auto transition-all duration-500 ease-out">
        {/* user */}
        <div className="t-leftsidebar-user flex items-center mb-5">
          <img src={fakeThumbnail} alt="Thumbnail" className="w-12 h-12 rounded-full mr-3" />
          <div className="t-leftsidebar-user-text">
            <p className="t-leftsidebar-user-text-name font-bold mb-1">Nguyễn Văn Tuấn-CBS</p>
            <div className="t-leftsidebar-user-text-price flex items-center">
              <img className="t-leftsidebar-user-text-price-currency mr-3 h-6 w-6" src={dollarIcon} alt="Dollar" />
              <span>đ 125.001.200 </span>
              <img className="t-leftsidebar-user-text-price-arrow h-3 ml-2" src={chevronRight} alt="Dollar" />
            </div>
          </div>
        </div>

        {/* menu block */}
        <div className="t-leftsidebar-menu-block mb-8">
          <p className="t-leftsidebar-menu-title mb-5">Quản trị doanh nghiệp</p>
          <div className="t-leftsidebar-menu-container">
            <a className="t-leftsidebar-menu-item flex items-center mb-5" href="/">
              <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
              <span className="truncate">Quản lý công việc</span>
            </a>
            <a className="t-leftsidebar-menu-item flex items-center mb-5" href="/">
              <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
              <span className="truncate">Quản lý hồ sơ</span>
            </a>
            <a className="t-leftsidebar-menu-item flex items-center mb-5" href="/">
              <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
              <span className="truncate">Quản lý nhân sự</span>
            </a>
            <a className="t-leftsidebar-menu-item flex items-center mb-5" href="/">
              <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
              <span className="truncate">Quản lý hợp đồng</span>
            </a>
          </div>
          <div className="t-leftsidebar-menu-showmore">
            <button className="t-leftsidebar-menu-showmore-btn flex items-center">
              <img className="h-1 mr-3" src={icon3dots} alt="Show more" /> Xem thêm
            </button>
          </div>
        </div>

        {/* friends group */}
        <div className="t-leftsidebar-friends">
          <span>Bạn bè</span>
          <div className="t-leftsidebar-friends-group">
            <div>
              <img src={fakeThumbnail} alt="Thumbnail" className="w-12 h-12 rounded-full border-2 border-primary-light" />
            </div>
            <div>
              <img src={fakeThumbnail} alt="Thumbnail" className="w-12 h-12 rounded-full border-2 border-primary-light" />
            </div>
            <div>
              <img src={fakeThumbnail} alt="Thumbnail" className="w-12 h-12 rounded-full border-2 border-primary-light" />
            </div>
            <div>
              <img src={fakeThumbnail} alt="Thumbnail" className="w-12 h-12 rounded-full border-2 border-primary-light" />
            </div>
            <div>
              <button>
                <img src={iconPlus} alt="Thumbnail" className="w-12 h-12 rounded-full" />
              </button>
            </div>
          </div>
        </div>

        {/* menu block */}
        <div className="t-leftsidebar-menu-block mb-8">
          <p className="t-leftsidebar-menu-title mb-5">Quản lý dự án</p>
          <div className="t-leftsidebar-menu-container">
            <a className="t-leftsidebar-menu-item flex items-center mb-5" href="/">
              <img className="w-6 h-6 object-contain mr-3" src={iconMissile} alt="Menu item" />
              <span className="truncate">CHG.THT.Xây dựng cụmm thông tin truyền thông và thiết bị</span>
            </a>
            <a className="t-leftsidebar-menu-item flex items-center mb-5" href="/">
              <img className="w-6 h-6 object-contain mr-3" src={iconMissile} alt="Menu item" />
              <span className="truncate">ARM.CAL.Apartmetn Quy</span>
            </a>
            <a className="t-leftsidebar-menu-item flex items-center mb-5" href="/">
              <img className="w-6 h-6 object-contain mr-3" src={iconMissile} alt="Menu item" />
              <span className="truncate">HAR.MAR.Court Yard By</span>
            </a>
          </div>
          <div className="t-leftsidebar-menu-showmore">
            <button className="t-leftsidebar-menu-showmore-btn flex items-center">
              <img className="h-1 mr-3" src={icon3dots} alt="Show more" /> Xem thêm
            </button>
          </div>
        </div>

        {/* menu block */}

      </div>
    </div>
  );
};

export default HomeNavigation;
