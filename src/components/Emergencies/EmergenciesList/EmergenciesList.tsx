import { useEffect, useState } from "react";
import { IEmergency } from "../../../interface/general";
import EmergencyItem from "../EmergencyItem/EmergencyItem";
import { toastMessage } from "../../../utils/toastMessage";
import { toast } from "react-toastify";
import Input from "../../common/Input/Input";
import SearchIcon from "../../../assets/icons/component/SearchIcon";
import { del } from "../../../utils/helpers";
import { API } from "../../../utils/api";

interface Props {
    emergencies: IEmergency[];
}

const EmergenciesList = ({ emergencies }: Props) => {
    const [search, setSearch] = useState("");
    const [filteredEmergencies, setFilteredEmergencies] = useState(emergencies);

    useEffect(() => {
        setFilteredEmergencies(
            emergencies.filter(
                (item) => item.reason_operator.toLowerCase().includes(search.toLowerCase()) || String(item.id).includes(search.toLowerCase())
            )
        );
    }, [search]);

    const deleteBreakdownHandler = (id: number) => {
        del(API.emergency.deleteEmergency(id)).then(() => {
            setFilteredEmergencies(filteredEmergencies.filter((item) => item.id !== id));
            toast.success(toastMessage(1));
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="relative">
                <Input placeholder="پیدا کردن خرابی مورد نظر" onChange={(e) => setSearch(e.target.value)} className="pr-14" />
                <SearchIcon className="absolute right-4 top-1/4 cursor-pointer stroke-gray-300" />
            </div>

            <div className="grid w-full border-b py-3 text-gray-400 lg:grid-cols-10">
                <span className="col-span-1">ردیف</span>
                <span className="col-span-2">شناسه خرابی</span>
                <span className="col-span-2">نام محصول</span>
                <span className="col-span-2">تاریخ ایجاد</span>
                <span className="col-span-2">تاریخ تعمیر</span>
                <span className="col-span-1">وضعیت</span>
                <span className="col-span-1"></span>
            </div>

            <div className="flex flex-col gap-2">
                {filteredEmergencies.length ? (
                    filteredEmergencies.map((item, index) => (
                        <EmergencyItem key={item.id} index={index} {...item} onDelete={() => deleteBreakdownHandler(item.id)} />
                    ))
                ) : (
                    <p>خرابی یافت نشد.</p>
                )}
            </div>
        </div>
    );
};

export default EmergenciesList;
