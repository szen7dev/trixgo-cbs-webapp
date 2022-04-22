import React, { FC, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { object, string } from 'yup'
import { Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import { useQuery, useQueryClient } from 'react-query'

import { CustomFieldFormik } from 'shareComponents/common/Form/CustomForm'
import DatahubRepository from 'apis/datahub'

type Props = {
	inspectionDocID?: string,
	type: number,

	toggle: () => void
}

const DatahubInspectionSchema = object().shape({
	name: string().required('Tên không được để trống'),
	sign: string(),
	description: string(),
});

const ModalCreateInspection: FC<Props> = ({ inspectionDocID, toggle, type }) => {
	const [initialValues, setInitialValues] = useState({
		name: '',
		sign: '',
		description: ''
	})

	useQuery(
		["datahub_package", inspectionDocID],
		() =>
			DatahubRepository.getDatahubInspection({
				inspectionDocID: inspectionDocID as string
			}),
		{
			refetchOnWindowFocus: false,
			enabled: Boolean(inspectionDocID), // https://react-query.tanstack.com/guides/disabling-queries
			onSuccess: ({ data }) => {
				if (data && '_id' in data) {
					setInitialValues({
						name: data.name,
						sign: data.sign,
						description: data.description
					})
				}
			},
		}
	);

	const queryClient = useQueryClient();

	const handleSubmit = async (values: typeof initialValues) => {
		if (inspectionDocID) {
			const data = await DatahubRepository.updateDatahubInspection({ ...values, type, inspectionDocID });

			if ('code' in data) return;
			toast.info("Update inspection type " + type + " successfully");
		} else {
			const data = await DatahubRepository.createDatahubInspection({ ...values, type });

			if ('code' in data) return;
			toast.success("Create inspection type " + type + " successfully");
		}
		queryClient.removeQueries(['datahub_inspection', type], { inactive: true })
		queryClient.refetchQueries(['datahub_inspection', type], { active: true })
		toggle();
	}

	return (
		<>
			<div className="flex items-center px-6 py-2.5 justify-between border-b border-secondary-gray border-opacity-30">
				<Dialog.Title as="h3" className="text-lg leading-6 font-bold">
					{
						!inspectionDocID ? "Tạo mới" : "Cập nhật"
					}
				</Dialog.Title>
				<button
					type="button"
					onClick={toggle}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				enableReinitialize
				validationSchema={DatahubInspectionSchema}
			>
				<Form>
					<div className="px-5 pb-4 overflow-x-auto min-h-[500px]">
						<div className="whitespace-nowrap space-y-4 py-5">
							<CustomFieldFormik name='name' title='Tên' required />
							<CustomFieldFormik name='sign' title='Mã hiệu' />
							<CustomFieldFormik name='description' title='Mô tả' />
						</div>
					</div>

					<div className="flex justify-end py-2 px-6 border-t border-cbs-border">
						<div className="mr-1.5">
							<button
								type="submit"
								className="px-4 py-2 rounded-md bg-primary text-white text-small leading-5"
							>
								Xác nhận
							</button>
						</div>
					</div>
				</Form>
			</Formik>
		</>
	)
}

export default ModalCreateInspection