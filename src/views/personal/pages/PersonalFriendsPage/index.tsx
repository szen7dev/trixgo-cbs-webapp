/*=====1.LIBRARY=====*/
import { FC, useState } from "react";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
import SwiperCore, { Pagination } from 'swiper';

/*=====2.CSS=====*/
import styles from "views/human/styles/style.module.css";
import 'swiper/swiper-bundle.min.css';

/*=====3.ICONS=====*/

/*=====4.PAGES/COMPONENTS=====*/
import { FriendsTab } from "./components/Tabs";
/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/

/*=====7.OTHER=====*/
SwiperCore.use([Pagination]);

export const PersonalFriendsPage: FC = () => {
	const [toggleTab, setToggleTab] = useState(1);

  const handleToggleTab = (index: number) => {
    setToggleTab(index);
  };

	return (
        <main className="w-full h-max">
        <div className="sticky flex justify-between items-center top-0 bg-primary-light z-10 h-10 px-6 border-b border-gray-300 z-10">
          <div className="h-full">
            <button
              className={
                toggleTab === 1
                  ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                  : "w-auto h-full p-2 text-sm text-primary-gray"
              }
              onClick={() => handleToggleTab(1)}
            >
              Bạn bè
            </button>
            <button
              className={
                toggleTab === 2
                  ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                  : "w-auto h-full p-2 text-sm text-primary-gray"
              }
              onClick={() => handleToggleTab(2)}
            >
              Yêu cầu kết bạn
            </button>
          </div>
        </div>
  
        <FriendsTab toggleTab={toggleTab} />
      </main>
	);
};