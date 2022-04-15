import React, { FC, Fragment, useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import { Dialog } from '@headlessui/react'

import { CustomFieldFormik, CustomAutoCompleteFormik } from 'views/datahub/sharedComponents/common';
import { string, object, number } from 'yup';
import { useQueryClient } from 'react-query';

import { ResponseCreateSuccess } from "typings/apis/response";

import { DatahubTypes } from 'typings/datahub/datahubtypes';
import { useDatahubContact } from "services/hooks/datahub/contact/useDatahubContact";
import { toast } from 'react-toastify';

type Props = {
	type: 'create' | 'edit',
	datahubContactID?: string,
	datahubType?: 1 | 2,
	parent?: string,
	refetchList: any,
	toggle: () => void
	onSuccessCreate?: (data: ResponseCreateSuccess<DatahubTypes>) => void
}
const DatahubTypesSchema = object().shape({
	name: string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	sign: string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	taxid: string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	address: string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	// popular: number().min(1).required('Required'),
});

const ModalCreateDatahubContact: FC<Props> = ({ ...props }) => {
	const {
        // create update remove
        createDatahubContactMutateAsync,
		isLoadingCreateDatahubContact,
        updateDatahubContactMutateAsync,
        removeManyDatahubContactMutateAsync,
        // get Info
        infoDatahubContact,
		refetchInfo
	} = useDatahubContact({
		datahubContactID: props.datahubContactID
	}, false, true);

	const [initialValues, setInitialValues] = useState(infoDatahubContact || {
		name: '',
		sign: '',
		taxid: '',
		address: '',
		note: '',
	})

	useEffect(() => {
		if(!infoDatahubContact) return;
		setInitialValues(infoDatahubContact);
	}, [infoDatahubContact])
	
	const handleSubmit = async (params: any) => {
		if (props.type === 'create') {
			const infoAfterInsert = await createDatahubContactMutateAsync(params);
			if(!infoAfterInsert.error){
				props.toggle();
				props.refetchList();
				toast.success("Thêm thành công");
			}else{
				toast.error(infoAfterInsert.data.message);
			}
		}

		if (props.type === 'edit') {
			const infoAfterUpdate = await updateDatahubContactMutateAsync({ ...params, datahubContactID: params._id });
			console.log({ infoAfterUpdate, props })
			if(!infoAfterUpdate.error){
				props.toggle();
				props.refetchList();
				toast.success("Cập nhật thành công");
			}else{
				toast.error(infoAfterUpdate.data.message);
			}
		}
	};
	
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
								<CustomFieldFormik title='Tên' required name='name' />
								<CustomFieldFormik title='Mã hiệu' required name='sign' />
								<CustomFieldFormik title='Mã số thuế' required name='taxid' />
								<CustomFieldFormik title='Địa chỉ' required name='address' as="textarea" />
								<CustomFieldFormik title='Ghi chú' name='note' as="textarea" />

								{/* <CustomAutoCompleteFormik
									title='Tính chất phổ biến'
									name='popular'
									required
									valueAttribute='value'
									data={POPULAR}
									initialData={POPULAR.find(t => t.value === initialValues.popular)?.name}
								/> */}
								<div className="py-0.5 h-[30px] box-content px-2">

								</div>
							</div>
						</div>
						<div className="flex justify-end py-2 px-6 border-t border-cbs-border">
							<div className="mr-1.5">
								<button
									type="submit"
									// disabled={!isValid || isSubmitting}
									className="px-4 py-2 rounded-md bg-primary text-white text-small leading-5 disabled:opacity-30 disabled:cursor-not-allowed"
								>
									Xác nhận
								</button>
							</div>
						</div>
						{isLoadingCreateDatahubContact && <div className='bg-white absolute inset-0 flex items-center justify-center'>
							Loading...
						</div>}
					</Form>
				)}
			</Formik>
		</Fragment>
	)
}

export default ModalCreateDatahubContact