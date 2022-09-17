import React, { FC, Fragment, useRef, useState } from 'react'
import { Dialog } from '@headlessui/react'

import { Form, Formik } from 'formik'
import { CustomAutoCompleteFormik, CustomFieldFormik } from 'shareComponents/common/Form/CustomForm'
import { string, object } from 'yup';

import { PROJECT_TYPES, BUILDING_TYPES, BUILDING_GRADES, DEPARTMENT_STATUS } from 'apis/localdb'

// ======== Hooks ========
import { useQueryClient } from 'react-query';
import { useCreateDatahubProject, useUpdateDatahubProject, useDatahubProject, useDatahubCompanies, useDatahubArea } from 'services/hooks/datahub'

// ======== Typings ========
import { ResponseCreateSuccess } from "typings/apis/response";
import { DatahubProjects } from 'typings/datahub/projects';
import { convertAreaToString } from 'apis/datahub/area';

type Props = {
	type: 'create' | 'edit'
	datahubProjectID?: string;
	onSuccessCreate?: (data: ResponseCreateSuccess<DatahubProjects>) => void

	toggle: () => void
}

const DatahubProjectSchema = object().shape({
	client: string().required('Required'),
	address: string().required('Required'),
	area3: string().required('Required'),
	location: string(),
	name: string().required('Required'),
	sign: string().required('Required'),
});

const initialState = {
	client: '', // Chủ dự án

	address: '', // Địa chỉ dự án
	area3: '', // Khu vực dự án

	location: '', // Vị trí
	name: '', // Tên hợp đồng
	sign: '', // Mã hiệu
	note: '', // Ghi chú

	projectType: 0,
	buildingType: 0,
	buildingGrade: 0,

	basementNumber: 0,
	basementArea: 0,
	floorNumber: 0,
	floorArea: 0,

	status: 0,
}

const ModalCreateProject: FC<Props> = (props) => {
	const queryClient = useQueryClient();

	// Declare initialValues of formik here
	const [initialValues, setInitialValues] = useState(initialState);
	// Declare defaultValues of field here;
	const [defaultValues, setDefaultValues] = useState({
		client: '',
		area3: '',

		projectType: '',
		buildingType: '',
		buildingGrade: '',
		status: '',
	});

	const [company, setCompany] = useState('');
	const [area, setArea] = useState('');
	const { data: listCompany, fetchNextPage: fetchNextCompanies, hasNextPage: hasNextCompany }
		= useDatahubCompanies(['company', company], { select: '_id name', limit: 20, keyword: company }, { enable: true });
	const { data: listAddress3, fetchNextPage: fetchNextArea, hasNextPage: hasNextArea }
		= useDatahubArea(['area', area], {
			select: '_id name parent',
			limit: 20,
			keyword: area,
			populates: JSON.stringify({ "path": "parent", "select": "name sign parent level", "populate": { "path": "parent", "select": "name sign parent level" } })
		}, { enable: true });

	const comapnyRef = useRef<NodeJS.Timeout>();
	const areaRef = useRef<NodeJS.Timeout>();

	const { createDatahubProject } = useCreateDatahubProject();
	const { updateDatahubProject } = useUpdateDatahubProject();

	const { isLoading } = useDatahubProject(props.datahubProjectID, {
		onSuccess(data) {
			if ('error' in data && !data.error) {
				if (typeof data.data.client !== 'string'
					&& typeof data.data.area3 !== 'string'
				) {
					setInitialValues({
						client: data.data.client._id,
						address: data.data.address,
						area3: data.data.area3._id,

						location: data.data.location,
						name: data.data.name,
						sign: data.data.sign,
						note: data.data.note,

						projectType: data.data.projectType,
						buildingType: data.data.buildingType,
						buildingGrade: data.data.buildingGrade,

						basementNumber: data.data.basementNumber,
						basementArea: data.data.basementArea,
						floorNumber: data.data.floorNumber,
						floorArea: data.data.floorArea,

						status: data.data.status,
					})
					setDefaultValues({
						client: data.data.client.name,
						area3: data.data.area3.name + ', ' + (data.data.area3.parent as any).name + ', ' + (data.data.area3.parent as any).parent.name,
						projectType: data.data.projectType ? PROJECT_TYPES.find(item => item.value === data.data.projectType)?.text || '' : '',
						buildingType: data.data.buildingType ? BUILDING_TYPES.find(item => item.value === data.data.buildingType)?.text || '' : '',
						buildingGrade: data.data.buildingGrade ? BUILDING_GRADES.find(item => item.value === data.data.buildingGrade)?.text || '' : '',
						status: data.data.status ? DEPARTMENT_STATUS.find(item => item.value === data.data.status)?.text || '' : '',
					})
				}
			}
		}
	});

	const handleSubmit = async (values: any, actions: any) => {
		values = {
			...values,
			basementNumber: parseInt(values.basementNumber),
			floorNumber: parseInt(values.floorNumber),
			floorArea: parseInt(values.floorArea),
		}
		if (props.datahubProjectID) {
			await updateDatahubProject({ ...values, datahubProjectID: props.datahubProjectID }, {
				onSuccess(data) {
					if ('code' in data) {
						data.data.forEach((d) => actions.setFieldError(d.field, d.message));
					} else {
						queryClient.removeQueries(["datahub_projects"], { inactive: true });
						queryClient.refetchQueries(["datahub_projects", ""]);
						props.toggle();
					}
				}
			});
		} else {
			await createDatahubProject(values, {
				onSuccess(data) {
					if ('code' in data) {
						data.data.forEach((d) => actions.setFieldError(d.field, d.message));
					} else {
						props.toggle();
					}
				}
			});
		}
	}
	const handleChangeCompanies = (v: string) => {
		if (comapnyRef.current) clearTimeout(comapnyRef.current);
		comapnyRef.current = setTimeout(() => setCompany(v), 300);
	}
	const handleChangeArea = (v: string) => {
		if (areaRef.current) clearTimeout(areaRef.current);
		areaRef.current = setTimeout(() => setArea(v), 300);
	}

	return (
		<Fragment>

			<div className="flex items-center px-6 py-2.5 justify-between border-b border-secondary-gray border-opacity-30">
				<Dialog.Title as="h3" className="text-lg leading-6 font-bold">
					{
						props.type === 'create' ? "Tạo mới" : "Cập nhật"
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
				validationSchema={DatahubProjectSchema}
				enableReinitialize
			>
				{
					({ isSubmitting, isValid }) => (
						<Form className='relative' >
							<div className="px-5 pb-4 overflow-x-auto min-h-[500px]">
								<div className="whitespace-nowrap space-y-4 py-5">
									<CustomAutoCompleteFormik
										title='Chủ đầu tư'
										name='client'
										required
										onChange={handleChangeCompanies}
										data={listCompany?.pages.flatMap(p => p.data.listRecords) || []}
										valueAttribute="_id"
										initialData={defaultValues.client}
										onScroll={e => { hasNextCompany && (e.target.scrollTop + e.target.offsetHeight + 100 > e.target.scrollHeight) && fetchNextCompanies() }}
									/>
									<CustomFieldFormik title='Địa chỉ dự án' required name='address' />
									<CustomAutoCompleteFormik
										title='Khu vực dự án'
										name='area3'
										required
										onChange={handleChangeArea}
										data={listAddress3?.pages.flatMap(p => p.data.listRecords) || []}
										valueAttribute="_id"
										initialData={defaultValues.area3}
										renderValue={convertAreaToString}
										onScroll={e => { hasNextArea && (e.target.scrollTop + e.target.offsetHeight + 100 > e.target.scrollHeight) && fetchNextArea() }}
									/>
									<CustomFieldFormik name='location' title='Địa chỉ theo GG map' />
									<CustomFieldFormik name='name' title='Tên' required />
									<CustomFieldFormik name='sign' title='Mã hiệu' required />
									<CustomFieldFormik name='note' title='Ghi chú' as="textarea" />

									<CustomAutoCompleteFormik title='Nhóm dự án' name='projectType' data={PROJECT_TYPES} attribute="text" valueAttribute='value' initialData={defaultValues.projectType} />
									<CustomAutoCompleteFormik title='Loại công trình' name='buildingType' data={BUILDING_TYPES} attribute="text" valueAttribute='value' initialData={defaultValues.buildingType} />
									<CustomAutoCompleteFormik title='Cấp công trình' name='buildingGrade' data={BUILDING_GRADES} attribute="text" valueAttribute='value' initialData={defaultValues.buildingGrade} />

									<CustomFieldFormik name='basementNumber' title='Số tầng hầm' />
									<CustomFieldFormik name='basementArea' title='Diện tích tầng hầm' />
									<CustomFieldFormik name='floorNumber' title='Số tầng cao' />
									<CustomFieldFormik name='floorArea' title='Diện tích tầng cao' />
									<CustomAutoCompleteFormik
										title='Tình trạng dự án'
										name='status'
										initialData={defaultValues.status}
										data={DEPARTMENT_STATUS}
										attribute="text"
										valueAttribute='value'
									/>
								</div>
							</div>
							<div className="flex justify-end py-2 px-6 border-t border-cbs-border">
								<div className="mr-1.5">
									<button
										type="submit"
										disabled={isSubmitting || !isValid}
										className="px-4 py-2 rounded-md bg-primary text-white text-small leading-5 disabled:opacity-30 disabled:cursor-not-allowed"
									>
										Xác nhận
									</button>
								</div>
							</div>
							{isLoading && <div className='absolute inset-0'>
								Loading...
							</div>}
						</Form>
					)
				}
			</Formik>
		</Fragment>
	)
}

export default ModalCreateProject