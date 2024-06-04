import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PATH } from "./utils/path";
import LoginPage from "./pages/auth/login";
import { authToken } from "./utils/storage";
import { routes } from "./router/router";
import Layout from "./components/Layout/Layout";
import SignupPage from "./pages/auth/signup";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { decodeJWT, get } from "./utils/helpers";
import { API } from "./utils/api";
import { useAppDispatch } from "./redux/hooks";
import { setUser } from "./redux/slices/userSlice";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (authToken.get()?.access) {
            const user_id = decodeJWT(authToken.get()!.access!).user_id;
            get(API.profile.getPersonnel(user_id))
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    dispatch(setUser(data));
                });
        }
    }, [authToken]);

    return (
        <main className="flex h-screen w-full items-center justify-center overflow-hidden bg-gray-100">
            <ToastContainer position="bottom-right" autoClose={3000} theme="light" />

            <BrowserRouter>
                <Routes>
                    <Route path={PATH.login} element={authToken.get()?.access ? <Navigate to={PATH.dashboard} replace /> : <LoginPage />} />
                    <Route path={PATH.signup} element={authToken.get()?.access ? <Navigate to={PATH.dashboard} replace /> : <SignupPage />} />

                    <Route element={authToken.get()?.access ? <Layout /> : <Navigate to={PATH.login} replace />}>
                        {routes.map((route) => (
                            <Route key={route.name} {...route} element={<route.component />} />
                        ))}
                    </Route>
                </Routes>
            </BrowserRouter>
        </main>
    );
}

export default App;
