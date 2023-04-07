import { FC, useEffect, useState } from 'react';
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

/**
 * Hooks
 */
import { departmentDirectoryRepository } from 'apis/item/department_directory';
import { useDepartmentDirectory } from 'services/hooks/items/useDepartmentDirectory';
import { useUserSystem } from "services/hooks/users/useUserSystem";
import { useAuth } from 'services/hooks/auth/useAuth';

interface ModalProps {
	departmentDirectoryID: string;
	projectID: string;
	toggle: () => void;
	onConfirm?: () => void;
}

const DEPARTMENT_DIRECTORY_TYPE = [
    { id: 1, text: "Trợ lý viên" },
    { id: 2, text: "Chủ đầu tư" },
    { id: 3, text: "Tư vấn Quản lý dự án" },
    { id: 4, text: "Tư vấn giám sát" },
    { id: 5, text: "Tư vấn thiết kế" },
    { id: 6, text: "Nhà thầu thi công" },
    { id: 7, text: "Tư vấn thẩm tra" },
    { id: 8, text: "Tư vấn khác" },
]

const DEPARTMENT_DIRECTORY_LOCK = [
    { id: 0, text: "Bình thường" },
    { id: 1, text: "Khóa" },
]

const ModalUpdateBiddingPlan: FC<ModalProps> = ({ departmentDirectoryID, toggle, onConfirm, projectID }) => {
	const [initValues, setInitValues] = useState<{ [key: string]: any }>({});
	const { updateAsync } = useDepartmentDirectory({});
	const [searchUserSystem, setSearchUserSystem] = useState("");
	const { user } = useAuth();

	useEffect(() => {
		if(!departmentDirectoryID) return;

		(async () => {
			const { error, data } = await departmentDirectoryRepository.fetchDetailDepartmentDirectory({
				departmentDirectoryID
			})
			if(error) return;
			const { member, name, description, type, lock, order } = data;
			setInitValues({ member, name, description, type, lock, order });
		})();
	}, [departmentDirectoryID])

	const {
		data: listUsersSystem,
	} = useUserSystem({ keyword: searchUserSystem, projectID }, true);

	// useEffect(() => {
	// 	if(!cashFlowInfo || !departmentDirectoryID) return;

	// 	const { name, sign, type, note, outin, property, status } = cashFlowInfo;
	// 	setInitValues({ name, sign, type, note, outin, property, status });
	// }, [cashFlowInfo, departmentDirectoryID])

	const financialSchema = object().shape({
		name: string().required("Bạn cần nhập nội dung"),
	});

	const handleSubmit = async (values: any) => {
		try {
			const { error, data } = await updateAsync({
				departmentDirectoryID,
				...values,
				member: values.member?._id || values.member
			});

			if(error) {
                return toast.warn(data?.message);
            }

            if(data.length) {
                return data.map((item: any) => toast.warn(item.message));
            }

            toast.success('Cập nhật thành công', TOAST_DEFAULT_OPTIONS);
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

	if(!initValues || !Object.keys(initValues).length) return <></>

	return (
		<Formik
			initialValues={initValues}
			validationSchema={financialSchema}
			enableReinitialize={true}
			onSubmit={handleSubmit}
		>
			{
				formik => {
					return (
						<Form autoComplete="off">
							<div className="flex items-center px-6 py-2.5 justify-between bg-cbs-table-header">
								<Dialog.Title
									as="h3"
									className="text-lg leading-6 font-bold"
								>
									Cập nhật
								</Dialog.Title>
								<button className="p-2 rounded-3xl" type="button" onClick={toggle}>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
							{/* md:h-[800px] */}
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
										onchangeValue={(value: any) => formik.setFieldValue('member', value.value)}
										onClearData={() => formik.setFieldValue('member', '')}
										className={"h-32 px-3 w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"}
										placeholder="Chọn thành viên"
										isMultiple={false}
										allowClearValueSingleInput={true}
										showTriangle={true}
										maxWidthInput="max-w-none"
										// Render đổ data
										data={listUsersSystem.map(item => ({
											value: item._id,
											label: item.fullname
										}))}
										initialValue={{
											...initValues.member && {
												value: initValues.member?._id,
												label: initValues.member?.fullname,
											}
										}}
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
										initialValue={{
											...initValues.type && {
												value: DEPARTMENT_DIRECTORY_TYPE[initValues.type-1]?.id,
												label: DEPARTMENT_DIRECTORY_TYPE[initValues.type-1]?.text
											}
										}}
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
										onchangeValue={(value: any) => formik.setFieldValue('lock', value.id)}
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
										initialValue={{
											value: DEPARTMENT_DIRECTORY_LOCK[initValues.lock]?.id,
											label: DEPARTMENT_DIRECTORY_LOCK[initValues.lock]?.text
										}}
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

export default ModalUpdateBiddingPlan