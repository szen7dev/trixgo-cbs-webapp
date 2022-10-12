import React, { FC, UIEvent, useMemo, useState } from "react";
import { useUsersProject } from "services/hooks/users/useUserSystem";
import { DropdownSearchable, Item } from "shareComponents/common";
import TagIcon from "assets/images/icons8-price-tag-96.svg";
import DayPickerInput from "react-day-picker/DayPickerInput";
import moment from "moment";
import { toast } from "react-toastify";
import { date, object, string } from "yup";
import { useSocket } from "services/hooks/useSocket";
import { useTask } from 'services/hooks/useTask';
import { getIn, Formik } from "formik";
import { SendToMultiSelected } from "./SendToMultiSelected";
import { Task } from "typings/task";
import taskUserAvt from "assets/images/task-user.svg";
import iconClose from "assets/images/Vector.svg";
import demoImg from "assets/images/demo-img 1.jpg";
import pinIcon from "assets/images/icons8-attach-96 1.svg";
import IconPhoto from "assets/images/icon-pic.svg";
import { Checkbox } from "@mui/material";

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

    const [selectedUser, setSelectedUser] = useState<Item[]>(initUsersSelected);
    const [keywordAssignee, setKeywordAssignee] = useState('');

    const { data: listUsersProject, fetchNextPage } = useUsersProject({
        projectID: task.project?._id,
        keyword: keywordAssignee
    }, !!task.project?._id);

    const { addTaskAsync } = useTask({});

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
        const isBottom = scrollHeight - scrollTop === clientHeight;
        isBottom && fetchNextPage();
    }

    const handleSearchAssignee = (keyword: string) => {
        setKeywordAssignee(keyword);
    };

    // const { current: socket }: any = useSocket();

    const initialValues = {
        name: "",
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

    const handleAddChildTask = async (values: any) => {
        try {
            const usersRelated = selectedUser.map(user => user.value);

            const { error, data } = await addTaskAsync({
                ...values,
                isUpdateNews: true,
                parentID: task._id,
                relatedIDs: usersRelated
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
            cancelCreateNewSubTask();
            setSelectedUser([]);
        }
    }

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

                            {/* <div className="flex w-full px-4 pb-4 mt-1">
                                <div className="w-3/6">
                                    <span
                                        className="text-red-500"
                                        style={{ fontSize: 11 }}
                                    >
                                        {touched.name && errors.name}
                                    </span>
                                </div>
                                <div className="w-2/6 mx-3 ">
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
                                <label className="sr-only">Publish post</label>
                                <textarea id="editor" rows={8}
                                    className="border-0.5 p-4 rounded-md w-full bg-white outline:none outlineNone"
                                    placeholder="Write an article..." required>
                                </textarea>
                                <div className="w-1/6 ">
                                    <span
                                        className="text-red-500"
                                        style={{ fontSize: 11 }}
                                    >
                                        Bạn cần nhập nội dung checklist
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 w-4/5">
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

                            <div className={"flex items-center justify-between pt-0 p-4"}>
                                <div className="flex gap-3 items-center">
                                    <button
                                        className={"py-1 px-2 rounded bg-cbs-border w-[40px] h-[40px] "}>
                                        <img alt={""} src={pinIcon} />
                                    </button>
                                    <button
                                        className={"py-1 px-2 rounded bg-cbs-border w-[40px] h-[40px]"}>
                                        <img alt={"tag icon"} src={IconPhoto} />
                                    </button>
                                    <div className="flex gap-2 items-center">
                                         <Checkbox/>
                                         <span className="text-primary-gray">Thông báo email</span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <button className={"py-2 px-4 rounded bg-cbs-form-input-bg text-primary-gray mr-2 font-bold"} onClick={cancelCreateNewSubTask}>
                                        Bỏ qua
                                    </button>
                                    <button
                                        onClick={() => handleSubmit()}
                                        className={"py-2 px-4 rounded bg-primary text-white"}>
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