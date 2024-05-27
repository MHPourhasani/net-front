import AddIcon from "@/assets/icons/component/addIcon";
import EquipmentList from "@/components/Equipment/EquipmentList/EquipmentList";
import { PATH } from "@/utils/path";
import Link from "next/link";

const Equipment = () => {
    return (
        <div className="flex flex-col gap-16">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-xl font-bold">لیست تجهیزات</h1>
                <Link
                    href={PATH.AddEquipment}
                    className="flex items-center gap-2 stroke-sky-400 text-sky-400 transition-all ease-in-out hover:stroke-sky-500 hover:text-sky-500"
                >
                    <AddIcon />
                    افزودن تجهیز
                </Link>
            </div>

            <EquipmentList equipment={[{ id: "1", name: "sdfsdfd123", created_at: 147852369 }]} />
        </div>
    );
};

export default Equipment;
