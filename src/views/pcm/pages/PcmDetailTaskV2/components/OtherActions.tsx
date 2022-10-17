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
import { read, utils } from 'xlsx';
import { useModal } from "services/hooks/useModal";
import { ModalUpdateTaskNameDraft } from "./ModalUpdateTaskNameDraft";
import { ModalConfirm } from "shareComponents/common";
import { useTask } from "services/hooks/useTask";
import { ModalMoveTaskToParent } from "./ModalMoveTaskToParent";
import { ModalUpdateTaskGroup } from "./ModalUpdateTaskGroup";
import { ModalUpdateTaskProduct } from "./ModalUpdateTaskProduct";
import { ModalUpdateTaskEvaluate } from "./ModalUpdateTaskEvaluate";
import { ModalAssignMilestone } from "./ModalAssignMilestone";
import { ModalDocLinkTask } from "./ModalDocLinkTask";

type Props = {
    task: Task;
    userId?: string;
    refetchTaskInfo?: ()=> void
}

export const OtherActions:FC<Props> = ({ task, userId, refetchTaskInfo }) => {
    const { openModal, closeModal } = useModal();
    const wrapperClass = useRef<HTMLDivElement>(null)
    const [showOption, setShowOption] = useState(false);
    const [dataImport, setDataImport] = useState([]);
    const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
		isExporting: false,
	});

    const { updateTaskAsync } = useTask({});

    useOnClickOutside(wrapperClass, () => setShowOption(false));

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
                    setDataImport(rows)
                }
            }
            reader.readAsArrayBuffer(file);
        }
        // Đọc xong thì xóa value trong input đi
        $event.target.value = null;
    }

    // Cập nhật việc nháp sang chính thức
    const handleUpdateToOffical = async () => {
        try {
			const { error, data } = await updateTaskAsync({
               taskID: task._id,
               draft: 0
            });

			if(error) {
				return toast.warn(data?.message);
			}

			refetchTaskInfo?.();
            toast.success('Cập nhật thành công');
		} catch (error) {
			if(error instanceof Error)
				toast.error(error.message)
		} finally {
            closeModal();
        }
    }

    // Gọi tới API để đẩy data lên
    useEffect(() => {
        if(dataImport.length){
            const fetchData = async () => {
                const data = await importTaskFromExcelAsync({ taskID: task._id, dataImport: JSON.stringify(dataImport) });
                setDataImport([]);
                refetchTaskInfo?.()
                if(!data.error){
                    return toast.success("Import thành công");
                }
                return toast.error(data.message);
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
                        <Link
                            className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header block"}
                            to={`/pcm/detail/${task._id}/print/4`}
                        >
                            In ấn - Mẫu đề nghị (RFA, RFI,...)
                        </Link>

                        <hr style={{ opacity: '.3', width: '90%', display: 'flex', alignContent: 'center', alignItems: 'center', margin: 2 }} />

                        <button className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                            onClick={() => {
                                openModal(
                                    <div
                                        className={
                                        "inline-block w-[521px] my-8 text-left align-middle transition-all transform bg-primary-light shadow-xl"
                                        }
                                    >
                                        <ModalMoveTaskToParent
                                            taskID={task._id}
                                            projectID={task.project?._id}
                                            closeModal={closeModal}
                                            onConfirm={refetchTaskInfo}
                                        />
                                    </div>
                                )
                            }}
                        >
                            Di chuyển đến công việc cha
                        </button>

                        {(task.project.admins.map(item=>item.toString()).includes(userId?.toString())) && (
                            <>
                                <button className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                                    onClick={() => {
                                        openModal(
                                            <div
                                                className={
                                                "inline-block w-[521px] my-8 text-left align-middle transition-all transform bg-primary-light shadow-xl"
                                                }
                                            >
                                                <ModalUpdateTaskGroup
                                                    taskID={task._id}
                                                    projectID={task.project?._id}
                                                    group={task.group}
                                                    closeModal={closeModal}
                                                    onConfirm={refetchTaskInfo}
                                                />
                                            </div>
                                        )
                                    }}
                                >
                                    Di chuyển đến nhóm dữ liệu
                                </button>

                                <button
                                    className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                                    onClick={() => {
                                        openModal(
                                            <div
                                                className={
                                                "inline-block w-[521px] my-8 text-left align-middle transition-all transform bg-primary-light shadow-xl"
                                                }
                                            >
                                                <ModalAssignMilestone
                                                    taskID={task._id}
                                                    milestone={task.milestone}
                                                    closeModal={closeModal}
                                                    onConfirm={refetchTaskInfo}
                                                />
                                            </div>
                                        )
                                    }}
                                >
                                    Gán phân loại cột mốc
                                </button>
                            </>
                        )}

                        <button
                            className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                            onClick={() => {
                                openModal(
                                    <div
                                        className={
                                        "inline-block w-[521px] my-8 text-left align-middle transition-all transform bg-primary-light shadow-xl"
                                        }
                                    >
                                        <ModalDocLinkTask
                                            taskID={task._id}
                                            projectID={task.project?._id}
                                            linksDocs={task.linksDocs}
                                            closeModal={closeModal}
                                        />
                                    </div>
                                )
                            }}
                        >
                            Link tới hồ sơ văn bản
                        </button>

                        <hr style={{ opacity: '.3', width: '90%', display: 'flex', alignContent: 'center', alignItems: 'center', margin: 2 }} />

                        {task.author._id.toString() == userId?.toString() && (
                            <>
                                <button
                                    className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                                    onClick={() => {
                                        openModal(
                                            <div
                                                className={
                                                "inline-block w-[521px] my-8 text-left align-middle transition-all transform bg-primary-light shadow-xl"
                                                }
                                            >
                                                <ModalUpdateTaskProduct
                                                    task={task}
                                                    closeModal={closeModal}
                                                    onConfirm={refetchTaskInfo}
                                                />
                                            </div>
                                        )
                                    }}
                                >
                                    Cập nhật giá trị thực hiện
                                </button>

                                <button
                                    className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                                    onClick={() => {
                                        openModal(
                                            <div
                                                className={
                                                "inline-block w-[521px] my-8 text-left align-middle transition-all transform bg-primary-light shadow-xl"
                                                }
                                            >
                                                <ModalUpdateTaskEvaluate
                                                    task={task}
                                                    closeModal={closeModal}
                                                    onConfirm={refetchTaskInfo}
                                                />
                                            </div>
                                        )
                                    }}
                                >
                                    Cập nhật thông tin đánh giá
                                </button>

                            </>
                        )}

                        {(task.draft === 1 || task.project.admins.map(item=>item.toString()).includes(userId?.toString())) && (
                            <>
                                <button className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                                    onClick={() => {
                                        openModal(
                                        <div
                                            className={
                                            "inline-block w-[521px] h-[200px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"
                                            }
                                        >
                                            <ModalUpdateTaskNameDraft taskId={task._id} taskName={task.name} onConfirm={refetchTaskInfo} />
                                        </div>
                                        )
                                    }}
                                >
                                    Cập nhật tiêu đề công việc
                                </button>
                            </>
                        )}

                        {task.draft === 1 && (
                            <>
                                <button className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                                    onClick={() => {
                                        openModal(
                                            <div
                                              className={
                                                "inline-block w-[521px] h-[240px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
                                              }
                                            >
                                              <ModalConfirm
                                                title="Bạn có muốn chuyển thành việc chính thức không?"
                                                description="Bạn sẽ không thể chuyển từ việc chính thức sang việc nháp"
                                                onConfirm={handleUpdateToOffical}
                                                defaultText={false}
                                                onCancel={closeModal}
                                              />
                                            </div>
                                        );
                                    }}
                                >
                                    Cập nhật thành việc chính thức
                                </button>
                            </>
                        )}

                        <hr style={{ opacity: '.3', width: '90%', display: 'flex', alignContent: 'center', alignItems: 'center', margin: 2 }} />

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