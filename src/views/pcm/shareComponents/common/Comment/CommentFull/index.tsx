import { FC } from 'react';

import CommentProvider from 'views/pcm/contexts/comment/comment.provider';
import { RootCommentsList } from '../RootCommentsList';
import { ReplyCommentField } from '../ReplyCommentField';
import { CommentProps, Task } from 'typings/task';

type Props = {
  userId?: string;
  taskInfo: Task;
	comments: CommentProps[];
  amountComment: number;
  totalRecord: number;
  limit: number;
  hasPermission: boolean;
  onConfirm: (method?: string) => void
}

export const CommentFull: FC<Props> = ({
    userId, taskInfo, comments, amountComment, totalRecord, limit, hasPermission, onConfirm
}) => {
    return (
        <CommentProvider>
            <div className="text-x-large py-3 px-6 font-bold">
              Bình luận {amountComment > 0 ? `(${amountComment})` : ''}
            </div>
            <RootCommentsList
              className="px-5"
              userID={userId}
              comments={comments}
              totalRecord={totalRecord}
              limit={limit}
              taskID={taskInfo._id}
            />
            <div className='flex flex-col w-full max-h-full overflow-y-auto'>
              {hasPermission && (
                <ReplyCommentField
                    attachFile
                    inputContainerClassName="flex w-full p-2"
                    fileContainerClassName="border-t-0.5 border-cbs-border mr-7 divide-y-0.5 divide-cbs-border"
                    projectID={taskInfo?.project?._id}
                    groupID={taskInfo?.group?._id}
                    taskID={taskInfo._id}
                    onConfirm={onConfirm}
                />
              )}
            </div>
        </CommentProvider>
    )
}