import React, {FC, UIEvent, useEffect, useState} from "react";
import {useUsersProject} from "services/hooks/users/useUserSystem";
import {DropdownSearchable} from "shareComponents/common";
import TagIcon from "assets/images/icons8-price-tag-96.svg";
import DayPickerInput from "react-day-picker/DayPickerInput";
import moment from "moment";
import {date, object, string} from "yup";
import {useSocket} from "services/hooks/useSocket";
import {getIn, Formik} from "formik";
import {SendToMultiSelected} from "./SendToMultiSelected";

export const CreateNewSubTask:FC = () => {
    const [keywordAssignee, setKeywordAssignee] = useState('');
    const { data: listUsersProject, fetchNextPage } = useUsersProject({
        projectID: "5e847180d7e3490be59aef72",
        keyword: keywordAssignee
    }, true);

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
        const isBottom = scrollHeight - scrollTop === clientHeight;
        isBottom && fetchNextPage();
    }

    const handleSearchAssignee = (keyword: string) => {
        setKeywordAssignee(keyword);
    };

    const { current: socket }: any = useSocket();

    const initialValues = {
        name: "",
        assigneeID: "",
        parentID: "5e847180d7e3490be59aef72",
        groupID: "",
        projectID: "",
        expiredTime: null,
        type: 2
    };

    const validateSchema = object().shape({
        name: string().required("Bạn cần nhập nội dung checklist"),
        expiredTime: date()
            .required("Bạn cần nhập thời hạn")
            .typeError("Bạn cần nhập thời hạn"),
        assigneeID: string().required("Bạn cần chọn người thực hiện"),
    });

    const handleAddChildTask = async (values: any) => {
        console.log('asddasdasd')
    }

    return (
        <div className={"create-new-subtask border-0.5 border-primary-border rounded ml-6 mt-4"}>
            <div className={"border-b-0.5 border-primary-border p-4"}>
                <SendToMultiSelected/>
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
                                        value={values.expiredTime??""}
                                        classNames={{
                                            container: "relative h-full",
                                            overlay: "w-full",
                                            overlayWrapper: "absolute bg-white w-full right-0 z-200"
                                        }}
                                        onDayChange={(day) => setFieldValue("expiredTime", moment(day).format("DD/MM/YYYY"))}
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

                            <div className={"flex items-center justify-end pt-0 p-4"}>
                                <button className={"py-2 px-4 rounded bg-cbs-form-input-bg text-primary-gray mr-2"}>
                                    Bỏ qua
                                </button>
                                <button
                                    onClick={() => handleSubmit()}
                                    className={"py-2 px-4 rounded bg-primary text-white"}>
                                    Xác nhận
                                </button>
                            </div>
                        </>
                    );
                }}
            </Formik>
        </div>
    )
}