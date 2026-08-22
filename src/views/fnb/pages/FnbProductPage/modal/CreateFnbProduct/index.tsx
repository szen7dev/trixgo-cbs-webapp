/**
 * Libraries
 */
import { FC } from 'react';
import { Dialog } from '@headlessui/react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import moment from 'moment';
import { object, number } from 'yup';

/**
 * Types, Services
 */
import "react-datepicker/dist/react-datepicker.css";
import { useFnbProduct } from 'services/hooks/fnb/useFnbProduct';

const fnbProductSchema = object().shape({
    unitPrice: number().moreThan(0, 'Đơn giá phải lớn hơn 0').required('Vui lòng nhập đơn giá'),
    unitPrice2: number().moreThan(0, 'Đơn giá phải lớn hơn 0').required('Vui lòng nhập đơn giá'),
    unitPrice3: number().moreThan(0, 'Đơn giá phải lớn hơn 0').required('Vui lòng nhập đơn giá'),
    unitPrice4: number().moreThan(0, 'Đơn giá phải lớn hơn 0').required('Vui lòng nhập đơn giá'),
});

const CreateFnbProduct: FC<any> = ({ toggle, modalType, onConfirm, initialValues = {
    type: 1,
    convertOption: 1,
    name: "",
    sign: "",
    unit: "",
    unitPrice: "",
    unitPrice2: "",
    unitPrice3: "",
    unitPrice4: "",
    note: ""  
} }) => {
    
    const {  insertAsync, updateAsync, refetch } = useFnbProduct({ params: { keyword: "" }, isFetchList: false, isFetchInfo: false  });

    const handleSubmit = async (values: any) => {
        if (modalType == 'create') {
            const query = {
                ...values,
                type: parseInt(values.type),
                convertOption: parseInt(values.convertOption),
                name: values.name,
                sign: values.sign,
                unit: values.unit,
                unitPrice: parseInt(values.unitPrice),
                unitPrice2: parseInt(values.unitPrice2),
                unitPrice3: parseInt(values.unitPrice3),
                unitPrice4: parseInt(values.unitPrice4),
                note: values.note,
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
                productID: values._id,
                type: parseInt(values.type),
                convertOption: parseInt(values.convertOption),
                name: values.name,
                sign: values.sign,
                unit: values.unit,
                unitPrice: parseInt(values.unitPrice),
                unitPrice2: parseInt(values.unitPrice2),
                unitPrice3: parseInt(values.unitPrice3),
                unitPrice4: parseInt(values.unitPrice4),
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

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={fnbProductSchema}
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
                                    {modalType == 'create' ? 'Tạo thực đơn' : 'Cập nhật thực đơn'}
                                </Dialog.Title>
                                <button className="bg-primary-gray bg-opacity-20 p-2 rounded-3xl" type="button" onClick={() => toggle()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="px-6 mt-2 pt-3.5 flex-1 flex flex-col">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtType">
                                        Phân loại
                                    </label>
                                    <div className={" flex items-center"}>
                                        <div className={"flex items-center"}>
                                            <Field type="radio" name="type" value={1} className={"form-check-input mt-0"} onChange={() => setFieldValue('type', 1)} />
                                            <label htmlFor="type" className={"text-left ml-3"}>Thông thường</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="type" value={2} className={"form-check-input mt-0"} onChange={() => setFieldValue('type', 2)} />
                                            <label htmlFor="type" className={"text-left ml-3"}>Topping</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtName">
                                        Tên
                                    </label>
                                    <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="txtName" placeholder="Nhập tên" {...getFieldProps('name')} />
                                    <ErrorMessage
                                        name="name"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtSign">
                                        Mã hiệu
                                    </label>
                                    <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="txtSign" placeholder="Nhập mã hiệu" {...getFieldProps('sign')} />
                                    <ErrorMessage
                                        name="sign"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtUnit">
                                        Đơn vị tính
                                    </label>
                                    <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="txtUnit" placeholder="Đơn vị tính" {...getFieldProps('unit')} />
                                    <ErrorMessage
                                        name="unit"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtType">
                                        Quản lý theo Size
                                    </label>
                                    <div className={" flex items-center"}>
                                        <div className={"flex items-center"}>
                                            <Field type="radio" name="convertOption" value={1} className={"form-check-input mt-0"} onChange={() => setFieldValue('convertOption', 1)} />
                                            <label htmlFor="convertOption" className={"text-left ml-3"}>Có</label>
                                        </div>
                                        <div className={"flex items-center ml-3"}>
                                            <Field type="radio" name="convertOption" value={2} className={"form-check-input mt-0"} onChange={() => setFieldValue('convertOption', 2)} />
                                            <label htmlFor="convertOption" className={"text-left ml-3"}>Không</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtUnitPrice">
                                        Đơn giá Size M, bán Off
                                    </label>
                                    <Field type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="txtUnitPrice" placeholder="Đơn giá" {...getFieldProps('unitPrice')} />
                                    <ErrorMessage
                                        name="unitPrice"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtUnitPrice2">
                                        Đơn giá Size M, bán App
                                    </label>
                                    <Field type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="txtUnitPrice2" placeholder="Đơn giá" {...getFieldProps('unitPrice2')} />
                                    <ErrorMessage
                                        name="unitPrice2"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtUnitPrice3">
                                        Đơn giá Size L, bán Off
                                    </label>
                                    <Field type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="txtUnitPrice3" placeholder="Đơn giá" {...getFieldProps('unitPrice3')} />
                                    <ErrorMessage
                                        name="unitPrice3"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtUnitPrice4">
                                        Đơn giá Size L, bán App
                                    </label>
                                    <Field type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="txtUnitPrice4" placeholder="Đơn giá" {...getFieldProps('unitPrice4')} />
                                    <ErrorMessage
                                        name="unitPrice4"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtNote">
                                    Ghi chú
                                    </label>
                                    <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="txtNote" placeholder="Ghi chú" {...getFieldProps('note')} />
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