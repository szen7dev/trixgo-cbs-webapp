import React, { FC, useState } from "react";

import { useModal } from "services/hooks/useModal";
import { toast } from "react-toastify";
import { useTask } from "services/hooks/useTask";

type Props = {
    taskId: string;
    taskUpcoming: string;
    onConfirm?: () => void;
}

export const ModalUpdateTaskUpcoming: FC<Props> = ({ taskId, taskUpcoming, onConfirm }) => {
  const { closeModal } = useModal();
  const [upcoming, setUpcoming] = useState("");
  const { updateTaskAsync } = useTask({});

  const handleUpdateTaskUpcoming = async () => {
    if (!upcoming) {
      return toast.error("Vui lòng nhập tên công việc.");
    }

    try {
      // Cập nhật task
      const { error, data } = await updateTaskAsync({
        taskID: taskId,
        upcoming
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
    setUpcoming(event.target.value)
  }

  return (
    <main className="relative h-full">
      <header className="px-10 py-5 flex items-center justify-between">
        <p className="font-bold text-xl">Cập nhật theo Quy trình động</p>
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
          placeholder="1-Mặc định | 2-Quy trình động"
          name="upcoming"
          defaultValue={taskUpcoming}
          className="h-12 w-full border border-primary-border outline-none px-8"
          onChange={onChange}
        />
      </section>

      <footer className="absolute right-0 bottom-0 px-10 py-5">
        <button className="bg-primary text-primary-light text-base w-24 h-8 rounded"
          onClick={handleUpdateTaskUpcoming}>
          Xác nhận
        </button>
      </footer>
    </main>
  );
};