import { FC } from "react";
import icon1 from "assets/images/RightSideBarIcon/icons8-help-48.png";
import icon2 from "assets/images/RightSideBarIcon/icons8-reserve-48.png";
import icon3 from "assets/images/RightSideBarIcon/icons8-todo-list-48.png";
import icon4 from "assets/images/RightSideBarIcon/icons8-name-48.png";
import icon5 from "assets/images/RightSideBarIcon/icons8-available-updates-50.png";
import icon6 from "assets/images/RightSideBarIcon/icons8-rocket-24.png";
import chatIcon from "assets/images/RightSideBarIcon/icons8-edit-chat-history-48.png";

const TaskManagementRightSideBar: FC = () => {
  return (
    <div className="tm-right-sidebar transition-all duration-500 ease-out fixed top-16 bottom-0 right-0 border-l border-secondary-light w-12">
      <div className="flex items-center flex-col">
        <a className="mt-4" href="/">
          <img
            className="w-6 h-6 object-contain"
            src={icon1}
            alt="Left side bar"
          />
        </a>
        <a className="mt-4" href="/">
          <img
            className="w-6 h-6 object-contain"
            src={icon2}
            alt="Left side bar"
          />
        </a>
        <a className="mt-4" href="/">
          <img
            className="w-6 h-6 object-contain"
            src={icon3}
            alt="Left side bar"
          />
        </a>
        <a className="mt-4" href="/">
          <img
            className="w-6 h-6 object-contain"
            src={icon4}
            alt="Left side bar"
          />
        </a>
        <a className="mt-4" href="/">
          <img
            className="w-6 h-6 object-contain"
            src={icon5}
            alt="Left side bar"
          />
        </a>
        <a className="mt-4" href="/">
          <img
            className="w-6 h-6 object-contain"
            src={icon6}
            alt="Left side bar"
          />
        </a>
      </div>
      <div className="absolute left-0 bottom-16 w-full">
        <div className="text-center">
          <button className="relative mb-4">
            <img
              className="w-9 h-9 rounded-full"
              src="https://s120-ava-talk.zadn.vn/0/3/a/a/3/120/5969a751f836b7a12687ae71350086d8.jpg"
              alt="Avartar"
            />
            <span className="tm-right-sidebar-chat-item-online border border-accent-light w-2 h-2 absolute bottom-0 right-1 rounded-full"></span>
          </button>
          <button className="relative mb-4">
            <img
              className="w-9 h-9 rounded-full"
              src="https://s120-ava-talk.zadn.vn/0/3/a/a/3/120/5969a751f836b7a12687ae71350086d8.jpg"
              alt="Avartar"
            />
            <span className="tm-right-sidebar-chat-item-online border border-accent-light w-2 h-2 absolute bottom-0 right-1 rounded-full"></span>
          </button>
          <button className="relative mb-4">
            <img
              className="w-9 h-9 rounded-full"
              src="https://s120-ava-talk.zadn.vn/0/3/a/a/3/120/5969a751f836b7a12687ae71350086d8.jpg"
              alt="Avartar"
            />
            <span className="tm-right-sidebar-chat-item-online border border-accent-light w-2 h-2 absolute bottom-0 right-1 rounded-full"></span>
          </button>
          <button className="relative mb-4">
            <img
              className="w-9 h-9 rounded-full"
              src="https://s120-ava-talk.zadn.vn/0/3/a/a/3/120/5969a751f836b7a12687ae71350086d8.jpg"
              alt="Avartar"
            />
            <span className="tm-right-sidebar-chat-item-online border border-accent-light w-2 h-2 absolute bottom-0 right-1 rounded-full"></span>
          </button>
        </div>
        <button className="block ml-auto mr-auto">
          <img
            className="tm-right-sidebar-chat-icon w-6"
            src={chatIcon}
            alt="Chat"
          />
        </button>
      </div>
    </div>
  );
};

export default TaskManagementRightSideBar;
