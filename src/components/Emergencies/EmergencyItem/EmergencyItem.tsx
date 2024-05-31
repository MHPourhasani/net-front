import { Link } from "react-router-dom";
import { PATH } from "../../../utils/path";
import Badge from "../../common/Badge/Badge";
import { EmergencyStatusEnum, IEmergency } from "../../../interface/general";
import OpenEyeIcon from "../../../assets/icons/component/OpenEyeIcon";
import TrashIcon from "../../../assets/icons/component/TrashIcon";

interface IProps extends IEmergency {
    onDelete: () => void;
}

const EmergencyItem = (props: IProps) => {
    return (
        <div className="grid w-full rounded-lg bg-gray-50 p-4 lg:grid-cols-9">
            <p className="col-span-1 text-gray-400">1</p>
            <Link to={`${PATH.emergencies}/${props.id}`} className="col-span-2 truncate">
                {props.name}
            </Link>
            <p className="col-span-2">{props.created_at}</p>
            <p className="col-span-2">{new Date().getTime()}</p>
            <Badge type={props.status}>
                {props.status === EmergencyStatusEnum.OPEN ? "باز" : props.status === EmergencyStatusEnum.PENDING ? "در حال بررسی" : "بسته شده"}
            </Badge>

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

export default EmergencyItem;