import OpenEyeIcon from "@/assets/icons/component/OpenEyeIcon";
import TrashIcon from "@/assets/icons/component/TrashIcon";
import { IEquipment } from "@/interface/general";
import { PATH } from "@/utils/path";
import Link from "next/link";

interface IProps extends IEquipment {
    onDelete: () => void;
}

const EquipmentItem = (props: IProps) => {
    return (
        <div className="grid w-full rounded-lg bg-gray-50 p-4 lg:grid-cols-9">
            <p className="col-span-1 text-gray-400">1</p>
            <p className="col-span-1 text-gray-400">1 |</p>
            <Link href={`${PATH.equipment}/${props.id}`} className="col-span-2 truncate">
                {props.name}
            </Link>
            <p className="col-span-2">{new Date().getTime()}</p>
            <p className="col-span-2">{new Date().getTime()}</p>

            <span className="col-span-1 flex items-center justify-end gap-4">
                <Link href={`${PATH.breakdowns}/${props.id}`} className="col-span-2 truncate">
                    <OpenEyeIcon className="size-5 cursor-pointer" />
                </Link>
                <TrashIcon
                    onClick={props.onDelete}
                    color="#ef4444"
                    className="size-5 cursor-pointer stroke-red-500 transition-all ease-in-out hover:stroke-red-600"
                />
            </span>
        </div>
    );
};

export default EquipmentItem;
