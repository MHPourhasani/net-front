"use client";
import { cn } from "@/utils/helpers";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: "Tertiary" | "Primary" | "Secondary" | "Text";
    children: any;
    className?: string;
}

const Button = (props: ButtonProps) => {
    return (
        <button
            {...props}
            className={cn(
                `flex w-full items-center justify-center gap-2 rounded-full transition-all ease-in-out disabled:cursor-not-allowed`,
                {
                    "disabled:bg-bg-2 bg-sky-100 py-3 text-white hover:bg-sky-500 disabled:text-gray-200 dark:disabled:bg-gray-400":
                        props.variant === "Primary",
                    "border-1.5 border-sky-100 py-3 text-sky-100 hover:border-sky-700 hover:bg-sky-50 hover:text-sky-500 disabled:border-gray-200 disabled:text-gray-200 dark:hover:bg-sky-500 dark:hover:text-white":
                        props.variant === "Secondary",
                    "border-1.5 border-gray-600 text-gray-800 hover:border-gray-700 hover:bg-gray-100 disabled:border-[#E5E5E5] disabled:text-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600":
                        props.variant === "Tertiary",
                    "text-sky-500 hover:text-sky-100 disabled:text-gray-200": props.variant === "Text"
                },
                `${props.className}`
            )}
        >
            {props.children}
        </button>
    );
};

export default Button;
