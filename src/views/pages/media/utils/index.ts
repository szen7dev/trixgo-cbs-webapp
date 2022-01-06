export const objPopulate = {
	populates: JSON.stringify({
		value: 'comment userCreate lastestReplyID',
		select: '_id fullname image parent content files images amountCommentReply amountReaction createAt'
	}),
	populates1: JSON.stringify({
		value: 'files images comment userCreate lastestReplyID',
		select: '_id name url size type fullname image content files images amountCommentReply amountReaction'
	}),
	populates2: JSON.stringify({
		value: 'files images',
		select: '_id name url size type'
	}),
}

export const typeTextSelected = (key: string) : string => {
	switch (key) {
		case 'company':
			return "Nội bộ công ty";
		case 'department':
			return "Dự án phòng ban";
		case 'digital-conversion':
			return "Chuyển đổi số";
		case 'system':
			return "Hệ thống";
		case 'just-me':
			return "Lưu trữ cá nhân";
		default:
			return '';
	}
}

export const typePostSelected = (key: number) : string => {
	switch (key) {
		case 1:
			return 'company';
		case 2:
			return 'department';
		case 3:
			return 'digital-conversion';
		case 4:
			return 'system';
		case 5:
			return 'just-me';
		default:
			return '';
	}
}
