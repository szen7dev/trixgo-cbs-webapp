import React, { FC } from "react";
import {DropdownSearchable, DropdownSearchableV2, TimeRangeDropdown} from "shareComponents/common";
import moment from "moment";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

import userIcon from "assets/images/icon-user-avatar.svg";
import maleUserIcon from "assets/images/icons8-male-user-64.svg";
import TriangleDown from "assets/icons/TriangleDown";
import timelineIcon from "assets/images/icons8-timeline-week-48.svg";
import projectIcon from "assets/images/icons8-project-50.svg";
import timeTableIcon from "assets/images/icons8-timetable-48.svg";
import categoryIcon from "assets/images/icons8-category-48.svg";
import downloadIcon from "assets/images/icons8-download-64.svg";
import sendMailIcon from "assets/images/icons8-send-email-96.svg";
import nextIcon from "assets/images/icons-arrow-next.svg";
import userAvt from "assets/images/task-user.svg";

import { useTask } from "services/hooks/useTask";

type Props = {
    type?: number
}

const PcmHomeV2: FC<Props> = ({ type = 1 }) => {

    /**
     * Danh sách công việc của tôi (type=1)
     * - Trạng thái chưa hoàn thành
     */
    const {
        listTasks,
        totalRecord,
        nextPageListTask: nextPageTaskOutDate,
    } = useTask({
        params: {
            type, statusNe: "3", isSortChildTask: "1"
        },
        isFetch: true
    });

    const subContentHtml = (html?: string) => {
        const removeHtmlTag = parse(
          (html || "").replace(/<[^>]*>?/gm, " ")
        ).toString();
    
        const result =
          removeHtmlTag.length > 100
            ? `${removeHtmlTag.slice(0, 100)}...`
            : removeHtmlTag;
        return result;
      };

    return (
        <div className={"task-home"}>
            <div className={"filter-bar flex flex-wrap px-4 py-2"}>
                <DropdownSearchableV2
                    className={"mr-4 border border-primary-border rounded-lg mb-2"}
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
                <TimeRangeDropdown
                    className={"mr-4 border border-primary-border rounded-lg mb-2 p-1 pl-2 "}
                    placeholder={"Thời hạn"}
                    iconBack={<TriangleDown/>}
                    iconFront={<img src={timelineIcon} alt={"----"}/>}
                    onValueChange={val => console.log(val)}
                    options={[
                        {
                            text: "Tất cả",
                            fromDate: "00/00/0000",
                            toDate: "31/12/2999"
                        },
                        {
                            text: "1 tuần tới",
                            fromDate: "12/08/2022",
                            toDate: "17/08/2022"
                        },
                        {
                            text: "> 7 ngày tiếp theo",
                            fromDate: "17/08/2022",
                            toDate: "31/12/2999"
                        }
                    ]}
                />
                <DropdownSearchableV2
                    className={"mr-4 border border-primary-border rounded-lg mb-2"}
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
                    className={"mr-4 border border-primary-border rounded-lg mb-2"}
                    placeholder={"Dự án"}
                    prefixIcon={<img className={"mr-2"} src={projectIcon} alt={"icon"}/>}
                    isMultiple={true}
                    data={[
                        {
                            id: 1,
                            text: "CHG.THT.Trường tiểu học và trung học cơ sở Tây hồ tây"
                        },
                        {
                            id: 2,
                            text: "CHG.THT.Trường tiểu học và trung học cơ sở Tây hồ tây"
                        },
                        {
                            id: 3,
                            text: "CHG.THT.Trường tiểu học và trung học cơ sở Tây hồ tây"
                        },
                        {
                            id: 4,
                            text: "CHG.THT.Trường tiểu học và trung học cơ sở Tây hồ tây"
                        },
                        {
                            id: 5,
                            text: "CHG.THT.Trường tiểu học và trung học cơ sở Tây hồ tây"
                        },
                        {
                            id: 6,
                            text: "CHG.THT.Trường tiểu học và trung học cơ sở Tây hồ tây"
                        },
                    ]}
                />
                <DropdownSearchableV2
                    className={"mr-4 border border-primary-border rounded-lg mb-2"}
                    placeholder={"Quá hạn"}
                    prefixIcon={<img className={"mr-2"} src={timeTableIcon} alt={"icon"}/>}
                    disableSearch={true}
                    data={[
                        {
                            id: 1,
                            text: "Tất cả"
                        },
                        {
                            id: 2,
                            text: "Đã quá hạn"
                        },
                        {
                            id: 3,
                            text: "Chưa quá hạn"
                        },
                    ]}
                />
                <DropdownSearchableV2
                    className={"mr-4 border border-primary-border rounded-lg mb-2"}
                    placeholder={"Trạng thái"}
                    prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"}/>}
                    isMultiple={true}
                    disableSearch={true}
                    data={[
                        {
                            id: 1,
                            text: "Khởi tạo, sắp triển khai"
                        },
                        {
                            id: 2,
                            text: "Đang triển khai"
                        },
                        {
                            id: 3,
                            text: "Hoàn thành"
                        },
                        {
                            id: 4,
                            text: "Treo lại"
                        },
                        {
                            id: 5,
                            text: "Chờ người khác giải quyết"
                        },
                        {
                            id: 6,
                            text: "Tiếp tục theo dõi"
                        },
                    ]}
                />
                <DropdownSearchableV2
                    className={"mr-4 border border-primary-border rounded-lg mb-2"}
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
                <button className={"bg-green-success rounded text-white px-6 h-[32px] mb-2"}>
                    Lưu kết quả
                </button>
            </div>

            <div className={"header-table flex px-4 w-full top-0 bg-white pb-4 flex-wrap"}>
                <div className={"border-0.5 border-primary-border flex items-center"}>
                    <button className={"px-4 py-2 bg-cbs-soft-blue border-r-0.5 border-primary-border text-primary"}>
                        Tất cả
                    </button>
                    <button className={"px-4 py-2 bg-white border-r-0.5 border-primary-border text-primary-gray"}>
                        Quá hạn
                    </button>
                    <button className={"px-4 py-2 bg-white border-r-0.5 border-primary-border text-primary-gray"}>
                        Tuần tới
                    </button>
                    <button className={"px-4 py-2 bg-white border-r-0.5 border-primary-border text-primary-gray"}>
                        {">"} 7 ngày
                    </button>
                    <button className={"px-4 py-2 bg-white border-r-0.5 border-primary-border text-primary-gray"}>
                        Hoàn thành
                    </button>
                </div>
                <button className={"flex items-center justify-center mx-3"}>
                    <img src={downloadIcon} alt={"-----"}/>
                </button>
                <button className={"flex items-center justify-center mx-3"}>
                    <img src={sendMailIcon} alt={"-----"}/>
                </button>
                <div className={"flex-1 flex items-center justify-end"}>
                    <DropdownSearchable
                        showTriangle={true}
                        className={"border-0.5 border-primary-border rounded-full mr-4"}
                        placeholder={"Lọc theo đơn vị giao việc"}
                    />
                    <span className={"text-primary-gray"}>1-50 trong số 2.358</span>
                    <button className={"w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"} disabled={true}>
                        <img src={nextIcon} alt={"----"} className={"rotate-180"}/>
                    </button>
                    <button className={"w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"}>
                        <img src={nextIcon} alt={"----"}/>
                    </button>
                </div>
            </div>

            <div className={"table-task-sheet"}>
                <table className={"w-full table-fixed tasks border-collapse"}>

                    <thead className={"bg-cbs-table-header sticky top-0 z-10"}>
                        <th className={"w-[46px]"}>
                            <div className={"flex items-center justify-center py-3"}>
                                <input className="form-check-input" type="checkbox" value="" id="check"/>
                            </div>
                        </th>
                        <th className={"w-4/12"}>
                            Nội dung công việc
                        </th>
                        <th className={"w-1/12"}>
                            Thời hạn
                        </th>
                        <th className={"w-2/12"}>
                            Người thực hiện
                        </th>
                        <th className={"w-1/12"}>
                            Tiến trình
                        </th>
                        <th className={""}>
                            Mô tả
                        </th>
                    </thead>

                    <tbody>
                        {listTasks?.map((item: any) => {
                            return (

                                <tr key={item._id}>
                                    <td>
                                        <div className={"flex items-center justify-center py-3"}>
                                            <input className="form-check-input" type="checkbox" value="" id="check"/>
                                        </div>
                                    </td>
                                    <td>
                                        <Link to={"/pcm/detail/" + (item._id)}>
                                            {item.project.sign}.{item.name}
                                        </Link>
                                    </td>
                                    <td>
                                        {moment(item.actualFinishTime).format("DD/MM/YYYY")}
                                    </td>
                                    <td>
                                        <div className={"flex items-center"}>
                                            <img src={`${process.env.REACT_APP_URL_S3_USER}/${item.assignee.image}`} alt={"----"} className={"w-[24px] h-[24px] min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px] rounded-full overflow-hidden"}/>
                                            <div className={"ml-2"}>{item.assignee.fullname ?? item.assignee.fullname}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className={"mb-1 text-right text-secondary-gray"}>{item.percentage}%</p>
                                        <div className={"relative w-full h-[4px] rounded-full border-0.5 border-primary-border bg-cbs-task-assign-progress-bg"}>
                                            <div className={"absolute h-full left-0 top-0 bg-cbs-schedule-expired"} style={{width: `${item.percentage}%`}}></div>
                                        </div>
                                    </td>
                                    <td>
                                        {subContentHtml(item.description)}
                                    </td>
                                </tr>
                            )
                        })
                        }
                        
                        {/* <tr>
                            <td>
                                <div className={"flex items-center justify-center py-3"}>
                                    <input className="form-check-input" type="checkbox" value="" id="check"/>
                                </div>
                            </td>
                            <td>
                                PGI.BLD.Lập, phê duyệt thực hiện quy chế kế tài chính của PGI
                            </td>
                            <td>
                                05/11/2021
                            </td>
                            <td>
                                <div className={"flex items-center"}>
                                    <img src={userAvt} alt={"----"} className={"w-[24px] h-[24px] min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px] rounded-full overflow-hidden"}/>
                                    <div className={"ml-2"}>Nguyễn Phan Thanh Hương-CPMI</div>
                                </div>
                            </td>
                            <td>
                                <p className={"mb-1 text-right text-secondary-gray"}>30%</p>
                                <div className={"relative w-full h-[4px] rounded-full border-0.5 border-primary-border bg-cbs-task-assign-progress-bg"}>
                                    <div className={"absolute h-full left-0 top-0 bg-cbs-schedule-expired"} style={{width: "30%"}}></div>
                                </div>
                            </td>
                            <td>
                                Gửi Hiệp, Như đã trao đổi qua điện thoại, anh Kiên/ Tùng-Bạn anh Dương số điện thoại 0989771930 có t..
                            </td>
                        </tr> */}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PcmHomeV2;