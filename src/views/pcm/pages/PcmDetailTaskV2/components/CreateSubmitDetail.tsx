import React, { FC, UIEvent, useRef, useMemo, useState } from "react";
import { DropdownSearchable, Item } from "shareComponents/common";
import TagIcon from "assets/images/icons8-price-tag-96.svg";
import moment from "moment";
import Axios from 'axios';
import { toast } from "react-toastify";
import { object, string } from "yup";
import { useTask } from "services/hooks/useTask";
import { getIn, Formik } from "formik";
import { Task } from "typings/task";
import taskUserAvt from "assets/images/task-user.svg";
import { FileProps, FilePropsUpload } from "typings/common";
import { useUpload } from "services/hooks/useUpload";
import useUploadFile, { modifyUploadedFilesV2 } from 'services/hooks/useUploadFile';
import { APP_KEY } from "utils/constants";
import { validateFiles } from 'validation/file';
import classNames from 'classnames';
import { useBudgetWork } from "services/hooks/budget/useBudgetWork";
import { useBudgetSubmittal } from "services/hooks/budget/useBudgetSubmittal";
import { useUsersProject } from "services/hooks/users/useUserSystem";

type Props = {
    task: Task;
    userId?: string;
    cancelCreateSubmittal: () => void;
    confirmCreateSubmittal: () => void;
}

export const CreateSubmitDetail: FC<Props> = ({ task, userId, cancelCreateSubmittal, confirmCreateSubmittal }) => {

    const initUsersSelected = useMemo(() => {
        let arr = [];
        if (task.accessUsers && task.accessUsers.length) {
            arr = task.accessUsers.map(({ bizfullname, _id, image }) => ({
                label: bizfullname,
                value: _id,
                image: image ? `${process.env.REACT_APP_URL_S3_USER}/${image}` : taskUserAvt
            }))
        } else {
            const accessUsers = [task.author, task.assignee, ...task.related];
            arr = accessUsers.map(({ bizfullname, _id, image }) => ({
                label: bizfullname,
                value: _id,
                image: image ? `${process.env.REACT_APP_URL_S3_USER}/${image}` : taskUserAvt
            }))
        }

        return arr.filter(item => item.value !== userId);
    }, [task])

    const refDivFile = useRef<HTMLDivElement | null>(null);
    const [selectedUser, setSelectedUser] = useState<Item[]>(initUsersSelected);
    const [keywordAssignee, setKeywordAssignee] = useState('');
    const [keywordContact, setKeywordContact] = useState('');
    const [keywordBugetWork, setKeywordBugetWork] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isNotiEmail, setIsNotiEmail] = useState(false);
    const [tokens, setTokens] = useState<any[]>([]);

    const { data: listUsersProject, fetchNextPage } = useUsersProject({
        projectID: task.project?._id,
        keyword: keywordAssignee
    }, !!task.project?._id);

    const {
		list: listBudgetWorks,
		// fetchNextPage,
		// hasNextPage,
		// totalRecord,
		// refetch
	} = useBudgetWork({
		params: {
			keyword: keywordBugetWork
		},
		isFetchList: true
	})

    const {
		insertAsync: insertBugetWorkAsync,
		list: listBudgets,
		// fetchNextPage,
		hasNextPage,
		totalRecord,
		refetch
	} = useBudgetSubmittal({
		params: {
			// isMember: 1,
			// keyword
		},
		isFetchList: true
	})

    const [uploads, {
        setUploadImageProgress,
        setUploadFileProgress,
        setIDImageUploaded,
        setIDFileUploaded,
        setUploadImage,
        setUploadFile,
        removeAllFiles,
        removeUploadedImage,
        removeUploadedFile
    }] = useUploadFile({});

    const { addFileToUpload } = useUpload({
        appID: APP_KEY.PCM_PLAN_TASK,
        companyID: task.company?._id,
        projectID: task.project?._id,
        groupID: task.group?._id
    });

    const { addTaskAsync } = useTask({});

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
        const isBottom = scrollHeight - scrollTop === clientHeight;
        isBottom && fetchNextPage();
    }

    const handleSearchAssignee = (keyword: string) => {
        setKeywordAssignee(keyword);
    };

    const handleSearchBudgetWork = (keyword: string) => {
        setKeywordBugetWork(keyword);
    };

    const getCancelTokenRequest = (key: string, file: any) => {
        const CancelToken = Axios.CancelToken;
        const source = CancelToken.source();

        setTokens(previousValue => ([
            ...previousValue,
            {
                key,
                file,
                source
            }
        ]))

        return source;
    }

    const handleCancelCreateSubmittal = () => {
        tokens.map(token => {
            token?.source?.cancel('Operation request canceled by the user.');
        })

        removeAllFiles();
        cancelCreateSubmittal();
    }

    const handleSetFiles = async (filesSelected: FileList | null) => {
        if (!filesSelected) return;

        const { error, message } = await validateFiles(filesSelected);
        if (error) return toast.warn(message);

        const [files, images] = modifyUploadedFilesV2({
            imgLastKey: Object.keys(uploads.images).length || null,
            fileLastKey: Object.keys(uploads.files).length || null,
        }, filesSelected);

        setIsUploading(true);
        setUploadImage(images);
        setUploadFile(files);

        // Upload images
        for (const [key, { file }] of Object.entries(images)) {
            const source = getCancelTokenRequest(key, file);
            const { _id } = await addFileToUpload({
                files: file,
                fileType: 1,
                source,
                progress: percentCompleted => {
                    console.log(`${percentCompleted}%`, key);
                    setUploadImageProgress(key, percentCompleted)
                }
            })
            setIDImageUploaded(key, _id);
        }

        // Upload files
        for (const [key, { file }] of Object.entries(files)) {
            const source = getCancelTokenRequest(key, file);
            const { _id } = await addFileToUpload({
                files: file,
                fileType: 2,
                source,
                progress: percentCompleted => {
                    console.log(`${percentCompleted}%`, key);
                    setUploadFileProgress(key, percentCompleted)
                }
            })
            setIDFileUploaded(key, _id);
        }

        setIsUploading(false);
    }

    const handlePasteFile = (event: any) => {
		// event.preventDefault();

		if(event.clipboardData?.files?.length) {
		  return handleSetFiles(event.clipboardData.files)
		}

		const text = event.clipboardData.getData('text/plain');
		text && window.document.execCommand('insertText', false, text);
	}

    const handleAddSubmittal = async (values: any) => {
        try {
            const dataUpdate: any = {
                isUpdateNews: true,
                taskID: task._id,
            }

            const { error, data } = await insertBugetWorkAsync({
                ...values,
                ...dataUpdate
            });

            if (error) return toast.warning(data?.message);

            toast.success('Tạo mẩu tin thành công');
            confirmCreateSubmittal();
        } catch (error) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            handleCancelCreateSubmittal();
            setSelectedUser([]);
        }
    }

    const initialValues = {
        name: "",
        note: "",
    };

    const validateSchema = object().shape({
        name: string().required("Bạn cần nhập nội dung"),
        workID: string().required("Bạn cần chọn ngân sách tương ứng"),
    });

    return (
        <div className={"create-new-subtask border-0.5 border-primary-border rounded ml-6 mt-4"}>
            <Formik
                initialValues={initialValues}
                validationSchema={validateSchema}
                onSubmit={handleAddSubmittal}
            >
                {({
                    values,
                    touched,
                    errors,
                    handleBlur,
                    handleChange,
                    setFieldValue,
                    handleSubmit,
                }) => {
                    return (
                        <>
                            <div className="flex w-full px-4 pt-4">
                                <div className="w-2/6 border-b">
                                    <input
                                        name="name"
                                        className="w-full h-8 placeholder-gray-300 focus:outline-none"
                                        placeholder={"Nội dung"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <div className="w-2/6 mx-3 border-b">
                                    <DropdownSearchable
                                        placeholder={"Khoản mục phí"}
                                        className={"w-full flex-1"}
                                        showTriangle={false}
                                        maxWidthInput={"max-w-none"}
                                        isMultiple={false}
                                        allowClearValueSingleInput={true}
                                        renderSelectedItem={(item) => (
                                            <div className={"flex items-center"}>
                                                {/* <img alt={"tag icon"} src={TagIcon} /> */}
                                                <span>{item.text}</span>
                                            </div>
                                        )}
                                        data={listBudgetWorks.map((item) => ({
                                            label: `${item.sign}-${item.name}`,
                                            value: item._id,
                                        }))}
                                        formatItem={{
                                            id: "value",
                                            text: "label",
                                        }}
                                        inlineSearch={true}
                                        onScroll={handleScroll}
                                        onSearchInputChange={handleSearchBudgetWork}
                                        onchangeValue={item => setFieldValue("workID", item.id)}
                                        onClearData={() => setFieldValue("workID", "")}
                                    />
                                </div>
                                <div className="w-1/6 border-b">
                                    <input
                                        type="number"
                                        name="quantity"
                                        className="w-full h-8 placeholder-gray-300 focus:outline-none"
                                        placeholder={"Khối lượng"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <div className="w-1/6 border-b">
                                    <input
                                        type="number"
                                        name="unitPrice"
                                        className="w-full h-8 placeholder-gray-300 focus:outline-none"
                                        placeholder={"Đơn giá"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                            </div>

                             {/* Validate data */}
                             <div className="flex w-full px-4 pb-4 mt-1">
                                <div className="w-2/6">
                                    <span
                                        className="text-red-500"
                                        style={{ fontSize: 11 }}
                                    >
                                        {touched.name && errors.name}
                                    </span>
                                </div>
                                <div className="w-2/6 mx-3">
                                    <span
                                        className="text-red-500"
                                        style={{ fontSize: 11 }}
                                    >
                                        {getIn(touched, "workID") &&
                                            getIn(errors, "workID")}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4">
                                <textarea name="" rows={8}
                                    className="border-0.5 p-4 rounded-md w-full bg-white outline:none outlineNone"
                                    placeholder="Nhập ghi chú"
                                    onPaste={handlePasteFile}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                        setFieldValue("note", e.target.value);
                                    }}
                                ></textarea>
                            </div>
                            <div className={"flex items-center justify-between pt-0 p-4"}>
                                <div className="flex items-center">
                                    <button className={"py-2 px-4 rounded bg-cbs-form-input-bg text-primary-gray mr-2 font-bold"} onClick={handleCancelCreateSubmittal}>
                                        Bỏ qua
                                    </button>
                                    <button
                                        onClick={() => handleSubmit()}
                                        disabled={isUploading}
                                        className={classNames("py-2 px-4 bg-primary rounded text-white", {
                                            'disabled:opacity-60': isUploading
                                        })}
                                    >
                                        Xác nhận
                                    </button>
                                </div>
                            </div>
                        </>
                    );
                }}
            </Formik>
        </div>
    )
}