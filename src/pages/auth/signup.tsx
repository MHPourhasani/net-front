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
import signupImage from "../../assets/images/svg/signup-page.svg";
import SingleSelect from "../../components/common/SingleSelect/SingleSelect";

const SignupPage = () => {
    const [formData, setFormData] = useState({ first_name: "", last_name: "", username: "", job: "", password: "", confirmPassword: "" });
    const navigate = useNavigate();
    // const dispatch = useAppDispatch();

    const jobs = [
        { name: "کارگر", key: "worker" },
        { name: "اپراتور", key: "operator" },
        { name: "متخصص", key: "repairman" }
    ];

    const changeHandler = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const signupHandler = async () => {
        try {
            if (formData.password !== formData.confirmPassword) {
                toast.error(toastMessage(7));
            } else {
                const res = await fetch(API.profile.createPersonnel(), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify({ ...formData, confirmPassword: undefined })
                });
                const data = await res.json();
                if (res.status >= 400) {
                    toast.error(toastMessage(17));
                } else {
                    authToken.set(data);
                    navigate(PATH.dashboard, { replace: true });
                    toast.success(toastMessage(15));
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="flex min-h-screen w-full bg-white md:items-center md:gap-10 xl:gap-0">
            <div className="hidden md:flex md:h-screen md:w-full md:flex-1 md:items-center md:justify-center md:bg-sky-50">
                <img src={signupImage} alt="login image" className="h-auto w-full 2xl:w-9/12" />
            </div>

            <div className="flex w-full items-center justify-center p-4 md:flex-1 md:p-0">
                <div className="flex w-full flex-col gap-4 md:w-11/12 lg:w-9/12 xl:w-8/12 2xl:w-6/12 2xl:max-w-[600px]">
                    <h1 className="mb-5 text-3xl font-bold">ثبت نام</h1>

                    <Input label="نام" name="first_name" value={formData.first_name} onChange={changeHandler} />
                    <Input label="نام خانوادگی" name="last_name" value={formData.last_name} onChange={changeHandler} />
                    <Input dir="ltr" label="نام کاربری" name="username" value={formData.username} onChange={changeHandler} />
                    <SingleSelect
                        label="شغل"
                        options={jobs}
                        onChange={(selected) => setFormData({ ...formData, job: selected.key })}
                        emptySearchText="شغلی یافت نشد."
                    />
                    <Input dir="ltr" type="password" label="رمز عبور" name="password" value={formData.password} onChange={changeHandler} />
                    <Input
                        dir="ltr"
                        type="password"
                        label="تکرار رمز عبور"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={changeHandler}
                    />

                    <Button
                        variant="Primary"
                        onClick={signupHandler}
                        disabled={
                            !(
                                formData.first_name &&
                                formData.last_name &&
                                formData.username &&
                                formData.job &&
                                formData.password &&
                                formData.confirmPassword
                            )
                        }
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
