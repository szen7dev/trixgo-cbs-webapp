/**
 * Libraries
 */
import React, { ChangeEvent, FC, UIEvent, useEffect, useRef, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { useHistory } from 'react-router-dom';
import { object, string } from "yup";
import { toArray } from 'lodash';
import { toast } from "react-toastify";
import DayPickerInput from "react-day-picker/DayPickerInput";
import moment from "moment";
import debounce from "lodash/debounce";
import Axios from "axios";

/**
 * Hooks, Typings
 */
import { useDoctype } from "services/hooks/items/useDoctype";
import { useQueryListGroup } from "services/hooks/usePlanGroup";
import { useTask } from 'services/hooks/useTask';
import { useQueryListDepartmentsIsMember } from 'services/hooks/items/useDepartment';
import { useUserSystem } from "services/hooks/users/useUserSystem";
import { useContract } from "services/hooks/items/useContract";
import { useModal } from "services/hooks/useModal";
import { useUpload } from "services/hooks/useUpload";
import { validateFiles } from 'validation/file';
import { PCM_PROPOSAL_TASK } from "apis/localdb";
import { APP_ID } from "apis/localdb";
import { humanFileSize } from 'utils/converter';
import useUploadFile, { modifyUploadedFilesV2 } from 'services/hooks/useUploadFile';

/**
 * Components, Assets
 */
import { DropdownSearchable } from "shareComponents/common";
import Close from "assets/icons/Close";
import fakeThumbnail from "assets/images/avatar.jpg";
// import TagIcon from "assets/images/icons8-price-tag-96.svg";
// import AttachIcon from "assets/images/icons8-attach-50.png";

import "react-day-picker/lib/style.css";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as EditorType } from "tinymce";
import iconAttach from "assets/images/icons8-attach-48.svg";
import { FileProp, FilePropsUpload } from "typings/common";

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
  expiredHour: string
}

export const ModalAddNewTask: FC = () => {
  const history = useHistory();
  const { closeModal } = useModal();
  const editorRef = useRef<EditorType>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  type DropdownSearchableHandle = React.ElementRef<typeof DropdownSearchable>;
  const groupDropdownsearchRef = useRef<DropdownSearchableHandle>(null);

  const [tokens, setTokens] = useState<any[]>([]);
  const [searchDepartmentValue, setSearchDepartmentValue] = useState("");
  const [searchFriendName, setSearchFriendName] = useState("");
  const [searchGroupName, setSearchGroupName] = useState("");
  const [searchContract, setSearchContract] = useState("");
  const [companyID, setCompanyID] = useState("");
  const [projectID, setProjectID] = useState("");
  const [groupID, setGroupID] = useState("");
  const [isNotiEmail, setIsNotiEmail] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const { addTaskAsync } = useTask({});

  const { addFileToUpload } = useUpload({
    appID: APP_ID.PCM.id,
    companyID,
    projectID,
    groupID
  });

  const [uploads, {
    setUploadImageProgress,
    setUploadFileProgress,
    setIDImageUploaded,
    setIDFileUploaded,
    setUploadImage,
    setUploadFile,
    removeUploadedImage,
    removeUploadedFile,
    // removeAllFiles
  }] = useUploadFile({});

  const {
    data: listDepartments,
    isFetching: isFetchingListDepartment,
    fetchNextPage: fetchNextPageListDepartment,
    hasNextPage: hasNextPageListDepartment
  } = useQueryListDepartmentsIsMember({
    limit: 10,
    keyword: searchDepartmentValue,
    isFetch: true
  })

  const {
    // list: listDoctypes,
    hasNextPage: hasNextPageDoctypes,
    fetchNextPage: fetchNextPageDoctypes,
    isFetching: isFetchingPageDoctypes
  } = useDoctype({
    params: {
      type: 2,
      companyID,
      // keyword: searchOtherField
    },
    isFetchList: false // !!companyID
  })

  const {
    data: listGroup,
    hasNextPage: hasNextPageListGroup,
    isFetching: isFetchingListGroup,
    fetchNextPage: fetchNextPageListGroup,
  } = useQueryListGroup({
    limit: 10,
    keyword: searchGroupName,
    projectID: projectID,
    isShowParentAndChild: true
  }, !!projectID);

  const [isChangeProjectID, setIsChangeProjectID] = useState(false);

  useEffect(() => {
    if (isChangeProjectID) {
      if (listGroup && listGroup.length) {
        groupDropdownsearchRef?.current?.setValueRef({
          label: `${listGroup[0].sign}.${listGroup[0].name}`,
          value: listGroup[0]._id,
        });
        setGroupID(listGroup[0]._id);
        setIsChangeProjectID(false);
      } else {
        if (!projectID) {
          groupDropdownsearchRef?.current?.setValueRef(null);
          setGroupID("");
          setIsChangeProjectID(false);
        }
      }
    }
  }, [listGroup, isChangeProjectID]);

  const {
    listContracts,
    hasNextPage: hasNextPageListContract,
    fetchNextPage: fetchNextPageListContract,
    isFetching: isFetchingListContract
  } = useContract({
    params: {
      limit: 10,
      contractID: "",
      keyword: searchContract,
      projectID,
    },
    isFetch: !!projectID
  });

  const {
    data: listUsersProject,
    hasNextPage: hasNextPageUsersProject,
    fetchNextPage: fetchNextPageUsersProject,
    isFetching: isFetchingPageUsersProject
  } = useUserSystem({
    limit: 10,
    projectID,
    keyword: searchFriendName
  }, true);

  const onSubmitFilterData = async (values: any) => {
    try {
      let files: string[] = [];

      // Get list file uploaded
      for (const [, { _id }] of Object.entries(uploads.images)) {
        _id && (files = [...files, _id]);
      }

      for (const [, { _id }] of Object.entries(uploads.files)) {
        _id && (files = [...files, _id]);
      }

      if(files.length) {
        values.authorAttachs = files;
      }

      if(!values.groupID) {
        values.groupID = groupID;
      }

      closeModal();
      const { error, data } = await addTaskAsync({
        ...values,
        isNotiEmail
      });

      if (error) return toast.warning(data.message);

      history.push(`/pcm/detail/${data._id}`);
    } catch (error) {
      if (typeof error === "string") {
        toast.error(error);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
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

  const handleUploadAttach = async (filesSelected: FileList | null) => {
    if (!filesSelected || !filesSelected.length) return;

    if (!projectID || !groupID) {
      // Clear input file
      if(fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      return toast.warn('Bạn cần chọn dự án và nhóm trước khi thêm file đính kèm');
    }

    const validation = await validateFiles(filesSelected);
    if (validation.error) return toast.warn(validation.message);

    const [files, images] = modifyUploadedFilesV2({
      imgLastKey: Object.keys(uploads.images).length || null,
      fileLastKey: Object.keys(uploads.files).length || null,
    }, filesSelected);

    setUploadImage(images);
    setUploadFile(files);
    setIsUploading(true);

    // Clear input file
    if(fileInputRef.current) {
      fileInputRef.current.value = '';
    }

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
          setUploadFileProgress(key, percentCompleted)
        }
      })
      setIDFileUploaded(key, _id);
    }

    setIsUploading(false);
  }

  const handleRemoveUpload = (file: FileProp | FilePropsUpload, type: 'FILE' | 'IMAGE') => {
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

  const handleScroll = (e: UIEvent<HTMLDivElement>, type: 'project' | 'group' | 'contract' | 'user' | 'field') => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop >= clientHeight - 10;
    if (!bottom) return;

    switch (true) {
      case (type === 'project' && hasNextPageListDepartment && !isFetchingListDepartment):
        fetchNextPageListDepartment();
        break;
      case (type === 'group' && hasNextPageListGroup && !isFetchingListGroup):
        fetchNextPageListGroup();
        break;
      case (type === 'contract' && hasNextPageListContract && !isFetchingListContract):
        fetchNextPageListContract();
        break;
      case (type === 'user' && hasNextPageUsersProject && !isFetchingPageUsersProject):
        fetchNextPageUsersProject();
        break;
      case (type === 'field' && hasNextPageDoctypes && !isFetchingPageDoctypes):
        fetchNextPageDoctypes();
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
    groupID,
    fieldID: "",
    assigneeID: "",
    name: "",
    startTime: moment().format('MM/DD/YYYY'),
    expiredTime: moment().format('MM/DD/YYYY'),
    expiredHour: "00:00",
    description: "",
    authorAttachs: [],
    type: 1,
    relatedIDs: [],
    subType: '0',
  };

  return (
    <>
      <div className={"flex flex-col"}>
        <div className={"flex w-full py-3 px-6 border-b"}>
          <h4 className={"flex-1 text-lg font-bold text-left"}>Công việc mới</h4>
          <div className={"flex items-center justify-center cursor-pointer"}>
            <Close onClick={closeModal} />
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
                      <div className={"text-left text-gray-500 flex items-center mr-2 mt-1 w-1/5"}>Dự án (*)</div>
                      <div className={"flex-1 max-w-4/5 w-4/5"}>
                        <DropdownSearchable
                          onchangeValue={(value: any) => {
                            setCompanyID(value.companyId)
                            setFieldValue("projectID", value?.id);
                            setProjectID(`${value?.id}`);
                            setIsChangeProjectID(true);
                            setSearchDepartmentValue("");
                            setGroupID("");
                            setFieldValue("groupID", "");
                            setFieldValue("assigneeID", "");
                            setFieldValue("relatedIDs", []);
                          }}
                          onClearData={() => {
                            setCompanyID("");
                            setFieldValue("projectID", "");
                            setFieldValue("groupID", "");
                            setGroupID("");
                            setFieldValue("assigneeID", "");
                            setFieldValue("relatedIDs", []);
                            setProjectID("");
                            setIsChangeProjectID(true);
                          }}
                          onSearchInputChange={
                            debounce(
                              (value) => setSearchDepartmentValue(value),
                              500)
                          }
                          onScroll={(e) => handleScroll(e, 'project')}
                          className={"max-w-full flex-1"}
                          placeholder="Dự án"
                          isMultiple={false}
                          allowClearValueSingleInput={true}
                          showTriangle={false}
                          maxWidthInput="max-w-full"
                          renderSelectedItem={(item: any) => (
                            <div
                              className="max-w-full"
                            >
                              <p className={"truncate"}>{item.text}</p>
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
                    <div className={"w-1/4 flex items-start pl-3"}>
                      <div className={"text-left text-gray-500 flex items-center mr-2 mt-1 w-1/5"}>Nhóm (*)</div>
                      <div className={"flex-1 max-w-4/5 w-4/5"}>
                        <DropdownSearchable
                          ref={groupDropdownsearchRef}
                          disabled={values.projectID.length <= 0}
                          onchangeValue={(item: any) => {
                            setFieldValue("groupID", item.value);
                            setGroupID(item.value);
                            setSearchGroupName("");
                          }}
                          onClearData={() => {
                            setFieldValue("groupID", "")
                            setGroupID("");
                          }}
                          onSearchInputChange={debounce(
                            (value) => setSearchGroupName(value),
                            500
                          )}
                          onScroll={(e) => handleScroll(e, 'group')}
                          className={"max-w-full flex-1"}
                          placeholder="Nhóm"
                          isMultiple={false}
                          allowClearValueSingleInput={true}
                          showTriangle={false}
                          maxWidthInput="max-w-full"
                          renderSelectedItem={(item: any) => (
                            <div
                              className="max-w-full"
                            >
                              <p className={"truncate"}>{item.text}</p>
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
                    </div>
                    <div className={"w-1/4 flex items-start pl-3"}>
                      <div className={"text-left text-gray-500 flex items-center mr-2 mt-1 w-1/5"}>Tính chất (*)</div>
                      <div className={"flex-1 max-w-4/5 w-4/5"}>
                        <DropdownSearchable
                          onchangeValue={(value: any) =>
                            setFieldValue("subType", value.id)
                          }
                          onClearData={() => setFieldValue("subType", "")}
                          placeholder={"Phân loại"}
                          className={"max-w-full flex-1"}
                          focusedClass={"border-b border-primary"}
                          allowClearValueSingleInput={true}
                          showTriangle={false}
                          maxWidthInput="max-w-full"
                          renderSelectedItem={(item: any) => (
                            <div className="max-w-full">
                              <p className={"truncate"}>{item.text}</p>
                            </div>
                          )}
                          data={PCM_PROPOSAL_TASK}
                          formatItem={{
                            id: "value",
                            text: "text",
                          }}
                          initialValue={{
                            id: 0,
                            value: 0,
                            text: "Việc thông thường"
                          }}
                          inlineSearch={true}
                        />
                      </div>
                    </div>
                    <div className={"w-1/4 flex items-start pl-3"}>
                      <div className={"text-left text-gray-500 flex items-center mr-2 mt-1 w-1/5"}>Hợp đồng</div>
                      <div className={"flex-1 max-w-4/5 w-4/5"}>
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
                          className={"max-w-full flex-1"}
                          placeholder="Hợp đồng"
                          isMultiple={false}
                          allowClearValueSingleInput={true}
                          showTriangle={false}
                          maxWidthInput="max-w-full"
                          renderSelectedItem={(item: any) => (
                            <div
                              className="max-w-full"
                            >
                              <p className={"truncate"}>{item.text}</p>
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
                  </div>
                  <div className={"flex pb-1 pt-2 border-b"}>
                    <div className={"w-full flex items-start"}>
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
                          onScroll={(e) => handleScroll(e, 'user')}
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
                    {/*<div className={"w-full flex items-start pl-3"}>*/}
                    {/*  <div className={"text-left text-gray-500 flex items-center mr-2 mt-1"}>Tính chất</div>*/}
                    {/*  <DropdownSearchable*/}
                    {/*    onchangeValue={(item: any) => {*/}
                    {/*      setFieldValue("fieldID", item.value);*/}
                    {/*      setSearchOtherField("");*/}
                    {/*    }}*/}
                    {/*    onClearData={() => setFieldValue("fieldID", "")}*/}
                    {/*    onSearchInputChange={debounce(*/}
                    {/*      (value) => setSearchOtherField(value),*/}
                    {/*      500*/}
                    {/*    )}*/}
                    {/*    className={"w-full flex-1"}*/}
                    {/*    placeholder="Phân loại khác"*/}
                    {/*    isMultiple={false}*/}
                    {/*    allowClearValueSingleInput={true}*/}
                    {/*    showTriangle={false}*/}
                    {/*    maxWidthInput="max-w-none"*/}
                    {/*    renderSelectedItem={(item: any) => (*/}
                    {/*      <div*/}
                    {/*        style={{ width: 100 }}*/}
                    {/*        className="flex items-center"*/}
                    {/*      >*/}
                    {/*        <img alt="Tag" src={TagIcon} className="mr-1" />*/}
                    {/*        <p*/}
                    {/*          style={{*/}
                    {/*            textOverflow: "ellipsis",*/}
                    {/*            maxWidth: "100%",*/}
                    {/*            minWidth: 0,*/}
                    {/*            whiteSpace: "nowrap",*/}
                    {/*            overflow: "hidden",*/}
                    {/*            flex: "1 1 auto",*/}
                    {/*          }}*/}
                    {/*        >*/}
                    {/*          {item.text}*/}
                    {/*        </p>*/}
                    {/*      </div>*/}
                    {/*    )}*/}
                    {/*    onScroll={(e) => handleScroll(e, 'field')}*/}
                    {/*    data={listDoctypes.map((doctypes) => ({*/}
                    {/*      label: doctypes.name,*/}
                    {/*      value: doctypes._id,*/}
                    {/*    }))}*/}
                    {/*    formatItem={{*/}
                    {/*      id: "value",*/}
                    {/*      text: "label",*/}
                    {/*    }}*/}
                    {/*    inlineSearch={true}*/}
                    {/*  />*/}
                    {/*</div>*/}
                  </div>
                  <div className={"flex pb-1 pt-2 border-b"}>
                    <div className={"w-full flex items-start"}>
                      <div className={"text-left text-gray-500 flex items-center mr-2 mt-1"}>Liên quan</div>
                      <DropdownSearchable
                        onchangeValue={(value: any) => {
                          if (!values.relatedIDs.includes(value.id)) {
                            setFieldValue("relatedIDs", [...values.relatedIDs, value.id]);
                          }
                          setSearchFriendName("");
                        }}
                        onMultipleRemoveValue={(id: any) => {
                          const newList = values.relatedIDs.filter(item => item !== id);
                          setFieldValue('relatedIDs', newList);
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
                        onScroll={(e) => handleScroll(e, 'user')}
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
                        value={values.expiredTime ? moment(values.expiredTime).format("MM/DD/YYYY") : moment().format("MM/DD/YYYY")}
                        onDayChange={(day) => setFieldValue("expiredTime", moment(day).format("MM/DD/YYYY"))}
                        inputProps={{
                          className: "w-full h-6 outline-none pl-3",
                          placeholder: "Thời hạn",
                          readOnly: true,
                        }}
                      />
                      <input
                        type="time"
                        defaultValue="09:00"
                        onChange={(e) => setFieldValue("expiredHour", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className={"px-6 my-3"}>
                  <Editor
                    onEditorChange={(value) => setFieldValue("description", value)}
                    // onActivate={}
                    onInit={(evt, editor) => {
                      editorRef.current = editor;
                    }}
                    // disabled={user?.email !== 'contact@trixgo.com'}
                    apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                    // onSaveContent={handleSave}
                    init={{
                      height: "350px",
                      menu: {
                        file: { title: "File", items: "newdocument restoredraft | preview | print | basicitem " },
                        edit: { title: "Edit", items: "undo redo | cut copy paste | selectall | searchreplace" },
                        view: { title: "View", items: "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen" },
                        insert: {
                          title: "Insert",
                          items: `image link media template codesample inserttable |
                                                     charmap emoticons hr |
                                                     pagebreak nonbreaking anchor toc |
                                                     insertdatetime`,
                        },
                        format: {
                          title: "Format",
                          items:
                            "bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat",
                        },
                        tools: { title: "Tools", items: "spellchecker spellcheckerlanguage | code wordcount" },
                        table: { title: "Table", items: "inserttable | cell row column | tableprops deletetable" },
                        help: { title: "Help", items: "help" },
                      },
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace code",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      fullpage_default_title: "My default page title",

                      // images_upload_url: "/api/upload/image",
                      // file_picker_types: "image",
                      // images_upload_handler: imagesUploadHandler,
                      // menubar: user?.email === 'contact@trixgo.com',
                      // toolbar: user?.email === 'contact@trixgo.com' ?
                      //     "undo redo | formatselect | " +
                      //     "bold italic backcolor | alignleft aligncenter " +
                      //     "alignright alignjustify | bullist numlist outdent indent | " +
                      //     "removeformat | help | image" : false,
                      // content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      // content_css: "document",
                      // save_enablewhendirty: true,
                      setup(editor) {
                        editor.on("Paste input Undo Redo", () => {
                          editor.save();
                        });
                        editor.ui.registry.addMenuItem("basicitem", {
                          text: "Save",
                          onAction: function (e) {
                            editor.save({ immediate: true });
                          },
                          icon: "save",
                        });
                      },
                    }}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="font-normal text-xs text-negative"
                  />
                </div>

                <div className="px-6 mb-3">
                  {(!!Object.keys(uploads.files).length || !!Object.keys(uploads.images).length) &&
                  [...toArray(uploads.files), ...toArray(uploads.images)].map(file => {
                    if(!file || Object.keys(file).length === 1) return;

                    const { file: fileInfo, progress, id } = file;
                    const isProgress = progress < 100;

                    return (
                      <div key={`${id}-${fileInfo.name}-${fileInfo.size}`} className="bg-cbs-file-upload-bg max-w-[600px] px-2 py-1 mb-3 flex items-center">
                        <p className={`truncate mr-2 font-bold ${isProgress ? 'text-black' : 'text-primary'}`} title={fileInfo.name}>
                          {fileInfo.name}
                        </p>
                        <span className="mr-2 text-primary-gray font-bold">({humanFileSize(fileInfo.size)})</span>
                        <div className={`w-1/5 h-[12px] ${isProgress && 'mr-2 border border-primary bg-white relative'}`}>
                          {isProgress && (
                            <div style={{ width: `${progress}%` }} className={"bg-primary absolute top-0 left-0 h-full"}></div>
                          )}
                        </div>
                        <button className="ml-auto" onClick={handleRemoveUpload.bind(null, file, 'FILE')}>
                          <Close />
                        </button>
                      </div>
                    )
                  })}

                  {/* <div key={`${id}-${fileInfo.name}-${fileInfo.size}`} className="bg-cbs-file-upload-bg max-w-[600px] px-2 py-1 mb-3 flex items-center">
                    <p className="truncate mr-2 text-black font-bold" title={fileInfo.name}>{fileInfo.name}</p>
                    <span className="mr-2 text-primary-gray font-bold">({humanFileSize(fileInfo.size)})</span>
                    <div className="w-1/5 mr-2 border border-primary bg-white h-[12px] relative">
                      <div style={{ width: `${progress}%` }} className={"bg-primary absolute top-0 left-0 h-full"}></div>
                    </div>
                    <button className="ml-auto"><Close /></button>
                  </div> */}

                </div>
                <div className={"flex items-center border-t py-3 px-6"}>
                  <label>
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
                      ref={fileInputRef}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleUploadAttach(e.target.files)}
                    />
                  </label>
                  <div className={"flex items-center ml-4"}>
                    <input
                      type="checkbox"
                      id="email-notice"
                      className={"form-check-input mt-0"}
                      onChange={e => setIsNotiEmail(e.target.checked)}
                    />
                    <label htmlFor="email-notice" className={"text-left ml-2 whitespace-nowrap"}>Thông báo email</label>
                  </div>
                  <button type="submit" className="btn btn-primary ml-auto" disabled={isUploading}>Xác nhận</button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};