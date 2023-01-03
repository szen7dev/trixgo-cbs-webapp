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
import { useFnbOrder } from 'services/hooks/fnb/useFnbOrder';

interface InitialValues {
    orderID: string,
    paymentMethod: number,
}

type Props = {
    defaultValues?: any;
}

export const ModalUpdatePayment: FC<Props> = ({ defaultValues = {} }) => {
    const history = useHistory();
    const { closeModal } = useModal();
    const { info, updateAsync, refetch } = useFnbOrder(
        {
            params: {
                orderID: defaultValues.orderID,
                // populates: JSON.stringify({
                //     path: 'funda shift customer userCreate',
                //     select: "name sign address fullname phone bankAccount",
                // })
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

    // const addTaskSchema = object().shape({
    //     fundaID: string().required("Vui lòng chọn cơ sở!"),
    //     executorID: string().required("Vui lòng chọn nhân sự!"),
    //     mistakeID: string().required("Vui lòng chọn lỗi!"),
    // });
    const [initialValues, setInitialValues] = useState({orderID: defaultValues.orderID, paymentMethod: 1 });

    useEffect(() => {
        if(info){
            setInitialValues({ orderID: info?._id, paymentMethod: info?.paymentMethod  })
        }
    }, [info])
  
    return (
        <>
            <div className={"flex flex-col"}>
                <div className={"flex w-full py-3 px-6 border-b"}>
                    <h4 className={"flex-1 text-lg font-bold text-left"}>Cập nhật phương thức thanh toán</h4>
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
                                                            <div className="font-bold mb-2 text-primary-gray">Phương thức thanh toán</div>
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
                                                                                    onChange={() => setFieldValue("paymentMethod", 1)}
                                                                                    checked={(values?.paymentMethod === 1) ? true : false}
                                                                                />
                                                                            }
                                                                            label={<span className="text-[13px]">Tiền mặt</span>}
                                                                        />
                                                                        <FormControlLabel
                                                                            sx={{ marginLeft: "0", width: "300px" }}
                                                                            value="2"
                                                                            control={
                                                                                <Radio
                                                                                    style={{}}
                                                                                    icon={<img src={RadioEmpty} alt="" />}
                                                                                    checkedIcon={<img src={RadioChecked} alt="" />}
                                                                                    onChange={() => setFieldValue("paymentMethod", 2)}
                                                                                    checked={(values?.paymentMethod === 2) ? true : false}
                                                                                />
                                                                            }
                                                                            label={<span className="text-[13px]">Chuyển khoản</span>}
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