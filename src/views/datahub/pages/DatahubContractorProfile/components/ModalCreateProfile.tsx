import React, { FC, Fragment, useState } from 'react';
import { Form, Formik } from 'formik';
import { Dialog } from '@headlessui/react';
import { object, string } from 'yup';

import useProfileDetail from 'services/hooks/datahub/profile/useProfileDetail';

import { CustomFieldFormik } from 'shareComponents/common/Form/CustomForm';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import DatahubRepository from 'apis/datahub';
import { DatahubCompanies } from 'typings/datahub/company';
import { buildDatahubProfilesKey } from 'apis/datahub/profiles';
import { DatahubProfile } from 'typings/datahub/profile';

type Props = {
  company?: DatahubCompanies;
  profile?: DatahubProfile;

  toggle: () => void;
};

const DatahubProfileSchema = object().shape({
	name: string().required(),
})

const ModalCreateProfile: FC<Props> = (props) => {
	const [initialValues, setInitialValues] = useState({ name: '' });
	const queryClient = useQueryClient();

	useProfileDetail(props.profile?._id, {
    onSuccess(data) {
      if (data.status === 200) {
        setInitialValues({ name: data.data.name });
      }
    },
  });
  const createMutationPackage = useMutation(DatahubRepository.createDatahubProfile, {
    onSuccess() {
      toast.success("Tạo mới thành công");
      queryClient.refetchQueries(buildDatahubProfilesKey({ contractorID: props.company?._id }))
    },
  });
  const updateMutationPackage = useMutation(DatahubRepository.updateDatahubProfile, {
    onSuccess() {
      toast.info("Cập nhật thành công");
      queryClient.refetchQueries(buildDatahubProfilesKey({ contractorID: props.company?._id }))
    },
  });

  const handleSubmitForm = async (values: typeof initialValues) => {
    if (props.profile) {
      updateMutationPackage.mutate({
        datahubProfileID: props.profile._id,
        name: values.name,
        // files: props.profile.files,
      });
    } else if (props.company) {
      createMutationPackage.mutate({
        company: props.company._id,
        name: values.name,
      });
    }
    props.toggle();
  };

	return (
		<Fragment>
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmitForm}
				enableReinitialize
				validationSchema={DatahubProfileSchema}
			>
				<Form>
					<div className="flex items-center px-6 py-2.5 justify-between border-b border-secondary-gray border-opacity-30">
						<Dialog.Title as="h3" className="text-lg leading-6 font-bold">
							{
								props.profile?._id ? "Cập nhật" : "Tạo mới"
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
					<div className="px-5 pb-4 overflow-x-auto">
						<div className="whitespace-nowrap space-y-4 py-5">
							<CustomFieldFormik name='name' title="Nội dung" required />
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

export default ModalCreateProfile