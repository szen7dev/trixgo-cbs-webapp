/*=====1.LIBRARY=====*/
import React, { FC, useState } from "react";
import { toast } from "react-toastify";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/

/*=====4.PAGES/COMPONENTS=====*/
import { ModalProps } from 'typings/items/customer';

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useModal } from "services/hooks/useModal";
import { useCustomer } from "services/hooks/items/useCustomer";

/*=====7.OTHER=====*/
export const ModalCreateOrUpdateCustomer: FC<ModalProps> = ({
  modalType,
  onConfirm,
  initialValues = {
    contactID: '',
    name: '',
    address: '',
    taxid: '',
    phone: '',
    description: '',
  }
}) => {
  const { closeModal } = useModal();
  const [formData, setFormData] = useState(initialValues);
  const { addAsync, updateAsync } = useCustomer({});

  const handleSubmit = async () => {
    if(!formData.name) {
      return toast.warn('Vui lòng nhập nội dung');
    }

    try {
      // Handle api here!
      switch (modalType) {
        // Tạo mẩu tin
        case 'create': {
          const { error, message } = await addAsync(formData);

          if (error) {
            return toast.warning(message);
          }

          toast.success('Tạo thành công', { autoClose: 1500 });
          break;
        }

        // Cập nhật mẩu tin
        case 'update': {
          const { error, message } = await updateAsync(formData);

          if (error) {
            return toast.warning(message);
          }

          toast.success('Cập nhật thành công', { autoClose: 1500 });
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
        <input
          type="text"
          placeholder="Nhập tên"
          name="name"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData.name}
          onChange={onChange}
        />
      </section>

      <section className="px-10 py-2">
        <input
          type="text"
          placeholder="Nhập địa chỉ"
          name="address"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData.address}
          onChange={onChange}
        />
      </section>

      <section className="px-10 py-2">
        <input
          type="text"
          placeholder="Nhập mã số thuế"
          name="taxid"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData.taxid}
          onChange={onChange}
        />
      </section>

      <section className="px-10 py-2">
        <input
          type="text"
          placeholder="Nhập điện thoại"
          name="phone"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData.phone}
          onChange={onChange}
        />
      </section>

      <section className="px-10 mt-2">
        <input
          type="text"
          placeholder="Nhập mô tả"
          name="description"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData.description}
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