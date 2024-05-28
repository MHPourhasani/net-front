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

export enum EmergencyStatusEnum {
    OPEN = "OPEN",
    PENDING = "PENDING",
    CLOSE = "CLOSE"
}

export type EmergencyStatusType = "OPEN" | "PENDING" | "CLOSE";

export interface IEquipment {
    id: number;
    created_at: string;
    expire: string;
    code_equip: string;
    representation_unit: string;
    representation_code: string;
    representation_period: number;
    state_code: string;
    name: string;
    equipment_model: string;
    country: string;
    image: string;
}

export interface IEmergency {
    id: string;
    image?: string;
    name: string;
    status: EmergencyStatusType;
    description: string;
    created_at: number;
    updated_at?: number;
}

export type TOption = IEquipment;
