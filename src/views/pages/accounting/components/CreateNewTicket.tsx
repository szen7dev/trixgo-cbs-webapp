import React, { FC, useCallback, useState } from "react";
import Close from "../../../../assets/icons/Close";
import { useModal } from "../../../../services/hooks/useModal";
import DropdownSearchable from "../../../../components/common/DropdownSearch";
import DatePicker from "react-datepicker";
import CreateNewTicketForm from "./CreateNewTicketForm";

import { Form, Formik } from "formik";

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

        date: data.date || '',
        signInvoice: data.signInvoice || '',
        dateInvoice: data.dateInvoice || '',
        receiver: data.receiver || '',

        name: data.name || '',
        note: data.note || '',
        sign: data.sign || '',
        fcuExRate: data.fcuExRate || 22750,

        selectedJournals: [
            {
                debit: '',
                credit: '',
                customerDebit: '',
                customerCredit: '',
                goods: '',
                warehouse: '',
                inventory: 123,
                quantity: 0,
                unitprice: 0,
                amount: 0,
                contract: 3,
                job: '',
                note: '',
                updown: 0,
            }
        ]
    }
}

const CreateNewTicket: FC = () => {
    const { closeModal } = useModal();

    const [initialValues, setInitialValues] = useState(mappingData({}));

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

            //   const isSuccess = await onFinish(mappingData(formatData), isEdit);
            //   if (isSuccess) {
            //     closeModal();
            //   }
        },
        [closeModal]
    );

    return (
        <div className={"flex flex-col h-screen"}>
            <div className={"flex w-full py-3 px-6 border-b"}>
                <h4 className={"flex-1 text-lg font-bold text-left"}>Phiếu mới</h4>
                <div className={"flex items-center justify-center"}>
                    <Close onClick={() => closeModal()} />
                </div>
            </div>
            <Formik initialValues={initialValues} enableReinitialize={true} onSubmit={handleSubmit}>

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
