import { FC } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import newsImg1 from "assets/images/home-slide-img1.jpg";
import newsImg2 from "assets/images/home-slide-img2.jpg";
import iconThumbsUp from "assets/images/icons8-thumbs-up-48.png";
import iconComments from "assets/images/icons8-comments-48.png";
import iconEye from "assets/images/icons8-eye-48.png";
import imgMedia from "assets/images/home-img-media.jpg";
import fakeThumbnail from "assets/images/thumbnail2.png";
import iconArrowRight from "assets/images/icon-arrow-right.svg";
import imgSolution from "assets/images/home-img-solution.png";
import imgBidding from "assets/images/icons8-database-96.png";
import imgProcess from "assets/images/icons8-project-setup-80.png";
import imgProcess2 from "assets/images/home-img-process-management.jpg";
import iconNew from "assets/images/icons8-new-96.png";
import imgBusiness from "assets/images/home-img-business.png";
import iconBirthday from "assets/images/icons8-event-64.png";

const HomePage: FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoPlay: true,
    autoPlaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <div className="t-home flex">
      {/* main content - left column */}
      <div className="t-home-col-left">
        <div className="t-home-col-left-wrapper">
          {/* summary block */}
          <div className="t-home-summary flex">
            <div className="t-home-summary-group">
              <div className="t-home-summary-item">
                <div className="t-home-summary-item-pulple">25</div>
                <p>Công việc</p>
              </div>
              <div className="t-home-summary-item">
                <div className="t-home-summary-item-red">205</div>
                <p>Phê duyệt</p>
              </div>
              <div className="t-home-summary-item">
                <div className="t-home-summary-item-blue">5</div>
                <p>Yêu cầu thông tin</p>
              </div>
            </div>
            <div className="t-home-summary-group">
              <div className="t-home-summary-item">
                <div className="t-home-summary-item-orange">22</div>
                <p>Quan tâm</p>
              </div>
              <div className="t-home-summary-item">
                <div className="t-home-summary-item-green">250</div>
                <p>Việc đã giao</p>
              </div>
              <div className="t-home-summary-item">
                <div className="t-home-summary-item-grey">2</div>
                <p>Việc nháp</p>
              </div>
            </div>
          </div>

          {/* outstanding news */}
          <div className="t-home-block">
            <div className="t-home-block-title">
              <span>Tin nổi bật</span>
              <a href="/">Xem tất cả</a>
            </div>
            <div className="t-home-slider">
              <Slider {...settings}>
                {/* outstanding news slider item */}
                <div className="t-home-slider-item">
                  <div className="t-home-slider-item-warpper">
                    <img src={newsImg1} alt="News" />
                    <div className="t-home-slider-item-text">
                      <p>Cộng đồng game</p>
                      <div>Thí điểm tính năng Auto count number two...</div>
                    </div>
                  </div>
                </div>
                {/* outstanding news slider item */}
                <div className="t-home-slider-item">
                  <div className="t-home-slider-item-warpper">
                    <img src={newsImg2} alt="News" />
                    <div className="t-home-slider-item-text">
                      <p>Tin thế giới</p>
                      <div>Lãnh đạo các nước tổ chức họp G7</div>
                    </div>
                  </div>
                </div>
                {/* outstanding news slider item */}
                <div className="t-home-slider-item">
                  <div className="t-home-slider-item-warpper">
                    <img src={newsImg1} alt="News" />
                    <div className="t-home-slider-item-text">
                      <p>Covid 19</p>
                      <div>Biến thể mới của covid 19 đã bùng phát</div>
                    </div>
                  </div>
                </div>
                {/* outstanding news slider item */}
                <div className="t-home-slider-item">
                  <div className="t-home-slider-item-warpper">
                    <img src={newsImg1} alt="News" />
                    <div className="t-home-slider-item-text">
                      <p>Cộng đồng game</p>
                      <div>Thí điểm tính năng Auto count number two...</div>
                    </div>
                  </div>
                </div>
                {/* outstanding news slider item */}
                <div className="t-home-slider-item">
                  <div className="t-home-slider-item-warpper">
                    <img src={newsImg2} alt="News" />
                    <div className="t-home-slider-item-text">
                      <p>Tin thế giới</p>
                      <div>Lãnh đạo các nước tổ chức họp G7</div>
                    </div>
                  </div>
                </div>
                {/* outstanding news slider item */}
                <div className="t-home-slider-item">
                  <div className="t-home-slider-item-warpper">
                    <img src={newsImg1} alt="News" />
                    <div className="t-home-slider-item-text">
                      <p>Covid 19</p>
                      <div>Biến thể mới của covid 19 đã bùng phát</div>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>

          {/* media */}
          <div className="t-home-block">
            <div className="t-home-block-title">
              <span>Truyền thông</span>
              <a href="/">Xem tất cả</a>
            </div>
            <div className="t-home-media">
              <div className="t-home-media-img">
                <img src={imgMedia} alt="Media" />
              </div>
              <div className="t-home-media-text">
                <p className="t-home-media-title">PGI Partners tổ chức buổi workshop về thanh toán các gói thầu xây lắp</p>
                <div className="t-home-media-description">
                  Sở Y tế Hà Nội vừa đồng ý với đề xuất của Trung tâm Kiểm soát Bệnh tật phương án rút khoảng cách giữa 2 mũi vaccine AstraZeneca về còn tối thiểu 4 tuần nhằm tăng tốc độ tiêm chủng toàn quốc.
                </div>
                <div className="t-home-media-info">
                  Nguyễn Văn Tuấn-CBS
                  <span className="t-home-media-info-dot"></span>
                  Phòng kế toán
                  <span className="t-home-media-info-dot"></span>
                  6h
                </div>
                <div className="t-home-media-parameter">
                  <div className="t-home-media-parameter-item">
                    <img src={iconThumbsUp} alt="Like" /> 28.7k
                  </div>
                  <div className="t-home-media-parameter-item">
                    <img src={iconComments} alt="Comment" /> 11.7k
                  </div>
                  <div className="t-home-media-parameter-item">
                    <img src={iconEye} alt="Seen" /> 2.7k
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* recent actions */}
          <div className="t-home-block">
            <div className="t-home-block-title">
              <span>Hoạt động gần đây</span>
              <a href="/">Xem tất cả</a>
            </div>
            <div className="t-home-actions">
              {/* recent actions item */}
              <div className="t-home-actions-item">
                <img className="t-home-actions-img" src={fakeThumbnail} alt="Thumbnail" />
                <div className="t-home-actions-text">
                  <div className="t-home-actions-title">
                    <span className="t-home-actions-title-content">
                      PKT đồng ý với HSTT đợt 4, giá trị được TT lần này: 554.101.100. Kính trình ban lãnh đạo...
                    </span>
                    <span className="t-home-actions-date">11:34</span>
                  </div>
                  <div className="t-home-actions-info">
                    Phùng Thị Lan-CHG | CHG.THT-Đệ trình phê duyệt Hồ sơ thanh toán đợt 04-QLDA
                  </div>
                </div>
              </div>
              {/* recent actions item */}
              <div className="t-home-actions-item">
                <img className="t-home-actions-img" src={fakeThumbnail} alt="Thumbnail" />
                <div className="t-home-actions-text">
                  <div className="t-home-actions-title">
                    <span className="t-home-actions-title-content">
                      PKT đồng ý với HSTT đợt 4, giá trị được TT lần này: 554.101.100. Kính trình ban lãnh đạo...
                    </span>
                    <span className="t-home-actions-date">07/11/21</span>
                  </div>
                  <div className="t-home-actions-info">
                    Phùng Thị Lan-CHG | CHG.THT-Đệ trình phê duyệt Hồ sơ thanh toán đợt 04-QLDA
                  </div>
                </div>
              </div>
              {/* recent actions item */}
              <div className="t-home-actions-item">
                <img className="t-home-actions-img" src={fakeThumbnail} alt="Thumbnail" />
                <div className="t-home-actions-text">
                  <div className="t-home-actions-title">
                    <span className="t-home-actions-title-content">
                      PKT đồng ý với HSTT đợt 4, giá trị được TT lần này: 554.101.100. Kính trình ban lãnh đạo...
                    </span>
                    <span className="t-home-actions-date">07/11/21</span>
                  </div>
                  <div className="t-home-actions-info">
                    Phùng Thị Lan-CHG | CHG.THT-Đệ trình phê duyệt Hồ sơ thanh toán đợt 04-QLDA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* main content - right column */}
      <div className="t-home-col-right">
        <div className="t-home-solution">
          <div className="t-home-solution-text">
            <div className="t-home-solution-title">Giải pháp mới cho vấn đề Quản lý giá</div>
            <div className="t-home-solution-description">Tất cả các vấn đề quan trọng liên quan tới kiểm soát ngân sách, giá</div>
            <div className="t-home-solution-link">
              <a href="/">
                Xem ngay <img src={iconArrowRight} alt="Arrow" />
              </a>
            </div>
          </div>
          <div className="t-home-solution-img">
            <img src={imgSolution} alt="Solution" />
          </div>
        </div>

        <div className="t-home-right-block t-home-bidding">
          <img src={imgBidding} alt="Bidding" />
          <div className="t-home-bidding-text">
            <div className="t-home-bidding-title">Tổ chức đấu thầu online</div>
            <div className="t-home-bidding-description">Đấu thầu các dự án tư nhân với quy mô lớn, hoàn toàn minh bạch</div>
          </div>
        </div>

        <div className="t-home-right-block">
          <div className="t-home-bidding">
            <img src={imgProcess} alt="Process" />
            <div className="t-home-bidding-text">
              <div className="t-home-bidding-title">Quản lý vận hành</div>
            </div>
          </div>
          <div className="flex items-center t-home-operation">
            <img src={imgProcess2} alt="Process management" />
            <div className="t-home-operation-text">
              <div>
                Trixgo chính thức cho ra mắt ứng dụng Quản lý vận hành công trình. Với tính năng này, Chủ đầu tư bàn giao dữ liệu cho đơn vị vận hành trở nên cực kỳ nhanh gọn. Dữ liệu được trang bị tới tận tay cư dân
              </div>
              <a href="/">
                Xem ngay
                <span>
                  <img src={iconArrowRight} alt="Arrow" />
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="t-home-right-block">
          <div className="t-home-bidding">
            <img src={iconNew} alt="New" />
            <div className="t-home-bidding-text">
              <div className="t-home-bidding-description">
                <span>Trixgo ra mắt phiên bản mới v7.9.1 (2387)</span>
                <ul>
                  <li>Hoàn thiện các bug nhỏ</li>
                  <li>Cải thiện tính năng</li>
                  <li>Nâng cao trải nghiệm người dùng</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="t-home-right-block">
          <div className="t-home-bidding">
            <div className="t-home-bidding-text">
              <div className="t-home-bidding-title">Đào tạo tân kỹ sư</div>
            </div>
          </div>
          <div className="t-home-training">
            <div className="t-home-training-progress">
              <div className="t-home-training-progress-item">
                <div className="t-home-training-progress-bar">
                  <div style={{ width: "10%" }}></div>
                </div>
                <div className="t-home-training-text">08 chủ đề, 42 bài học</div>
              </div>
              <div className="t-home-training-progress-item">
                <div className="t-home-training-progress-bar">
                  <div style={{ width: "40%" }}></div>
                </div>
                <div className="t-home-training-text">Thực hành làm việc thực tế</div>
              </div>
              <div className="t-home-training-progress-item">
                <div className="t-home-training-progress-bar">
                  <div style={{ width: "100%" }}></div>
                </div>
                <div className="t-home-training-text">Workshop chia sẻ kinh nghiệm </div>
              </div>
            </div>
            <button className="t-home-training-btn">Tham gia</button>
          </div>

          <div className="t-home-bidding">
            <div className="t-home-bidding-text">
              <div className="t-home-bidding-title">Cộng đồng doanh nghiệp</div>
            </div>
          </div>
          <div className="flex items-center t-home-operation t-home-business-group">
            <img src={imgBusiness} alt="Business group" />
            <div className="t-home-operation-text">
              <div>
                Hãy để cộng đồng biết tới dịch vụ và lợi ích mà Doanh nghiệp bạn mang lại
              </div>
              <a href="/">
                Xem ngay
                <span>
                  <img src={iconArrowRight} alt="Arrow" />
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="t-home-right-block">
          <div className="t-home-block-title">
            <span>Sự kiện</span>
            <a href="/">Xem tất cả</a>
          </div>
          <div className="t-home-event">
            {/* event item */}
            <div className="t-home-event-item">
              <img src={iconBirthday} alt="Thumbnail" />
              <div className="t-home-event-text">
                <b>Nguyệt Lê</b> và <b>Nguyễn Hoàng</b> có sinh nhật ngày hôm nay
              </div>
            </div>
            {/* event item */}
            <div className="t-home-event-item">
              <img src={iconBirthday} alt="Thumbnail" />
              <div className="t-home-event-text">
                <b>Nguyệt Lê</b> và <b>Nguyễn Hoàng</b> có sinh nhật ngày hôm nay
              </div>
            </div>
          </div>
        </div>

        <div className="t-home-right-block">
          <div className="t-home-block-title">
            <span>Yêu cầu kết bạn</span>
            <a href="/">Xem tất cả</a>
          </div>
          <div className="t-home-actions">
            {/* friend request item */}
            <div className="t-home-actions-item">
              <img className="t-home-actions-img" src={fakeThumbnail} alt="Thumbnail" />
              <div className="t-home-actions-text">
                <div className="t-home-actions-title">
                  <span className="t-home-actions-title-content font-bold">
                    Nguyễn Phan Thanh Hương-CPMI
                  </span>
                </div>
                <div className="t-home-actions-info">
                  <button className="t-home-actions-accept">Xác nhận</button>
                  <button className="t-home-actions-denied">Từ chối</button>
                </div>
              </div>
            </div>
            {/* friend request item */}
            <div className="t-home-actions-item">
              <img className="t-home-actions-img" src={fakeThumbnail} alt="Thumbnail" />
              <div className="t-home-actions-text">
                <div className="t-home-actions-title">
                  <span className="t-home-actions-title-content font-bold">
                    Nguyễn Phan Thanh Hương-CPMI
                  </span>
                </div>
                <div className="t-home-actions-info">
                  <button className="t-home-actions-accept">Xác nhận</button>
                  <button className="t-home-actions-denied">Từ chối</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
