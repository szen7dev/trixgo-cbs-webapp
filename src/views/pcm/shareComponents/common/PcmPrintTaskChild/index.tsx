import React, { FC, useMemo, useRef, useState } from "react";
import moment from "moment";

import taskUserAvt from "assets/images/task-user.svg";
import trigangleDown from "assets/images/triangle-down.svg";
import iconAttach from "assets/images/icons8-attach-48.svg";
// import iconLink from "assets/images/icons8-link-96-v3.svg";
// import imageDemo from "assets/images/task-detail-image.png";

// import {useOnClickOutside} from "services/hooks/useOnclickOutside";
import { Task } from "typings/task";
import { humanFileSize } from "utils/converter";

type Props = {
    task: Task;
}

export const PcmPrintTaskChild:FC<Props> = ({ task }) => {
    const [showDetail, setShowDetail] = useState(false);
    const detailRef = useRef<HTMLDivElement>(null);

    // useOnClickOutside(detailRef, () => setShowDetail(false));

    const receiversText = useMemo(() => {
        if (!task.related) return 'Tới';

        const totalRemainPeople = task.related.length - 2;
        const receiversWillShow = task.related.slice(0, 2);
        const receiversName = receiversWillShow.map(receiver => receiver.bizfullname).join(', ');

        const str = totalRemainPeople > 0 ? `${receiversName} và ${totalRemainPeople} người khác` : receiversName;

        {/* tới Lê Lưu Phong-CPMI, Nguyễn Đắc Toàn-TRX và 3 người khác */ }
        return `Tới ${str}`;
    }, [task.related]);

    const authorImagesAttach = useMemo(() => {
        if(!task.authorAttachs || !task.authorAttachs?.length) return [];

        const imagesAttach = task.authorAttachs.filter(item => item.type == '1');

        return imagesAttach;
    }, [task.authorAttachs])

    return (
        <div className={"item-comment flex items-start pb-4"}>
            <img alt={"----"} src={task.author?.image ? `${process.env.REACT_APP_URL_S3_USER}/${task?.author?.image}` : taskUserAvt} className={"rounded-full overflow-hidden h-[32px] w-[32px] min-h-[32px] min-w-[32px] max-h-[32px] max-w-[32px] mx-2"}/>
            <div className={"comment-content ml-4 flex-1"}>
                <div className={"comment-content-wrapper"}>
                    <div className={"user-name"}>
                        <div className={"font-bold"}>{task.author?.bizfullname}</div>
                        <div className={"text-primary-gray flex items-center"}>
                            <span className={"mr-2 text-xs"}>
                                {receiversText}
                            </span>
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
                                                        {task.author?.bizfullname}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className={"text-primary-gray w-1/6 text-left py-2"}>
                                                        Tới
                                                    </td>
                                                    <td className={"text-left text-black py-2"}>
                                                        {task.related?.map?.(user => user.bizfullname)}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className={"text-primary-gray w-1/6 text-left py-2"}>
                                                        Ngày tạo
                                                    </td>
                                                    <td className={"text-left text-black py-2"}>
                                                        {moment(task.createAt).format('HH:mm DD/MM/YYYY')} ({moment(task.createAt).fromNow()})
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
                        <span className={"text-primary-gray text-xs"}>
                            {moment(task.createAt).format('HH:mm DD/MM/YYYY')} ({moment(task.createAt).fromNow()})
                        </span>
                    </div>
                    <div className="comment-text mt-2 break-all">
                        <div className={"mt-2"} dangerouslySetInnerHTML={{
                            __html: task.description && task.description?.replace(/\n/g, '<br />')
                        }} />
                    </div>

                    <div className={"comment-extra-content transition-all"}>
                        {!!task.authorAttachs?.length && (
                            <div className={"comment-attach mt-4"}>
                                {task.authorAttachs?.map(file => {
                                    if (file.type == '1') return;

                                    return (
                                        <div key={file._id} className={"comment-attach-item flex items-start justify-between mb-2"}>
                                            <img src={iconAttach} alt={"---"}/>
                                            <table className={"table-fixed w-full"}>
                                                <tbody>
                                                    <tr>
                                                        <td className={"truncate"}>
                                                            <a href={`${process.env.REACT_APP_URL_S3}${file.path}`} download className={"text-primary w-[60px]"}>
                                                                {file.nameOrg}
                                                            </a>
                                                        </td>
                                                        <td className={"text-primary w-1/4"}>
                                                            ({humanFileSize(file.size)})
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={2} className={"text-primary-gray text-xs"}>
                                                            {file.author?.bizfullname} {' '}
                                                            {moment(file.createAt).format('DD/MM/YY HH:mm')} {' '}
                                                            ({moment(file.createAt).fromNow()}) {' '}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    )
                                })}
                            </div>
                        )}

                        {!!task.authorAttachs?.length && (
                            <div className={"comment-images mt-4"}>
                                <div className={"grid grid-cols-3 gap-2"}>
                                    {authorImagesAttach?.slice?.(0, 3).map?.((file: any, index: number) => {
                                        return (
                                            <div key={file._id} className={"w-full h-0 pb-[100%] bg-primary-gray relative cursor-pointer"}>
                                                <img
                                                    src={`${process.env.REACT_APP_URL_S3}${file.path}`}
                                                    alt={file.nameOrg}
                                                    className={"object-cover absolute z-1 min-h-full"}
                                                />
                                                {
                                                    (authorImagesAttach.length > 3 && index === 2) && (
                                                        <div className={"w-full h-full absolute z-2 bg-white bg-opacity-40 flex items-center justify-center text-lg text-white"}>
                                                            {authorImagesAttach.length - 3}+
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* <div className={"comment-images mt-4"}>
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
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}