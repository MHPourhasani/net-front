import { BreakdownStatusEnum, BreakdownStatusType } from "@/interface/general";
import { cn } from "@/utils/helpers";

interface IBadgeProps {
    type: BreakdownStatusType;
    children: any;
    className?: string;
}

const Badge = (props: IBadgeProps) => {
    const { type, children, className } = props;

    return (
        <span
            className={cn(`flex w-fit items-center justify-center gap-2 rounded-full px-3 py-0.5 text-sm`, `${className}`, {
                "bg-sky-200 text-sky-600": type === BreakdownStatusEnum.OPEN,
                "bg-[#FECACA] text-[#DC2626]": type === BreakdownStatusEnum.CLOSE,
                "bg-[#F5A62380] bg-opacity-50 text-[#F15F22]": type === BreakdownStatusEnum.PENDING
            })}
        >
            {children}
        </span>
    );
};

export default Badge;
