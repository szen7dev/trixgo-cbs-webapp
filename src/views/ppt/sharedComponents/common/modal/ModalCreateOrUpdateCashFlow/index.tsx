import React, { FC, useState } from "react";
import { toast } from "react-toastify";

import { DropdownSearchable } from "shareComponents/common";
import { useModal } from "services/hooks/useModal";
import { useCashFlowPlan } from "services/hooks/pcm/usePcmProjectCashFlowPlan";
import { ModalProps } from 'typings/financial/cashFlowPlan';

export const ModalCreateOrUpdateCashFlow: FC<ModalProps> = ({
  modalType,
  onConfirm,
  initialValues = {
    cashFlowID: '',
    name: '',
    sign: '',
    date: '',
    type: 5,
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
          placeholder="Nhập nội dung"
          name="name"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData.name}
          onChange={onChange}
        />
      </section>

      <section className="px-10 mt-2">
        <input
          type="text"
          placeholder="Nhập mã hiệu"
          name="sign"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData.sign}
          onChange={onChange}
        />
      </section>

      {/* Độ ưu tiên */}
      <div className="px-10 py-2">
        <DropdownSearchable
          onchangeValue={(value: any) => {
            setFormData(previous => ({
              ...previous,
              priority: value?.id
            }))
          }}
          onClearData={() => {
            setFormData(previous => ({
              ...previous,
              priority: null
            }))
          }}
          className={"w-full h-32 flex-1 border border-primary-border rounded"}
          placeholder="Độ ưu tiên"
          isMultiple={false}
          allowClearValueSingleInput={true}
          showTriangle={true}
          maxWidthInput="max-w-none"
          data={[
            { value: 1, label: 'Bình thường' },
            { value: 2, label: 'Ưu tiên' },
          ]}
          initialValue={
            initialValues?.priority ? {
              value: initialValues.priority, label: initialValues.priority === 1 ? 'Bình thường' : 'Ưu tiên',
            } : {}
          }
          formatItem={{
            id: "value",
            text: "label",
          }}
          inlineSearch={true}
        />
      </div>

      <footer className="absolute right-0 bottom-0 px-10 py-5">
        <button className="bg-primary text-primary-light text-base w-24 h-8 rounded"
          onClick={handleSubmit}>
          Xác nhận
        </button>
      </footer>
    </main>
  );
};