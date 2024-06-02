import SignupPage from "../pages/auth/signup";
import DashboardPage from "../pages/dashboard/dashboard";
import CreateEmergenciesPage from "../pages/dashboard/emergencies/create/createEmergency";
import EmergenciesPage from "../pages/dashboard/emergencies/emergencies";
import CreateEquipmentPage from "../pages/dashboard/equipment/create/createEquipment";
import EquipmentPage from "../pages/dashboard/equipment/equipments";
import { PATH } from "../utils/path";

export const routes = [
    {
        name: "signup",
        path: PATH.signup,
        component: SignupPage
    },
    {
        name: "dashboard",
        path: PATH.dashboard,
        component: DashboardPage
    },
    {
        name: "equipment",
        path: PATH.equipments,
        component: EquipmentPage
    },
    {
        name: "create-equipment",
        path: PATH.createEquipment,
        component: CreateEquipmentPage
    },
    {
        name: "emergencies",
        path: PATH.emergencies,
        component: EmergenciesPage
    },
    {
        name: "createEmergency",
        path: PATH.createEmergency,
        component: CreateEmergenciesPage
    }
];
