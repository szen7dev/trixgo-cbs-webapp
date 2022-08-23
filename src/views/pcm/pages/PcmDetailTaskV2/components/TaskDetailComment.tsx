import {FC, useState, useContext, useEffect} from "react";
import iconForum from "assets/images/icons8-discussion-forum-64.svg";
import taskUserAvt from "assets/images/task-user.svg";

import CollapseShow from "assets/images/CBS-Collapse-Show.svg";
import CollapseHide from "assets/images/CBS-Collapse-Hide.svg";
import { useCommentPcm } from "services/hooks/useTask";
import { Task, Comment as CommentType, CommentProps } from "typings/task";
import { ChildResponseComment, ParentResponseComment, ReplyResponseComment } from "views/pcm/shareComponents/common";
import CommentContext from 'views/pcm/contexts/comment/comment.context';
import TaskRepository from "apis/task";
import { useAuth } from "services/hooks/auth/useAuth";

type Props = {
    task: Task;
    refetchInfo?: () => void;
}

export const TaskDetailComment: FC<Props> = ({ task, refetchInfo }) => {
    const [filter, setFilter] = useState(1);
    const [collapseComment, setCollapseComment] = useState(false);
    const [isOpenCreateResponse, setIsOpenCreateResponse] = useState(false);
	const [amountComment, setAmountComment] = useState(0);

	const { state, dispatch } = useContext(CommentContext);

    const { user } = useAuth();

    const { listComments, totalRecord, limit } =
        useCommentPcm({
			params: {
                taskID: task._id,
                official: filter === 2 ? true : false,
            },
			isFetchComment: true
		});

    useEffect(() => {
		listComments && dispatch({ type: 'SET_COMMENTS', payload: listComments.reverse() });
	}, [JSON.stringify(listComments)])

    useEffect(() => {
		if(totalRecord < limit) return;
		setAmountComment(totalRecord - limit);
	}, [totalRecord])

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
                <img src={iconForum} alt={'-----'} className={"mr-4"}/>
                <button onClick={() => setFilter(1)} className={"text-primary-gray text-lg " + (filter === 1 ? "font-bold border-b border-primary-gray": "")}>
                    Phản hồi liên quan ({task.amountResponse})
                </button>
                <button onClick={() => setFilter(2)} className={"text-primary-gray text-lg mx-4 " + (filter === 2 ? "font-bold border-b border-primary-gray": "")}>
                    Nội dung chốt ({task.amountMarkedResponse})
                </button>
                {/* <button onClick={() => setFilter(3)} className={"text-primary-gray text-lg mx-4 " + (filter === 3 ? "font-bold border-b border-primary-gray": "")}>
                    Hiện trạng (0)
                </button>
                <button onClick={() => setFilter(4)} className={"text-primary-gray text-lg mx-4 " + (filter === 4 ? "font-bold border-b border-primary-gray": "")}>
                    Giải pháp (0)
                </button> */}
                <div className={"flex flex-1 items-center justify-end"}>
                    <button onClick={() => setCollapseComment(!collapseComment)} className={"flex items-center justify-center w-[40px] h-[40px]"}>
                        <img src={CollapseShow} alt={"----"} className={!collapseComment ? "hidden":"block"}/>
                        <img src={CollapseHide} alt={"----"} className={collapseComment ? "hidden":"block"}/>
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
                        userId={user?._id}
                        onConfirmUpdate={refetchInfo}
                    />
                ))}
            </div>

            {isOpenCreateResponse &&
                <ReplyResponseComment
                    task={task}
                    onCancelCreateResponse={() => setIsOpenCreateResponse(false)}
                    onConfirmCreate={() => {
                        setIsOpenCreateResponse(false);
                        refetchInfo?.();
                    }}
                />
            }
            <button
                className={"bg-cbs-form-input-bg rounded px-4 py-2 rounded text-primary-gray ml-12 mt-3"}
                onClick={() => setIsOpenCreateResponse(true)}
            >
                Tạo phản hồi
            </button>
        </div>
    )
}