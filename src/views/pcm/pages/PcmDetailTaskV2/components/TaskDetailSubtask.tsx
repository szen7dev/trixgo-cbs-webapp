import React, {FC} from "react";
import iconTickBox from "assets/images/icons8-tick-box-48.svg";
import iconClock from "assets/images/icons8-clock-48.svg";
import taskUserAvt from "assets/images/task-user.svg";
import iconHorizontalDots from "assets/images/three-dots-horizontal-v2.svg";
import {DropdownSearchable} from "../../../../../shareComponents/common";
import TagIcon from "../../../../../assets/images/icons8-price-tag-96.svg";
import DatePicker from "react-datepicker";
import moment from "moment";
import {getIn} from "formik";
import DayPickerInput from "react-day-picker/DayPickerInput";

export const TaskDetailSubtask:FC = () => {
    const progress = 100;

    return (
        <div className={"subtask mt-8 w-9/12"}>
            <div className={"flex items-center"}>
                <div className={"flex items-center"}>
                    <img src={iconTickBox} alt={'-----'} className={"mr-4"}/>
                    <span className={"text-primary-gray text-lg font-bold"}>
                            Việc con
                        </span>
                </div>
                <div className={"flex-1 flex items-center justify-end"}>
                    <button className={"bg-cbs-form-input-bg py-2 px-4 rounded mr-4 text-primary-gray"}>
                        Hiện việc hoàn thành (1)
                    </button>
                    <button className={"bg-cbs-form-input-bg py-2 px-4 rounded text-primary-gray"}>
                        Hiển thị thêm (24)
                    </button>
                </div>
            </div>
            <div className={"progress-bar flex items-center mt-4"}>
                <span className={"text-primary-gray mr-2"}>100%</span>
                <div className={"bar-progress-line overflow-hidden flex-1 h-[8px] rounded-full bg-cbs-form-input-bg relative"}>
                    <div style={{width: `${progress}%`}} className={"absolute h-full top-0 left-0 transition-all " + (progress < 100 ? "bg-primary":"bg-positive")}/>
                </div>
            </div>
            <div className={"list-subtask mt-4"}>
                <div className={"flex items-start justify-between mt-4"}>
                    <input checked className="form-check-input" type="checkbox" value="" id="check"/>
                    <div className={"mx-2"}>
                        <p>1. PGI.BLD.Lập, phê duyệt thực hiện quy chế kế tài chính của PGI để trình cổ đông xem xét phê duyệt</p>
                        <p className={"text-xs text-cbs-highlight-color"}>Ngô Trọng Quyền-CPMI</p>
                    </div>
                    <div className={"flex items-center justify-center px-4 py-1 rounded text-white bg-cbs-completed mr-6"}>
                        <img src={iconClock} alt={"----"} className={"mr-2"}/>
                        <span>17/2/22</span>
                    </div>
                    <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-2"}/>
                    <button className={"rounded w-[24px] h-[24px] bg-cbs-form-input-bg flex items-center justify-center"}>
                        <img src={iconHorizontalDots} alt={"----"} className={"w-[10px]"}/>
                    </button>
                </div>
                <div className={"flex items-start justify-between mt-4"}>
                    <input checked className="form-check-input" type="checkbox" value="" id="check"/>
                    <div className={"mx-2"}>
                        <p>1. PGI.BLD.Lập, phê duyệt thực hiện quy chế kế tài chính của PGI để trình cổ đông xem xét phê duyệt</p>
                        <p className={"text-xs text-cbs-highlight-color"}>Ngô Trọng Quyền-CPMI</p>
                    </div>
                    <div className={"flex items-center justify-center px-4 py-1 rounded text-white bg-cbs-completed mr-6"}>
                        <img src={iconClock} alt={"----"} className={"mr-2"}/>
                        <span>17/2/22</span>
                    </div>
                    <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-2"}/>
                    <button className={"rounded w-[24px] h-[24px] bg-cbs-form-input-bg flex items-center justify-center"}>
                        <img src={iconHorizontalDots} alt={"----"} className={"w-[10px]"}/>
                    </button>
                </div>

                <div className={"create-new-subtask border-0.5 border-primary-border rounded ml-6 mt-4"}>
                    <div className="flex w-full p-4">
                        <div className="w-3/6 border-b">
                            <input
                                name="name"
                                className="w-full h-8 placeholder-gray-300 focus:outline-none"
                                placeholder="Nội dung công việc"
                            />
                        </div>
                        <div className="w-2/6 mx-3 border-b">
                            <DropdownSearchable
                                placeholder={"Người thực hiện"}
                                className={"w-full flex-1"}
                                showTriangle={false}
                                maxWidthInput={"max-w-none"}
                                isMultiple={false}
                                allowClearValueSingleInput={true}
                                renderSelectedItem={(item) => (
                                    <div className={"flex items-center"}>
                                        <img alt={"tag icon"} src={TagIcon} />
                                        <span>{item.text}</span>
                                    </div>
                                )}
                                data={[]}
                                formatItem={{
                                    id: "value",
                                    text: "label",
                                }}
                                inlineSearch={true}
                            />
                        </div>
                        <div className="w-1/6 border-b">
                            <DayPickerInput
                                value={"12/07/2022"}
                                classNames={{
                                    container: "w-full relative h-full",
                                    overlay: "w-full",
                                    overlayWrapper: "absolute bg-white w-full right-0 z-200"
                                }}
                                onDayChange={(day) => console.log(moment(day).format("DD/MM/YYYY"))}
                                inputProps={{
                                    className: "outline-none h-full",
                                    placeholder: "Thời hạn",
                                    readOnly: true,
                                }}
                            />
                        </div>
                    </div>

                    <div className={"flex items-center justify-end pt-0 p-4"}>
                        <button className={"py-2 px-4 rounded bg-cbs-form-input-bg text-primary-gray mr-2"}>
                            Bỏ qua
                        </button>
                        <button className={"py-2 px-4 rounded bg-primary text-white"}>
                            Xác nhận
                        </button>
                    </div>
                </div>

                <button className={"bg-cbs-form-input-bg rounded px-4 py-2 text-primary-gray mt-4 ml-6"}>
                    Thêm một mục
                </button>
            </div>
        </div>
    )
}