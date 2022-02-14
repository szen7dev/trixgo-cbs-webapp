import { ReactNode, FC, useState } from "react";

type Props = {
  children: ReactNode;
  tooltip: string;
  classTooltip?: string
  onMouseEnterTooltip?: boolean
};

const Popover: FC<Props> = ({ children, tooltip, classTooltip, onMouseEnterTooltip = true }) => {
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
          className={`absolute right-0 -bottom-10 w-max bg-dark bg-opacity-75 text-sm text-primary-light rounded-lg z-10 p-2 ${classTooltip}`}
          onMouseEnter={() => {
            onMouseEnterTooltip && setIsShowPopover(false)
          }}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default Popover;
