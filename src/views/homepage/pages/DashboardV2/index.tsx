import { FC, useEffect } from "react";
import moment from "moment";
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { useQuery } from "react-query";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "views/pcm/styles/pcm.module.css";

import newsImg1 from "assets/images/home-slide-img1.jpg";
import iconThumbsUp from "assets/images/icons8-thumbs-up-48.png";
import iconComments from "assets/images/icons8-comments-48.png";
import iconEye from "assets/images/icons8-eye-48.png";
// import iconArrowRight from "assets/images/icon-arrow-right.svg";
import imgSolution from "assets/images/home-img-solution.png";
import imgBidding from "assets/images/icons8-database-96.png";
import iconNew from "assets/images/icons8-new-96.png";
import imgBusiness from "assets/images/home-img-business.png";
import imgBusiness2 from "assets/images/Business.png";

import { abbreviateNumber } from 'utils/converter';
import { useSocket } from "services/hooks/useSocket";
import { useAuth } from "services/hooks/auth/useAuth";
import { useMedia } from 'services/hooks/useMedia';
import { useNotification } from 'services/hooks/useNotification';
import PcmRepository from 'apis/pcm';
import { NotificationProps } from "typings/notification";

export const DashboardV2: FC = () => {
  const { user } = useAuth();
  const { current: socket }: any = useSocket();

  const { listMedias: listMediasDigitalConversion, nextPageListMedias } = useMedia({
    key: 'list_medias__digital-conversion',
    params: {
      limit: 6,
      type: 'digital-conversion'
    },
    isFetchMedias: true
  });

  const { listMedias: listMediasCompany } = useMedia({
    key: 'list_medias__company_homepage',
    params: {
      limit: 1,
      type: 'company',
      companyID: user?.company._id
    },
    isFetchMedias: true
  });

  const {
    listNotifications,
    totalRecord,
    refetchListNotification,
    hasNextPage: hasNextPageNotification,
    nextPageListNotification
  } = useNotification({ limit: 5 }, true);

  const { data } = useQuery("pcm_plan_tasks--badge", () => PcmRepository.listTotalAnalysis());

  useEffect(() => {
		socket?.on('NOTIFICATION_CSS_RECEIVE_NEW_NOTIFICATION', refetchListNotification);

    return () => socket?.off('NOTIFICATION_CSS_RECEIVE_NEW_NOTIFICATION', refetchListNotification);
  }, [socket])

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    autoPlay: true,
    autoPlaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: '',
    centerPadding: '10px',
    beforeChange: (previousIndex: number, index: number) => {
      if(previousIndex < index){
        (index % 3) === 0 && nextPageListMedias();
      }
    }
  };

  return (
    <div className="t-home px-4 lg:px-8 py-2 lg:py-4">
      okookkook
    </div>
  );
};