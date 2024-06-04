import { Link, useLocation, useNavigate } from "react-router-dom";
import { sidebarItems } from "../../utils/sidebarItems";
import { authToken } from "../../utils/storage";
import { PATH } from "../../utils/path";
import { API } from "../../utils/api";
import { useAppSelector } from "../../redux/hooks";

const Sidebar = () => {
    const userState = useAppSelector((state: any) => state.userReducer.user);
    const navigate = useNavigate();
    const location = useLocation();
    let isActive = false;

    const logoutHandler = async () => {
        try {
            await fetch(API.profile.logout(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({ refresh: authToken.get()?.refresh })
            });
            authToken.remove();
            navigate(PATH.login, { replace: true });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <aside className="flex w-[300px] flex-col justify-between rounded-xl bg-white p-4">
            <div className="flex flex-col gap-8">
                <span className="flex flex-col items-center gap-4">
                    <span className="size-40 rounded-full shadow-lg shadow-gray-100"></span>

                    {(userState?.first_name || userState?.last_name) && (
                        <p className="rounded-md bg-sky-100 px-4 py-1">
                            {userState.first_name} {userState.last_name}
                        </p>
                    )}

                    <p>{userState?.job}</p>
                </span>

                <nav className="flex flex-col">
                    {sidebarItems.map((item) => {
                        isActive = location.pathname === item.to;

                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={`rounded-lg p-2 py-4 transition-all ease-in-out hover:text-sky-400 ${isActive ? "bg-gray-50 text-sky-400" : "stroke-gray-500"}`}
                            >
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <button
                onClick={logoutHandler}
                className="rounded-lg border-[1.5px] border-red-500 py-2 text-red-500 transition-all ease-in-out hover:text-wrap hover:bg-red-500 hover:text-white"
            >
                خروج
            </button>
        </aside>
    );
};

export default Sidebar;
