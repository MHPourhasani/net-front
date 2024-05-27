import AddIcon from "@/assets/icons/component/addIcon";
import BreakdownsList from "@/components/Breakdowns/BreakdownsList/BreakdownsList";
import { PATH } from "@/utils/path";
import Link from "next/link";

const Breakdowns = () => {
    return (
        <div className="flex flex-col gap-16">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-xl font-bold">لیست خرابی ها</h1>
                <Link
                    href={PATH.addBreakdowns}
                    className="flex items-center gap-2 stroke-sky-400 text-sky-400 transition-all ease-in-out hover:stroke-sky-500 hover:text-sky-500"
                >
                    <AddIcon />
                    افزودن خرابی
                </Link>
            </div>

            <BreakdownsList breakdowns={[{ id: "1", name: "sdfsdfd123", description: "dhsdhghudfgfddg", created_at: 147852369 }]} />
        </div>
    );
};

export default Breakdowns;
