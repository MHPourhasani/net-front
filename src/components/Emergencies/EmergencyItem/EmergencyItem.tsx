import { Link } from "react-router-dom";
import { PATH } from "../../../utils/path";
import { IEmergency, JobEnum } from "../../../interface/general";
import OpenEyeIcon from "../../../assets/icons/component/OpenEyeIcon";
import TrashIcon from "../../../assets/icons/component/TrashIcon";
import { useAppSelector } from "../../../redux/hooks";

interface IProps extends IEmergency {
    index: number;
    onDelete: () => void;
}

const EmergencyItem = (props: IProps) => {
    const userState = useAppSelector((state: any) => state.userReducer.user);

    return (
        <div className="grid w-full rounded-lg bg-gray-50 p-4 lg:grid-cols-10">
            <p className="col-span-1 text-gray-400">{props.index + 1}</p>
            <p className="col-span-2 truncate text-gray-400">{props.id}</p>
            <Link to={`${PATH.emergencies}/${props.id}`} className="col-span-2 truncate">
                {props.state_code.name}
            </Link>
            <p className="col-span-2">{new Date(+props.created_at * 1000).toLocaleDateString("fa-IR")}</p>
            <p className="col-span-2">{props.repair_date ? new Date(+props.repair_date * 1000).toLocaleDateString("fa-IR") : "--------"}</p>
            {/* <Badge type={props.status}>
                {props.status === EmergencyStatusEnum.OPEN ? "باز" : props.status === EmergencyStatusEnum.PENDING ? "در حال بررسی" : "بسته شده"}
            </Badge> */}

            <span className="col-span-1 flex items-center justify-end gap-4">
                <Link to={`${PATH.emergencies}/${props.id}`} className="col-span-2 truncate">
                    <OpenEyeIcon className="size-5 cursor-pointer" />
                </Link>
                {userState?.job === JobEnum.ADMIN && (
                    <TrashIcon
                        onClick={props.onDelete}
                        className="size-5 cursor-pointer stroke-red-500 transition-all ease-in-out hover:stroke-red-600"
                    />
                )}
            </span>
        </div>
    );
};

export default EmergencyItem;
