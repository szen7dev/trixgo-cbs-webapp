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
import { useDoctype } from "services/hooks/items/useDoctype";
import { Doctype } from "typings/items";

/**
 * Types, Services
 */
import "react-datepicker/dist/react-datepicker.css";
import { useFnbGeneralBook } from 'services/hooks/fnb/useFnbGeneralBook';

const CreateFnbStoreImport: FC<any> = ({ toggle, modalType, onConfirm, companyID, initialValues = {
    date: "",
    name: "",
    note: "",
    plan: 1,
    outin: 1,
    revenueType: 1,
    expenseType:1,
    appExpenseType: 1,
    storeType: 1,
} }) => {
    const { fundaID } = useParams<{ fundaID: string }>();
    const [keyword, setKeyword] = useState('');
    const [keywordDoctype, setKeywordDoctype] = useState('');
    const { insertAsync, updateAsync, refetch } = useFnbGeneralBook({
        params: {
            keyword: "", fundaID, 
        }, isFetchList: false, isFetchInfo: false
    });

    const handleSubmit = async (values: any) => {
        console.log({values});
        if (modalType == 'create') {
            const query = {
                ...values,
                campaignName: values.campaignName._id,
                fundaID,
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
                bookID: values._id,
                campaignName: values.campaignName._id,
                name: values.name,
                note: values.note,
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

    const {
        deleteManyAsync,
        list: listDoctypes,
        hasNextPage: hasNextPageDoctype,
        refetch: refetchListDoctype,
        fetchNextPage: fetchNextPageDoctype,
        totalRecord
    } = useDoctype({
        params: {
            type: 22,
            keyword: keywordDoctype
        },
        isFetchList: true
    });
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
                                    {modalType == 'create' ? 'Tạo' : 'Cập nhật'}
                                </Dialog.Title>
                                <button className="bg-primary-gray bg-opacity-20 p-2 rounded-3xl" type="button" onClick={() => toggle()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="px-6 mt-2 pt-3.5 flex-1 flex flex-col">
                                <div className="mb-4">
                                    <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtDate">
                                        Ngày tháng
                                    </label>
                                    <Field className="w-full mt-2 rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header" id="txtDate" placeholder="Ngày tháng" {...getFieldProps('date')} />
                                    <ErrorMessage
                                        name="name"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtName">
                                        Tên
                                    </label>
                                    <Field className="w-full mt-2 rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header" id="txtName" placeholder="Tên" {...getFieldProps('name')} />
                                    <ErrorMessage
                                        name="name"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtSign">
                                        Mã hiệu
                                    </label>
                                    <Field className="w-full mt-2 rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header" id="txtNote" placeholder="Mã hiệu" {...getFieldProps('sign')} />
                                    <ErrorMessage
                                        name="sign"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                           
                                <div className="mb-4">
                                    <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtNote">
                                        Ghi chú
                                    </label>
                                    <Field className="w-full mt-2 rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header" as="textarea" id="txtNote" placeholder="Ghi chú" {...getFieldProps('note')} />
                                    <ErrorMessage
                                        name="note"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtCampaignName">
                                        Chiến dịch
                                    </label>
                                    <DropdownSearchable
                                        onchangeValue={(value: any) => {
                                            setFieldValue("campaignName", {value, _id: value.id });
                                        }}
                                        onClearData={() => {
                                            setFieldValue("campaignName", "");
                                        }}
                                        onSearchInputChange={debounce((value: any) => setKeywordDoctype(value), 600)}
                                        // onScroll={handleScroll}
                                        className="w-full mt-2 rounded-md border border-primary-border px-1 py-1 placeholder-primary-gray bg-cbs-table-header"
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
                                        data={ 
                                            listDoctypes?.map((doctype: any) =>  ({
                                                label: doctype.name,
                                                value: doctype._id,
                                            }))
                                        }
                                        initialValue={{
                                            value: initialValues?.campaignName?._id || "", 
                                            label: initialValues?.campaignName?.name || "Chọn chiến dịch"
                                        }}
                                        formatItem={{
                                            id: "value",
                                            text: "label",
                                        }}
                                        inlineSearch={true}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtPlan">
                                       Kế hoạch, thực tế
                                    </label>
                                    <div className={" flex items-center"}>
                                        <div className={"flex items-center"}>
                                            <Field type="radio" name="plan" value={1} className={"form-check-input mt-0"} onChange={() => setFieldValue('plan', 1)} />
                                            <label htmlFor="plan" className={"text-left ml-3"}>Kế hoạch</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="plan" value={2} className={"form-check-input mt-0"} onChange={() => setFieldValue('plan', 2)}/>
                                            <label htmlFor="plan" className={"text-left ml-3"}>Thực tế</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtOutin">
                                        Doanh thu, chi phí
                                    </label>
                                    <div className={" flex items-center"}>
                                        <div className={"flex items-center"}>
                                            <Field type="radio" name="outin" value={1} className={"form-check-input mt-0"} onChange={() => setFieldValue('outin', 1)} />
                                            <label htmlFor="outin" className={"text-left ml-3"}>Doanh thu</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="outin" value={2} className={"form-check-input mt-0"} onChange={() => setFieldValue('outin', 2)}/>
                                            <label htmlFor="outin" className={"text-left ml-3"}>Chi phí</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtRevenueType">
                                        Phân loại, doanh thu
                                    </label>
                                    <div className={" flex items-center"}>
                                        <div className={"flex items-center"}>
                                            <Field type="radio" name="revenueType" value={1} className={"form-check-input mt-0"} onChange={() => setFieldValue('revenueType', 1)} />
                                            <label htmlFor="revenueType" className={"text-left ml-3"}>Offline</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="revenueType" value={2} className={"form-check-input mt-0"} onChange={() => setFieldValue('revenueType', 2)} />
                                            <label htmlFor="revenueType" className={"text-left ml-3"}>Grab</label>
                                        </div>

                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="revenueType" value={3} className={"form-check-input mt-0"} onChange={() => setFieldValue('revenueType', 3)} />
                                            <label htmlFor="revenueType" className={"text-left ml-3"}>Shopee</label>
                                        </div>

                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="revenueType" value={4} className={"form-check-input mt-0"} onChange={() => setFieldValue('revenueType', 4)} />
                                            <label htmlFor="revenueType" className={"text-left ml-3"}>Gojek</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="revenueType" value={5} className={"form-check-input mt-0"} onChange={() => setFieldValue('revenueType', 5)} />
                                            <label htmlFor="revenueType" className={"text-left ml-3"}>Baemin</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="revenueType" value={6} className={"form-check-input mt-0"} onChange={() => setFieldValue('revenueType', 6)} />
                                            <label htmlFor="revenueType" className={"text-left ml-3"}>Loship</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="revenueType" value={7} className={"form-check-input mt-0"} onChange={() => setFieldValue('revenueType', 7)} />
                                            <label htmlFor="revenueType" className={"text-left ml-3"}>Bee</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtExpenseType">
                                        Phân loại, chi phí
                                    </label>
                                    <div className={" flex items-center"}>
                                        <div className={"flex items-center"}>
                                            <Field type="radio" name="expenseType" value={1} className={"form-check-input mt-0"} onChange={() => setFieldValue('expenseType', 1)} />
                                            <label htmlFor="expenseType" className={"text-left ml-3"}>Food App</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="expenseType" value={2} className={"form-check-input mt-0"} onChange={() => setFieldValue('expenseType', 2)} />
                                            <label htmlFor="expenseType" className={"text-left ml-3"}>Nguyên liệu</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="expenseType" value={3} className={"form-check-input mt-0"} onChange={() => setFieldValue('expenseType', 3)} />
                                            <label htmlFor="expenseType" className={"text-left ml-3"}>Thuê mặt bằng</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="expenseType" value={4} className={"form-check-input mt-0"} onChange={() => setFieldValue('expenseType', 4)} />
                                            <label htmlFor="expenseType" className={"text-left ml-4"}>Nhân viên</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="expenseType" value={5} className={"form-check-input mt-0"} onChange={() => setFieldValue('expenseType', 5)} />
                                            <label htmlFor="expenseType" className={"text-left ml-5"}>Quản lý</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="expenseType" value={6} className={"form-check-input mt-0"} onChange={() => setFieldValue('expenseType', 6)} />
                                            <label htmlFor="expenseType" className={"text-left ml-3"}>Bảo trì</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="expenseType" value={7} className={"form-check-input mt-0"} onChange={() => setFieldValue('expenseType', 7)} />
                                            <label htmlFor="expenseType" className={"text-left ml-3"}>Khác</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtStoreType">
                                        Phân loại nhập, xuất
                                    </label>
                                    <div className={" flex items-center"}>
                                        <div className={"flex items-center"}>
                                            <Field type="radio" name="storeType" value={1} className={"form-check-input mt-0"} onChange={() => setFieldValue('storeType', 1)} />
                                            <label htmlFor="storeType" className={"text-left ml-3"}>Nhập kho</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="storeType" value={2} className={"form-check-input mt-0"} onChange={() => setFieldValue('storeType', 2)}/>
                                            <label htmlFor="storeType" className={"text-left ml-3"}>Xuất kho</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtAppExpenseType">
                                        Phân loại app
                                    </label>
                                    <div className={" flex items-center"}>
                                        <div className={"flex items-center"}>
                                            <Field type="radio" name="appExpenseType" value={1} className={"form-check-input mt-0"} onChange={() => setFieldValue('appExpenseType', 1)} />
                                            <label htmlFor="appExpenseType" className={"text-left ml-3"}>Offline</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="appExpenseType" value={2} className={"form-check-input mt-0"} onChange={() => setFieldValue('appExpenseType', 2)} />
                                            <label htmlFor="appExpenseType" className={"text-left ml-3"}>Grab</label>
                                        </div>

                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="appExpenseType" value={3} className={"form-check-input mt-0"} onChange={() => setFieldValue('appExpenseType', 3)} />
                                            <label htmlFor="appExpenseType" className={"text-left ml-3"}>Shopee</label>
                                        </div>

                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="appExpenseType" value={4} className={"form-check-input mt-0"} onChange={() => setFieldValue('appExpenseType', 4)} />
                                            <label htmlFor="appExpenseType" className={"text-left ml-3"}>Gojek</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="appExpenseType" value={5} className={"form-check-input mt-0"} onChange={() => setFieldValue('appExpenseType', 5)} />
                                            <label htmlFor="appExpenseType" className={"text-left ml-3"}>Baemin</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="appExpenseType" value={6} className={"form-check-input mt-0"} onChange={() => setFieldValue('appExpenseType', 6)} />
                                            <label htmlFor="appExpenseType" className={"text-left ml-3"}>Loship</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="appExpenseType" value={7} className={"form-check-input mt-0"} onChange={() => setFieldValue('appExpenseType', 7)} />
                                            <label htmlFor="appExpenseType" className={"text-left ml-3"}>Bee</label>
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

export default CreateFnbStoreImport;