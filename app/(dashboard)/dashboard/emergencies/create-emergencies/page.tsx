import { API } from "@/utils/api";
import CreateEmergencies from "@/utils/pages/emergency/create/page";
import { authToken } from "@/utils/storage";
import { Suspense } from "react";

const getEquipments = async () => {
    console.log("authToken", authToken.get()?.access);
    try {
        const response = await fetch(API.equipment.listEquipment(), {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + authToken.get()?.access
            },

            cache: "no-store"
        });
        const data = await response.json();
        console.log("data >", data);
        return data;
    } catch (error: any) {
        console.error(error);
    }
};

const createEmergenciesPage = async () => {
    const equipments = await getEquipments();

    return (
        <Suspense>
            <CreateEmergencies equipments={equipments.length ? equipments : []} />
        </Suspense>
    );
};

export default createEmergenciesPage;
