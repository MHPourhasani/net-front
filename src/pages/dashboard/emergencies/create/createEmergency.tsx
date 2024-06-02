import SingleSelect from "../../../../components/common/SingleSelect/SingleSelect";
import Textarea from "../../../../components/common/Textarea/Textarea";
import { API } from "../../../../utils/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, post } from "../../../../utils/helpers";
import { PATH } from "../../../../utils/path";
import { DatePicker } from "mobin-datepicker";

const CreateEmergencyPage = () => {
    const [equipments, setEquipments] = useState([]);
    const [formData, setFormData] = useState<{ equipmentId: number; created_at: string; description: string }>({
        equipmentId: 0,
        created_at: String(new Date().getTime()),
        description: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        getEquipments();
    }, []);

    const getEquipments = () => {
        try {
            get(API.equipment.listEquipment())
                .then((response) => {
                    return response.json();
                })
                .then((data) => setEquipments(data));
        } catch (error: any) {
            console.error(error);
        }
    };

    const changeHandler = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async () => {
        post(API.emergency.createEmergency(formData.equipmentId!), {
            body: JSON.stringify({ created_at: new Date(+formData.created_at).toISOString(), reason_operator: formData.description })
        }).then(() => {
            navigate(PATH.emergencies);
        });
    };

    return (
        <div className="flex flex-col gap-12">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-xl font-bold">ایجاد خرابی</h1>
            </div>

            <div className="flex flex-col gap-4">
                <div className="grid w-full gap-4 lg:grid-cols-2">
                    {equipments && (
                        <SingleSelect
                            label="محصول"
                            options={equipments}
                            onChange={(selectedOption) => setFormData({ ...formData, equipmentId: selectedOption?.id })}
                        />
                    )}
                    <div className="flex w-full flex-col gap-2">
                        <label>تاریخ خرابی</label>
                        <DatePicker
                            value={new Date(+formData.created_at)}
                            inputContainerClassName="!w-full"
                            onChange={(value) => setFormData({ ...formData, created_at: String(value * 1000) })}
                        />
                    </div>
                </div>
                <Textarea label="توضیحات" name="description" defaultValue={formData.description} onChange={changeHandler} />

                <div className="flex gap-4 self-end">
                    <button onClick={() => navigate(-1)} className="text-red-500 transition-all ease-in-out hover:text-red-600">
                        بازگشت
                    </button>
                    <button
                        onClick={submitHandler}
                        className="rounded-lg bg-sky-400 px-4 py-2 text-white transition-all ease-in-out hover:bg-sky-500"
                    >
                        ثبت خرابی
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateEmergencyPage;
