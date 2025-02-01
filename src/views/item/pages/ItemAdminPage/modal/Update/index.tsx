import { FC, useState } from "react";

import { useModal } from "services/hooks/useModal";

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import { useAdmin } from "services/hooks/auth/useAdmin";
import { APP_ID } from "apis/localdb";
import { toast } from "react-toastify";

const Update: FC<any> = ({ item, setIdsChecked }) => {
  const { closeModal } = useModal();
  const [name, setName] = useState(item.name);
  const [type, setType] = useState<any>(item.type ? item.type.toString() : "");
  const { updateAppRolesMutateAsync, refetchListAppRoles } = useAdmin({ appID: APP_ID.ITEM.id, keyword: "" });

  const onUpdate = async () => {
    if (!name || !type) {
      toast.error("Vui lòng nhập đầy đủ nội dung và phân loại.");
      return;
    }
    
    if (!["1", "2"].includes(type)) {
      toast.error("Phân loại chỉ có giá trị 1 hoặc 2. Vui lòng nhập lại.");
      return;
    };

    const result = await updateAppRolesMutateAsync({
      appRoleID: item._id,
      type: parseInt(type),
      name
    });
    if (!result.error) {
      refetchListAppRoles();
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
      <header className="px-10 py-5 flex items-center justify-between">
        <p className="font-bold text-xl">Cập nhật</p>
        <img
          src={CloseIcon}
          alt="Close"
          className="cursor-pointer"
          onClick={() => closeModal()}
        />
      </header>

      <section className="px-10 py-2">
        <input
          type="text"
          placeholder="Nhập nội dung"
          className="h-12 w-full border border-primary-border outline-none px-8"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </section>

      <section className="px-10 mt-2">
        <input
          type="text"
          placeholder="Phân loại (1,2)"
          className="h-12 w-full border border-primary-border outline-none px-8"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </section>

      <footer className="absolute right-0 bottom-0 px-10 py-5">
        <button className="bg-primary text-primary-light text-base w-24 h-8 rounded"
          onClick={() => onUpdate()}>
          Xác nhận
        </button>
      </footer>
    </main>
  )
}

export default Update;