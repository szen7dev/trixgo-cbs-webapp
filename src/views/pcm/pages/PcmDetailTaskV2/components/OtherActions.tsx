import React, {FC, useRef, useState, useEffect} from "react";
import DotsVerticalIcon from "assets/icons/DotsVertical";
import Close from "assets/icons/Close";
import { useOnClickOutside } from "services/hooks/useOnclickOutside";
import { Link } from 'react-router-dom';
import { Task } from "typings/task";
import { usePcmPlanTaskCustom } from "services/hooks/pcm/usePcm";
import { Loader } from "shareComponents/common";
import { toast } from "react-toastify";
import { createLinkAndClick } from 'utils';
import { read, utils, writeFile } from 'xlsx';
import { useModal } from "services/hooks/useModal";
import { ModalUpdateTaskNameDraft } from "./ModalUpdateTaskNameDraft";

type Props = {
    task: Task;
    userId?: string;
    refetchTaskInfo?: ()=> void
}

export const OtherActions:FC<Props> = ({ task, userId, refetchTaskInfo }) => {
    const { openModal } = useModal();
    const wrapperClass = useRef<HTMLDivElement>(null)
    const [showOption, setShowOption] = useState(false);
    const [dataImport, setDataImport] = useState([]);

    useOnClickOutside(wrapperClass, () => setShowOption(false));
	const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
		isExporting: false,
	});

	const { downloadTemplateImportExcelTaskAsync, importTaskFromExcelAsync } = usePcmPlanTaskCustom({});

    const handleDownloadTemplateImportExcel = async () => {
		try {
			setStateExport({ isExporting: true });
			const { error, data } = await downloadTemplateImportExcelTaskAsync({
               projectID: task.project._id
            });

			if(error) {
				return toast.warn(data?.message);
			}

			data && createLinkAndClick(data, '_self');
		} catch (error) {
			if(error instanceof Error)
				toast.error(error.message)
		} finally {
			setStateExport({ isExporting: false });
		}
	}

    /**
     * Xử lý import excel (đọc file)
     */
    const handleImport = ($event: any) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event: any) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows: any = utils.sheet_to_json(wb.Sheets[sheets[1]]); // Index=1 (tức Sheet số 2 từ trái sang)
                    console.log(rows)

                    setDataImport(rows)
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }

    // Gọi tới API để đẩy data lên
    useEffect(() => {
        if(dataImport.length){
            const fetchData = async () => {
                const data = await importTaskFromExcelAsync({ taskID: task._id, dataImport: JSON.stringify(dataImport) });
                refetchTaskInfo?.()
                if(!data.error){
                    return toast.success("Import thành công");
                }
                return toast.success("Import thất bại");
            }
            fetchData();
        }
    }, [dataImport])

    if(stateExport.isExporting) {
        return <Loader className="border-primary" />
    }

    return (
        (task.subtype == 4 && task.assignee._id.toString() == userId?.toString()) ?  <></> :
        <div ref={wrapperClass} className={"relative z-5 inline-block"}>
            <button onClick={() => setShowOption(!showOption)} className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] bg-cbs-form-input-bg mr-3"}>
                <DotsVerticalIcon/>
            </button>
            {
                showOption &&
                <div className={"absolute right-0 z-20 bg-white w-[335px] shadow-lg rounded-md text-primary-gray"}>
                    <div className={"flex items-center mx-4 py-2 border-b-0.5 border-primary-border"}>
                        <div className={"flex-1"}>Chức năng khác</div>
                        <button onClick={() => setShowOption(false)}>
                            <Close/>
                        </button>
                    </div>

                    <div className={"mb-4"}>
                        {/* <button
                            className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                        >
                            Di chuyển tới việc cha
                        </button>
                        <button
                            className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                        >
                            Di chuyển tới nhóm dữ liệu
                        </button>
                        <button
                            className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                        >
                            Gán tính chất
                        </button>
                        <button
                            className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                        >
                            Gán phân loại cột mốc
                        </button>
                        <button
                            className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                        >
                            Gán hợp đồng
                        </button> */}
                        <Link
                            className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header block"}
                            to={`/pcm/detail/${task._id}/print/1`}
                        >
                            In ấn - Mẫu biên bản họp
                        </Link>
                        <Link
                            className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header block"}
                            to={`/pcm/detail/${task._id}/print/2`}
                        >
                            In ấn - Mẫu báo cáo
                        </Link>
                        <Link
                            className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header block"}
                            to={`/pcm/detail/${task._id}/print/3`}
                        >
                            In ấn - Mẫu phụ lục ảnh
                        </Link>

                        {task.draft === 1 && (
                            <button className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                                onClick={() => {
                                    openModal(
                                    <div
                                        className={
                                        "inline-block w-[521px] h-[200px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"
                                        }
                                    >
                                        <ModalUpdateTaskNameDraft taskId={task._id} onConfirm={refetchTaskInfo} />
                                    </div>
                                    )
                                }}
                            >
                                Cập nhật tiêu đề công việc (việc nháp)
                            </button>
                        )}

                        <button className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                            onClick={handleDownloadTemplateImportExcel}
                        >
                            Tải mẫu import excel
                        </button>
                    
                        <button className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                        >
                            <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required hidden onChange={handleImport}
                                accept=".xlsx, .xlsm, .xls, .csv"/>
                            <label className="custom-file-label" htmlFor="inputGroupFile">Import excel tạo việc con</label>
                        </button>
                        {/* <Link
                            className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header block"}
                            to={`/pcm/detail/${task._id}/print/4`}
                        >
                            In ấn - Yêu cầu, đệ trình
                        </Link> */}
                    </div>
                </div>
            }
        </div>
    )
}