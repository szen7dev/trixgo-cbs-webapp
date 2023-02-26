import React, { FC, UIEvent, useRef, useMemo, useState } from "react";
import { useUsersProject } from "services/hooks/users/useUserSystem";
import { DropdownSearchable, Item } from "shareComponents/common";
import TagIcon from "assets/images/icons8-price-tag-96.svg";
import DayPickerInput from "react-day-picker/DayPickerInput";
import moment from "moment";
import Axios from 'axios';
import { toast } from "react-toastify";
import { object, string } from "yup";
import { useTask } from "services/hooks/useTask";
import { getIn, Formik } from "formik";
import { SendToMultiSelected } from "./SendToMultiSelected";
import { Task } from "typings/task";
import { toArray } from 'lodash';
import { PostImage, PostFile } from 'shareComponents/common';
import taskUserAvt from "assets/images/task-user.svg";
// import iconClose from "assets/images/Vector.svg";
// import demoImg from "assets/images/demo-img 1.jpg";
// import pinIcon from "assets/images/icons8-attach-96 1.svg";
// import IconPhoto from "assets/images/icon-pic.svg";
import iconAttach from "assets/images/icons8-attach-50.png";
import { IconImage } from "views/media/shareComponents/common";
import { Checkbox, FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FileProps, FilePropsUpload } from "typings/common";
import { useUpload } from "services/hooks/useUpload";
import useUploadFile, { modifyUploadedFilesV2 } from 'services/hooks/useUploadFile';
import { APP_KEY } from "utils/constants";
import { validateFiles } from 'validation/file';
import classNames from 'classnames';

type Props = {
    task: Task;
    userId?: string;
    cancelCreateNewSubTask: () => void;
    confirmCreateNewSubTask: () => void;
}

export const CreateNewSubTask: FC<Props> = ({ task, userId, cancelCreateNewSubTask, confirmCreateNewSubTask }) => {
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
    const [isUploading, setIsUploading] = useState(false);
    const [isNotiEmail, setIsNotiEmail] = useState(false);
    const [tokens, setTokens] = useState<any[]>([]);

    const { data: listUsersProject, fetchNextPage } = useUsersProject({
        projectID: task.project?._id,
        keyword: keywordAssignee
    }, !!task.project?._id);

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

    const handleRemoveUpload = (file: FileProps | FilePropsUpload, type: 'FILE' | 'IMAGE') => {
        if ('id' in file) {
            const token = tokens.find(item => (item.key == file.id) && (item?.file?.name === file?.file?.name))
            token && token?.source?.cancel('Operation request canceled by the user.');

            type === 'IMAGE' ? removeUploadedImage(file.id) : removeUploadedFile(file.id);
        } else {
            const token = tokens.find(item => (item.key == file._id) && (item?.file?.name === file?.name))
            token && token?.source?.cancel('Operation request canceled by the user.');

            type === 'IMAGE' ? removeUploadedImage(file._id) : removeUploadedFile(file._id);
        }
    }

    const handleCancelCreateResponseComment = () => {
        tokens.map(token => {
            token?.source?.cancel('Operation request canceled by the user.');
        })

        removeAllFiles();
        cancelCreateNewSubTask();
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

    const handleAddChildTask = async (values: any) => {
        try {
            const usersRelated = selectedUser.map(user => user.value);
            let authorAttachs: string[] = [];

            // Get MessageList file uploaded
            for (const [, { _id }] of Object.entries(uploads.images)) {
                _id && (authorAttachs = [...authorAttachs, _id]);
            }

            for (const [, { _id }] of Object.entries(uploads.files)) {
                _id && (authorAttachs = [...authorAttachs, _id]);
            }

            const dataUpdate: any = {
                isUpdateNews: true,
                parentID: task._id,
                authorAttachs,
                isNotiEmail,
                relatedIDs: usersRelated
            }

            const { error, data } = await addTaskAsync({
                ...values,
                ...dataUpdate
            });

            if (error) return toast.warning(data?.message);

            toast.success('Tạo công việc thành công');
            confirmCreateNewSubTask();
        } catch (error) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            handleCancelCreateResponseComment();
            setSelectedUser([]);
        }
    }

    const initialValues = {
        name: "",
        description: "",
        assigneeID: task.assignee?._id,
        parentID: task.parent?._id,
        groupID: task.group?._id,
        projectID: task.project?._id,
        expiredTime: null,
        type: 2
    };

    const validateSchema = object().shape({
        name: string().required("Bạn cần nhập nội dung checklist"),
        expiredTime: string()
            .required("Bạn cần nhập thời hạn")
            .typeError("Bạn cần nhập thời hạn"),
        assigneeID: string().required("Bạn cần chọn người thực hiện"),
    });

    return (
        <div className={"create-new-subtask border-0.5 border-primary-border rounded ml-6 mt-4"}>
            <div className={"border-b-0.5 border-primary-border p-4"}>
                <SendToMultiSelected
                    projectId={task.project?._id}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                />
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validateSchema}
                onSubmit={handleAddChildTask}
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
                                <div className="w-3/6 border-b">
                                    <input
                                        name="name"
                                        className="w-full h-8 placeholder-gray-300 focus:outline-none"
                                        placeholder="Nội dung công việc"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <div className="w-2/6 mx-3 border-b">
                                    <DropdownSearchable
                                        placeholder={"Người thực hiện"}
                                        className={"w-full flex-1"}
                                        showTriangle={false}
                                        maxWidthInput={"max-w-none"}
                                        isMultiple={false}
                                        allowClearValueSingleInput={true}
                                        renderSelectedItem={(item) => (
                                            <div className={"flex items-center"}>
                                                <img alt={"tag icon"} src={TagIcon} />
                                                <span>{item.text}</span>
                                            </div>
                                        )}
                                        data={listUsersProject.map((item) => ({
                                            label: item.bizfullname,
                                            value: item._id,
                                        }))}
                                        initialValue={{
                                            label: task.assignee?.bizfullname,
                                            value: task.assignee?._id
                                        }}
                                        formatItem={{
                                            id: "value",
                                            text: "label",
                                        }}
                                        inlineSearch={true}
                                        onScroll={handleScroll}
                                        onSearchInputChange={handleSearchAssignee}
                                        onchangeValue={item => setFieldValue("assigneeID", item.id)}
                                        onClearData={() => setFieldValue("assigneeID", "")}
                                    />
                                </div>
                                <div className="w-1/6 border-b">
                                    <DayPickerInput
                                        value={values.expiredTime ?? ""}
                                        classNames={{
                                            container: "relative h-full",
                                            overlay: "w-full",
                                            overlayWrapper: "absolute bg-white w-full right-0 z-200"
                                        }}
                                        onDayChange={(day) => setFieldValue("expiredTime", moment(day).format("MM/DD/YYYY"))}
                                        inputProps={{
                                            className: "outline-none h-full max-w-full",
                                            placeholder: "Thời hạn",
                                            readOnly: true,
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex w-full px-4 pb-4 mt-1">
                                <div className="w-3/6">
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
                                        {getIn(touched, "assigneeID") &&
                                            getIn(errors, "assigneeID")}
                                    </span>
                                </div>
                                <div className="w-1/6 ">
                                    <span
                                        className="text-red-500"
                                        style={{ fontSize: 11 }}
                                    >
                                        {touched.expiredTime && errors.expiredTime}
                                    </span>
                                </div>
                            </div>
                            <div className="p-4">
                                {/* <label className="sr-only">Publish post</label> */}
                                <textarea name="" rows={8}
                                    className="border-0.5 p-4 rounded-md w-full bg-white outline:none outlineNone"
                                    placeholder="Nhập mô tả"
                                    onPaste={handlePasteFile}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                        setFieldValue("description", e.target.value);
                                    }}
                                ></textarea>
                                {/* <div>
                                    <span
                                        className="text-red-500"
                                        style={{ fontSize: 11 }}
                                    >
                                        Bạn cần nhập nội dung checklist
                                    </span>
                                </div> */}
                            </div>

                            {/* <div className="p-4 w-4/5">
                                <div className="w-full py-2 px-3 mb-3 bg-cbs-file-upload-bg">
                                    <div className=" flex justify-between">
                                        <div>
                                            <b>BaoCaoDanhGiaTacDongMoiTruongSocTrang.pdf</b>
                                            <span className="pl-3 text-primary-gray font-bold">(3.908K)</span>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <div className="w-[150px] border-0.5 border-primary bg-white h-3">
                                                <div
                                                    className="bg-primary h-3"
                                                    style={{ width: "45%" }} >
                                                </div>
                                            </div>
                                            <img alt={"tag icon"} src={iconClose} className="h-3" />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full py-2 px-3 mb-3 bg-cbs-file-upload-bg">
                                    <div className=" flex justify-between">
                                        <div className="text-primary">
                                            <b>BaoCaoDanhGiaTacDongMoiTruongSocTrang.pdf</b>
                                            <span className="pl-3 text-primary-gray font-bold">(3.908K)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 w-4/5">
                                <div className="w-full h-[180px] overflow-auto p-3 grid grid-cols-4 gap-2">
                                    <div className="relative w-[156px]">
                                        <img src={demoImg} alt="" className="w-full" />
                                        <div className="absolute bg-white rounded-full w-[24px] h-[24px] top-2 right-2 z-10 p-1.5">
                                            <img alt={"tag icon"} src={iconClose} className="w-full" />
                                        </div>
                                        <div className="absolute top-0 bg-opacity-60 bg-black w-full h-full p-2">
                                            <div className="h-full flex gap-3 items-end relative bottom-0 opacity-60">
                                                <div className="w-full border-0.5 border-cbs-border bg-black h-3">
                                                    <div
                                                        className="bg-cbs-border h-2.5"
                                                        style={{ width: "65%" }} >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative w-[156px]">
                                        <img src={demoImg} alt="" className="w-full" />
                                        <div className="absolute bg-white rounded-full w-[24px] h-[24px] top-2 right-2 z-10 p-1.5">
                                            <img alt={"tag icon"} src={iconClose} className="w-full" />
                                        </div>
                                    </div>
                                    <div className="relative w-[156px]">
                                        <img src={demoImg} alt="" className="w-full" />
                                        <div className="absolute bg-white rounded-full w-[24px] h-[24px] top-2 right-2 z-10 p-1.5">
                                            <img alt={"tag icon"} src={iconClose} className="w-full" />
                                        </div>
                                    </div>
                                    <div className="relative w-[156px]">
                                        <img src={demoImg} alt="" className="w-full" />
                                        <div className="absolute bg-white rounded-full w-[24px] h-[24px] top-2 right-2 z-10 p-1.5">
                                            <img alt={"tag icon"} src={iconClose} className="w-full" />
                                        </div>
                                    </div>
                                    <div className="relative w-[156px]">
                                        <img src={demoImg} alt="" className="w-full" />
                                        <div className="absolute bg-white rounded-full w-[24px] h-[24px] top-2 right-2 z-10 p-1.5">
                                            <img alt={"tag icon"} src={iconClose} className="w-full" />
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            <div
                                className={
                                    classNames("flex flex-wrap max-h-44 w-full pr-4 pl-12 py-2 custom-scroll overflow-x-hidden overflow-y-auto mt-1",
                                        (!Object.keys(uploads.images).length && !Object.keys(uploads.files).length) ? "h-0" : "")
                                }
                                ref={refDivFile}
                            >
                                <PostFile
                                    files={toArray(uploads.files)}
                                    onRemove={handleRemoveUpload}
                                    className="text-black w-full"
                                />
                                <PostImage
                                    images={toArray(uploads.images)}
                                    onRemove={handleRemoveUpload}
                                    className="post__files-row pt-5 text-black gap-5 flex-wrap"
                                />
                            </div>

                            <div className={"flex items-center justify-between pt-0 p-4"}>
                                <div className="flex gap-3 items-center">
                                    <div className="flex mt-2">
                                        <label className="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-300 flex justify-center items-center cursor-pointer mr-2">
                                            <IconImage />
                                            <input
                                                type="file"
                                                name="images"
                                                className="hidden"
                                                accept="image/*"
                                                multiple
                                                onChange={e => handleSetFiles(e.target.files)}
                                            />
                                        </label>
                                        <label className="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-300 flex justify-center items-center cursor-pointer">
                                            <img
                                                src={iconAttach}
                                                alt="Icon attach"
                                                className="h-6 w-6"
                                            />
                                            <input
                                                type="file"
                                                name="files"
                                                className="hidden"
                                                accept="*"
                                                multiple
                                                onChange={e => handleSetFiles(e.target.files)}
                                            />
                                        </label>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <label className="text-primary-gray mt-3">
                                            <Checkbox
                                                onChange={e => setIsNotiEmail(e.target.checked)}
                                            />
                                            Thông báo email
                                        </label>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <button className={"py-2 px-4 rounded bg-cbs-form-input-bg text-primary-gray mr-2 font-bold"} onClick={handleCancelCreateResponseComment}>
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