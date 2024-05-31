import Cookies from "js-cookie";
import { Token } from "../interface/token";

export const authToken = {
    key: "NET_AUTH_TOKEN",
    get: function (): Token | null {
        const data = Cookies.get(authToken.key);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    },
    set: (value: Token) => {
        Cookies.set(authToken.key, JSON.stringify(value));
    },
    remove: () => {
        Cookies.remove(authToken.key);
    }
};
