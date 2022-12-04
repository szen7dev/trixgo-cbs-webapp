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
 import { validateFiles } from 'validation/file';
 import { PCM_PROPOSAL_TASK } from "apis/localdb";
 import { APP_ID } from "apis/localdb";
 import useUploadFile, { modifyUploadedFilesV2 } from 'services/hooks/useUploadFile';
 
 /**
  * Components, Assets
  */
 import Close from "assets/icons/Close";
 import ItemSample from "assets/images/image 430.jpg";
 import IconGreenDot from "assets/images/Frame 4330.svg";
 import RadioEmpty from "assets/images/Ellipse 27.svg";
 import RadioChecked from "assets/images/icons8-checked-40 (2) 2.svg";
 import AvaSatffSample from "assets/images/image 437.png";
 import ImgDemoUpload from "assets/images/image 434.jpg";
 
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
 
 export const ModalAddNewContact: FC<Props> = ({ defaultValues = {} }) => {
     const history = useHistory();
     const { closeModal } = useModal();
     const fileInputRef = useRef<HTMLInputElement>(null);
     type GroupSearchableHandle = React.ElementRef<typeof GroupSearchable>;
     const groupSearchableRef = React.useRef<GroupSearchableHandle>(null);
 
     const [tokens, setTokens] = useState<any[]>([]);
     const [projectID, setProjectID] = useState(defaultValues?.project?._id || "");
     const [groupID, setGroupID] = useState(defaultValues?.group?._id || "");
     const [isNotiEmail, setIsNotiEmail] = useState(false);
 
     const CustomRadioToggle = () => {
         const [selectRadio, setSelectRadio] = React.useState(false)
         return (
             <button onClick={() => setSelectRadio(!selectRadio)} className="h-[16px]">
                 {(selectRadio ? <img src={RadioChecked} alt="" /> : <img src={RadioEmpty} alt="" />)}
             </button>
         )
     }
 
     const { addTaskAsync } = useTask({});
 
     const onSubmitFilterData = async (values: any) => {
         try {
 
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
                 <div className={"flex w-full py-3 px-6"}>
                     <h4 className={"flex-1 text-lg font-bold text-left"}>Tạo danh bạ</h4>
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
                                 <div className={"t-add-new-task-dialog-select px-6 pb-4"}>
                                     <div className="flex gap-4 w-full">
                                         <div className="w-full ">
                                             <div className={" p-2 my-2"}>
                                                 <div className="mb-3">
                                                     <div className="ml-3 mb-3 text-primary-gray">Tên</div>
                                                     <div>
                                                         <input
                                                             type="text"
                                                             placeholder="Tên"
                                                             className="w-full h-[40px] rounded border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search px-3 py-1 outline-none "
                                                         />
                                                     </div>
                                                 </div>
                                                 <div className="mb-3">
                                                     <div className="ml-3 mb-3 text-primary-gray">Điện thoại</div>
                                                     <div>
                                                         <input
                                                             type="text"
                                                             placeholder="Điện thoại"
                                                             className="w-full h-[40px] rounded border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search px-3 py-1 outline-none "
                                                         />
                                                     </div>
                                                 </div>
                                                 <div className="mb-3">
                                                     <div className="ml-3 mb-3 text-primary-gray">Địa chỉ</div>
                                                     <div>
                                                         <input
                                                             type="text"
                                                             placeholder="Địa chỉ"
                                                             className="w-full h-[40px] rounded border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search px-3 py-1 outline-none "
                                                         />
                                                     </div>
                                                 </div>
                                                 <div className="mb-3">
                                                     <div className="ml-3 mb-3 text-primary-gray">Ghi chú</div>
                                                     <div>
                                                         <textarea
                                                             placeholder="Điện thoại"
                                                             className="w-full h-[60px] rounded border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search px-3 py-1 outline-none  resize-none	"
                                                         />
                                                     </div>
                                                 </div>
                                             </div>
                                         </div>
                                     </div>
                                     <div className="text-right" style={{ marginTop: "50px" }}>
                                         <button type="submit" className="btn btn-primary ml-auto">Xác nhận</button>
                                     </div>
                                 </div>
                             </Form>
                         );
                     }}
                 </Formik>
             </div>
         </>
     );
 };