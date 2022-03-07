import moment from "moment";
import { DATE_FORMAT } from "apis/localdb";

const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

export const abbreviateNumber = (number = 0): string => {
    // what tier? (determines SI symbol)
    const tier = Math.log10(Math.abs(number)) / 3 | 0;

    // if zero, we don't need a suffix
    if (+tier === 0) return `${number}`;

    // get suffix and determine scale
    const suffix = SI_SYMBOL[tier];
    const scale = Math.pow(10, tier * 3);

    // scale the number
    const scaled = number / scale;

    // format number and add suffix
    return scaled.toFixed(1) + suffix;
};

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

export const convertDisplayDate = (date: any, format = DATE_FORMAT) => {
    return moment(date).isValid() && moment(date).format(format)
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

export const nl2p = function (text: string){
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    let paragraphs = '';
    const arr = text.split("\n");
    for (const item of arr) { 
        paragraphs = paragraphs + '<p>' + item.replace(urlRegex, '<a style="font-weight: normal;" href="$1">$1</a>') + '</p>'; 
    }

    return paragraphs;
}