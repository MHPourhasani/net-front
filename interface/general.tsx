export enum UserEnum {
    EXPERT,
    OPERATOR
}

export interface IUser {
    name: string;
    role: UserEnum;
    created_at: number;
}
export interface IIconProps {
    onClick?: (a?: any) => void;
    color?: string;
    className?: string;
}

export enum BreakdownStatusEnum {
    OPEN = "OPEN",
    PENDING = "PENDING",
    CLOSE = "CLOSE"
}

export type BreakdownStatusType = "OPEN" | "PENDING" | "CLOSE";

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
    status: BreakdownStatusType;
    description: string;
    created_at: number;
    updated_at?: number;
}
