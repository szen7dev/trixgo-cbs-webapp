/*=====1.LIBRARY=====*/
import { FC, useState, useEffect } from "react";
import cn from "classnames";
import moment from 'moment'
import debounce from 'lodash/debounce';

/*=====2.CSS=====*/
import 'swiper/swiper-bundle.min.css';

/*=====3.ICONS=====*/

/*=====4.PAGES/COMPONENTS=====*/
import { Paginate } from "shareComponents/common";
import { SearchInput } from "shareComponents/common";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/

/*=====7.OTHER=====*/
export const PersonalHistoriesPage: FC = () => {

  return (
    <main className="h-full">
      <header className="sticky top-0 z-10 flex items-center justify-between h-12 px-6 border border-primary-border">
        <div className="flex items-center">
          <p className="text-lg">PersonalHistoriesPage</p>
        </div>
      </header>
    </main>
  )
}