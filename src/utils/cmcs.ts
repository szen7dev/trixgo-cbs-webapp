import moment from "moment";
import { DATE_FORMAT } from "apis/localdb/index";

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

export const convertDateToString = (date: Date): string => {
  return (date && moment(date).isValid() && moment(date).toJSON()) || ""
}

export const convertDisplayDate = (date: string, format = DATE_FORMAT): string => {
  return moment(date).isValid() && moment(date).format(format) || ''
}

export const formatNumberMoney = (number: number | string): string => {
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

export const convertInitialValueDropdownForLocalDB = (dataList: any[], item: any): Item | '' => {
  if (!item) {
    return ''
  }

  if (item.isInitialValue) {
    return item
  }

  return convertInitialValueDropdown(dataList.find(obj => obj.value === item), 'value', 'text')

}

export const MESSAGE_ERROR = {
  required: 'Vui lòng nhập thông tin.'
}