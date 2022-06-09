import React, { FC, useState } from "react";
import { toast } from "react-toastify";

import { useModal } from "services/hooks/useModal";
import { useDoctype } from "services/hooks/items/useDoctype";
import { ModalProps } from 'typings/items/doctype';

import { DropdownSearchable } from "shareComponents/common";

export const ModalCreateOrUpdateDoctype: FC<ModalProps> = ({
  modalType,
  onConfirm,
  level = 'parent',
  initialValues = {
    doctypeID: '',
    parent: '',
    name: '',
    description: '',
    type: 1
  }
}) => {
  const { closeModal } = useModal();
  const [formData, setFormData] = useState(initialValues);
  const { insertAsync, updateAsync } = useDoctype({});

  const handleSubmit = async () => {
    if(!formData.name) {
      return toast.warn('Vui lòng nhập nội dung');
    }

    try {
      // Handle api here!
      switch (modalType) {
        case 'create': {
          const { error, message } = await insertAsync(formData);

          if (error) {
            return toast.warning(message);
          }

          toast.success('Tạo thành công', { autoClose: 1500 });
          break;
        }
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

      <section className="px-10 py-2">
        <input
          type="text"
          placeholder="Nhập nội dung"
          name="name"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target)}
        />
      </section>

      <section className="px-10 mt-2">
        <input
          type="text"
          placeholder="Nhập mô tả"
          name="description"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData.description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target)}
        />
      </section>

      {(level === 'child' && initialValues.type === 21) && (
        <section className="px-10 mt-3">
          <DropdownSearchable
            onchangeValue={(value) => onChange({ name: 'level', value: value.id })}
            placeholder={"Phân loại"}
            className={"w-full h-12 flex-1 border border-primary-border p-2"}
            focusedClass={"border-b border-primary"}
            maxWidthInput={"max-w-none"}
            isMultiple={false}
            allowClearValueSingleInput={false}
            data={[
              { value: 1, text: 'Không hài lòng' },
              { value: 2, text: 'Hài lòng' },
            ]}
            initialValue={{
              value: 1, text: 'Không hài lòng'
            }}
            formatItem={{
              id: "value",
              text: "text",
            }}
            disableSearch={true}
          />
        </section>
      )}

      <footer className="absolute right-0 bottom-0 px-10 py-5">
        <button className="bg-primary text-primary-light text-base w-24 h-8 rounded" onClick={handleSubmit}>
          Xác nhận
        </button>
      </footer>
    </main>
  );
};