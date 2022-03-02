import { FC, useState } from "react";

import { useModal } from "services/hooks/useModal";

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import { usePcmAdmin } from "services/hooks/pcm/usePcmAdmin";
import { APP_ID } from "apis/localdb";
import { toast } from "react-toastify";

const Update: FC<any> = ({ item, setIdsChecked }) => {
  const { closeModal } = useModal();
  const [name, setName] = useState(item.name);
  const { updateAppRolesMutateAsync, refetchPcmAdmin } = usePcmAdmin({ appID: APP_ID.PCM.id });

  const onUpdate = async () => {
    if (!name) return;
    const result = await updateAppRolesMutateAsync({
      appRoleID: item._id,
      name
    });
    if (!result.error) {
      refetchPcmAdmin();
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
          onClick={() => closeModal()}
        />
      </header>

      <section className="px-10 mt-2">
        <input
          type="text"
          placeholder="Nhập nội dung"
          className="h-12 w-full border border-primary-border outline-none px-8"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </section>

      <footer className="absolute right-0 bottom-0 px-10 py-9">
        <button className="bg-primary text-primary-light text-base w-24 h-8 rounded"
          onClick={() => onUpdate()}>
          Xác nhận
        </button>
      </footer>
    </main>
  );
};

export default Update;
