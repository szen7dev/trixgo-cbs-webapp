import React, {FC, useCallback, useEffect, useState} from "react";
import Close from "assets/icons/Close";
type Props = {
    defaultValue: string|number
    options: {
        id: string|number,
        text: string
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
    }, [])

    const itemSelected = useCallback(() => {
        return options.find(option => option.id === value);
    },[options, value])

    const handleSelectOption = (option: string|number) => {
        setValue(option);
        setShowOption(false);
    }
    return (
        <div className={`relative inline-block ${wrapperClassName}`}>
            <button onClick={() => setShowOption(!showOption)} className={className}>{placeholder}: {itemSelected()?.text}</button>
            {
                showOption &&
                <div className={"absolute w-[335px] shadow-lg rounded-md p-4 text-primary-gray"}>
                    <div className={"flex items-center py-2 border-b-0.5 border-primary-border"}>
                        <div className={"flex-1"}>{placeholder}</div>
                        <button onClick={() => setShowOption(false)}>
                            <Close/>
                        </button>
                    </div>
                    <div className={"options"}>
                        {
                            options.map(option => (
                                <button
                                    className={"mt-4 w-full text-left hover:bg-cbs-table-header " + (value === option.id ? "bg-cbs-table-header" : "")}
                                    onClick={() => handleSelectOption(option.id)}
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