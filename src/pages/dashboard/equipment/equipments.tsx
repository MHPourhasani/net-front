import { useEffect, useState } from "react";
import { authToken } from "../../../utils/storage";
import { API } from "../../../utils/api";
import AddIcon from "../../../assets/icons/component/AddIcon";
import EquipmentList from "../../../components/Equipment/EquipmentList/EquipmentList";
import { Link } from "react-router-dom";
import { PATH } from "../../../utils/path";

const EquipmentPage = () => {
    const [equipments, setEquipments] = useState([]);

    useEffect(() => {
        getEquipments();
    }, []);

    const getEquipments = async () => {
        try {
            const response = await fetch(API.equipment.listEquipment(), {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + authToken.get()?.access
                }
            });
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error(error);
        }
    };

    useEffect(() => {
        (async () => {
            const data = await getEquipments();
            setEquipments(data);
        })();
    }, []);

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

            <EquipmentList equipment={equipments.length ? equipments : []} />
        </div>
    );
};

export default EquipmentPage;
