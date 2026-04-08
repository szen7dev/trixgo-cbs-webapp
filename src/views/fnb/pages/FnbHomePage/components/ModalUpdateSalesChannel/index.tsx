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
import { useFnbOrder } from 'services/hooks/fnb/useFnbOrder';

interface InitialValues {
    orderID: string,
    salesChannel: number,
}

type Props = {
    defaultValues?: any;
}

export const ModalUpdateSalesChannel: FC<Props> = ({ defaultValues = {} }) => {
    const history = useHistory();
    const { closeModal } = useModal();
    const { info, updateAsync, refetch } = useFnbOrder(
        {
            params: {
                orderID: defaultValues.orderID,
            },
            isFetchList: false,
            isFetchInfo: true
        }
    )

    const onSubmitUpdatePayment = async (values: any) => {
        try {
            closeModal();
            const { error, message, data } = await updateAsync(values);
            if(error){
                toast.error('Cập nhật thất bại');
            }
            toast.success('Cập nhật thành công');
        } catch (error) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            // removeAllFiles();
        }
    };

    const [initialValues, setInitialValues] = useState({orderID: defaultValues.orderID, salesChannel: 1 });

    useEffect(() => {
        if(info){
            setInitialValues({ orderID: info?._id, salesChannel: info?.salesChannel  })
        }
    }, [info])
  
    return (
        <>
            <div className={"flex flex-col"}>
                <div className={"flex w-full py-3 px-6 border-b"}>
                    <h4 className={"flex-1 text-lg font-bold text-left"}>Cập nhật kênh bán hàng</h4>
                    <div className={"flex items-center justify-center cursor-pointer"}>
                        <Close onClick={closeModal} />
                    </div>
                </div>
                {/* input select */}
                <Formik
                    // validationSchema={addTaskSchema}
                    initialValues={initialValues}
                    onSubmit={onSubmitUpdatePayment}
                    enableReinitialize
                >
                    {(formik) => {
                        const { setFieldValue, getFieldProps, values } = formik;
                        return (
                            <Form>
                                <div className={"t-add-new-task-dialog-select px-6 pb-4"}>
                                    <div className="flex gap-4 w-full">
                                        <div className="w-full ">
                                            <div className={"my-3"}>
                                                <div className={"flex py-2"}>
                                                    <div className={"w-full items-center"}>
                                                        <div className="my-2">
                                                            <div className="font-bold mb-2 text-primary-gray">Lưu ý: Chỉ áp dụng chuyển đổi giữa các kênh Food App - không chuyển đổi được giữa Food App và Offline</div>
                                                            <div>
                                                                <FormControl sx={{ marginTop: "-5px", marginLeft: "-9px" }} >
                                                                    <RadioGroup
                                                                        row
                                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                                        name="salesChannel"
                                                                        className="flex justify-between	"
                                                                        sx={{ flexWrap: "nowrap" }}
                                                                    >
                                                                        <FormControlLabel
                                                                            sx={{ marginLeft: "0", width: "75px" }}
                                                                            value="2"
                                                                            control={
                                                                                <Radio
                                                                                    style={{}}
                                                                                    icon={<img src={RadioEmpty} alt="" />}
                                                                                    checkedIcon={<img src={RadioChecked} alt="" />}
                                                                                    onChange={() => setFieldValue("salesChannel", 2)}
                                                                                    checked={(values?.salesChannel === 2) ? true : false}
                                                                                />
                                                                            }
                                                                            label={<span className="text-[13px]">Grab</span>}
                                                                        />
                                                                        <FormControlLabel
                                                                            sx={{ marginLeft: "0", width: "75px" }}
                                                                            value="3"
                                                                            control={
                                                                                <Radio
                                                                                    style={{}}
                                                                                    icon={<img src={RadioEmpty} alt="" />}
                                                                                    checkedIcon={<img src={RadioChecked} alt="" />}
                                                                                    onChange={() => setFieldValue("salesChannel", 3)}
                                                                                    checked={(values?.salesChannel === 3) ? true : false}
                                                                                />
                                                                            }
                                                                            label={<span className="text-[13px]">Shopee</span>}
                                                                        />
                                                                        <FormControlLabel
                                                                            sx={{ marginLeft: "0", width: "75px" }}
                                                                            value="7"
                                                                            control={
                                                                                <Radio
                                                                                    style={{}}
                                                                                    icon={<img src={RadioEmpty} alt="" />}
                                                                                    checkedIcon={<img src={RadioChecked} alt="" />}
                                                                                    onChange={() => setFieldValue("salesChannel", 7)}
                                                                                    checked={(values?.salesChannel === 7) ? true : false}
                                                                                />
                                                                            }
                                                                            label={<span className="text-[13px]">Be</span>}
                                                                        />
                                                                        <FormControlLabel
                                                                            sx={{ marginLeft: "0", width: "75px" }}
                                                                            value="5"
                                                                            control={
                                                                                <Radio
                                                                                    style={{}}
                                                                                    icon={<img src={RadioEmpty} alt="" />}
                                                                                    checkedIcon={<img src={RadioChecked} alt="" />}
                                                                                    onChange={() => setFieldValue("salesChannel", 12)}
                                                                                    checked={(values?.salesChannel === 12) ? true : false}
                                                                                />
                                                                            }
                                                                            label={<span className="text-[13px]">Xanh Ngon</span>}
                                                                        />
                                                                        <FormControlLabel
                                                                            sx={{ marginLeft: "0", width: "75px" }}
                                                                            value="6"
                                                                            control={
                                                                                <Radio
                                                                                    style={{}}
                                                                                    icon={<img src={RadioEmpty} alt="" />}
                                                                                    checkedIcon={<img src={RadioChecked} alt="" />}
                                                                                    onChange={() => setFieldValue("salesChannel", 13)}
                                                                                    checked={(values?.salesChannel === 13) ? true : false}
                                                                                />
                                                                            }
                                                                            label={<span className="text-[13px]">E-GetS</span>}
                                                                        />
                                                                    </RadioGroup>
                                                                </FormControl>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right p-3 border-t-0.5 border-cbs-border">
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