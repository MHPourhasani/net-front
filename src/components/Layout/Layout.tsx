import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
    return (
        <div className="flex h-[90vh] w-10/12 max-w-[1400px] gap-5">
            <Sidebar />
            <section className="no-scrollbar h-full w-full overflow-y-auto rounded-xl bg-white p-6">
                <Outlet />
            </section>
        </div>
    );
};

export default Layout;
