import {FC, useState, useEffect} from "react";
import Close from "assets/icons/Close";
import SliderIcon from "assets/images/icons8-slider-96.svg"
type Props = {
    onChange: (val: string) => void;
    className: string;
    placeholder: string;
    initialValue?: string;
}

export const InputClearable:FC<Props> = ({onChange,className,placeholder, initialValue}) => {
    const [value, setValue] = useState('');
    const [isSetInitialValue, setInitialValue] = useState(false);

    const setInputValue = (val: string) => {
        setValue(val);
        onChange(val)
    }
    const clearInput = () => {
        setValue('')
    }

    useEffect(() => {
        if (!isSetInitialValue && initialValue && initialValue.length > 0) {
            setValue(initialValue)
            setInitialValue(true)
        }
    }, [initialValue, isSetInitialValue]);

    return (
        <div className={"relative flex items-center"}>
            <input placeholder={placeholder} value={value} className={"pl-3 pr-20 " + className} onChange={(event => setInputValue(event.target.value))}/>
            <div className={"absolute right-3 flex items-center inset-y-0"}>
                <button onClick={() => clearInput()}>
                    <Close/>
                </button>
                <button className={"w-[36px] h-[36px] bg-gray-100 rounded-full p-1 ml-4"}>
                    <img src={SliderIcon} alt={"icon"}/>
                </button>
            </div>
        </div>
    )
}