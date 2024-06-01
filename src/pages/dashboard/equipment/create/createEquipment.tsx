import { API } from "../../../../utils/api";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../../components/common/Input/Input";
import CountriesList from "../../../../components/CountriesList/CountriesList";
import { post } from "../../../../utils/helpers";
import { IEquipment } from "../../../../interface/general";
import { DatePicker } from "mobin-datepicker";

const CreateEquipmentPage = () => {
    const [formData, setFormData] = useState<IEquipment>({
        id: 0,
        created_at: String(new Date().getTime()),
        expire: String(new Date().getTime()),
        code_equip: "",
        representation_unit: "",
        representation_code: "",
        representation_period: 0,
        state_code: "",
        name: "",
        equipment_model: "",
        country: "",
        image: ""
    });
    const navigate = useNavigate();
    const equipmentImgRef = useRef<any>();

    const changeHandler = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const imageFileHandler = (e: any) => {
        if (e.target.files.length) {
            const file = e.target.files[0];
            setFormData({ ...formData, image: file });
        }
    };

    const submitHandler = async () => {
        console.log(formData.expire);
        await post(API.equipment.createEquipment(), {
            body: JSON.stringify({
                ...formData,
                created_at: new Date(+formData.created_at).toISOString(),
                expire: new Date(+formData.expire).toISOString()
            })
        });
    };

    return (
        <div className="flex flex-col gap-12">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-xl font-bold">ایجاد تجهیز</h1>
            </div>

            <div className="flex flex-col gap-4">
                <div className="grid w-full gap-4 lg:grid-cols-2">
                    <Input label="محصول" name="name" onChange={changeHandler} />
                    <Input label="کشور" name="country" onChange={changeHandler} />
                    <div className="flex w-full flex-col gap-2">
                        <label>کشور سازنده</label>
                        <CountriesList onChange={(country) => setFormData({ ...formData, country: country.name })} />
                    </div>
                    <Input label="مدل" name="equipment_model" onChange={changeHandler} />
                    <Input label="واحد" name="representation_unit" onChange={changeHandler} />
                    <Input label="کد" name="representation_code" onChange={changeHandler} />
                    <div className="flex w-full flex-col gap-2">
                        <label>تاریخ تولید</label>
                        <DatePicker
                            value={new Date(+formData.created_at)}
                            inputContainerClassName="!w-full"
                            onChange={(value) => setFormData({ ...formData, created_at: String(value * 1000) })}
                        />
                    </div>
                    <Input label="گارانتی" name="representation_period" onChange={changeHandler} />
                    <div className="flex w-full flex-col gap-2">
                        <label>تاریخ انقضا</label>
                        <DatePicker
                            value={new Date(+formData.expire)}
                            minDate={new Date(+formData.created_at)}
                            onChange={(value) => setFormData({ ...formData, expire: String(value * 1000) })}
                            inputContainerClassName="!w-full"
                        />
                    </div>

                    <div className="w-full">
                        <span className="flex flex-col gap-2">
                            <label>تصویر محصول</label>
                            <button
                                onClick={() => equipmentImgRef.current.click()}
                                className="h-12 w-full rounded-lg bg-sky-400 text-white hover:bg-sky-500"
                            >
                                انتخاب تصویر
                            </button>
                        </span>
                        <input
                            type="file"
                            ref={equipmentImgRef}
                            accept="image/png, image/jpg, image/jpeg, image/webp"
                            onChange={imageFileHandler}
                            className="hidden"
                        />
                    </div>
                </div>

                <div className="flex gap-4 self-end">
                    <button onClick={() => navigate(-1)} className="text-red-500 transition-all ease-in-out hover:text-red-600">
                        بازگشت
                    </button>
                    <button
                        onClick={submitHandler}
                        className="rounded-lg bg-sky-400 px-4 py-2 text-white transition-all ease-in-out hover:bg-sky-500"
                    >
                        ایجاد
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateEquipmentPage;
