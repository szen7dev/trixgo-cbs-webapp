/**
 * Libraries
 */
import React, { ChangeEvent, FC, UIEvent, useRef, useState, useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { useHistory } from 'react-router-dom';
import { object, string } from "yup";
import { toArray } from 'lodash';
import { toast } from "react-toastify";
import DayPickerInput from "react-day-picker/DayPickerInput";
import moment from "moment";
import debounce from "lodash/debounce";
import Axios from "axios";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

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
import { useAuth } from "services/hooks/auth/useAuth";
import { useFileCore } from "services/hooks/useFileCore";
import useUploadFile, { modifyUploadedFilesV2 } from 'services/hooks/useUploadFile';

/**
 * Components, Assets
 */
import { DropdownSearchable } from "shareComponents/common";
import Close from "assets/icons/Close";
import fakeThumbnail from "assets/images/avatar.jpg";

import "react-day-picker/lib/style.css";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as EditorType } from "tinymce";
import iconAttach from "assets/images/icons8-attach-48.svg";
import { FileProp, FilePropsUpload } from "typings/common";
import { GroupSearchable } from "../GroupSearchable";
import { useSocket } from "services/hooks/useSocket";
// import { useSocket } from "services/hooks/useSocket";
// import { Popover } from "@mui/material";
// import { borderRadius } from "@mui/system";

interface InitialValues {
  projectID: string,
  subType: string,
  fieldID: string,
  assigneeID: string,
  name: string,
  descriptioncv: string;
  startTime: string,
  expiredTime: string,
  description: string,
  authorAttachs: string[],
  type: number,
  groupID: string,
  expiredHour: string
}

type Props = {
  defaultValues?: any;
}

export const ModalAddNewTask: FC<Props> = ({ defaultValues = {} }) => {
  const history = useHistory();
  const { current: socket }: any = useSocket();
  const { closeModal } = useModal(true);
  const editorRef = useRef<EditorType>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  type GroupSearchableHandle = React.ElementRef<typeof GroupSearchable>;
  const groupSearchableRef = React.useRef<GroupSearchableHandle>(null);

  const [tokens, setTokens] = useState<any[]>([]);
  const [usersRelated, setUsersRelated] = useState<any[]>([]);
  const [attachmentsCanceled, setAttachmentsCanceled] = useState<Array<{ type: 'FILE' | 'IMAGE', key: number }>>([]);
  const [searchDepartmentValue, setSearchDepartmentValue] = useState("");
  const [searchFriendName, setSearchFriendName] = useState("");
  const [searchContract, setSearchContract] = useState("");
  const [companyID, setCompanyID] = useState(defaultValues?.company?._id || "");
  const [projectID, setProjectID] = useState(defaultValues?.project?._id || "");
  const [groupID, setGroupID] = useState(defaultValues?.group?._id || "");
  const [taskID, setTaskID] = useState("");
  const [name, setName] = useState("");
  const [groupParentPicker, setGroupParentPicker] = useState<any>({});
  const [isNotiEmail, setIsNotiEmail] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const { user } = useAuth();
  const { addTaskAsync, updateTaskAsync } = useTask({});
  const { deleteFilesAsync } = useFileCore();

  const { addFileToUpload } = useUpload({
    appID: APP_ID.PCM.id,
    companyID,
    projectID,
    groupID,
    taskID,
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
    hasNextPage: hasNextPageDoctypes,
    fetchNextPage: fetchNextPageDoctypes,
    isFetching: isFetchingPageDoctypes
  } = useDoctype({
    params: {
      type: 2,
      companyID,
    },
    isFetchList: false
  })

  const {
    data: listGroup,
    hasNextPage: hasNextPageListGroup,
    isFetching: isFetchingListGroup,
    fetchNextPage: fetchNextPageListGroup,
  } = useQueryListGroup({
    limit: 10,
    keyword: "",
    projectID: projectID,
    parentID: groupParentPicker?.value
  }, !!projectID);

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

  const addTaskSchema = object().shape({
    projectID: string().required("Vui lòng nhập tên dự án!"),
    assigneeID: string().required("Vui lòng nhập tên người nhận!"),
    name: string().required("Vui lòng nhập tiêu đề!"),
  });

  const initialValues: InitialValues = {
    projectID,
    groupID,
    fieldID: "",
    assigneeID: "",
    name: "",
    descriptioncv: "",
    startTime: moment().format('MM/DD/YYYY'),
    expiredTime: moment().format('MM/DD/YYYY'),
    expiredHour: "09:00",
    description: "",
    authorAttachs: [],
    type: 1,
    subType: '0',
  };

  const handleCreateTask = async (values: any) => {
    try {
      setIsUploading(true);
      let files: string[] = [];
      const filesCanceled: number[] = [];
      const imagesCanceled: number[] = [];
      const filesDelete: string[] = [];

      attachmentsCanceled.map(attachment => {
        if (attachment.type === 'IMAGE') imagesCanceled[imagesCanceled.length] = attachment.key;
        else filesCanceled[filesCanceled.length] = attachment.key;
      })

      // Get list file uploaded
      for (const [key, { _id }] of Object.entries(uploads.images)) {
        if (imagesCanceled.includes(+key)) {
          filesDelete[filesDelete.length] = _id;
        } else if (_id) {
          files = [...files, _id];
        }
      }

      for (const [key, { _id }] of Object.entries(uploads.files)) {
        if (filesCanceled.includes(+key)) {
          filesDelete[filesDelete.length] = _id;
        } else if (_id) {
          files = [...files, _id];
        }
      }

      if (files.length) {
        values.authorAttachs = files;
      }

      if (!values.groupID) {
        values.groupID = groupID;
      }

      if (filesDelete.length) {
        await deleteFilesAsync(filesDelete);
      }

      const relatedIDs = usersRelated.map(user => user.value)
      const { error, data } = await addTaskAsync({
        ...values,
        relatedIDs,
        taskID,
        isNotiEmail
      });

      if (error) return toast.warning(data.message);

      socket?.emit('SUBJECT_PCM_CSS_ADD_TASK', {
        taskID,
      });
      socket?.emit('SUBJECT_PCM_CSS_UPDATE_NOTIFICATION', {
        taskID,
        isGetCountNotification: true
      });

      setTimeout(() => {
        closeModal();
        history.push(`/pcm/detail/${data._id}`);
      }, 500)
    } catch (error) {
      if (typeof error === "string") {
        toast.error(error);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const createTaskTemp = async (values?: any) => {
    try {
      const payload = {
        name: "No name",
        assigneeID: user?._id,
        draft: "1",
        projectID,
        groupID,
        ...values,
      }
      const { error, data } = await addTaskAsync({
        ...payload,
        ...values,
      });

      !error && setTaskID(data._id);
    } catch (error) {
      console.error(error);
    }
  }

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
      if (fileInputRef.current) {
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
    if (fileInputRef.current) {
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

  const handlePasteFile = (event: any) => {
    if (event.clipboardData?.files?.length) {
      return handleUploadAttach(event.clipboardData.files)
    }

    // const text = event.clipboardData.getData('text/plain');
    // text && window.document.execCommand('insertText', false, text);
  }

  const handleRemoveUpload = (file: FileProp | FilePropsUpload, type: 'FILE' | 'IMAGE') => {
    if ('id' in file) {
      const token = tokens.find(item => (item.key == file.id) && (item?.file?.name === file?.file?.name))
      token && token?.source?.cancel('Operation request canceled by the user.');

      type === 'IMAGE' ? removeUploadedImage(file.id) : removeUploadedFile(file.id);
      setAttachmentsCanceled(attachments => ([...attachments, { type, key: +file.id }]));
    } else {
      const token = tokens.find(item => (item.key == file._id) && (item?.file?.name === file?.name))
      token && token?.source?.cancel('Operation request canceled by the user.');

      type === 'IMAGE' ? removeUploadedImage(file._id) : removeUploadedFile(file._id);
    }
  }

  const handleScroll = (e: UIEvent<HTMLDivElement>, type: 'project' | 'group' | 'contract' | 'user' | 'field' | 'groupChild') => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop >= clientHeight - 15;
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

  const handleBlurNameInput = async (e: any) => {
    if (taskID) {
      await updateTaskAsync({ taskID, name });
    }
  };

  const handleChangeSelectAllRelated = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    if (checked) {
      const users = listUsersProject.map(user => {
        return {
          label: user.bizfullname,
          value: user._id,
          imageUrl: `${process.env.REACT_APP_URL_S3_USER}/${user.image}`,
        }
      })
      setUsersRelated(users);
    } else {
      setUsersRelated([]);
    }
  }

  useEffect(() => {
    if (projectID && groupID && !taskID) {
      createTaskTemp();
    }
  }, [projectID, groupID, taskID])

  // nhac thoi han
  // const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  // const handleClickOpenPop = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const open = Boolean(anchorEl);
  // const idPopover = open ? 'simple-popover' : undefined;

  return (
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
        onSubmit={handleCreateTask}
      >
        {(formik) => {
          const { setFieldValue, values } = formik;
          return (
            <Form>
              <div className={"t-add-new-task-dialog-select px-6"}>
                <div className={"flex py-2 border-b"}>
                  <div className={"w-1/4 flex items-start"}>
                    <div className={"h-full text-left  text-gray-500 flex items-center mr-2 w-1/5 h-full h-full"}>Dự án, phòng ban (*)</div>
                    <div className={"flex-1 max-w-4/5 w-4/5 h-full h-full"}>
                      <DropdownSearchable
                        onchangeValue={(value: any) => {
                          setCompanyID(value.companyId)
                          setFieldValue("projectID", value?.id);
                          setProjectID(`${value?.id}`);
                          setSearchDepartmentValue("");
                          setGroupID("");
                          setGroupParentPicker({});
                          setFieldValue("groupID", "");
                          setFieldValue("assigneeID", "");
                          setUsersRelated([])
                        }}
                        onClearData={() => {
                          setCompanyID("");
                          setFieldValue("projectID", "");
                          setFieldValue("groupID", "");
                          setGroupID("");
                          setGroupParentPicker({});
                          setFieldValue("assigneeID", "");
                          setUsersRelated([])
                          setProjectID("");
                          groupSearchableRef.current && groupSearchableRef.current.resetGroupSearchable();
                        }}
                        onSearchInputChange={
                          debounce(
                            (value) => setSearchDepartmentValue(value),
                            500)
                        }
                        onScroll={(e) => handleScroll(e, 'project')}
                        className={"max-w-full h-full flex-1"}
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
                        initialValue={defaultValues.project?._id ? {
                          value: defaultValues.project?._id,
                          label: defaultValues.project?.name,
                        } : undefined}
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
                    <div className={"h-full text-left  text-gray-500 flex items-center mr-2  w-1/5 h-full"}>Nhóm (*)</div>
                    <div className={"flex-1 max-w-4/5 w-4/5 h-full"}>
                      <GroupSearchable
                        ref={groupSearchableRef}
                        disabled={values.projectID.length <= 0}
                        handleSetValue={(item: any) => {
                          setGroupID(item.value);
                          setFieldValue("groupID", item.value);
                        }}
                        data={listGroup.map((groupItem) => ({
                          label: `${groupItem.sign}.${groupItem.name}`,
                          value: groupItem._id,
                        }))}
                        groupParentPicker={groupParentPicker}
                        setGroupParentPicker={setGroupParentPicker}
                        onClearData={() => {
                          setFieldValue("groupID", "");
                          setGroupParentPicker({});
                          setGroupID("");
                        }}
                        onScroll={(e) => handleScroll(e, 'group')}
                        className={"max-w-full h-full flex-1"}
                        placeholder="Chọn nhóm"
                        initialValue={{
                          label: `${defaultValues.group?.sign}.${defaultValues.group?.name}`,
                          value: defaultValues.group?._id,
                        }}
                      />
                    </div>
                  </div>
                  <div className={"w-1/4 flex items-start pl-3"}>
                    <div className={"h-full text-left  text-gray-500 flex items-center mr-2  w-1/5 h-full"}>Tính chất (*)</div>
                    <div className={"flex-1 max-w-4/5 w-4/5 h-full"}>
                      <DropdownSearchable
                        onchangeValue={(value: any) =>
                          setFieldValue("subType", value.id)
                        }
                        onClearData={() => setFieldValue("subType", "")}
                        placeholder={"Phân loại"}
                        className={"max-w-full h-full flex-1"}
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
                    <div className={"h-full text-left  text-gray-500 flex items-center mr-2  w-1/5 h-full"}>Hợp đồng</div>
                    <div className={"flex-1 max-w-4/5 w-4/5 h-full"}>
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
                        className={"max-w-full h-full flex-1"}
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
                <div className={"flex py-2 border-b"}>
                  <div className={"w-full flex items-start"}>
                    <div className={"h-full text-left  text-gray-500 flex items-center mr-2 "}>Gửi tới (*)</div>
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
                  {/*  <div className={"h-full text-left  text-gray-500 flex items-center mr-2 "}>Tính chất</div>*/}
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
                <div className={"flex py-2 border-b"}>
                  <div className={"w-full flex items-start"}>
                    <div className={"h-full text-left text-gray-500 items-center mr-2"}>
                      <p>Liên quan</p>
                      <div>
                        <label className="cursor-pointer label flex items-center">
                          <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }} onChange={handleChangeSelectAllRelated} />
                          <span className="text-gray-500">Tất cả</span>
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <DropdownSearchable
                        onchangeValue={(value: any) => {
                          const isFound = usersRelated.find(user => user.value === value.id);

                          if (!isFound) {
                            setUsersRelated(curr => ([...curr, value]))
                          }

                          setSearchFriendName("");
                        }}
                        onMultipleRemoveValue={(id: any) => {
                          const newUsersRelated = usersRelated.filter(item => item.value !== id);
                          setUsersRelated(newUsersRelated)
                        }}
                        onClearData={() => setUsersRelated([])}
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
                            <img alt="Thumbnail" src={item.imageUrl ?? fakeThumbnail} className="mr-1 w-6 h-6 rounded-full" />
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
                          imageUrl: `${process.env.REACT_APP_URL_S3_USER}/${item.image}`,
                        }))}
                        valueControlled={usersRelated}
                        formatItem={{
                          id: "value",
                          text: "label",
                        }}
                        inlineSearch={true}
                      />
                      {/* <label className="cursor-pointer label flex items-center">
                        <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }} onChange={handleChangeSelectAllRelated} />
                        <span className="text-gray-500"> Chọn tất cả </span>
                      </label> */}
                    </div>
                  </div>
                </div>
                <div className={"flex py-2 border-b"}>
                  <div className={"w-3/4 flex items-start"}>
                    <div className={"h-full text-left  text-gray-500 flex items-center mr-2 "}>Tiêu đề (*)</div>
                    <div className={"w-full flex-1"}>
                      <input
                        placeholder="Tiêu đề"
                        type="text"
                        className="border-0 flex-grow outline-none px-3 mt-0.5 w-3/4"
                        onChange={(event) => {
                          const value = event.target.value;
                          setFieldValue("name", value);
                          setName(value);
                        }}
                        onBlur={handleBlurNameInput}
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="font-normal text-xs text-negative pl-3"
                      />
                    </div>
                  </div>
                  <div className={"w-1/4 flex items-center"}>
                    <div className={"h-full text-left  text-gray-500 flex items-center mr-2 "}>Thời hạn (*)</div>
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
                  onEditorChange={(_, editor) => {
                    const contentRaw = editor.getContent({ format: 'raw' });
                    const contentRawCv = editor.getContent({ format: 'text' });

                    setFieldValue("description", contentRaw);
                    setFieldValue("descriptioncv", contentRawCv);
                  }}
                  onInit={(evt, editor) => editorRef.current = editor}
                  onPaste={handlePasteFile}
                  apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
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
                {Object.keys(uploads.files).length ?
                  [...toArray(uploads.files)].map(file => {
                    if (!file || Object.keys(file).length === 1) return;

                    const { file: fileInfo, progress, id } = file;
                    const isProgress = progress < 100;

                    if (!fileInfo) return;

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
                        <button className="ml-auto" type="button" onClick={handleRemoveUpload.bind(null, file, 'FILE')}>
                          <Close />
                        </button>
                      </div>
                    )
                  }) : null}

                {Object.keys(uploads.images).length ?
                  [...toArray(uploads.images)].map(file => {
                    if (!file || Object.keys(file).length === 1) return;

                    const { file: fileInfo, progress, id } = file;
                    const isProgress = progress < 100;

                    if (!fileInfo) return;

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
                        <button className="ml-auto" type="button" onClick={handleRemoveUpload.bind(null, file, 'IMAGE')}>
                          <Close />
                        </button>
                      </div>
                    )
                  }) : null}
              </div>
              <div className={"flex items-center border-t py-3 px-6"}>
                <label title="Chọn file đính kèm hoặc dán ảnh trực tiếp vào ô soạn thảo">
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
                <div className={"flex items-center ml-4 testclass"}>
                  <input
                    type="checkbox"
                    id="email-notice"
                    className={"form-check-input mt-0"}
                    onChange={e => setIsNotiEmail(e.target.checked)}
                  />
                  <label htmlFor="email-notice" className={"text-left ml-2 whitespace-nowrap"}>Thông báo email</label>
                </div>
                {/* <div className="flex items-center ml-3">
                  <img
                    src={IconClock}
                    alt="Icon attach"
                    className="h-6 w-6"
                  />
                  <Button aria-describedby={idPopover} variant="text"
                  onClick={handleClickOpenPop}
                  style={{textTransform: 'none', fontSize: '14px'}}
                  >
                    <span className="text-primary-gray">Nhắc trước thời hạn</span>
                  </Button>
                  <Popover
                    id={idPopover}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    transformOrigin={{ vertical: "bottom", horizontal: "center" }}
                    style={{boxShadow:'none', borderRadius:'3px', border:'0.5px solid #CCCCCC'}}
                  >
                    <div className="p-3 w-[300px]">
                      <div className="py-1">
                        Nhắc trước thời hạn
                      </div>
                      <div className="py-1">
                        Nhắc trước thời hạn
                      </div>
                      <div className="py-1">
                        Nhắc trước thời hạn
                      </div>
                      <div className="py-1">
                        Nhắc trước thời hạn
                      </div>
                      <div className="py-1">
                        Nhắc trước thời hạn
                      </div>
                    </div>
                  </Popover>
                </div> */}
                <button type="submit" className="btn btn-primary ml-auto" disabled={isUploading}>Xác nhận</button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};