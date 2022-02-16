import { FC } from "react";

import { useCommentSocial } from "services/hooks/useSocial";

import { CommentProvider } from "views/pages/document/contexts/comment";
import RootCommentsList from "views/pages/document/components/comments/RootCommentsList";
import ReplyCommentField from "views/pages/document/components/comments/ReplyCommentField";

interface Props {
	mediaID: string
}

const CommentArea: FC<Props> = ({ mediaID }) => {
	const { listComments, totalRecord, limit } = useCommentSocial({
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