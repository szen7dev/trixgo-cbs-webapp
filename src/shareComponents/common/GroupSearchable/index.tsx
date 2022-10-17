import React, { FC, ReactNode, useEffect, useRef, useState, UIEvent, useImperativeHandle, forwardRef } from "react";
import { map as _map } from "lodash";
import classNames from "classnames";
// import API from "../../apis/repository";
// import {GetSearchSelectResponse} from "../../typings/apis/searchSelect";
import { useOnClickOutside } from "services/hooks/useOnclickOutside";
import Close from "assets/icons/Close";
import BlueCheck from "assets/images/blue-check.svg";
import iconBack from "assets/images/VectorArrow.svg";
import iconFolder from "assets/images/icons8-folder-48 3.svg";

export type Item = {
    id?: string | number;
    text?: string | number;
    imageUrl?: string;
    [x: string]: any;
};

type Props = {
    id?: string;
    data?: Array<Item>;
    placeholder?: string;
    className?: string;
    classNameItem?: string;
    classNameInput?: string;
    focusedClass?: string;
    maxWidthInput?: string;
    maxHeightInput?: string;
    onClearData?: () => void;
    disabled?: boolean;
    disableClass?: string;
    onScroll?: (e: UIEvent<HTMLDivElement>) => void
    handleSetValueParent: any,
    handleSetValueChild: any,
    groupParentPicker: any,
    setGroupParentPicker: any,
    dataParent: any,
    dataChild: any,
};

type GroupSearchableHandle = {
    setValueRef: (value: any) => void
}

export const GroupSearchable = forwardRef<GroupSearchableHandle, Props>(({
    id,
    placeholder = "Lựa chọn",
    className,
    classNameItem,
    classNameInput,
    focusedClass,
    maxHeightInput,
    onClearData,
    disabled,
    disableClass,
    onScroll,
    handleSetValueParent,
    handleSetValueChild,
    groupParentPicker,
    setGroupParentPicker,
    dataParent,
    dataChild
}, dropdownsearchRef) => {
    const [value, setValue] = useState<Item>();
    const [values, setValues] = useState<Array<Item>>();
    const [displayData, setDisplayData] = useState<Array<Item>>([]);
    const [showOption, setShowOption] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(wrapperRef, () => setShowOption(false));

    const toggleShowOption = () => {
        if (disabled) return;
        setShowOption(!showOption);
    };

    const renderParentOptions = () => {
        if (dataParent?.length === 0) {
            return (
                <div className={"pt-3 pb-3 alert alert-warning m-3"}>
                    Danh sách rỗng
                </div>
            );
        }
        return _map(dataParent, (option) => (
            <div
                key={option.value}
                className={
                    (classNameItem ?? "") +
                    " select-option max-w-full hover:bg-gray-100 transition duration-150 flex cursor-pointer py-3 px-4 "
                }
                onClick={() => handleSetValueParent(option)}
                data-option-value={option.value}
            >
                <button className="truncate flex hover:bg-cbs-gray w-full">
                    <img src={iconFolder} alt="" />
                    <div className="ml-4">{option?.label}</div>
                </button>
            </div>
        ));
    };

    const renderChildOptions = () => {
        return (
            <div>
                <div className="flex bg-cbs-gray p-4 sticky">
                    <button onClick={() => setGroupParentPicker({})}>
                        <img src={iconBack} alt="" />
                    </button>
                    <div className="ml-4 text-cbs-subtext truncate">{groupParentPicker?.label}</div>
                </div>

                {dataChild?.length === 0 ?
                    <div className={"pt-3 pb-3 alert alert-warning m-3"}>
                        Danh sách rỗng
                    </div> :
                    <div>
                        {_map(dataChild, (option) => (
                            <div
                                key={option.value}
                                className={
                                    (classNameItem ?? "") +
                                    " select-option max-w-full hover:bg-gray-100 transition duration-150 flex cursor-pointer py-3 px-4 "
                                }
                                onClick={() => handleSetValueChild(option)}
                                data-option-value={option.value}
                            >
                                <button className="truncate flex hover:bg-cbs-gray w-full">
                                    <div className="ml-4">{option.label}</div>
                                </button>
                            </div>
                        ))}
                    </div>
                }
            </div>)
    }

    const renderSelectedValue = () => {
        return (
            <div
                onClick={() => toggleShowOption()}
                className={
                    (classNameInput ?? "") +
                    " relative w-full flex p-1 h-full pl-2 cursor-pointer align-items-center"
                }
            >
                {
                    !value ? (
                        <div className={"flex-1 flex text-left"}>{placeholder}</div>
                    ) : (
                        <div className={"flex-1 flex text-left "}>
                            <div
                                title={"asadasdasdasd"}
                            >
                                asdasdasdsadasdsadasd
                            </div>
                        </div>
                    )
                }
            </div>
        );
    };

    const maxHeightClass = maxHeightInput ?? "";
    const beingFocusClass = showOption ? focusedClass ?? "" : "";
    const extraClassName = className ?? "";
    const disableClassCustom = disableClass ?? "bg-gray-100";
    const disabledClass = disabled
        ? `cursor-not-allowed ${disableClassCustom}`
        : "";

    return (
        <div
            ref={wrapperRef}
            id={id}
            placeholder={placeholder}
            className={`${extraClassName} relative select-dropdown flex items-center ${maxHeightClass} ${beingFocusClass} ${disabledClass}`}
            data-value={value?.id}
        >
            {renderSelectedValue()}
            {showOption ? (
                <div
                    className={
                        "shadow-lg bg-white rounded select-options-container absolute z-100 min-w-[240px] max-w-[400px] w-max rounded-md overflow-hidden left-0"
                    }
                >
                    <div className="select-options-section overflow-y-auto bg-white h-[350px]" onScroll={onScroll}>
                        <div className={'hiden'}>
                            {showOption ? (
                                <div>
                                    {groupParentPicker?.value ?
                                        <div>
                                            {renderChildOptions()}
                                        </div>
                                        :
                                        <div>
                                            {renderParentOptions()}
                                        </div>
                                    }
                                </div>
                            ) : null}
                        </div>
                    </div>
                    {/* <div className="absolute bottom-0 p-3 text-right w-full bg-white border-t-0.5 border-cbs-border">
            <button className="bg-primary text-white py-2 px-[20px] rounded">Chọn</button>
          </div> */}
                </div>
            ) : null}
        </div>
    );
})

GroupSearchable.displayName = "GroupSearchable";
