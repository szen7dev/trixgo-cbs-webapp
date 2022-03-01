import { FC, useState } from "react";
import DatePicker from "react-datepicker";
import { Formik, getIn } from "formik";
import { object, string, date } from "yup";
import moment from "moment";

import IconPlus from "assets/images/icons8-plus-math-100.png";
import SendEmailIcon from "assets/images/icons8-send-email-96.svg";
import IconPencil from "assets/images/icons8-pencil.svg";
import LinkIcon from "assets/images/icon-linking.png";
import DotsVerticalIcon from "assets/icons/DotsVertical";
import TagIcon from "assets/images/icons8-price-tag-96.svg";

import { CheckListItem } from "../CheckListItem";
import { DropdownSearchable } from "shareComponents/common";

import { useQueryListFriend } from "services/hooks/users/useFriend";
import { useCheckList } from "services/hooks/useTask";
import { CheckList as CheckListType } from "typings/task";

type Props = {
  task: any,
  data: Array<CheckListType>;
  totalRecord?: number;
  onSeeMore: () => void;
};

enum CheckListTab {
  ALL = "ALL",
  PROGRESS = "PROGRRESS",
  DONE = "DONE",
  OUT_DATE = "OUT_DATE",
  NEXT_WEEK = "NEXT_WEEK",
  MORE_SEVEN_DAYS = "MORE_SEVEN_DAYS",
}

export const CheckList: FC<Props> = ({ task, data, totalRecord, onSeeMore }) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const [currentTab, setCurrentTab] = useState(CheckListTab.ALL);
  const { addChecklist, refetchListCheckList } = useCheckList(task._id);
  const { data: listFriend } = useQueryListFriend();

  const handleSelectAll = () => setSelectAll(!selectAll);

  const getClassTab = (tab: CheckListTab) => {
    return currentTab === tab
      ? "border-b-2 border-primary font-bold"
      : "text-primary-gray";
  };

  const initialValues = {
    name: "",
    assigneeID: "",
    parentID: task._id,
    groupID: task.group._id,
    projectID: task.project._id,
    expiredTime: null,
    type: 2
  };

  const checkListSchema = object().shape({
    name: string().required("Bạn cần nhập nội dung công việc"),
    expiredTime: date()
      .required("Bạn cần nhập thời hạn")
      .typeError("Bạn cần nhập thời hạn"),
    assigneeID: string().required("Bạn cần chọn người thực hiện"),
  });

  const handleAddChecklist = async (values: any) => {
    await addChecklist(values);
    refetchListCheckList();
    setVisibleForm(false);
  }

  return (
    <div>
      {/* Check messageList header */}
      <div
        className={`${
          selectAll ? "mb-1" : "mb-5"
        } flex px-5 items-center justify-between`}
      >
        <div className={`${selectAll ? "" : "w-1/6"} `}>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          {!selectAll && <span className="ml-2 text-x-large">Việc con</span>}
        </div>

        {selectAll ? (
          <div className="flex justify-between w-full ml-5">
            <div className="flex items-center">
              <button className="mx-2">
                <img
                  className="w-6"
                  src={SendEmailIcon}
                  alt="Send email icon"
                />
              </button>
              <button className="mx-2">
                <img className="w-6" src={IconPencil} alt="Pencil icon" />
              </button>
              <button className="mx-2">
                <img className="w-6" src={LinkIcon} alt="Link icon" />
              </button>
            </div>
            <button className="text-[13px] w-10 h-10 flex justify-center items-center rounded-full bg-lighter-gray">
              <DotsVerticalIcon />
            </button>
          </div>
        ) : (
          <div className="flex justify-between w-5/6">
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

      <div className="rounded-sm border border-slate-400">
        {/* Check messageList items */}
        <div className="shadow-lg">
          <div className="w-full">
            {(data || []).map((checkList) => (
              <CheckListItem key={checkList._id} data={checkList} />
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
          ) : (
            <></>
          )}
          <div className="w-full h-px bg-gray-200 " />

          {visibleForm && (
            <div className="shadow-lg p-5">
              <Formik
                initialValues={initialValues}
                validationSchema={checkListSchema}
                onSubmit={(values) => handleAddChecklist(values)}
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
                            data={listFriend.map((item) => ({
                              label: `${item.fullname}-${item.company?.sign}`,
                              value: item._id,
                            }))}
                            formatItem={{
                              id: "value",
                              text: "label",
                            }}
                            inlineSearch={true}
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

          <div className="shadow-lg mt-5 pb-5 px-5">
            <button onClick={() => setVisibleForm(true)}>
              <div className="flex items-center text-green-success font-bold">
                <img src={IconPlus} alt="icon" className="w-4 h-4" />
                <span className="ml-1">Tạo mới</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
