import { EmergencyStatusEnum, EmergencyStatusType } from "../../../interface/general";
import { cn } from "../../../utils/helpers";

interface IBadgeProps {
    type: EmergencyStatusType;
    children: any;
    className?: string;
}

const Badge = (props: IBadgeProps) => {
    const { type, children, className } = props;

    return (
        <span
            className={cn(`flex w-fit items-center justify-center gap-2 rounded-full px-3 py-0.5 text-sm`, `${className}`, {
                "bg-sky-200 text-sky-600": type === EmergencyStatusEnum.OPEN,
                "bg-[#FECACA] text-[#DC2626]": type === EmergencyStatusEnum.CLOSE,
                "bg-[#F5A62380] bg-opacity-50 text-[#F15F22]": type === EmergencyStatusEnum.PENDING
            })}
        >
            {children}
        </span>
    );
};

export default Badge;
