import { UpdateUser, UpdatePasswordUser,  UpdateAvatarUser } from "typings/user";
import { useMutation } from "react-query";
import UserRepository from "apis/user";
import { toast } from "react-toastify";

type UseUser = {
    updateUser: (payload: UpdateUser) => Promise<void>,
    updatePasswordUser: (payload: UpdatePasswordUser) => Promise<void>,
    updateAvatarUser: (payload: UpdateAvatarUser) => Promise<void>,
};
export const useUser = (params?: any, pageParam = '' ) : UseUser => {
    const { mutateAsync: updateUserAsync } =
        useMutation((payload: UpdateUser) =>
        UserRepository.updateUser(payload)
        );

    const { mutateAsync: updatePasswordUserAsync } =
        useMutation((payload: UpdatePasswordUser) =>
        UserRepository.updatePasswordUser(payload)
    );
    const { mutateAsync: updateAvatarUserAsync } =
        useMutation((payload: UpdateAvatarUser) =>
        UserRepository.updateAvatarUser(payload)
    );

    const updateUser = async (payload: UpdateUser) => {
        try {
            const { error, message } = await updateUserAsync(payload);

            if (!error) {
                toast.success('Cập nhật thông tin thành công');
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

    const updatePasswordUser = async (payload: UpdatePasswordUser) => {
        try {
            const { error, data } = await updatePasswordUserAsync(payload);

            if (!error) {
                toast.success('Cập nhật mật khẩu thành công');
            } else {
                toast.error(data.message);
            }
        } catch (error: unknown) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const updateAvatarUser = async (payload: UpdateAvatarUser) => {
        try {
            const { error, data } = await updateAvatarUserAsync(payload);

            if (!error) {
                toast.success('Cập nhật ảnh đại diện thành công');
            } else {
                if(data && data[0]) {
                    toast.error(data[0].message);
                }
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
        updateUser,
        updatePasswordUser,
        updateAvatarUser,
    }
}