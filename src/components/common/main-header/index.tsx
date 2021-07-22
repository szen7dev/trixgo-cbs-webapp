import { FC } from "react";

import { useModal } from "services/hooks/useModal";

import MainSearchDialog from "components/common/MainSearchDialog";
import MessagesMenu from "./MessagesMenu";
import NotificationsMenu from "./NotificationsMenu";
import UserMenu from "./UserMenu";
import SearchIcon from "assets/icons/Search";
import ViewGridIcon from "assets/icons/ViewGrid";

const MainHeader: FC = () => {
  const { openModal } = useModal();

  return (
    <header className="sticky top-0 bg-primary-light border-b border-solid border-secondary-light shadow-sm z-30">
      <div className="px-4 lg:px-8">
        <div className="flex items-center justify-end h-16 -mb-px">
          {/* Header: Right side */}
          <div className="flex items-center">
            <button
              aria-controls="search-modal"
              className="w-8 h-8 flex items-center justify-center bg-lighter-gray hover:bg-secondary-light transition duration-150 rounded-full focus:outline-none ml-3"
              onClick={() =>
                openModal(
                  <div className="inline-block w-2/5 overflow-hidden align-top transition-all transform bg-primary-light shadow-xl rounded mt-28">
                    <MainSearchDialog />
                  </div>
                )
              }
            >
              <SearchIcon className="w-4 h-4" />
            </button>

            <MessagesMenu />

            <NotificationsMenu />

            <button className="relative w-8 h-8 flex items-center justify-center bg-lighter-gray hover:bg-secondary-light transition duration-150 rounded-full focus:outline-none ml-3">
              <ViewGridIcon className="w-4 h-4 text-primary-gray" />
            </button>

            {/*  Divider */}
            <hr className="w-px h-6 bg-secondary-light mx-3" />

            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
