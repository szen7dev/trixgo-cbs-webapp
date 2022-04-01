/**
 * Libraries
 */
import { FC } from 'react';
import { Dialog } from '@headlessui/react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { string, object } from 'yup';
import { toast } from 'react-toastify';
import moment from 'moment';
/**
 * Types, Services
 */

import "react-datepicker/dist/react-datepicker.css";
import { CustomDatePickerFormik } from 'views/datahub/sharedComponents/common';
import { usePcmProject } from 'services/hooks/pcm/usePcmProject';
import { number } from 'yup';

const CreateProject: FC<any> = ({ toggle, modalType, onConfirm, initialValues = {
    type: "",
    name: "",
    sign: "",
    startTime: "",
    expiredTime: "",
    milestones: "",
    completedMilestones: "",
    budget: "",
} }) => {
    const { createProjectMutateAsync, refetchPcmProject, updateProjectMutateAsync } = usePcmProject({ keyword: "" });

    const companySchema = object().shape({
        type: number().required("Bạn cần nhập loại cho dự án"),
        name: string().required("Bạn cần nhập tên cho dự án"),
        sign: string().required("Bạn cần nhập mã hiệu cho dự án"),
        startTime: string().required("Bạn cần nhập ngày bắt đầu cho dự án"),
        expiredTime: string().required("Bạn cần nhập ngày kết thúc cho dự án"),
        milestones: string().required("Bạn cần nhập tổng số mốc cho dự án"),
        completedMilestones: string().required("Bạn cần nhập số mốc hoàn thành cho dự án"),
        budget: string().required("Bạn cần nhập ngân sách dự án"),
    });

    const handleSubmit = async (values: any) => {
        if (modalType == 'create') {
            const query = {
                ...values,
                type: parseInt(values.type),
                milestones: parseInt(values.milestones),
                completedMilestones: parseInt(values.completedMilestones),
                budget: parseInt(values.budget),
                startTime: moment(values.startTime).format('YYYY-MM-DD'),
                expiredTime: moment(values.expiredTime).format('YYYY-MM-DD'),
            };
           
            const result = await createProjectMutateAsync(query);
            if (!result.error) {
                refetchPcmProject();
                toggle();
                toast.success('Tạo mới dữ liệu thành công');
            } else {
                toast.error(result?.data?.message);
            }
        };

        if (modalType == 'update') {
            const query = {
                ...values,
                type: parseInt(values.type),
                departmentID: values._id,
                milestones: parseInt(values.milestones),
                completedMilestones: parseInt(values.completedMilestones),
                budget: parseInt(values.budget),
                startTime: moment(values.startTime).format('YYYY-MM-DD'),
                expiredTime: moment(values.expiredTime).format('YYYY-MM-DD'),
            };
            const result = await updateProjectMutateAsync(query);
            if (!result.error) {
                refetchPcmProject();
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
            validationSchema={companySchema}
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
                                    {modalType == 'create' ? 'Tạo mới' : 'Cập nhật'}
                                </Dialog.Title>
                                <button className="bg-primary-gray bg-opacity-20 p-2 rounded-3xl" type="button" onClick={() => toggle()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="px-6 mt-2 pt-3.5 flex-1 flex flex-col">
                            <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtCompanyName">
                                        Loại
                                    </label>
                                    <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="txtCompanyName" placeholder="(1 là phòng ban, 2 là dự án)" {...getFieldProps('type')} />
                                    <ErrorMessage
                                        name="type"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtCompanyName">
                                        Tên
                                    </label>
                                    <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="txtCompanyName" placeholder="Nhập tên" {...getFieldProps('name')} />
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
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtTaxID">
                                        Ngày bắt đầu
                                    </label>
                                    <CustomDatePickerFormik
                                        name='startTime'
                                        placeholder={'Nhập ngày bắt đầu'}
                                        required
                                    />
                                    <ErrorMessage
                                        name="startTime"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtAddress">
                                        Ngày kết thúc
                                    </label>
                                    <CustomDatePickerFormik
                                        name='expiredTime'
                                        placeholder={'Nhập ngày kết thúc'}
                                        required
                                    />
                                    <ErrorMessage
                                        name="expiredTime"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtAddress">
                                        Tổng số mốc
                                    </label>
                                    <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="txtAddress" placeholder="Nhập tổng số mốc" {...getFieldProps('milestones')} />
                                    <ErrorMessage
                                        name="milestones"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Số mốc hoàn thành
                                    </label>
                                    <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Nhập số mốc hoàn thành" {...getFieldProps('completedMilestones')} />
                                    <ErrorMessage
                                        name="completedMilestones"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Ngân sách/tổng mức đầu tư
                                    </label>
                                    <Field type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Ngân sách" {...getFieldProps('budget')} />
                                    <ErrorMessage
                                        name="budget"
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

export default CreateProject;