import { useEffect, useState } from "react";
import EmergencyAnswer from "../../../../components/Emergencies/EmergencyAnswer/EmergencyAnswer";
import Input from "../../../../components/common/Input/Input";
import Textarea from "../../../../components/common/Textarea/Textarea";
import { IEmergency } from "../../../../interface/general";
import { get } from "../../../../utils/helpers";
import { API } from "../../../../utils/api";
import { useParams } from "react-router-dom";

const SingleEmergencyPage = () => {
    const [emergency, setEmergency] = useState<IEmergency>({});
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
                .then((data) => setEmergency(data));
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col gap-16">
            <h1 className="text-xl font-bold">جزئیات خرابی "{emergency.id}"</h1>

            <div className="flex flex-col gap-4">
                <div className="grid w-full gap-4 lg:grid-cols-2">
                    <Input label="محصول" value={emergency.state_code?.name} disabled />
                    <Input label="تاریخ تولید" value={new Date(+emergency.created_at * 1000).toLocaleDateString("fa-IR")} dir="ltr" disabled />
                    <Input
                        label="تاریخ تعمیر"
                        value={emergency.repair_date ? new Date(+emergency.repair_date * 1000).toLocaleDateString("fa-IR") : "-------"}
                        dir="ltr"
                        disabled
                    />
                    <Input label="وضعیت" value={"باز"} disabled />
                </div>
                <Textarea label="توضیحات اپراتور" disabled defaultValue={emergency.reason_operator} />
                <Textarea label="توضیحات مختصص" disabled defaultValue={emergency.reason_repairman} />

                <EmergencyAnswer emergency={emergency} />
            </div>
        </div>
    );
};

export default SingleEmergencyPage;
