export interface IIconProps {
    onClick?: (a?: any) => void;
    className?: string;
}

export enum BreakdownStatusEnum {
    OPEN,
    Pending,
    CLOSE
}

export interface IEquipment {
    id: string;
    image?: string;
    name: string;
    created_at: number;
    updated_at?: number;
}

export interface IBreakdown {
    id: string;
    image?: string;
    name: string;
    status: BreakdownStatusEnum;
    description: string;
    created_at: number;
    updated_at?: number;
}
