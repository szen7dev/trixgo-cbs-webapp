import { FC, UIEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { captureException } from "@sentry/react";
import { Formik, getIn } from "formik";
import { object, string, date } from "yup";
import { toast } from "react-toastify";
import moment from "moment";
import classnames from "classnames";

import IconPlus from "assets/images/icons8-plus-math-100.png";
import SendEmailIcon from "assets/images/icons8-send-email-96.svg";
import pencilIcon from "assets/images/icons8-pencil.svg";
import LinkIcon from "assets/images/icon-linking.png";
import DotsVerticalIcon from "assets/icons/DotsVertical";
import TagIcon from "assets/images/icons8-price-tag-96.svg";

import { CheckListItem } from "../CheckListItem";
import { DropdownSearchable } from "shareComponents/common";

import { useUsersProject } from "services/hooks/users/useUserSystem";
import { useCheckList, useChildTask } from "services/hooks/useTask";
import { useSocket } from "services/hooks/useSocket";
import { useAuth } from "services/hooks/auth/useAuth";
import {
  CheckList as CheckListType,
  ChildTask as ChildTaskType,
  Task,
  UpdateStatusCheckListPayload
} from "typings/task";

import "react-datepicker/dist/react-datepicker.css";

enum CheckListTab {
  ALL = "ALL",
  PROGRESS = "PROGRRESS",
  DONE = "DONE",
  OUT_DATE = "OUT_DATE",
  NEXT_WEEK = "NEXT_WEEK",
  MORE_SEVEN_DAYS = "MORE_SEVEN_DAYS",
}

type Props = {
  componentType: 'CHECKLIST' | 'CHILD_TASK' | 'CHECKLIST_PRINT',
  task: Task,
  data: Array<CheckListType | ChildTaskType>;
  totalRecord?: number;
  onSeeMore: () => void;
  hasPermission: boolean;
};

export const CheckList: FC<Props> = ({ componentType, task, data, totalRecord, onSeeMore, hasPermission }) => {
  const [keywordAssignee, setKeywordAssignee] = useState('');
  const [visibleForm, setVisibleForm] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const [listData, setListData] = useState<CheckListType[] | ChildTaskType[]>([]);
  const [currentTab, setCurrentTab] = useState(CheckListTab.ALL);

  const { addChecklistAsync, updateStatusChecklistAsync } = useCheckList({ parentID: task?._id });
  const { addChildTaskAsync } = useChildTask({ parentID: task?._id });

  const { data: listUsersProject, fetchNextPage } = useUsersProject({
    projectID: task?.project?._id,
    keyword: keywordAssignee
  }, true);

  const { user } = useAuth();
  const { current: socket }: any = useSocket();

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const isBottom = scrollHeight - scrollTop === clientHeight;
    isBottom && fetchNextPage();
  }

  const handleSearchAssignee = (keyword: string) => {
    setKeywordAssignee(keyword);
  };

  const getClassTab = (tab: CheckListTab) => {
    return currentTab === tab
      ? "border-b-2 border-primary font-bold"
      : "text-primary-gray";
  };

  const initialValues = {
    name: "",
    assigneeID: "",
    parentID: task?._id,
    groupID: task?.group?._id,
    projectID: task?.project?._id,
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

  const handleAddChecklist = async (values: any) => {
    try {
      const { error, data } = await addChecklistAsync(values);

      if (error) {
        return toast.warning(data?.message);
      }

      socket?.emit('SUBJECT_PCM_CSS_ADD_CHECKLIST', {
        taskID: data.parent,
        checklistID: data._id
      })

      setListData(previousValues => ([data, ...previousValues]));
      setVisibleForm(false);

      toast.success('Tạo checklist thành công');
    } catch (error: unknown) {
      captureException(error);
      if (typeof error === "string") {
          toast.error(error);
      } else if (error instanceof Error) {
          toast.error(error.message);
      }
    }
  }

  const handleAddChildTask = async (values: any) => {
    try {
      values.type = 1; // VIỆC CON (type = 1)
      const { error, data } = await addChildTaskAsync(values);

      if (error) {
        return toast.warning(data?.message);
      }

      socket?.emit('SUBJECT_PCM_CSS_ADD_CHILD_TASK', {
        taskID: data.parent,
        childTaskID: data._id
      })

      setListData(previousValues => ([data, ...previousValues]));
      setVisibleForm(false);

      toast.success('Tạo việc con thành công');
    } catch (error: unknown) {
			captureException(error);
      if (typeof error === "string") {
          toast.error(error);
      } else if (error instanceof Error) {
          toast.error(error.message);
      }
    }
  }

  const handleUpdateStatusCheckList = async (payload: UpdateStatusCheckListPayload) => {
    try {
      const { error, message } = await updateStatusChecklistAsync(payload);

      if (error) {
        return toast.warning(message);
      }

      toast.success('Cập nhật checklist thành công');
    } catch (error: unknown) {
			captureException(error);
      if (typeof error === "string") {
        toast.error(error);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  useEffect(() => {
    setListData(data);
  }, [data.length])

  useEffect(() => {
    const onAddCheckList = (result: any) => {
      const { error, data } = result;
      if(error) return;

      const { infoTask, infoCheckList, senderID } = data;

      if(!componentType.includes('CHECKLIST')) return;
      if(task?._id !== infoTask?._id?.toString()) return;
      if(user?._id === senderID) return;

      setListData(previousValues => ([infoCheckList, ...previousValues]));
    }

    const onAddChildTask = (result: any) => {
      const { error, data } = result;
      if(error) return;

      const { infoTask, infoChildTask, senderID } = data;

      if(componentType !== 'CHILD_TASK') return;
      if(task?._id !== infoTask?._id?.toString()) return;
      if(user?._id === senderID) return;

      setListData(previousValues => ([infoChildTask, ...previousValues]));
    }

    socket?.on('SUBJECT_PCM_SSC_ADD_CHECKLIST', onAddCheckList);
    socket?.on('SUBJECT_PCM_SSC_ADD_CHILD_TASK', onAddChildTask);

    return () => {
      socket?.off('SUBJECT_PCM_SSC_ADD_CHECKLIST', onAddCheckList);
      socket?.off('SUBJECT_PCM_SSC_ADD_CHILD_TASK', onAddChildTask);
    }
  }, [socket]);

  return (
    <div className={classnames('border-cbs-border', {
      "border-b-0.5": hasPermission
    })}>
      {/* Check messageList header */}
      <div
        className={`${
          selectAll ? "mb-1" : "mb-2"
        } flex px-5 items-center justify-between`}
      >
        <div className={`${selectAll ? "" : "w-1/6"}`}>
          {/* <input
            type="checkbox"
						className="cbs-checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
          /> */}
          {componentType !== 'CHECKLIST_PRINT' && (
            <span className="ml-2 text-x-large">{componentType === 'CHECKLIST' ? 'Checklist' : 'Việc con'}</span>
          )}
          {/* {!selectAll && <span className="ml-2 text-x-large">{componentType === 'CHECKLIST' ? 'Checklist' : 'Việc con'}</span>} */}
        </div>

        {selectAll ? (
          <div className="flex justify-between w-full ml-5">
            <div className="flex items-center">
              <button className="mx-2">
                <img
                  className="w-6"
                  src={SendEmailIcon}
                  alt="Send email"
                />
              </button>
              <button className="mx-2">
                <img className="w-6" src={pencilIcon} alt="Update" />
              </button>
              <button className="mx-2">
                <img className="w-6" src={LinkIcon} alt="Link" />
              </button>
            </div>
            <button className="text-[13px] w-10 h-10 flex justify-center items-center rounded-full bg-lighter-gray">
              <DotsVerticalIcon />
            </button>
          </div>
        ) : (
          <div className="flex justify-between w-5/6 hidden">
            <button
              className={`px-2 ${getClassTab(CheckListTab.ALL)}`}
              onClick={() => setCurrentTab(CheckListTab.ALL)}
            >
              <span className="text-xs">Tất cả (12)</span>
            </button>
            <button
              className={`px-2 ${getClassTab(CheckListTab.PROGRESS)}`}
              onClick={() => setCurrentTab(CheckListTab.PROGRESS)}
            >
              <span className="text-xs">Triển khai</span>
            </button>
            <button
              className={`px-2 ${getClassTab(CheckListTab.DONE)}`}
              onClick={() => setCurrentTab(CheckListTab.DONE)}
            >
              <span className="text-xs">Hoàn thành</span>
            </button>

            <span>|</span>

            <button
              className={`flex items-center px-2 ${getClassTab(
                CheckListTab.OUT_DATE
              )}`}
              onClick={() => setCurrentTab(CheckListTab.OUT_DATE)}
            >
              <div className="w-3 h-3 bg-red-500" />
              <span className="ml-1">Quá hạn</span>
            </button>
            <button
              className={`flex items-center px-2 ${getClassTab(
                CheckListTab.NEXT_WEEK
              )}`}
              onClick={() => setCurrentTab(CheckListTab.NEXT_WEEK)}
            >
              <div className="w-3 h-3 bg-yellow-500" />
              <span className="ml-1">Tuần tới</span>
            </button>
            <button
              className={`flex items-center px-2 ${getClassTab(
                CheckListTab.MORE_SEVEN_DAYS
              )}`}
              onClick={() => setCurrentTab(CheckListTab.MORE_SEVEN_DAYS)}
            >
              <div className="w-3 h-3 bg-green-500" />
              <span className="ml-1"> {">7 ngày"}</span>
            </button>
          </div>
        )}
      </div>

      <div className="overflow-hidden">
        <div className="">
          <div className="w-full divide-y divide-cbs-border pl-5 pr-4">
            {(listData || []).map((item) => (
              <CheckListItem
                key={item._id}
                data={item}
                userID={user?._id}
                onUpdateStatusCheckList={handleUpdateStatusCheckList}
              />
            ))}
          </div>
        </div>

        <div>
          {totalRecord && totalRecord - data.length > 0 ? (
            <div className="w-full flex justify-center my-5">
              <button onClick={() => onSeeMore()}>
                <span className="text-primary">{`Xem thêm (${
                  totalRecord - data.length
                })`}</span>
              </button>
            </div>
          ) : <></>}

          <div className="w-full h-px bg-gray-200" />

          {visibleForm && (
            <div className="shadow-cbs-md rounded-cbs-sm p-5">
              <Formik
                initialValues={initialValues}
                validationSchema={validateSchema}
                onSubmit={componentType.includes('CHECKLIST') ? handleAddChecklist : handleAddChildTask}
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
                      <div className="flex w-full">
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
                          <DatePicker
                            wrapperClassName={"w-auto"}
                            selected={values.expiredTime}
                            customInput={
                              <div className={"relative w-auto ml-2 min-h-fit"}>
                                <input
                                  name="expiredTime"
                                  placeholder="Thời hạn"
                                  autoComplete="off"
                                  className="w-full h-8 placeholder-gray-300 focus:outline-none"
                                  value={
                                    values.expiredTime
                                      ? moment(values.expiredTime).format(
                                          "DD/MM/YYYY"
                                        )
                                      : ""
                                  }
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </div>
                            }
                            onChange={(date: Date | null) =>
                              setFieldValue("expiredTime", date)
                            }
                          />
                        </div>
                      </div>
                      <div className="flex w-full mt-1">
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

                      <div className="flex justify-end mt-3">
                        <button
                          className="px-3 py-2 rounded bg-gray-300 text-primary-gray"
                          onClick={() => setVisibleForm(false)}
                        >
                          Bỏ qua
                        </button>
                        <button
                          type="submit"
                          className="mx-3 px-3 py-2 rounded bg-primary text-white"
                          onClick={() => handleSubmit()}
                        >
                          Xác nhận
                        </button>
                      </div>
                    </>
                  );
                }}
              </Formik>
            </div>
          )}

          {/* <div className={classnames("shadow-lg px-5", {
            'mt-5 pb-5': hasPermission
          })}>
            {hasPermission && (
              <button onClick={() => setVisibleForm(true)}>
                <div className="flex items-center text-green-success font-bold">
                  <img src={IconPlus} alt="icon" className="w-4 h-4" />
                  <span className="ml-1">Tạo mới</span>
                </div>
              </button>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};
