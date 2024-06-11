import SingleSelect from "../../../../components/common/SingleSelect/SingleSelect";
import Textarea from "../../../../components/common/Textarea/Textarea";
import { API } from "../../../../utils/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, patch } from "../../../../utils/helpers";
import { DatePicker } from "mobin-datepicker";
import { IEmergency } from "../../../../interface/general";
import Button from "../../../../components/common/Button/Button";
import { toast } from "react-toastify";
import { toastMessage } from "../../../../utils/toastMessage";

const EditEmergencyPage = () => {
    const [equipments, setEquipments] = useState([]);
    const [formData, setFormData] = useState<Partial<IEmergency>>({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getEmergency();
        getEquipments();
    }, []);

    const getEmergency = () => {
        try {
            get(API.emergency.getEmergency(+id!))
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setFormData(data);
                });
        } catch (error: any) {
            console.error(error);
        }
    };

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
        patch(API.emergency.updateOperatorEmergency(+id!), {
            body: JSON.stringify({ ...formData, created_at: new Date(+formData.created_at! * 1000).toISOString() })
        }).then((res) => {
            if (res.ok) {
                toast.success(toastMessage(19));
                navigate(-1);
            }
        });
    };

    return (
        <div className="flex flex-col gap-12">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-xl font-bold">ویرایش خرابی "{id}"</h1>
            </div>

            <div className="flex flex-col gap-4">
                <div className="grid w-full gap-4 lg:grid-cols-2">
                    <SingleSelect
                        label="محصول"
                        defaultValue={{ name: formData.state_code?.name }}
                        options={equipments ? equipments : []}
                        onChange={(selectedOption) => setFormData({ ...formData, state_code: selectedOption })}
                    />

                    <div className="flex w-full flex-col gap-2">
                        <label>تاریخ خرابی</label>
                        <DatePicker
                            value={new Date(+formData.created_at! * 1000)}
                            inputContainerClassName="!w-full"
                            onChange={(value) => setFormData({ ...formData, created_at: value })}
                        />
                    </div>
                </div>
                <Textarea label="توضیحات" name="reason_operator" defaultValue={formData.reason_operator} onChange={changeHandler} />

                <div className="flex gap-4 self-end">
                    <Button variant="Text" onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-900">
                        بازگشت
                    </Button>
                    <Button variant="Text" onClick={submitHandler}>
                        ویرایش خرابی
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditEmergencyPage;
