export enum JobEnum {
    REPAIRMAN = "repairman",
    OPERATOR = "operator",
    USER = "user"
}

export interface IPersonnel {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    job: JobEnum;
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
    id?: number;
    created_at: string;
    expire: string;
    code_equip: string;
    representation_unit: string;
    representation_code: string;
    representation_period: number;
    state_code?: string;
    name: string;
    equipment_model: string;
    country: string;
    image: any;
}

export interface IEmergency {
    id: number;
    image?: string;
    state_code: IEquipment;
    status?: EmergencyStatusType;
    created_at: number;
    repair_date: number;
    reason_operator: string;
    reason_repairman?: string;
    repair_code: string;
}

// export type TOption = IEquipment | IEmergency;
export type TOption = any;
