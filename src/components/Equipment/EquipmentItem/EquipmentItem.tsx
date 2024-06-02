import { PATH } from "../../../utils/path";
import OpenEyeIcon from "../../../assets/icons/component/OpenEyeIcon";
import TrashIcon from "../../../assets/icons/component/TrashIcon";
import { IEquipment } from "../../../interface/general";
import { Link } from "react-router-dom";

interface IProps extends IEquipment {
    index: number;
    onDelete: () => void;
}

const EquipmentItem = (props: IProps) => {
    return (
        <div className="grid w-full rounded-lg bg-gray-50 p-4 lg:grid-cols-9">
            <p className="col-span-1 text-gray-400">{props.index + 1}</p>
            <p className="col-span-1 text-gray-400">1 |</p>
            <Link to={`${PATH.equipments}/${props.id}`} className="col-span-2 truncate">
                {props.name}
            </Link>
            <p className="col-span-2">{new Date(+props.created_at * 1000).toLocaleDateString("fa-IR")}</p>
            <p className="col-span-2">{new Date(+props.expire * 1000).toLocaleDateString("fa-IR")}</p>

            <span className="col-span-1 flex items-center justify-end gap-4">
                <Link to={`${PATH.emergencies}/${props.id}`} className="col-span-2 truncate">
                    <OpenEyeIcon className="size-5 cursor-pointer" />
                </Link>
                <TrashIcon
                    onClick={props.onDelete}
                    className="size-5 cursor-pointer stroke-red-500 transition-all ease-in-out hover:stroke-red-600"
                />
            </span>
        </div>
    );
};

export default EquipmentItem;
