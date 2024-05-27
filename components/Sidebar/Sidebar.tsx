"use client";
import { PATH } from "@/utils/path";
import { sidebarItems } from "@/utils/sidebarItems";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    let isActive = false;

    const logoutHandler = () => {
        router.replace(PATH.login);
    };

    return (
        <aside className="flex w-[300px] flex-col justify-between rounded-xl bg-white p-4">
            <div className="flex flex-col gap-8">
                <span className="flex flex-col items-center gap-4">
                    <span className="size-40 rounded-full shadow-lg shadow-gray-100"></span>
                    <p className="rounded-md bg-sky-100 px-4 py-1">mhp</p>
                </span>

                <nav className="flex flex-col">
                    {sidebarItems.map((item) => {
                        isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
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
