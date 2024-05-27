import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    className?: string;
}

const Input = (props: InputProps) => {
    return (
        <div className="flex w-full flex-col gap-2">
            {props.label && (
                <label htmlFor={props.id} className="font-medium">
                    {props.label}
                </label>
            )}
            <input
                {...props}
                className={`rounded-lg border bg-gray-100 px-4 py-2 outline-none placeholder:text-sm focus:border-sky-500 focus:bg-transparent focus:outline-none ${props.className}`}
            />
            {props.error ? <p className="text-red-500">{props.error}</p> : props.hint ? <p className="text-sky-400">{props.hint}</p> : ""}
        </div>
    );
};

export default Input;
