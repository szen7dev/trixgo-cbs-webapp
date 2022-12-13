import React, { FC, useState } from "react";

import { useModal } from "services/hooks/useModal";
import { useStorage } from "services/hooks/items/useStorage";
import { useFunda } from "services/hooks/items/useFunda";
import { toast } from "react-toastify";
import { ModalProps } from 'typings/items/doctype';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import moment from "moment";
export const ModalCreateOrUpdateFunda: FC<any> = ({
  modalType,
  onConfirm,
  initialValues = {
    fundaID: '',
    name: '',
    sign: '',
    description: '',
    address: '',
    initialDay: new Date(),
    campaign: 1,
    internal: 1
  }
}) => {
  console.log({ initialValues });
  const { closeModal } = useModal();
  const [formData, setFormData] = useState(initialValues);
  const { insertAsync, updateAsync } = useFunda({});

  const handleSubmit = async () => {
    if(!formData.name) {
      return toast.warn('Vui lòng nhập nội dung');
    }

    const formDataFormat = { ...formData, campaign: +formData.campaign, internal: +formData.internal };
    try {
      // Handle api here!
      switch (modalType) {
        
        // Tạo mẩu tin
        case 'create': {
          const { error, message } = await insertAsync(formDataFormat);

          if (error) {
            return toast.warning(message);
          }

          toast.success('Tạo thành công', { autoClose: 1500 });
          break;
        }

        // Cập nhật mẩu tin
        case 'update': {
          
          const { error, message } = await updateAsync(formDataFormat);

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
        // toast.error(error.message);
      }
    }

    onConfirm && onConfirm();
    closeModal();
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((previous: any) => ({
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
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtName">
          Nội dung
        </label>
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
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtSign">
          Mã hiệu
        </label>
        <input
          type="text"
          placeholder="Nhập mã hiệu"
          name="sign"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData?.sign}
          onChange={onChange}
        />
      </section>

      <section className="px-10 mt-2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtDescription">
          Mô tả
        </label>
        <input
          type="text"
          placeholder="Mô tả"
          name="description"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData?.description}
          onChange={onChange}
        />
      </section>

      <section className="px-10 mt-2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtAddress">
          Địa chỉ
        </label>
        <input
          type="text"
          placeholder="Địa chỉ"
          name="address"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData?.address}
          onChange={onChange}
        />
      </section>

      <section className="px-10 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtInitialDay">
            Ngày bắt đầu
          </label>
        <input
          type="date"
          placeholder="Ngày bắt đầu"
          name="initialDay"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={moment(formData.initialDay).format('YYYY-MM-DD')}
          onChange={onChange}
        />
      </section>
      <section className="px-10 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtCampaign">
            Chiến dịch quảng cáo
          </label>
          <div className={"flex items-center"}>
            <div className={"flex items-center ml-3"}>
                <input
                  type="radio"
                  value={1}
                  name="campaign"
                  className="form-check-input mt-0"
                  defaultValue={formData.campaign}
                  checked={formData.campaign == 1?true: false}
                  onChange={onChange}
                />
                <label htmlFor="campaign" className={"text-left ml-3"}>Tắt</label>
            </div>
            <div className={"flex items-center ml-3"}>
                <input
                  type="radio"
                  value={2}
                  name="campaign"
                  className="form-check-input mt-0"
                  defaultValue={formData.campaign}
                  checked={formData.campaign == 2?true: false}
                  onChange={onChange}
                />
                <label htmlFor="campaign" className={"text-left ml-3"}>Bật</label>
            </div>
          </div>
      </section>

      <section className="px-10 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtInternal">
            Phân loại
          </label>
          <div className={"flex items-center"}>
            <div className={"flex items-center ml-3"}>
                <input
                  type="radio"
                  value={1}
                  name="internal"
                  className="form-check-input mt-0"
                  defaultValue={formData.internal}
                  checked={formData.internal == 1?true: false}
                  onChange={onChange}
                />
                <label htmlFor="internal" className={"text-left ml-3"}>Hệ thống</label>
            </div>
            <div className={"flex items-center ml-3"}>
                <input
                  type="radio"
                  value={2}
                  name="internal"
                  className="form-check-input mt-0"
                  defaultValue={formData.internal}
                  checked={formData.internal == 2?true: false}
                  onChange={onChange}
                />
                <label htmlFor="internal" className={"text-left ml-3"}>Nhượng quyền</label>
            </div>
          </div>
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