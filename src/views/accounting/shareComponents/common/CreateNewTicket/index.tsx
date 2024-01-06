import React, { FC, useCallback, useEffect, useState } from "react";
import CloseIcon from "assets/images/icon-small-bold-close.svg";
import { useModal } from "services/hooks/useModal";
import CreateNewTicketForm from "./components/CreateNewTicketForm";

import { Form, Formik } from "formik";
import { string, object, array } from 'yup';

import {
  convertDateToString,
  convertInitialValueDropdown,
  convertInitialValueDropdownForLocalDB,
  MESSAGE_ERROR
} from "utils/cmcs"
import { isEmpty } from "lodash";
import API from "apis/repository";

import { VOUCHER_TYPES } from "apis/localdb/index";

const mappingData = (data: any, isDataPayLoad = false) => {
  return {
    voucherID: data._id || data.voucherID || '',
    type: isDataPayLoad ? Number(data.type.value) : convertInitialValueDropdownForLocalDB(VOUCHER_TYPES, data.type),
    vat: Number(data.vat) || 0,
    advancePayment: data.advancePayment ? true : false,
    forward: data.forward ? true : false,
    returning: data.returning ? true : false,
    cancel: data.cancel ? true : false,

    funda: isDataPayLoad ? data?.funda?.value : convertInitialValueDropdown(data?.funda || ''),
    fundaID: data?.funda?.value,
    linkFunda: isDataPayLoad ? data?.linkFunda?.value : convertInitialValueDropdown(data?.linkFunda || ''),
    linkFundaID: data?.linkFunda?.value,
    customer: isDataPayLoad ? data?.customer?.value : convertInitialValueDropdown(data?.customer || ''),
    customerID: data?.customer?.value,
    contract: isDataPayLoad ? data?.contract?.value : convertInitialValueDropdown(data?.contract || ''),
    contractId: data?.contract?.value,
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
      budgetWork: isDataPayLoad ? item?.budgetWork?.value : convertInitialValueDropdown(item?.budgetWork || ''),
      job: item.job || '',
      note: item.note || '',
      updown: item.updown || 1,

    }
  })
}

export const CreateNewTicket: FC<any> = ({ onFinish, title, idEdit = '', isEdit = false, contractId = '', type = 1 }) => {
  const { closeModal } = useModal();

  const [initialValues, setInitialValues] = useState(mappingData({ contractId, type }));

  const APP_ACCOUNTING_VOUCHER = "/api/accounting/vouchers";
  const APP_ACCOUNTING_JOURNAL = "/api/accounting/journals";

  useEffect(() => {
    const fetchDetailAccountingVoucher = async (id: any) => {
      const { data } = await API.get(
        `${APP_ACCOUNTING_VOUCHER}?voucherID=${id}`, {
        params: {
          populates: {
            "path": "funda linkFunda customer contract ipc subtype",
            "select": "name description",
          }
        }
      }
      )
      const { data: selectedJournals } = await API.get(
        `${APP_ACCOUNTING_JOURNAL}?voucherID=${id}`, {
        params: {
          populates: {
            "path": "debit credit customerCredit customerDebit warehouse goods contract budgetWork",
            "select": "name description",
          }
        }
      })
      const dataDetail = {
        ...data.data,
        contractId,
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
          "path": "debit credit customerCredit customerDebit warehouse contract budgetWork",
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
  )

  const formValidation = object().shape({
    type: object().required(MESSAGE_ERROR.required),
    customer: object().required(MESSAGE_ERROR.required),

    date: string().required(MESSAGE_ERROR.required),
    name: string().required(MESSAGE_ERROR.required),

    selectedJournals: array().of(
      object().shape({
      })
    )
  });

  return (
    <div className={"flex flex-col h-screen"}>
      <div className={"flex w-full py-3 px-6 border-b"}>
        <h4 className={"flex-1 text-lg font-bold text-left"}>{title}</h4>
        <div className={"flex items-center justify-center cursor-pointer"}>
          <img
            src={CloseIcon}
            alt="Close"
            className="cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
      </div>
      <Formik initialValues={initialValues} validationSchema={formValidation} enableReinitialize={true} onSubmit={handleSubmit}>
        {(formik) => {
          const { values } = formik;

          return (
            <Form style={{ 'height': 'calc(100% - 110px)' }}>
              <div className={"flex-1 h-full overflow-x-scroll create-ticket-working-space"}>
                <CreateNewTicketForm formik={formik} initialValues={initialValues} />
              </div>
              {lastestIDJournals && (
                <div>
                  <button type="button" onClick={() => loadMoreSelectedJournals()}>
                    <span className="text-primary">{`Xem thêm (${totalRecord - values.selectedJournals?.length})`}</span>
                  </button>
                </div>
              )}
              <div className={"flex items-center justify-end border-t p-2"}>
                <button
                  className="btn btn-primary"
                  disabled={!formik.isValid}
                  type="submit"
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