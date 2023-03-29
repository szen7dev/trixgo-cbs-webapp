import { ChangeEvent, FC, useState } from "react";

import { useModal } from "services/hooks/useModal";

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import { useBudget } from "services/hooks/budget/useBudget";
import { toast } from "react-toastify";

type Props = {
  initValues?: {
    _id: string,
    name: string,
    note: string
  },
  onConfirm: () => void
}

export const CreateOrUpdateBudget: FC<Props> = ({
  initValues = {
    _id: '',
    name: '',
    note: ''
  },
  onConfirm
}) => {
  const { closeModal } = useModal();
  const [formData, setFormData] = useState(initValues);

  const { insertAsync, updateAsync } = useBudget({});

  const handleConfirm = async () => {
    try {
      if (!formData.name) {
        return toast.warn("Vui lòng nhập tiêu đề");
      }

      let result: any;
      let message: string;

      if(formData._id) {
        result  = await updateAsync({
          budgetID: formData._id,
          name: formData.name,
          note: formData.note
        });
        message = 'Cập nhật thành công';
      } else{
        result  = await insertAsync(formData);
        message = 'Tạo mới thành công';
      }

      const { error, data } = result;

      if(error) {
        return toast.warn(data?.message);
      }

      if(data.length) {
				return data.map((item: any) => toast.warn(item.message));
			}

      closeModal();
      onConfirm();
      toast.success(message);
    } catch (error) {
      if(error instanceof Error)
        return toast.error(error.message);
      if(typeof error === 'string')
        return toast.error(error);
    }
  };

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
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
          {formData._id ? 'Cập nhật' : 'Tạo mới'}
        </p>
        <img
          src={CloseIcon}
          alt="Close"
          className="cursor-pointer"
          onClick={closeModal}
        />
      </header>

      <section className="px-10 py-2">
        <input
          type="text"
          name="name"
          placeholder="Nhập nội dung"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData.name}
          onChange={onChangeInput}
        />
      </section>

      <section className="px-10 mt-2">
        <input
          type="text"
          name="note"
          placeholder="Nhập ghi chú"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData.note}
          onChange={onChangeInput}
        />
      </section>

      <footer className="absolute right-0 bottom-0 px-10 py-5">
        <button className="bg-primary text-primary-light text-base w-24 h-8 rounded"
          onClick={handleConfirm}>
          Xác nhận
        </button>
      </footer>
    </main>
  );
};