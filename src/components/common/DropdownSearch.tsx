import React, {FC, ReactNode, useEffect, useRef, useState} from "react";
import {map as _map} from "lodash";
import API from "../../apis/repository";
import {GetSearchSelectResponse} from "../../typings/apis/searchSelect";
import {useOnClickOutside} from "../../services/hooks/useOnclickOutside";
import Close from "../../assets/icons/Close";
import TriangleDown from "../../assets/icons/TriangleDown";

export type Item = {
    id?: string | number;
    text?: string | number;
    imageUrl?: string;
    [x: string]: any;
}

type FormatItem = {
    id?: string | number;
    text?: string | number;
    [x: string]: any;
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
    focusedClass?: string;
    renderItem?: (item: Item) => ReactNode;
    renderSelectedItem?: (item: Item) => ReactNode;
    isMultiple?: boolean;
    showTriangle?: boolean;
    allowClearValueSingleInput?: boolean;
    maxWidthInput?: string;
    maxHeightInput?: string;
    formatItem?: FormatItem;
    inlineSearch?: boolean;
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
                                          focusedClass,
                                          renderItem,
                                          isMultiple,
                                          showTriangle,
                                          allowClearValueSingleInput,
                                          renderSelectedItem,
                                          maxWidthInput,
                                          formatItem,
                                          inlineSearch,
                                          maxHeightInput
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

    const readDataValue = (item: Item|undefined, key: string) => {
        if (!item) return undefined;
        if (formatItem) {
            return item[formatItem[key]]
        }
        return item[key];
    }

    const modifyItem = (item: Item) => {
        if (formatItem) {
            return {
                ...item,
                id: item[formatItem.id??"id"],
                text: item[formatItem.text??"text"],
                imageUrl: item[formatItem.imageUrl??"imageUrl"],
            }
        }
        return item
    }

    const handleSetValue = (item: Item) => {
        setShowOption(false);
        setSearchTerm('');
        setDefaultValueHaveBeenChange(true);
        if (isMultiple) {
            setValues(oldValues => [...oldValues??[], item]);
        } else {
            setValue(item);
        }
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
                    const initialItem = checkDataArr?.filter(item => initialValue.includes(readDataValue(item, "id")));
                    setValues(initialItem ?? []);
                }
            } else {
                const initialItem = checkDataArr?.find(item => readDataValue(item, "id") === initialValue);
                setValue(initialItem);
            }
        }
    }

    const handleRemoveItem = (id:string|number) => {
        setValues(values?.filter(item => readDataValue(item,"id") !== id));
    };

    const handleRemoveItemSingle = () => {
        setValue(undefined);
    };

    const renderOptions = () => {
        if (displayData?.length === 0 ) {
            return (
                <div className={"pt-3 pb-3 alert alert-warning m-3"}>Danh sách rỗng</div>
            )
        }
        return _map(displayData, (option) => (
            <div
                key={readDataValue(option,"id")}
                className={
                    (classNameItem ?? '') +
                    " select-option hover:bg-gray-100 transition duration-150 flex cursor-pointer py-3 px-4 " +
                    (
                        isMultiple ?
                            (values?.find(v => readDataValue(v,"id") === readDataValue(option,"id")) ? 'bg-blue-100':'') :
                            (readDataValue(option,"id")=== readDataValue(value,"id") ? 'bg-blue-100':''))
                }
                onClick={() => handleSetValue(option)}
                data-option-value={option.id}
            >
                {
                    renderItem?
                        renderItem(modifyItem(option)):
                        <div className={"flex align-items-center"}>
                            {readDataValue(option,"imageUrl")?<img alt={"Avt"} src={readDataValue(option,"imageUrl")} className={"w-9 h-9 object-cover rounded-full"}/>:null}<span className={"flex-1 ml-1 mr-1"}>{readDataValue(option,"text")}</span>
                        </div>
                }
            </div>
        ))
    };

    const renderMultiSelectedValue = () => {
        return (
            <div
                onClick={() => toggleShowOption()}
                className={(classNameInput??'') + " flex p-1 pl-2 pr-7 cursor-pointer align-items-center flex-wrap overflow-y-scroll"}
            >
                {/*<div className={"flex flex-wrap"}>*/}
                {
                    ((typeof values === "undefined" || values?.length <= 0)&&!inlineSearch)?
                        <span
                            className={"text-left text-gray-300"}>
                            {placeholder}
                        </span>:
                        null
                }
                {_map(values, (option) => (
                    <div key={readDataValue(option, "id")} className={"relative border rounded-full py-0.5 pl-2 pr-8 mb-1"}>
                        {
                            renderSelectedItem?
                                renderSelectedItem(modifyItem(option)):
                                readDataValue(option,"text")
                        }
                        <div className={"absolute inset-y-0 right-0 flex items-center justify-center pr-2"}>
                            <Close onClick={() => handleRemoveItem(readDataValue(option,"id"))}/>
                        </div>
                    </div>
                ))}
                {
                    inlineSearch&&
                    <input
                        placeholder={placeholder}
                        className={"inline-search-dropdown flex-1 ml-1 focus:outline-none"}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                }
                {/*</div>*/}
                <div className={"absolute inset-y-0 right-0 flex items-center justify-center px-1"}>
                    {showTriangle?<TriangleDown/>:null}
                </div>
            </div>
        )
    }

    const renderSingleSelectedValueWithClearValue = () => {
        return (
            !value ?
                (
                    inlineSearch?
                    <input
                        placeholder={placeholder}
                        className={"inline-search-dropdown flex-1 ml-1 focus:outline-none"}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />:
                    <div className={"flex-1 flex text-left text-gray-300"}>{placeholder}</div>
                ):
                (
                    <div className={"flex text-left relative border rounded-full py-0.5 pl-2 pr-8 mb-1 " + (!value ? "text-gray-300":'')}>
                        {
                            renderSelectedItem?
                                renderSelectedItem(modifyItem(value)):
                                readDataValue(value,"text")
                        }
                        <div className={"absolute inset-y-0 right-0 flex items-center justify-center pr-2"}>
                            <Close onClick={() => handleRemoveItemSingle()}/>
                        </div>
                    </div>
                )
        )
    }

    const renderSingleSelectedValueWithoutClearValue = () => {
        return (
            !value ?
                (
                    inlineSearch?
                        <input
                            placeholder={placeholder}
                            className={"inline-search-dropdown flex-1 ml-1 focus:outline-none"}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />:
                        <div className={"flex-1 flex text-left text-gray-300"}>{placeholder}</div>
                ):
                (
                    <div className={"flex-1 flex text-left " + (!value ? "text-gray-300":'')}>
                        <div>
                            {
                                readDataValue(value, "text")?
                                    (
                                        renderSelectedItem?
                                            renderSelectedItem(modifyItem(value)):
                                            readDataValue(value,"text")
                                    ) :
                                    placeholder
                            }
                        </div>
                    </div>
                )
        )
    }

    const renderSingleSelectedValue = () => {
        return (
            <div onClick={() => toggleShowOption()} className={(classNameInput??'') + " relative flex p-1 h-full pl-2 pr-7 cursor-pointer align-items-center"}>
                {
                    allowClearValueSingleInput?
                        renderSingleSelectedValueWithClearValue():
                        renderSingleSelectedValueWithoutClearValue()
                }
                <div className={"absolute inset-y-0 right-0 flex items-center justify-center px-1"}>
                    {showTriangle?<TriangleDown/>:null}
                </div>
            </div>
        )
    }

    const renderSelectedValue = () => {
        if (isMultiple) {
            return renderMultiSelectedValue();
        }
        return renderSingleSelectedValue();
    }

    const maxWidthClass = isMultiple?(maxWidthInput?maxWidthInput:"max-w-[250px]"):"";
    const maxHeightClass = isMultiple?(maxHeightInput??""):"";
    const beingFocusClass = (showOption?(focusedClass??""):"");
    const extraClassName = (className??'');
    return (
        <div ref={wrapperRef} id={id} placeholder={placeholder} className={`${extraClassName} relative select-dropdown ${maxWidthClass} ${maxHeightClass} ${beingFocusClass}`} data-value={value?.id}>
            {renderSelectedValue()}
            {showOption?<div className={"shadow-lg rounded select-options-container absolute z-50"}>
                {!inlineSearch&&<input
                    className="select-search w-full p-3 pt-5 border-b"
                    placeholder={"Nhập nội dung"}
                    type='text'
                    autoComplete='off'
                    value={searchTerm}
                    autoFocus
                    onChange={(e) => setSearchTerm(e.target.value)}
                />}
                <div className="select-options-section overflow-auto bg-white">
                    {renderOptions()}
                </div>
            </div>:null}
        </div>
    )
};
const defaultProps: Props = {
    isMultiple: false,
    showTriangle: true,
}
DropdownSearchable.defaultProps = defaultProps;
export default DropdownSearchable;
