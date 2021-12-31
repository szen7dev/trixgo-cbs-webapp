
```js
// Hook
import { useCommentSocial } from 'services/hooks/useSocial';
// Components
import { CommentProvider, ReplyCommentField, RootCommentsList } from 'components/common/comments';

const CommentArea = ({ mediaID }) => {
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
```

OR 

```js
// Components
import CommentArea from 'components/common/comments';

const Page = ({ mediaID }) => {
	return (
		<CommentArea mediaID={mediaID} />
	)
}
```