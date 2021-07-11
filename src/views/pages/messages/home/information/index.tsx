import { Dispatch, SetStateAction, FC } from "react";

import GroupMembers from "./GroupMembers";
import GroupNews from "./GroupNews";
import ImagesVideosInformation from "./ImagesVideos";
import FilesInformation from "./Files";
import LinksInformation from "./Links";
import OtherSettings from "./OtherSettings";
import XIcon from "assets/icons/X";
import PencilAltIcon from "assets/icons/PencilAlt";

type Props = {
  handleInformationCb: Dispatch<SetStateAction<boolean>>;
};

const MessageInfo: FC<Props> = ({ handleInformationCb }) => {
  return (
    <aside className="page-sidebar-height flex flex-col w-[500px] border-l border-solid border-secondary-light">
      <header className="flex justify-between items-center py-6 px-5">
        <span className="font-semibold text-2xl">Thông tin hội thoại</span>

        <button
          className="relative w-8 h-8 flex items-center justify-center bg-lighter-gray hover:bg-secondary-light transition duration-150 rounded-full focus:outline-none"
          onClick={() => handleInformationCb(false)}
        >
          <XIcon className="w-4 h-4 text-primary-gray" />
        </button>
      </header>

      {/* Header info */}
      <div className="border-b-6 border-solid border-secondary-light pb-3">
        <div className="flex justify-center items-center cursor-pointer my-3">
          <div className="flex flex-wrap w-[52px] h-[52px]">
            <div
              className="w-6 h-6 rounded-full text-xs bg-no-repeat bg-cover mb-1"
              style={{
                backgroundImage:
                  "url(https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg)",
                backgroundPosition: "50%",
              }}
            />
            <div
              className="w-6 h-6 rounded-full text-xs bg-no-repeat bg-cover mb-1 ml-1"
              style={{
                backgroundImage:
                  "url(https://s120-ava-talk.zadn.vn/1/e/7/3/5/120/b3fbae654335aec95c35e350a5850017.jpg)",
                backgroundPosition: "50%",
              }}
            />
            <div
              className="w-6 h-6 rounded-full text-xs bg-no-repeat bg-cover mb-1"
              style={{
                backgroundImage:
                  "url(https://s120-ava-talk.zadn.vn/7/9/0/2/45/120/f573ead9e85e2e06ac3b86072ffc8e4e.jpg)",
                backgroundPosition: "50%",
              }}
            />
            <div className="w-6 h-6 rounded-full text-center text-sm leading-6 bg-lighter-gray mb-1 ml-1">
              7
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center cursor-pointer my-3">
          <div className="truncate text-lg font-semibold break-words">
            Thành viên Trixgo
          </div>
          <button className="relative w-6 h-6 flex items-center justify-center bg-lighter-gray hover:bg-secondary-light transition duration-150 rounded-full focus:outline-none ml-3">
            <PencilAltIcon className="w-4 h-4 text-primary-gray" />
          </button>
        </div>
      </div>

      <div className="w-full">
        <GroupMembers />

        <GroupNews />

        <ImagesVideosInformation />

        <FilesInformation />

        <LinksInformation />

        <OtherSettings />
      </div>
    </aside>
  );
};

export default MessageInfo;
