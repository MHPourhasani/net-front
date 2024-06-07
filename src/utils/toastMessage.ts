export const toastMessage = (index: number) => {
    switch (index) {
        case 1:
            return "خرابی با موفقیت حذف شد.";
        case 2:
            return "پاسخ با موفقیت ارسال شد.";
        case 3:
            return "شما به این بخش دسترسی ندارید.";
        case 4:
            return "تجهیز با موفقیت حذف شد.";
        case 5:
            return "ورود با موفقیت انجام شد.";
        case 6:
            return "فیلد نظر متخصص نباید خالی باشد.";
        case 7:
            return "رمز عبور ها باهم یکسان نیستند.";
        case 8:
            return "نام محصول نباید خالی باشد.";
        case 9:
            return "کشور سازنده نباید خالی باشد.";
        case 10:
            return "مدل نباید خالی باشد.";
        case 11:
            return "واحد نباید خالی باشد.";
        case 12:
            return "کد گارانتی نباید خالی باشد.";
        case 14:
            return "گارنتی نباید خالی باشد.";
        case 15:
            return "ثبت نام با موفقیت انجام شد.";
        case 16:
            return "نام کاربری یا رمز عبور شتباه است.";
        case 17:
            return "کاربری با این مشخصات وجود دارد.";

        default:
            break;
    }
};
