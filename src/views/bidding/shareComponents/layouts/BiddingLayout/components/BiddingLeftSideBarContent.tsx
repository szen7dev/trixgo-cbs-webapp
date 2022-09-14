import plusIcon from "assets/images/icons8-plus-math-96.svg";
import { FC } from "react";

import { NavLink } from "react-router-dom";

/*=====6.HOOKS/APIS=====*/
import { useDispatch } from "react-redux";
import { resetFilterDashboard } from "redux/reducer/DashboardV2Slice";
import { useModal } from "services/hooks/useModal";
import { ModalAddNewTask } from "shareComponents/common";

export interface TabProps {
  label: string;
  icon: string;
  count: number;
  route: string;
}
interface Props {
  tabs: TabProps[];
}
export const BiddingLeftSideBarContent: FC<Props> = ({ tabs }) => {
  const { openModal } = useModal();
  const dispatch = useDispatch();

  const renderNav = (nav: { label: string; icon: string; count: number; route: string }) => {
    return (
      <NavLink
        key={nav.route}
        to={nav.route}
        className={
          "left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray"
        }
        onClick={() => dispatch(resetFilterDashboard({}))}
      >
        <img width={"20px"} src={nav.icon} alt={nav.label} />
        <span className={"flex-1 ml-2 text-left text-[14px]"}>{nav.label}</span>
        {nav.count > 0 && <span>{nav.count}</span>}
      </NavLink>
    );
  };
  return (
    <>
      <button
        onClick={() =>
          openModal(
            <div className="t-add-new-task-dialog text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block">
              <ModalAddNewTask />
            </div>
          )
        }
        className={
          "bg-cbs-blue-button rounded-md flex items-center justify-center text-xl text-primary-gray py-2 px-4"
        }
      >
        <img src={plusIcon} alt={"Tạo mới"} />
        <span className={"ml-2"}>Tạo mới</span>
      </button>

      <div className={"mt-4"}>{tabs.map((nav) => renderNav(nav))}</div>
    </>
  );
};
