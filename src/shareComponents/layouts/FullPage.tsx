import { ReactNode, FC } from "react";

import cn from "classnames";

type Props = {
  children: ReactNode;
  isAuthentication?: boolean;
};

export const FullPage: FC<Props> = ({ children, isAuthentication = false }) => {
  return (
    <div
      className={cn(
        "h-screen flex items-center justify-center",
        {
          "bg-cover bg-no-repeat": isAuthentication,
        }
      )}
    >
      {children}
    </div>
  );
};

