export const typeTextSelected = (key: string) => {
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
