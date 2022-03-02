import { FC, useState } from "react";

import { useModal } from "services/hooks/useModal";

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import { usePcmAdmin } from "services/hooks/pcm/usePcmAdmin";
import { APP_ID } from "apis/localdb";
import { toast } from "react-toastify";
const Create: FC = () => {
  const { closeModal } = useModal();
  const [name, setName] = useState("");
  const { createAppRolesMutateAsync, refetchPcmAdmin } = usePcmAdmin({ appID: APP_ID.PCM.id, keyword: "" });

  const onCreate = async () => {
    if (!name) return;
    const result = await createAppRolesMutateAsync({
      appID: APP_ID.PCM.id,
      type: 1,
      name
    });
    if (!result.error) {
      refetchPcmAdmin();
      setName("");
      closeModal();
      toast.success('Tạo mới dữ liệu thành công');
    } else {
      toast.error(result?.data?.message);
    }
  };

  return (
    <main className="relative h-full">
      <header className="px-10 py-9 flex items-center justify-between">
        <p className="font-bold text-xl">Tạo mới</p>
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
          onClick={() => onCreate()}>
          Xác nhận
        </button>
      </footer>
    </main>
  );
};

export default Create;
