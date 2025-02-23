/**
 * Libraries
 */
import { FC, useState } from "react";
import { Dialog } from '@headlessui/react';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import debounce from "lodash/debounce";
import { useParams } from "react-router-dom";

/**
 * asset img
 */
import IconCancel from "assets/images/icons8-cancel-96 1.svg";

/**
 * Types, Services
 */
import "react-datepicker/dist/react-datepicker.css";
import { useStoreVoucher } from 'services/hooks/store/useStoreVoucher';
import { useCustomer } from "services/hooks/items/useCustomer";

const CreateFnbVoucherDetail: FC<any> = ({ toggle, modalType, onConfirm, initialValues = {

} }) => {
    const { voucherID } = useParams<{ voucherID: string }>();
    
    const [keywordUser, setKeywordUser] = useState("");
    const [membersSelected, setMemberSelected] = useState<any>(initialValues?.staffs ?? []);

    const {
        list: listContacts,
    } = useCustomer({
        params: { 
            keyword: keywordUser, 
        },
        isFetchList: true,
    });

    const { updateAsync } = useStoreVoucher({
        params: {
            keyword: "", voucherID, populates: JSON.stringify({
                path: 'goods', select: "name unit"
            })
        }, isFetchList: false, isFetchInfo: false
    });

    const handleSubmit = async (values: any) => {
        const staffsID = membersSelected.map((m: any) => m._id);

        const query = {
            ...values,
            voucherID,
            receivers:staffsID,
        };

        const result = await updateAsync(query);
        if (!result.error) {
            toast.success('Cập nhật dữ liệu thành công');
        } else {
            toast.error(result?.data?.message);
        }

        toggle();
        onConfirm?.();
    };

    const handleAddMemberToShift = (member: any) => {
        const isExists = membersSelected.find((m: any) => m._id === member._id);

        if(isExists) return toast.warning('Khách hàng đã được chọn');

        setMemberSelected((prev: any) => ([...prev, member]));
    }

    const handleRemoveMemberToShift = (member: any) => {
        const newMembers = membersSelected.filter((m: any) => m._id !== member._id);
        setMemberSelected(newMembers);
    }

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
                                    {modalType == 'create' ? 'Cấp phát voucher' : 'Cấp phát voucher'}
                                </Dialog.Title>
                                <button className="bg-primary-gray bg-opacity-20 p-2 rounded-3xl" type="button" onClick={() => toggle()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="px-6 mt-2 pt-3.5 flex-1 flex flex-col">
                                <div>
                                    <div className="flex gap-2 my-3 flex-wrap">
                                        {membersSelected.map((member: any) => (
                                            <div key={member._id} className="flex justify-between w-1/3 h-[40px] items-center border-0.5 border-cbs-border rounded-md px-3">
                                                <div className="flex gap-2 items-center">
                                                    <span className="text-[14px]">{member.name}-{member.phone}</span>
                                                </div>
                                                <button onClick={() => handleRemoveMemberToShift(member)}>
                                                    <img src={IconCancel} alt="" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="my-1">
                                        <input type="text" placeholder="Tìm kiếm khách hàng"
                                            className="w-full h-[40px] rounded border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search px-3 py-1 outline-none "
                                            onChange={debounce((e) => setKeywordUser(e.target.value), 200)}
                                       />
                                    </div>
                                    <div>
                                        {
                                            listContacts.map((member: any) => {
                                                return (
                                                    <div onClick={() => handleAddMemberToShift(member)} className="cursor-pointer w-full h-[40px] flex gap-2 items-center rounded border-0.5 border-cbs-border bg-cbs-light-blue px-3 mt-1" key={member._id}>
                                                        <span className="text-[14px]">{member.name}-{member.phone}</span>
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

export default CreateFnbVoucherDetail;