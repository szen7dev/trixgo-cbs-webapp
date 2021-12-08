import { FC } from "react";

import AddIcon from "assets/images/icon-add.svg";

type Props = {
  title: string;
};

const HumanInfoHeader: FC<Props> = (props) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="flex items-center text-bold text-primary-gray text-lg">
          {props.title}
        </span>
        <button className="flex justify-center items-center w-24 h-10 bg-accent-light rounded">
          <img src={AddIcon} alt="Add" />
          <span className="ml-2 text-primary">Thêm</span>
        </button>
      </div>
    </div>
  );
};

export default HumanInfoHeader;
