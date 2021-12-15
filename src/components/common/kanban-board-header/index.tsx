import { FC } from "react";

import iconComputer from "assets/images/icons8-computer-algorithm-with-connected-notes-diagram-96.png";
import iconCaretDown from "assets/images/icon-caret-down.png";
import iconDownload from "assets/images/icons8-download-48_2.png";
import iconPrint from "assets/images/icons8-print-32.png";
import iconSendEmail from "assets/images/icons8-send-email-32.png";
import iconBullet from "assets/images/icons8-bulleted-list-32.png";
import iconFilter from "assets/images/icons8-filter-96.png";

const KanbanBoardHeader: FC = () => {

  return (
    <header className="home-header kanban-board-header h-20 flex items-center justify-between px-5 relative top-0 transition-all duration-500 ease-out bg-primary-light border-b border-solid border-primary-border z-30">
      {/* Header: Left side */}
      <div className="kanban-board-header-col-left flex items-center">
        <img className="w-6 h-6 mr-4 object-contain" src={iconComputer} alt="Kanban board title" />
        <div className="kanban-board-header-text white-space-nowrap">
          <p className="text-dark font-bold truncate">Quy trình biên soạn và thương thảo hợp đồng cho Dự án</p>
          <div className="text-primary-gray truncate">CHG.THT.Xây dựng cụm trường Tiểu học và THCS Tây Hồ Tây</div>
        </div>
      </div>
      
      {/* Header: button area */}
      <div className="kanban-board-header-col-middle flex items-center">
        <button className="mr-5">
          <img className="w-6 h-6 object-contain" src={iconCaretDown} alt="Dropdown" />
        </button>
        <span className="kanban-board-header-col-middle-separate h-12 border-l border-solid border-primary-border"></span>
        <button className="filter-primary-gray ml-5">
          <img className="w-6 h-6 object-contain" src={iconDownload} alt="Download" />
        </button>
        <button className="filter-primary-gray ml-5">
          <img className="w-6 h-6 object-contain" src={iconPrint} alt="Print" />
        </button>
        <button className="filter-primary-gray ml-5">
          <img className="w-6 h-6 object-contain" src={iconSendEmail} alt="Send email" />
        </button>
      </div>

      {/* Header: Right side */}
      <div className="kanban-board-header-col-right flex items-center">
        <button className="relative w-10 h-10 mr-7 flex items-center justify-center bg-lighter-gray hover:bg-secondary-light rounded-md transition duration-150 focus:outline-none ml-6">
          <img src={iconFilter} alt="Filter" className="w-6 h-6 object-contain" />
        </button>
        <div className="kanban-board-header-btn-group flex">
          <button className="h-8 pl-1 pr-3 flex items-center text-[12px] text-primary-gray">
            <img src={iconBullet} alt="Bullet" className="w-6 h-6 object-contain mr-1" /> Tháng
          </button>
          <button className="h-8 pl-1 pr-3 flex items-center text-[12px] text-primary-gray">
            <img src={iconBullet} alt="Bullet" className="w-6 h-6 object-contain mr-1" /> Tuần
          </button>
        </div>
        <button className="kanban-board-header-btn-add-new border h-8 rounded border-solid border-primary-border pl-4 pr-4 ml-6 font-bold text-primary-light">Tạo mới</button>
      </div>
    </header>
  );
};

export default KanbanBoardHeader;
