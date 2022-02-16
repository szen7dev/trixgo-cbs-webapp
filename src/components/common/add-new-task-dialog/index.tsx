import { FC, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import DayPickerInput from "react-day-picker/DayPickerInput";
import moment from "moment";
import debounce from "lodash/debounce";
import { PCM_PROPOSAL_TASK } from "apis/localdb/index";
import { object, string } from "yup";

import { useQueryListDepartments, useQueryListDoctype } from "services/hooks/useHuman";
import { useQueryListFriend } from "services/hooks/users/useFriend";
import { useQueryListGroup } from "services/hooks/usePlanGroup";
import { useAddTask } from 'services/hooks/useAddTask';

import DropdownSearchable from "components/common/DropdownSearch";
import { useModal } from "services/hooks/useModal";

import Close from "assets/icons/Close";
import AttachIcon from "assets/images/icons8-attach-50.png";
import TagIcon from "assets/images/icons8-price-tag-96.svg";
import fakeThumbnail from "assets/images/avatar.jpg";

interface InitialValues {
  projectID: string,
  isproposal: string,
  fieldID: string,
  assigneeID: string,
  name: string,
  startTime: string,
  expiredTime: string,
  description: string,
  authorID: string,
  authorAttachs: string[],
  type: number,
  relatedIDs: string[],
  groupID: string,
}

const AddNewTaskDialog: FC = () => {
  const { closeModal } = useModal();

  const addTaskSchema = object().shape({
    projectID: string().required("Vui lòng nhập tên dự án!"),
    assigneeID: string().required("Vui lòng nhập tên người nhận!"),
    name: string().required("Vui lòng nhập tiêu đề!"),
    description: string().required("Vui lòng nhập nội dung!"),
  });

  const { updateAddTask } = useAddTask();
  const onSubmitFilterData = async (values: any) => {
    await updateAddTask(values);
    closeModal();
  };

  const [searchDepartmentValue, setSearchDepartmentValue] = useState("");
  const [otherFieldValue, setOtherFieldValue] = useState("");
  const [searchFriendName, setSearchFriendName] = useState("");
  const [searchGroupName, setSearchGroupName] = useState("");
  const [projectID, setProjectID] = useState("");

  const { listDepartments } = useQueryListDepartments({
    limit: 50,
    keyword: searchDepartmentValue,
  });
  const { listDoctypes } = useQueryListDoctype({ 
    limit: 50,
    type: 2,
    keyword: otherFieldValue,
  });
  const { data: listFriend } = useQueryListFriend({
    keyword: searchFriendName,
  });
  const { data: listGroup } = useQueryListGroup({
    keyword: searchGroupName,
    projectID: projectID,
  });

  const initialValues: InitialValues = {
    projectID: "",
    isproposal: "",
    fieldID: "",
    assigneeID: "",
    name: "",
    startTime: "11-27-2021",
    expiredTime: "",
    description: "",
    authorID: "",
    authorAttachs: [],
    type: 1,
    relatedIDs: [],
    groupID: "",
  };

  return (
    <>
      <div className={"flex flex-col"}>
        <div className={"flex w-full py-3 px-6 border-b"}>
            <h4 className={"flex-1 text-lg font-bold text-left"}>Công việc mới</h4>
            <div className={"flex items-center justify-center cursor-pointer"}>
              <Close onClick={() => closeModal()}/>
            </div>
        </div>
        {/* input select */}
        <Formik
          validationSchema={addTaskSchema}
          initialValues={initialValues}
          onSubmit={onSubmitFilterData}
        >
          {(formik) => {
            const { setFieldValue, values } = formik;

            return (
              <Form>
                <div className={"t-add-new-task-dialog-select px-6"}>
                  <div className={"flex pb-1 pt-2 border-b"}>
                    <div className={"w-1/4 flex items-start"}>
                      <div className={"text-left text-gray-500 flex items-center mr-2 mt-1"}>Dự án</div>
                      <div className={"w-full flex-1"}>
                        <DropdownSearchable
                          onchangeValue={(value) => {
                            setFieldValue("projectID", value?.id);
                            setProjectID(`${value?.id}`);
                            setSearchDepartmentValue("");
                            setFieldValue("groupID", "");
                          }}
                          onClearData={() => {
                            setFieldValue("projectID", "");
                            setFieldValue("groupID", "");
                          }}
                          onSearchInputChange={debounce(
                            (value) => setSearchDepartmentValue(value),
                            500
                          )}
                          className={"w-full flex-1"}
                          placeholder="Dự án"
                          isMultiple={false}
                          allowClearValueSingleInput={true}
                          showTriangle={false}
                          maxWidthInput="max-w-none"
                          renderSelectedItem={(item) => (
                            <div
                              style={{ width: 100 }}
                              className="flex items-center"
                            >
                              <img alt="Tag" src={TagIcon} className="mr-1" />
                              <p
                                style={{
                                  textOverflow: "ellipsis",
                                  maxWidth: "100%",
                                  minWidth: 0,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  flex: "1 1 auto",
                                }}
                              >
                                {item.text}
                              </p>
                            </div>
                          )}
                          data={listDepartments.map((department) => ({
                            label: `${department.sign}.${department.name}`,
                            value: department._id,
                          }))}
                          formatItem={{
                            id: "value",
                            text: "label",
                          }}
                          inlineSearch={true}
                        />
                        <ErrorMessage
                          name="projectID"
                          component="div"
                          className="font-normal text-xs text-negative pl-3"
                        />
                      </div>
                    </div>
                    <div className={"w-1/4 flex items-start"}>
                      <div className={"text-left text-gray-500 flex items-center mr-2 mt-1"}>Nhóm</div>
                      <DropdownSearchable
                        disabled={values.projectID.length <= 0}
                        onchangeValue={(item) => {
                          setFieldValue("groupID", item.value);
                          setSearchGroupName("");
                        }}
                        onClearData={() => setFieldValue("groupID", "")}
                        onSearchInputChange={debounce(
                          (value) => setSearchGroupName(value),
                          500
                        )}
                        className={"w-full flex-1"}
                        placeholder="Nhóm"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => (
                          <div
                            style={{ width: 100 }}
                            className="flex items-center"
                          >
                            <img alt="Tag" src={TagIcon} className="mr-1" />
                            <p
                              style={{
                                textOverflow: "ellipsis",
                                maxWidth: "100%",
                                minWidth: 0,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                flex: "1 1 auto",
                              }}
                            >
                              {item.text}
                            </p>
                          </div>
                        )}
                        data={listGroup.map((groupItem) => ({
                          label: groupItem.name,
                          value: groupItem._id,
                        }))}
                        formatItem={{
                          id: "value",
                          text: "label",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <div className={"w-1/4 flex items-start pl-3"}>
                      <div className={"text-left text-gray-500 flex items-center mr-2 mt-1"}>Phân loại</div>
                      <DropdownSearchable
                        onchangeValue={(value) =>
                          setFieldValue("isproposal", value.id)
                        }
                        onClearData={() => setFieldValue("isproposal", "")}
                        placeholder={"Phân loại"}
                        className={"w-full flex-1"}
                        focusedClass={"border-b border-primary"}
                        maxWidthInput={"max-w-none"}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        renderSelectedItem={item => (
                          <div className={"flex items-center"}>
                            <img alt={"tag icon"} src={TagIcon}/>
                            <span>{item.text}</span>
                          </div>
                        )}
                        data={PCM_PROPOSAL_TASK}
                        formatItem={{
                            id: "value",
                            text: "text",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <div className={"w-1/4 flex items-start"}>
                      <div className={"text-left text-gray-500 flex items-center mr-2 mt-1"}>Tính chất</div>
                      <DropdownSearchable
                        onchangeValue={(item) => {
                          setFieldValue("fieldID", item.value);
                          setOtherFieldValue("");
                        }}
                        onClearData={() => setFieldValue("fieldID", "")}
                        onSearchInputChange={debounce(
                          (value) => setOtherFieldValue(value),
                          500
                        )}
                        className={"w-full flex-1"}
                        placeholder="Phân loại khác"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => (
                          <div
                            style={{ width: 100 }}
                            className="flex items-center"
                          >
                            <img alt="Tag" src={TagIcon} className="mr-1" />
                            <p
                              style={{
                                textOverflow: "ellipsis",
                                maxWidth: "100%",
                                minWidth: 0,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                flex: "1 1 auto",
                              }}
                            >
                              {item.text}
                            </p>
                          </div>
                        )}
                        data={listDoctypes.map((doctypes) => ({
                          label: doctypes.name,
                          value: doctypes._id,
                        }))}
                        formatItem={{
                          id: "value",
                          text: "label",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                  </div>
                  <div className={"flex pb-1 pt-2 border-b"}>
                    <div className={"w-full flex items-start"}>
                      <div className={"text-left text-gray-500 flex items-center mr-2 mt-1"}>Gửi tới</div>
                      <div className={"w-full flex-1"}>
                        <DropdownSearchable
                          onchangeValue={(value) => {
                              setFieldValue("assigneeID", value?.id);
                              setSearchFriendName("");
                            }
                          }
                          onClearData={() => setFieldValue("assigneeID", "")}
                          onSearchInputChange={debounce(
                            (value) => setSearchFriendName(value),
                            500
                          )}
                          className={"w-full flex-1"}
                          placeholder="Gửi tới"
                          isMultiple={false}
                          allowClearValueSingleInput={true}
                          showTriangle={false}
                          maxWidthInput="max-w-none"
                          renderSelectedItem={(item) => (
                            <div
                              style={{ width: 100 }}
                              className="flex items-center"
                            >
                              <img alt="Thumbnail" src={item.imageUrl || fakeThumbnail} className="mr-1 w-6 h-6 rounded-full" />
                              <p
                                style={{
                                  textOverflow: "ellipsis",
                                  maxWidth: "100%",
                                  minWidth: 0,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  flex: "1 1 auto",
                                }}
                              >
                                {item.text}
                              </p>
                            </div>
                          )}
                          data={listFriend.map((item) => ({
                            label: `${item.fullname}-${item.company?.sign}`,
                            value: item._id,
                            imgUrl: item.imgUrl,
                          }))}
                          formatItem={{
                            id: "value",
                            text: "label",
                          }}
                          inlineSearch={true}
                        />
                        <ErrorMessage
                          name="assigneeID"
                          component="div"
                          className="font-normal text-xs text-negative pl-3"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={"flex pb-1 pt-2 border-b"}>
                    <div className={"w-full flex items-start"}>
                      <div className={"text-left text-gray-500 flex items-center mr-2 mt-1"}>Liên quan</div>
                      <DropdownSearchable
                        onchangeValue={(value) => {
                            setFieldValue("relatedIDs", [...values.relatedIDs, value.id]);
                            setSearchFriendName("");
                          }
                        }
                        onMultipleRemoveValue={(id) => {
                          const index = values.relatedIDs.indexOf(`${id}`);
                          if (index > -1) {
                            setFieldValue("relatedIDs", values.relatedIDs.splice(index, 1));
                          }
                        }}
                        onClearData={() => setFieldValue("relatedIDs", [])}
                        onSearchInputChange={debounce(
                          (value) => setSearchFriendName(value),
                          500
                        )}
                        className={"w-full flex-1"}
                        placeholder="Liên quan"
                        isMultiple={true}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => (
                          <div
                            style={{ width: 100 }}
                            className="flex items-center"
                          >
                            <img alt="Thumbnail" src={item.imageUrl || fakeThumbnail} className="mr-1 w-6 h-6 rounded-full" />
                            <p
                              style={{
                                textOverflow: "ellipsis",
                                maxWidth: "100%",
                                minWidth: 0,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                flex: "1 1 auto",
                              }}
                            >
                              {item.text}
                            </p>
                          </div>
                        )}
                        data={listFriend.map((item) => ({
                          label: `${item.fullname}-${item.company?.sign}`,
                          value: item._id,
                          imgUrl: item.imgUrl,
                        }))}
                        formatItem={{
                          id: "value",
                          text: "label",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                  </div>
                  <div className={"flex pb-1 pt-2 border-b"}>
                    <div className={"w-3/4 flex items-start"}>
                      <div className={"text-left text-gray-500 flex items-center mr-2 mt-1"}>Tiêu đề</div>
                      <div className={"w-full flex-1"}>
                        <input
                          placeholder="Tiêu đề"
                          type="text"
                          className="border-0 flex-grow outline-none px-3 mt-0.5"
                          onChange={(event) => setFieldValue("name", event.target.value)}
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="font-normal text-xs text-negative pl-3"
                        />
                      </div>
                    </div>
                    <div className={"w-1/4 flex items-start"}>
                      <div className={"text-left text-gray-500 flex items-center mr-2 mt-1"}>Thời hạn</div>
                      <DayPickerInput
                        value={values.expiredTime && moment(values.expiredTime).format("DD/MM/YYYY")}
                        onDayChange={(day) => setFieldValue("expiredTime", moment(day).format("MM/DD/YYYY"))}
                        inputProps={{
                          className: "w-full h-6 outline-none pl-3",
                          placeholder: "Thời hạn",
                          readOnly: true,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className={"px-6 my-3"}>
                  <textarea
                    onChange={(event) => setFieldValue("description", event.target.value)}
                    className="t-add-new-task-dialog-content outline-none resize-none border-0 w-full"
                    placeholder="Nhập nội dung..."
                  ></textarea>
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="font-normal text-xs text-negative"
                  />
                </div>

                {/* <div className="t-add-new-task-dialog-attachment px-6 mb-3">
                  <div className="t-add-new-task-dialog-attachment-item px-3 py-2 mb-3 flex items-center">
                    <p className="t-add-new-task-dialog-attachment-title truncate mr-2" title="BaoCaoDanhGiaTacDongNgoaiCanhLenThietKeMau.png">BaoCaoDanhGiaTacDongNgoaiCanhLenThietKeMau.png</p>
                    <span className="mr-2">(3.908K)</span>
                    <div className="t-home-training-progress-bar w-1/3 mr-2">
                      <div style={{ width: "10%" }}></div>
                    </div>
                    <button className="ml-auto"><Close /></button>
                  </div>
                  <div className="t-add-new-task-dialog-attachment-item px-3 py-2 mb-3 flex items-center">
                    <p className="t-add-new-task-dialog-attachment-title truncate mr-2" title="BaoCaoDanhGiaTacDongNgoaiCanhLenThietKeMau.png">BaoCaoDanhGiaTacDongNgoaiCanhLenThietKeMau.png</p>
                    <span className="mr-2">(3.908K)</span>
                    <button className="ml-auto"><Close /></button>
                  </div>
                  <div className="t-add-new-task-dialog-attachment-item px-3 py-2 mb-3 flex items-center">
                    <p className="t-add-new-task-dialog-attachment-title truncate mr-2" title="BaoCaoDanhGiaTacDongNgoaiCanhLenThietKeMau.png">BaoCaoDanhGiaTacDongNgoaiCanhLenThietKeMau.png</p>
                    <span className="mr-2">(3.908K)</span>
                    <button className="ml-auto"><Close /></button>
                  </div>
                </div> */}

                <div className={"flex items-center border-t py-3 px-6"}>
                  {/* <label>
                    <img
                      src={AttachIcon}
                      alt="Icon attach"
                      className="h-6 w-6 transform -rotate-45"
                    />
                    <input
                      type="file"
                      name="files"
                      id="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                    />
                  </label> */}
                  <div className={"flex items-center ml-4"}>
                    <input type="checkbox" id="email-notice" className={"form-check-input mt-0"}/>
                    <label htmlFor="email-notice" className={"text-left ml-2 whitespace-nowrap"}>Thông báo email</label>
                  </div>
                  <button type="submit" className="btn btn-primary ml-auto">Xác nhận</button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      
    </>
  );
};

export default AddNewTaskDialog;
