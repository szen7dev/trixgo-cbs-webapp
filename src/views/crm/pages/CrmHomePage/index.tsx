import React, { FC, useState, useEffect } from "react";
import { toast } from "react-toastify";
// import debounce from "lodash/debounce";
// import moment from "moment";
// import { formatNumberMoney } from "utils/converter";
import { read, utils } from 'xlsx';
import { useFnbOrder } from 'services/hooks/fnb/useFnbOrder';

export const CrmHomePage: FC = () => {
    const { exportOrderAsync, importExcelAsync } = useFnbOrder({});

    const [dataImport, setDataImport] = useState([]);

	const handleImport = ($event: any) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event: any) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;
    
                if (sheets.length) {
                    const rows: any = utils.sheet_to_json(wb.Sheets[sheets[0]]); // Index=1 (tức Sheet số 2 từ trái sang)
    
                    // Set data để Import
                    setDataImport(rows)
                }
            }
    
            reader.readAsArrayBuffer(file);
        }
    
        // Đọc xong thì xóa value trong Input đi
        $event.target.value = null;
    }
    
    // Gọi tới API để đẩy data lên
    useEffect(() => {
        if(dataImport.length){
            const fetchData = async () => {
                const data = await importExcelAsync({ dataImport: JSON.stringify(dataImport) });
                setDataImport([]);
    
                if(!data.error){
                    return toast.success("Import thành công");
                }
                return toast.error(data.message);
            }
            fetchData();
        }
    }, [JSON.stringify(dataImport)])

    return (
        <div className="flex flex-1 flex-col overflow-hidden h-full">
            <p className="text-lg">Chăm sóc khách hàng</p>
            <p>Hành trình trải nghiệm khách hàng sử dụng Chi tiết chủ đề hoặc Chi tiết hồ sơ khách hàng có gắn thông báo</p>
            <p>1. Theo dịch vụ</p>
            <p>2. Theo dự án/Phòng ban/Chiến dịch</p>
            <p>3. Theo khách hàng (sử dụng điện thoại, mã số thuế để phân biệt)</p>
            <div className="mt-3">
                <button className="py-1 px-4 mr-1 rounded-md border border-primary-border text-white bg-cbs-secondary border-none">Hành trình 1</button>
                <button className="py-1 px-4 mr-1 rounded-md border border-primary-border">Hành trình 2</button>
                <button className="py-1 px-4 mr-1 rounded-md border border-primary-border">Hành trình 3</button>
                <button className="py-1 px-4 mr-1 rounded-md border border-primary-border">Hành trình 4</button>
                <button className="py-1 px-4 mr-1 rounded-md border border-primary-border">Hành trình 5</button>
                <button className="py-1 px-4 mr-1 rounded-md border border-primary-border">Hành trình ...</button>
            </div>
            <div>
                <button className={"flex items-center justify-center mt-3 text-cbs-primary"}>
                    <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required hidden onChange={handleImport}
                    accept=".xlsx, .xlsm, .xls, .csv"/>
                    <label className="custom-file-label" htmlFor="inputGroupFile">Import đơn hàng</label>
                </button>
            </div>
        </div>
    )
}