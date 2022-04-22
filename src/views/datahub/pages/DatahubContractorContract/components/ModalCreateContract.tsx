import React, { FC, Fragment, useState } from 'react'
import { Form, Formik } from 'formik'
import { Dialog } from '@headlessui/react';
import { debounce } from 'lodash';
import { object, number, string } from 'yup'

import { CustomAutoCompleteFormik, CustomFieldFormik, CustomDatePickerFormik } from 'shareComponents/common/Form/CustomForm'
import useInfiniteProjects from 'services/hooks/datahub/projects/useInfiniteProjects'
import useInfiniteDatahubTypes from 'services/hooks/datahub/types/useInfiniteDatahubTypes';
import { DEPARTMENT_STATUS } from 'apis/localdb';
import useDatahubPackage from 'services/hooks/datahub/package/useDatahubPackage';
import { DatahubContractBody } from 'typings/datahub/contract';
import { useQueryClient } from 'react-query';
import DatahubRepository from 'apis/datahub';
import { toast } from 'react-toastify';

type Props = {
	contractor: string;
	datahubPackageID?: string;

	toggle: () => void
}

const DatahubContractSchema = object().shape({
	project: string().required(),
	field: string().required(),
	name: string().required(),
	sign: string(),
	note: string(),
	value: string().required(),
	vatValue: string().required(),
	// date: date(),
	// startTime: date(),
	// endTime: date(),
	status: number().required(),
});

const ModalCreateContract: FC<Props> = (props) => {
	const [initialValues, setInitialValues] = useState({
		project: '',
		field: '',
		name: '',
		sign: '',
		note: '',
		value: '',
		vatValue: '',
		date: null as Date | null,
		startTime: null as Date | null,
		endTime: null as Date | null,
		status: 0,
	});
	const [defaultValues, setDefaultValues] = useState({
		project: '',
		status: '',
		field: '',
	})

	useDatahubPackage({
		contractorID: props.contractor, datahubPackageID: props.datahubPackageID, populates: JSON.stringify({
			path: 'project field'
		})
	}, {
		onSuccess: (data) => {
			if ('status' in data && data.status === 200) {
				setInitialValues({
					project: data.data.project && typeof data.data.project !== 'string' ? data.data.project._id : '',
					field: data.data.field && typeof data.data.field !== 'string' ? data.data.field._id : '',
					name: data.data.name,
					sign: data.data.sign,
					note: data.data.note,
					value: String(data.data.value),
					vatValue: String(data.data.vatValue),
					date: new Date(data.data.date),
					startTime: new Date(data.data.startTime),
					endTime: new Date(data.data.endTime),
					status: data.data.status,
				});
				setDefaultValues({
					status: DEPARTMENT_STATUS.find(s => s.value === data.data.status)?.text || '',
					project: data.data.project && typeof data.data.project !== 'string' ? data.data.project.name : '',
					field: data.data.field && typeof data.data.field !== 'string' ? data.data.field.name : '',
				})
			}
		}
	});

	const [project, setProject] = useState('');
	const [field, setField] = useState('');
	const { data: projects } = useInfiniteProjects(['datahub_projects', project], { keyword: project, select: '_id name' }, { enable: Boolean(project) });
	const { data: fields } = useInfiniteDatahubTypes(['datahub_types', field], { keyword: field, select: '_id name' }, { enable: Boolean(field) });

	const queryClient = useQueryClient();

	const handleSubmit = async (values: typeof initialValues) => {
		const body: DatahubContractBody = {
			contractor: props.contractor,
			datahubPackageID: props.datahubPackageID,
			field: values.field,
			name: values.name,
			project: values.project,
			status: values.status,
			value: Number(values.value),
			vatValue: Number(values.vatValue),
			date: values.date?.toString(),
			startTime: values.startTime?.toString(),
			endTime: values.endTime?.toString(),
			sign: values.sign,
		}

		if (body.datahubPackageID) {
			const data = await DatahubRepository.updateDatahubContract(body);

			if ('code' in data) return;
			toast.info("Update financial report successfully");
		} else {
			const data = await DatahubRepository.createDatahubContract(body);

			if ('code' in data) return;
			toast.success("Create financial report successfully");
		}
		queryClient.removeQueries(['datahub_packages'], { inactive: true })
		queryClient.refetchQueries(['datahub_packages'], { active: true })
		props.toggle();
	}

	return (
		<Fragment>
			<div className="flex items-center px-6 py-2.5 justify-between border-b border-secondary-gray border-opacity-30">
				<Dialog.Title as="h3" className="text-lg leading-6 font-bold">
					{
						props.datahubPackageID ? "Cập nhật" : "Tạo mới"
					}
				</Dialog.Title>
				<button
					type="button"
					onClick={props.toggle}
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
				validationSchema={DatahubContractSchema}
				enableReinitialize
			>
				<Form>
					<div className="px-5 pb-4 overflow-x-auto min-h-[500px]">
						<div className="whitespace-nowrap space-y-4 py-5">
							<CustomAutoCompleteFormik
								name='project'
								title='Dự án'
								required
								data={projects?.pages.flatMap(page => page.data.listRecords) || []}
								onChange={debounce((value) => setProject(value), 300)}
								initialData={defaultValues.project}
								valueAttribute='_id'
							/>
							<CustomAutoCompleteFormik name='field' title='Lĩnh vực'
								required
								data={fields?.pages.flatMap(page => page.data.listRecords) || []}
								onChange={debounce((value) => setField(value), 300)}
								initialData={defaultValues.field}
								valueAttribute='_id'
							/>
							<CustomFieldFormik name='name' title='Tên hợp đồng' required />
							<CustomFieldFormik name='sign' title='Mã hiệu' />
							<CustomFieldFormik name='note' title='Ghi chú' />
							<CustomFieldFormik name='value' title='Giá trị hợp đồng trước VAT' required />
							<CustomFieldFormik name='vatValue' title='Giá trị phần VAT' required />
							<CustomDatePickerFormik name='date' title='Ngày ký' />
							<CustomDatePickerFormik name='startTime' title='Ngày bắt đầu thực hiện' />
							<CustomDatePickerFormik name='endTime' title='Ngày kết thúc thực hiện' />
							<CustomAutoCompleteFormik
								name='status'
								title='Tình trạng'
								data={DEPARTMENT_STATUS}
								initialData={defaultValues.status}
								attribute='text'
								valueAttribute='value'
							/>
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
		</Fragment>
	)
}

export default ModalCreateContract