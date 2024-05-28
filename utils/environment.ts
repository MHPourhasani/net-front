import { EnvironmentInterface } from "@/interface/environment";

export const getEnvSelected = (): EnvironmentInterface => {
    return {
        baseUrl: () => "https://net-restapi.liara.run"
    };
};

export const Environment: EnvironmentInterface = getEnvSelected();
