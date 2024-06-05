import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IEquipment } from "../../../interface/general";
import { toastMessage } from "../../../utils/toastMessage";
import Input from "../../common/Input/Input";
import EquipmentItem from "../EquipmentItem/EquipmentItem";
import SearchIcon from "../../../assets/icons/component/SearchIcon";
import { del } from "../../../utils/helpers";
import { API } from "../../../utils/api";
import EmptyState from "../../EmptyState/EmptyState";
import { PATH } from "../../../utils/path";

interface Props {
    equipments: IEquipment[];
}

const EquipmentList = ({ equipments }: Props) => {
    const [search, setSearch] = useState("");
    const [filteredEquipments, setFilteredEquipments] = useState(equipments);

    useEffect(() => {
        setFilteredEquipments(equipments);
    }, [equipments]);

    useEffect(() => {
        setFilteredEquipments(equipments.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())));
    }, [search]);

    const deleteEquipmentHandler = (id: number) => {
        del(API.equipment.deleteEquipment(id)).then(() => {
            setFilteredEquipments(filteredEquipments.filter((item) => item.id !== id));
            toast.success(toastMessage(4));
        });
    };

    return equipments.length ? (
        <div className="flex flex-col gap-4">
            <div className="relative">
                <Input placeholder="پیدا کردن آیتم مورد نظر" onChange={(e) => setSearch(e.target.value)} className="pr-14" />
                <SearchIcon className="absolute right-4 top-1/4 cursor-pointer stroke-gray-300" />
            </div>

            <div className="grid w-full border-b py-3 text-gray-400 lg:grid-cols-9">
                <span className="col-span-1">ردیف</span>
                <span className="col-span-1"></span>
                <span className="col-span-2">نام</span>
                <span className="col-span-2">تاریخ تولید</span>
                <span className="col-span-2">تاریخ انقضا</span>
                <span className="col-span-1"></span>
            </div>

            <div className="flex flex-col gap-2">
                {filteredEquipments.length ? (
                    filteredEquipments.map((item, index) => (
                        <EquipmentItem key={item.id} index={index} {...item} onDelete={() => deleteEquipmentHandler(item.id!)} />
                    ))
                ) : (
                    <p>تجهیزی یافت نشد.</p>
                )}
            </div>
        </div>
    ) : (
        <EmptyState description="هیچ تجهیزی ساخته نشده است." linkTitle="ساخت تجهیز" linkHref={PATH.createEquipment} />
    );
};

export default EquipmentList;
