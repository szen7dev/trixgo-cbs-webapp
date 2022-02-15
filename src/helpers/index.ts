import moment from "moment";

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