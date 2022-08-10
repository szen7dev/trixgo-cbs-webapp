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
import {DropdownSearchableV2} from "../../../../shareComponents/common";
import userIcon from "assets/images/icon-user-avatar.svg";
import maleUserIcon from "assets/images/icons8-male-user-64.svg";
import categoryIcon from "assets/images/icons8-category-48.svg";

export const DashboardV2: FC = () => {
    return (
        <div className="t-home px-4 lg:px-8 py-2 lg:py-4">
            <div className={"filter-bar flex"}>
                <DropdownSearchableV2
                    className={"mr-4 border border-primary-border rounded-lg"}
                    placeholder={"Người thực hiện"}
                    showTriangle={true}
                    isMultiple={true}
                    renderSelectedItem={(item: any) => (
                        <div
                            className="flex items-center"
                        >
                            <img alt="Tag" src={userIcon} className="mr-1" />
                            <p
                                style={{
                                    textOverflow: "ellipsis",
                                    maxWidth: "100%",
                                    minWidth: 0,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    flex: "1 1 auto",
                                }}
                            >
                                {item.text}
                            </p>
                        </div>
                    )}
                    data={[
                        {"_id":"627205a5d9d18a0677e5d5b4","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"tutran01676378375van@gmail.com","fullname":"Trần Văn Tú-CDC","company":{"_id":"6046ade4b55525368b1091ac","name":"Công ty Cổ phần xây dựng CDC","sign":"CDC"},"bizfullname":"Trần Văn Tú-CDC","department":{"_id":"6046ade4b55525368b1091c8","name":"CÔNG TY","sign":"C177.CTY"},"position":{"_id":"61972dcfbc3b2e745ae3e382","name":"Cán bộ kỹ thuật"}},{"_id":"6272058ed9d18a0677e5d5b3","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":"2022-05-04T04:53:42.239Z","email":"lehuuthuan161098@gmail.com","fullname":"Lê Hữu Thuần-CDC","company":{"_id":"6046ade4b55525368b1091ac","name":"Công ty Cổ phần xây dựng CDC","sign":"CDC"},"bizfullname":"Lê Hữu Thuần-CDC","department":{"_id":"6046ade4b55525368b1091c8","name":"CÔNG TY","sign":"C177.CTY"},"position":{"_id":"6046ade5b55525368b10922c","name":"Cán bộ kỹ thuật"}},{"_id":"62720577d9d18a0677e5d5b2","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"themvv.econs@gmail.com","fullname":"Vũ Văn Thêm-CDC","company":{"_id":"6046ade4b55525368b1091ac","name":"Công ty Cổ phần xây dựng CDC","sign":"CDC"},"bizfullname":"Vũ Văn Thêm-CDC","department":{"_id":"6046ade4b55525368b1091c8","name":"CÔNG TY","sign":"C177.CTY"},"position":{"_id":"6046ade5b55525368b10922c","name":"Cán bộ kỹ thuật"}},{"_id":"6271f9ead9d18a0677e5d4dc","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"thanhnt.kythuat@gmail.com","fullname":"Nguyễn Tiến Thành-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Nguyễn Tiến Thành-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb6dd9d18a0677e5d51b","name":"Trạm biến áp"}},{"_id":"6271f9d8d9d18a0677e5d4db","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"nguyenbach.cdbk@gmail.com","fullname":"Nguyễn Văn Bách-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Nguyễn Văn Bách-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb69d9d18a0677e5d51a","name":"Thiết kế điều hòa"}},{"_id":"6271f9c7d9d18a0677e5d4da","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"hailv.plme@gmail.com","fullname":"Lê Văn Hải-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Lê Văn Hải-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb65d9d18a0677e5d519","name":"Thiết kế PCCC"}},{"_id":"6271f9b8d9d18a0677e5d4d9","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"anhpn0892@gmail.com","fullname":"Phạm Ngọc Anh-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Phạm Ngọc Anh-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb52d9d18a0677e5d515","name":"Thiết kế kiến trúc"}},{"_id":"6271f9a4d9d18a0677e5d4d8","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"hoatigon161@gmail.com","fullname":"Ngô Đức Tiến-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Ngô Đức Tiến-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb5dd9d18a0677e5d518","name":"Thiết điện, điện nhẹ"}},{"_id":"6271f991d9d18a0677e5d4d7","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"tranhong2647@gmail.com","fullname":"Trần Thị Hồng-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Trần Thị Hồng-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb5ad9d18a0677e5d517","name":"Thiết kế nước"}},{"_id":"6271f981d9d18a0677e5d4d6","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"nguyenthihang.11696@gmail.com","fullname":"Nguyễn Thị Hằng-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Nguyễn Thị Hằng-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb56d9d18a0677e5d516","name":"Dự toán"}}
                    ]}
                    formatItem={{
                        id: "_id",
                        text: "fullname"
                    }}
                    renderItem={(item => (
                        <div className={"flex"}>
                            <div className={"w-[44px] h-[44px] flex items-center justify-center rounded-full bg-accent text-white text-2xl font-bold"}>
                                {item.fullname.charAt(0)}
                            </div>
                            <div className={"flex-1 ml-2"}>
                                <p className={"truncate"}>{item.fullname}</p>
                                <p className={"text-primary-gray truncate"}>{item.email}</p>
                            </div>
                        </div>
                    ))}
                    prefixIcon={<img className={"mr-2"} src={maleUserIcon} alt={"icon"}/>}
                />

                <DropdownSearchableV2
                    className={"mr-4 border border-primary-border rounded-lg"}
                    placeholder={"Người tạo"}
                    showTriangle={true}
                    isMultiple={true}
                    renderSelectedItem={(item: any) => (
                        <div
                            className="flex items-center"
                        >
                            <img alt="Tag" src={userIcon} className="mr-1" />
                            <p
                                style={{
                                    textOverflow: "ellipsis",
                                    maxWidth: "100%",
                                    minWidth: 0,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    flex: "1 1 auto",
                                }}
                            >
                                {item.text}
                            </p>
                        </div>
                    )}
                    data={[
                        {"_id":"627205a5d9d18a0677e5d5b4","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"tutran01676378375van@gmail.com","fullname":"Trần Văn Tú-CDC","company":{"_id":"6046ade4b55525368b1091ac","name":"Công ty Cổ phần xây dựng CDC","sign":"CDC"},"bizfullname":"Trần Văn Tú-CDC","department":{"_id":"6046ade4b55525368b1091c8","name":"CÔNG TY","sign":"C177.CTY"},"position":{"_id":"61972dcfbc3b2e745ae3e382","name":"Cán bộ kỹ thuật"}},{"_id":"6272058ed9d18a0677e5d5b3","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":"2022-05-04T04:53:42.239Z","email":"lehuuthuan161098@gmail.com","fullname":"Lê Hữu Thuần-CDC","company":{"_id":"6046ade4b55525368b1091ac","name":"Công ty Cổ phần xây dựng CDC","sign":"CDC"},"bizfullname":"Lê Hữu Thuần-CDC","department":{"_id":"6046ade4b55525368b1091c8","name":"CÔNG TY","sign":"C177.CTY"},"position":{"_id":"6046ade5b55525368b10922c","name":"Cán bộ kỹ thuật"}},{"_id":"62720577d9d18a0677e5d5b2","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"themvv.econs@gmail.com","fullname":"Vũ Văn Thêm-CDC","company":{"_id":"6046ade4b55525368b1091ac","name":"Công ty Cổ phần xây dựng CDC","sign":"CDC"},"bizfullname":"Vũ Văn Thêm-CDC","department":{"_id":"6046ade4b55525368b1091c8","name":"CÔNG TY","sign":"C177.CTY"},"position":{"_id":"6046ade5b55525368b10922c","name":"Cán bộ kỹ thuật"}},{"_id":"6271f9ead9d18a0677e5d4dc","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"thanhnt.kythuat@gmail.com","fullname":"Nguyễn Tiến Thành-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Nguyễn Tiến Thành-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb6dd9d18a0677e5d51b","name":"Trạm biến áp"}},{"_id":"6271f9d8d9d18a0677e5d4db","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"nguyenbach.cdbk@gmail.com","fullname":"Nguyễn Văn Bách-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Nguyễn Văn Bách-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb69d9d18a0677e5d51a","name":"Thiết kế điều hòa"}},{"_id":"6271f9c7d9d18a0677e5d4da","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"hailv.plme@gmail.com","fullname":"Lê Văn Hải-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Lê Văn Hải-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb65d9d18a0677e5d519","name":"Thiết kế PCCC"}},{"_id":"6271f9b8d9d18a0677e5d4d9","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"anhpn0892@gmail.com","fullname":"Phạm Ngọc Anh-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Phạm Ngọc Anh-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb52d9d18a0677e5d515","name":"Thiết kế kiến trúc"}},{"_id":"6271f9a4d9d18a0677e5d4d8","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"hoatigon161@gmail.com","fullname":"Ngô Đức Tiến-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Ngô Đức Tiến-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb5dd9d18a0677e5d518","name":"Thiết điện, điện nhẹ"}},{"_id":"6271f991d9d18a0677e5d4d7","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"tranhong2647@gmail.com","fullname":"Trần Thị Hồng-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Trần Thị Hồng-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb5ad9d18a0677e5d517","name":"Thiết kế nước"}},{"_id":"6271f981d9d18a0677e5d4d6","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"nguyenthihang.11696@gmail.com","fullname":"Nguyễn Thị Hằng-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Nguyễn Thị Hằng-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb56d9d18a0677e5d516","name":"Dự toán"}}
                    ]}
                    formatItem={{
                        id: "_id",
                        text: "fullname"
                    }}
                    renderItem={(item => (
                        <div className={"flex"}>
                            <div className={"w-[44px] h-[44px] flex items-center justify-center rounded-full bg-accent text-white text-2xl font-bold"}>
                                {item.fullname.charAt(0)}
                            </div>
                            <div className={"flex-1 ml-2"}>
                                <p className={"truncate"}>{item.fullname}</p>
                                <p className={"text-primary-gray truncate"}>{item.email}</p>
                            </div>
                        </div>
                    ))}
                    prefixIcon={<img className={"mr-2"} src={maleUserIcon} alt={"icon"}/>}
                />
                <DropdownSearchableV2
                    className={"mr-4 border border-primary-border rounded-lg"}
                    placeholder={"Phân loại"}
                    prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"}/>}
                    isMultiple={true}
                    disableSearch={true}
                    data={[
                        {
                            id: 1,
                            text: "Việc thông thường"
                        },
                        {
                            id: 2,
                            text: "Yêu cầu thông tin"
                        },
                        {
                            id: 3,
                            text: "Yêu cầu phê duyệt"
                        },
                        {
                            id: 4,
                            text: "Thanh toán"
                        },
                        {
                            id: 5,
                            text: "Lựa chọn nhà thầu"
                        },
                    ]}
                />
                <button className={"bg-green-success rounded text-white px-4 py-2"}>
                    Lưu kết quả
                </button>
            </div>
        </div>
    );
};