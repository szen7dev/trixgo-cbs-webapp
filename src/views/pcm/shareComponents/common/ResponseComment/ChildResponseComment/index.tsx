import { FC, useState } from "react";
import taskUserAvt from "assets/images/task-user.svg";
import trigangleDown from "assets/images/triangle-down.svg";
import iconUpload from "assets/images/icons8-upload-48.svg";
import iconAttach from "assets/images/icons8-attach-48.svg";
import iconLink from "assets/images/icons8-link-96-v3.svg";
import imageDemo from "assets/images/task-detail-image.png";
import {listEmoji} from "../../../../../messages/pages/MessageHome/sections/ChattingSection";

type Props = {
    task: any;
}

export const ChildResponseComment: FC<Props> = () => {
    const [collapseComment, setCollapseComment] = useState(false);

    return (
        <div className={"child-comment mt-4"}>
            <div className={"item-comment flex items-start border-b-0.5 border-primary-border pb-4"}>
                <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[44px] w-[44px] min-h-[44px] min-w-[44px] max-h-[44px] max-w-[44px] mx-2"} />
                <div className={"comment-content ml-4 flex-1"}>
                    <div className={"comment-content-wrapper"}>
                        <div className={"flex items-center justify-between"}>
                            <div className={"user-name"}>
                                <div className={"font-bold"}>Vũ Thanh Bình-CPMI</div>
                                {
                                    !collapseComment &&
                                    <div className={"text-primary-gray flex items-center"}>
                                        <span className={"mr-2"}>tới Lê Lưu Phong-CPMI, Nguyễn Đắc Toàn-TRX và 3 người khác</span><img src={trigangleDown} alt={"-----"} />
                                    </div>
                                }
                            </div>
                            <div className={"comment-infor flex items-center"}>
                                <span className={"text-primary-gray"}>15:30 22/12/2012 (10 day ago)</span>
                                <input className="form-check-input mx-4" type="checkbox" value="" id="check" />
                                {
                                    !collapseComment &&
                                    <button className={"ml-4"}>
                                        <img src={iconUpload} alt={"-----"} />
                                    </button>
                                }
                            </div>
                        </div>
                        <div className={"comment-text mt-2"}>
                            Gửi anh Phong, <br />
                            Em thêm Mr.Phan Châu Tín-ARMO và Mr. Nguyễn Mạnh Hùng-ARMO vào mục người liên quan của đầu việc này để nắm thông tin nhé.
                        </div>

                        <div className={"comment-extra-content transition-all " + (collapseComment ? "h-0 overflow-hidden" : "")}>

                            <div className={"comment-attach mt-4"}>
                                <div className={"comment-attach-item flex items-start justify-between mb-2"}>
                                    <img src={iconAttach} alt={"---"} />
                                    <div className={"comment-attach-item-file-infor mx-2"}>
                                        <a href={"#"} download className={"text-primary"}>20220223-CPMI.PGI.NBK.VPU-HopTraoDoi.pdf (111 KB)</a>
                                        <p className={"text-primary-gray text-xs"}>Vũ Thanh Bình-CPMI 25/02/2022 16:44 (1 day ago)</p>
                                    </div>
                                    <input className={"flex-1 text-primary-gray text-center focus:outline-none focus:ring-none"} placeholder={"Nhập nội dung ghi chú"} />
                                    <button>
                                        <img src={iconLink} alt={"---"} />
                                    </button>
                                </div>
                                <div className={"comment-attach-item flex items-start justify-between mb-2"}>
                                    <img src={iconAttach} alt={"---"} />
                                    <div className={"comment-attach-item-file-infor mx-2"}>
                                        <a href={"#"} download className={"text-primary"}>20220223-CPMI.PGI.NBK.VPU-HopTraoDoi.pdf (111 KB)</a>
                                        <p className={"text-primary-gray text-xs"}>Vũ Thanh Bình-CPMI 25/02/2022 16:44 (1 day ago)</p>
                                    </div>
                                    <input className={"flex-1 text-primary-gray text-center focus:outline-none focus:ring-none"} placeholder={"Nhập nội dung ghi chú"} />
                                    <button>
                                        <img src={iconLink} alt={"---"} />
                                    </button>
                                </div>
                            </div>

                            <div className={"comment-images mt-4"}>
                                <div className={"grid grid-cols-6 gap-4"}>
                                    <div className={" border-0.5 border-primary-border bg-cbs-form-input-bg mb-2"}>
                                        <div className={"relative"}>
                                            <img className={"h-[120px] max-h-[120px] min-h-[120px] object-cover w-full"} src={imageDemo} alt={"---"} />
                                            <div className={"text-white px-2 py-4 bg-black opacity-60 absolute text-xs bottom-0 w-full truncate"}>25/02/2022 16:44 (1 day ago)</div>
                                        </div>
                                        <textarea className={"p-2 w-full text-xs h-[60px] min-h-[60px] max-h-[60px] bg-cbs-form-input-bg"} placeholder={"Nhập nội dung ghi chú"}>
                                            Khu vực để xe của tòa nhà có cam bảo vệ, tại trục A1-A2 khu Z
                                        </textarea>
                                    </div>
                                    {
                                        [...Array(2)].map((e, i) => (
                                            <div key={i} className={" border-0.5 border-primary-border bg-cbs-form-input-bg mb-2"}>
                                                <div className={"relative"}>
                                                    <img className={"h-[120px] max-h-[120px] min-h-[120px] object-cover w-full"} src={imageDemo} alt={"---"} />
                                                    <div className={"text-white px-2 py-4 bg-black opacity-60 absolute text-xs bottom-0 w-full truncate"}>25/02/2022 16:44 (1 day ago)</div>
                                                </div>
                                                <textarea className={"p-2 w-full text-xs h-[60px] min-h-[60px] max-h-[60px] bg-cbs-form-input-bg"} placeholder={"Nhập nội dung ghi chú"}>
                                                </textarea>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className={"comment-action mt-4 flex items-center justify-between"}>
                                <div className={"actions"}>
                                    <button className={"font-bold text-primary-gray mr-6"}>
                                        Thích
                                    </button>
                                    <span className={"text-primary-gray"}>15:30 22/12/2012 (2 day ago)</span>
                                </div>
                                <div className={"reactions flex items-center"}>
                                    <span className={"text-secondary-gray mr-2"}>215</span>
                                    <div className={"flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-1.5"}>
                                        {
                                            listEmoji.map(reaction => (
                                                <img key={reaction.id} src={reaction.icon} alt="-----" className="w-[24px] h-[24px] rounded-full bg-slate-100 ring-2 ring-white" loading="lazy" />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}