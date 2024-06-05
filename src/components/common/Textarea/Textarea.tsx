import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    hint?: string;
    textareaClassName?: string;
    className?: string;
}

const Textarea = (props: TextareaProps) => {
    return (
        <div className="flex w-full flex-col gap-2">
            <label htmlFor="textarea">{props.label}</label>
            <textarea
                {...props}
                className={`text-secondary-600 max-h-96 min-h-32 rounded-xl border-[1.5px] bg-gray-100 p-2 outline-none focus:bg-transparent focus:outline-none ${props.textareaClassName}`}
            ></textarea>
            {props.error && <span className="text-red-600">{props.error}</span>}
        </div>
    );
};

export default Textarea;
