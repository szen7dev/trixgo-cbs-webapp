import { FC } from "react";

import { useModal } from "services/hooks/useModal";
import { useDocumentPackage } from "services/hooks/document/useDocumentPackage";
// import { APP_ID } from "apis/localdb";
import { toast } from "react-toastify";

const DeletePackage: FC<any> = ({ idsChecked, setIdsChecked, projectID, keyword }) => {
  const { closeModal } = useModal();
  const { removeManyDocumentPackage, refetch } = useDocumentPackage({ departmentID: projectID, isShowAll: "1", keyword }, false, false);

  const onDelete = async () => {
    const infoAfterRemove = await removeManyDocumentPackage({ packagesID: idsChecked });
    refetch()
    closeModal();
  };
  
  return (
    <main className="relative h-full">
      <header className="px-10 py-4">
        <p className="font-bold text-xl">Bạn có muốn xóa không?</p>
      </header>

      <section className="px-10 text-primary-gray">
        <p>
          Dữ liệu của bạn sẽ bị xóa vĩnh viễn và bạn không thể khôi phục lại dữ liệu này
        </p>
      </section>

      <footer className="absolute right-0 bottom-0 px-10 py-9">
        <button
          className="bg-cbs-gray text-dark text-base w-24 h-8 rounded mr-4"
          onClick={closeModal}
        >
          Hủy
        </button>
        <button className="bg-primary text-primary-light text-base w-24 h-8 rounded"
          onClick={onDelete}>
          Xác nhận
        </button>
      </footer>
    </main>
  );
};

export default DeletePackage;
