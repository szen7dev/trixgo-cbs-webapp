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

const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

export const abbreviateNumber = (number = 0) : string => {

    // what tier? (determines SI symbol)
    const tier = Math.log10(Math.abs(number)) / 3 | 0;

    // if zero, we don't need a suffix
    if(+tier === 0) return `${number}`;

    // get suffix and determine scale
    const suffix = SI_SYMBOL[tier];
    const scale = Math.pow(10, tier * 3);

    // scale the number
    const scaled = number / scale;

    // format number and add suffix
    return scaled.toFixed(1) + suffix;
}