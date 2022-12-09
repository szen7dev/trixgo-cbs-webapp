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
import { ModalErrorDetailItem } from "../ModalErrorDetailItem";

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

export const ModalDetailItem: FC<Props> = ({ defaultValues = {} }) => {
  const history = useHistory();
  const { closeModal } = useModal();
  const fileInputRef = useRef<HTMLInputElement>(null);
  type GroupSearchableHandle = React.ElementRef<typeof GroupSearchable>;
  const groupSearchableRef = React.useRef<GroupSearchableHandle>(null);
  const { openModal } = useModal();

  const [tokens, setTokens] = useState<any[]>([]);
  const [projectID, setProjectID] = useState(defaultValues?.project?._id || "");
  const [groupID, setGroupID] = useState(defaultValues?.group?._id || "");
  const [isNotiEmail, setIsNotiEmail] = useState(false);

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
        <div className={"flex w-full py-3 px-6 border-b"}>
          <h4 className={"flex-1 text-lg font-bold text-left"}>Thông tin đơn hàng</h4>
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
                  <div className="flex gap-4">
                    <div className="boxlef w-1/2 ">
                      <div className={"border-0.5 p-2 my-2"}>
                        <div className={"flex py-2"}>
                          <div className={"w-full flex items-center"}>
                            <img src={IconGreenDot} alt="" />
                            <div className={"h-full text-left flex items-center px-1 "}>
                              <span className="text-gray-500 pr-1">Tên: </span>
                              <span>T39882 trà uống hoa quả</span>
                            </div>
                          </div>
                        </div>
                        <div className={"flex py-2"}>
                          <div className={"w-full flex items-center"}>
                            <img src={IconGreenDot} alt="" />
                            <div>
                              <div className={"h-full text-left flex items-center px-1 border-r-0.5 border-black"}>
                                <span className="text-gray-500 pr-1">Cơ sở: </span>
                                <span>Winggo 30 Vĩnh Phúc </span>
                              </div>
                            </div>
                            <div>
                              <div className={"h-full text-left flex items-center px-1 border-r-0.5 border-black"}>
                                <span className="text-gray-500 pr-1">Ca làm: </span>
                                <span>Ca sáng 24/11/2022</span>
                              </div>
                            </div>
                            <div>
                              <div className={"h-full text-left flex items-center px-1"}>
                                <span className="text-gray-500 pr-1">Người tạo: </span>
                                <span>Phùng Thị Thu-Wgo</span>
                              </div>
                            </div>
                            {/* Cơ sở: Winggo 30 Vĩnh Phúc | Ca làm: Ca sáng 24/11/2022 | Người tạo:  Phùng Thị Thu-Wgo */}
                          </div>
                        </div>
                        <div className={"flex py-2"}>
                          <div className={"w-full flex items-center"}>
                            <img src={IconGreenDot} alt="" />
                            <div className={"h-full text-left flex items-center px-1 "}>
                              <span className="text-gray-500 pr-1">Mã hiệu: </span>
                              <span><span className="text-cbs-primary">100003010</span> - <span className="text-cbs-schedule-nextweek">24/11/2022 15:30</span></span>
                            </div>
                            {/* Mã hiệu: 100003010 - 24/11/2022 15:30 */}
                          </div>
                        </div>
                        <div className={"flex py-2"}>
                          <div className={"w-full flex items-center"}>
                            <img src={IconGreenDot} alt="" />
                            <div className={"h-full text-left flex items-center px-1 "}>
                              <span className="text-gray-500 pr-1">Mã đơn trên App: </span>
                              <span>Grab25688</span>
                            </div>
                          </div>
                          {/* Mã đơn trên App: Grab25688 */}
                        </div>
                        <div className={"flex py-2"}>
                          <div className={"w-full flex items-center"}>
                            <img src={IconGreenDot} alt="" />
                            <div>
                              <div className={"h-full text-left flex items-center px-1 border-r-0.5 border-black"}>
                                <span className="text-gray-500 pr-1">Thanh toán: </span>
                                <span>Tiền mặt</span>
                              </div>
                            </div>
                            <div>
                              <div className={"h-full text-left flex items-center px-1 "}>
                                <span className="text-gray-500 pr-1">Phục vụ: </span>
                                <span>Tại quán</span>
                              </div>
                            </div>
                            {/* Thanh toán: Tiền mặt | Phục vụ: Tại quán */}
                          </div>
                        </div>
                        <div className={"flex py-2"}>
                          <div className={"w-full flex items-center"}>
                            <img src={IconGreenDot} alt="" />
                            <div className={"h-full text-left flex items-center px-1 "}>
                              <span className="text-gray-500 pr-1">Khách: </span>
                              <span>0988115998 - Nguyễn Văn A <span className="text-cbs-fnb-bg">(đã mua 68 lần)</span></span>
                            </div>
                          </div>
                          {/* Khách: 0988115998 - Nguyễn Văn A (đã mua 68 lần) */}
                        </div>
                        <div className={"flex py-2"}>
                          <div className={"w-full flex items-center"}>
                            <img src={IconGreenDot} alt="" />
                            <div className={"h-full text-left flex items-center px-1 "}>
                              <span className="text-gray-500 pr-1">Ghi chú: </span>
                              <span>Đặt hộ khách qua Zalo</span>
                            </div>
                          </div>
                          {/* Ghi chú: Đặt hộ khách qua Zalo */}
                        </div>
                        <div className={"flex py-2"}>
                          <div className={"w-full flex items-baseline	"}>
                            <img src={IconGreenDot} alt="" />
                            <div className={"h-full text-left flex px-1 "}>
                              <div className="text-gray-500 w-[75px]" style={{ minWidth: "75px" }}>Lỗi gặp phải: </div>
                              <div className="flex flex-wrap gap-2 px-2">
                                <button className="rounded-md bg-cbs-active-comment px-4 py-1"
                                  onClick={() =>
                                    openModal(
                                      <div className=" text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block" style={{ width: "640px" }}>
                                        <ModalErrorDetailItem />
                                      </div>
                                    )
                                  }
                                >
                                  Nhầm size
                                </button>
                                <button className="rounded-md bg-cbs-active-comment px-4 py-1"
                                  onClick={() =>
                                    openModal(
                                      <div className=" text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block" style={{ width: "640px" }}>
                                        <ModalErrorDetailItem />
                                      </div>
                                    )
                                  }
                                >
                                  Thiếu ống hút
                                </button>
                                <button className="rounded-md bg-cbs-active-comment px-4 py-1"
                                  onClick={() =>
                                    openModal(
                                      <div className=" text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block" style={{ width: "640px" }}>
                                        <ModalErrorDetailItem />
                                      </div>
                                    )
                                  }
                                >
                                  Pha pudding bị hỏng
                                </button>
                                <button className="rounded-md bg-cbs-active-comment px-4 py-1"
                                  onClick={() =>
                                    openModal(
                                      <div className=" text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block" style={{ width: "640px" }}>
                                        <ModalErrorDetailItem />
                                      </div>
                                    )
                                  }
                                >
                                  Pha pudding bị hỏng
                                </button>
                                <button className="rounded-md bg-cbs-active-comment px-4 py-1"
                                  onClick={() =>
                                    openModal(
                                      <div className=" text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block" style={{ width: "640px" }}>
                                        <ModalErrorDetailItem />
                                      </div>
                                    )
                                  }
                                >Nhầm size
                                </button>
                                <button className="rounded-md bg-cbs-active-comment px-4 py-1"
                                  onClick={() =>
                                    openModal(
                                      <div className=" text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block" style={{ width: "640px" }}>
                                        <ModalErrorDetailItem />
                                      </div>
                                    )
                                  }
                                >Nhầm size
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="font-bold my-3">Lỗi gặp phải</div>
                        <div>
                          <input type="text" placeholder="Tìm kiếm gán lỗi"
                            className="w-full h-[40px] rounded border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search px-3 py-1 outline-none "
                          />
                        </div>
                        <div className="overflow-y-auto	my-2 ">
                          <div className="w-full h-[40px] rounded border-0.5 border-cbs-border bg-cbs-bg-input-search px-3 py-3 mt-1">
                            Nhầm size
                          </div>
                          <div className="w-full h-[40px] rounded border-0.5 border-cbs-border bg-cbs-bg-input-search px-3 py-3 mt-1">
                            Nhầm size
                          </div>
                          <div className="w-full h-[40px] rounded border-0.5 border-cbs-border bg-cbs-bg-input-search px-3 py-3 mt-1">
                            Nhầm size
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="boxright w-1/2">
                      <div className=" overflow-y-auto	mt-2 border-0.5 ">
                        {/* item */}
                        <div className="flex gap-2 w-full border-b-0.5 p-2">
                          <img src={ItemSample} alt="item" className="w-[44px] h-[44px]" />
                          <div className="w-full">
                            <div className="flex justify-between	">
                              <div>
                                <p className="font-bold truncate">Trà sữa Matcha - Size M - 100% đường, 100% đá - Topping thạch dừa</p>
                                <p className="text-primary-gray">Không bao gồm chân châu</p>
                              </div>
                              <div className="text-primary">25.000</div>
                            </div>
                            <div className="flex flex-wrap w-4/5 mt-3">
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckedBox} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckBoxEmpty} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckedBox} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckBoxEmpty} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckedBox} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckBoxEmpty} alt="" /> <span>Pudding trứng</span>
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
                                <p className="text-primary-gray">Không bao gồm chân châu</p>
                              </div>
                              <div className="text-primary">25.000</div>
                            </div>
                            <div className="flex flex-wrap w-4/5 mt-3">
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckedBox} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckBoxEmpty} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckedBox} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckBoxEmpty} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckedBox} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckBoxEmpty} alt="" /> <span>Pudding trứng</span>
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
                                <p className="text-primary-gray">Không bao gồm chân châu</p>
                              </div>
                              <div className="text-primary">25.000</div>
                            </div>
                            <div className="flex flex-wrap w-4/5 mt-3">
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckedBox} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckBoxEmpty} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckedBox} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckBoxEmpty} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckedBox} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckBoxEmpty} alt="" /> <span>Pudding trứng</span>
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
                                <p className="text-primary-gray">Không bao gồm chân châu</p>
                              </div>
                              <div className="text-primary">25.000</div>
                            </div>
                            <div className="flex flex-wrap w-4/5 mt-3">
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckedBox} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckBoxEmpty} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckedBox} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckBoxEmpty} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckedBox} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckBoxEmpty} alt="" /> <span>Pudding trứng</span>
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
                                <p className="text-primary-gray">Không bao gồm chân châu</p>
                              </div>
                              <div className="text-primary">25.000</div>
                            </div>
                            <div className="flex flex-wrap w-4/5 mt-3">
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckedBox} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckBoxEmpty} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckedBox} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckBoxEmpty} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckedBox} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckBoxEmpty} alt="" /> <span>Pudding trứng</span>
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
                                <p className="text-primary-gray">Không bao gồm chân châu</p>
                              </div>
                              <div className="text-primary">25.000</div>
                            </div>
                            <div className="flex flex-wrap w-4/5 mt-3">
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckedBox} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckBoxEmpty} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckedBox} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckBoxEmpty} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckedBox} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckBoxEmpty} alt="" /> <span>Pudding trứng</span>
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
                                <p className="text-primary-gray">Không bao gồm chân châu</p>
                              </div>
                              <div className="text-primary">25.000</div>
                            </div>
                            <div className="flex flex-wrap w-4/5 mt-3">
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckedBox} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckBoxEmpty} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckedBox} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckBoxEmpty} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckedBox} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckBoxEmpty} alt="" /> <span>Pudding trứng</span>
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
                                <p className="text-primary-gray">Không bao gồm chân châu</p>
                              </div>
                              <div className="text-primary">25.000</div>
                            </div>
                            <div className="flex flex-wrap w-4/5 mt-3">
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckedBox} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckBoxEmpty} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckedBox} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckBoxEmpty} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckedBox} alt="" /> <span>Pudding trứng</span>
                              </div>
                              <div className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                <img src={CheckBoxEmpty} alt="" /> <span>Pudding trứng</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* end item */}
                      </div>
                      <div className="border-l-0.5 border-r-0.5 px-2">
                        <div className="flex justify-between mt-2 mb-3">
                          <div className="font-bold">Tổng tiền</div>
                          <div className="font-bold">100.000</div>
                        </div>
                        <div className="flex justify-between	mt-2 mb-3">
                          <div className="">Triết khấu</div>
                          <div className="flex">
                            <div>10.000</div>
                          </div>
                        </div>
                        <div className="flex justify-between	 mt-2 mb-3">
                          <div className="">Giảm giá</div>
                          <div className="flex">
                            <div>10.000</div>
                          </div>
                        </div>
                      </div>
                      <div className="border-0.5 p-1">
                        <div className="flex justify-between bg-cbs-form-input-bg">
                          <div className="font-bold">Thanh toán</div>
                          <div className="font-bold text-primary">100.000</div>
                        </div>
                      </div>
                      {/* <div className="text-right" style={{ marginTop: "100px" }}>
                        <button type="submit" className="btn btn-primary ml-auto" disabled={isUploading}>Xác nhận</button>
                      </div> */}
                    </div>
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