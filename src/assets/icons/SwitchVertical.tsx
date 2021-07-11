import { FC } from "react";
import { useLocation } from "react-router-dom";

import cn from "classnames";

type Props = {
  pathname?: string;
  className?: string;
};

const SwitchVerticalIcon: FC<Props> = ({ pathname, className }) => {
  const location = useLocation();
  const { pathname: currentPathname } = location;
  const page = currentPathname.split("/")[1];

  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        className={cn("fill-current", {
          "text-secondary-gray": !pathname || pathname !== page,
          "text-secondary": pathname && pathname === page,
        })}
        d="M7 0l6 7H8v10H6V7H1z"
      />
      <path
        className={cn("fill-current", {
          "text-primary-gray": !pathname || pathname !== page,
          "text-primary": pathname && pathname === page,
        })}
        d="M18 7v10h5l-6 7-6-7h5V7z"
      />
    </svg>
  );
};

export default SwitchVerticalIcon;
