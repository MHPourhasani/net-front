import AddIcon from "@/assets/icons/component/AddIcon";
import EquipmentList from "@/components/Equipment/EquipmentList/EquipmentList";

const Equipment = () => {
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

            <EquipmentList equipment={[{ id: "1", name: "sdfsdfd123", created_at: 147852369 }]} />
        </div>
    );
};

export default Equipment;
