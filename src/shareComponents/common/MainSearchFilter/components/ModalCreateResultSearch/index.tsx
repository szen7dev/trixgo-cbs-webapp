import React, { FC, useState } from "react";

import { useModal } from "services/hooks/useModal";
import { toast } from "react-toastify";

export const ModalCreateResultSearch: FC = () => {
  const { closeModal } = useModal();
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const onCreate = async () => {
    if (!formData.name) {
      toast.error("Vui lòng nhập nội dung.");
      return;
    }

    // const result = await createAppRolesMutateAsync({
    //   type: parseInt(type),
    //   name
    // });
    // if (!result.error) {
    //   closeModal();
    //   toast.success('Tạo thành công');
    // } else {
    //   toast.error(result?.data?.message);
    // }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(previous => ({
      ...previous,
      [name]: value
    }))
  }

  return (
    <main className="relative h-full">
      <header className="px-10 py-5 flex items-center justify-between">
        <p className="font-bold text-xl">Lưu kết quả tìm kiếm</p>
        <img
          src={`${process.env.PUBLIC_URL}/images/common/icon-small-bold-close.svg`}
          alt="Close"
          className="cursor-pointer"
          onClick={closeModal}
        />
      </header>

      <section className="px-10 py-2">
        <input
          type="text"
          placeholder="Nhập nội dung"
          name="name"
          className="h-12 w-full border border-primary-border outline-none px-8"
          onChange={onChange}
        />
      </section>

      <section className="px-10 mt-2">
        <input
          type="text"
          placeholder="Nhập mô tả"
          name="description"
          className="h-12 w-full border border-primary-border outline-none px-8"
          onChange={onChange}
        />
      </section>

      <footer className="absolute right-0 bottom-0 px-10 py-5">
        <button className="bg-primary text-primary-light text-base w-24 h-8 rounded"
          onClick={onCreate}>
          Xác nhận
        </button>
      </footer>
    </main>
  );
};