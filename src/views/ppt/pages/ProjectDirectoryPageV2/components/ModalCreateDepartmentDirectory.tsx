import { FC, useState } from 'react';
import { toast } from "react-toastify";

/**
 * Libraries
 */
import { Dialog } from '@headlessui/react';
import { Form, Formik, ErrorMessage } from 'formik';
import { string, object } from 'yup';
import debounce from "lodash/debounce";

/**
 * Components, Utils
 */
import { DropdownSearchable } from "shareComponents/common";
import { TOAST_DEFAULT_OPTIONS } from 'utils/constants';
import { BIDDING_PLAN_CONTRACT_TYPE, BIDDING_PLAN_FORM, BIDDING_PLAN_STATUS, FINANCIAL_PLANNING_TYPES } from 'apis/localdb';

/**
 * Hooks
 */
import { useBiddingPlan } from 'services/hooks/bidding/useBiddingPlan';
import { useDepartmentDirectory } from 'services/hooks/items/useDepartmentDirectory';

// import { useQueryListCompany } from "services/hooks/useCompanies";
import { useUserSystem } from "services/hooks/users/useUserSystem";
import { useAuth } from 'services/hooks/auth/useAuth';

interface ModalProps {
	toggle: () => void;
	onConfirm?: () => void;
	projectID: string
}

const DEPARTMENT_DIRECTORY_TYPE = [
    { id: 1, text: "Trợ lý viên" },
    { id: 2, text: "Chủ đầu tư" },
    { id: 3, text: "Tư vấn QLDA" },
    { id: 4, text: "Tư vấn giám sát" },
    { id: 5, text: "Tư vấn thiết kế" },
    { id: 6, text: "Nhà thầu thi công" },
]

const DEPARTMENT_DIRECTORY_LOCK = [
    { id: 0, text: "Bình thường" },
    { id: 1, text: "Khóa" },
]

const ModalCreateDepartmentDirectory: FC<ModalProps> = ({ toggle, onConfirm, projectID }) => {
	const { insertAsync } = useDepartmentDirectory({});

	const financialSchema = object().shape({
		member: string().required("Bạn cần chọn thành viên"),
	});

	const handleSubmit = async (values: any) => {
		try {
			console.log({ values })
			const { error, data } = await insertAsync(values);

			if(error) {
                return toast.warn(data?.message);
            }

            if(data.length) {
                return data.map((item: any) => toast.warn(item.message));
            }

            toast.success('Tạo mới thành công', TOAST_DEFAULT_OPTIONS);
			toggle();
			onConfirm && onConfirm();
		} catch (error) {
			if (typeof error === "string") {
                toast.error(error, TOAST_DEFAULT_OPTIONS);
            } else if (error instanceof Error) {
                toast.error(error.message, TOAST_DEFAULT_OPTIONS);
            }
		}
	};

	const [searchUserSystem, setSearchUserSystem] = useState("");
    const { user } = useAuth();
	const companyID = user?.company?._id;
	const {
		data: listUsersSystem,
		hasNextPage: hasNextPageUserSystem,
		fetchNextPage: fetchNextPageUserSystem,
	} = useUserSystem({ keyword: searchUserSystem, companyID }, true);

	return (
		<Formik
			initialValues={{ name: '', companyID  }}
			validationSchema={financialSchema}
			onSubmit={handleSubmit}
		>
			{
				formik => {
					return (
						<Form autoComplete="off">
							<div className="flex items-center px-6 py-2.5 justify-between bg-cbs-table-header overflow">
								<Dialog.Title
									as="h3"
									className="text-lg leading-6 font-bold"
								>
									Tạo mới
								</Dialog.Title>
								<button className="p-2 rounded-3xl" type="button" onClick={toggle}>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
							{/* md:h-[500px] */}
							<div className="relative px-6 mt-2 pt-3.5 flex-1 text-x-small">
								
								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Thành viên (*)
									</div>
									<DropdownSearchable
										onSearchInputChange={debounce(
											(value) => setSearchUserSystem(value),
											500
										)}
										onchangeValue={(value: any) => formik.setFieldValue('member', value.id)}
										onClearData={() => formik.setFieldValue('member', '')}
										className={"h-32 px-3 w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"}
										placeholder="Chọn thành viên"
										isMultiple={false}
										allowClearValueSingleInput={true}
										showTriangle={true}
										maxWidthInput="max-w-none"
										data={listUsersSystem.map(item => ({
											value: item._id,
											label: item.fullname
										}))}
										formatItem={{
											id: "value",
											text: "label",
										}}
										inlineSearch={true}
									/>
									<ErrorMessage
										name="member"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Phân loại
									</div>
									<DropdownSearchable
										onchangeValue={(value: any) => formik.setFieldValue('type', value.id)}
										onClearData={() => formik.setFieldValue('type', '')}
										className={"h-32 px-3 w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"}
										placeholder="Chọn phân loại"
										isMultiple={false}
										allowClearValueSingleInput={true}
										showTriangle={true}
										maxWidthInput="max-w-none"
										data={DEPARTMENT_DIRECTORY_TYPE.map(item => ({
											value: item.id,
											label: item.text
										}))}
										formatItem={{
											id: "value",
											text: "label",
										}}
										inlineSearch={true}
									/>
									<ErrorMessage
										name="type"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Chức vụ trong dự án
									</div>
									<input
										type="text"
										placeholder="VD: Trưởng ban quản lý dự án"
										className="py-1.5 px-3  w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('name')}
									/>
									<ErrorMessage
										name="name"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Mô tả
									</div>
									<input
										type="text"
										placeholder="VD: Đang hoạt động chính thức"
										className="py-1.5 px-3  w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('description')}
									/>
									<ErrorMessage
										name="description"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Thứ tự
									</div>
									<input
										type="number"
										placeholder="Thứ tự"
										className="py-1.5 px-3  w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('order')}
									/>
									<ErrorMessage
										name="order"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Hình thức
									</div>
									<DropdownSearchable
										onchangeValue={(value: any) => formik.setFieldValue('lock',value.id)}
										onClearData={() => formik.setFieldValue('lock', '')}
										className={"h-32 px-3 w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"}
										placeholder="Chọn hình thức"
										isMultiple={false}
										allowClearValueSingleInput={true}
										showTriangle={true}
										maxWidthInput="max-w-none"
										data={DEPARTMENT_DIRECTORY_LOCK.map(item => ({
											value: item.id,
											label: item.text
										}))}
										formatItem={{
											id: "value",
											text: "label",
										}}
										inlineSearch={true}
									/>
									<ErrorMessage
										name="lock"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>
								
							</div>
							<div className="flex justify-end pt-5 px-6 pb-6 mt-6">
								<div>
									<button type="submit" className="px-7 py-3.5 rounded-md bg-primary text-white font-bold text-sm leading-4">Xác nhận</button>
								</div>
							</div>
						</Form>
					)
				}
			}
		</Formik>
	)
}

export default ModalCreateDepartmentDirectory