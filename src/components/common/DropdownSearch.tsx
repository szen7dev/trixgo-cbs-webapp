import React, {FC, ReactNode, useState} from "react";
import {map as _map} from "lodash";

type Item = {
    id: string | number;
    text: string | number;
    beforeOption?: ReactNode;
}

type SearchObject = {
    url: string;
    searchParam: string;
}

type Props = {
    id?: string;
    placeholder?: string;
    searchUrl?: SearchObject;
    data?: Array<Item>;
    initialValue?: string | number;
    onchangeValue?: (item: Item) => void;
    className?: string;
    classNameItem?: string;
}

const DropdownSearchable:FC<Props> = ({
      data,
      searchUrl,
      id,
      placeholder = 'Lựa chọn',
      initialValue,
      onchangeValue,
      className,
      classNameItem
    }) => {

    const initialItem = data?.find(item => item.id === initialValue);

    const [value, setValue] = useState(initialItem);
    const handleSetValue = (item: Item) => {
        setValue(item);
        if (onchangeValue) {
            onchangeValue(item);
        }
    };

    return (
        <div id={id} placeholder={placeholder} className={"relative " + className??''} data-value={value?.id}>
            <p>{value?.text??placeholder}</p>
            {_map(data, (option) => (
                <div className={"cursor-pointer " + classNameItem??''} onClick={() => handleSetValue(option)} data-option-value={option.id}>{option.text}</div>
            ))}
        </div>
    )
};

export default DropdownSearchable;