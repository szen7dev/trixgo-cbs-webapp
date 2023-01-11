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
import classNames from 'classnames';

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
import { FileProp, FileProps, FilePropsUpload } from "typings/common";
import { Button, FormControl, FormControlLabel, MenuItem, Popover, Radio, RadioGroup, Select, SelectChangeEvent } from "@mui/material";
import { borderRadius } from "@mui/system";
import { GroupSearchable } from "shareComponents/common/GroupSearchable";
import { useGetUsersByCompany } from "services/hooks/auth/useAdmin";
import { useAuth } from "services/hooks/auth/useAuth";
import { DropdownSearchable } from "shareComponents/common";
import API from "apis/repository";

import { useUpload } from 'services/hooks/useUpload';
import { PostImage, PostFile } from 'shareComponents/common';
import { IconImage } from 'views/media/shareComponents/common';

interface InitialValues {
    fundaID: string,
    executorID: string,
    mistakeID: string,
    amount: number,
    note: string,
    files: Array<string>,
    status: number,
    type: number,
}

type Props = {
    defaultValues?: any;
}

export const ModalErrorDetailItem: FC<Props> = ({ defaultValues = {} }) => {
    const history = useHistory();
    const { closeModal } = useModal();
    const { user } = useAuth();

    const [isUploading, setIsUploading] = useState(false);
    const [tokens, setTokens] = useState<any[]>([]);

    const [mistakes, setMistakes] = useState<any>([]);
    const [employees, setEmployees] = useState<any>([]);
    const [fundas, setFundas] = useState<any>([]);

    const [mistakeSelected, setMistakeSelected] = useState<any>([]);
    const [employeeSelected, setEmployeeSelected] = useState<any>([]);
    const [fundaSelected, setFundaSelected] = useState<any>([]);

    const [searchMistake, setSearchMistake] = useState('');
    const [searchFunda, setSearchFunda] = useState('');
    const [searchEmployee, setSearchEmployee] = useState('');

    const [uploads, {
        setUploadImageProgress,
        setUploadFileProgress,
        setIDImageUploaded,
        setIDFileUploaded,
        setUploadImage,
        setUploadFile,
        removeAllFiles,
        removeUploadedImage,
        removeUploadedFile
    }] = useUploadFile({});

    const { addFileToUpload } = useUpload({
        appID: APP_ID.FNB.id,
        companyID: user?.company?._id,
    });

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

    const handleSetFiles = async (filesSelected: FileList | null) => {
        if (!filesSelected) return;

        const { error, message } = await validateFiles(filesSelected);
        if (error) return toast.warn(message);

        const [files, images] = modifyUploadedFilesV2({
            imgLastKey: Object.keys(uploads.images).length || null,
            fileLastKey: Object.keys(uploads.files).length || null,
        }, filesSelected);

        setIsUploading(true);
        setUploadImage(images);

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

        setIsUploading(false);
    }

    const handleRemoveUpload = (file: FileProps | FilePropsUpload, type: 'FILE' | 'IMAGE') => {
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

    const onSubmitFilterData = async (values: any) => {
        try {
            closeModal();

            let files: string[] = [];

            for (const [, { _id }] of Object.entries(uploads.images)) {
                _id && (files = [...files, _id]);
            }

            const dataInsert = {
                ...values,
                files,
                status: `${values.status}`,
                type: `${values.type}`,
                amount: `${values.amount}`,
                orderID: defaultValues.orderID,
            }

            const { data, status } = await API.post(
                `/api/fnb/mistakes`,
                dataInsert,
            );

            if (status !== 200 || data.error) {
                return toast.warning('Gán lỗi thất bại');
            }

            toast.success('Gán lỗi thành công');
        } catch (error) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            removeAllFiles();
        }
    };

    const handlePasteFile = (event: any) => {
        // event.preventDefault();

        if(event.clipboardData?.files?.length) {
          return handleSetFiles(event.clipboardData.files)
        }

        const text = event.clipboardData.getData('text/plain');
        text && window.document.execCommand('insertText', false, text);
    }

    useEffect(() => {
        const dropZone = document.getElementById("txtNote");

        const handleDragOver = (e: any) => {
            e.stopPropagation();
            e.preventDefault();
        }

        const handleDrop = (e: any) => {
            e.stopPropagation();
            e.preventDefault();
            if (e.dataTransfer) {
                handleSetFiles(e.dataTransfer.files);
            }
        }

        if (dropZone) {
            dropZone.addEventListener('dragover', handleDragOver);

            // Get file data on drop
            dropZone.addEventListener('drop', handleDrop);
        }

        return () => {
            if(dropZone) {
                dropZone.removeEventListener('dragover', handleDragOver);
                dropZone.removeEventListener('drop', handleDrop);
            }
        }
    }, [])

    const addTaskSchema = object().shape({
        fundaID: string().required("Vui lòng chọn cơ sở!"),
        executorID: string().required("Vui lòng chọn nhân sự!"),
        mistakeID: string().required("Vui lòng chọn lỗi!"),
    });

    const initialValues: InitialValues = {
        fundaID: "",
        executorID: "",
        mistakeID: "",
        amount: 0,
        note: "",
        files: [],
        status: 1,
        type: 1,
    };

    useEffect(() => {
        const fetchFundas = async () => {
          const response = await API.get(
            `/api/item/fundas?&isMember=1&keyword=${searchFunda}`,
          );
          const { data, status } = response?.data;

          if (status !== 200) return;

          setFundas(data.listRecords);
        }

        fetchFundas();
    }, [searchFunda])

    useEffect(() => {
        const fetchMistakes = async () => {
          const response = await API.get(
            `/api/item/doctypes?type=19&isShowParentAndChild=1&keyword=${searchMistake}`,
          );
          const { data, status } = response?.data;

          if (status !== 200) return;

          setMistakes(data.listRecords);
        }

        fetchMistakes();
    }, [searchMistake])

    useEffect(() => {
        const fetchEmployees = async () => {
          const response = await API.get(
            `/api/auth/users?companyID=${user?.company?._id}&keyword=${searchEmployee}`,
          );
          const { data, status } = response?.data;

          if (status !== 200) return;

          setEmployees(data.listRecords);
        }

        fetchEmployees();
    }, [searchEmployee])

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
                        const { setFieldValue, getFieldProps, values } = formik;
                        return (
                            <Form>
                                <div className={"t-add-new-task-dialog-select px-6 pb-4"}>
                                    <div className="flex gap-4 w-full">
                                        <div className="w-full ">
                                            <div className="my-3">
                                                <div className={"w-full flex items-start"}>
                                                    <div className={"max-w-1/2 w-1/2 h-full text-left  text-primary-gray font-bold text-[13px] flex items-center mr-2  h-full h-full"}>Lỗi mắc phải</div>
                                                    <div className={" flex-1 max-w-1/2 w-1/2 h-full h-full"}>
                                                        <DropdownSearchable
                                                            onchangeValue={(value: any) => {
                                                                // setMistakeSelected(value?.id);
                                                                setFieldValue("mistakeID", value?.id);
                                                            }}
                                                            onClearData={() => {
                                                                setFieldValue("mistakeID", "");
                                                            }}
                                                            onSearchInputChange={
                                                                debounce(
                                                                    (value) => setSearchMistake(value),
                                                                    200)
                                                            }
                                                            className={"max-w-full h-full flex-1 border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search placeholder-primary-gray"}
                                                            placeholder="Tìm kiếm lỗi"
                                                            isMultiple={false}
                                                            allowClearValueSingleInput={true}
                                                            showTriangle={false}
                                                            maxWidthInput="max-w-full"
                                                            renderSelectedItem={(item: any) => (
                                                                <div className="max-w-full">
                                                                    <p className={"truncate"}>{item.text}</p>
                                                                </div>
                                                            )}
                                                            data={mistakes.map((item: any) => ({
                                                                label: item.name,
                                                                value: item._id,
                                                            }))}
                                                            formatItem={{
                                                                id: "value",
                                                                text: "label",
                                                            }}
                                                            inlineSearch={true}
                                                        />
                                                        <ErrorMessage
                                                            name="mistakeID"
                                                            component="div"
                                                            className="font-normal text-xs text-negative pl-3"
                                                        />
                                                    </div>
                                                </div>
                                                {/* <div className="flex gap-2 mt-2">
                                                    {mistakeSelected?.map?.((item: any) => (
                                                        <div key={item._id} className="flex justify-between w-1/3 h-[40px] items-center border-0.5 border-cbs-border rounded-md px-2">
                                                            <div className="flex gap-2 items-center">
                                                                <span className="text-[13px]">{item.name}</span>
                                                            </div>
                                                            <button
                                                                onClick={() => {
                                                                    setMistakeSelected((prev: any) => {
                                                                        return prev.filter((p: any) => p._id !== item._id);
                                                                    })
                                                                }}
                                                            >
                                                                <img src={IconCancel} alt="" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div> */}
                                            </div>
                                            <div className="my-3">
                                                <div className={"w-full flex items-start"}>
                                                    <div className={"max-w-1/2 w-1/2 h-full text-left  text-primary-gray font-bold texxt-[13px] flex items-center mr-2  h-full h-full"}>Nhân sự mắc lỗi</div>
                                                    <div className={" flex-1 max-w-1/2 w-1/2 h-full h-full"}>
                                                        <DropdownSearchable
                                                            onchangeValue={(value: any) => {
                                                                setFieldValue('executorID', value?.id);
                                                            }}
                                                            onClearData={() => {
                                                                setFieldValue("executorID", "");
                                                            }}
                                                            onSearchInputChange={
                                                                debounce(
                                                                    (value) => setSearchEmployee(value),
                                                                    200)
                                                            }
                                                            className={"max-w-full h-full flex-1 border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search placeholder-primary-gray"}
                                                            placeholder="Tìm kiếm nhân sự"
                                                            isMultiple={false}
                                                            allowClearValueSingleInput={true}
                                                            showTriangle={false}
                                                            maxWidthInput="max-w-full"
                                                            renderSelectedItem={(item: any) => (
                                                                <div className="max-w-full">
                                                                    <p className={"truncate"}>{item.text}</p>
                                                                </div>
                                                            )}
                                                            data={employees.map((item: any) => ({
                                                                label: item.fullname,
                                                                value: item._id,
                                                            }))}
                                                            formatItem={{
                                                                id: "value",
                                                                text: "label",
                                                            }}
                                                            inlineSearch={true}
                                                        />
                                                        <ErrorMessage
                                                            name="executorID"
                                                            component="div"
                                                            className="font-normal text-xs text-negative pl-3"
                                                        />
                                                    </div>
                                                </div>
                                                {/*<div className="flex gap-2 mt-2">
                                                    {employeeSelected?.map?.((item: any) => (
                                                        <div key={item._id} className="flex justify-between w-1/3 h-[40px] items-center border-0.5 border-cbs-border rounded-md px-2">
                                                            <div className="flex gap-2 items-center">
                                                                <span className="text-[13px]">{item.fullname}</span>
                                                            </div>
                                                            <button
                                                                onClick={() => {
                                                                    setEmployeeSelected((prev: any) => {
                                                                        return prev.filter((p: any) => p._id !== item._id);
                                                                    })
                                                                }}
                                                            >
                                                                <img src={IconCancel} alt="" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div> */}
                                            </div>
                                            <div className="my-3">
                                                <div className={"w-full flex items-start"}>
                                                    <div className={"max-w-1/2 w-1/2 h-full text-left  text-primary-gray font-bold texxt-[13px] flex items-center mr-2  h-full h-full"}>Cơ sở</div>
                                                    <div className={" flex-1 max-w-1/2 w-1/2 h-full h-full"}>
                                                        <DropdownSearchable
                                                            onchangeValue={(value: any) => {
                                                                setFieldValue('fundaID', value?.id);
                                                            }}
                                                            onClearData={() => {
                                                                setFieldValue("fundaID", "");
                                                            }}
                                                            onSearchInputChange={
                                                                debounce(
                                                                    (value) => setSearchFunda(value),
                                                                    200)
                                                            }
                                                            className={"max-w-full h-full flex-1 border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search placeholder-primary-gray"}
                                                            placeholder="Tìm kiếm cơ sở"
                                                            isMultiple={false}
                                                            allowClearValueSingleInput={true}
                                                            showTriangle={false}
                                                            maxWidthInput="max-w-full"
                                                            renderSelectedItem={(item: any) => (
                                                                <div className="max-w-full">
                                                                    <p className={"truncate"}>{item.text}</p>
                                                                </div>
                                                            )}
                                                            data={fundas.map((funda: any) => ({
                                                                label: `${funda.sign}.${funda.name}`,
                                                                value: funda._id,
                                                            }))}
                                                            formatItem={{
                                                                id: "value",
                                                                text: "label",
                                                            }}
                                                            inlineSearch={true}
                                                        />
                                                        <ErrorMessage
                                                            name="fundaID"
                                                            component="div"
                                                            className="font-normal text-xs text-negative pl-3"
                                                        />
                                                    </div>
                                                </div>
                                                {/*<div className="flex gap-2 mt-2">
                                                    {fundaSelected?.map?.((item: any) => (
                                                        <div key={item._id} className="flex justify-between w-1/3 h-[40px] items-center border-0.5 border-cbs-border rounded-md px-2">
                                                            <div className="flex gap-2 items-center">
                                                                <span className="text-[13px]">{item.name}</span>
                                                            </div>
                                                            <button
                                                                onClick={() => {
                                                                    setFundaSelected((prev: any) => {
                                                                        return prev.filter((p: any) => p._id !== item._id);
                                                                    })
                                                                }}
                                                            >
                                                                <img src={IconCancel} alt="" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div> */}
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
                                                                        name="status"
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
                                                                                    onChange={() => setFieldValue("status", 1)}
                                                                                    // checked={(values.status === 1) ? true : false}
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
                                                                                    onChange={() => setFieldValue("status", 2)}
                                                                                    // checked={(values.status === 2) ? true : false}
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
                                                            <Field type="text" name="amount" placeholder=""
                                                                className="w-[100px] h-[30px] border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search px-3 py-1 outline-none text-right"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={"flex py-2"}>
                                                    <div className={"w-full flex items-center"}>
                                                        <div className="my-2 w-full">
                                                            <div className="font-bold flex items-center mb-2 text-primary-gray">
                                                                <span> Ảnh đính kèm </span>
                                                                <label className="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-300 flex justify-center items-center cursor-pointer ml-2">
                                                                    <IconImage />
                                                                    <input
                                                                        type="file"
                                                                        name="images"
                                                                        className="hidden"
                                                                        accept="image/*"
                                                                        multiple
                                                                        onChange={e => handleSetFiles(e.target.files)}
                                                                    />
                                                                </label>
                                                            </div>
                                                            <div
                                                                className={
                                                                    classNames("flex flex-wrap max-h-44 w-full pr-4 pl-12 py-2 custom-scroll overflow-x-hidden overflow-y-auto",
                                                                        (!Object.keys(uploads.images).length && !Object.keys(uploads.files).length) ? "h-0" : "")
                                                                }
                                                            >
                                                                <PostImage
                                                                    images={toArray(uploads.images)}
                                                                    onRemove={handleRemoveUpload}
                                                                    className="post__files-row pt-5 text-black gap-5 flex-wrap"
                                                                />
                                                            </div>
                                                            {/* <div className="flex gap-2">
                                                                
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
                                                                <button type="button">
                                                                    <img src={DemoUploadBtn} alt="" />
                                                                </button>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="my-3">
                                                <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtNote">
                                                    Ghi chú
                                                </label>
                                                <Field className="h-[60px] appearance-none border-0.5 border-cbs-bg-input-search bg-cbs-table-header rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none resize-none" as="textarea" id="txtNote" placeholder="Ghi chú" onPaste={handlePasteFile} {...getFieldProps('note')} />
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