import { useEffect, useState } from "react";
import { get } from "../../utils/helpers";
import { API } from "../../utils/api";
import { IEmergency, IEquipment } from "../../interface/general";
import EmergencyItem from "../../components/Emergencies/EmergencyItem/EmergencyItem";
import EquipmentItem from "../../components/Equipment/EquipmentItem/EquipmentItem";

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
                            <div className="grid w-full border-b py-3 text-gray-400 lg:grid-cols-9">
                                <span className="col-span-1">ردیف</span>
                                <span className="col-span-1"></span>
                                <span className="col-span-2">نام</span>
                                <span className="col-span-2">تاریخ تولید</span>
                                <span className="col-span-2">تاریخ انقضا</span>
                                <span className="col-span-1"></span>
                            </div>

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
                            <div className="grid w-full border-b py-3 text-gray-400 lg:grid-cols-10">
                                <span className="col-span-1">ردیف</span>
                                <span className="col-span-2">شناسه خرابی</span>
                                <span className="col-span-2">نام محصول</span>
                                <span className="col-span-2">تاریخ ایجاد</span>
                                <span className="col-span-2">تاریخ تعمیر</span>
                                <span className="col-span-1"></span>
                            </div>

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
