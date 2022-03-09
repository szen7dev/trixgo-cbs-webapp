import type { User } from 'typings/user';
import type { FileProps } from 'typings/common';

export interface IPackage {
	id: number | string
	title: string | number
}
export interface IProjects {
	id: number|string
	content: string
	publisher: string
	created_by: string
	created_at: string
	code: string
	count: number
	signed: boolean
	require_response: boolean
	note: string | null | undefined
	address: string
}

export type CommentProps = {
	_id: string;
	document: {
	  _id: string;
	  author: User;
	  createAt: string
	};
	content: string,
	files: FileProps[] | undefined;
	images: FileProps[] | undefined;
	author: User,
	amountCommentReply: number,
	amountReaction: number,
	parent: string;
	createAt: string,
	lastestReplyID: CommentProps;
	receivers?: string[]
}

export type CommentPayload = {
	documentID: string;
	commentID?: string;
	parentID?: string;
	content: string;
	files?: string[];
	images?: string[];
  };