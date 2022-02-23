import { FC } from "react";

import { useCommentMedia } from "services/hooks/useMedia";

import { CommentProvider } from "views/document/contexts/comment";
import { RootCommentsList } from "../RootCommentsList";
import { ReplyCommentField } from "../ReplyCommentField";

interface Props {
	mediaID: string
}

const CommentArea: FC<Props> = ({ mediaID }) => {
	const { listComments, totalRecord, limit } = useCommentMedia({
		mediaID,
		key: `list_comments.${mediaID}`
	});

	return (
		<CommentProvider>
			<div className="pt-6 relative flex-1 overflow-y-auto">
				{/* Replace with your content */}
				<RootCommentsList
					className="px-5"
					comments={listComments}
					totalRecord={totalRecord}
					limit={limit}
					mediaID={mediaID}
				/>
				{/* /End replace */}
			</div>
			{/* Footer */}
			<div>
				<ReplyCommentField className='border-t border-cbs-border' inputContainerClassName="flex w-full p-2" mediaID={mediaID} />
			</div>
		</CommentProvider>
	)
}

export default CommentArea;
export { CommentProvider, RootCommentsList, ReplyCommentField };