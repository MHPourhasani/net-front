import { useEffect, useState } from "react";
import { get } from "../../../../utils/helpers";
import { API } from "../../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../../../components/common/Input/Input";
import { IEquipment, JobEnum } from "../../../../interface/general";
import CountriesList from "../../../../components/CountriesList/CountriesList";
import Button from "../../../../components/common/Button/Button";
import { Link } from "react-router-dom";
import { PATH } from "../../../../utils/path";
import { useAppSelector } from "../../../../redux/hooks";

const SingleEquipmentPage = () => {
    const userState = useAppSelector((state: any) => state.userReducer.user);
    const [equipment, setEquipment] = useState<Partial<IEquipment>>({});
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
                .then((data) => setEquipment(data));
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col gap-16">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">جزئیات تجهیز "{equipment.name}"</h1>

                <div className="flex gap-2">
                    {userState?.job === JobEnum.ADMIN && (
                        <Link to={`${PATH.equipments}/edit/${id}`}>
                            <Button variant="Text">ویرایش</Button>
                        </Link>
                    )}

                    <Link
                        to={".."}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(-1);
                        }}
                    >
                        <Button variant="Text" className="text-gray-400 hover:text-gray-900">
                            بازگشت
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid w-full gap-4 lg:grid-cols-2">
                <Input label="نام" value={equipment.name} disabled />
                <div className="flex w-full flex-col gap-2">
                    <label>کشور سازنده</label>
                    <CountriesList defaultCountry={{ name: equipment.country! }} disabled />
                </div>
                <Input label="مدل" value={equipment.equipment_model} disabled />
                <Input label="واحد" value={equipment.representation_unit} disabled />
                <Input label="کد گارانتی" value={equipment.representation_code} disabled />
                <Input label="تاریخ تولید" value={new Date(+equipment.created_at! * 1000).toLocaleDateString("fa-IR")} dir="ltr" disabled />
                <Input label="مدت گارانتی" value={equipment.representation_period} disabled />
                <Input label="تاریخ انقضا" value={new Date(+equipment.expire! * 1000).toLocaleDateString("fa-IR")} dir="ltr" disabled />
            </div>
        </div>
    );
};

export default SingleEquipmentPage;
