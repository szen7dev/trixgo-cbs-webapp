import { FC, useState } from "react";

import { useModal } from "services/hooks/useModal";

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import { usePcmPlanGroup } from "services/hooks/pcm/usePcmGroup";
import { toast } from "react-toastify";

type Props = {
  item: any;
  onConfirm: () => void
}

const Update: FC<Props> = ({ item, onConfirm }) => {
  const { closeModal } = useModal();
  const [formData, setFormData] = useState({
    name: item.name,
    sign: item.sign
  })

  const { updatePcmPlanGroupMutateAsync } = usePcmPlanGroup({});

  const onUpdate = async () => {
    if (!formData.name || !formData.sign) {
      return toast.warning("Vui lòng nhập đầy đủ tên nhóm và mã hiệu.");
    }

    const result = await updatePcmPlanGroupMutateAsync({
        groupID: item._id,
        ...formData
    });

    if (!result.error) {
      closeModal();
      onConfirm();
      toast.success('Cập nhật dữ liệu thành công');
    } else {
      toast.error(result?.data?.message);
    }
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(previous => ({
      ...previous,
      [name]: value
    }))
  }

  return (
    <main className="relative h-full">
      <header className="px-10 py-9 flex items-center justify-between">
        <p className="font-bold text-xl">Cập nhật</p>
        <img
          src={CloseIcon}
          alt="Close"
          className="cursor-pointer"
          onClick={closeModal}
        />
      </header>

      <section className="px-10 mt-2">
        <input
          type="text"
          placeholder="Nhập tên nhóm dữ liệu"
          className="h-12 w-full border border-primary-border outline-none px-8"
          value={formData.name}
          name="name"
          onChange={onChangeInput}
        />
      </section>

      <section className="px-10 mt-2">
        <input
          type="text"
          placeholder="Nhập mã hiệu"
          className="h-12 w-full border border-primary-border outline-none px-8"
          value={formData.sign}
          name="sign"
          onChange={onChangeInput}
        />
      </section>

      <footer className="absolute right-0 bottom-0 px-10 py-5">
        <button className="bg-primary text-primary-light text-base w-24 h-8 rounded"
          onClick={onUpdate}>
          Xác nhận
        </button>
      </footer>
    </main>
  );
};

export default Update;