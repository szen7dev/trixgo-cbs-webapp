import { FC } from "react";
import { useLocation } from "react-router-dom";

import cn from "classnames";

type Props = {
  pathname?: string;
  className?: string;
};

const CubeIcon: FC<Props> = ({ pathname, className }) => {
  const location = useLocation();
  const { pathname: currentPathname } = location;
  const page = currentPathname.split("/")[1];

  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        className={cn("fill-current", {
          "text-secondary-gray": !pathname || pathname !== page,
          "text-accent": pathname && pathname === page,
        })}
        d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
      />
      <path
        className={cn("fill-current", {
          "text-dark": !pathname || pathname !== page,
          "text-primary": pathname && pathname === page,
        })}
        d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
      />
      <path
        className={cn("fill-current", {
          "text-primary-gray": !pathname || pathname !== page,
          "text-secondary": pathname && pathname === page,
        })}
        d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
      />
    </svg>
  );
};

export default CubeIcon;
