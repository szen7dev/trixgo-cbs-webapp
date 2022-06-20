import React, { FC, useState } from "react";
import { toast } from "react-toastify";

import { DropdownSearchable } from "shareComponents/common";
import { useModal } from "services/hooks/useModal";
import { useCashFlowPlan } from "services/hooks/financial/useCashFlow";
import { ModalProps } from 'typings/financial/cashFlowPlan';

export const ModalCreateOrUpdateCashFlow: FC<ModalProps> = ({
  modalType,
  onConfirm,
  initialValues = {
    cashFlowID: '',
    name: '',
    note: '',
    sign: '',
    date: '',
    type: 5,
    outin: 1,
    property: 3,
    priority: null
  }
}) => {
  const { closeModal } = useModal();
  const [formData, setFormData] = useState(initialValues);
  const { insertAsync, updateAsync } = useCashFlowPlan({});

  const handleSubmit = async () => {
    if(!formData.name) {
      return toast.warn('Vui lòng nhập nội dung');
    }

    try {
      // Handle api here!
      switch (modalType) {
        case 'create': {
          const { error, data } = await insertAsync(formData);

          if (error) {
            return toast.warning(data.message);
          }

          if(data.length) {
            return data.map((item: any) => toast.warn(item.message));
          }

          toast.success('Tạo thành công', { autoClose: 1500 });
          break;
        }
        case 'update': {
          const { error, data } = await updateAsync(formData);

          if (error) {
            return toast.warning(data.message);
          }

          if(data.length) {
            return data.map((item: any) => toast.warn(item.message));
          }

          toast.success('Cập nhật thành công', { autoClose: 1500 });
          break;
        }
        default:
          break;
      }
    } catch (error: unknown) {
      if(error instanceof Error)
				toast.error(error.message);
			if(typeof error === 'string')
				toast.error(error);
    }

    onConfirm && onConfirm();
    closeModal();
  };

  const onChange = ({ name, value }: { name: string, value: string | number | undefined }) => {
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

      <section className="px-10 py-1">
        <DropdownSearchable
          onchangeValue={(value) => onChange({ name: 'outin', value: value.id })}
          placeholder={"Phân loại"}
          className={"w-full h-12 flex-1 border border-primary-border p-2"}
          focusedClass={"border-b border-primary"}
          maxWidthInput={"max-w-none"}
          isMultiple={false}
          allowClearValueSingleInput={false}
          data={[
            { value: 1, text: 'Bán ra' },
            { value: 2, text: 'Mua vào' },
          ]}
          initialValue={{
            value: initialValues.outin, text: initialValues.outin === 1 ? 'Bán ra' : 'Mua vào'
          }}
          formatItem={{
            id: "value",
            text: "text",
          }}
          disableSearch={true}
        />
      </section>

      <section className="px-10 py-1">
        <input
          type="text"
          placeholder="Nhập nội dung"
          name="name"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target)}
        />
      </section>

      <section className="px-10 py-1">
        <input
          type="text"
          placeholder="Nhập mã hiệu"
          name="sign"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData.sign}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target)}
        />
      </section>

      {/* Ghi chú */}
      <section className="px-10 py-1">
        <input
          type="text"
          placeholder="Nhập ghi chú"
          name="note"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData.note}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target)}
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