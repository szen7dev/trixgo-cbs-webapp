import { FC, ReactNode } from "react";

import Navigation from "components/common/Navigation";
import MainHeader from "components/common/main-header";

type Props = {
  children: ReactNode;
};

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <section className="flex h-screen overflow-hidden">
      <div className="w-20">
        {/* Navigation */}
        <Navigation />
      </div>

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Main header */}
        <MainHeader />

        <main className="flex flex-1">{children}</main>
      </div>
    </section>
  );
};

export default MainLayout;
