import React, {FC, useCallback, useEffect, useState} from "react";
import Close from "assets/icons/Close";
type Props = {
    defaultValue: string|number
    options: {
        id: string|number,
        text: string,
        color: string
    }[]
    placeholder: string
    onValueChange: (value: {
        id: string|number,
        text: string
    }) => void,
    className?: string
    wrapperClassName?: string
}
const InlineBadgeSelect:FC<Props> = ({defaultValue, options, placeholder, onValueChange, className, wrapperClassName}) => {
    const [value, setValue] = useState<string|number>("");
    const [showOption, setShowOption] = useState(false);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue])

    const itemSelected = useCallback(() => {
        return options.find(option => option.id === value);
    },[options, value])

    const handleSelectOption = (option: string|number) => {
        setValue(option);
        setShowOption(false);
    }
    return (
        <div className={`relative z-5 inline-block ${wrapperClassName}`}>
            <button onClick={() => setShowOption(!showOption)} 
                className={className}
                style={{backgroundColor: itemSelected()?.color}}
                >{placeholder}{itemSelected()?.text}</button>
            {
                showOption &&
                <div className={"absolute z-20 bg-white w-[335px] shadow-lg rounded-md text-primary-gray"}>
                    <div className={"flex items-center mx-4 py-2 border-b-0.5 border-primary-border"}>
                        <div className={"flex-1"}>{placeholder}</div>
                        <button onClick={() => setShowOption(false)}>
                            <Close/>
                        </button>
                    </div>
                    <div className={"options mb-4"}>
                        {
                            options.map(option => (
                                <button
                                    className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header " + (value === option.id ? "bg-cbs-table-header" : "")}
                                    onClick={() => {
                                        onValueChange(option);
                                        handleSelectOption(option.id)
                                    }}
                                    key={option.id}>
                                    {option.text}
                                </button>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}
export default InlineBadgeSelect;