import React, { FC, useMemo, useRef, useState } from "react";
import moment from "moment";

import taskUserAvt from "assets/images/task-user.svg";
import trigangleDown from "assets/images/triangle-down.svg";
import iconAttach from "assets/images/icons8-attach-48.svg";

import { useOnClickOutside } from "services/hooks/useOnclickOutside";
import { CommentProps, Task } from "typings/task";
import { humanFileSize } from "utils/converter";
import { useCommentPcm } from "services/hooks/useTask";

type Props = {
    comment: CommentProps;
}

type ContainerProps = {
    task: Task;
}

export const PcmPrintTaskComment:FC<Props> = ({ comment }) => {
    const [showDetail, setShowDetail] = useState(false);
    const detailRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(detailRef, () => setShowDetail(false));

    const receiversText = useMemo(() => {
        if (!comment.receivers) return 'Tới';

        const totalRemainPeople = comment.receivers.length - 2;
        const receiversWillShow = comment.receivers.slice(0, 2);
        const receiversName = receiversWillShow.map(receiver => receiver.bizfullname).join(', ');

        const str = totalRemainPeople > 0 ? `${receiversName} và ${totalRemainPeople} người khác` : receiversName;

        {/* tới Lê Lưu Phong-CPMI, Nguyễn Đắc Toàn-TRX và 3 người khác */ }
        return `Tới ${str}`;
    }, [comment.receivers]);

    return (
        <div className={"item-comment flex items-start pb-4"}>
            <img alt={"----"} src={comment.author?.image ? `${process.env.REACT_APP_URL_S3_USER}/${comment?.author?.image}` : taskUserAvt} className={"rounded-full overflow-hidden h-[32px] w-[32px] min-h-[32px] min-w-[32px] max-h-[32px] max-w-[32px] mx-2"}/>
            <div className={"comment-content ml-4 flex-1"}>
                <div className={"comment-content-wrapper"}>
                    <div className={"user-name"}>
                        <div className={"font-bold"}>{comment.author?.bizfullname}</div>
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
                                                        {comment.author?.bizfullname}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className={"text-primary-gray w-1/6 text-left py-2"}>
                                                        Tới
                                                    </td>
                                                    <td className={"text-left text-black py-2"}>
                                                        {comment.receivers?.map?.(user => user.bizfullname)}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className={"text-primary-gray w-1/6 text-left py-2"}>
                                                        Ngày tạo
                                                    </td>
                                                    <td className={"text-left text-black py-2"}>
                                                        {moment(comment.createAt).format('HH:mm DD/MM/YYYY')} ({moment(comment.createAt).fromNow()})
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
                            {moment(comment.createAt).format('HH:mm DD/MM/YYYY')} ({moment(comment.createAt).fromNow()})
                        </span>
                    </div>
                    <div className="comment-text mt-2 break-all">
                        <div className={"mt-2"} dangerouslySetInnerHTML={{
                            __html: comment.content && comment.content?.replace(/\n/g, '<br />')
                        }} />
                    </div>

                    <div className={"comment-extra-content transition-all"}>
                        {!!comment.files?.length && (
                            <div className={"comment-attach mt-4"}>
                                {comment.files?.map(file => {
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

                        {!!comment.images?.length && (
                            <div className={"comment-images mt-4"}>
                                <div className={"grid grid-cols-3 gap-2"}>
                                    {comment.images?.slice?.(0, 3).map?.((file: any, index: number) => {
                                        return (
                                            <div key={file._id} className={"w-full h-0 pb-[100%] bg-primary-gray relative cursor-pointer"}>
                                                <img
                                                    src={`${process.env.REACT_APP_URL_S3}${file.path}`}
                                                    alt={file.nameOrg}
                                                    className={"object-cover absolute z-1 min-h-full"}
                                                />
                                                {
                                                    (comment.images && comment.images.length > 3 && index === 2) && (
                                                        <div className={"w-full h-full absolute z-2 bg-white bg-opacity-40 flex items-center justify-center text-lg text-white"}>
                                                            {comment.images.length - 3}+
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const PcmPrintTaskCommentContainer: FC<ContainerProps> = ({ task }) => {
    const {
        listComments,
        totalRecord,
        isLoadingListComments,
        hasNextPageComments,
        nextPageListComments,
    } = useCommentPcm({
        params: {
            taskID: task?._id,
        },
        isFetchComment: !!task?._id
    });

    if(!task) return <></>;

    if(isLoadingListComments) return <></>;
    if(!listComments || !listComments.length) return <></>;

    return (
        <>
            {listComments.reverse().map(comment => (
                <PcmPrintTaskComment key={comment._id} comment={comment} />
            ))}
        </>
    )
}