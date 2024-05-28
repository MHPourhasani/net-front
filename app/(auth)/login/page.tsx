import Login from "@/utils/pages/login";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Login",
    keywords: ["login", "login page"]
};

const LoginPage = () => {
    return (
        <Suspense fallback={<p>در حال بارگزاری...</p>}>
            <Login />
        </Suspense>
    );
};

export default LoginPage;
