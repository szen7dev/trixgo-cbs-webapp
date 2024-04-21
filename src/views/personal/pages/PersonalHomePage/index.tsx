import { FC } from "react";
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';

import {
	ChangePassword, UpdateInfo
 } from "./components";

SwiperCore.use([Pagination]);

export const PersonalHomePage: FC = () => {
	return (
	  <main className="bg-cbs-gray h-fit w-full flex justify-center gap-7 py-4 px-4">
		<ChangePassword />
		<UpdateInfo />
	  </main>
	)
  }