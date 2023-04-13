import { FC } from "react";
import moment from 'moment';
import { Task } from "typings/task";
import IconNote from 'assets/images/icons8-document-100 4.svg';
import { Link } from "react-router-dom";

type Props = {
    task: Task;
    userId?: string;
    refetchInfo: () => void;
}

export const TaskDetailAddCV: FC<Props> = ({ task }) => {
    const linksDocs = task.linksDocs;
    return (
        <div className={"subtask mt-5"}>
            <div className={"flex items-center mb-3"}>
                <div className={"flex items-center"}>
                    <img src={IconNote} alt={'-----'} className={"mr-4"} />
                    <span className={"text-primary-gray text-[16px] font-bold"}>
                        Hồ sơ đính kèm
                    </span>
                </div>
            </div>
            <div className="ml-6">
                { linksDocs?.map((item: any, index: any) => {
                    return (
                        <div className="flex mb-6" key={index}>
                            <div className="">
                                <div className="border-b-0.5 border-cbs-form-input-bg pb-3">
                                    <Link to={"/document/home/" + item._id} className="text-cbs-highlight-color">
                                        <div>{item?.name} - {item?.sign} - {moment(item?.date).format("L")} - {item?.storage?.name}</div>
                                    </Link>
                                    <div className="text-primary-gray ">{item?.author?.bizfullname}-{moment(item?.createAt).format("L")}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}