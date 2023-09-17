import React, { FC, Fragment, useState } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import { Dialog } from '@headlessui/react'

import { CustomAutoCompleteFormik, CustomFieldFormik } from 'shareComponents/common/Form/CustomForm'
import { string, object, number } from 'yup';
import { useQueryClient } from 'react-query';

import { ResponseCreateSuccess } from "typings/apis/response";

import { DatahubTypes } from 'typings/datahub/datahubtypes';
import { useUpdateDatahubType, useDatahubType, useCreateDatahubType } from 'services/hooks/datahub';

const POPULAR = [
	{ name: 'Phổ biến', value: 1 },
	{ name: 'Thông thường', value: 2 },
]

type Props = {
	type: 'create' | 'edit',
	datahubID?: string,
	datahubType: 1 | 2 | 3,
	parent?: string,

	toggle: () => void
	onSuccessCreate?: (data: ResponseCreateSuccess<DatahubTypes>) => void
}
const DatahubTypesSchema = object().shape({
	description: string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	name: string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	popular: number().min(1).required('Required'),
});

const ModalCreateType: FC<Props> = ({ ...props }) => {
	const [initialValues, setInitialValues] = useState({
		description: '', name: '', popular: 0
	})
	const { updateDatahubType } = useUpdateDatahubType();
	const { createDatahubType } = useCreateDatahubType({ onSuccess: props.onSuccessCreate });
	const { isLoading } = useDatahubType(props.datahubID, {
		onSuccess(data) {
			if ('error' in data && !data.error) {
				setInitialValues({ description: data.data.description, name: data.data.name, popular: data.data.popular })
			}
		}
	});

	const queryClient = useQueryClient();

	async function handleSubmit({ description, name, popular }: typeof initialValues, actions: FormikHelpers<typeof initialValues>) {
		if (!popular || !props.datahubType) return;

		if (props.type === 'create') {
			createDatahubType({ description, name, type: props.datahubType, popular, parent: props.parent }, {
				onSuccess(data) {
					if ('code' in data) {
						data.data.forEach((d) => actions.setFieldError(d.field, d.message));
					} else {
						queryClient.removeQueries(['datahub_types']);
						props.toggle();
					}
				}
			});
		} else if (props.type === 'edit') {
			updateDatahubType({ datahubID: props.datahubID as string, description, name, type: props.datahubType, popular, parent: props.parent }, {
				onSuccess(data) {
					if ('code' in data) {
						data.data.forEach((d) => actions.setFieldError(d.field, d.message));
					} else {
						queryClient.removeQueries(["datahub_types"], { inactive: true });
						queryClient.refetchQueries(["datahub_types", ""]);
						props.toggle();
					}
				}
			});
		}
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
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={DatahubTypesSchema}
				enableReinitialize
			>
				{({ isSubmitting, isValid }) => (
					<Form className='relative'>
						<div className="px-5 pb-4 overflow-x-auto min-h-[500px]">
							<div className="whitespace-nowrap space-y-4 py-5">
								{/* Fisrt row */}
								<CustomFieldFormik title='Nội dung' required name='name' as="textarea" />
								<CustomFieldFormik title='Mô tả' required name='description' />
								<CustomAutoCompleteFormik
									title='Tính chất phổ biến'
									name='popular'
									required
									valueAttribute='value'
									data={POPULAR}
									initialData={POPULAR.find(t => t.value === initialValues.popular)?.name}
								/>
								<div className="py-0.5 h-[30px] box-content px-2">

								</div>
							</div>
						</div>
						<div className="flex justify-end py-2 px-6 border-t border-cbs-border">
							<div className="mr-1.5">
								<button
									type="submit"
									disabled={!isValid || isSubmitting}
									className="px-4 py-2 rounded-md bg-primary text-white text-small leading-5 disabled:opacity-30 disabled:cursor-not-allowed"
								>
									Xác nhận
								</button>
							</div>
						</div>
						{isLoading && <div className='bg-white absolute inset-0 flex items-center justify-center'>
							Loading...
						</div>}
					</Form>
				)}
			</Formik>
		</Fragment>
	)
}

export default ModalCreateType