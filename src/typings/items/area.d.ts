import { User } from "./user";

type Area = {
    parent: {
        parent: string,
        level: number,
        name: string,
        sign: string,
        userCreate: User
    },
    level: number,
    name: string,
    sign: string,
    userCreate: User
}

type ListAreaPayload = {
    select?: string,
    populates?: string,
    limit?: string,
    keyword?: string,
    lastestID?: string,
}

interface ModalProps {
    show: boolean;
    toggle(): void;
    modalType?: "create" | "update";
    initialValues?: {
        companyID?: string,
        name: string,
        sign: string,
        taxid: string,
        address: string,
        area: string,
        phone?: string,
        email?: string,
        areaName?: string,
    };
    onConfirm?(): void
}