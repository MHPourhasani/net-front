import { API } from "../../../../utils/api";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../../components/common/Input/Input";
import CountriesList from "../../../../components/CountriesList/CountriesList";
import { post } from "../../../../utils/helpers";
import { IEquipment } from "../../../../interface/general";
import { DatePicker } from "mobin-datepicker";
import { PATH } from "../../../../utils/path";
import Button from "../../../../components/common/Button/Button";
import { toast } from "react-toastify";
import { toastMessage } from "../../../../utils/toastMessage";

const CreateEquipmentPage = () => {
    const [formData, setFormData] = useState<IEquipment>({
        created_at: String(new Date().getTime()),
        expire: String(new Date().getTime()),
        code_equip: "",
        representation_unit: "",
        representation_code: "",
        representation_period: 0,
        name: "",
        equipment_model: "",
        country: "",
        image: null
    });
    const [imgUrl, setImgUrl] = useState<string | ArrayBuffer | null>("");
    const navigate = useNavigate();
    const equipmentImgRef = useRef<any>();

    const changeHandler = (e: any) => {
        const numberRegex = /[^\d]/g;

        setFormData({
            ...formData,
            [e.target.name]: e.target.name === "representation_period" ? e.target.value.replace(numberRegex, "") : e.target.value
        });
    };

    const imageFileHandler = (e: any) => {
        if (e.target.files.length) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = async function () {
                setImgUrl(reader.result);
            };
        }
    };

    const submitHandler = () => {
        if (!formData.name.trim()) {
            toast.error(toastMessage(8));
        } else if (!formData.country.trim()) {
            toast.error(toastMessage(9));
        } else if (!formData.equipment_model.trim()) {
            toast.error(toastMessage(10));
        } else if (!formData.representation_unit.trim()) {
            toast.error(toastMessage(11));
        } else if (!formData.representation_code.trim()) {
            toast.error(toastMessage(12));
        } else if (!formData.representation_period) {
            toast.error(toastMessage(14));
        } else {
            post(API.equipment.createEquipment(), {
                body: JSON.stringify({
                    ...formData,
                    created_at: new Date(+formData.created_at).toISOString(),
                    expire: new Date(+formData.expire).toISOString()
                })
            }).then((res) => {
                if (res.ok) {
                    navigate(PATH.equipments);
                }
            });
        }
    };

    return (
        <div className="flex flex-col gap-12">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-xl font-bold">ایجاد تجهیز</h1>
            </div>

            <div className="flex flex-col gap-4">
                <div className="grid w-full gap-4 lg:grid-cols-2">
                    <Input label="محصول" name="name" onChange={changeHandler} />
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

                    <Input label="گارانتی" name="representation_period" pattern="[0-9]" onChange={changeHandler} />

                    <div className="flex w-full flex-col gap-2">
                        <label>تاریخ انقضا</label>
                        <DatePicker
                            value={new Date(+formData.expire)}
                            minDate={new Date(+formData.created_at)}
                            onChange={(value) => setFormData({ ...formData, expire: String(value * 1000) })}
                            inputContainerClassName="!w-full"
                        />
                    </div>
                </div>
                <div className="flex w-full flex-col gap-10">
                    <span className="flex items-center gap-4">
                        <label>تصویر محصول</label>
                        <Button variant="Text" onClick={() => equipmentImgRef.current.click()} className="rounded-lg">
                            انتخاب تصویر
                        </Button>
                    </span>
                    {imgUrl && <img src={String(imgUrl)} alt="equipment" className="w-10/12 rounded-xl" />}
                    <input
                        type="file"
                        ref={equipmentImgRef}
                        accept="image/png, image/jpg, image/jpeg, image/webp"
                        onChange={imageFileHandler}
                        className="hidden"
                    />
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
