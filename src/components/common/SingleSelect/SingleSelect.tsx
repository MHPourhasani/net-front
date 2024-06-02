import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import arrow from "../../../assets/icons/svg/arrow.svg";
import close from "../../../assets/icons/svg/close.svg";
import { TOption } from "../../../interface/general";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { cn } from "../../../utils/helpers";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

interface SingleSelectProps {
    label?: string;
    defaultValue?: TOption;
    inputProps?: InputProps;
    options: TOption[];
    onChange: (selectedOption?: TOption) => void;
    emptySearchText?: string;
    disabled?: boolean;
    className?: string;
}

const SingleSelect = (props: SingleSelectProps) => {
    const [search, setSearch] = useState("");
    const [showOptions, setShowOptions] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState<TOption[]>(props.options);
    const [selectedOption, setSelectedOption] = useState<TOption | null>(null);
    const [index, setIndex] = useState(-1);
    const singleSelectRef = useRef<any>();

    const changeHandler = (e: any) => {
        setSearch(e.target.value);
    };

    const keyDownHandler = (e: any) => {
        const findOption = props.options.find((item) => item.name.toLowerCase() === search.toLowerCase());
        const findOptionBasedOnIndex = filteredOptions[index];

        switch (true) {
            case e.keyCode === 13 && !!findOption:
                selectOptionHandler(findOption);
                break;
            case e.keyCode === 13 && index > -1:
                if (findOptionBasedOnIndex) selectOptionHandler(findOptionBasedOnIndex);
                break;
            case e.keyCode === 38:
                if (index === -1) {
                    setIndex(filteredOptions.length - 1);
                } else {
                    setIndex((prev) => prev - 1);
                }
                break;
            case e.keyCode === 40:
                if (index === filteredOptions.length - 1) {
                    setIndex(-1);
                } else {
                    setIndex((prev) => prev + 1);
                }
                break;
            default:
                break;
        }
    };

    const selectOptionHandler = (option: TOption) => {
        props.onChange(option);
        setSelectedOption(option);
        setShowOptions(false);
        setSearch("");
        setIndex(-1);
    };

    useEffect(() => {
        if (props.defaultValue) {
            setSelectedOption(props.defaultValue);
        }
    }, [props.defaultValue]);

    useEffect(() => {
        if (props.options) {
            setFilteredOptions(props.options.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())));
        }
    }, [props.options, search]);

    useOnClickOutside(singleSelectRef, () => {
        setShowOptions(false);
    });

    return (
        <div
            ref={singleSelectRef}
            className={cn(
                `relative w-full hover:border-gray-200 ${props.defaultValue || selectedOption?.name ? "border-gray-200 bg-transparent" : "border-transparent"} ${props.disabled ? "cursor-not-allowed bg-gray-100" : "cursor-pointer"}`,
                props.className
            )}
        >
            {props.label && <label>{props.label}</label>}

            <div
                onClick={() => {
                    if (!props.disabled) setShowOptions(!showOptions);
                }}
                className={`mt-2 flex h-12 w-full items-center gap-2 rounded-lg border p-2 ${showOptions ? "rounded-b-none border-b-0 !border-sky-500" : "bg-gray-100"}`}
            >
                <div className="flex flex-1 items-center gap-4">
                    {selectedOption?.name && <span className="max-w-[200px] truncate text-sm">{selectedOption?.name}</span>}

                    {!selectedOption?.name && (
                        <input
                            dir="auto"
                            {...props.inputProps}
                            onClick={(e: any) => {
                                e.stopPropagation();
                                setShowOptions(true);
                            }}
                            onChange={changeHandler}
                            onKeyDown={keyDownHandler}
                            disabled={props.disabled}
                            className={cn(
                                `w-full border-0 bg-transparent px-4 text-sm text-gray-900 outline-none placeholder:text-left focus:border-0 focus:outline-none disabled:cursor-not-allowed rtl:placeholder:text-right`,
                                props.inputProps?.className
                            )}
                        />
                    )}
                </div>

                <span
                    onClick={() => {
                        if (selectedOption?.name && !props.disabled) {
                            setSelectedOption(null);
                        } else if (!props.disabled) {
                            setShowOptions(!showOptions);
                        }
                    }}
                    className={`flex size-6 items-center justify-center rounded-full transition-all ease-in-out hover:bg-gray-200 ${props.disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                    <img
                        src={selectedOption?.name ? close : arrow}
                        alt={selectedOption?.name ? "close" : "arrow"}
                        className={`transition-all ease-in-out ${showOptions && !selectedOption?.name ? "rotate-180" : ""}`}
                    />
                </span>
            </div>

            {showOptions && !props.disabled && (
                <div
                    className={`no-scrollbar border-1.5 absolute z-10 flex h-fit max-h-96 w-full flex-col overflow-y-auto rounded-b-lg border-t-0 border-sky-500 bg-white text-gray-900 shadow-md`}
                >
                    {filteredOptions.length ? (
                        filteredOptions.map((option) => (
                            <div
                                key={option.name}
                                onClick={() => selectOptionHandler(option)}
                                className={`hover:bg-gray-250 w-full cursor-pointer truncate py-3 last-of-type:rounded-b-[10px] ${filteredOptions.findIndex((item) => item === option) === index ? "bg-gray-250" : ""} ${selectedOption?.name === option.name ? "cursor-not-allowed text-gray-200" : ""}`}
                            >
                                <span className={`w-full truncate px-4 text-sm`}>{option.name}</span>
                            </div>
                        ))
                    ) : (
                        <p dir="auto" className="cursor-default px-4 py-3 text-sm">
                            {props.emptySearchText || "آیتمی وجود ندارد."}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SingleSelect;
