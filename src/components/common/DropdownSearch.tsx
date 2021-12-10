import React, {FC, ReactNode, useEffect, useRef, useState} from "react";
import {map as _map} from "lodash";
import API from "../../apis/repository";
import {GetSearchSelectResponse} from "../../typings/apis/searchSelect";
import {useOnClickOutside} from "../../services/hooks/useOnclickOutside";

export type Item = {
    id: string | number;
    text: string | number;
    imageUrl?: string;
    [key: string]: string | number | ReactNode;
}

type Props = {
    id?: string;
    data?: Array<Item>;
    placeholder?: string;
    searchUrl?: string;
    searchParam?: string;
    initialValue?: string | number;
    onchangeValue?: (item: Item) => void;
    className?: string;
    classNameItem?: string;
    renderItem?: (item: Item) => ReactNode
}

type Params = {
    [key: string]: string;
}
const DropdownSearchable:FC<Props> = ({
      data,
      searchUrl,
      searchParam,
      id,
      placeholder = 'Lựa chọn',
      initialValue,
      onchangeValue,
      className,
      classNameItem,
      renderItem
    }) => {

    const [value, setValue] = useState<Item>();
    const [displayData, setDisplayData] = useState<Array<Item>>([]);
    const [showOption, setShowOption] = useState(false);
    const [firstInit, setFirstInit] = useState(true);
    const [defaultValueHaveBeenChange, setDefaultValueHaveBeenChange] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setFirstInit(false);
        // in case having default data array and default value id
        if (data) {
            setDisplayData(data);
            const initialItem = data?.find(item => item.id === initialValue);
            setValue(initialItem);
        }
    }, []);

    useEffect(() => {
        // in case have to make request for first time and default value id
        if (!data && !defaultValueHaveBeenChange) {
            const initialItem = displayData?.find(item => item.id === initialValue);
            setValue(initialItem)
        }
    }, [displayData]);

    useOnClickOutside(wrapperRef, () => setShowOption(false))

    useEffect(() => {
        //If already have data, dont make request for first time
        if (firstInit && data) return ;
        const delayDebounceFn = setTimeout(() => {
            // Send Axios request here
            doSearching(searchTerm)
        }, 1000);

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm,data]);

    const handleSetValue = (item: Item) => {
        setValue(item);
        setShowOption(false);
        setDefaultValueHaveBeenChange(true);
        if (onchangeValue) {
            onchangeValue(item);
        }
    };

    const toggleShowOption = () => {
        setShowOption(!showOption)
    };

    const doSearching = async (searchString:string) => {
        if (!searchUrl||!searchParam) return;
        const params:Params = {};
        params[searchParam] = searchString;
        const {result} = await getSearchResult(searchUrl, params);
        setDisplayData(result??[]);
    };

    const getSearchResult = async (url:string, params:Params={}): Promise<GetSearchSelectResponse> => {
        const { data } = await API.get<GetSearchSelectResponse>(
            `${url}`,
            { params }
        );

        return data;
    };

    const renderOptions = () => {
        if (displayData?.length === 0 ) {
            return (
                <div className={"pt-3 pb-3 alert alert-warning m-3"}>Danh sách rỗng</div>
            )
        }
        return _map(displayData, (option) => (
            <div
                key={option.id}
                className={"select-option flex cursor-pointer pt-2 pb-2 pr-4 pl-4 " + (classNameItem ?? '') + (option.id === value?.id ? 'bg-blue-100':'')}
                onClick={() => handleSetValue(option)}
                data-option-value={option.id}
            >
                {
                    renderItem?
                        renderItem(option):
                        <div className={"flex align-items-center"}>
                            {option?.imageUrl?<img alt={"Avt"} src={option.imageUrl} className={"w-9 h-9"}/>:null}<span className={"flex-1 ml-1 mr-1"}>{option.text}</span>
                        </div>
                }
            </div>
        ))
    };

    return (
        <div ref={wrapperRef} id={id} placeholder={placeholder} className={"relative select-dropdown " + (className??'')} data-value={value?.id}>
            <p onClick={() => toggleShowOption()} className="flex border border-gray-400 p-1 h-full rounded pl-2 pr-2 cursor-pointer align-items-center">
                <span className={"flex-1"}>{value?.text??placeholder}</span>
                <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 7L0.00480938 0.25L12.9952 0.25L6.5 7Z" fill="#C4C4C4"/>
                </svg>
            </p>
            {showOption?<div className={"shadow-lg rounded select-options-container absolute"}>
                <input
                    className="select-search w-full p-3 pt-5 border-b"
                    placeholder={"Nhập nội dung"}
                    type='text'
                    autoComplete='off'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="select-options-section overflow-auto bg-white">
                    {renderOptions()}
                </div>
            </div>:null}
        </div>
    )
};

export default DropdownSearchable;
