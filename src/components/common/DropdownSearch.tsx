import React, {FC, ReactNode, useEffect, useRef, useState} from "react";
import {map as _map} from "lodash";
import API from "../../apis/repository";
import {GetSearchSelectResponse} from "../../typings/apis/searchSelect";
import {useOnClickOutside} from "../../services/hooks/useOnclickOutside";
import Close from "../../assets/icons/Close";
import TriangleDown from "../../assets/icons/TriangleDown";

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
    initialValue?: string | number | Array<string|number>;
    onchangeValue?: (item: Item) => void;
    className?: string;
    classNameItem?: string;
    classNameInput?: string;
    renderItem?: (item: Item) => ReactNode;
    isMultiple?: boolean;
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
      classNameInput,
      renderItem,
      isMultiple
    }) => {

    const [value, setValue] = useState<Item>();
    const [values, setValues] = useState<Array<Item>>();
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
            setDefaultValue(data);
        }
    }, []);

    useEffect(() => {
        // in case have to make request for first time and default value id
        if (!data && !defaultValueHaveBeenChange) {
            setDefaultValue(displayData);
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
        if (isMultiple) {
            setValues(oldValues => [...oldValues??[], item]);
        } else {
            setValue(item);
        }
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

    const setDefaultValue = (checkDataArr:Array<Item>) => {
        if (initialValue) {
            if (isMultiple) {
                if (typeof initialValue !== "number" && typeof initialValue !== "string") {
                    const initialItem = checkDataArr?.filter(item => initialValue.includes(item.id));
                    setValues(initialItem ?? []);
                }
            } else {
                const initialItem = checkDataArr?.find(item => item.id === initialValue);
                setValue(initialItem);
            }
        }
    }

    const handleRemoveItem = (id:string|number) => {
        setValues(values?.filter(item => item.id !== id));
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
                className={
                    "select-option flex cursor-pointer pt-2 pb-2 pr-4 pl-4 " +
                    (classNameItem ?? '') +
                    (isMultiple ? (values?.find(v => v.id === option.id) ? 'bg-blue-100':'') : (option.id === value?.id ? 'bg-blue-100':''))
                }
                onClick={() => handleSetValue(option)}
                data-option-value={option.id}
            >
                {
                    renderItem?
                        renderItem(option):
                        <div className={"flex align-items-center"}>
                            {option?.imageUrl?<img alt={"Avt"} src={option.imageUrl} className={"w-9 h-9 object-cover rounded-full"}/>:null}<span className={"flex-1 ml-1 mr-1"}>{option.text}</span>
                        </div>
                }
            </div>
        ))
    };

    const renderSelectedValue = () => {
        if (isMultiple) {
            return (
                <div className={"flex border border-gray-400 p-1 h-full rounded pl-2 pr-4 cursor-pointer align-items-center flex-wrap overflow-y-scroll " + (classNameInput??'')}>
                    {/*<div className={"flex flex-wrap"}>*/}
                        {_map(values, (option) => (
                            <div onClick={() => handleRemoveItem(option.id)} key={option.id} className={"relative border rounded-full py-0.5 pl-2 pr-8 mb-1"}>
                                {option?.text}
                                <div className={"absolute inset-y-0 right-0 flex items-center justify-center pr-2"}>
                                    <Close/>
                                </div>
                            </div>
                        ))}
                    {/*</div>*/}
                    <div className={"absolute inset-y-0 right-0 flex items-center justify-center px-1"} onClick={() => toggleShowOption()}>
                        <TriangleDown/>
                    </div>
                </div>
            )
        }
        return (
            <div onClick={() => toggleShowOption()} className={"relative flex border border-gray-400 p-1 h-full rounded pl-2 pr-4 cursor-pointer align-items-center " + (classNameInput??'')}>
                <span className={"flex-1"}>{value?.text??placeholder}</span>
                <div className={"absolute inset-y-0 right-0 flex items-center justify-center px-1"}>
                    <TriangleDown/>
                </div>
            </div>
        )
    }

    return (
        <div ref={wrapperRef} id={id} placeholder={placeholder} className={"relative select-dropdown " + (className??'')} data-value={value?.id}>
            {renderSelectedValue()}
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
const defaultProps: Props = {
    isMultiple: false,
}
DropdownSearchable.defaultProps = defaultProps;
export default DropdownSearchable;
