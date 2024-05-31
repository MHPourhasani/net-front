import { IEquipment } from "../../../../interface/general";
import SingleSelect from "../../../../components/common/SingleSelect/SingleSelect";
import Textarea from "../../../../components/common/Textarea/Textarea";
import { API } from "../../../../utils/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    equipments: IEquipment[];
}

const CreateEquipmentPage = ({ equipments }: Props) => {
    const [formData, setFormData] = useState<{ product: IEquipment["equipment_model"]; expert: string; description: string }>({
        product: "",
        expert: "",
        description: ""
    });
    const navigate = useNavigate();

    const changeHandler = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async () => {
        await fetch(API.emergency.createEmergency(+formData.product), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(formData)
        });
    };

    return (
        <div>
            <div className="flex flex-col gap-4">
                <div className="grid w-full gap-4 lg:grid-cols-2">
                    <SingleSelect
                        label="محصول"
                        options={equipments}
                        onChange={(selectedOption) => setFormData({ ...formData, product: selectedOption?.equipment_model || "" })}
                    />
                    <SingleSelect
                        label="متخصص"
                        options={equipments}
                        onChange={(selectedOption) => setFormData({ ...formData, expert: selectedOption?.representation_unit || "" })}
                    />
                </div>
                <Textarea label="توضیحات" name="description" defaultValue={formData.description} onChange={changeHandler} />

                <div className="flex gap-4 self-end">
                    <button onClick={() => navigate(-1)} className="text-red-500 transition-all ease-in-out hover:text-red-600">
                        بازگشت
                    </button>
                    <button onClick={submitHandler} className="transition-all ease-in-out hover:text-sky-400">
                        ثبت خرابی
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateEquipmentPage;
