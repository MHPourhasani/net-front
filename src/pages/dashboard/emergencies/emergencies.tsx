import { Link } from "react-router-dom";
import { authToken } from "../../../utils/storage";
import { API } from "../../../utils/api";
import { PATH } from "../../../utils/path";
import AddIcon from "../../../assets/icons/component/AddIcon";
import EmergenciesList from "../../../components/Emergencies/EmergenciesList/EmergenciesList";
import { useEffect, useState } from "react";
import { IEmergency } from "../../../interface/general";
import { get } from "../../../utils/helpers";

const EmergenciesPage = () => {
    const [emergencies, setEmergencies] = useState<IEmergency[]>([]);

    useEffect(() => {
        getEmergencies();
    }, []);

    const getEmergencies = async () => {
        try {
            get(API.emergency.listEmergency(), {}).then((data) => console.log(setEmergencies));

            // const data = await response.json();
            // setEmergencies(data);
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col gap-12">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-xl font-bold">لیست خرابی ها</h1>
                <Link
                    to={PATH.createEmergency}
                    className="flex items-center gap-2 stroke-sky-400 text-sky-400 transition-all ease-in-out hover:stroke-sky-500 hover:text-sky-500"
                >
                    <AddIcon />
                    افزودن خرابی
                </Link>
            </div>

            <EmergenciesList emergencies={emergencies.length ? emergencies : []} />
        </div>
    );
};

export default EmergenciesPage;
