export type PcmPlanReport = {
    _id: string;
    name: string;
    sign: string;
};

export interface ModalProps {
    initialValues?: {
        subjectID: string,
        name?: string,
        description?: string
    }
    onConfirm?(): void
}