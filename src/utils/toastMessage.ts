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

        default:
            break;
    }
};
