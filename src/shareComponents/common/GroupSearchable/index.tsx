import { useRef, useState, UIEvent, useImperativeHandle, forwardRef } from "react";
import { map as _map } from "lodash";
import classNames from "classnames";
import { useOnClickOutside } from "services/hooks/useOnclickOutside";
import Close from "assets/icons/Close";
import iconBack from "assets/images/VectorArrow.svg";
import iconFolder from "assets/images/icons8-folder-48 3.svg";

type Props = {
    id?: string;
    data?: Array<any>;
    placeholder?: string;
    className?: string;
    focusedClass?: string;
    onClearData?: () => void;
    disabled?: boolean;
    disableClass?: string;
    onScroll?: (e: UIEvent<HTMLDivElement>) => void
    handleSetValue: any,
    groupParentPicker: any,
    setGroupParentPicker: any,
    initialValue?: any
};

type GroupSearchableHandle = {
    resetGroupSearchable: () => void
}

export const GroupSearchable = forwardRef<GroupSearchableHandle, Props>(({
    id,
    placeholder = "Lựa chọn",
    className,
    disabled,
    disableClass,
    onScroll,
    handleSetValue,
    onClearData,
    groupParentPicker,
    setGroupParentPicker,
    data,
    initialValue
}, groupSearchableRef) => {
    const [value, setValue] = useState<any>(initialValue?.value ? initialValue : {});
    const [groupCurrentPicker, setGroupCurrentPicker] = useState<any>(initialValue?.value ? initialValue : {});
    const [groupOldParentPicker, setGroupOldParentPicker] = useState<any>([]);
    const [showOption, setShowOption] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(wrapperRef, () => {
        const item = groupCurrentPicker?.value ? groupCurrentPicker : groupParentPicker;
        setValue(item);
        handleSetValue(item);
        setShowOption(false);
    });

    useImperativeHandle(groupSearchableRef, () => ({
        resetGroupSearchable() {
            handleRemoveItem();
        }
    }));

    const handleRemoveItem = () => {
        setGroupCurrentPicker({});
        setGroupOldParentPicker([]);
        setValue("");
    }

    const toggleShowOption = () => {
        if (disabled) return;
        setShowOption(!showOption);
    };

    const renderOptions = () => {
        return (
            <div>
                {groupParentPicker?.label ?
                    <div className="flex items-center bg-cbs-gray p-4 sticky">
                        <button type='button' onClick={() => {
                            setGroupParentPicker(groupOldParentPicker[groupOldParentPicker.length - 1] || {});
                            const oldParent = [...groupOldParentPicker];
                            oldParent.pop();
                            setGroupOldParentPicker(oldParent);
                        }}
                        className="w-[24px] h-[24px] items-center absolute left-2"
                        >
                            <img src={iconBack} alt="" className="m-auto" />
                        </button>
                        <div className="ml-4 text-cbs-subtext truncate text-ellipsis">{groupParentPicker?.label}</div>
                    </div> : <></>
                }
                {data?.length === 0 ?
                    <div className={"pt-3 pb-3 alert alert-warning m-3"}>
                        Danh sách rỗng
                    </div> :
                    <div>
                        {_map(data, (option) => (
                            <button
                                key={option.value}
                                type='button'
                                className={
                                    `select-option w-full transition duration-150 flex cursor-pointer py-3 px-4
                                    ${option.value === groupCurrentPicker.value ? '' : 'hover:bg-gray-100'}
                                    ${option.value === groupCurrentPicker.value ? 'bg-gray-300' : ''}
                                `
                                }
                                onClick={event => {
                                    if (event.detail == 2) {
                                        onAccessChildGroup(option);
                                        setGroupCurrentPicker({});
                                    } else {
                                        setGroupCurrentPicker(option);
                                    }
                                }}
                                data-option-value={option.value}
                            >
                                <div className="flex items-start text-left w-full">
                                    <img src={iconFolder} alt="" />
                                    <div className="ml-4 line-clamp-2 text-ellipsis">{option.label}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                }
            </div>)
    }

    const onAccessChildGroup = (option: any) => {
        const oldParent = [...groupOldParentPicker];
        oldParent.push(groupParentPicker);
        setGroupOldParentPicker(oldParent);
        setGroupParentPicker(option);
    }

    const renderSelectedValue = () => {
        return (
            <div
                onClick={() => toggleShowOption()}
                className={"relative w-full flex p-1 h-full pl-2 cursor-pointer align-items-center"}
            >
                {
                    !value.label ? (
                        <div className={"flex-1 flex text-left text-primary-gray"}>{placeholder}</div>
                    ) : (
                        <div
                            className={classNames(
                                "flex text-left relative py-0.5 pl-2 pr-8 mb-1 mt-1 max-w-full ",
                                {
                                    "text-gray-300": !value.label,
                                    border: true,
                                    "rounded": true,
                                }
                            )}
                            title={value.label}
                        >
                            {value.label}
                            <div
                                className={
                                    "absolute inset-y-0 right-0 flex items-center justify-center pr-2"
                                }
                            >
                                <Close onClick={() => handleRemoveItem()}/>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    };

    const disableClassCustom = disableClass ?? "bg-gray-100";
    const disabledClass = disabled
        ? `cursor-not-allowed ${disableClassCustom}`
        : "";

    return (
        <div
            ref={wrapperRef}
            id={id}
            placeholder={placeholder}
            className={`${className} relative select-dropdown flex items-center h-full ${disabledClass}`}
            data-value={value?.id}
        >
            {renderSelectedValue()}
            {showOption ? (
                <div
                    className={
                        "shadow-lg bg-white rounded select-options-container absolute z-100 min-w-[240px] max-w-[300px] w-max rounded-md overflow-hidden left-0"
                    }
                >
                    <div className="select-options-section overflow-y-auto bg-white h-[350px]" onScroll={onScroll}>
                        <div className={'hiden'}>
                            {showOption ? (
                                <div>
                                    {renderOptions()}
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className="bottom-0 p-3 text-right w-full bg-white border-t-0.5 border-cbs-border"
                        onClick={() => {
                            const item = groupCurrentPicker?.value ? groupCurrentPicker : groupParentPicker;
                            setValue(item);
                            handleSetValue(item);
                            setShowOption(false);
                        }}>
                        <button type='button' className="bg-primary text-white py-2 px-[20px] rounded">Chọn</button>
                    </div>
                </div>
            ) : null}
        </div>
    );
})

GroupSearchable.displayName = "GroupSearchable";
