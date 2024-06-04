import { useEffect, useState } from "react";
import { get } from "../../../../utils/helpers";
import { API } from "../../../../utils/api";
import { useParams } from "react-router-dom";
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
                {(userState?.job === JobEnum.REPAIRMAN || userState?.job === JobEnum.OPERATOR) && (
                    <Link to={PATH.editEquipment}>
                        <Button variant="Text">ویرایش</Button>
                    </Link>
                )}
            </div>

            <div className="grid w-full gap-4 lg:grid-cols-2">
                <Input label="نام" value={equipment.name} disabled />
                <div className="flex w-full flex-col gap-2">
                    <label>کشور سازنده</label>
                    <CountriesList defaultCountry={{ name: equipment.country! }} disabled />
                </div>
                <Input label="مدل" value={equipment.equipment_model} disabled />
                <Input label="واحد" value={equipment.representation_unit} disabled />
                <Input label="کد" value={equipment.representation_code} disabled />
                <Input label="تاریخ تولید" value={new Date(+equipment.created_at! * 1000).toLocaleDateString("fa-IR")} dir="ltr" disabled />
                <Input label="گارانتی" value={equipment.representation_period} disabled />
                <Input label="تاریخ انقضا" value={new Date(+equipment.expire! * 1000).toLocaleDateString("fa-IR")} dir="ltr" disabled />
            </div>
        </div>
    );
};

export default SingleEquipmentPage;
