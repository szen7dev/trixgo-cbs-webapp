import { FC, useState } from "react";

import { useModal } from "services/hooks/useModal";

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import { usePcmPlanGroup } from "services/hooks/pcm/usePcmGroup";
import { toast } from "react-toastify";

const Update: FC<any> = ({ item, setIdsChecked, projectID }) => {
  const { closeModal } = useModal();
  const [name, setName] = useState(item.name);
  const [sign, setSign] = useState(item.sign);

  const {   
    updatePcmPlanGroupMutateAsync,
    refetch
  } = usePcmPlanGroup({ projectID }, false, false);

  const onUpdate = async () => {
    closeModal();

    if (!name || !sign) {
      return toast.warning("Vui lòng nhập đầy đủ tên nhóm và mã hiệu.");
    }

    const result = await updatePcmPlanGroupMutateAsync({
        groupID: item._id,
        name,
        sign
    });
   
    if (!result.error) {
      refetch();
      setName("");
      closeModal();
      setIdsChecked([]);
      toast.success('Cập nhật dữ liệu thành công');
    } else {
      toast.error(result?.data?.message);
    }
  };

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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </section>

      <section className="px-10 mt-2">
        <input
          type="text"
          placeholder="Nhập mã hiệu"
          className="h-12 w-full border border-primary-border outline-none px-8"
          value={sign}
          onChange={(e) => setSign(e.target.value)}
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
