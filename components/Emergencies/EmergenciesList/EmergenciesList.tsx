"use client";
import EmergencyItem from "../EmergencyItem/EmergencyItem";
import Input from "@/components/common/Input/Input";
import { useEffect, useState } from "react";
import { IEmergency } from "@/interface/general";
import SearchIcon from "@/assets/icons/component/SearchIcon";
import { toast } from "react-toastify";
import { toastMessage } from "@/utils/toastMessage";

interface Props {
    emergencies: IEmergency[];
}

const EmergenciesList = ({ emergencies }: Props) => {
    const [search, setSearch] = useState("");
    const [filteredEmergencies, setFilteredEmergencies] = useState(emergencies);

    useEffect(() => {
        setFilteredEmergencies(emergencies.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())));
    }, [search]);

    const deleteBreakdownHandler = (id: string) => {
        console.log(id);
        toast.success(toastMessage(1));
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="relative">
                <Input placeholder="پیدا کردن خرابی مورد نظر" onChange={(e) => setSearch(e.target.value)} className="pr-14" />
                <SearchIcon className="absolute right-4 top-1/4 cursor-pointer stroke-gray-300" />
            </div>

            <div className="grid w-full border-b py-3 text-gray-400 lg:grid-cols-9">
                <span className="col-span-1">ردیف</span>
                <span className="col-span-2">نام</span>
                <span className="col-span-2">تاریخ ایجاد</span>
                <span className="col-span-2">تاریخ ویرایش</span>
                <span className="col-span-1">وضعیت</span>
                <span className="col-span-1"></span>
            </div>

            <div>
                {filteredEmergencies.length ? (
                    filteredEmergencies.map((item) => <EmergencyItem key={item.id} {...item} onDelete={() => deleteBreakdownHandler(item.id)} />)
                ) : (
                    <p>خرابی وجود ندارد.</p>
                )}
            </div>
        </div>
    );
};

export default EmergenciesList;
