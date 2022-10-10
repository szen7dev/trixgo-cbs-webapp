import React, { ChangeEvent, FC, UIEvent, useState } from "react";
// import iconClock from "assets/images/icons8-clock-48.svg";
// import taskUserAvt from "assets/images/task-user.svg";
// import iconHorizontalDots from "assets/images/three-dots-horizontal-v2.svg";
import iconMessageLink from "assets/images/icons8-message-link-48.svg";
import iconRateStar from "assets/images/icons8-review-100 (1) 1.svg";
import Close from "assets/icons/Close";
import { ReleatedTaskItem } from "./ReleatedTaskItem";
import { Task } from "typings/task";
import { useTask } from "services/hooks/useTask";
import { debounce } from 'lodash';
import { toast } from "react-toastify";
import { Button, Checkbox, FormControlLabel, Rating, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { makeStyles } from '@mui/styles';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type Props = {
    task: Task;
    userId?: string;
    refetchInfo: () => void;
}

export const TaskDetailEvaluate: FC<Props> = ({ task }) => {
    // const labels: { [index: string]: string } = {
    //     0.5: "Useless",
    //     1: "Useless+",
    //     1.5: "Poor",
    //     2: "Poor+",
    //     2.5: "Ok",
    //     3: "Ok+",
    //     3.5: "Good",
    //     4: "Good+",
    //     4.5: "Excellent",
    //     5: "Excellent+"
    // };

    // function getLabelText(value: number) {
    //     return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    // }
    const [value, setValue] = React.useState<number | null>(2);
    const [hover, setHover] = React.useState(-1);

    const [alignment, setAlignment] = React.useState<string | null>('left');

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        setAlignment(newAlignment);
    };
    const checkedIcon = () => {
        return (
            <KeyboardArrowDownIcon />
        );
    };

    return (
        <div className={"subtask mt-5"}>
            <div className={"flex items-center mb-6"}>
                <div className={"flex items-center"}>
                    <img src={iconMessageLink} alt={'-----'} className={"mr-4"} />
                    <span className={"text-primary-gray text-[16px] font-bold"}>
                        Đánh giá
                    </span>
                </div>
            </div>
            <div className="flex ml-6">
                <div className="w-1/2">
                    <div className="flex items-end mb-4	">
                        <div className="w-[200px] text-primary-gray">Đơn vị tính</div>
                        <div>m2</div>
                    </div>
                    <div className="flex items-end mb-4	">
                        <div className="w-[200px] text-primary-gray">Khối lượng</div>
                        <div>1500</div>
                    </div>
                    <div className="flex items-end mb-4	">
                        <div className="w-[200px] text-primary-gray">Đơn giá</div>
                        <div>100.000</div>
                    </div>
                    <div className="flex items-end mb-4	">
                        <div className="w-[200px] text-primary-gray">Thành tiền</div>
                        <div>150.000.000</div>
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="flex items-center mb-4 max-height-20">
                        <div className="w-[200px] text-primary-gray">Tiến độ</div>
                        <div>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size="small"
                                        color="primary"
                                        checkedIcon={<KeyboardArrowDownIcon className="bg-primary text-white w-[24px] rounded-md" />}
                                        defaultChecked />
                                }
                                label="Chậm"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size="small"
                                        color="primary"
                                        checkedIcon={<KeyboardArrowDownIcon className="bg-primary text-white w-[24px] rounded-md" />}
                                    />
                                }
                                label="Đạt"
                            />
                        </div>
                    </div>
                    <div className="flex items-center mb-4	">
                        <div className="w-[200px] text-primary-gray">Chất lượng:</div>
                        <div className="flex w-[200px] item-center">
                            <Rating
                                name="hover-feedback"
                                value={value}
                                precision={0.5}
                                // getLabelText={getLabelText}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                }}
                                emptyIcon={<StarBorderOutlinedIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />
                            {/* {value !== null && (
                                <div className="ml-2">{labels[hover !== -1 ? hover : value]}</div>
                            )} */}
                        </div>
                    </div>
                    <div className="flex items-start mb-4	">
                        <div className="w-[200px] text-primary-gray">Nhận xét</div>
                        <div className="">
                            <p>Tổng thống Putin nói rằng quân đội Nga tấn công cơ sở hạ tầng năng lượng và quân sự của Ukraine bằng tên lửa dẫn đường tầm xa.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ml-6">
                <button className={"bg-cbs-form-input-bg rounded px-4 py-2 text-primary-gray mt-4 ml-6"}>
                    Cập nhật đánh giá
                </button>
            </div>
        </div>
    );

}