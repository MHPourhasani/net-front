import { useEffect, useState } from "react";
import { API } from "../../../utils/api";
import AddIcon from "../../../assets/icons/component/AddIcon";
import EquipmentList from "../../../components/Equipment/EquipmentList/EquipmentList";
import { Link } from "react-router-dom";
import { PATH } from "../../../utils/path";
import { get } from "../../../utils/helpers";
import EmptyState from "../../../components/EmptyState/EmptyState";

const EquipmentPage = () => {
    const [equipments, setEquipments] = useState([]);

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

    return (
        <div className="flex flex-col gap-12">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-xl font-bold">لیست تجهیزات</h1>
                <Link
                    to={PATH.createEquipment}
                    className="flex items-center gap-2 stroke-sky-400 text-sky-400 transition-all ease-in-out hover:stroke-sky-500 hover:text-sky-500"
                >
                    <AddIcon />
                    افزودن تجهیز
                </Link>
            </div>

            {equipments.length ? (
                <EquipmentList equipments={equipments} />
            ) : (
                <EmptyState imgSrc={undefined} description="هیچ تجهیزی ساخته نشده است." linkTitle="ساخت تجهیز" linkHref={PATH.createEquipment} />
            )}
        </div>
    );
};

export default EquipmentPage;
