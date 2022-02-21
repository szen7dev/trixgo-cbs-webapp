import { FC } from "react";

import { useModal } from "services/hooks/useModal";

import CloseIcon from "assets/images/icon-small-bold-close.svg";

const CreateConfigModal: FC = () => {
  const { closeModal } = useModal();

  return (
    <main className="relative h-full">
      <header className="px-10 py-9 flex items-center justify-between">
        <p className="font-bold text-xl">Tạo mới</p>
        <img
          src={CloseIcon}
          alt="Close"
          className="cursor-pointer"
          onClick={() => closeModal()}
        />
      </header>

      <section className="px-10 mt-2">
        <input
          type="text"
          placeholder="Nhập nội dung"
          className="h-12 w-full border border-primary-border outline-none px-8"
        />
      </section>

      <footer className="absolute right-0 bottom-0 px-10 py-9">
        <button className="bg-primary text-primary-light text-base w-24 h-8 rounded">
          Xác nhận
        </button>
      </footer>
    </main>
  );
};

export default CreateConfigModal;
