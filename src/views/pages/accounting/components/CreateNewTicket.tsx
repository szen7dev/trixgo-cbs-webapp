import React,{FC} from "react";
import Close from "../../../../assets/icons/Close";
import {useModal} from "../../../../services/hooks/useModal";
import DropdownSearchable from "../../../../components/common/DropdownSearch";
import DatePicker from "react-datepicker";
import CreateNewTicketForm from "./CreateNewTicketForm";
import CreateNewTicketTableAccount from "./CreateNewTicketTableAccount";

const CreateNewTicket:FC = () => {
    const { closeModal } = useModal();

    return (
        <div className={"flex flex-col h-screen"}>
            <div className={"flex w-full py-3 px-6 border-b"}>
                <h4 className={"flex-1 text-lg font-bold text-left"}>Phiếu mới</h4>
                <div className={"flex items-center justify-center"}>
                    <Close onClick={() => closeModal()}/>
                </div>
            </div>
            <div className={"flex-1 overflow-x-scroll create-ticket-working-space"}>
                <CreateNewTicketForm />
                <CreateNewTicketTableAccount />
            </div>
            <div className={"flex items-center justify-end border-t p-2"}>
                <button
                    className="btn btn-primary"
                >
                    Xác nhận
                </button>
            </div>
        </div>
    )
}

export default CreateNewTicket;
