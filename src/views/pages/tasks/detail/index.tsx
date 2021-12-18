import { FC } from "react";

import downloadIcon from "assets/images/icons8-download-48_2.png";
import shareIcon from "assets/images/icons8-share-rounded-96_1.svg";
import sendEmailIcon from "assets/images/icons8-send-email-96_1.svg";
import copyIcon from "assets/images/icons8-copy-96_1.svg"
import DotsVerticalIcon from "assets/icons/DotsVertical";
import iconPencil from 'assets/images/icons8-pencil.svg';
import removeIcon from "assets/images/icons8-remove.svg";
import iconPrint from "assets/images/icons8-print-32.png";

const TaskDetailPage: FC = () => {
  return (
    <>
      {/*_____________header______________*/}
      <div className="task-management-header flex items-center justify-between pt-2 pb-2 pl-5 pr-5 border-b border-secondary-light shadow">
        <div className="task-management-header-left-block flex items-center">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <span className="mx-5 text-primary-gray">|</span>
          <button className="mx-3">
            <img
              className="w-6 opacity-80"
              src={downloadIcon}
              alt="Download icon"
            />
          </button>
          <button className="mx-3">
            <img
              className="w-6"
              src={shareIcon}
              alt="Share icon"
            />
          </button>
          <button className="mx-3">
            <img
              className="w-6"
              src={copyIcon}
              alt="Copy icon"
            />
          </button>
          <button className="mx-3">
            <img
              className="w-6"
              src={sendEmailIcon}
              alt="Send email icon"
            />
          </button>
          <button className="mx-3">
            <img
              className="w-6"
              src={iconPencil}
              alt="Pencil icon"
            />
          </button>
          <button className="mx-3">
            <img
              className="w-6"
              src={removeIcon}
              alt="Remove icon"
            />
          </button>
          <button className="mx-3">
            <img
              className="w-6 opacity-80"
              src={iconPrint}
              alt="Print icon"
            />
          </button>
        </div>

        <div className="task-management-header-right-block flex items-center">
          <button className="w-10 h-10 flex justify-center items-center bg-lighter-gray rounded-full">
            <DotsVerticalIcon />
          </button>
        </div>
      </div>

      {/*_____________main content______________*/}
      <div></div>
    </>
  );
};

export default TaskDetailPage;
