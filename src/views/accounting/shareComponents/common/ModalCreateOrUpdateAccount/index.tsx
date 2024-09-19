import React, { FC, useState } from "react";

import { useModal } from "services/hooks/useModal";
import { useAccount } from "services/hooks/items/useAccount";
import { toast } from "react-toastify";
import { ModalProps } from 'typings/items/doctype';

export const ModalCreateOrUpdateAccount: FC<ModalProps> = ({
  modalType,
  onConfirm,
  initialValues = {
    accountID: '',
    name: '',
    description: '',
    type: '',
    status: '',
  }
}) => {
  const { closeModal } = useModal();
  const [formData, setFormData] = useState(initialValues);
  const { insertAsync, updateAsync } = useAccount({});

  const handleSubmit = async () => {
    if(!formData.name) {
      return toast.warn('Vui lòng nhập nội dung');
    }

    try {
      // Handle api here!
      switch (modalType) {
        // Tạo mẩu tin
        case 'create': {
          const { error, data } = await insertAsync(formData);

          if (error) {
            return toast.error(data.message);
          }

          toast.success('Tạo thành công', { autoClose: 500 });
          break;
        }

        // Cập nhật mẩu tin
        case 'update': {
          const { error, data } = await updateAsync(formData);

          if (error) {
            return toast.error(data.message);
          }

          toast.success('Cập nhật thành công', { autoClose: 500 });
          break;
        }
        
        default:
          break;
      }
    } catch (error: unknown) {
      if (typeof error === "string") {
        toast.error(error);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }

    onConfirm && onConfirm();
    closeModal();
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
        <p className="font-bold text-xl">
          {modalType === 'create' ? 'Tạo mới' : 'Cập nhật'}
        </p>
        <img
          src={`${process.env.PUBLIC_URL}/images/common/icon-small-bold-close.svg`}
          alt="Close"
          className="cursor-pointer"
          onClick={closeModal}
        />
      </header>

      <section className="px-10 py-2">
        <p>Phân loại</p>
        <input
          type="text"
          placeholder="Phân loại: 1-Thông thường|2-Phục vụ Quỹ"
          name="type"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData.type}
          onChange={onChange}
        />
      </section>

      <section className="px-10 py-2">
        <p>Tên tài khoản</p>
        <input
          type="text"
          placeholder="Nhập nội dung"
          name="name"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData.name}
          onChange={onChange}
        />
      </section>

      <section className="px-10 mt-2">
        <p>Mô tả tài khoản</p>
        <input
          type="text"
          placeholder="Nhập mô tả"
          name="description"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData.description}
          onChange={onChange}
        />
      </section>

      <section className="px-10 py-2">
        <p>Trạng thái</p>
        <input
          type="text"
          placeholder="Trạng thái: 1-Hoạt động|2-Hủy"
          name="status"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData.status}
          onChange={onChange}
        />
      </section>

      <footer className="absolute right-0 bottom-0 px-10 py-5">
        <button className="bg-primary text-primary-light text-base w-24 h-8 rounded"
          onClick={handleSubmit}>
          Xác nhận
        </button>
      </footer>
    </main>
  );
};