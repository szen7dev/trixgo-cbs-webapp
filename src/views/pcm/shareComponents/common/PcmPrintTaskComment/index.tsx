import React, {FC, useRef, useState} from "react";
import taskUserAvt from "assets/images/task-user.svg";
import trigangleDown from "assets/images/triangle-down.svg";
import iconAttach from "assets/images/icons8-attach-48.svg";
import iconLink from "assets/images/icons8-link-96-v3.svg";
import imageDemo from "assets/images/task-detail-image.png";
import moment from "moment";
import {useOnClickOutside} from "services/hooks/useOnclickOutside";

export const PcmPrintTaskComment:FC = () => {
    const [showDetail, setShowDetail] = useState(false);
    const detailRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(detailRef, () => setShowDetail(false));

    return (
        <div className={"item-comment flex items-start pb-4"}>
            <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[32px] w-[32px] min-h-[32px] min-w-[32px] max-h-[32px] max-w-[32px] mx-2"}/>
            <div className={"comment-content ml-4 flex-1"}>
                <div className={"comment-content-wrapper"}>
                    <div className={"user-name"}>
                        <div className={"font-bold"}>Vũ Thanh Bình-CPMI</div>
                        <div className={"text-primary-gray flex items-center"}>
                            <span className={"mr-2 text-xs"}>tới Lê Lưu Phong-CPMI và 3 người khác</span>
                            <button
                                onClick={() => setShowDetail(!showDetail)}
                                className={"relative"}>
                                <img src={trigangleDown} alt={"-----"} />
                                {
                                    showDetail &&
                                    <div
                                        ref={detailRef}
                                        className={"absolute top-full bg-white left-[50%] shadow-lg rounded-md max-w-[600px] min-w-[600px] p-3"}>
                                        <table className={"table-fixed w-full"}>
                                            <tbody>
                                            <tr>
                                                <td className={"text-primary-gray w-1/6 text-left py-2"}>
                                                    Từ
                                                </td>
                                                <td className={"text-left text-black py-2"}>
                                                    Vũ Thanh Bình-CPMI
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className={"text-primary-gray w-1/6 text-left py-2"}>
                                                    Tới
                                                </td>
                                                <td className={"text-left text-black py-2"}>
                                                    Nguyễn Hữu Hiệp-PGI, Nguyễn Hữu Hiệp-PGI, Nguyễn Hữu Hiệp-PGI, Nguyễn Hữu Hiệp-PGI, Nguyễn Hữu
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className={"text-primary-gray w-1/6 text-left py-2"}>
                                                    Ngày tạo
                                                </td>
                                                <td className={"text-left text-black py-2"}>
                                                    15:30 22/12/2012 (10 day ago)
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                }
                            </button>
                        </div>
                    </div>
                    <div className={"comment-infor flex items-center"}>
                        <span className={"text-primary-gray text-xs"}>15:30 22/12/2012 (10 day ago)</span>
                    </div>
                    <div className="comment-text mt-2 break-all">
                        <p></p>
                        <p>Kính gửi anh Phong và các anh chị.<br/>
                            Em gửi
                        anh Bảng xác định giá trị khối lượng công việc hoàn thành cho thanh toán đợt 01 gói thầu Thiết
                        kế âm thanh, nghe nhìn và hạ tầng thông tin.&nbsp;<br/>Chi tiết anh/chị xem file đính kèm.<br/>Trân
                            trọng!<br/><br/></p><p></p>
                    </div>

                    <div className={"comment-extra-content transition-all"}>
                        <div className={"comment-attach mt-4"}>
                            <div className={"comment-attach-item flex items-start justify-between mb-2"}>
                                <img src={iconAttach} alt={"---"}/>
                                <table className={"table-fixed w-full"}>
                                    <tbody>
                                        <tr>
                                            <td className={"truncate"}>
                                                <a href={"#"} download className={"text-primary w-[60px]"}>20220223-CPMI.PGI.NBK.VPU-HopTraoDoi.pdf </a>
                                            </td>
                                            <td className={"text-primary w-1/4"}>
                                                (111 KB)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2} className={"text-primary-gray text-xs"}>
                                                Vũ Thanh Bình-CPMI 25/02/22 16:44 (1 day ago)
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={"comment-attach-item flex items-start justify-between mb-2"}>
                                <img src={iconAttach} alt={"---"}/>
                                <table className={"table-fixed w-full"}>
                                    <tbody>
                                    <tr>
                                        <td className={"truncate"}>
                                            <a href={"#"} download className={"text-primary w-[60px]"}>20220223-CPMI.PGI.NBK.VPU-HopTraoDoi.pdf </a>
                                        </td>
                                        <td className={"text-primary w-1/4"}>
                                            (111 KB)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} className={"text-primary-gray text-xs"}>
                                            Vũ Thanh Bình-CPMI 25/02/22 16:44 (1 day ago)
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className={"comment-images mt-4"}>
                            <div className={"grid grid-cols-3 gap-2"}>
                                {
                                    [...Array(3)].map((e,i) => (
                                        <div key={i} className={"w-full h-0 pb-[100%] bg-primary-gray relative cursor-pointer"}>
                                            <img alt={'----'} src={imageDemo} className={"object-cover absolute z-1 min-h-full"}/>

                                            {
                                                i==2&&
                                                <div className={"w-full h-full absolute z-2 bg-white bg-opacity-40 flex items-center justify-center text-lg text-white"}>
                                                    10+
                                                </div>
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}