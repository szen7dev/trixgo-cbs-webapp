import React, { FC, Fragment } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { Dialog } from "@headlessui/react";

import { CustomFieldFormik } from "views/datahub/sharedComponents/common";
import { CreateSubjectBody, Lesson, SubjectQueryParams, Subject } from "typings/workshop";

type Props = {
  show: boolean;

  toggle: () => void;
  initialValues?: Partial<(Lesson | Subject) & SubjectQueryParams>;
  onSubmit: (values: CreateSubjectBody, formikHelpers: FormikHelpers<CreateSubjectBody>) => void;
};

const ModalCreateContent: FC<Props> = ({ toggle, initialValues, onSubmit }) => {
  const initialData = {
    name: initialValues?.name || "",
    description: initialValues?.description || "",
  };

  return (
    <Fragment>
      <div className="flex items-center px-6 py-2.5 justify-between border-b border-secondary-gray border-opacity-30">
        <Dialog.Title as="h3" className="text-lg leading-6 font-bold">
          {initialValues?._id ? "Cập nhật" : "Tạo mới"}
        </Dialog.Title>
        <button type="button" onClick={toggle}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <Formik
        initialValues={initialData}
        onSubmit={onSubmit}
        validate={(e) => {
          if (!e.name)
            return {
              name: "Tên không được để trống",
            };
        }}
      >
        <Form>
          <div className="px-5 pb-4 overflow-x-auto">
            <div className="whitespace-nowrap space-y-4 py-5">
              <CustomFieldFormik name="name" title="Tên chủ đề" required />
              <CustomFieldFormik name="description" title="Mô tả" />
            </div>
          </div>
          <div className="flex justify-end py-2 px-6 border-t border-cbs-border">
            <div className="mr-1.5">
              <button type="submit" className="px-4 py-2 rounded-md bg-primary text-white text-small leading-5">
                Xác nhận
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </Fragment>
  );
};

export default ModalCreateContent;
