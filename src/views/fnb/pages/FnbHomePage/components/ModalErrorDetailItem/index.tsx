/**
 * Libraries
 */
import React, { ChangeEvent, FC, UIEvent, useEffect, useRef, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
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
import DemoUploadBtn from "assets/images/Frame 4389.svg";
import IconCancel from "assets/images/icons8-cancel-96 1.svg";

import "react-day-picker/lib/style.css";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as EditorType } from "tinymce";
import iconAttach from "assets/images/icons8-attach-48.svg";
import { FileProp, FilePropsUpload } from "typings/common";
import { Button, FormControl, FormControlLabel, MenuItem, Popover, Radio, RadioGroup, Select, SelectChangeEvent } from "@mui/material";
import { borderRadius } from "@mui/system";
import { GroupSearchable } from "shareComponents/common/GroupSearchable";
import { useGetUsersByCompany } from "services/hooks/auth/useAdmin";
import { useAuth } from "services/hooks/auth/useAuth";
import { DropdownSearchable } from "shareComponents/common";

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

export const ModalErrorDetailItem: FC<Props> = ({ defaultValues = {} }) => {
    const history = useHistory();
    const { closeModal } = useModal();
    const { user } = useAuth();

    const fileInputRef = useRef<HTMLInputElement>(null);
    type GroupSearchableHandle = React.ElementRef<typeof GroupSearchable>;
    const groupSearchableRef = React.useRef<GroupSearchableHandle>(null);

    const [tokens, setTokens] = useState<any[]>([]);
    const [projectID, setProjectID] = useState(defaultValues?.project?._id || "");
    const [groupID, setGroupID] = useState(defaultValues?.group?._id || "");
    const [isNotiEmail, setIsNotiEmail] = useState(false);
    const [keywordUser, setKeywordUser] = useState("");

    const [membersSelected, setMemberSelected] = useState<any>([]);

    const handleAddItemToBoard = (item: any) => {
        const isExists = membersSelected.find((m: any) => m._id === item._id);

        if (isExists) return toast.warning('Nhân sự đã được chọn');

        setMemberSelected((prev: any) => ([...prev, item]));
    }

    const handleRemoveItemFromBoard = (item: any) => {
        const newItems = membersSelected.filter((m: any) => m._id !== item._id);
        setMemberSelected(newItems);
    }

    const CustomRadioToggle = () => {
        const [selectRadio, setSelectRadio] = React.useState(false)
        return (
            <button onClick={() => setSelectRadio(!selectRadio)} className="h-[16px]">
                {(selectRadio ? <img src={RadioChecked} alt="" /> : <img src={RadioEmpty} alt="" />)}
            </button>
        )
    }

    const { listMembers, nextPageGetUsersBySystem, hasnextPageGetUsersBySystem } = useGetUsersByCompany(user?.company?._id ?? '', keywordUser);

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
                    <h4 className={"flex-1 text-lg font-bold text-left"}>Chi tiết</h4>
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
                        const { setFieldValue,getFieldProps, values } = formik;
                        return (
                            <Form>
                                <div className={"t-add-new-task-dialog-select px-6 pb-4"}>
                                    <div className="flex gap-4 w-full">
                                        <div className="w-full ">
                                            <div className="my-3">
                                                <div className={"w-full flex items-start"}>
                                                    <div className={"max-w-1/2 w-1/2 h-full text-left  text-primary-gray font-bold texxt-[13px] flex items-center mr-2  h-full h-full"}>Lỗi mắc phải</div>
                                                    <div className={" flex-1 max-w-1/2 w-1/2 h-full h-full"}>
                                                        <DropdownSearchable
                                                            // onchangeValue={(value: any) => {
                                                            //     setFundaID(value?.id)
                                                            //     setFieldValue("fundaID", value?.id);
                                                            //     setShiftID("");
                                                            //     setFieldValue("shiftID", "");
                                                            // }}
                                                            // onClearData={() => {
                                                            //     setFundaID("")
                                                            //     setFieldValue("fundaID", "");
                                                            //     setShiftID("");
                                                            //     setFieldValue("shiftID", "");
                                                            // }}
                                                            // onSearchInputChange={
                                                            //     debounce(
                                                            //         (value) => setSearchFunda(value),
                                                            //         200)
                                                            // }
                                                            className={"max-w-full h-full flex-1 border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search placeholder-primary-gray"}
                                                            placeholder="Tìm kiếm lỗi"
                                                            isMultiple={false}
                                                            allowClearValueSingleInput={true}
                                                            showTriangle={false}
                                                            maxWidthInput="max-w-full"
                                                            renderSelectedItem={(item: any) => (
                                                                <div
                                                                    className="max-w-full"
                                                                >
                                                                    {/* <p className={"truncate"}>{item.text}</p> */}
                                                                </div>
                                                            )}
                                                            // data={fundas.map((funda: any) => ({
                                                            //     label: `${funda.sign}.${funda.name}`,
                                                            //     value: funda._id,
                                                            // }))}
                                                            // formatItem={{
                                                            //     id: "value",
                                                            //     text: "label",
                                                            // }}
                                                            inlineSearch={true}
                                                        />
                                                        <ErrorMessage
                                                            name="errorName"
                                                            component="div"
                                                            className="font-normal text-xs text-negative pl-3"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 mt-2">
                                                    <div className="flex justify-between w-1/3 h-[40px] items-center border-0.5 border-cbs-border rounded-md px-2">
                                                        <div className="flex gap-2 items-center">
                                                            <span className="text-[13px]">Trân châu nấu sống</span>
                                                        </div>
                                                        <button
                                                        // onClick={() => handleRemoveItemFromBoard(member)}
                                                        >
                                                            <img src={IconCancel} alt="" />
                                                        </button>
                                                    </div>
                                                    <div className="flex justify-between w-1/3 h-[40px] items-center border-0.5 border-cbs-border rounded-md px-2">
                                                        <div className="flex gap-2 items-center">
                                                            <span className="text-[13px]">Trân châu nấu sống</span>
                                                        </div>
                                                        <button
                                                        // onClick={() => handleRemoveItemFromBoard(member)}
                                                        >
                                                            <img src={IconCancel} alt="" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="my-3">
                                                <div className={"w-full flex items-start"}>
                                                    <div className={"max-w-1/2 w-1/2 h-full text-left  text-primary-gray font-bold texxt-[13px] flex items-center mr-2  h-full h-full"}>Nhân sự mắc lỗi</div>
                                                    <div className={" flex-1 max-w-1/2 w-1/2 h-full h-full"}>
                                                        <DropdownSearchable
                                                            // onchangeValue={(value: any) => {
                                                            //     setFundaID(value?.id)
                                                            //     setFieldValue("fundaID", value?.id);
                                                            //     setShiftID("");
                                                            //     setFieldValue("shiftID", "");
                                                            // }}
                                                            // onClearData={() => {
                                                            //     setFundaID("")
                                                            //     setFieldValue("fundaID", "");
                                                            //     setShiftID("");
                                                            //     setFieldValue("shiftID", "");
                                                            // }}
                                                            // onSearchInputChange={
                                                            //     debounce(
                                                            //         (value) => setSearchFunda(value),
                                                            //         200)
                                                            // }
                                                            className={"max-w-full h-full flex-1 border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search placeholder-primary-gray"}
                                                            placeholder="Tìm kiếm nhân sự"
                                                            isMultiple={false}
                                                            allowClearValueSingleInput={true}
                                                            showTriangle={false}
                                                            maxWidthInput="max-w-full"
                                                            renderSelectedItem={(item: any) => (
                                                                <div
                                                                    className="max-w-full"
                                                                >
                                                                    {/* <p className={"truncate"}>{item.text}</p> */}
                                                                </div>
                                                            )}
                                                            // data={fundas.map((funda: any) => ({
                                                            //     label: `${funda.sign}.${funda.name}`,
                                                            //     value: funda._id,
                                                            // }))}
                                                            // formatItem={{
                                                            //     id: "value",
                                                            //     text: "label",
                                                            // }}
                                                            inlineSearch={true}
                                                        />
                                                        <ErrorMessage
                                                            name="errorName"
                                                            component="div"
                                                            className="font-normal text-xs text-negative pl-3"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 mt-2">
                                                    <div className="flex justify-between w-1/3 h-[40px] items-center border-0.5 border-cbs-border rounded-md px-2">
                                                        <div className="flex gap-2 items-center">
                                                            <img src={AvaSatffSample} alt="" style={{ maxWidth: "24px", maxHeight: "24px" }} />
                                                            <span className="text-[13px]">Phùng Thị Thu-Wgo</span>
                                                        </div>
                                                        <button
                                                        // onClick={() => handleRemoveItemFromBoard(member)}
                                                        >
                                                            <img src={IconCancel} alt="" />
                                                        </button>
                                                    </div>
                                                    <div className="flex justify-between w-1/3 h-[40px] items-center border-0.5 border-cbs-border rounded-md px-2">
                                                        <div className="flex gap-2 items-center">
                                                            <img src={AvaSatffSample} alt="" style={{ maxWidth: "24px", maxHeight: "24px" }} />
                                                            <span className="text-[13px]">Phùng Thị Thu-Wgo</span>
                                                        </div>
                                                        <button
                                                        // onClick={() => handleRemoveItemFromBoard(member)}
                                                        >
                                                            <img src={IconCancel} alt="" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="my-3">
                                                <div className={"w-full flex items-start"}>
                                                    <div className={"max-w-1/2 w-1/2 h-full text-left  text-primary-gray font-bold texxt-[13px] flex items-center mr-2  h-full h-full"}>Cơ sở</div>
                                                    <div className={" flex-1 max-w-1/2 w-1/2 h-full h-full"}>
                                                        <DropdownSearchable
                                                            // onchangeValue={(value: any) => {
                                                            //     setFundaID(value?.id)
                                                            //     setFieldValue("fundaID", value?.id);
                                                            //     setShiftID("");
                                                            //     setFieldValue("shiftID", "");
                                                            // }}
                                                            // onClearData={() => {
                                                            //     setFundaID("")
                                                            //     setFieldValue("fundaID", "");
                                                            //     setShiftID("");
                                                            //     setFieldValue("shiftID", "");
                                                            // }}
                                                            // onSearchInputChange={
                                                            //     debounce(
                                                            //         (value) => setSearchFunda(value),
                                                            //         200)
                                                            // }
                                                            className={"max-w-full h-full flex-1 border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search placeholder-primary-gray"}
                                                            placeholder="Tìm kiếm cơ sở"
                                                            isMultiple={false}
                                                            allowClearValueSingleInput={true}
                                                            showTriangle={false}
                                                            maxWidthInput="max-w-full"
                                                            renderSelectedItem={(item: any) => (
                                                                <div
                                                                    className="max-w-full"
                                                                >
                                                                    {/* <p className={"truncate"}>{item.text}</p> */}
                                                                </div>
                                                            )}
                                                            // data={fundas.map((funda: any) => ({
                                                            //     label: `${funda.sign}.${funda.name}`,
                                                            //     value: funda._id,
                                                            // }))}
                                                            // formatItem={{
                                                            //     id: "value",
                                                            //     text: "label",
                                                            // }}
                                                            inlineSearch={true}
                                                        />
                                                        <ErrorMessage
                                                            name="errorName"
                                                            component="div"
                                                            className="font-normal text-xs text-negative pl-3"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 mt-2">
                                                    <div className="flex justify-between w-1/3 h-[40px] items-center border-0.5 border-cbs-border rounded-md px-2">
                                                        <div className="flex gap-2 items-center">
                                                            <span className="text-[13px]">Winggo Thái Thịnh</span>
                                                        </div>
                                                        <button
                                                        // onClick={() => handleRemoveItemFromBoard(member)}
                                                        >
                                                            <img src={IconCancel} alt="" />
                                                        </button>
                                                    </div>
                                                    <div className="flex justify-between w-1/3 h-[40px] items-center border-0.5 border-cbs-border rounded-md px-2">
                                                        <div className="flex gap-2 items-center">
                                                            <span className="text-[13px]">Winggo Thái Thịnh</span>
                                                        </div>
                                                        <button
                                                        // onClick={() => handleRemoveItemFromBoard(member)}
                                                        >
                                                            <img src={IconCancel} alt="" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"my-3"}>
                                                <div className={"flex py-2"}>
                                                    <div className={"w-full items-center"}>
                                                        <div className="my-2">
                                                            <div className="font-bold mb-2 text-primary-gray">Phân loại</div>
                                                            <div>
                                                                <FormControl sx={{ marginTop: "-5px", marginLeft: "-9px" }} >
                                                                    <RadioGroup
                                                                        row
                                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                                        name="paymentMethod"
                                                                        className="flex justify-between	"
                                                                        sx={{ flexWrap: "nowrap" }}
                                                                    >
                                                                        <FormControlLabel
                                                                            sx={{ marginLeft: "0", width: "300px" }}
                                                                            value="1"
                                                                            control={
                                                                                <Radio
                                                                                    style={{}}
                                                                                    icon={<img src={RadioEmpty} alt="" />}
                                                                                    checkedIcon={<img src={RadioChecked} alt="" />}
                                                                                // onChange={() => setFieldValue("paymentMethod", 1)}
                                                                                // checked={(values.paymentMethod === 1) ? true : false}
                                                                                />
                                                                            }
                                                                            label={<span className="text-[13px]">Hệ thống phát hiện</span>}
                                                                        />
                                                                        <FormControlLabel
                                                                            sx={{ marginLeft: "0", width: "300px" }}
                                                                            value="2"
                                                                            control={
                                                                                <Radio
                                                                                    style={{}}
                                                                                    icon={<img src={RadioEmpty} alt="" />}
                                                                                    checkedIcon={<img src={RadioChecked} alt="" />}
                                                                                // onChange={() => setFieldValue("paymentMethod", 2)}
                                                                                // checked={(values.paymentMethod === 2) ? true : false}
                                                                                />
                                                                            }
                                                                            label={<span className="text-[13px]">Khách hàng phát hiện</span>}
                                                                        />
                                                                    </RadioGroup>
                                                                </FormControl>
                                                            </div>
                                                        </div>
                                                        <div className="my-2">
                                                            <div className="font-bold mb-2 text-primary-gray">Tình trạng</div>
                                                            <div>
                                                                <FormControl sx={{ marginTop: "-5px", marginLeft: "-9px" }} >
                                                                    <RadioGroup
                                                                        row
                                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                                        name="paymentMethod"
                                                                        className="flex justify-between	"
                                                                        sx={{ flexWrap: "nowrap" }}
                                                                    >
                                                                        <FormControlLabel
                                                                            sx={{ marginLeft: "0", width: "300px" }}
                                                                            value="1"
                                                                            control={
                                                                                <Radio
                                                                                    style={{}}
                                                                                    icon={<img src={RadioEmpty} alt="" />}
                                                                                    checkedIcon={<img src={RadioChecked} alt="" />}
                                                                                // onChange={() => setFieldValue("paymentMethod", 1)}
                                                                                // checked={(values.paymentMethod === 1) ? true : false}
                                                                                />
                                                                            }
                                                                            label={<span className="text-[13px]">Đã xử lý</span>}
                                                                        />
                                                                        <FormControlLabel
                                                                            sx={{ marginLeft: "0", width: "300px" }}
                                                                            value="2"
                                                                            control={
                                                                                <Radio
                                                                                    style={{}}
                                                                                    icon={<img src={RadioEmpty} alt="" />}
                                                                                    checkedIcon={<img src={RadioChecked} alt="" />}
                                                                                // onChange={() => setFieldValue("paymentMethod", 2)}
                                                                                // checked={(values.paymentMethod === 2) ? true : false}
                                                                                />
                                                                            }
                                                                            label={<span className="text-[13px]">Chưa xử lý</span>}
                                                                        />
                                                                    </RadioGroup>
                                                                </FormControl>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={"flex py-2"}>
                                                    <div className={"w-full flex items-center"}>
                                                        <div className={"h-full text-left flex items-center px-1 "}>
                                                            <span className="text-primary-gray font-bold pr-3">Giá trị phạt (nếu có):</span>
                                                            <input type="text" placeholder=""
                                                                className="w-[100px] h-[30px] border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search px-3 py-1 outline-none text-right"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={"flex py-2"}>
                                                    <div className={"w-full flex items-center"}>
                                                        <div className="my-2">
                                                            <div className="font-bold mb-2 text-primary-gray">Ảnh đính kèm</div>
                                                            <div className="flex gap-2">
                                                                <div>
                                                                    <img src={ImgDemoUpload} alt="" />
                                                                </div>
                                                                <div>
                                                                    <img src={ImgDemoUpload} alt="" />
                                                                </div>
                                                                <div>
                                                                    <img src={ImgDemoUpload} alt="" />
                                                                </div>
                                                                <div>
                                                                    <img src={ImgDemoUpload} alt="" />
                                                                </div>
                                                                <button>
                                                                    <img src={DemoUploadBtn} alt="" />
                                                                </button>
                                                                {/* img upload */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="my-3">
                                                <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtNote">
                                                    Ghi chú
                                                </label>
                                                <Field className="h-[60px] appearance-none border-0.5 border-cbs-bg-input-search bg-cbs-table-header rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none resize-none" as="textarea" id="txtNote" placeholder="Ghi chú" {...getFieldProps('note')} />
                                                <ErrorMessage
                                                    name="note"
                                                    component="span"
                                                    className="font-normal leading-7 text-sm text-negative"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right p-3 border-t-0.5 border-cbs-border" style={{ marginTop: "50px" }}>
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