import { FC } from "react";

import AddNewTaskDialog from "components/common/add-new-task-dialog";
import { useModal } from "services/hooks/useModal";

import icon1 from "assets/images/icons8-star-96.png";
import icon2 from "assets/images/icons8-checklist-96.png";
import icon3 from "assets/images/icons8-note-100.png";
import icon4 from "assets/images/icons8-user-manual-64.png";
import icon5 from "assets/images/icons8-bill-96.png";
import icon6 from "assets/images/icons8-calendar-128.png";
import chatIcon from "assets/images/icons8-create-48.png";
import fakeThumbnail from "assets/images/fake-user.png";
import iconPlus from "assets/images/icons8-plus-math-24.png";

import { Link } from 'react-router-dom';

type Props = {
  openNewChatbox: () => void,
}

const HomeRightSideBar: FC<Props> = (props: Props) => {
  const { openModal } = useModal();
  return (
    <div className="tm-right-sidebar transition-all duration-500 ease-out fixed top-16 bottom-0 right-0 border-l border-secondary-light z-5">
      <div className="flex items-center flex-col">
        <button
          onClick={() =>
            openModal(
              <div className="t-add-new-task-dialog text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block">
                <AddNewTaskDialog />
              </div>
            )
          }
          className="t-right-sidebar-btn-add w-10 h-10 rounded-full bg-secondary-light hover:bg-accent-light mt-14"
        >
          <img src={iconPlus} alt="Thumbnail" className="w-6 h-6 mr-auto ml-auto rounded-full filter-blue" />
        </button>
        <Link to={`/`} className="mt-4">
            <img
              className="w-6 h-6 object-contain"
              src={icon6}
              alt="Left side bar"
            />
				</Link>
        <Link to={`/pcm/mine`} className="mt-4">
            <img
              className="w-6 h-6 object-contain"
              src={icon2}
              alt="Left side bar"
            />
				</Link>
        <Link to={`/pcm/bookmark`} className="mt-4">
            <img
              className="w-6 h-6 object-contain"
              src={icon1}
              alt="Left side bar"
            />
				</Link>
        <Link to={`/`} className="mt-4">
            <img
              className="w-6 h-6 object-contain"
              src={icon3}
              alt="Left side bar"
            />
				</Link>
        <Link to={`/`} className="mt-4">
            <img
              className="w-6 h-6 object-contain"
              src={icon4}
              alt="Left side bar"
            />
				</Link>
        <Link to={`/`} className="mt-4">
            <img
              className="w-6 h-6 object-contain"
              src={icon5}
              alt="Left side bar"
            />
				</Link>
      </div>
      <div className="absolute left-0 bottom-16 w-full">
        <div className="text-center">
          <button className="block ml-auto mr-auto relative mb-4">
            <img className="w-10 h-10 rounded-full" src={fakeThumbnail} alt="Avartar" />
          </button>
          <button className="block ml-auto mr-auto relative mb-4">
            <img className="w-10 h-10 rounded-full" src={fakeThumbnail} alt="Avartar" />
          </button>
          <button className="block ml-auto mr-auto relative mb-4">
            <img className="w-10 h-10 rounded-full" src={fakeThumbnail} alt="Avartar" />
          </button>
          <button className="block ml-auto mr-auto relative mb-4">
            <img className="w-10 h-10 rounded-full" src={fakeThumbnail} alt="Avartar" />
          </button>
        </div>
        <button onClick={() => props.openNewChatbox()} className="block ml-auto mr-auto tm-right-sidebar-chat-btn w-10 h-10 rounded-full">
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
