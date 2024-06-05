import { Link } from "react-router-dom";
import { API } from "../../../utils/api";
import { PATH } from "../../../utils/path";
import AddIcon from "../../../assets/icons/component/AddIcon";
import EmergenciesList from "../../../components/Emergencies/EmergenciesList/EmergenciesList";
import { useEffect, useState } from "react";
import { IEmergency, JobEnum } from "../../../interface/general";
import { get } from "../../../utils/helpers";
import EmptyState from "../../../components/EmptyState/EmptyState";
import { useAppSelector } from "../../../redux/hooks";

const EmergenciesPage = () => {
    const userState = useAppSelector((state: any) => state.userReducer.user);
    const [emergencies, setEmergencies] = useState<IEmergency[]>([]);

    useEffect(() => {
        getEmergencies();
    }, []);

    const getEmergencies = async () => {
        try {
            get(API.emergency.listEmergency())
                .then((response) => {
                    return response.json();
                })
                .then((data) => setEmergencies(data));
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col gap-12">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-xl font-bold">لیست خرابی ها</h1>

                {(userState?.job === JobEnum.ADMIN || userState?.job === JobEnum.OPERATOR) && (
                    <Link
                        to={PATH.createEmergency}
                        className="flex items-center gap-2 stroke-sky-400 text-sky-400 transition-all ease-in-out hover:stroke-sky-500 hover:text-sky-500"
                    >
                        <AddIcon />
                        افزودن خرابی
                    </Link>
                )}
            </div>

            {emergencies.length ? (
                <EmergenciesList emergencies={emergencies} />
            ) : (
                <EmptyState imgSrc={undefined} description="هیچ خرابی ساخته نشده است." linkTitle="ساخت خرابی" linkHref={PATH.createEmergency} />
            )}
        </div>
    );
};

export default EmergenciesPage;
