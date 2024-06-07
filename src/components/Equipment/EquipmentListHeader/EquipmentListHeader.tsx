const EquipmentListHeader = () => {
    return (
        <div className="grid w-full border-b py-3 text-gray-400 lg:grid-cols-9">
            <span className="col-span-1">ردیف</span>
            <span className="col-span-1">عکس</span>
            <span className="col-span-2">نام</span>
            <span className="col-span-2">تاریخ تولید</span>
            <span className="col-span-2">تاریخ انقضا</span>
            <span className="col-span-1"></span>
        </div>
    );
};

export default EquipmentListHeader;
