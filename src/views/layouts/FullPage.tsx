import { ReactNode, FC } from "react";

import cn from "classnames";

type Props = {
  children: ReactNode;
  isAuthentication?: boolean;
};

const FullPage: FC<Props> = ({ children, isAuthentication = false }) => {
  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center px-6 py-12 md:px-4 lg:px-8",
        {
          "bg-authentication bg-cover bg-no-repeat": isAuthentication,
        }
      )}
    >
      {children}
    </div>
  );
};

export default FullPage;
