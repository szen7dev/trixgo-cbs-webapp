import { FC, useState } from "react";

import { useModal } from "services/hooks/useModal";

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import { toast } from "react-toastify";
import { useDocumentPackage } from "services/hooks/document/useDocumentPackage";

const CreatePackage: FC<any> = ({ projectID, keyword }) => {
  const { closeModal } = useModal();

  const [name, setName] = useState("");
  const [sign, setSign] = useState("");

  const {
    createDocumentPackageMutateAsync,
    refetch
  } = useDocumentPackage({ departmentID: projectID, keyword }, false, false);

  const onCreate = async () => {
    if (!name || !sign) {
      return toast.warning("Vui lòng nhập đầy đủ tên gói thầu và mã hiệu.");
    }
    const result = await createDocumentPackageMutateAsync({ projectID, name, sign });
    if (!result.error) {
      setName("");
      closeModal();
      toast.success('Tạo gói thầu thành công');
      refetch()
    } else {
      toast.error(result?.data?.message);
    }
  };

  return (
    <main className="relative h-full">
      <header className="px-10 py-5 flex items-center justify-between">
        <p className="font-bold text-xl">Tạo mới</p>
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
          id="inputGroupName"
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
          onClick={onCreate}>
          Xác nhận
        </button>
      </footer>
    </main>
  );
};

export default CreatePackage;
