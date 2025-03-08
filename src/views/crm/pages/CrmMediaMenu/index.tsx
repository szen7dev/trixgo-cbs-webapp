import React, { FC, useState, useEffect } from "react";
import { toast } from "react-toastify";
// import debounce from "lodash/debounce";
// import moment from "moment";
// import { formatNumberMoney } from "utils/converter";
import { read, utils } from 'xlsx';
import { useFnbOrder } from 'services/hooks/fnb/useFnbOrder';

export const CrmMediaMenu: FC = () => {
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
            <p className="text-lg">Menu webiste</p>
        </div>
    )
}