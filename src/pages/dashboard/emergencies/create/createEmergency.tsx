import { IEmergency, IEquipment } from "../../../../interface/general";
import SingleSelect from "../../../../components/common/SingleSelect/SingleSelect";
import Textarea from "../../../../components/common/Textarea/Textarea";
import { API } from "../../../../utils/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authToken } from "../../../../utils/storage";
import { post } from "../../../../utils/helpers";
import { PATH } from "../../../../utils/path";

const CreateEmergenciesPage = () => {
    const [emergencies, setEmergencies] = useState<IEmergency[]>([]);
    const [formData, setFormData] = useState<{ product: IEquipment; created_at: string; description: string }>({
        product: {},
        created_at: new Date().toISOString(),
        description: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        getEmergencies();
    }, []);

    const getEmergencies = async () => {
        try {
            const response = await fetch(API.emergency.listEmergency(), {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + authToken.get()?.access
                }
            });
            const data = await response.json();
            setEmergencies(data);
        } catch (error: any) {
            console.error(error);
        }
    };

    const changeHandler = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async () => {
        post(API.emergency.createEmergency(formData.product.id), {
            body: JSON.stringify({ created_at: formData.created_at, reason_operator: formData.description })
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
                    <SingleSelect
                        label="محصول"
                        options={emergencies}
                        onChange={(selectedOption) => setFormData({ ...formData, product: selectedOption?.state_code || {} })}
                    />
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

export default CreateEmergenciesPage;
