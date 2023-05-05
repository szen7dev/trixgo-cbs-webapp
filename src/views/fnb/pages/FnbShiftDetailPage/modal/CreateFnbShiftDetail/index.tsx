/**
 * Libraries
 */
import { FC, useState } from "react";
import { Dialog } from '@headlessui/react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import debounce from "lodash/debounce";
import { useParams } from "react-router-dom";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

/**
 * asset img
 */
import CheckBoxEmpty from "assets/images/Frame 3548.svg";
import CheckedBox from "assets/images/Check-All.svg";
import IconCancel from "assets/images/icons8-cancel-96 1.svg";

/**
 * Types, Services
 */
import "react-datepicker/dist/react-datepicker.css";
import { useFnbShift } from 'services/hooks/fnb/useFnbShift';
import { useGetUsersByCompany } from "services/hooks/auth/useAdmin";

const CreateFnbShiftDetail: FC<any> = ({ toggle, modalType, onConfirm, companyID, initialValues = {
    name: "",
    note: ""
} }) => {
    const { fundaID } = useParams<{ fundaID: string }>();
    const [keywordUser, setKeywordUser] = useState("");
    const [membersSelected, setMemberSelected] = useState<any>(initialValues?.staffs ?? []);
    const [submembersSelected, setSubmemberSelected] = useState<any>(initialValues?.subStaffs ?? []);

    const { listMembers } = useGetUsersByCompany(companyID, keywordUser);
    const { insertAsync, updateAsync, refetch } = useFnbShift({
        params: {
            keyword: "", fundaID, populates: JSON.stringify({
                path: 'goods', select: "name unit"
            })
        }, isFetchList: false, isFetchInfo: false
    });

    const handleSubmit = async (values: any) => {
        const staffsID = membersSelected.map((m: any) => m._id); 
        const subStaffsID = submembersSelected.map((m: any) => m._id); 

        if (modalType == 'create') {
            const query = {
                ...values,
                fundaID,
                staffsID,
                subStaffsID,
            };

            const result = await insertAsync(query);
            if (!result.error) {
                toast.success('Tạo mới dữ liệu thành công');
            } else {
                toast.error(result?.data?.message);
            }
        };
        
        if (modalType == 'update') {
            const query = {
                ...values,
                staffsID,
                subStaffsID,
                shiftID: values._id,
                name: values.name,
                note: values.note,
                seasons: values.seasons,
                shiftType: values.shiftType,
                paidStatus: values.paidStatus,
                openingCash: Number(values.openingCash),
                incurredCash: Number(values.incurredCash),
                closingCash: Number(values.closingCash),
                workingHours: Number(values.workingHours),
                subWorkingHours: Number(values.subWorkingHours),
                numberOfOpeningSizeM: Number(values.numberOfOpeningSizeM),
                numberOfOpeningSizeL: Number(values.numberOfOpeningSizeL),
                numberOfEotSizeM: Number(values.numberOfEotSizeM),
                numberOfEotSizeL: Number(values.numberOfEotSizeL),
            };
            const result = await updateAsync(query);
            if (!result.error) {
                toast.success('Cập nhật dữ liệu thành công');
            } else {
                toast.error(result?.data?.message);
            }
        };

        toggle();
        onConfirm?.();
    };

    // Add nhân sự ca chính
    const handleAddMemberToShift = (member: any) => {
        const isExists = membersSelected.find((m: any) => m._id === member._id);

        if(isExists) return toast.warning('User đã được chọn');

        setMemberSelected((prev: any) => ([...prev, member]));
    }
    
    // Add nhân sự ca gãy
    const handleAddSubmemberToShift = (member: any) => {
        const isExists = submembersSelected.find((m: any) => m._id === member._id);

        if(isExists) return toast.warning('User đã được chọn');

        setSubmemberSelected((prev: any) => ([...prev, member]));
    }

    const handleRemoveMemberToShift = (member: any) => {
        const newMembers = membersSelected.filter((m: any) => m._id !== member._id);
        setMemberSelected(newMembers);
    }

    const handleRemoveSubmemberToShift = (member: any) => {
        const newSubmembers = submembersSelected.filter((m: any) => m._id !== member._id);
        setSubmemberSelected(newSubmembers);
    }

    // const {
    //     deleteAsync,
    //     list: listGoods,
    //     hasNextPage,
    //     refetch: refetchGood,
    //     fetchNextPage,
    //     totalRecord
    // } = useFnbShift({
    //     params: { keyword }, // Khi keyword thay đổi giá trị => API thay đổi data => refretch kết quả
    //     isFetchList: true
    // });

    return (
        <Formik
            initialValues={initialValues}
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
                                    <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtName">
                                        Tên
                                    </label>
                                    <Field className="appearance-none border-0.5 border-cbs-bg-input-search bg-cbs-table-header rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none " id="txtName" placeholder="Tên" {...getFieldProps('name')} />
                                    <ErrorMessage
                                        name="name"
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
                                                name="seasons"
                                                defaultValue={initialValues?.seasons ?? 1}
                                            >
                                                <FormControlLabel
                                                    sx={{ width: "75px", marginLeft: "0", fontSize: "13px" }}
                                                    value="1"
                                                    onChange={() => setFieldValue('seasons', 1)}
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
                                                    onChange={() => setFieldValue('seasons', 2)}
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
                                                    onChange={() => setFieldValue('seasons', 3)}
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
                                                    onChange={() => setFieldValue('seasons', 4)}
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
                                                name="shiftType"
                                                defaultValue={initialValues?.shiftType ?? 1}
                                            >
                                                <FormControlLabel
                                                    sx={{ width: "75px", marginLeft: "0", fontSize: "13px" }}
                                                    value="1"
                                                    onChange={() => setFieldValue('shiftType', 1)}
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
                                                    onChange={() => setFieldValue('shiftType', 2)}
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
                                                    sx={{ width: "75px", marginLeft: "0", fontSize: "13px" }}
                                                    value="3"
                                                    onChange={() => setFieldValue('shiftType', 3)}
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
                                    <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtOpeningCash">
                                        Tiền đầu ca để lại đổi cho khách
                                    </label>
                                    <Field className="appearance-none border-0.5 border-cbs-bg-input-search bg-cbs-table-header rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none " id="txtOpeningCash" placeholder="Tiền đầu ca-tiền lẻ để lại đổi cho khách" {...getFieldProps('openingCash')} />
                                    <ErrorMessage
                                        name="openingCash"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtIncurredCash">
                                        Chi phí trong ca
                                    </label>
                                    <Field className="appearance-none border-0.5 border-cbs-bg-input-search bg-cbs-table-header rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none " id="txtIncurredCash" placeholder="Chi phí trong ca" {...getFieldProps('incurredCash')} />
                                    <ErrorMessage
                                        name="incurredCash"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtClosingCash">
                                        Tiền kiểm kê cuối ca
                                    </label>
                                    <Field className="appearance-none border-0.5 border-cbs-bg-input-search bg-cbs-table-header rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none " id="txtClosingCash" placeholder="Tiền kiểm kê cuối ca" {...getFieldProps('closingCash')} />
                                    <ErrorMessage
                                        name="closingCash"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="ml-3">
                                    <span className="text-[13px] text-primary-gray">Tình trạng nộp tiền</span>
                                    <div className="my-5">
                                        <FormControl sx={{ marginTop: "-5px" }} >
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="paidStatus"
                                                defaultValue={initialValues?.paidStatus ?? 1}
                                            >
                                                <FormControlLabel
                                                    sx={{ width: "150px", marginLeft: "0", fontSize: "13px" }}
                                                    value="1"
                                                    onChange={() => setFieldValue('paidStatus', 1)}
                                                    control={
                                                        <Radio
                                                            style={{}}
                                                            icon={<img src={CheckBoxEmpty} alt="" />}
                                                            checkedIcon={<img src={CheckedBox} alt="" />}
                                                        />
                                                    }
                                                    label={<span className="text-[13px]">Chưa nộp</span>}
                                                />
                                                <FormControlLabel
                                                    sx={{ width: "150px", marginLeft: "0" }}
                                                    value="2"
                                                    onChange={() => setFieldValue('paidStatus', 2)}
                                                    control={
                                                        <Radio
                                                            style={{}}
                                                            icon={<img src={CheckBoxEmpty} alt="" />}
                                                            checkedIcon={<img src={CheckedBox} alt="" />}
                                                        />
                                                    }
                                                    label={<span className="text-[13px]">Đã nộp</span>}
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
                                <div className="mb-4">
                                    <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtNumberOfOpeningSizeM">
                                        Số cốc size M đầu ca
                                    </label>
                                    <Field className="appearance-none border-0.5 border-cbs-bg-input-search bg-cbs-table-header rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none " id="txtNumberOfOpeningSizeM" placeholder="Số cốc size M đầu ca" {...getFieldProps('numberOfOpeningSizeM')} />
                                    <ErrorMessage
                                        name="numberOfOpeningSizeM"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtNumberOfEotSizeM">
                                        Số cốc size M cuối ca
                                    </label>
                                    <Field className="appearance-none border-0.5 border-cbs-bg-input-search bg-cbs-table-header rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none " id="txtNumberOfEotSizeM" placeholder="Số cốc size M cuối ca" {...getFieldProps('numberOfEotSizeM')} />
                                    <ErrorMessage
                                        name="numberOfEotSizeM"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtNumberOfOpeningSizeL">
                                        Số cốc size L đầu ca
                                    </label>
                                    <Field className="appearance-none border-0.5 border-cbs-bg-input-search bg-cbs-table-header rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none " id="txtNumberOfOpeningSizeL" placeholder="Số cốc size L đầu ca" {...getFieldProps('numberOfOpeningSizeL')} />
                                    <ErrorMessage
                                        name="numberOfOpeningSizeL"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtNumberOfEotSizeL">
                                        Số cốc size L cuối ca
                                    </label>
                                    <Field className="appearance-none border-0.5 border-cbs-bg-input-search bg-cbs-table-header rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none " id="txtNumberOfEotSizeL" placeholder="Số cốc size L cuối ca" {...getFieldProps('numberOfEotSizeL')} />
                                    <ErrorMessage
                                        name="numberOfEotSizeL"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtWorkingHours">
                                        Số giờ làm việc ca chính
                                    </label>
                                    <Field className="appearance-none border-0.5 border-cbs-bg-input-search bg-cbs-table-header rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none " id="txtClosingCash" placeholder=" Số giờ làm việc ca chính" {...getFieldProps('workingHours')} />
                                    <ErrorMessage
                                        name="workingHours"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtSubWorkingHours">
                                        Số giờ làm việc ca phụ
                                    </label>
                                    <Field className="appearance-none border-0.5 border-cbs-bg-input-search bg-cbs-table-header rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none " id="txtClosingCash" placeholder=" Số giờ làm việc ca phụ" {...getFieldProps('subWorkingHours')} />
                                    <ErrorMessage
                                        name="subWorkingHours"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div>
                                    <span className="text-[13px] text-primary-gray mb-2 ml-3">Nhân sự ca chính</span>
                                    <div className="flex gap-2 my-3 flex-wrap">
                                        {membersSelected.map((member: any) => (
                                            <div key={member._id} className="flex justify-between w-1/3 h-[40px] items-center border-0.5 border-cbs-border rounded-md px-3">
                                                <div className="flex gap-2 items-center">
                                                    <img src={`${process.env.REACT_APP_URL_S3_USER}/${member.image}`} alt={member.fullname} style={{ maxWidth: "24px", maxHeight: "24px" }} />
                                                    <span className="text-[14px]">{member.fullname}</span>
                                                </div>
                                                <button onClick={() => handleRemoveMemberToShift(member)}>
                                                    <img src={IconCancel} alt="" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="my-1">
                                        <input type="text" placeholder="Tìm kiếm nhân sự"
                                            className="w-full h-[40px] rounded border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search px-3 py-1 outline-none "
                                            onChange={debounce((e) => setKeywordUser(e.target.value), 200)}
                                       />
                                    </div>
                                    <div>
                                        {
                                            listMembers.map((member: any) => {
                                                return (
                                                    <div onClick={() => handleAddMemberToShift(member)} className="cursor-pointer w-full h-[40px] flex gap-2 items-center rounded border-0.5 border-cbs-border bg-cbs-light-blue px-3 mt-1" key={member._id}>
                                                        <img src={`${process.env.REACT_APP_URL_S3_USER}/${member.image}`} alt="" style={{ maxWidth: "24px", maxHeight: "24px" }} />
                                                        <span className="text-[14px]">{member.fullname}</span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="mb-2 mt-3">
                                    <span className="text-[13px] text-primary-gray ml-3">Nhân sự ca gãy</span>
                                    <div className="flex gap-2 my-3 flex-wrap">
                                        {submembersSelected.map((member: any) => (
                                            <div key={member._id} className="flex justify-between w-1/3 h-[40px] items-center border-0.5 border-cbs-border rounded-md px-3">
                                                <div className="flex gap-2 items-center">
                                                    <img src={`${process.env.REACT_APP_URL_S3_USER}/${member.image}`} alt={member.fullname} style={{ maxWidth: "24px", maxHeight: "24px" }} />
                                                    <span className="text-[14px]">{member.fullname}</span>
                                                </div>
                                                <button onClick={() => handleRemoveSubmemberToShift(member)}>
                                                    <img src={IconCancel} alt="" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="my-1">
                                        <input type="text" placeholder="Tìm kiếm nhân sự"
                                            className="w-full h-[40px] rounded border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search px-3 py-1 outline-none "
                                            onChange={debounce((e) => setKeywordUser(e.target.value), 200)}
                                       />
                                    </div>
                                    <div>
                                        {
                                            listMembers.map((member: any) => {
                                                return (
                                                    <div onClick={() => handleAddSubmemberToShift(member)} className="cursor-pointer w-full h-[40px] flex gap-2 items-center rounded border-0.5 border-cbs-border bg-cbs-light-blue px-3 mt-1" key={member._id}>
                                                        <img src={`${process.env.REACT_APP_URL_S3_USER}/${member.image}`} alt="" style={{ maxWidth: "24px", maxHeight: "24px" }} />
                                                        <span className="text-[14px]">{member.fullname}</span>
                                                    </div>
                                                )
                                            })
                                        }
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