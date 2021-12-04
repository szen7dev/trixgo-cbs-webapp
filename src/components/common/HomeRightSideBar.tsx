import { FC } from "react";
import icon1 from "assets/images/icons8-star-96.png";
import icon2 from "assets/images/icons8-checklist-96.png";
import icon3 from "assets/images/icons8-note-100.png";
import icon4 from "assets/images/icons8-user-manual-64.png";
import icon5 from "assets/images/icons8-bill-96.png";
import icon6 from "assets/images/icons8-calendar-128.png";
import chatIcon from "assets/images/icons8-create-48.png";
import fakeThumbnail from "assets/images/thumbnail1.jpg";

const HomeRightSideBar: FC = () => {
  return (
    <div className="tm-right-sidebar transition-all duration-500 ease-out fixed top-16 bottom-0 right-0 border-l border-secondary-light">
      <div className="flex items-center flex-col">
        <a className="mt-6" href="/">
          <img
            className="w-6 h-6 object-contain"
            src={icon1}
            alt="Left side bar"
          />
        </a>
        <a className="mt-6" href="/">
          <img
            className="w-6 h-6 object-contain"
            src={icon2}
            alt="Left side bar"
          />
        </a>
        <a className="mt-6" href="/">
          <img
            className="w-6 h-6 object-contain"
            src={icon3}
            alt="Left side bar"
          />
        </a>
        <a className="mt-6" href="/">
          <img
            className="w-6 h-6 object-contain"
            src={icon4}
            alt="Left side bar"
          />
        </a>
        <a className="mt-6" href="/">
          <img
            className="w-6 h-6 object-contain"
            src={icon5}
            alt="Left side bar"
          />
        </a>
        <a className="mt-6" href="/">
          <img
            className="w-6 h-6 object-contain"
            src={icon6}
            alt="Left side bar"
          />
        </a>
      </div>
      <div className="absolute left-0 bottom-20 w-full">
        <div className="text-center">
          <button className="block ml-auto mr-auto relative mb-4">
            <img className="w-12 h-12 rounded-full" src={fakeThumbnail} alt="Avartar" />
          </button>
          <button className="block ml-auto mr-auto relative mb-4">
            <img className="w-12 h-12 rounded-full" src={fakeThumbnail} alt="Avartar" />
          </button>
          <button className="block ml-auto mr-auto relative mb-4">
            <img className="w-12 h-12 rounded-full" src={fakeThumbnail} alt="Avartar" />
          </button>
          <button className="block ml-auto mr-auto relative mb-4">
            <img className="w-12 h-12 rounded-full" src={fakeThumbnail} alt="Avartar" />
          </button>
        </div>
        <button className="block ml-auto mr-auto tm-right-sidebar-chat-btn w-12 h-12 rounded-full">
          <img
            className="w-6 block ml-auto mr-auto"
            src={chatIcon}
            alt="Chat"
          />
        </button>
      </div>
    </div>
  );
};

export default HomeRightSideBar;
