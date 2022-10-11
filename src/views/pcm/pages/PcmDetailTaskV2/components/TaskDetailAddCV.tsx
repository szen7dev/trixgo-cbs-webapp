// library
import React, { ChangeEvent, FC, UIEvent, useState } from "react";
import { debounce } from 'lodash';
import { toast } from "react-toastify";
import { Button, Checkbox, FormControlLabel, Rating, ToggleButton, ToggleButtonGroup } from "@mui/material";
import moment from 'moment';
//
import { ReleatedTaskItem } from "./ReleatedTaskItem";
import { useTask } from "services/hooks/useTask";
import { humanFileSize } from 'utils/converter';
import { Comment as CommentType, CommentPayload, CommentProps, Task } from "typings/task";
import {useFileCore} from 'services/hooks/useFileCore';
// icon
import IconNote from 'assets/images/icons8-document-100 4.svg';
import IconAttach from 'assets/images/icons8-attach-96 1.svg';
import iconAttach from "assets/images/icons8-attach-48.svg";
import iconLink from "assets/images/icons8-link-96-v3.svg";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import iconClock from "assets/images/icons8-clock-48.svg";
// import taskUserAvt from "assets/images/task-user.svg";
// import iconHorizontalDots from "assets/images/three-dots-horizontal-v2.svg";
import iconMessageLink from "assets/images/icons8-message-link-48.svg";
import iconRateStar from "assets/images/icons8-review-100 (1) 1.svg";
import Close from "assets/icons/Close";

type Props = {
    task: Task;
    userId?: string;
    refetchInfo: () => void;
}

export const TaskDetailAddCV: FC<Props> = ({ task }) => {

    const handleCopyLinkAttachment = (path: string) => {
        const copyText = `${process.env.REACT_APP_URL_S3}${path}`;
        navigator.clipboard.writeText(copyText);
        toast.info('Đã copy link vào clipboard', { autoClose: 1000 });
    }
    const { updateFileAsync } = useFileCore();
    const handleUpdateDescriptionFile = debounce(async (e: any) => {
		await updateFileAsync({
			fileID: e.target.dataset.fileid,
			description: e.target.value
		});
	}, 1000)

    return (
        <div className={"subtask mt-5"}>
            <div className={"flex items-center mb-9"}>
                <div className={"flex items-center"}>
                    <img src={IconNote} alt={'-----'} className={"mr-4"} />
                    <span className={"text-primary-gray text-[16px] font-bold"}>
                        Hồ sơ đình kèm
                    </span>
                </div>
            </div>
            <div className="ml-6">
                <div className="flex mb-6">
                    <div className="">
                        <div className="border-b-0.5 border-cbs-form-input-bg pb-3">
                            <div>Giấy chứng nhận Đăng ký doanh nghiệp (thay đổi lần thứ 2 ngày 17/05/2021)</div>
                            <div className="text-primary-gray ">Phùng Thị Hà-PGI-20/07/2021</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="text-primary font-bold mb-4">
                        <a href="">Xem 15 tài liệu trước</a>
                    </div>
                    <div className="my-1">
                        <a href="">
                            <div className="flex justify-between">
                                <div className="flex text-black w-1/2"><img src={IconAttach} className="mr-1" />CBS.A25.ChiTietChaoGia-CHG.pdf</div>
                                <div className="flex justify-between text-primary-gray w-1/2">
                                    <div className="w-[200px]">
                                        Trần Thị Ngân-CPMI
                                    </div>
                                    <div className="w-[200px]">
                                        07/12/2021 15:38
                                    </div>
                                    <div className="w-[200px]">
                                        356 KB
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="my-1">
                        <a href="">
                            <div className="flex justify-between">
                                <div className="flex text-black w-1/2"><img src={IconAttach} className="mr-1" />CBS.A25.ChiTietChaoGia-CHG.pdf</div>
                                <div className="flex justify-between text-primary-gray w-1/2">
                                    <div className="w-[200px]">
                                        Trần Thị Ngân-CPMI
                                    </div>
                                    <div className="w-[200px]">
                                        07/12/2021 15:38
                                    </div>
                                    <div className="w-[200px]">
                                        356 KB
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="my-1">
                        <a href="">
                            <div className="flex justify-between">
                                <div className="flex text-black w-1/2"><img src={IconAttach} className="mr-1" />CBS.A25.ChiTietChaoGia-CHG.pdf</div>
                                <div className="flex justify-between text-primary-gray w-1/2">
                                    <div className="w-[200px]">
                                        Trần Thị Ngân-CPMI
                                    </div>
                                    <div className="w-[200px]">
                                        07/12/2021 15:38
                                    </div>
                                    <div className="w-[200px]">
                                        356 KB
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );

}