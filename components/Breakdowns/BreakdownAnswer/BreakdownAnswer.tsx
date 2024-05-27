"use client";
import Textarea from "@/components/common/Textarea";
import { useState } from "react";

const BreakdownAnswer = () => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [answer, setAnswer] = useState("");

    const sendAnswerHandler = () => {
        setShowAnswer(false);
        setAnswer("");
    };

    return (
        <div className="mt-4 flex w-full flex-col gap-4">
            <div className="flex gap-4 self-end">
                <button onClick={() => setShowAnswer(true)} className="transition-all ease-in-out hover:text-sky-400">
                    پاسخ خرابی
                </button>
                <button className="text-red-500 transition-all ease-in-out hover:text-red-600">بستن خرابی</button>
            </div>

            {showAnswer ? (
                <div className="flex flex-col gap-4">
                    <Textarea defaultValue={answer} onChange={(e) => setAnswer(e.target.value)} />

                    <div className="flex gap-4 self-end">
                        <button onClick={sendAnswerHandler} className="transition-all ease-in-out hover:text-sky-400">
                            ارسال پاسخ
                        </button>
                        <button onClick={() => setShowAnswer(false)} className="text-red-500 transition-all ease-in-out hover:text-red-600">
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
