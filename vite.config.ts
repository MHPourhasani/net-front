import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/dashboard",
    server: {
        port: 3000,
        open: true,
        host: "localhost",
        fs: {
            strict: false
        }
    }
});
