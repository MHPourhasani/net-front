import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { useEffect } from "react";
import { decodeJWT, get } from "../../utils/helpers";
import { authToken } from "../../utils/storage";
import { API } from "../../utils/api";
import { setUser } from "../../redux/slices/userSlice";

const Layout = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (authToken.get()?.access) {
            const user_id = decodeJWT(authToken.get()!.access!).user_id;
            get(API.profile.getPersonnel(user_id))
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    dispatch(setUser(data));
                });
        }
    }, [authToken]);

    return (
        <>
            <div className="flex items-center justify-center lg:hidden">امکان استفاده در موبایل وجود ندارد.</div>
            <div className="hidden h-[90vh] w-10/12 max-w-[1400px] gap-5 lg:flex">
                <Sidebar />
                <section className="no-scrollbar h-full w-full overflow-y-auto rounded-xl bg-white p-6">
                    <Outlet />
                </section>
            </div>
        </>
    );
};

export default Layout;
