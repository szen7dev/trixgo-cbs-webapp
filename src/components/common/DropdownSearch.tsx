import React, {FC, ReactNode, useEffect, useRef, useState} from "react";
import {map as _map} from "lodash";
import API from "../../apis/repository";
import {GetSearchSelectResponse} from "../../typings/apis/searchSelect";
import {data} from "autoprefixer";

export type Item = {
    id: string | number;
    text: string | number;
    beforeOption?: ReactNode;
    afterOption?: ReactNode;
}

type Props = {
    id?: string;
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

    const [searchTerm, setSearchTerm] = useState('');
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        /**
         * Hide options if clicked on outside of element
         */
        function handleClickOutside(event: { target: any; }) {
            if (wrapperRef && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowOption(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            // Send Axios request here
            doSearching(searchTerm)
        }, 1000)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])

    const handleSetValue = (item: Item) => {
        setValue(item);
        setShowOption(false);
        if (onchangeValue) {
            onchangeValue(item);
        }
    };

    const toggleShowOption = () => {
        setShowOption(!showOption)
    }

    const doSearching = async (searchString:string) => {
        if (!searchUrl||!searchParam) return;
        const params:Params = {};
        params[searchParam] = searchString;
        const {result} = await getSearchResult(searchUrl, params);
        setDisplayData(result??[]);
    }

    const getSearchResult = async (url:string, params:Params={}): Promise<GetSearchSelectResponse> => {
        const { data } = await API.get<GetSearchSelectResponse>(
            `${url}`,
            { params }
        );

        return data;
    }

    const renderOptions = () => {
        if (displayData?.length === 0 ) {
            return (
                <div className={"pt-3 pb-3 alert alert-warning mt-3"}>Danh sách rỗng</div>
            )
        }
        return _map(displayData, (option) => (
            <div
                key={option.id}
                className={"flex align-items-center cursor-pointer pt-2 pb-2 " + classNameItem ?? ''}
                onClick={() => handleSetValue(option)}
                data-option-value={option.id}
            >
                {
                    renderItem?
                        renderItem(option):
                        <div className={"flex"}>
                            {option.beforeOption}<span className={"flex-1 ml-1 mr-1"}>{option.text}</span>{option.afterOption}
                        </div>
                }
            </div>
        ))
    }

    return (
        <div ref={wrapperRef} id={id} placeholder={placeholder} className={"relative select-dropdown " + className??''} data-value={value?.id}>
            <p onClick={() => toggleShowOption()} className="flex border border-gray-400 p-1 rounded pl-2 pr-2 cursor-pointer align-items-center">
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
                <div className="select-options-section pr-4 pl-4">
                    {renderOptions()}
                </div>
            </div>:null}
        </div>
    )
};

export default DropdownSearchable;
