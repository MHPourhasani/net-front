"use client";
import Modal from "@/components/common/Modal/Modal";
import Textarea from "@/components/common/Textarea";
import { toastMessage } from "@/utils/toastMessage";
import { useState } from "react";
import { toast } from "react-toastify";

const BreakdownAnswer = () => {
    const [isShowAnswer, setIsShowAnswer] = useState(false);
    const [isDeleteAnswer, setIsDeleteAnswer] = useState(false);
    const [answer, setAnswer] = useState("");

    const sendAnswerHandler = () => {
        // send answer api
        setIsShowAnswer(false);
        setAnswer("");
        toast.success(toastMessage(2));
    };

    const deleteHandler = () => {
        // delete api
        setIsDeleteAnswer(false);
        toast.success(toastMessage(1));
    };

    return (
        <div className="mt-4 flex w-full flex-col gap-4">
            <div className="flex gap-4 self-end">
                <button onClick={() => setIsShowAnswer(true)} className="transition-all ease-in-out hover:text-sky-400">
                    پاسخ خرابی
                </button>
                <button onClick={() => setIsDeleteAnswer(true)} className="text-red-500 transition-all ease-in-out hover:text-red-600">
                    بستن خرابی
                </button>
            </div>

            {isDeleteAnswer && (
                <Modal title="حذف خرابی" deleteStatus onClose={() => setIsDeleteAnswer(false)}>
                    <div className="flex w-full flex-col">
                        <p>این عمل قابل بازگشت نیست. آیا از حذف خرابی مطمئن هستید؟</p>
                        <div className="flex gap-4 self-end">
                            <button onClick={() => setIsDeleteAnswer(false)}>انصراف</button>
                            <button onClick={deleteHandler} className="text-red-500 hover:text-red-600">
                                حذف
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {isShowAnswer ? (
                <div className="flex flex-col gap-4">
                    <Textarea defaultValue={answer} onChange={(e) => setAnswer(e.target.value)} />

                    <div className="flex gap-4 self-end">
                        <button onClick={sendAnswerHandler} className="transition-all ease-in-out hover:text-sky-400">
                            ارسال پاسخ
                        </button>
                        <button onClick={() => setIsShowAnswer(false)} className="text-red-500 transition-all ease-in-out hover:text-red-600">
                            انصراف
                        </button>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default BreakdownAnswer;
