import OpenEyeIcon from "@/assets/icons/component/OpenEyeIcon";
import TrashIcon from "@/assets/icons/component/TrashIcon";
import Badge from "@/components/common/Badge/Badge";
import { BreakdownStatusEnum, IBreakdown } from "@/interface/general";
import { PATH } from "@/utils/path";
import Link from "next/link";

interface IProps extends IBreakdown {
    onDelete: () => void;
}

const BreakdownsItem = (props: IProps) => {
    return (
        <div className="grid w-full rounded-lg bg-gray-50 p-4 lg:grid-cols-9">
            <p className="col-span-1 text-gray-400">1</p>
            <Link href={`${PATH.breakdowns}/${props.id}`} className="col-span-2 truncate">
                {props.name}
            </Link>
            <p className="col-span-2">{props.created_at}</p>
            <p className="col-span-2">{new Date().getTime()}</p>
            <Badge type={props.status}>
                {props.status === BreakdownStatusEnum.OPEN ? "باز" : props.status === BreakdownStatusEnum.PENDING ? "در حال بررسی" : "بسته شده"}
            </Badge>

            <span className="col-span-1 flex items-center justify-end gap-4">
                <Link href={`${PATH.breakdowns}/${props.id}`} className="col-span-2 truncate">
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

export default BreakdownsItem;
