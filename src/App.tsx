import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATH } from "./utils/path";
import LoginPage from "./pages/auth/login";
import { authToken } from "./utils/storage";
import { routes } from "./router/router";
import Layout from "./components/Layout/Layout";

function App() {
    return (
        <main className="flex h-screen w-full items-center justify-center overflow-hidden bg-gray-100">
            <BrowserRouter>
                <Routes>
                    {!authToken.get()?.access ? (
                        <Route path={PATH.login} element={<LoginPage />} />
                    ) : (
                        <>
                            <Route element={<Layout />}>
                                {routes.map((route) => (
                                    //@ts-expect-error
                                    <Route key={route.name} {...route} element={<route.component />} />
                                ))}
                            </Route>
                        </>
                    )}
                </Routes>
            </BrowserRouter>
        </main>
    );
}

export default App;
