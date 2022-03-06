/*=====1.LIBRARY=====*/
import { FC } from "react";
import SwiperCore, { Pagination } from 'swiper';
/*=====2.CSS=====*/
import styles from "views/human/styles/style.module.css";
import 'swiper/swiper-bundle.min.css';
/*=====3.ICONS=====*/
/*=====4.PAGES/COMPONENTS=====*/
import {
	ChangePassword, UpdateInfo
 } from "./components";
/*=====5.TYPINGS=====*/
/*=====6.HOOKS/APIS=====*/
/*=====7.OTHER=====*/
SwiperCore.use([Pagination]);

export const PersonalHomePage: FC = () => {
	return (
	  <main className="bg-cbs-gray h-full flex justify-center gap-7 py-4">
		<ChangePassword />
		<UpdateInfo />
	  </main>
	);
  };