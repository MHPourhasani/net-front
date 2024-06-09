import Textarea from "../../../components/common/Textarea/Textarea";
import { API } from "../../../utils/api";
import { toastMessage } from "../../../utils/toastMessage";
import { useState } from "react";
import { toast } from "react-toastify";
import { patch } from "../../../utils/helpers";
import { IEmergency, JobEnum } from "../../../interface/general";
import Button from "../../common/Button/Button";
import { useAppSelector } from "../../../redux/hooks";

interface Props {
    emergency: IEmergency;
    onChange: (text: string) => void;
}

const EmergencyAnswer = ({ emergency, onChange }: Props) => {
    const userState = useAppSelector((state: any) => state.userReducer.user);
    const [isShowAnswer, setIsShowAnswer] = useState(false);
    const [answer, setAnswer] = useState("");

    const sendAnswerHandler = () => {
        if (!answer.trim()) {
            toast.error(toastMessage(6));
        } else {
            patch(API.emergency.updateEmergency(emergency.id), {
                body: JSON.stringify({ repair_date: new Date().toISOString(), reason_repairman: answer })
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then((data) => {
                    setIsShowAnswer(false);
                    onChange(data.reason_repairman);
                    setAnswer("");
                    toast.success(toastMessage(2));
                });
        }
    };

    return (
        <div className="mt-4 flex w-full flex-col gap-4">
            <div className="flex w-full items-center justify-between">
                <label>نظر مختصص</label>

                {userState?.job === JobEnum.REPAIRMAN && (
                    <Button variant="Text" onClick={() => setIsShowAnswer(true)}>
                        افزودن پاسخ خرابی
                    </Button>
                )}
            </div>

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

export default EmergencyAnswer;
