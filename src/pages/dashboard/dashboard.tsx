import { useEffect, useState } from "react";
import { get } from "../../utils/helpers";
import { API } from "../../utils/api";
import { IEmergency, IEquipment } from "../../interface/general";
import EmergencyItem from "../../components/Emergencies/EmergencyItem/EmergencyItem";
import EquipmentItem from "../../components/Equipment/EquipmentItem/EquipmentItem";
import EquipmentListHeader from "../../components/Equipment/EquipmentListHeader/EquipmentListHeader";
import EmergenciesListHeader from "../../components/Emergencies/EmergenciesListHeader/EmergenciesListHeader";

const DashboardPage = () => {
    const [equipments, setEquipments] = useState<IEquipment[]>([]);
    const [emergencies, setEmergencies] = useState<IEmergency[]>([]);

    useEffect(() => {
        getEmergencies();
        getEquipments();
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
        <div className="flex flex-col gap-16">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">داشبورد</h1>
            </div>

            <section className="flex w-full items-center gap-4">
                <div className="flex flex-1 flex-col gap-4 rounded-xl bg-gradient-to-bl from-sky-300 to-sky-50 p-4">
                    <h2 className="font-semibold">تعداد تجهیزات ثبت شده</h2>
                    <p className="text-sm">{equipments.length}</p>
                </div>

                <div className="flex flex-1 flex-col gap-4 rounded-xl bg-gradient-to-bl from-red-300 to-red-50 p-4">
                    <h2 className="font-semibold">تعداد خرابی های ثبت شده</h2>
                    <p className="text-sm">{emergencies.length}</p>
                </div>
            </section>

            <section className="flex flex-col gap-12">
                <div className="flex flex-col gap-4">
                    <h2 className="font-bold">تجهیزات اخیر</h2>

                    {equipments.length ? (
                        <>
                            <EquipmentListHeader />

                            <div className="flex flex-col gap-2">
                                {equipments.slice(0, 5).map((item, index) => (
                                    <EquipmentItem key={item.id} index={index} {...item} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>هیچ تجهیزی ثبت نشده است.</p>
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="font-bold">خرابی های اخیر</h2>

                    {emergencies.length ? (
                        <>
                            <EmergenciesListHeader />

                            <div className="flex flex-col gap-2">
                                {emergencies.slice(0, 5).map((item, index) => (
                                    <EmergencyItem key={item.id} index={index} {...item} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>هیچ خرابی ثبت نشده است.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default DashboardPage;
