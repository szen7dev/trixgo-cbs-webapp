import React, { FC, useRef, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { ModalContainer } from 'shareComponents/common'

import { Form, Formik } from 'formik'
import { CustomAutoCompleteFormik, CustomFieldFormik } from 'views/datahub/sharedComponents/common'
import useDatahubCompanies from 'services/hooks/datahub/useDatahubCompanies';
import { string, object } from 'yup';

import { PROJECT_TYPES, BUILDING_TYPES, BUILDING_GRADES, DEPARTMENT_STATUS } from 'apis/localdb'
import useDatahubArea from 'services/hooks/datahub/useDatahubArea'
import { toast } from 'react-toastify'
import useMutationDatahubProject from 'services/hooks/datahub/useMutationDatahubProjects'

type Props = {
	show: boolean
	buttonOnly?: boolean
	type: 'create' | 'edit'

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

const ModalCreateProject: FC<Props> = (props) => {
	const [company, setCompany] = useState('');
	const [area, setArea] = useState('');
	const { data: listCompany } = useDatahubCompanies(['company', company], { select: '_id name', keyword: company }, { enable: props.show });
	const { data: listAddress3 } = useDatahubArea(['area', area], { select: '_id name', keyword: company }, { enable: props.show });
	const comapnyRef = useRef<NodeJS.Timeout>();
	const areaRef = useRef<NodeJS.Timeout>();

	const { createDatahubProject } = useMutationDatahubProject();

	// Declare initialValues here
	const initialValues = {
		project: '', // Dự án
		client: '', // Chủ dự án
		field: '', // Lĩnh vực

		name: '', // Tên hợp đồng
		sign: '', // Mã hiệu
		address: '', // Địa chỉ dự án
		area3: '', // Khu vực dự án

		description: '',
		content: '',
		status: 0,
	}
	const handleSubmit = async (values: typeof initialValues) => {
		toast.success('createSuccessfull');
		await createDatahubProject(values);
		props.toggle();
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
		<ModalContainer isModalOpen={props.show} toggle={() => !props.buttonOnly && props.toggle()}>
			<div
				className="inline-flex flex-col text-black w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white max-w-2xl"
			>
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
				>
					{
						({ isSubmitting, isValid }) => (
							<Form >
								<div className="px-5 pb-4 overflow-x-auto min-h-[500px]">
									<div className="whitespace-nowrap space-y-4 py-5">
										<CustomAutoCompleteFormik title='Chủ đầu tư' name='client' onChange={handleChangeCompanies} required data={listCompany?.data.listRecords || []} valueAttribute="_id" />
										<CustomFieldFormik title='Địa chỉ dự án' required name='address' />
										<CustomAutoCompleteFormik title='Khu vực dự án' name='area3' onChange={handleChangeArea} required data={listAddress3?.data.listRecords || []} valueAttribute="_id" />
										<CustomFieldFormik name='location' title='Địa chỉ theo GG map' />
										<CustomFieldFormik name='name' title='Tên' required />
										<CustomFieldFormik name='sign' title='Mã hiệu' required />
										<CustomFieldFormik name='note' title='Ghi chú' as="textarea" />

										<CustomAutoCompleteFormik title='Nhóm dự án' name='projectType' data={PROJECT_TYPES} attribute="text" valueAttribute='value' />
										<CustomAutoCompleteFormik title='Loại công trình' name='buildingType' data={BUILDING_TYPES} attribute="text" valueAttribute='value' />
										<CustomAutoCompleteFormik title='Cấp công trình' name='buildingGrade' data={BUILDING_GRADES} attribute="text" valueAttribute='value' />

										<CustomFieldFormik name='basementNumber' title='Cấp công trình' />
										<CustomFieldFormik name='basementArea' title='Diện tích tầng hầm' />
										<CustomFieldFormik name='floorNumber' title='Số tầng cao' />
										<CustomFieldFormik name='floorArea' title='Diện tích tầng cao' />
										<CustomAutoCompleteFormik
											title='Tình trạng dự án'
											name='status'
											initialData={DEPARTMENT_STATUS.find(d => d.value === initialValues.status)?.text || ''}
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
							</Form>
						)
					}
				</Formik>
			</div>
		</ModalContainer>
	)
}

export default ModalCreateProject