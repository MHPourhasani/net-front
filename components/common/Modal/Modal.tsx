import CloseIcon from "@/assets/icons/component/CloseIcon";
import React from "react";

interface Props {
    title: string;
    deleteStatus?: boolean;
    onClose?: () => void;
    children: any;
}

const Modal = ({ title, deleteStatus, onClose, children }: Props) => {
    return (
        <div className="relative z-50">
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

            <div className="fixed top-1/2 flex flex-col items-center justify-center rounded-xl bg-white lg:w-8/12 xl:w-5/12">
                {deleteStatus && <div className="h-2 w-full rounded-t-xl bg-red-500" />}

                <div className="flex w-full flex-col gap-4 p-4">
                    <div className="flex w-full items-center justify-between">
                        <p className="text-lg font-bold">{title}</p>
                        {onClose && (
                            <CloseIcon
                                onClick={onClose}
                                className="cursor-pointer stroke-gray-400 transition-all ease-in-out hover:stroke-gray-500"
                            />
                        )}
                    </div>
                    <div className="flex h-auto w-full flex-col items-center justify-center">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
