import { FC } from "react";
import { useLocation } from "react-router-dom";

import cn from "classnames";

type Props = {
  pathname?: string;
  className?: string;
};

const ViewGridIcon: FC<Props> = ({ pathname, className }) => {
  const location = useLocation();
  const { pathname: currentPathname } = location;
  const page = currentPathname.split("/")[1];

  return (
    <svg viewBox="0 0 24 24" className={className}>
      <circle
        className={cn("fill-current", {
          "text-secondary-gray": !pathname || pathname !== page,
          "text-primary": pathname && pathname === page,
        })}
        cx="18.5"
        cy="5.5"
        r="4.5"
      />
      <circle
        className={cn("fill-current", {
          "text-primary-gray": !pathname || pathname !== page,
          "text-secondary": pathname && pathname === page,
        })}
        cx="5.5"
        cy="5.5"
        r="4.5"
      />
      <circle
        className={cn("fill-current", {
          "text-primary-gray": !pathname || pathname !== page,
          "text-secondary": pathname && pathname === page,
        })}
        cx="18.5"
        cy="18.5"
        r="4.5"
      />
      <circle
        className={cn("fill-current", {
          "text-secondary-gray": !pathname || pathname !== page,
          "text-primary": pathname && pathname === page,
        })}
        cx="5.5"
        cy="18.5"
        r="4.5"
      />
    </svg>
  );
};

export default ViewGridIcon;
