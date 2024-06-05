import { useEffect, useState } from "react";
import EmergencyAnswer from "../../../../components/Emergencies/EmergencyAnswer/EmergencyAnswer";
import Input from "../../../../components/common/Input/Input";
import Textarea from "../../../../components/common/Textarea/Textarea";
import { IEmergency, JobEnum } from "../../../../interface/general";
import { get, patch } from "../../../../utils/helpers";
import { API } from "../../../../utils/api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { PATH } from "../../../../utils/path";
import Button from "../../../../components/common/Button/Button";
import { useAppSelector } from "../../../../redux/hooks";

const SingleEmergencyPage = () => {
    const userState = useAppSelector((state: any) => state.userReducer.user);
    const [emergency, setEmergency] = useState<Partial<IEmergency>>({});
    const [isEditReasonOperator, setIsEditReasonOperator] = useState(false);
    const [isEditReasonRepairman, setIsEditReasonRepairman] = useState(false);
    const [reasonOperator, setReasonOperator] = useState("");
    const [reasonRepairman, setReasonRepairman] = useState("");
    const { id } = useParams();

    useEffect(() => {
        getEmergencies();
    }, []);

    const getEmergencies = async () => {
        try {
            get(API.emergency.getEmergency(+id!))
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setEmergency(data);
                });
        } catch (error: any) {
            console.error(error);
        }
    };

    const updateReasonOperatorHandler = () => {
        patch(API.emergency.updateOperatorEmergency(+id!), {
            body: JSON.stringify({
                created_at: new Date().toISOString(),
                reason_operator: reasonOperator
            })
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setEmergency(data);
                setIsEditReasonOperator(false);
            });
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
                setIsEditReasonRepairman(false);
            });
    };

    return (
        <div className="flex flex-col gap-16">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">جزئیات خرابی "{emergency.id}"</h1>
                {userState?.job === JobEnum.ADMIN && (
                    <Link to={PATH.editEquipment}>
                        <Button variant="Text">ویرایش</Button>
                    </Link>
                )}
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
                    <span className="flex items-center justify-between">
                        <label>توضیحات اپراتور</label>
                        {userState?.id === emergency.user?.id && (
                            <div>
                                {!isEditReasonOperator ? (
                                    <Button variant="Text" onClick={() => setIsEditReasonOperator(true)}>
                                        ویرایش
                                    </Button>
                                ) : (
                                    <div className="flex gap-2">
                                        <Button variant="Text" onClick={updateReasonOperatorHandler}>
                                            تأیید
                                        </Button>
                                        <Button
                                            variant="Text"
                                            onClick={() => setIsEditReasonOperator(false)}
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
                        disabled={!isEditReasonOperator}
                        autoFocus={isEditReasonOperator}
                        defaultValue={emergency.reason_operator}
                        onChange={(e) => setReasonOperator(e.target.value)}
                    />
                </div>

                {emergency.reason_repairman ? (
                    <div className="flex flex-col gap-2">
                        <span className="flex items-center justify-between">
                            <label>توضیحات مختصص</label>
                            {userState?.id === emergency.user?.id && (
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
                            defaultValue={emergency.reason_repairman}
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
        </div>
    );
};

export default SingleEmergencyPage;
