/*=====1.LIBRARY=====*/
import { FC, ReactNode, useState } from "react";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/

/*=====4.PAGES/COMPONENTS=====*/

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/

/*=====7.OTHER=====*/

type Props = {
  children: ReactNode;
};

export const MobileLayout: FC<Props> = ({ children }) => {
  return (
    <section>
      <div className={""}>
        <section className={""}>
          <main className="">
            {children}
          </main>
        </section>
      </div>
    </section>
  )
}