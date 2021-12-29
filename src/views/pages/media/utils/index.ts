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
			return "Thành viên trong công ty";
		case 'just-me':
			return "Chỉ mình tôi";
		case 'departments':
			return "Dự án, phòng ban";
		case 'community':
			return "Cộng đồng";
		case 'system':
			return "Hệ thống";
		default:
			return "Thành viên trong công ty";
	}
}

export const typePostSelected = (key: number) : string => {
	switch (key) {
		case 1:
			return 'company';
		case 2:
			return 'just-me';
		case 3:
			return 'departments';
		case 4:
			return 'community';
		case 5:
			return 'system';
		default:
			return '';
	}
}
