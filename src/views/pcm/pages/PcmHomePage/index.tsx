import { FC, useState, useEffect } from "react";
import moment from "moment";
import Slider from "react-slick";
import { Link } from 'react-router-dom';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

import newsImg1 from "assets/images/home-slide-img1.jpg";
import iconThumbsUp from "assets/images/icons8-thumbs-up-48.png";
import iconComments from "assets/images/icons8-comments-48.png";
import iconEye from "assets/images/icons8-eye-48.png";
import imgMedia from "assets/images/home-img-media.jpg";
import iconArrowRight from "assets/images/icon-arrow-right.svg";
import imgSolution from "assets/images/home-img-solution.png";
import imgBidding from "assets/images/icons8-database-96.png";
// import imgProcess from "assets/images/icons8-project-setup-80.png";
// import imgProcess2 from "assets/images/home-img-process-management.jpg";
import iconNew from "assets/images/icons8-new-96.png";
import imgBusiness from "assets/images/home-img-business.png";
import imgBusiness2 from "assets/images/Business.png";

import { abbreviateNumber } from 'utils';
import { PcmPlanTaskProps, listTotalAnalysisProps } from 'typings/pcm';
import { useSocket } from "services/hooks/useSocket";
import { useAuth } from "services/hooks/useAuth";
import { usePcm } from 'services/hooks/usePcm';
import { useSocial } from 'services/hooks/useSocial';
import PcmRepository from 'apis/pcm';

export const PcmHomePage: FC = () => {
  const [taskAnalysis, setTaskAnalysis] = useState<listTotalAnalysisProps>();
  const { user } = useAuth();
  const { listTasks } = usePcm();
  const socketRef: any = useSocket();

  const { listMedias: listMediasDigitalConversion, nextPageListMedias } = useSocial('list_media__digital-conversion', { 
    limit: 6, type: 'digital-conversion'
  });
  const { listMedias: listMediasCompany, refetchListMedias } = useSocial('list_media__company__homepage', {
    limit: 1, type: 'company', companyID: user?.company._id
  });

  // Kiểm soát lifeCicle của Data
  useEffect(() => {
    (async () => {
      const response = await PcmRepository.listTotalAnalysis();
      setTaskAnalysis(response.data);
    })();

    const socket = socketRef.current;
    if (!socket) return;

		socket.on('NOTIFICATION_CSS_RECEIVE_NEW_NOTIFICATION', () => {
      refetchListMedias();
		});
  }, [])

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
    <div className="t-home flex">
      {/* main content - left column */}
      <div className="w-2/3 pt-4 pr-2 pl-4 pb-4">
        <div className="t-home-col-left-wrapper mr-auto ml-auto max-w-full">
          {/* summary block */}
          <div className="t-home-summary flex flex-wrap items-center justify-center">
            <div className="t-home-summary-group flex max-w-full">
              <div className="t-home-summary-item pl-3 pr-3 text-center flex justify-center flex-wrap mb-4">
                <div className="rounded-full border-8 color-dark flex justify-center items-center mb-4 t-home-summary-item-pulple">{taskAnalysis?.amountTask || 0}</div>
                <p className="color-primary-gray text-bold bg-secondary-light pt-2 pb-2 pl-3 pr-3 mb-0 whitespace-nowrap">
                  <Link to="/pcm/mine">Công việc</Link>
                </p>
              </div>
              <div className="t-home-summary-item pl-3 pr-3 text-center flex justify-center flex-wrap mb-4">
                <div className="rounded-full border-8 color-dark flex justify-center items-center mb-4 t-home-summary-item-red">{taskAnalysis?.amountTaskIsRFa || 0}</div>
                <p className="color-primary-gray text-bold bg-secondary-light pt-2 pb-2 pl-3 pr-3 mb-0 whitespace-nowrap">
                  <Link to="/pcm/mine">Phê duyệt</Link>
                </p>
              </div>
              <div className="t-home-summary-item pl-3 pr-3 text-center flex justify-center flex-wrap mb-4">
                <div className="rounded-full border-8 color-dark flex justify-center items-center mb-4 t-home-summary-item-blue">{taskAnalysis?.amountTaskIsRFis || 0}</div>
                <p className="color-primary-gray text-bold bg-secondary-light pt-2 pb-2 pl-3 pr-3 mb-0 whitespace-nowrap">
                  <Link to="/pcm/mine">Yêu cầu thông tin</Link>
                </p>
              </div>
            </div>
            <div className="t-home-summary-group flex max-w-full">
              <div className="t-home-summary-item pl-3 pr-3 text-center flex justify-center flex-wrap mb-4">
                <div className="rounded-full border-8 color-dark flex justify-center items-center mb-4 t-home-summary-item-orange">{taskAnalysis?.amountTaskIsFlags || 0}</div>
                <p className="color-primary-gray text-bold bg-secondary-light pt-2 pb-2 pl-3 pr-3 mb-0 whitespace-nowrap">
                  <Link to="/pcm/bookmark">Việc quan tâm</Link>
                </p>
              </div>
              <div className="t-home-summary-item pl-3 pr-3 text-center flex justify-center flex-wrap mb-4">
                <div className="rounded-full border-8 color-dark flex justify-center items-center mb-4 t-home-summary-item-green">{taskAnalysis?.amountTaskIsAssignee || 0}</div>
                <p className="color-primary-gray text-bold bg-secondary-light pt-2 pb-2 pl-3 pr-3 mb-0 whitespace-nowrap">
                <Link to="/pcm/mine">Việc đã giao</Link>
                </p>
              </div>
              <div className="t-home-summary-item pl-3 pr-3 text-center flex justify-center flex-wrap mb-4">
                <div className="rounded-full border-8 color-dark flex justify-center items-center mb-4 t-home-summary-item-grey">{taskAnalysis?.amountTaskIsDraft || 0}</div>
                <p className="color-primary-gray text-bold bg-secondary-light pt-2 pb-2 pl-3 pr-3 mb-0 whitespace-nowrap">
                  <Link to="/pcm/draft">Việc nháp</Link>
                </p>
              </div>
            </div>
          </div>

          {/* outstanding news */}
          <div className="t-home-block">
            <div className="t-home-block-title">
              <span>Chuyển đổi số</span>
              <Link to={`/social/home/3`}>Xem tất cả</Link>
            </div>
            <div className="t-home-slider w-full">
              <Slider {...settings}>
                {/* outstanding news slider item */}
                {listMediasDigitalConversion.length ? 
                  listMediasDigitalConversion.map(media => (
                    <div key={media._id} className="t-home-slider-item w-1/3 pr-2 pl-2">
                      <div className="t-home-slider-item-warpper relative flex items-end p-2">
                        <img className="absolute top-0 left-0 w-full h-full z-0 object-cover" src={(media.images && media.images.length) ? `${process.env.REACT_APP_URL_S3}/${media.images[0].path}` : newsImg1} alt="News" />
                        <div className="t-home-slider-item-text">
                          <Link to={`/social/post/${media._id}`}>
                            <p className="text-lg font-bold" title={media.title}>
                              {media.title?.length > 20 ? `${media.title?.substring(0, 20)}...` : media.title}
                            </p>
                          </Link>
                          <div className="text-[14px]">
                            {media.content?.length > 50 ? `${media.content?.substring(0, 50)}...` : media.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                 : ''}
                
                {/* outstanding news slider item */}
                {/* <div className="t-messageHome-slider-item w-1/3 pr-2 pl-2">
                  <div className="t-messageHome-slider-item-warpper relative flex items-end p-2">
                    <img className="absolute top-0 left-0 w-full h-full z-0 object-cover" src={newsImg2} alt="News" />
                    <div className="t-messageHome-slider-item-text">
                      <p className="text-lg font-bold">Tin thế giới</p>
                      <div className="text-[14px]">Lãnh đạo các nước tổ chức họp G7</div>
                    </div>
                  </div>
                </div> */}
              </Slider>
            </div>
          </div>

          {/* media */}
          <div className="t-home-block">
            <div className="t-home-block-title">
              <span>Truyền thông công ty</span>
              <Link to={`/social/home/1`}>Xem tất cả</Link>
            </div>
            {listMediasCompany.length ? (
              <div className="flex items-center">
                <Link to={`/social/post/${listMediasCompany[0]._id}`} className="flex t-home-media-img pr-7 max-h-[225px]">
                  <img className="w-full object-cover" src={(listMediasCompany[0].images && listMediasCompany[0].images.length) ? `${process.env.REACT_APP_URL_S3}/${listMediasCompany[0].images[0].path}` : imgMedia} alt="Media" />
                </Link>
                <div className="t-home-media-text text-dark">
                  <Link to={`/social/post/${listMediasCompany[0]._id}`}>
                    <p className="t-home-media-title font-bold"> {listMediasCompany[0].title} </p>
                  </Link>
                  <div className="t-home-media-description mb-4">
                    {listMediasCompany[0].content?.length > 200 ? `${listMediasCompany[0].content?.substring(0, 200)}...` : listMediasCompany[0].content}
                  </div>
                  <div className="t-home-media-info text-secondary-gray">
                    {listMediasCompany[0].author.fullname}
                    <span className="t-home-media-info-dot"></span>
                    {listMediasCompany[0].author?.department?.name}
                    <span className="t-home-media-info-dot"></span>
                    {moment(listMediasCompany[0].createAt).fromNow()}
                  </div>
                  <div className="t-home-media-parameter flex justify-between text-primary-gray">
                    <div className="t-home-media-parameter-item flex items-center">
                      <img className="w-6 h-6 object-contain" src={iconThumbsUp} alt="Like" /> 
                      {abbreviateNumber(listMediasCompany[0].amountReaction)}
                    </div>
                    <div className="t-home-media-parameter-item flex items-center">
                      <img className="w-6 h-6 object-contain" src={iconComments} alt="Comment" />
                      {abbreviateNumber(listMediasCompany[0].amountComment)}
                    </div>
                    <div className="t-home-media-parameter-item flex items-center">
                      <img className="w-6 h-6 object-contain" src={iconEye} alt="Seen" />
                      {abbreviateNumber(listMediasCompany[0].amountView)}
                    </div>
                  </div>
                </div>
              </div>
            ) : ''}
          </div>

          {/* recent actions */}
          <div className="t-home-block">
            <div className="t-home-block-title">
              <span>Thông báo gần đây</span>
              <Link to={`/personal/notification`}>Xem tất cả</Link>
            </div>
            <div className="t-home-actions">
              {/* recent actions item */}
              {listTasks.length ? listTasks.map((task: PcmPlanTaskProps) => (
                <div key={task?._id} className="flex mb-4">
                  <img className="t-home-actions-img object-cover mr-4 rounded-full" src={`${process.env.REACT_APP_URL_S3_USER}/${task?.lastLog?.author?.image || task?.assignee?.image}`} alt="Thumbnail" />
                  <div className="t-home-actions-text text-secondary-gray">
                    <div className="flex justify-between mb-1">
                      <span className="t-home-actions-title-content text-dark">
                        {task?.name}
                      </span>
                      <span className="ml-2">{moment(task?.lastLog?.createAt).format('L')}</span>
                    </div>
                  <div>
                      {task?.lastLog?.content}
                    </div>
                  </div>
                </div>
              )) : ''}

              {/* recent actions item */}
              {/* <div className="flex mb-4">
                <img className="t-messageHome-actions-img object-cover mr-4 rounded-full" src={fakeThumbnail} alt="Thumbnail" />
                <div className="t-messageHome-actions-text text-secondary-gray">
                  <div className="flex justify-between mb-1">
                    <span className="t-messageHome-actions-title-content text-dark">
                      PKT đồng ý với HSTT đợt 4, giá trị được TT lần này: 554.101.100. Kính trình ban lãnh đạo...
                    </span>
                    <span className="ml-2">07/11/21</span>
                  </div>
                  <div>
                    Phùng Thị Lan-CHG | CHG.THT-Đệ trình phê duyệt Hồ sơ thanh toán đợt 04-QLDA
                  </div>
                </div>
              </div> */}

            </div>
          </div>
        </div>
      </div>

      {/* main content - right column */}
      <div className="w-1/3 pl-2 pt-4 pb-4 pr-4">
        <div className="t-home-solution pt-1 pb-1 pl-3 pr-3 mb-4 flex items-center">
          <div className="t-home-solution-text text-[12px] text-primary-light">
            <div className="text-[14px] font-bold">Giải pháp mới cho vấn đề Quản lý giá</div>
            <div className="t-home-solution-description">Giải quyết tất cả các vấn đề liên quan tới kiểm soát giá cho Chủ đầu tư</div>
            <div className="t-home-solution-link">
              <a href="/" className="flex items-center text-primary-light">
                Xem ngay
                <img className="w-4 h-4 pl-1 pr-1 object-contain rounded-full bg-primary-light ml-2" src={iconArrowRight} alt="Arrow" />
              </a>
            </div>
          </div>
          <div className="t-home-solution-img">
            <img className="w-full" src={imgSolution} alt="Solution" />
          </div>
        </div>

        <div className="t-home-right-block t-home-right-block-common">
          <img src={imgBidding} alt="Bidding" />
          <div className="t-home-right-block-common-text">
            <div className="t-home-right-block-common-title">Nền tảng đấu thầu online quy mô lớn</div>
            <div className="t-home-right-block-common-description">Đấu thầu gói thầu quy mô lớn, minh bạch/bảo mật thông tin suốt quá trình</div>
          </div>
        </div>
				
				<div className="border-cbs-border rounded-[5px] border-cbs-[1px] mb-4">
					<img src={imgBusiness2} alt="Business"/>
				</div>

        {/* <div className="t-messageHome-right-block">
          <div className="t-messageHome-right-block-common">
            <img src={imgProcess} alt="Process" />
            <div className="t-messageHome-right-block-common-text">
              <div className="t-messageHome-right-block-common-title">Quản lý vận hành</div>
            </div>
          </div>
          <div className="flex items-center mt-2 t-messageHome-operation">
            <img src={imgProcess2} alt="Process management" />
            <div className="t-messageHome-operation-text pl-4 text-dark">
              <div className="mb-5">
                Trixgo sắp sửa ra mắt ứng dụng Quản lý vận hành công trình. Với ứng dụng này, việc bàn giao dữ liệu của Chủ đầu tư cho đơn vị vận hành trở nên cực kỳ nhanh gọn. Thông tin về căn hộ được cung cấp tới tận tay cư dân
              </div>
              <a className="flex items-center text-primary-gray" href="/">
                Xem ngay
                <span className="ml-2 rounded-full p-1 inline-block">
                  <img src={iconArrowRight} alt="Arrow" />
                </span>
              </a>
            </div>
          </div>
        </div> */}

        <div className="t-home-right-block">
          <div className="t-home-right-block-common">
            <img src={iconNew} alt="New" />
            <div className="t-home-right-block-common-text">
              <div className="t-home-right-block-common-description">
                <span>Trixgo ra mắt phiên bản mới v2.7.1</span>
                <ul>
                  <li>Nâng cấp hoàn toàn trải nghiệm mới trên nền tảng Web</li>
                  <li>Đồng bộ hóa Mobile và Tablet app</li>
                  <li>Cải thiện tính năng</li>
                  <li>Hoàn thiện các bug nhỏ</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="t-home-right-block">
          <div className="t-home-right-block-common">
            <div className="t-home-right-block-common-text">
              <div className="t-home-right-block-common-title">Workshop thực tế</div>
            </div>
          </div>
          <div className="t-home-training flex items-center flex-wrap pl-4 pr-4 pb-px">
            <div className="t-home-training-progress pr-4 flex-grow">
              <div className="mb-2 flex items-center">
                <div className="t-home-training-progress-bar w-1/4">
                  <div style={{ width: "10%" }}></div>
                </div>
                <div className="w-3/4 whitespace-nowrap pl-3">08 chủ đề, 42 bài học</div>
              </div>
              <div className="mb-2 flex items-center">
                <div className="t-home-training-progress-bar w-1/4">
                  <div style={{ width: "40%" }}></div>
                </div>
                <div className="w-3/4 whitespace-nowrap pl-3">Thực hành làm việc dự án thực tế</div>
              </div>
              <div className="mb-2 flex items-center">
                <div className="t-home-training-progress-bar w-1/4">
                  <div style={{ width: "100%" }}></div>
                </div>
                <div className="w-3/4 whitespace-nowrap pl-3">Định kỳ Workshop chia sẻ kinh nghiệm </div>
              </div>
            </div>
            <button className="t-home-training-btn flex-grow-0 pl-5 pr-5 pt-3 pb-3 text-[14px] font-bold text-primary-light mb-5 rounded-md">Tham gia</button>
          </div>

          <div className="t-home-right-block-common">
            <div className="t-home-right-block-common-text">
              <div className="t-home-right-block-common-title">Chuyển đổi số</div>
            </div>
          </div>
          <div className="flex items-center t-home-operation t-home-business-group">
            <img src={imgBusiness} alt="Business group" />
            <div className="t-home-operation-text">
              <div>
                Chia sẻ kinh nghiệm quan trọng quyết định thành công việc chuyển đổi số của doanh nghiệp
              </div>
              <Link className="flex items-center text-primary-gray" to="/social/home/3">
                Xem ngay
                <span className="ml-2 rounded-full p-1 inline-block">
                  <img src={iconArrowRight} alt="Arrow" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* <div className="t-messageHome-right-block"> */}
          {/* <div className="t-messageHome-block-title">
            <span>Sự kiện</span>
            <a href="/">Xem tất cả</a>
          </div> */}
          {/* <div className="t-messageHome-event"> */}
            {/* event item */}
            {/* <div className="t-messageHome-event-item flex items-center mb-3">
              <img className="w-10" src={iconBirthday} alt="Thumbnail" />
              <div className="t-messageHome-event-text pl-4">
                <b>Nguyệt Lê</b> và <b>Nguyễn Hoàng</b> có sinh nhật ngày hôm nay
              </div>
            </div> */}
            {/* event item */}
            {/* <div className="t-messageHome-event-item flex items-center mb-3">
              <img className="w-10" src={iconBirthday} alt="Thumbnail" />
              <div className="t-messageHome-event-text pl-4">
                <b>Nguyệt Lê</b> và <b>Nguyễn Hoàng</b> có sinh nhật ngày hôm nay
              </div>
            </div> */}
          {/* </div> */}
        {/* </div> */}

        {/* <div className="t-messageHome-right-block"> */}
          {/* <div className="t-messageHome-block-title">
            <span>Yêu cầu kết bạn</span>
            <a href="/">Xem tất cả</a>
          </div> */}
          {/* <div className="t-messageHome-actions"> */}

            {/* friend request item */}
            {/* <div className="flex mb-4">
              <img className="t-messageHome-actions-img object-cover mr-4 rounded-full" src={fakeThumbnail} alt="Thumbnail" />
              <div className="t-messageHome-actions-text text-secondary-gray">
                <div className="flex justify-between mb-1">
                  <span className="t-messageHome-actions-title-content text-dark font-bold">
                    Nguyễn Phan Thanh Hương-CPMI
                  </span>
                </div>
                <div className="t-messageHome-actions-info">
                  <button className="bg-primary h-9 text-primary-light text[14px] mr-2 pl-3 pr-3 rounded-md">Xác nhận</button>
                  <button className="t-messageHome-actions-denied h-9 text-primary-gray text[14px] mr-2 pl-3 pr-3 rounded-md">Từ chối</button>
                </div>
              </div>
            </div> */}

            {/* friend request item */}
            {/* <div className="flex mb-4">
              <img className="t-messageHome-actions-img object-cover mr-4 rounded-full" src={fakeThumbnail} alt="Thumbnail" />
              <div className="t-messageHome-actions-text text-secondary-gray">
                <div className="flex justify-between mb-1">
                  <span className="t-messageHome-actions-title-content text-dark font-bold">
                    Nguyễn Phan Thanh Hương-CPMI
                  </span>
                </div>
                <div className="t-messageHome-actions-info">
                  <button className="bg-primary h-9 text-primary-light text[14px] mr-2 pl-3 pr-3 rounded-md">Xác nhận</button>
                  <button className="t-messageHome-actions-denied h-9 text-primary-gray text[14px] mr-2 pl-3 pr-3 rounded-md">Từ chối</button>
                </div>
              </div>
            </div> */}
          {/* </div> */}
        {/* </div> */}
        
      </div>
    </div>
  );
};