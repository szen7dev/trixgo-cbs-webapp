/**
 * Libraries
 */
import { FC, useState } from "react";
import { Dialog } from '@headlessui/react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { DropdownSearchable } from "shareComponents/common";
import debounce from "lodash/debounce";
import { useParams } from "react-router-dom";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

/**
 * asset img
 */
import CheckBoxEmpty from "assets/images/Frame 3548.svg";
import CheckedBox from "assets/images/Check-All.svg";
import DemoAvatar from "assets/images/image 437.png";
import IconCancel from "assets/images/icons8-cancel-96 1.svg";

/**
 * Types, Services
 */
import "react-datepicker/dist/react-datepicker.css";
import { useFnbQuota } from 'services/hooks/fnb/useFnbQuota';
import { useGoods } from "services/hooks/items/useGoods";
import { useFnbShift } from 'services/hooks/fnb/useFnbShift';

const CreateFnbShiftDetail: FC<any> = ({ toggle, modalType, onConfirm, initialValues = {
    name: "",
    note: ""
} }) => {
    console.log({ initialValues })

    const { fundaID } = useParams<{ fundaID: string }>();
    const [keyword, setKeyword] = useState('');
    const { insertAsync, updateAsync, refetch } = useFnbShift({
        params: {
            keyword: "", fundaID, populates: JSON.stringify({
                path: 'goods', select: "name unit"
            })
        }, isFetchList: false, isFetchInfo: false
    });

    const handleSubmit = async (values: any) => {
        if (modalType == 'create') {
            const query = {
                ...values,
                fundaID,
                name: values.name,
                note: values.note,
            };

            console.log({ fundaID, name: values.name, note: values.note })

            const result = await insertAsync(query);
            if (!result.error) {
                refetch();
                toggle();
                toast.success('Tạo mới dữ liệu thành công');
            } else {
                toast.error(result?.data?.message);
            }
        };

        if (modalType == 'update') {
            const query = {
                ...values,
                shiftID: values._id,
                name: values.name,
                note: values.note,
            };
            const result = await updateAsync(query);
            if (!result.error) {
                refetch();
                toggle();
                toast.success('Cập nhật dữ liệu thành công');
            } else {
                toast.error(result?.data?.message);
            }
        };
    };

    const {
        deleteAsync,
        list: listGoods,
        hasNextPage,
        refetch: refetchGood,
        fetchNextPage,
        totalRecord
    } = useFnbShift({
        params: { keyword }, // Khi keyword thay đổi giá trị => API thay đổi data => refretch kết quả
        isFetchList: true
    });
    return (
        <Formik
            initialValues={initialValues}
            // validationSchema={companySchema}
            onSubmit={handleSubmit}
        >
            {
                formik => {
                    const { values, getFieldProps, setFieldValue } = formik;
                    return (
                        <Form autoComplete="off">
                            <div className="flex items-center px-6 py-2.5 justify-between border-b border-secondary-gray border-opacity-30">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg leading-6 font-bold"
                                >
                                    {modalType == 'create' ? 'Tạo ca làm việc' : 'Cập nhật ca làm việc'}
                                </Dialog.Title>
                                <button className="bg-primary-gray bg-opacity-20 p-2 rounded-3xl" type="button" onClick={() => toggle()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="px-6 mt-2 pt-3.5 flex-1 flex flex-col">
                                <div className="mb-4">
                                    <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtUnit">
                                        Tên
                                    </label>
                                    <Field className="appearance-none border-0.5 border-cbs-bg-input-search bg-cbs-table-header rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none " id="txtName" placeholder="Tên" {...getFieldProps('name')} />
                                    <ErrorMessage
                                        name="unit"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="ml-3">
                                    <span className="text-[13px] text-primary-gray">Phân loại mùa trong năm</span>
                                    <div  className="my-5">
                                        <FormControl sx={{ marginTop: "-5px" }} >
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="season"
                                            >
                                                <FormControlLabel
                                                    sx={{ width: "75px", marginLeft: "0", fontSize: "13px" }}
                                                    value="1"
                                                    // onChange={() => handleChangeType('off', product)}
                                                    // checked={(product.statusApp == 'off' || !product.statusApp) ? true : false}
                                                    control={
                                                        <Radio
                                                            style={{}}
                                                            icon={<img src={CheckBoxEmpty} alt="" />}
                                                            checkedIcon={<img src={CheckedBox} alt="" />}
                                                        />
                                                    }
                                                    label={<span className="text-[13px]">Xuân</span>}
                                                />
                                                <FormControlLabel
                                                    sx={{ width: "75px", marginLeft: "0" }}
                                                    value="2"
                                                    // onChange={() => handleChangeType('app', product)}
                                                    // checked={product.statusApp == 'app' ? true : false}
                                                    control={
                                                        <Radio
                                                            style={{}}
                                                            icon={<img src={CheckBoxEmpty} alt="" />}
                                                            checkedIcon={<img src={CheckedBox} alt="" />}
                                                        />
                                                    }
                                                    label={<span className="text-[13px]">Hạ</span>}
                                                />
                                                <FormControlLabel
                                                    sx={{ width: "75px", marginLeft: "0", fontSize: "13px" }}
                                                    value="3"
                                                    // onChange={() => handleChangeType('off', product)}
                                                    // checked={(product.statusApp == 'off' || !product.statusApp) ? true : false}
                                                    control={
                                                        <Radio
                                                            style={{}}
                                                            icon={<img src={CheckBoxEmpty} alt="" />}
                                                            checkedIcon={<img src={CheckedBox} alt="" />}
                                                        />
                                                    }
                                                    label={<span className="text-[13px]">Thu</span>}
                                                />
                                                <FormControlLabel
                                                    sx={{ width: "75px", marginLeft: "0" }}
                                                    value="4"
                                                    // onChange={() => handleChangeType('app', product)}
                                                    // checked={product.statusApp == 'app' ? true : false}
                                                    control={
                                                        <Radio
                                                            style={{}}
                                                            icon={<img src={CheckBoxEmpty} alt="" />}
                                                            checkedIcon={<img src={CheckedBox} alt="" />}
                                                        />
                                                    }
                                                    label={<span className="text-[13px]">Đông</span>}
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <span className="text-[13px] text-primary-gray">Phân loại ca trong ngày</span>
                                    <div className="my-5">
                                        <FormControl sx={{ marginTop: "-5px" }} >
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="shiftInDay"
                                            >
                                                <FormControlLabel
                                                    sx={{ width: "75px", marginLeft: "0", fontSize: "13px" }}
                                                    value="1"
                                                    // onChange={() => handleChangeType('off', product)}
                                                    // checked={(product.statusApp == 'off' || !product.statusApp) ? true : false}
                                                    control={
                                                        <Radio
                                                            style={{}}
                                                            icon={<img src={CheckBoxEmpty} alt="" />}
                                                            checkedIcon={<img src={CheckedBox} alt="" />}
                                                        />
                                                    }
                                                    label={<span className="text-[13px]">Sáng</span>}
                                                />
                                                <FormControlLabel
                                                    sx={{ width: "75px", marginLeft: "0" }}
                                                    value="2"
                                                    // onChange={() => handleChangeType('app', product)}
                                                    // checked={product.statusApp == 'app' ? true : false}
                                                    control={
                                                        <Radio
                                                            style={{}}
                                                            icon={<img src={CheckBoxEmpty} alt="" />}
                                                            checkedIcon={<img src={CheckedBox} alt="" />}
                                                        />
                                                    }
                                                    label={<span className="text-[13px]">Trưa</span>}
                                                />
                                                <FormControlLabel
                                                    sx={{ width: "75px", marginLeft: "0", fontSize: "13px" }}
                                                    value="3"
                                                    // onChange={() => handleChangeType('off', product)}
                                                    // checked={(product.statusApp == 'off' || !product.statusApp) ? true : false}
                                                    control={
                                                        <Radio
                                                            style={{}}
                                                            icon={<img src={CheckBoxEmpty} alt="" />}
                                                            checkedIcon={<img src={CheckedBox} alt="" />}
                                                        />
                                                    }
                                                    label={<span className="text-[13px]">Chiều</span>}
                                                />
                                                <FormControlLabel
                                                    sx={{ width: "75px", marginLeft: "0" }}
                                                    value="4"
                                                    // onChange={() => handleChangeType('app', product)}
                                                    // checked={product.statusApp == 'app' ? true : false}
                                                    control={
                                                        <Radio
                                                            style={{}}
                                                            icon={<img src={CheckBoxEmpty} alt="" />}
                                                            checkedIcon={<img src={CheckedBox} alt="" />}
                                                        />
                                                    }
                                                    label={<span className="text-[13px]">Tối</span>}
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="mb-4">
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
                                <div>
                                    <span className="text-[13px] text-primary-gray mb-3 ml-3">Nhân sự trong ca làm việc</span>
                                    <div className="flex gap-2 my-3">
                                        <div className="flex justify-between w-1/3 h-[40px] items-center border-0.5 border-cbs-border rounded-md px-3">
                                            <div className="flex gap-2  items-center">
                                                <img src={DemoAvatar} alt="" style={{ maxWidth: "24px", maxHeight: "24px" }} />
                                                <span className="text-[14px]">Tùng Chi-Wgo</span>
                                            </div>
                                            <button>
                                                <img src={IconCancel} alt="" />
                                            </button>
                                        </div>
                                        <div className="flex justify-between w-1/3 h-[40px] items-center border-0.5 border-cbs-border rounded-md px-3">
                                            <div className="flex gap-2  items-center">
                                                <img src={DemoAvatar} alt="" style={{ maxWidth: "24px", maxHeight: "24px" }} />
                                                <span className="text-[14px]">Tùng Chi-Wgo</span>
                                            </div>
                                            <button>
                                                <img src={IconCancel} alt="" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="my-3">
                                        <input type="text" placeholder="Tìm kiếm nhân sự"
                                            className="w-full h-[40px] rounded border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search px-3 py-1 outline-none "
                                        />
                                    </div>
                                    <div>
                                        <div className="w-full h-[40px] flex gap-2 items-center rounded border-0.5 border-cbs-border bg-cbs-light-blue px-3 mt-1">
                                            <img src={DemoAvatar} alt="" style={{ maxWidth: "24px", maxHeight: "24px" }} />
                                            <span className="text-[14px]">Tùng Chi-Wgo</span>
                                        </div>
                                        <div className="w-full h-[40px] flex gap-2 items-center rounded border-0.5 border-cbs-border bg-cbs-light-blue px-3 mt-1">
                                            <img src={DemoAvatar} alt="" style={{ maxWidth: "24px", maxHeight: "24px" }} />
                                            <span className="text-[14px]">Tùng Chi-Wgo</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end pt-5 px-6 pb-6 mb-0.5">
                                    <div>
                                        <button type="submit" className="px-7 py-3.5 rounded-md bg-primary text-white font-bold text-sm leading-4">Xác nhận</button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )
                }
            }
        </Formik>
    )
};

export default CreateFnbShiftDetail;