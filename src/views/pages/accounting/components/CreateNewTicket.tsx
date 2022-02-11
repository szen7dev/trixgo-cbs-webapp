import React, { FC, useCallback, useEffect, useState } from "react";
import Close from "../../../../assets/icons/Close";
import { useModal } from "../../../../services/hooks/useModal";
import DropdownSearchable from "../../../../components/common/DropdownSearch";
import DatePicker from "react-datepicker";
import CreateNewTicketForm from "./CreateNewTicketForm";

import { Form, Formik } from "formik";
import { string, object, number, array } from 'yup';
import { MESSAGE_ERROR } from "helpers/constants"
import { convertDateToString } from "helpers/index"
import {
  useDetailAccountingVoucherMutation
} from "services/hooks/useAccountingVoucher";
import { isEmpty } from "lodash";
import API from "apis/repository";

const mappingData = (data: any) => {
  return {
    type: Number(data.type) || 0,
    vat: 0,
    advancePayment: data.advancePayment ? true : false,
    forward: data.forward ? true : false,
    returning: data.returning ? true : false,
    cancel: data.cancel ? true : false,

    customer: data.customer || '',
    contract: data.contract || '',
    ipc: data.ipc || '',
    subtype: data.subtype || '',

    date: convertDateToString(data.date) || '',
    signInvoice: data.signInvoice || '',
    dateInvoice: data.dateInvoice || '',
    receiver: data.receiver || '',

    name: data.name || '',
    note: data.note || '',
    sign: data.sign || '',
    fcuExRate: data.fcuExRate || 22750,

    selectedJournals: data.selectedJournals || [
      {
        debit: '',
        credit: '',
        customerDebit: '',
        customerCredit: '',
        goods: '',
        warehouse: '',
        inventory: 123,
        amount: '',
        quantity: '',
        unitPrice: '',
        contract: 3,
        job: '',
        note: '',
        updown: '',
      }
    ]
  }
}

const CreateNewTicket: FC<any> = ({ defaultValues, onFinish, title, idEdit = '', isEdit = false, }) => {
  const { closeModal } = useModal();

  const [initialValues, setInitialValues] = useState(mappingData({}));

  // const { detailAccountingVoucher } = useDetailAccountingVoucherMutation(idEdit);
  const APP_ACCOUNTING = "/api/accounting/voucher";

  useEffect(() => {
    // detailAccountingVoucher = await fetchDetailAccountingVoucher(idEdit)
    const fetchDetailAccountingVoucher = async (id: any) => {
      const { data } = await API.get(
        `${APP_ACCOUNTING}/${id}`
      )
      console.log('🚀 ~ fetchDetailAccountingVoucher ~ data', data)

      const dataDetail = {
        ...data.data?.infoVoucher,
        selectedJournals: [...data.data?.listJournal || []]
      }
      console.log('🚀 ~ useEffect ~ dataDetail', dataDetail)
      // !isEmpty(dataDetail) && setInitialValues(mappingData(dataDetail))
      return data
    }
    // fetchDetailAccountingVoucher(idEdit)
  }, [idEdit]);

  const handleSubmit = useCallback(
    async (values: any) => {
      const formatData = {
        ...values,
      }

      console.log('🚀 ~ formatData', formatData)
      //   if (isEdit) {
      //     formatData = {
      //       ...values,
      //       contractID: detailContract._id
      //     }
      //   }

      const isSuccess = await onFinish(mappingData(formatData), isEdit);
      if (isSuccess) {
        closeModal();
      }
    },
    [closeModal]
  );

  const formValidation = object().shape({
    type: number().required(MESSAGE_ERROR.required),
    customer: string().required(MESSAGE_ERROR.required),

    date: string().required(MESSAGE_ERROR.required),
    name: string().required(MESSAGE_ERROR.required),
    sign: string().required(MESSAGE_ERROR.required),

    selectedJournals: array().of(
      object().shape({
        // customerDebit: string().required(MESSAGE_ERROR.required),
      })
    )
  });

  return (
    <div className={"flex flex-col h-screen"}>
      <div className={"flex w-full py-3 px-6 border-b"}>
        <h4 className={"flex-1 text-lg font-bold text-left"}>{title}</h4>
        <div className={"flex items-center justify-center"}>
          <Close onClick={() => closeModal()} />
        </div>
      </div>
      <Formik initialValues={initialValues} validationSchema={formValidation} enableReinitialize={true} onSubmit={handleSubmit}>

        {(formik) => {
          const { handleBlur, setFieldValue } = formik;
          return (
            <Form style={{ 'height': 'calc(100% - 110px)' }}>
              <div className={"flex-1 h-full overflow-x-scroll create-ticket-working-space"}>

                <CreateNewTicketForm formik={formik} initialValues={initialValues} />

              </div>
              <div className={"flex items-center justify-end border-t p-2"}>
                <button
                  className="btn btn-primary"
                  disabled={!formik.isValid}
                >
                  Xác nhận
                </button>
              </div>
            </Form>)
        }}
      </Formik>
    </div>
  )
}

export default CreateNewTicket;
