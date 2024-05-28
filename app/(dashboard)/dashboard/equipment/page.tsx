import AddIcon from "@/assets/icons/component/AddIcon";
import EquipmentList from "@/components/Equipment/EquipmentList/EquipmentList";
import { API } from "@/utils/api";
import { authToken } from "@/utils/storage";

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

const EquipmentPage = async () => {
    const equipments = await getEquipments();
    // console.log(equipments);
    // const addEquipment = () => {
    //     if (true) {

    //     } else {
    //         toast.error(toastMessage(3))
    //     }
    // };

    return (
        <div className="flex flex-col gap-16">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-xl font-bold">لیست تجهیزات</h1>
                <button
                    // onClick={addEquipment}
                    className="flex items-center gap-2 stroke-sky-400 text-sky-400 transition-all ease-in-out hover:stroke-sky-500 hover:text-sky-500"
                >
                    <AddIcon />
                    افزودن تجهیز
                </button>
            </div>

            <EquipmentList equipment={equipments.length ? equipments : []} />
        </div>
    );
};

export default EquipmentPage;
