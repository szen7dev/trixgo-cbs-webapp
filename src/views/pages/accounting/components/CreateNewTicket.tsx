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
import { isEmpty } from "lodash";
import API from "apis/repository";

import { convertInitialValueDropdown } from "helpers/index"
import { VOUCHER_TYPES } from "apis/localdb/index";

const mappingData = (data: any, isDataPayLoad = false) => {
  return {
    voucherID: data._id || data.voucherID || '',
    type: isDataPayLoad ? Number(data.type.value) : convertInitialValueDropdown(Number(data.type) ? VOUCHER_TYPES.find(item => item.value === data.type) : VOUCHER_TYPES[0], 'value', 'text'),
    vat: Number(data.vat) || 0,
    advancePayment: data.advancePayment ? true : false,
    forward: data.forward ? true : false,
    returning: data.returning ? true : false,
    cancel: data.cancel ? true : false,

    customer: isDataPayLoad ? data?.customer?.value : convertInitialValueDropdown(data?.customer || ''),
    contract: isDataPayLoad ? data?.contract?.value : convertInitialValueDropdown(data?.contract || ''),
    ipc: isDataPayLoad ? data?.ipc?.value : convertInitialValueDropdown(data?.ipc || ''),
    subtype: isDataPayLoad ? data?.subtype?.value : convertInitialValueDropdown(data?.subtype || ''),

    date: convertDateToString(data.date) || '',
    signInvoice: data.signInvoice || '',
    dateInvoice: convertDateToString(data.dateInvoice) || '',
    receiver: data.receiver || '',

    name: data.name || '',
    note: data.note || '',
    sign: data.sign || '',
    fcuExRate: data.fcuExRate || 22750,

    selectedJournals: data.selectedJournals || [
      {
        journalID: null,
        debit: '',
        credit: '',
        customerDebit: '',
        customerCredit: '',
        goods: '',
        warehouse: '',
        inventory: '',
        amount: '',
        quantity: '',
        unitprice: '',
        contract: '',
        job: '',
        note: '',
        updown: '',
      }
    ],
    deletedJournals: data?.deletedJournals && data.deletedJournals.map((item: any) => {
      return item.journalID !== '' && item.journalID
    }) || []
  }
}

const mappingSelectedJournals = (data = [], isDataPayLoad = false) => {
  return data.map((item: any) => {
    return {
      journalID: item._id || item.journalID || '',
      debit: isDataPayLoad ? item?.debit?.value : convertInitialValueDropdown(item?.debit || '', '_id', 'name', 'description'),
      credit: isDataPayLoad ? item?.credit?.value : convertInitialValueDropdown(item?.credit || '', '_id', 'name', 'description'),
      customerDebit: isDataPayLoad ? item?.customerDebit?.value : convertInitialValueDropdown(item?.customerDebit || ''),
      customerCredit: isDataPayLoad ? item?.customerCredit?.value : convertInitialValueDropdown(item?.customerCredit || ''),
      goods: isDataPayLoad ? item?.goods?.value : convertInitialValueDropdown(item?.goods || ''),
      warehouse: isDataPayLoad ? item?.warehouse?.value : convertInitialValueDropdown(item?.warehouse || ''),
      inventory: item.inventory || '',
      quantity: item.quantity || 0,
      unitprice: item.unitprice || 0,
      amount: item.quantity * item.unitprice,
      contract: isDataPayLoad ? item?.contract?.value : convertInitialValueDropdown(item?.contract || ''),
      job: item.job || '',
      note: item.note || '',
      updown: item.updown || 1,

    }
  })
}

const CreateNewTicket: FC<any> = ({ defaultValues, onFinish, title, idEdit = '', isEdit = false, }) => {
  const { closeModal } = useModal();

  const [initialValues, setInitialValues] = useState(mappingData({}));

  const APP_ACCOUNTING_VOUCHER = "/api/accounting/voucher";
  const APP_ACCOUNTING_JOURNAL = "/api/accounting/journal";

  useEffect(() => {
    const fetchDetailAccountingVoucher = async (id: any) => {
      const { data } = await API.get(
        `${APP_ACCOUNTING_VOUCHER}/${id}`, {
        params: {
          populates: {
            "path": "customer contract ipc subtype",
            "select": "name description",
          }
        }
      }
      )
      const { data: selectedJournals } = await API.get(
        `${APP_ACCOUNTING_JOURNAL}?voucherID=${id}`, {
        params: {
          populates: {
            "path": "debit credit customerCredit customerDebit warehouse goods contract",
            "select": "name description",
          }
        }
      })
      const dataDetail = {
        ...data.data,
        selectedJournals: [...mappingSelectedJournals(selectedJournals.data?.listRecords) || []]
      }
      setLastestIDJournals(selectedJournals.data?.nextCursor)
      setTotalRecord(selectedJournals.data?.totalRecord)
      !isEmpty(dataDetail) && setInitialValues(mappingData(dataDetail))
      return data
    }
    idEdit && fetchDetailAccountingVoucher(idEdit)
  }, [idEdit]);

  const [lastestIDJournals, setLastestIDJournals] = useState('');
  const [totalRecord, setTotalRecord] = useState(0);

  const loadMoreSelectedJournals = async () => {

    const { data: selectedJournals } = await API.get(
      `${APP_ACCOUNTING_JOURNAL}?voucherID=${idEdit}`, {
      params: {
        lastestID: lastestIDJournals,
        populates: {
          "path": "debit credit customerCredit customerDebit warehouse contract",
          "select": "name description",
        }
      }
    })
    const dataDetail = {
      ...initialValues,
      selectedJournals: [...initialValues.selectedJournals, ...mappingSelectedJournals(selectedJournals.data?.listRecords) || []]
    }

    setLastestIDJournals(selectedJournals.data?.nextCursor)
    setTotalRecord(selectedJournals.data?.totalRecord)
    !isEmpty(dataDetail) && setInitialValues(mappingData(dataDetail))

  }

  const handleSubmit = useCallback(
    async (values: any) => {
      const formatData = {
        ...values,
        selectedJournals: [...mappingSelectedJournals(values.selectedJournals, true) || []]
      }
      const isSuccess = await onFinish(mappingData(formatData, true), isEdit);
      if (isSuccess) {
        closeModal();
      }
    },
    [closeModal]
  );

  const formValidation = object().shape({
    type: object().required(MESSAGE_ERROR.required),
    customer: object().required(MESSAGE_ERROR.required),

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
        <div className={"flex items-center justify-center cursor-pointer"}>
          <Close onClick={() => closeModal()} />
        </div>
      </div>
      <Formik initialValues={initialValues} validationSchema={formValidation} enableReinitialize={true} onSubmit={handleSubmit}>

        {(formik) => {
          const { handleBlur, setFieldValue, values } = formik;
          return (
            <Form style={{ 'height': 'calc(100% - 110px)' }}>
              <div className={"flex-1 h-full overflow-x-scroll create-ticket-working-space"}>

                <CreateNewTicketForm formik={formik} initialValues={initialValues} />

              </div>
              {lastestIDJournals && (
                <div>
                  <button type="button" onClick={() => {
                    loadMoreSelectedJournals();
                  }}>
                    <span className="text-primary">{`Xem thêm (${totalRecord - values.selectedJournals.length})`}</span>
                  </button>
                </div>
              )}
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
