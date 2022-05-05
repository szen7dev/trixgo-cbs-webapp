import { FC, UIEvent, useState } from "react";

/**
 * Libraries
 */
import { Formik, Form, ErrorMessage } from "formik";
import { useHistory } from 'react-router-dom';
import DayPickerInput from "react-day-picker/DayPickerInput";
import moment from "moment";
import debounce from "lodash/debounce";
import { PCM_PROPOSAL_TASK } from "apis/localdb";
import { object, string } from "yup";
import { toast } from "react-toastify";

/**
 * Hooks, Typings
 */
import { useQueryListDoctype } from "services/hooks/useHuman";
import { useDoctype } from "services/hooks/items/useDoctype";
import { useQueryListGroup } from "services/hooks/usePlanGroup";
import { useTask } from 'services/hooks/useTask';
import { useQueryListDepartmentsIsMember } from 'services/hooks/items/useDepartment';
import { useUserSystem } from "services/hooks/users/useUserSystem";
import { useContract } from "services/hooks/items/useContract";
import { useModal } from "services/hooks/useModal";

/**
 * Components, Assets
 */
import { DropdownSearchable } from "shareComponents/common";
// import AttachIcon from "assets/images/icons8-attach-50.png";
import Close from "assets/icons/Close";
import TagIcon from "assets/images/icons8-price-tag-96.svg";
import fakeThumbnail from "assets/images/avatar.jpg";

import "react-day-picker/lib/style.css";

interface InitialValues {
  projectID: string,
  subType: string,
  fieldID: string,
  assigneeID: string,
  name: string,
  startTime: string,
  expiredTime: string,
  description: string,
  authorAttachs: string[],
  type: number,
  relatedIDs: string[],
  groupID: string,
}

export const ModalAddNewTask: FC = () => {
  const history = useHistory();
  const { closeModal } = useModal();

  const [searchDepartmentValue, setSearchDepartmentValue] = useState("");
  const [searchOtherField, setSearchOtherField]           = useState("");
  const [searchFriendName, setSearchFriendName]           = useState("");
  const [searchGroupName, setSearchGroupName]             = useState("");
  const [searchContract, setSearchContract]               = useState("");
  const [companyID, setCompanyID]                         = useState("");
  const [projectID, setProjectID]                         = useState("");

  const { addTaskAsync } = useTask({});

  const {
    data: listDepartments,
    fetchNextPage: fetchNextPageListDepartment,
    hasNextPage: hasNextPageListDepartment
  } = useQueryListDepartmentsIsMember({
    limit: 50,
    keyword: searchDepartmentValue,
    isFetch: true
  })

  const {
    list: listDoctypes
  } = useDoctype({
    params: {
      type: 2,
      companyID,
      keyword: searchOtherField
    },
    isFetchList: !!companyID
  })

  const {
    data: listGroup,
    hasNextPage: hasNextPageListGroup,
    fetchNextPage: fetchNextPageListGroup
  } = useQueryListGroup({
    keyword: searchGroupName,
    projectID: projectID,
    isShowParentAndChild: true
  }, !!projectID);

  const {
    listContracts,
    hasNextPage: hasNextPageListContract,
    fetchNextPage: fetchNextPageListContract,
  } = useContract({
    params: {
      contractID: "",
      keyword: searchContract,
      projectID,
    },
    isFetch: !!projectID
  });

  const { data: listUsersProject } = useUserSystem({
    projectID,
    keyword: searchFriendName
  }, true);

  const onSubmitFilterData = async (values: any) => {
    console.log({ values });

    // try {
    //   const { error, message, data } = await addTaskAsync(values);

    //   if(error) return toast.warning(message);

    //   history.push(`/pcm/detail/${data._id}`);
    // } catch (error) {
    //   if (typeof error === "string") {
    //       toast.error(error);
    //   } else if (error instanceof Error) {
    //       toast.error(error.message);
    //   }
    // }
    closeModal();
  };

  const handleScroll = (e: UIEvent<HTMLDivElement>, type: 'project' | 'group' | 'contract') => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if(!bottom) return;

    switch (true) {
      case (type === 'project' && hasNextPageListDepartment):
        fetchNextPageListDepartment();
        break;
      case (type === 'group' && hasNextPageListGroup):
        fetchNextPageListGroup();
        break;
      case (type === 'contract' && hasNextPageListContract):
        fetchNextPageListContract();
        break;
      default:
        break;
    }
  }

  const addTaskSchema = object().shape({
    projectID: string().required("Vui lòng nhập tên dự án!"),
    assigneeID: string().required("Vui lòng nhập tên người nhận!"),
    name: string().required("Vui lòng nhập tiêu đề!"),
  });

  const initialValues: InitialValues = {
    projectID: "",
    groupID: "",
    fieldID: "",
    assigneeID: "",
    name: "",
    startTime: moment().format('MM/DD/YYYY'),
    expiredTime: "",
    description: "",
    authorAttachs: [],
    type: 1,
    relatedIDs: [],
    subType: "",
  };

  return (
    <>
      <div className={"flex flex-col"}>
        <div className={"flex w-full py-3 px-6 border-b"}>
            <h4 className={"flex-1 text-lg font-bold text-left"}>Công việc mới</h4>
            <div className={"flex items-center justify-center cursor-pointer"}>
              <Close onClick={closeModal}/>
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
                    <div className={"w-1/3 flex items-start"}>
                      <div className={"text-left text-gray-500 flex items-center mr-2 mt-1"}>Dự án (*)</div>
                      <div className={"w-full flex-1"}>
                        <DropdownSearchable
                          onchangeValue={(value: any) => {
                            setCompanyID(value.companyId)
                            setFieldValue("projectID", value?.id);
                            setProjectID(`${value?.id}`);
                            setSearchDepartmentValue("");
                            setFieldValue("groupID", "");
                            setFieldValue("assigneeID", "");
                            setFieldValue("relatedIDs", "");
                          }}
                          onClearData={() => {
                            setCompanyID("");
                            setFieldValue("projectID", "");
                            setFieldValue("groupID", "");
                            setFieldValue("assigneeID", "");
                            setFieldValue("relatedIDs", "");
                          }}
                          onSearchInputChange={
                            debounce(
                              (value) => setSearchDepartmentValue(value),
                            500)
                          }
                          onScroll={(e) => handleScroll(e, 'project')}
                          className={"w-full flex-1"}
                          placeholder="Dự án"
                          isMultiple={false}
                          allowClearValueSingleInput={true}
                          showTriangle={false}
                          maxWidthInput="max-w-none"
                          renderSelectedItem={(item: any) => (
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
                            companyId: department.company?._id,
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
                    <div className={"w-1/3 flex items-start pl-3"}>
                      <div className={"text-left text-gray-500 flex items-center mr-2 mt-1"}>Nhóm (*)</div>
                      <DropdownSearchable
                        disabled={values.projectID.length <= 0}
                        onchangeValue={(item: any) => {
                          setFieldValue("groupID", item.value);
                          setSearchGroupName("");
                        }}
                        onClearData={() => setFieldValue("groupID", "")}
                        onSearchInputChange={debounce(
                          (value) => setSearchGroupName(value),
                          500
                        )}
                        onScroll={(e) => handleScroll(e, 'group')}
                        className={"w-full flex-1"}
                        placeholder="Nhóm"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item: any) => (
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
                          label: `${groupItem.sign}.${groupItem.name}`,
                          value: groupItem._id,
                        }))}
                        formatItem={{
                          id: "value",
                          text: "label",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <div className={"w-1/3 flex items-start pl-3"}>
                      <div className={"text-left text-gray-500 flex items-center mr-2 mt-1"}>Hợp đồng</div>
                      <DropdownSearchable
                        onchangeValue={(item: any) => {
                          setFieldValue("contractID", item.value);
                          setSearchContract("");
                        }}
                        onClearData={() => setFieldValue("contractID", "")}
                        onSearchInputChange={debounce(
                          (value) => setSearchContract(value),
                          500
                        )}
                        onScroll={(e) => handleScroll(e, 'contract')}
                        className={"w-full flex-1"}
                        placeholder="Hợp đồng"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item: any) => (
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
                        data={listContracts.map((contract) => ({
                          label: `${contract.sign}.${contract.name}`,
                          value: contract._id,
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
                    <div className={"w-1/3 flex items-start"}>
                      <div className={"text-left text-gray-500 flex items-center mr-2 mt-1"}>Gửi tới (*)</div>
                      <div className={"w-full flex-1"}>
                        <DropdownSearchable
                          onchangeValue={(value: any) => {
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
                          renderSelectedItem={(item: any) => (
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
                          data={listUsersProject.map((item) => ({
                            label: item.bizfullname,
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
                    <div className={"w-1/3 flex items-start pl-3"}>
                      <div className={"text-left text-gray-500 flex items-center mr-2 mt-1"}>Phân loại (*)</div>
                      <DropdownSearchable
                        onchangeValue={(value: any) =>
                          setFieldValue("subType", value.id)
                        }
                        onClearData={() => setFieldValue("subType", "")}
                        placeholder={"Phân loại"}
                        className={"w-full flex-1"}
                        focusedClass={"border-b border-primary"}
                        maxWidthInput={"max-w-none"}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        renderSelectedItem={(item: any) => (
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
                    <div className={"w-1/3 flex items-start pl-3"}>
                      <div className={"text-left text-gray-500 flex items-center mr-2 mt-1"}>Tính chất</div>
                      <DropdownSearchable
                        onchangeValue={(item: any) => {
                          setFieldValue("fieldID", item.value);
                          setSearchOtherField("");
                        }}
                        onClearData={() => setFieldValue("fieldID", "")}
                        onSearchInputChange={debounce(
                          (value) => setSearchOtherField(value),
                          500
                        )}
                        className={"w-full flex-1"}
                        placeholder="Phân loại khác"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item: any) => (
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
                      <div className={"text-left text-gray-500 flex items-center mr-2 mt-1"}>Liên quan</div>
                      <DropdownSearchable
                        onchangeValue={(value: any) => {
                          // console.log({ value });
                          setFieldValue("relatedIDs", [...values.relatedIDs, value.id]);
                          setSearchFriendName("");
                          // const checkExists = values.relatedIDs?.find?.(item => item === value.id);

                          // if(!checkExists) {
                          //   setFieldValue("relatedIDs", [...values.relatedIDs, value.id]);
                          //   setSearchFriendName("");
                          // }
                        }}
                        onMultipleRemoveValue={(id: any) => {
                          // console.log({ id });
                          // const newList = values.relatedIDs?.filter?.(item => item !== id);
                          // setFieldValue('relatedIDs', newList);
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
                        renderSelectedItem={(item: any) => (
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
                        data={listUsersProject.map((item) => ({
                          label: item.bizfullname,
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
                      <div className={"text-left text-gray-500 flex items-center mr-2 mt-1"}>Tiêu đề (*)</div>
                      <div className={"w-full flex-1"}>
                        <input
                          placeholder="Tiêu đề"
                          type="text"
                          className="border-0 flex-grow outline-none px-3 mt-0.5 w-3/4"
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
                      <div className={"text-left text-gray-500 flex items-center mr-2 mt-1"}>Thời hạn (*)</div>
                      <DayPickerInput
                        value={values.expiredTime && moment(values.expiredTime).format("MM/DD/YYYY")}
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
                    <div className="t-messageHome-training-progress-bar w-1/3 mr-2">
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
                  {/* <div className={"flex items-center ml-4"}>
                    <input type="checkbox" id="email-notice" className={"form-check-input mt-0"}/>
                    <label htmlFor="email-notice" className={"text-left ml-2 whitespace-nowrap"}>Thông báo email</label>
                  </div> */}
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