/*=====LIBRARY=====*/
import { ReactNode, FC } from "react";
import cn from "classnames";

type Props = {
  children: ReactNode;
  isAuthentication?: boolean;
};

export const FullPageLayout: FC<Props> = ({ children, isAuthentication = false }) => {
  return (
    <div
      className={cn(
        "h-screen items-center justify-center overflow-auto",
        {
          "bg-cover bg-no-repeat": isAuthentication,
        }
      )}
    >
      {children}
    </div>
  );
};