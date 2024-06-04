import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import countries from "../../utils/countries.json";
import { cn } from "../../utils/helpers.ts";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import arrow from "../../assets/icons/svg/arrow.svg";
import close from "../../assets/icons/svg/close.svg";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

interface CountriesListProps {
    defaultCountry?: TCountry;
    inputProps?: InputProps;
    options?: TCountry[];
    onChange?: (selectedOption: TCountry) => void;
    emptySearchText?: string;
    disabled?: boolean;
    className?: string;
}

type TCountry = { name: string; code?: string; flag?: string };

const CountriesList = (props: CountriesListProps) => {
    const [search, setSearch] = useState("");
    const [showOptions, setShowOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState<TCountry>({ name: "", code: "" });
    const [filteredOptions, setFilteredOptions] = useState<TCountry[]>(props.options ? props.options : countries);
    const [index, setIndex] = useState(-1);
    const singleSelectRef = useRef<any>();

    const changeHandler = (e: any) => {
        setSearch(e.target.value.toLowerCase());
    };

    const keyDownHandler = (e: any) => {
        const findOption = filteredOptions.find((item) => item.name.toLowerCase() === search || String(item.code) === search);
        const findOptionBasedOnIndex = filteredOptions[index];

        switch (true) {
            case e.keyCode === 13 && !!findOption:
                selectCountryHandler(findOption);
                break;
            case e.keyCode === 13 && index > -1:
                if (findOptionBasedOnIndex) selectCountryHandler(findOptionBasedOnIndex);
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

    const selectCountryHandler = (country: TCountry) => {
        if (props.onChange) {
            props.onChange(country);
        }
        setSelectedOption(country);
        setShowOptions(false);
        setSearch("");
        setIndex(-1);
    };

    useEffect(() => {
        if (props.defaultCountry) {
            setSelectedOption(props.defaultCountry);
        }
    }, [props.defaultCountry]);

    useEffect(() => {
        if (props.options) {
            setFilteredOptions(props.options.filter((item) => item.name.toLowerCase().includes(search) || String(item.code).includes(search)));
        } else {
            setFilteredOptions(countries.filter((item) => item.name.toLowerCase().includes(search) || String(item.code).includes(search)));
        }
    }, [props.options, search]);

    useOnClickOutside(singleSelectRef, () => {
        setShowOptions(false);
    });

    return (
        <div
            ref={singleSelectRef}
            className={cn(
                `relative w-full rounded-[10px] hover:border-gray-200 ${props.defaultCountry || selectedOption.name ? "border-gray-200 bg-transparent" : "border-transparent"} ${props.disabled ? "cursor-not-allowed bg-gray-100" : "cursor-pointer"}`,
                props.className
            )}
        >
            <div
                onClick={() => {
                    if (!props.disabled) setShowOptions(!showOptions);
                }}
                className={`flex min-h-12 w-full items-center gap-2 rounded-[10px] border px-3 ${showOptions ? "rounded-b-none border-b-0 !border-sky-500" : "bg-gray-100"}`}
            >
                <div className="flex flex-1 items-center gap-4">
                    {selectedOption.name && (
                        <span className="text-secondary-900 flex max-w-[200px] items-center gap-2 py-1 text-[15px]">
                            {/* <img src={selectedOption.flag} alt={selectedOption.code} className="h-6 rounded-sm" /> */}
                            <p className="truncate">{selectedOption.name}</p>
                        </span>
                    )}

                    {!selectedOption.name && (
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
                                `text-secondary-900 w-full border-0 bg-transparent px-4 text-sm outline-none placeholder:text-left focus:border-0 focus:outline-none disabled:cursor-not-allowed rtl:placeholder:text-right`,
                                props.inputProps?.className
                            )}
                        />
                    )}
                </div>

                <span
                    onClick={() => {
                        if (selectedOption.name && !props.disabled) {
                            setSelectedOption({ name: "", code: "" });
                        } else if (!props.disabled) {
                            setShowOptions(!showOptions);
                        }
                    }}
                    className={`flex size-6 items-center justify-center rounded-full transition-all ease-in-out hover:bg-gray-100 ${props.disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                    <img
                        src={selectedOption.name ? close : arrow}
                        alt={selectedOption.name ? "close" : "arrow"}
                        className={`transition-all ease-in-out ${showOptions && !selectedOption.name ? "rotate-180" : ""}`}
                    />
                </span>
            </div>

            {showOptions && !props.disabled && (
                <div
                    className={`no-scrollbar border-1 text-secondary-900 absolute z-10 flex h-fit max-h-96 w-full flex-col overflow-y-auto rounded-b-[10px] border-t-0 border-sky-500 bg-white shadow-md`}
                >
                    {filteredOptions.length ? (
                        filteredOptions.map((country) => (
                            <div key={country.code} onClick={() => selectCountryHandler(country)}>
                                <span
                                    className={`flex w-full cursor-pointer items-center justify-between truncate px-4 py-3 hover:bg-gray-100 ${filteredOptions.findIndex((item) => item === country) === index ? "bg-gray-100" : ""} ${selectedOption.name === country.name ? "cursor-not-allowed opacity-20" : ""}`}
                                >
                                    <div className="flex items-center gap-2">
                                        {/* <img src={country.flag} alt={country.code} className="h-6 rounded-sm" /> */}
                                        <span>{country.name}</span>
                                    </div>
                                </span>
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

export default CountriesList;
