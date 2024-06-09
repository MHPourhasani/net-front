import { useEffect, useState } from "react";
import { IEmergency } from "../../../interface/general";
import EmergencyItem from "../EmergencyItem/EmergencyItem";
import { toastMessage } from "../../../utils/toastMessage";
import { toast } from "react-toastify";
import Input from "../../common/Input/Input";
import SearchIcon from "../../../assets/icons/component/SearchIcon";
import { del } from "../../../utils/helpers";
import { API } from "../../../utils/api";
import EmergenciesListHeader from "../EmergenciesListHeader/EmergenciesListHeader";

interface Props {
    emergencies: IEmergency[];
}

const EmergenciesList = ({ emergencies }: Props) => {
    const [search, setSearch] = useState("");
    const [filteredEmergencies, setFilteredEmergencies] = useState(emergencies);

    useEffect(() => {
        setFilteredEmergencies(
            emergencies.filter(
                (item) => item.state_code.name.toLowerCase().includes(search.toLowerCase()) || String(item.id).includes(search.toLowerCase())
            )
        );
    }, [search]);

    const deleteBreakdownHandler = (id: number) => {
        del(API.emergency.deleteEmergency(id)).then((res) => {
            if (res.ok) {
                setFilteredEmergencies(filteredEmergencies.filter((item) => item.id !== id));
                toast.success(toastMessage(1));
            }
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="relative">
                <Input placeholder="پیدا کردن خرابی مورد نظر" onChange={(e) => setSearch(e.target.value)} className="pr-14" />
                <SearchIcon className="absolute right-4 top-1/4 cursor-pointer stroke-gray-300" />
            </div>

            <EmergenciesListHeader />

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
