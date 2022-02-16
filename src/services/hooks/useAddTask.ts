import { useMutation } from "react-query";
import { addTaskPayload } from "typings/addTask";
import AddTaskRepository from "apis/add-task";
import { toast } from "react-toastify";

type UseAddTask = {
    updateAddTask: (payload: addTaskPayload) => Promise<void>
};
export const useAddTask = () : UseAddTask => {
    const { mutateAsync: updateAddTaskAsync } =
        useMutation((payload: addTaskPayload) =>
        AddTaskRepository.addTask(payload)
        );

    const updateAddTask = async (payload: addTaskPayload) => {
        try {
            const { error, message } = await updateAddTaskAsync(payload);

            if (!error) {
                toast.success('Tạo task thành công');
            } else {
                toast.error(message);
            }
        } catch (error: unknown) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };
    return {
        updateAddTask,
    }
}