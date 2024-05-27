import { IBreakdown } from "@/interface/general";
import { PATH } from "@/utils/path";
import Link from "next/link";

const BreakdownsItem = (props: IBreakdown) => {
    return (
        <div className="grid w-full rounded-lg border-[1.5px] p-2 lg:grid-cols-10">
            <p className="col-span-1 text-gray-400">1 |</p>
            <p className="col-span-1 text-gray-400">|</p>
            <Link href={`${PATH.breakdowns}/${props.id}`} className="col-span-2 truncate">
                dssg
            </Link>
            <p className="col-span-2">{new Date().getTime()}</p>
            <p className="col-span-2">{new Date().getTime()}</p>
            <p className="col-span-1">{props.status}</p>
            <span className="col-span-1">
                <button>trash</button>
            </span>
        </div>
    );
};

export default BreakdownsItem;
