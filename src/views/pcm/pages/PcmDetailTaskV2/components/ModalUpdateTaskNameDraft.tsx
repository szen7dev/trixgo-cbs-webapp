import React, { FC, useState } from "react";

import { useModal } from "services/hooks/useModal";
import { toast } from "react-toastify";
import { usePcmReport } from "services/hooks/pcm/usePcm";
import { useTask } from "services/hooks/useTask";

type Props = {
    taskId: string
    onConfirm?: () => void
}

export const ModalUpdateTaskNameDraft: FC<Props> = ({ taskId, onConfirm }) => {
  const { closeModal } = useModal();
  const [name, setName] = useState("");
  const { updateTaskAsync } = useTask({});

  const handleUpdateTaskName = async () => {
    if (!name) {
      return toast.error("Vui lòng nhập tên công việc.");
    }

    try {
      // Cập nhật task
      const { error, data } = await updateTaskAsync({
        taskID: taskId,
        name
      })

      if(error) {
        return toast.warn(data?.message);
      }

      onConfirm?.();
      toast.success('Cập nhật thành công');
    } catch (error) {
      if(error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      closeModal();
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  return (
    <main className="relative h-full">
      <header className="px-10 py-5 flex items-center justify-between">
        <p className="font-bold text-xl">Cập nhật tên công việc nháp</p>
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
          onChange={onChange}
        />
      </section>

      <footer className="absolute right-0 bottom-0 px-10 py-5">
        <button className="bg-primary text-primary-light text-base w-24 h-8 rounded"
          onClick={handleUpdateTaskName}>
          Xác nhận
        </button>
      </footer>
    </main>
  );
};