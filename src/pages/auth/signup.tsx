// import { useAppDispatch } from "@/redux/hooks";
// import { setUser } from "@/redux/slices/authSlice";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../utils/api";
import { authToken } from "../../utils/storage";
import { PATH } from "../../utils/path";
import { toastMessage } from "../../utils/toastMessage";
import { toast } from "react-toastify";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import loginImage from "../../assets/images/svg/login-page.svg";

const SignupPage = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [formDataError] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    // const dispatch = useAppDispatch();

    const changeHandler = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const loginHandler = async () => {
        try {
            const res = await fetch(API.profile.createPersonnel(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            authToken.set(data);
            navigate(PATH.dashboard, { replace: true });
            toast.success(toastMessage(5));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="flex min-h-screen w-full bg-white md:items-center md:gap-10 xl:gap-0">
            <div className="md:bg-bg-2 hidden md:flex md:h-screen md:w-full md:flex-1 md:items-center md:justify-center">
                <img src={loginImage} alt="login image" className="h-auto w-full 2xl:w-9/12" />
            </div>

            <div className="flex w-full items-center justify-center p-4 md:flex-1 md:p-0">
                <div className="flex w-full flex-col gap-4 md:w-11/12 lg:w-9/12 xl:w-8/12 2xl:w-6/12 2xl:max-w-[600px]">
                    <h1 className="mb-5 text-3xl font-bold">ثبت نام</h1>
                    <Input
                        label="نام کاربری"
                        name="username"
                        placeholder="example@gmail.com"
                        value={formData.username}
                        onChange={changeHandler}
                        error={formDataError.email}
                    />
                    <Input
                        type="password"
                        label="رمز عبور"
                        name="password"
                        value={formData.password}
                        onChange={changeHandler}
                        error={formDataError.password}
                    />

                    <Button
                        variant="Primary"
                        onClick={loginHandler}
                        // disabled={!formData.email || !formData.password || formData.password.length < 8}
                        className="disabled:bg-gray-300"
                    >
                        ثبت نام
                    </Button>

                    <div className="flex gap-2">
                        <p>اکانتی دارید؟</p>
                        <Link to={PATH.login} className="font-semibold">
                            ورود به اکانت
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignupPage;
