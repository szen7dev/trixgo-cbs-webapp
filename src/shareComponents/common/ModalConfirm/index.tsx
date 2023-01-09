import { FC } from "react";

type Props = {
    title?: string;
    description?: string;
    customComponent?: React.ReactNode;
    isAddTextarea?: boolean;
    onKeyUpTextarea?: (e: any) => void;
    defaultText?: boolean;
    onCancel?: () => void;
    onConfirm: () => void;
}

export const ModalConfirm: FC<Props> = ({ title, description, customComponent, isAddTextarea, onKeyUpTextarea, defaultText = true, onConfirm, onCancel }) => {
    return (
        <main className="relative h-full">
            <header className="px-10 py-4">
                <p className="font-bold text-xl">
                    {title ? title : 'Bạn có muốn xóa không?'}
                </p>
            </header>

            <section className="px-10 text-primary-gray">
                <p>
                    {defaultText ? 'Dữ liệu của bạn sẽ bị xóa vĩnh viễn và bạn không thể khôi phục lại dữ liệu này' : description}
                </p>
            </section>

            {customComponent}

            {isAddTextarea && (
                <section className="px-10 mt-2 mb-2">
                    <textarea rows={3} onKeyUp={onKeyUpTextarea} className="block p-2 w-full rounded-md border border-gray-300 resize-y focus:outline-none" placeholder="Nhập nội dung ghi chú"></textarea>
                </section>
            )}

            <footer className="absolute right-0 bottom-0 px-10 py-9">
                <button
                    className="bg-cbs-gray text-dark text-base w-24 h-8 rounded mr-4"
                    onClick={onCancel}
                >
                    Hủy
                </button>
                <button
                    className="bg-primary text-primary-light text-base w-24 h-8 rounded"
                    onClick={onConfirm}
                >
                    Xác nhận
                </button>
            </footer>
        </main>
    );
};