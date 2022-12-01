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
import IconClock from "assets/images/icons8-snooze-48 1.svg";
import RadioEmpty from "assets/images/Ellipse 27.svg";
import RadioChecked from "assets/images/icons8-checked-40 (2) 2.svg";
import ItemSample from "assets/images/image 430.jpg";
import IconMinus from "assets/images/icons8-reduce-96 1.svg";
import IconPlus from "assets/images/icons8-add-new-100 1.svg";
import CheckBoxEmpty from "assets/images/Frame 3548.svg";
import CheckedBox from "assets/images/Check-All.svg";

import "react-day-picker/lib/style.css";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as EditorType } from "tinymce";
import iconAttach from "assets/images/icons8-attach-48.svg";
import { FileProp, FilePropsUpload } from "typings/common";
import { Button, FormControl, MenuItem, Popover, Select, SelectChangeEvent } from "@mui/material";
import { borderRadius } from "@mui/system";
import { GroupSearchable } from "shareComponents/common/GroupSearchable";

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

type Props = {
  defaultValues?: any;
}

export const ModalAddNewTask: FC<Props> = ({ defaultValues = {} }) => {
  const history = useHistory();
  const { closeModal } = useModal();
  const editorRef = useRef<EditorType>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  type GroupSearchableHandle = React.ElementRef<typeof GroupSearchable>;
  const groupSearchableRef = React.useRef<GroupSearchableHandle>(null);

  const [tokens, setTokens] = useState<any[]>([]);
  const [searchDepartmentValue, setSearchDepartmentValue] = useState("");
  const [searchFriendName, setSearchFriendName] = useState("");
  const [searchContract, setSearchContract] = useState("");
  const [companyID, setCompanyID] = useState(defaultValues?.company?._id || "");
  const [projectID, setProjectID] = useState(defaultValues?.project?._id || "");
  const [groupID, setGroupID] = useState(defaultValues?.group?._id || "");
  const [groupParentPicker, setGroupParentPicker] = useState<any>({});
  const [isNotiEmail, setIsNotiEmail] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const CustomRadioToggle = () => {
    const [selectRadio, setSelectRadio] = React.useState(false)
    return (
      <button onClick={() => setSelectRadio(!selectRadio)} className="h-[16px]">
        {(selectRadio ? <img src={RadioChecked} alt="" /> : <img src={RadioEmpty} alt="" />)}
      </button>
    )
  }
  const CustomCheckboxToggle = () => {
    const [selectCheckbox, setSelectCheckbox] = React.useState(false)
    return (
      <button onClick={() => setSelectCheckbox(!selectCheckbox)} className="h-[16px]">
        {(selectCheckbox ? <img src={CheckedBox} alt="" /> : <img src={CheckBoxEmpty} alt="" />)}
      </button>
    )
  }
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

      if (files.length) {
        values.authorAttachs = files;
      }

      if (!values.groupID) {
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

  const addTaskSchema = object().shape({
    projectID: string().required("Vui lòng nhập tên dự án!"),
    assigneeID: string().required("Vui lòng nhập !"),
    name: string().required("Vui lòng nhập tiêu đề!"),
  });

  const initialValues: InitialValues = {
    projectID,
    groupID,
    fieldID: "",
    assigneeID: "",
    name: "",
    startTime: moment().format('MM/DD/YYYY'),
    expiredTime: moment().format('MM/DD/YYYY'),
    expiredHour: "09:00",
    description: "",
    authorAttachs: [],
    type: 1,
    relatedIDs: [],
    subType: '0',
  };

  // nhac thoi han
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const handleClickOpenPop = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const idPopover = open ? 'simple-popover' : undefined;

  return (
    <>
      <div className={"flex flex-col"}>
        <div className={"flex w-full py-3 px-6 border-b"}>
          <h4 className={"flex-1 text-lg font-bold text-left"}>Đơn hàng mới</h4>
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
                  <div className={"flex py-2 border-b"}>
                    <div className={"w-1/4 flex items-start"}>
                      <div className={"h-full text-left  text-gray-500 flex items-center mr-2  w-1/5 h-full h-full"}>Cơ sở (*)</div>
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
                            setFieldValue("relatedIDs", []);
                          }}
                          onClearData={() => {
                            setCompanyID("");
                            setFieldValue("projectID", "");
                            setFieldValue("groupID", "");
                            setGroupID("");
                            setGroupParentPicker({});
                            setFieldValue("assigneeID", "");
                            setFieldValue("relatedIDs", []);
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
                          placeholder="Cơ sở"
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
                      <div className={"h-full text-left  text-gray-500 flex items-center mr-2  w-1/5 h-full"}>Ca làm (*)</div>
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
                          placeholder="Chọn ca làm"
                          initialValue={{
                            label: `${defaultValues.group?.sign}.${defaultValues.group?.name}`,
                            value: defaultValues.group?._id,
                          }}
                        />
                      </div>
                    </div>
                    <div className={"w-1/4 flex items-start pl-3"}>
                      <div className={"h-full text-left  text-gray-500 flex items-center mr-2  w-1/5 h-full"}>Mã khách (*)</div>
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
                      <div className={"h-full text-left  text-gray-500 flex items-center mr-2  w-1/5 h-full"}>Mùa</div>
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
                          placeholder="Chọn mùa"
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
                  <div className="flex justify-between my-6">
                    <div>
                      <span>Kênh bán hàng</span>
                      <div className="flex gap-3">
                        <div>
                          <CustomRadioToggle />Offline
                        </div>
                        <div>
                          <CustomRadioToggle />Grab
                        </div>
                        <div>
                          <CustomRadioToggle />Shopee
                        </div>
                        <div>
                          <CustomRadioToggle />Gojek
                        </div>
                        <div>
                          <CustomRadioToggle />Baemin
                        </div>
                        <div>
                          <CustomRadioToggle />Loship
                        </div>

                      </div>
                    </div>
                    <div>
                      <span>Phương thức thanh toán</span>
                      <div className="flex gap-3">
                        <div>
                          <CustomRadioToggle />Tiền mặt
                        </div>
                        <div>
                          <CustomRadioToggle />Chuyển khoản
                        </div>
                      </div>
                    </div>
                    <div>
                      <span>Hình thức phục vụ</span>
                      <div className="flex gap-3">
                        <div>
                          <CustomRadioToggle />Tại quán
                        </div>
                        <div>
                          <CustomRadioToggle />Mang đi
                        </div>
                        <div>
                          <CustomRadioToggle />Giao hàng (app)
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="boxlef w-1/2">
                      <div className={"flex py-2 border-b"}>
                        <div className={"w-3/4 flex items-start"}>
                          <div className={"h-full text-left  text-gray-500 flex items-center mr-2 "}>Tên (*)</div>
                          <div className={"w-full flex-1"}>
                            <input
                              placeholder="Tên"
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
                      </div>
                      <div className={"flex py-2 border-b"}>
                        <div className={"w-3/4 flex items-start"}>
                          <div className={"h-full text-left  text-gray-500 flex items-center mr-2 "}>Ghi chú</div>
                          <div className={"w-full flex-1"}>
                            <input
                              placeholder="Nhập nội dung ...."
                              type="text"
                              className="border-0 flex-grow outline-none px-3 mt-0.5 w-3/4"
                              onChange={(event) => setFieldValue("name", event.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={"flex py-2 border-b"}>
                        <div className={"w-3/4 flex items-start"}>
                          <div className={"h-full text-left  text-gray-500 flex items-center mr-2 "}>Đơn app</div>
                          <div className={"w-full flex-1"}>
                            <input
                              placeholder="Nhập nội dung...."
                              type="text"
                              className="border-0 flex-grow outline-none px-3 mt-0.5 w-3/4"
                              onChange={(event) => setFieldValue("name", event.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>Sản phẩm</div>
                        <div>
                          <input type="text" placeholder="Tìm kiếm sản phẩm" />
                        </div>
                        <div className="h-[300px] overflow-y-auto	my-2 ">
                          {/* item */}
                          <div className="flex gap-2 w-full border-b-0.5 pb-2">
                            <img src={ItemSample} alt="item" className="w-[44px] h-[44px]" />
                            <div className="w-full">
                              <div className="flex justify-between	">
                                <div>
                                  <p className="font-bold truncate">Trà sữa Matcha - Size M - 100% đường, 100% đá - Topping thạch dừa</p>
                                  <textarea
                                    className="border-0 flex-grow outline-none mt-0.5 w-full h-[35px]"
                                    placeholder="Thêm ghi chú ....">
                                  </textarea>
                                </div>
                                <div>25.000</div>
                              </div>
                              <div className="flex gap-2 justify-end	">
                                <button><img src={IconPlus} alt="" /></button>
                              </div>
                            </div>
                          </div>
                          {/* end item */}
                          {/* item */}
                          <div className="flex gap-2 w-full border-b-0.5 pb-2">
                            <img src={ItemSample} alt="item" className="w-[44px] h-[44px]" />
                            <div className="w-full">
                              <div className="flex justify-between	">
                                <div>
                                  <p className="font-bold truncate">Trà sữa Matcha - Size M - 100% đường, 100% đá - Topping thạch dừa</p>
                                  <textarea
                                    className="border-0 flex-grow outline-none mt-0.5 w-full h-[35px]"
                                    placeholder="Thêm ghi chú ....">
                                  </textarea>
                                </div>
                                <div>25.000</div>
                              </div>
                              <div className="flex gap-2 justify-end	">
                                <button><img src={IconPlus} alt="" /></button>
                              </div>
                            </div>
                          </div>
                          {/* end item */}
                          {/* item */}
                          <div className="flex gap-2 w-full border-b-0.5 pb-2">
                            <img src={ItemSample} alt="item" className="w-[44px] h-[44px]" />
                            <div className="w-full">
                              <div className="flex justify-between	">
                                <div>
                                  <p className="font-bold truncate">Trà sữa Matcha - Size M - 100% đường, 100% đá - Topping thạch dừa</p>
                                  <textarea
                                    className="border-0 flex-grow outline-none mt-0.5 w-full h-[35px]"
                                    placeholder="Thêm ghi chú ....">
                                  </textarea>
                                </div>
                                <div>25.000</div>
                              </div>
                              <div className="flex gap-2 justify-end	">
                                <button><img src={IconPlus} alt="" /></button>
                              </div>
                            </div>
                          </div>
                          {/* end item */}
                          {/* item */}
                          <div className="flex gap-2 w-full border-b-0.5 pb-2">
                            <img src={ItemSample} alt="item" className="w-[44px] h-[44px]" />
                            <div className="w-full">
                              <div className="flex justify-between	">
                                <div>
                                  <p className="font-bold truncate">Trà sữa Matcha - Size M - 100% đường, 100% đá - Topping thạch dừa</p>
                                  <textarea
                                    className="border-0 flex-grow outline-none mt-0.5 w-full h-[35px]"
                                    placeholder="Thêm ghi chú ....">
                                  </textarea>
                                </div>
                                <div>25.000</div>
                              </div>
                              <div className="flex gap-2 justify-end	">
                                <button><img src={IconPlus} alt="" /></button>
                              </div>
                            </div>
                          </div>
                          {/* end item */}
                        </div>
                      </div>
                    </div>
                    <div className="boxright w-1/2">
                      <div className="h-[300px] overflow-y-auto	my-2 border-0.5 ">
                        {/* item */}
                        <div className="flex gap-2 w-full border-b-0.5 p-2">
                          <img src={ItemSample} alt="item" className="w-[44px] h-[44px]" />
                          <div className="w-full">
                            <div className="flex justify-between	">
                              <div>
                                <p className="font-bold truncate">Trà sữa Matcha - Size M - 100% đường, 100% đá - Topping thạch dừa</p>
                                <textarea
                                  className="border-0 flex-grow outline-none mt-0.5 w-full h-[35px]"
                                  placeholder="Thêm ghi chú ....">
                                </textarea>
                              </div>
                              <div>25.000</div>
                            </div>
                            <div className="flex gap-2 justify-end	">
                              <button><img src={IconMinus} alt="" /></button>
                              <span> 1 </span>
                              <button><img src={IconPlus} alt="" /></button>
                            </div>
                            <div className="flex flex-wrap w-4/5">
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* end item */}
                        {/* item */}
                        <div className="flex gap-2 w-full border-b-0.5 p-2">
                          <img src={ItemSample} alt="item" className="w-[44px] h-[44px]" />
                          <div className="w-full">
                            <div className="flex justify-between	">
                              <div>
                                <p className="font-bold truncate">Trà sữa Matcha - Size M - 100% đường, 100% đá - Topping thạch dừa</p>
                                <textarea
                                  className="border-0 flex-grow outline-none mt-0.5 w-full h-[35px]"
                                  placeholder="Thêm ghi chú ....">
                                </textarea>
                              </div>
                              <div>25.000</div>
                            </div>
                            <div className="flex gap-2 justify-end	">
                              <button><img src={IconMinus} alt="" /></button>
                              <span> 1 </span>
                              <button><img src={IconPlus} alt="" /></button>
                            </div>
                            <div className="flex flex-wrap w-4/5">
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* end item */}
                        {/* item */}
                        <div className="flex gap-2 w-full border-b-0.5 p-2">
                          <img src={ItemSample} alt="item" className="w-[44px] h-[44px]" />
                          <div className="w-full">
                            <div className="flex justify-between	">
                              <div>
                                <p className="font-bold truncate">Trà sữa Matcha - Size M - 100% đường, 100% đá - Topping thạch dừa</p>
                                <textarea
                                  className="border-0 flex-grow outline-none mt-0.5 w-full h-[35px]"
                                  placeholder="Thêm ghi chú ....">
                                </textarea>
                              </div>
                              <div>25.000</div>
                            </div>
                            <div className="flex gap-2 justify-end	">
                              <button><img src={IconMinus} alt="" /></button>
                              <span> 1 </span>
                              <button><img src={IconPlus} alt="" /></button>
                            </div>
                            <div className="flex flex-wrap w-4/5">
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* end item */}
                        {/* item */}
                        <div className="flex gap-2 w-full border-b-0.5 p-2">
                          <img src={ItemSample} alt="item" className="w-[44px] h-[44px]" />
                          <div className="w-full">
                            <div className="flex justify-between	">
                              <div>
                                <p className="font-bold truncate">Trà sữa Matcha - Size M - 100% đường, 100% đá - Topping thạch dừa</p>
                                <textarea
                                  className="border-0 flex-grow outline-none mt-0.5 w-full h-[35px]"
                                  placeholder="Thêm ghi chú ....">
                                </textarea>
                              </div>
                              <div>25.000</div>
                            </div>
                            <div className="flex gap-2 justify-end	">
                              <button><img src={IconMinus} alt="" /></button>
                              <span> 1 </span>
                              <button><img src={IconPlus} alt="" /></button>
                            </div>
                            <div className="flex flex-wrap w-4/5">
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* end item */}
                        {/* item */}
                        <div className="flex gap-2 w-full border-b-0.5 p-2">
                          <img src={ItemSample} alt="item" className="w-[44px] h-[44px]" />
                          <div className="w-full">
                            <div className="flex justify-between	">
                              <div>
                                <p className="font-bold truncate">Trà sữa Matcha - Size M - 100% đường, 100% đá - Topping thạch dừa</p>
                                <textarea
                                  className="border-0 flex-grow outline-none mt-0.5 w-full h-[35px]"
                                  placeholder="Thêm ghi chú ....">
                                </textarea>
                              </div>
                              <div>25.000</div>
                            </div>
                            <div className="flex gap-2 justify-end	">
                              <button><img src={IconMinus} alt="" /></button>
                              <span> 1 </span>
                              <button><img src={IconPlus} alt="" /></button>
                            </div>
                            <div className="flex flex-wrap w-4/5">
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                              <div className="w-1/4 pb-2 pr-2">
                                <CustomCheckboxToggle /> Pudding trứng
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* end item */}
                      </div>
                      <div className="border-0.5 p-1">
                        <div className="flex justify-between	">
                          <div className="font-bold">Tổng tiền</div>
                          <div>100.000</div>
                        </div>
                        <div className="flex justify-between	">
                          <div className="">Triết khấu</div>
                          <div className="flex">
                            <div>25%</div>
                            <div>10.000</div>
                          </div>
                        </div>
                        <div className="flex justify-between	">
                          <div className="">Giảm giá</div>
                          <div className="flex">
                            <div>25%</div>
                            <div>10.000</div>
                          </div>
                        </div>
                      </div>
                      <div className="border-0.5 p-1">
                        <div className="flex justify-between	">
                          <div className="font-bold">Thanh toán</div>
                          <div className="font-bold">100.000</div>
                        </div>
                      </div>
                      <div className="text-right" style={{ marginTop: "100px" }}>
                        <button type="submit" className="btn btn-primary ml-auto" disabled={isUploading}>Xác nhận</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 mb-3">
                  {(!!Object.keys(uploads.files).length || !!Object.keys(uploads.images).length) &&
                    [...toArray(uploads.files), ...toArray(uploads.images)].map(file => {
                      if (!file || Object.keys(file).length === 1) return;

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

              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};