import { IEquipment } from "@/interface/general";
import { PATH } from "@/utils/path";
import Link from "next/link";

const EquipmentItem = (props: IEquipment) => {
    return (
        <div className="grid w-full rounded-lg border-[1.5px] p-2 lg:grid-cols-9">
            <p className="col-span-1 text-gray-400">1 |</p>
            <p className="col-span-1 text-gray-400">1 |</p>
            <Link href={`${PATH.equipment}/${props.id}`} className="col-span-2 truncate">
                {props.name}
            </Link>
            <p className="col-span-2">{new Date().getTime()}</p>
            <p className="col-span-2">{new Date().getTime()}</p>
            <span>
                <button>trash</button>
            </span>
        </div>
    );
};

export default EquipmentItem;
