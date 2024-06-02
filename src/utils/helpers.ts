import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { authToken } from "./storage";
import { PATH } from "./path";
import { API } from "./api";

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const generateNewAccessToken = (refresh?: string) => {
    const refresh_token = authToken.get()?.refresh || refresh;

    return new Promise(async (resolve) => {
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
                resolve(token);
            } catch (error) {
                console.error(error);
            }
        } else {
            authToken.remove();
            window.location.replace(PATH.login);
        }
    });
};

export const get = async (url: string, options?: any) => {
    const accessToken = authToken.get()?.access;

    const authOptions = {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    };

    try {
        const response = await fetch(url, authOptions);

        if (response.status === 401) {
            // Try to refresh the token if 401 Unauthorized
            const newAccessToken = await generateNewAccessToken();
            if (newAccessToken) {
                authOptions.headers["Authorization"] = `Bearer ${newAccessToken}`;
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
            ...options.headers,
            Authorization: `Bearer ${accessToken}`
        }
    };

    try {
        const response = await fetch(url, authOptions);

        if (response.status === 401) {
            const newAccessToken = await generateNewAccessToken();
            if (newAccessToken) {
                authOptions.headers["Authorization"] = `Bearer ${newAccessToken}`;
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
                authOptions.headers["Authorization"] = `Bearer ${newAccessToken}`;
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
                authOptions.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return await fetch(url, authOptions);
            }
        }
        return response;
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};
