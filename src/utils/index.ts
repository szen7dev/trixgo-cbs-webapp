import moment from "moment";
import { toast } from "react-toastify";
import { DATE_FORMAT } from "apis/localdb";

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
    const arr = text?.split("\n") ?? [];
    let paragraphs = '';

    for (const item of arr) {
        paragraphs = paragraphs + '<p>' + item.replace(urlRegex, '<a style="font-weight: normal;" href="$1">$1</a>') + '</p>';
    }

    return paragraphs;
}

export async function handleException (callback: any, callbackError?: any){
    try {
        await callback();
    } catch (error) {
        if(callbackError) return callbackError(error);

        if (typeof error === "string") {
            toast.error(error);
        } else if (error instanceof Error) {
            toast.error(error.message);
        }
    }
}

export function generateIamgePath(path: string): string {
  return `${process.env.REACT_APP_URL_S3}${path}`;
}