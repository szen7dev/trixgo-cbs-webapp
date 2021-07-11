import { FC } from "react";
import { useLocation } from "react-router-dom";

import cn from "classnames";

type Props = {
  pathname?: string;
  className?: string;
};

const SparklesIcon: FC<Props> = ({ pathname, className }) => {
  const location = useLocation();
  const { pathname: currentPathname } = location;
  const page = currentPathname.split("/")[1];

  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        className={cn("fill-current", {
          "text-primary-gray": !pathname || pathname !== page,
          "text-primary": pathname && pathname === page,
        })}
        d="M20 7a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 0120 7zM4 23a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 014 23z"
      />
      <path
        className={cn("fill-current", {
          "text-secondary-gray": !pathname || pathname !== page,
          "text-secondary": pathname && pathname === page,
        })}
        d="M17 23a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 010-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1zM7 13a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 112 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z"
      />
    </svg>
  );
};

export default SparklesIcon;
