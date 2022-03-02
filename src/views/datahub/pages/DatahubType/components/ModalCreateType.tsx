import React, { FC, useRef } from 'react'
import { Form, Formik, FormikHelpers, FormikBag, FormikProps } from 'formik'
import { Dialog } from '@headlessui/react'

import { ModalContainer } from 'shareComponents/common';
import { CustomFieldFormik, CustomAutoCompleteFormik } from 'views/datahub/sharedComponents/common';
import { string, object } from 'yup';
import DatahubRepository from 'apis/datahub';
import useMutationDatahubTypes from 'services/hooks/datahub/useMutationDatahubTypes';
import { toast } from 'react-toastify';

type Props = {
	show: boolean
	buttonOnly?: boolean
	type: 'create' | 'edit'

	toggle: () => void
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
	type: object().required('Required'),
});

type FormValues = {
	description: string
	name: string,
	type: { name: string, value: number }
}

const ModalCreateType: FC<Props> = (props) => {
	const initialValues = {
		description: '',
		name: '',
		type: null as null | { name: string, value: number }
	}
	const { createDatahubTypes } = useMutationDatahubTypes();
	const formikRef = useRef<FormikProps<FormValues>>(null);

	async function handleSubmit({ description, name, type }: FormValues, actions: FormikHelpers<FormValues>) {
		if (!type) return;
		const data = await createDatahubTypes({ description, name, type: type.value, popular: 1 });
		if ('code' in data) {
			data.data.forEach((d) => { 
				actions.setFieldError(d.field, d.message);
			});
		} else {
			props.toggle();
		}
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
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<Formik
					initialValues={initialValues as FormValues}
					onSubmit={handleSubmit}
					validationSchema={DatahubTypesSchema}
					innerRef={formikRef}
				>
					<Form>
						<div className="px-5 pb-4 overflow-x-auto min-h-[500px]">
							<div className="whitespace-nowrap space-y-4 py-5">
								{/* Fisrt row */}
								<CustomFieldFormik title='Nội dung' required name='name' as="textarea" />
								<CustomFieldFormik title='Mô tả' required name='description' />
								<CustomAutoCompleteFormik title='Tính chất phổ biến' name='type' required data={[
									{ name: 'Phổ biến', value: 1 },
									{ name: 'Thông thường', value: 2 },
								]} />
								<div className="py-0.5 h-[30px] box-content px-2">

								</div>
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
			</div>
		</ModalContainer>
	)
}

export default ModalCreateType