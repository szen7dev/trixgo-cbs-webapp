import { ReactNode, FC, useState } from "react";

type Props = {
  children: ReactNode;
  tooltip: string;
};

const Popover: FC<Props> = ({ children, tooltip }) => {
  const [isShowPopover, setIsShowPopover] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsShowPopover(true)}
      onMouseLeave={() => setIsShowPopover(false)}
    >
      {children}
      {isShowPopover && (
        <div
          className="absolute right-0 -bottom-10 w-max bg-dark bg-opacity-75 text-sm text-primary-light rounded-lg z-10 p-2"
          onMouseEnter={() => setIsShowPopover(false)}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default Popover;
