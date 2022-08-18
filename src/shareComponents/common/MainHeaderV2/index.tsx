import React, {FC} from "react";
import fakeThumbnail from "../../../assets/images/company_default.png";
import {Link} from "react-router-dom";
import {AppsMenu} from "../AppsMenu";
import {UserMenu} from "../UserMenu";
import {useAuth} from "../../../services/hooks/auth/useAuth";
import iconHelp from "../../../assets/images/icons8-help-48.svg";

type HeaderProps = {
    headerTitle: string;
}
export const MainHeaderV2:FC<HeaderProps> = ({children, headerTitle}) => {
    const { user } = useAuth();

    return (
        <header className="home-header relative top-0 transition-all duration-500 ease-out bg-primary-light z-30">
            <div className="pr-4 lg:pr-8">
                <div className="flex items-center justify-between h-14 -mb-px">
                    {/* Header: Left side */}
                    <div className="flex items-center whitespace-nowrap min-w-[256px] max-w-[256px] w-[256px]">
                        <div className="t-header-company-name flex items-center pl-4 lg-pl-8">
                            <Link to={`/`}>
                                <img src={user?.company?.image ? `${process.env.REACT_APP_URL_S3_COMPANY}/${user?.company.image}` : fakeThumbnail} alt={user?.company?.name} className="w-10 h-10" />
                            </Link>
                            <div className="flex items-center truncate ml-2 text-2xl text-primary-gray">
                                {headerTitle}
                            </div>
                        </div>
                    </div>
                    <div className={"flex-1 flex items-center justify-between"}>
                        {children}
                    </div>
                    {/* Header: Right side */}
                    <div className="flex items-center">
                        {/* Search menu */}
                        <Link to={`/`} className="">
                            <img src={iconHelp} alt="Help" className="w-6 h-6 filter-secondary-gray" />
                        </Link>
                        <AppsMenu />
                        <UserMenu />
                    </div>
                </div>
            </div>
        </header>
    )
}