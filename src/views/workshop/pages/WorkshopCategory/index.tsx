// Library
import React, { FC, useState } from "react";
import { useQuery } from "react-query";

// Components
import SearchIcon from "assets/icons/SearchIcon";

// Repositories
import SubjectRepositories from "apis/training/SubjectRepositories";
import SubjectList from "./components/SubjectList";
import ModalExtraLarge from "shareComponents/common/ModalContainer/components/ModalExtraLarge";
import ModalCreateContent from "../WorkshopList/components/ModalCreateContent";
import { CreateSubjectBody, Subject } from "typings/workshop";
import { FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { ContextMenu, useContextMenu } from "shareComponents/common/ContextMenu";
import { useAuth } from "services/hooks/auth/useAuth";

const WorkshopCategory: FC = () => {
  const [isShow, setIsShow] = useState(false);
  const [selected, setSelected] = useState<Partial<Subject>>({});
  const { open } = useContextMenu();
  const { user } = useAuth();

  const { data, refetch } = useQuery(["subjects_list"], () => SubjectRepositories.get({ limit: 4 }), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    cacheTime: 60_000,
  });

  const handleSubmit = async (values: CreateSubjectBody, formikHelpers: FormikHelpers<CreateSubjectBody>) => {
    try {
      if (selected._id) {
        await SubjectRepositories.update({ subjectID: selected._id, ...values });
        refetch();
        toast.info("Cập nhật thành công");
      } else {
        await SubjectRepositories.create({ ...values });
        refetch();
        toast.success("Tạo mới thành công");
      }
      setIsShow(false);
      setSelected({});
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const handleOnContextMenu = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, subject: Subject) => {
    e.preventDefault();

    setSelected(subject);
    open({ position: { x: e.clientX, y: e.clientY } });
  }

  const toggleModal = () => setIsShow(!isShow);

  return (
    <div className="w-full max-w-[1185px] mx-auto bg-white min-h-full space-y-10 py-9 px-[90px]">
      <div className="flex flex-col items-center">
        <label className="relative align-middle border-cbs-border border-0.5 rounded-full  max-w-xl w-full mt-10">
          <span className="absolute inset-y-0 left-[1.375rem] flex items-center text-cbs-subtext">
            <SearchIcon className="h-6 w-6" />
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm workshop"
            className="pl-14 pr-6 py-3 w-full focus:outline-none bg-white rounded-full placeholder-cbs-subtext text-large"
          />
        </label>
      </div>
      <ContextMenu>
        <ul className="bg-white shadow-cbs-md py-0.5 max-h-32 overflow-auto rounded-cbs border-0.5 border-cbs-border">
          <li>
            <button
              className="w-full py-2 px-4 hover:text-white hover:bg-cbs-secondary transition-none"
              onClick={(e) => {
                setIsShow(true);
              }}
            >
              Sửa {selected?.name}
            </button>
          </li>
          <li>
            <button
              className="w-full py-2 px-4 hover:text-white hover:bg-cbs-secondary transition-none"
              onClick={(e) => {
                toast.warn("Chức năng đang được phát triển");
              }}
            >
              <span>Xoá</span> {selected?.name}
            </button>
          </li>
        </ul>
      </ContextMenu>

      {data ? data.data.listRecords.map((subject) => (
        <SubjectList key={subject._id} subject={subject} onContextMenu={(e) => handleOnContextMenu(e, subject)} />
      )) : ''}

      {user?.email === 'contact@trixgo.com' ? (
        <button
          className="fixed bottom-5 right-20 bg-cbs-primary rounded-full text-white w-14 h-14 text-3xl font-thin"
          onClick={() => {
            setSelected({});
            setIsShow(true);
          }}
        >
          +
        </button>
      ) : ''}
      <ModalExtraLarge show={isShow} toggle={toggleModal}>
        <ModalCreateContent toggle={toggleModal} show={isShow} initialValues={{ ...selected }} onSubmit={handleSubmit} />
      </ModalExtraLarge>
    </div>
  );
};

export default WorkshopCategory;
