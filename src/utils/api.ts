import { Environment } from "./environment";

export const API = {
    emergency: {
        createEmergency: (id: number) => `${Environment.baseUrl()}/factory/create_emergency/${id}/`,
        deleteEmergency: (id: number) => `${Environment.baseUrl()}/factory/delete-emergency/${id}/`,
        getEmergency: (id: number) => `${Environment.baseUrl()}/factory/get_emergency/${id}/`,
        listEmergency: () => `${Environment.baseUrl()}/factory/list_emergency/`,
        updateOperatorEmergency: (id: number) => `${Environment.baseUrl()}/factory/update-operator-emergency/${id}/`,
        updateEmergency: (id: number) => `${Environment.baseUrl()}/factory/update_emergency/${id}/`
    },
    equipment: {
        createEquipment: () => `${Environment.baseUrl()}/factory/create_equipment/`,
        deleteEquipment: (id: number) => `${Environment.baseUrl()}/factory/delete_equipment/${id}/`,
        getEquipment: (id: number) => `${Environment.baseUrl()}/factory/get_equipment/${id}/`,
        listEquipment: () => `${Environment.baseUrl()}/factory/list_equipment/`,
        updateEquipment: (id: number) => `${Environment.baseUrl()}/factory/update-equipment/${id}/`
    },
    profile: {
        createPersonnel: () => `${Environment.baseUrl()}/profile/create_personnel/`,
        getPersonnel: (id: number) => `${Environment.baseUrl()}/profile/get_personnel/${id}/`,
        login: () => `${Environment.baseUrl()}/profile/login/`,
        logout: () => `${Environment.baseUrl()}/profile/logout/`,
        tokenRefresh: () => `${Environment.baseUrl()}/profile/token_refresh/`
    }
};
