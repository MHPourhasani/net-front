"use client";
import SearchIcon from "@/assets/icons/component/SearchIcon";
import Input from "@/components/common/Input/Input";
import { useEffect, useState } from "react";
import { IEquipment } from "@/interface/general";
import EquipmentItem from "../EquipmentItem/EquipmentItem";
import { toastMessage } from "@/utils/toastMessage";
import { toast } from "react-toastify";

interface Props {
    equipment: IEquipment[];
}

const EquipmentList = ({ equipment }: Props) => {
    const [search, setSearch] = useState("");
    const [filteredBreakdowns, setFilteredBreakdowns] = useState(equipment);

    useEffect(() => {
        setFilteredBreakdowns(equipment.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())));
    }, [search]);

    const deleteEquipmentHandler = (id: string) => {
        console.log(id);
        toast.success(toastMessage(4));
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="relative">
                <Input placeholder="پیدا کردن آیتم مورد نظر" onChange={(e) => setSearch(e.target.value)} className="pr-14" />
                <SearchIcon className="absolute right-4 top-1/4 cursor-pointer stroke-gray-300" />
            </div>

            <div className="grid w-full border-b py-3 text-gray-400 lg:grid-cols-9">
                <span className="col-span-1">ردیف</span>
                <span className="col-span-1"></span>
                <span className="col-span-2">نام</span>
                <span className="col-span-2">تاریخ ایجاد</span>
                <span className="col-span-2">تاریخ ویرایش</span>
                <span className="col-span-1"></span>
            </div>

            <div>
                {filteredBreakdowns.map((item) => (
                    <EquipmentItem key={item.id} {...item} onDelete={() => deleteEquipmentHandler(item.id)} />
                ))}
            </div>
        </div>
    );
};

export default EquipmentList;
