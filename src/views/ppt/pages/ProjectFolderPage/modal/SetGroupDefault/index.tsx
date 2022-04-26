import { FC } from "react";

import { useModal } from "services/hooks/useModal";
import { useAdmin } from "services/hooks/auth/useAdmin";
import { APP_ID } from "apis/localdb";
import { toast } from "react-toastify";
//HOOK
import { useUser } from 'services/hooks/personal/useUser';
import { useAuth } from "services/hooks/auth/useAuth";

const SetGroupDefault: FC<any> = ({ idsChecked, setIdsChecked }) => {
  const { closeModal } = useModal();
  const { removeManyAppRoleMutateAsync, refetchListAppRoles } = useAdmin({ appID: APP_ID.PCM.id, keyword: "" });
  const { updateUser } = useUser();
	const { refetchDataUserInfo } = useAuth();
  const onChangeSetGroupDefault = async () => {
    closeModal();
		const result = await updateUser({ groupDefault: idsChecked[0] });
    refetchDataUserInfo();
  };

  return (
    <main className="relative h-full">
      <header className="px-10 py-4">
        <p className="font-bold text-xl">Bạn có chắc chắn cấu hình không?</p>
      </header>

      {/* <section className="px-10 text-primary-gray">
        <p>
          Dữ liệu của bạn sẽ bị xóa vĩnh viễn và bạn không thể khôi phục lại dữ liệu này
        </p>
      </section> */}

      <footer className="absolute right-0 bottom-0 px-10 py-9">
        <button
          className="bg-cbs-gray text-dark text-base w-24 h-8 rounded mr-4"
          onClick={() => closeModal()}
        >
          Hủy
        </button>
        <button className="bg-primary text-primary-light text-base w-24 h-8 rounded"
          onClick={() => onChangeSetGroupDefault()}>
          Xác nhận
        </button>
      </footer>
    </main>
  );
};

export default SetGroupDefault;
