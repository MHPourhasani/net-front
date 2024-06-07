const EmergenciesListHeader = () => {
    return (
        <div className="grid w-full border-b py-3 text-gray-400 lg:grid-cols-10">
            <span className="col-span-1">ردیف</span>
            <span className="col-span-2">شناسه خرابی</span>
            <span className="col-span-2">نام محصول</span>
            <span className="col-span-2">تاریخ ایجاد</span>
            <span className="col-span-2">تاریخ تعمیر</span>
            <span className="col-span-1"></span>
        </div>
    );
};

export default EmergenciesListHeader;
