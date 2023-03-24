/**
 * Libraries
 */
import { FC } from 'react';
import { Dialog } from '@headlessui/react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useQueryClient } from 'react-query';

/**
 * Types, Services
 */
import "react-datepicker/dist/react-datepicker.css";
import { useFnbVoucher } from 'services/hooks/fnb/useFnbVoucher';

const CreateFnbProduct: FC<any> = ({ toggle, modalType, onConfirm, initialValues = {
    template: 1,
    type: 1,
    name: "",
    sign: "",
    note: "",
    minOrderAmount: "",
    salesoffAmount: "",
    salesoffRate: "",
    expired: ""  
} }) => {
    const queryClient = useQueryClient();
    const {  insertAsync, updateAsync, refetch } = useFnbVoucher({ params: { keyword: "" }, isFetchList: false, isFetchInfo: false  });

    const handleSubmit = async (values: any) => {
        if (modalType == 'create') {
            const query = {
                ...values,
                template: parseInt(values.template),
                type: parseInt(values.type),
                name: values.name,
                sign: values.sign,
                note: values.note,
                expired: values.expired,
                minOrderAmount: parseInt(values.minOrderAmount),
                salesoffAmount: parseInt(values.salesoffAmount),
                salesoffRate: parseInt(values.salesoffRate)
            };
           
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
                voucherID: values._id,
                template: parseInt(values.template),
                type: parseInt(values.type),
                name: values.name,
                sign: values.sign,
                note: values.note,
                expired: values.expired,
                minOrderAmount: parseInt(values.minOrderAmount),
                salesoffAmount: parseInt(values.salesoffAmount),
                salesoffRate: parseInt(values.salesoffRate),
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

        queryClient.refetchQueries('fnb-voucher-list')
    };

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
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="template">
                                       Template
                                    </label>
                                    <div className={" flex items-center"}>
                                        <div className={"flex items-center"}>
                                            <Field type="radio" name="template" value={1} className={"form-check-input mt-0"} onChange={() => setFieldValue('template', 1)} />
                                            <label htmlFor="template" className={"text-left ml-3"}>Thông thường</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="template" value={2} className={"form-check-input mt-0"} onChange={() => setFieldValue('template', 2)} />
                                            <label htmlFor="template" className={"text-left ml-3"}>Template</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                                        Phân loại
                                    </label>
                                    <div className={" flex items-center"}>
                                        <div className={"flex items-center"}>
                                            <Field type="radio" name="type" value={1} className={"form-check-input mt-0"} onChange={() => setFieldValue('type', 1)} />
                                            <label htmlFor="type" className={"text-left ml-3"}>Thông thường</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="type" value={2} className={"form-check-input mt-0"} onChange={() => setFieldValue('type', 2)} />
                                            <label htmlFor="type" className={"text-left ml-3"}>Tặng người giới thiệu</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="type" value={3} className={"form-check-input mt-0"} onChange={() => setFieldValue('type', 3)} />
                                            <label htmlFor="type" className={"text-left ml-3"}>Tặng khách mới</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="type" value={4} className={"form-check-input mt-0"} onChange={() => setFieldValue('type', 4)} />
                                            <label htmlFor="type" className={"text-left ml-3"}>Tặng sự kiện</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="type" value={5} className={"form-check-input mt-0"} onChange={() => setFieldValue('type', 5)} />
                                            <label htmlFor="type" className={"text-left ml-3"}>Tặng nhân viên</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="type" value={6} className={"form-check-input mt-0"} onChange={() => setFieldValue('type', 6)} />
                                            <label htmlFor="type" className={"text-left ml-3"}>Tặng đối tác</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="type" value={7} className={"form-check-input mt-0"} onChange={() => setFieldValue('type', 7)} />
                                            <label htmlFor="type" className={"text-left ml-3"}>Tặng khác</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                        Tên
                                    </label>
                                    <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" placeholder="Nhập tên" {...getFieldProps('name')} />
                                    <ErrorMessage
                                        name="name"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sign">
                                        Mã hiệu
                                    </label>
                                    <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="sign" placeholder="Nhập tên" {...getFieldProps('sign')} />
                                    <ErrorMessage
                                        name="sign"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expired">
                                        Thời hạn sử dụng
                                    </label>
                                    <Field type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="expired" placeholder="Thời hạn sử dụng" {...getFieldProps('expired')} />
                                    <ErrorMessage
                                        name="expired"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="minOrderAmount">
                                        Giá trị đơn hàng tối thiểu để được áp dụng
                                    </label>
                                    <Field type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="minOrderAmount" placeholder="Giá trị đơn hàng tối thiểu để được áp dụng" {...getFieldProps('minOrderAmount')} />
                                    <ErrorMessage
                                        name="minOrderAmount"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salesoffAmount">
                                        Giá trị giảm giá
                                    </label>
                                    <Field type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="salesoffAmount" placeholder="Giá trị giảm giá" {...getFieldProps('salesoffAmount')} />
                                    <ErrorMessage
                                        name="salesoffAmount"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salesoffRate">
                                        Tỷ lệ giảm giá trên đơn hàng
                                    </label>
                                    <Field type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="salesoffRate" placeholder="Tỷ lệ giảm giá trên đơn hàng" {...getFieldProps('salesoffRate')} />
                                    <ErrorMessage
                                        name="salesoffRate"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="note">
                                        Ghi chú
                                    </label>
                                    <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="note" placeholder="Ghi chú" {...getFieldProps('note')} />
                                    <ErrorMessage
                                        name="note"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
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

export default CreateFnbProduct;