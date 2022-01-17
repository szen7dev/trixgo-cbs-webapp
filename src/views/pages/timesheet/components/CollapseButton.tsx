import { FC } from "react";
// import { useDispatch } from "react-redux";
// import { setChildRowCollapsed } from "redux/reducer/Timesheet";

type Props = {
  collapsed: boolean;
  index: string | number;
  idDetail: string | number;
};

const CollapseButton: FC<Props> = ({ collapsed, index, idDetail }) => {
  // const dispatch = useDispatch();

  return (
    <button
      className={
        "rounded mb-1 block w-5 h-5 " +
        (collapsed ? "bg-gray-600" : "bg-white text-gray-600")
      }
      onClick={() => {
        // dispatch(
        //   setChildRowCollapsed({ _id: idDetail, index, collapsed: !collapsed })
        // );
      }}
    >
      {collapsed ? "+" : "-"}
    </button>
  );
};

export default CollapseButton;
