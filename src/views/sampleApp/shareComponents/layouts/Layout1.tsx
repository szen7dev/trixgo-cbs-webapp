import { FC, ReactNode } from "react";
import cn from "classnames";

type Props = {
  children: ReactNode;
};

export const Layout1: FC<Props> = ({ children }) => {
  return (
    <section
      className={cn("home-layout relative bg-primary-light")}
    >
      {/* Content area */}
      <main className="home-main-content transition-all duration-500 ease-out overflow-auto relative">
        {children}
      </main>
    </section>
  );
};
