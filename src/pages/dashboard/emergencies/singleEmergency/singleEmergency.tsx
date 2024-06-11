import { useEffect, useState } from "react";
import EmergencyAnswer from "../../../../components/Emergencies/EmergencyAnswer/EmergencyAnswer";
import Input from "../../../../components/common/Input/Input";
import Textarea from "../../../../components/common/Textarea/Textarea";
import { IEmergency, JobEnum } from "../../../../interface/general";
import { del, get, patch } from "../../../../utils/helpers";
import { API } from "../../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { PATH } from "../../../../utils/path";
import Button from "../../../../components/common/Button/Button";
import { useAppSelector } from "../../../../redux/hooks";
import { toast } from "react-toastify";
import { toastMessage } from "../../../../utils/toastMessage";
import Modal from "../../../../components/common/Modal/Modal";

const SingleEmergencyPage = () => {
    const userState = useAppSelector((state: any) => state.userReducer.user);
    const [emergency, setEmergency] = useState<Partial<IEmergency>>({});
    const [isEditReasonRepairman, setIsEditReasonRepairman] = useState(false);
    const [reasonOperator, setReasonOperator] = useState("");
    const [reasonRepairman, setReasonRepairman] = useState("");
    const [isDelete, setIsDelete] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getEmergency();
    }, []);

    const getEmergency = () => {
        try {
            get(API.emergency.getEmergency(+id!))
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setEmergency(data);
                    setReasonOperator(data.reason_operator);
                    setReasonRepairman(data.reason_repairman);
                });
        } catch (error: any) {
            console.error(error);
        }
    };

    const updateReasonRepairmanHandler = () => {
        patch(API.emergency.updateEmergency(+id!), {
            body: JSON.stringify({
                repair_date: new Date().toISOString(),
                reason_repairman: reasonRepairman
            })
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setEmergency(data);
                setReasonRepairman(data.reason_repairman);
                setIsEditReasonRepairman(false);
                toast.success(toastMessage(18));
            });
    };

    const deleteHandler = () => {
        if (emergency.id) {
            del(API.emergency.deleteEmergency(emergency.id)).then((res) => {
                if (res.ok) {
                    navigate(PATH.emergencies);
                    toast.success(toastMessage(1));
                }
            });
        }
    };

    return (
        <div className="flex flex-col gap-16">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">جزئیات خرابی "{emergency.id}"</h1>

                <div className="flex gap-4">
                    {(userState?.job === JobEnum.ADMIN || userState?.job === JobEnum.OPERATOR) && (
                        <Link to={`${PATH.emergencies}/edit/${id}`}>
                            <Button variant="Text">ویرایش</Button>
                        </Link>
                    )}

                    {userState?.job === JobEnum.ADMIN && (
                        <Button variant="Text" onClick={() => setIsDelete(true)} className="text-red-500 hover:text-red-600">
                            حذف
                        </Button>
                    )}

                    <Link
                        to={".."}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(-1);
                        }}
                    >
                        <Button variant="Text" className="text-gray-400 hover:text-gray-900">
                            بازگشت
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="grid w-full gap-4 lg:grid-cols-2">
                    <Input label="محصول" value={emergency.state_code?.name} disabled />
                    <Input label="تاریخ تولید" value={new Date(+emergency.created_at! * 1000).toLocaleDateString("fa-IR")} dir="ltr" disabled />
                    <Input
                        label="تاریخ تعمیر"
                        value={emergency.repair_date ? new Date(+emergency.repair_date * 1000).toLocaleDateString("fa-IR") : "-------"}
                        dir="ltr"
                        disabled
                    />
                    <Input label="اپراتور" value={emergency.user?.first_name + " " + emergency.user?.last_name} disabled />
                </div>

                <div className="flex flex-col gap-2">
                    <label>توضیحات اپراتور</label>
                    <Textarea disabled defaultValue={reasonOperator} onChange={(e) => setReasonOperator(e.target.value)} />
                </div>

                {reasonRepairman ? (
                    <div className="flex flex-col gap-2">
                        <span className="flex items-center justify-between">
                            <label>توضیحات مختصص</label>
                            {(userState?.job === JobEnum.ADMIN || userState?.job === JobEnum.REPAIRMAN) && (
                                <div>
                                    {!isEditReasonRepairman ? (
                                        <Button variant="Text" onClick={() => setIsEditReasonRepairman(true)}>
                                            ویرایش
                                        </Button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Button variant="Text" onClick={updateReasonRepairmanHandler}>
                                                تأیید
                                            </Button>
                                            <Button
                                                variant="Text"
                                                onClick={() => setIsEditReasonRepairman(false)}
                                                className="text-red-500 hover:text-red-600"
                                            >
                                                انصراف
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </span>

                        <Textarea
                            disabled={!isEditReasonRepairman}
                            defaultValue={reasonRepairman}
                            onChange={(e) => setReasonRepairman(e.target.value)}
                        />
                    </div>
                ) : (
                    <div className="flex w-full flex-col items-center gap-4 border-t pt-4">
                        <EmergencyAnswer emergency={emergency as IEmergency} onChange={(text) => setReasonRepairman(text)} />

                        <p>هیچ نظری برای این خرابی ثبت نشده است.</p>
                    </div>
                )}
            </div>

            {isDelete && (
                <Modal title="حذف خرابی" deleteStatus onClose={() => setIsDelete(false)}>
                    <div className="flex w-full flex-col">
                        <p>این عمل قابل بازگشت نیست. آیا از حذف خرابی مطمئن هستید؟</p>
                        <div className="flex gap-4 self-end">
                            <button
                                onClick={() => {
                                    setIsDelete(false);
                                }}
                            >
                                انصراف
                            </button>
                            <button onClick={deleteHandler} className="text-red-500 hover:text-red-600">
                                حذف
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default SingleEmergencyPage;
