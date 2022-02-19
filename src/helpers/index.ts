import moment from "moment";

export type Item = {
	value?: string | number;
	label?: string | number;
	imageUrl?: string;
	[x: string]: any;
};

export const convertObToUrl = (obj: any) => {
	let str = "";
	for (const key in obj) {
		if (str != "") {
			str += "&";
		}
		str += key + "=" + encodeURIComponent(obj[key]);
	};
	return str;
};

export const convertDateToString = (date: any) => {
	return (date && moment(date).isValid() && moment(date).toJSON()) || ""
}

export const formatNumberMoney = (number: any) => {
	return (Number(number).toLocaleString('de-DE')) || ""
}

export const convertInitialValueDropdown = (item: any, value = '_id', label = 'name', label_2 = ''): Item | '' => {
	if (!item) {
		return ''
	}

	if (item.isInitialValue) {
		return item
	}

	return {
		value: item[value],
		label: label_2 ? item[label] + " - " + item[label_2] : item[label],
		isInitialValue: true
	}
}