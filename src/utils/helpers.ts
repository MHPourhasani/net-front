import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { authToken } from "./storage";
import { PATH } from "./path";
import { API } from "./api";

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const generateNewAccessToken = async (refresh?: string) => {
    const refresh_token = authToken.get()?.refresh || refresh;

    if (refresh_token) {
        try {
            const response = await fetch(API.profile.tokenRefresh(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ refresh: refresh_token })
            });

            if (!response.ok) {
                throw new Error("Failed to refresh access token");
            }

            const data = await response.json();
            const token = {
                access: data.access,
                refresh: refresh_token,
                id: data.token_id
            };
            authToken.set(token);
            return token;
        } catch (error) {
            console.error(error);
        }
    } else {
        authToken.remove();
        window.location.replace(PATH.login);
    }
};

export const get = async (url: string, options?: any) => {
    const accessToken = authToken.get()?.access;

    const authOptions = {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    };

    try {
        const response = await fetch(url, authOptions);

        if (response.status === 401) {
            // Try to refresh the token if 401 Unauthorized
            const newAccessToken = await generateNewAccessToken();
            if (newAccessToken) {
                authOptions.headers["Authorization"] = `Bearer ${newAccessToken.access}`;
                return await fetch(url, authOptions);
            }
        }
        return response;
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};

export const post = async (url: string, options?: any) => {
    const accessToken = authToken.get()?.access;

    const authOptions = {
        ...options,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    };

    try {
        const response = await fetch(url, authOptions);

        if (response.status === 401) {
            const newAccessToken = await generateNewAccessToken();
            if (newAccessToken) {
                authOptions.headers["Authorization"] = `Bearer ${newAccessToken.access}`;
                return await fetch(url, authOptions);
            }
        }
        return response;
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};

export const del = async (url: string, options?: any) => {
    const accessToken = authToken.get()?.access;

    const authOptions = {
        ...options,
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    };

    try {
        const response = await fetch(url, authOptions);

        if (response.status === 401) {
            const newAccessToken = await generateNewAccessToken();
            if (newAccessToken) {
                authOptions.headers["Authorization"] = `Bearer ${newAccessToken.access}`;
                return await fetch(url, authOptions);
            }
        }
        return response;
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};

export const patch = async (url: string, options?: any) => {
    const accessToken = authToken.get()?.access;

    const authOptions = {
        ...options,
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    };

    try {
        const response = await fetch(url, authOptions);

        if (response.status === 401) {
            const newAccessToken = await generateNewAccessToken();
            if (newAccessToken) {
                authOptions.headers["Authorization"] = `Bearer ${newAccessToken.access}`;
                return await fetch(url, authOptions);
            }
        }
        return response;
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};

export const base64Decode = (str: string) => {
    try {
        return decodeURIComponent(
            atob(str)
                .split("")
                .map((c) => {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );
    } catch (e) {
        console.error("Error decoding base64 string:", e);
        return null;
    }
};

export const decodeJWT = (token: string) => {
    try {
        const payload = token.split(".")[1];
        const decodedPayload = base64Decode(payload);
        return JSON.parse(decodedPayload!);
    } catch (e) {
        console.error("Error decoding JWT:", e);
        return null;
    }
};
