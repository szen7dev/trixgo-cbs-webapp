import { FC } from "react";
import { useLocation } from "react-router-dom";

import cn from "classnames";

type Props = {
  pathname?: string;
  className?: string;
};

const ChatIcon: FC<Props> = ({ pathname, className }) => {
  const location = useLocation();
  const { pathname: currentPathname } = location;
  const page = currentPathname.split("/")[1];

  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        className={cn("fill-current", {
          "text-secondary-gray": !pathname || pathname !== page,
          "text-primary": pathname && pathname === page,
        })}
        d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z"
      />
      <path
        className={cn("fill-current", {
          "text-primary-gray": !pathname || pathname !== page,
          "text-secondary": pathname && pathname === page,
        })}
        d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z"
      />
    </svg>
  );
};

export default ChatIcon;
