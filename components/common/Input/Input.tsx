import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    className?: string;
}

const Input = (props: InputProps) => {
    return (
        <div className="flex flex-col gap-2">
            {props.label && <label htmlFor=""></label>}
            <input className={`rounded-lg border px-4 py-2 outline-none focus:border-sky-500 focus:outline-none ${props.className}`} />
            {props.error ? <p className="text-red-500">{props.error}</p> : props.hint ? <p className="text-sky-400">{props.hint}</p> : ""}
        </div>
    );
};

export default Input;
