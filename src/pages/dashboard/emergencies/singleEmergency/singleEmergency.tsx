import { useEffect, useState } from "react";
import EmergencyAnswer from "../../../../components/Emergencies/EmergencyAnswer/EmergencyAnswer";
import Input from "../../../../components/common/Input/Input";
import Textarea from "../../../../components/common/Textarea/Textarea";
import { IEmergency, JobEnum } from "../../../../interface/general";
import { get } from "../../../../utils/helpers";
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
    const [isEditReasonRRepairman, setIsEditReasonRepairman] = useState(false);
    const [editReasonOperator, setEditReasonOperator] = useState("");
    const [editReasonRRepairman, setEditReasonRRepairman] = useState("");
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
                    setEditReasonOperator(data.reason_operator);
                    setEditReasonRRepairman(data.reason_repairman);
                });
        } catch (error: any) {
            console.error(error);
        }
    };

    const changeReasonOperatorHandler = () => {
        // update api
        setIsEditReasonOperator(false);
    };

    const changeReasonRRepairmanHandler = () => {
        // update api
        setIsEditReasonRepairman(false);
    };

    return (
        <div className="flex flex-col gap-16">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">جزئیات خرابی "{emergency.id}"</h1>
                {(userState?.job === JobEnum.REPAIRMAN || userState?.job === JobEnum.OPERATOR) && (
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
                    <Input label="وضعیت" value={"باز"} disabled />
                </div>

                <div className="flex flex-col gap-2">
                    <span className="flex items-center justify-between">
                        <label>توضیحات اپراتور</label>
                        {userState?.job === JobEnum.OPERATOR && (
                            <div>
                                {!isEditReasonOperator ? (
                                    <Button variant="Text" onClick={() => setIsEditReasonOperator(true)}>
                                        ویرایش
                                    </Button>
                                ) : (
                                    <div className="flex gap-2">
                                        <Button variant="Text" onClick={changeReasonOperatorHandler}>
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
                        defaultValue={editReasonOperator}
                        onChange={(e) => setEditReasonOperator(e.target.value)}
                    />
                </div>

                {emergency.reason_repairman ? (
                    <div className="flex flex-col gap-2">
                        <span className="flex items-center justify-between">
                            <label>توضیحات مختصص</label>
                            {userState?.job === JobEnum.REPAIRMAN && (
                                <div>
                                    {!isEditReasonRRepairman ? (
                                        <Button variant="Text" onClick={() => setIsEditReasonRepairman(true)}>
                                            ویرایش
                                        </Button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Button variant="Text" onClick={changeReasonOperatorHandler}>
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

                        <Textarea disabled={!isEditReasonRRepairman} defaultValue={editReasonRRepairman} onChange={changeReasonRRepairmanHandler} />
                    </div>
                ) : (
                    <div className="flex w-full flex-col items-center gap-4 border-t pt-4">
                        <EmergencyAnswer emergency={emergency as IEmergency} />

                        <p>هیچ نظری برای این خرابی ثبت نشده است.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SingleEmergencyPage;
