import EmergencyAnswer from "@/components/Emergencies/EmergencyAnswer/EmergencyAnswer";
import Input from "@/components/common/Input/Input";
import Textarea from "@/components/common/Textarea/Textarea";

const SingleEmergencyPage = () => {
    return (
        <div className="flex flex-col gap-16">
            <h1 className="text-xl font-bold">جزئیات خرابی {}</h1>

            <div className="flex flex-col gap-4">
                <div className="grid w-full gap-4 lg:grid-cols-2">
                    <Input label="محصول" value={"fghgf"} disabled />
                    <Input label="مختصص" value={"fghgf"} disabled />
                    <Input label="تاریخ" value={"1403/10/12"} dir="ltr" disabled />
                    <Input label="وضعیت" value={"باز"} disabled />
                </div>
                <Textarea label="توضیحات" disabled defaultValue="lorermcmmbfcsdfhsdfhffg" />

                <EmergencyAnswer />
            </div>
        </div>
    );
};

export default SingleEmergencyPage;