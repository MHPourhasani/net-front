import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { PATH } from "./utils/path";
import LoginPage from "./pages/auth/login";
import { authToken } from "./utils/storage";
import { routes } from "./router/router";
import Layout from "./components/Layout/Layout";
import SignupPage from "./pages/auth/signup";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { useEffect } from "react";

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(PATH.dashboard);
    }, []);

    return (
        <main className="flex h-screen w-full items-center justify-center overflow-hidden bg-gray-100">
            <ToastContainer rtl position="bottom-left" autoClose={3000} theme="dark" />

            <Routes>
                <>
                    <Route path={PATH.login} element={authToken.get()?.access ? <Navigate to={PATH.dashboard} replace /> : <LoginPage />} />
                    <Route path={PATH.signup} element={authToken.get()?.access ? <Navigate to={PATH.dashboard} replace /> : <SignupPage />} />
                </>

                <Route
                    element={
                        <PrivateRoute>
                            <Layout />
                        </PrivateRoute>
                    }
                >
                    {routes.map((route) => (
                        <Route
                            key={route.name}
                            {...route}
                            element={
                                <PrivateRoute>
                                    <route.component />
                                </PrivateRoute>
                            }
                        />
                    ))}
                </Route>
            </Routes>
        </main>
    );
}

export default App;
