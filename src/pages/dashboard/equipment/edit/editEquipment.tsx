import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { get, patch } from "../../../../utils/helpers";
import { API } from "../../../../utils/api";
import { IEquipment } from "../../../../interface/general";
import Input from "../../../../components/common/Input/Input";
import CountriesList from "../../../../components/CountriesList/CountriesList";
import { PATH } from "../../../../utils/path";
import { DatePicker } from "mobin-datepicker";

const EditEquipmentPage = () => {
    const [formData, setFormData] = useState<Partial<IEquipment>>({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getEquipment();
    }, []);

    const getEquipment = () => {
        try {
            get(API.equipment.getEquipment(+id!))
                .then((response) => {
                    return response.json();
                })
                .then((data) => setFormData(data));
        } catch (error: any) {
            console.error(error);
        }
    };

    const changeHandler = (e: any) => {
        const numberRegex = /[^\d]/g;

        setFormData({
            ...formData,
            [e.target.name]: e.target.name === "representation_period" ? e.target.value.replace(numberRegex, "") : e.target.value
        });
    };

    const submitHandler = () => {
        patch(API.equipment.updateEquipment(+id!), {
            body: JSON.stringify({
                ...formData,
                created_at: new Date(+formData.created_at! * 1000).toISOString(),
                expire: new Date(+formData.expire! * 1000).toISOString()
            })
        }).then((res) => {
            if (res.ok) {
                navigate(`${PATH.equipments}/${id}`);
            }
        });
    };

    return (
        <div className="flex flex-col gap-16">
            <h1 className="text-xl font-bold">ویرایش تجهیز "{formData.name}"</h1>

            <div className="grid w-full gap-4 lg:grid-cols-2">
                <Input label="محصول" name="name" value={formData.name} onChange={changeHandler} />

                <div className="flex w-full flex-col gap-2">
                    <label>کشور سازنده</label>
                    <CountriesList
                        defaultCountry={{ name: formData.country! }}
                        onChange={(country) => setFormData({ ...formData, country: country.name })}
                    />
                </div>

                <Input label="مدل" name="equipment_model" value={formData.equipment_model} onChange={changeHandler} />
                <Input label="واحد" name="representation_unit" value={formData.representation_unit} onChange={changeHandler} />
                <Input label="کد گارانتی" name="representation_code" value={formData.representation_code} onChange={changeHandler} />

                <div className="flex w-full flex-col gap-2">
                    <label>تاریخ تولید</label>
                    <DatePicker
                        value={new Date(+formData.created_at! * 1000)}
                        inputContainerClassName="!w-full"
                        onChange={(value) => setFormData({ ...formData, created_at: String(value) })}
                    />
                </div>

                <Input
                    label="مدت گارانتی"
                    name="representation_period"
                    value={formData.representation_period}
                    pattern="[0-9]"
                    onChange={changeHandler}
                />

                <div className="flex w-full flex-col gap-2">
                    <label>تاریخ انقضا</label>
                    <DatePicker
                        value={new Date(+formData.expire! * 1000)}
                        minDate={new Date(+formData.created_at!)}
                        onChange={(value) => setFormData({ ...formData, expire: String(value) })}
                        inputContainerClassName="!w-full"
                    />
                </div>
            </div>

            <div className="flex gap-4 self-end">
                <button onClick={() => navigate(-1)} className="text-red-500 transition-all ease-in-out hover:text-red-600">
                    بازگشت
                </button>
                <button onClick={submitHandler} className="rounded-lg bg-sky-400 px-4 py-2 text-white transition-all ease-in-out hover:bg-sky-500">
                    ویرایش
                </button>
            </div>
        </div>
    );
};

export default EditEquipmentPage;
