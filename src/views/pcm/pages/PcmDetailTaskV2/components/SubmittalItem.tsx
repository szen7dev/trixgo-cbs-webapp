import React, { FC, useRef, useState } from "react"
import iconClock from "assets/images/icons8-clock-48.svg";
import taskUserAvt from "assets/images/task-user.svg";
import { useOnClickOutside } from "services/hooks/useOnclickOutside";
import moment from "moment";
import { toast } from "react-toastify";
import { Popover } from "@mui/material";
import { BudgetSubmittal } from "typings/budget/budget-submittal";
import { Link } from "react-router-dom";

type Props = {
    task: BudgetSubmittal;
    userId: string | undefined;
    index: number;
}

export const SubmittalItem: FC<Props> = ({ task, userId, index }) => {
    return (
        <div className="flex items-start justify-between mt-4 min-w-fit">
            <input
                className="form-check-input"
                type="checkbox"
                // defaultChecked={}
                // disabled={}
                // onChange={handleUpdateStatusTask}
            />
            <div className="mx-2 px-2 w-full">
                <p className="text-[14px]">
                    <Link to={"/pcm/detail/" + task._id}>
                        {index + 1}. {task.name} | { task?.sign } | { task?.amount } 
                    </Link>
                </p>
            </div>
        </div>
    )
}