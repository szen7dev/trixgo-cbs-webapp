import { FC } from "react";
import { Link } from 'react-router-dom';

import { AppsMenu, UserMenu } from "shareComponents/common";
import fakeThumbnail from "assets/images/company_default.png";
import { useAuth } from "services/hooks/auth/useAuth";

export const MainHeader: FC = () => {
  const { user } = useAuth();

  return (
    <header className="home-header relative top-0 transition-all duration-500 ease-out bg-primary-light border-b border-solid border-secondary-light shadow-sm z-30">
      <div className="px-4 lg:px-8 pl-10 lg:pl-10">
        <div className="flex items-center justify-between h-14 -mb-px">
          <div className="flex items-center whitespace-nowrap">
            <div className="t-header-company-name flex items-center">
              <img src={user?.company?.image ? `${process.env.REACT_APP_URL_S3_COMPANY}/${user?.company.image}` : fakeThumbnail} alt="Company avatar" className="w-10 h-10 rounded-full" />
              <div className="flex items-center truncate">
                <Link to={`/`} className="truncate ml-2 font-bold">
                  {user?.company?.name}
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <AppsMenu />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  )
}