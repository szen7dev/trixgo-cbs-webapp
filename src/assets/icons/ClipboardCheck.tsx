import { FC } from "react";
import { useLocation } from "react-router-dom";

import cn from "classnames";

type Props = {
  pathname?: string;
  className?: string;
};

const ClipboardCheckIcon: FC<Props> = ({ pathname, className }) => {
  const location = useLocation();
  const { pathname: currentPathname } = location;
  const page = currentPathname.split("/")[1];

  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        className={cn("fill-current", {
          "text-primary-gray": !pathname || pathname !== page,
          "text-secondary": pathname && pathname === page,
        })}
        d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z"
      />
      <path
        className={cn("fill-current", {
          "text-primary-gray": !pathname || pathname !== page,
          "text-secondary": pathname && pathname === page,
        })}
        d="M1 1h22v23H1z"
      />
      <path
        className={cn("fill-current", {
          "text-secondary-gray": !pathname || pathname !== page,
          "text-primary": pathname && pathname === page,
        })}
        d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z"
      />
    </svg>
  );
};

export default ClipboardCheckIcon;
