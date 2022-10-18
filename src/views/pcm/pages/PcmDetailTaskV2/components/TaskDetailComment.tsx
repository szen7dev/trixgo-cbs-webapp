import { FC, useState, useContext, useEffect } from "react";
import iconForum from "assets/images/icons8-discussion-forum-64.svg";
// import taskUserAvt from "assets/images/task-user.svg";

import CollapseShow from "assets/images/CBS-Collapse-Show.svg";
import CollapseHide from "assets/images/CBS-Collapse-Hide.svg";
import { useCommentPcm } from "services/hooks/useTask";
import { Task, CommentProps } from "typings/task";
import { ParentResponseComment, ReplyResponseComment } from "views/pcm/shareComponents/common";
import CommentContext from 'views/pcm/contexts/comment/comment.context';
import TaskRepository from "apis/task";
import { useAuth } from "services/hooks/auth/useAuth";
import { ModalZoomView } from "shareComponents/common";
import { ImageProps } from "typings/common";
import { useSocket } from "services/hooks/useSocket";

type Props = {
    task: Task;
    userId?: string;
    refetchInfo?: () => void;
}

export const TaskDetailComment: FC<Props> = ({ task, userId, refetchInfo }) => {
    const [filter, setFilter] = useState(1);
    const [collapseComment, setCollapseComment] = useState(false);
    const [isOpenCreateResponse, setIsOpenCreateResponse] = useState(false);
    const [amountComment, setAmountComment] = useState(0);
    const [isShowImageFullScreen, setIsShowImageFullScreen] = useState(false);
    const [defaultState, setDefaultState] = useState({
        mediaID: '',
        images: [] as ImageProps[],
        index: 0,
        createAt: ""
    });

    const { state, dispatch } = useContext(CommentContext);
    const { current: socket }: any = useSocket();
    const { user } = useAuth();

    const { listComments, totalRecord, limit } =
        useCommentPcm({
            params: {
                taskID: task._id,
                type: filter,
                official: filter === 2,
            },
            isFetchComment: true
        });

    useEffect(() => {
        listComments && dispatch({ type: 'SET_COMMENTS', payload: listComments.reverse() });
    }, [JSON.stringify(listComments)])

    useEffect(() => {
        if (totalRecord < limit) return;
        setAmountComment(totalRecord - limit);
    }, [totalRecord])

    useEffect(() => {
        const onEventAddComment = (result: any) => {
            const { data, error } = result;

            if (error) return;

            const { infoObject, infoComment, parentID, method } = data;

            if (infoObject?._id !== task._id) return;
            if (user?._id === infoComment?.author?._id) return;

            switch (data.commentType) {
                case 'COMMENT': {
                    if (method === 'UPDATE') {
                        return dispatch({
                            type: 'UPDATE_COMMENT',
                            payload: {
                                commentID: infoComment._id,
                                parent: parentID,
                                body: infoComment,
                            }
                        });
                    }

                    dispatch({ type: 'ADD_COMMENT', payload: infoComment });
                    break;
                }
                default:
                    break;
            }
        }

        socket?.on("COMMENT_SSC_ADD_COMMENT", onEventAddComment);

        return () => {
            socket?.off("COMMENT_SSC_ADD_COMMENT", onEventAddComment);
        }
    }, [socket])

    const handleClickViewMore = async () => {
        const { error, data } = await TaskRepository.listComments({
            lastestID: state.comments[0]?._id,
            taskID: task._id,
        });
        setAmountComment(amountComment - limit);

        if (!error && data?.listRecords?.length) {
            dispatch({ type: 'VIEW_MORE_COMMENTS', payload: data?.listRecords?.reverse() });
        }
    }

    const _comments: CommentProps[] = state.comments;

    return (
        <div className={"task-comment mt-5"}>
            <div className={"flex items-center"}>
                <img src={iconForum} alt={'-----'} className={"mr-4"} />
                <button onClick={() => setFilter(1)} className={"text-primary-gray text-[16px] " + (filter === 1 ? "font-bold border-b border-primary-gray" : "")}>
                    Phản hồi liên quan ({task.amountResponse || 0})
                </button>
                <button onClick={() => setFilter(6)} className={"text-primary-gray text-[16px] mx-4 " + (filter === 6 ? "font-bold border-b border-primary-gray" : "")}>
                    Fille ({task.authorAttachs || 0})
                </button>
                {((task.subType === 4 && task.openedStatus === 1) || task.assignee?._id === userId || task.subType !== 4) && (
                    <button onClick={() => setFilter(2)} className={"text-primary-gray text-[16px] mx-4 " + (filter === 2 ? "font-bold border-b border-primary-gray" : "")}>
                        Nội dung chốt ({task.amountMarkedResponse || 0})
                    </button>
                )}
                <button onClick={() => setFilter(3)} className={"text-primary-gray text-[16px] mx-4 " + (filter === 3 ? "font-bold border-b border-primary-gray" : "")}>
                    Hiện trạng ({task.amountCurrentStatus || 0})
                </button>
                <button onClick={() => setFilter(4)} className={"text-primary-gray text-[16px] mx-4 " + (filter === 4 ? "font-bold border-b border-primary-gray" : "")}>
                    Giải pháp ({task.amountSolution || 0})
                </button>
                <button onClick={() => setFilter(5)} className={"text-primary-gray text-[16px] mx-4 " + (filter === 5 ? "font-bold border-b border-primary-gray" : "")}>
                    Khác ({task.amountResponseOther || 0})
                </button>
                <div className={"flex flex-1 items-center justify-end"}>
                    <button onClick={() => setCollapseComment(!collapseComment)} className={"flex items-center justify-center w-[40px] h-[40px]"}>
                        <img src={CollapseShow} alt={"----"} className={!collapseComment ? "hidden" : "block"} />
                        <img src={CollapseHide} alt={"----"} className={collapseComment ? "hidden" : "block"} />
                    </button>
                </div>
            </div>

            {amountComment > 0 && (
                <button className={"font-bold text-primary-gray my-6"} onClick={handleClickViewMore}>
                    Xem {amountComment} phản hồi trước
                </button>
            )}

            <div className={"list-comment mt-4"}>
                {/* !totalRecord && !_comments?.length */}
                {_comments.map((comment: CommentProps) => (
                    <ParentResponseComment
                        key={comment._id}
                        task={task}
                        comment={comment}
                        socket={socket}
                        tab={filter}
                        userId={user?._id}
                        onConfirmUpdate={refetchInfo}
                        onClickImage={(comment: CommentProps, index: number) => {
                            if (comment.images?.length) {
                                setDefaultState({
                                    mediaID: comment._id,
                                    images: comment.images,
                                    index,
                                    createAt: comment.createAt
                                });
                                setIsShowImageFullScreen(true);
                            }
                        }}
                    />
                ))}
            </div>

            {isOpenCreateResponse &&
                <ReplyResponseComment
                    task={task}
                    tab={filter}
                    socket={socket}
                    userId={userId}
                    onCancelCreateResponse={() => setIsOpenCreateResponse(false)}
                    onConfirmCreate={() => {
                        setIsOpenCreateResponse(false);
                        refetchInfo?.();
                    }}
                />
            }
            <button
                className={"bg-cbs-form-input-bg rounded px-4 py-2 rounded text-primary-gray ml-12 mt-5"}
                onClick={() => setIsOpenCreateResponse(true)}
            >
                Tạo phản hồi
            </button>
            <ModalZoomView
                isShow={isShowImageFullScreen}
                toggle={() => setIsShowImageFullScreen(!isShowImageFullScreen)}
                initialData={defaultState}
            />
        </div>
    )
}