import SubjectRepositories from "apis/training/SubjectRepositories";
import { FormikHelpers } from "formik";
import React, { FC, useState } from "react";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { Link, useHistory, useParams, generatePath } from "react-router-dom";
import { toast } from "react-toastify";
import { ButtonMore } from "shareComponents/common";
import { ContextMenu, useContextMenu } from "shareComponents/common/ContextMenu";
import ModalExtraLarge from "shareComponents/common/ModalContainer/components/ModalExtraLarge";
import { CreateSubjectBody, Lesson } from "typings/workshop";
import CardLession from "../WorkshopCategory/components/CardLession";
import ModalCreateContent from "./components/ModalCreateContent";

type Props = {
  //
};

const WorkshopList: FC<Props> = (props) => {
  const [isShow, setIsShow] = useState(false);
  const history = useHistory();
  const param = useParams<{ id: string }>();
  const [selected, setSelected] = useState<Partial<Lesson>>({});
  const { open } = useContextMenu();

  const queryClient = useQueryClient();

  const { data: subject } = useQuery(
    ["subjects_detail", param.id],
    ({ pageParam }) =>
      SubjectRepositories.get({
        limit: 4,
        subjectID: param.id,
        select: "image name amountLessions",
      }),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: Infinity,
      enabled: Boolean(param.id),
    }
  );

  const { data, refetch } = useInfiniteQuery(
    ["subjects_list_data", subject?.data._id],
    ({ pageParam }) =>
      SubjectRepositories.get({
        limit: 4,
        parentID: subject?.data._id as string,
        select: "image name description amountLessions userCreate amountLessions amountViews amountUserViews amountReaction",
        populates: { path: "userCreate", select: "bizfullname" },
        nextCursor: pageParam,
      }),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: Infinity,
      enabled: Boolean(subject?.data._id),
      getNextPageParam(lastPage, allPages) {
        return lastPage.data.nextCursor;
      },
    }
  );

  async function handleSubmit(values: CreateSubjectBody, formikHelpers: FormikHelpers<CreateSubjectBody>) {
    try {
      if (selected._id) {
        await SubjectRepositories.update({ subjectID: selected._id, ...values });
        refetch();
        toast.info("Cập nhật thành công");
      } else {
        await SubjectRepositories.create({ parent: subject?.data._id as string, ...values });
        refetch();
        toast.success("Tạo mới thành công");
      }
      queryClient.removeQueries(["subjects_list", subject?.data._id]);
      setIsShow(false);
      setSelected({});
    } catch (error: any) {
      toast.error(error.message);
      // console.log(error);
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1 shadow-cbs-md z-1">
        <button type="button" className="p-2 rounded-3xl mr-2" onClick={() => history.goBack()}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <span className="mr-auto text-x-large font-bold text-cbs-subtext">
          {subject?.data.name} ({subject?.data.amountLessions} workshop)
        </span>
        {/* <DropdownFilterButton /> */}
        <ButtonMore />
      </div>
      <ContextMenu>
        <ul className="bg-white shadow-cbs-md py-0.5 max-h-32 overflow-auto rounded-cbs border-0.5 border-cbs-border">
          <li className="hover:text-white hover:bg-cbs-secondary transition-none">
            <button
              className="w-full py-2 px-4"
              onClick={(e) => {
                setIsShow(true);
              }}
            >
              Sửa {selected?.name}
            </button>
          </li>
        </ul>
      </ContextMenu>
      <div className="flex-1 overflow-y-auto">
        <div className="w-full max-w-[1185px] mx-auto min-h-full space-y-10 py-2 px-[90px]">
          <div className="grid grid-cols-4 gap-x-3.5 gap-y-7 pt-7 pb-3">
            {data?.pages
              .flatMap((page) => page.data.listRecords)
              .map((lesson, index) => (
                <Link
                  key={lesson._id}
                  to={generatePath("/workshop/home/category/:id/:workshopID", { id: subject?.data._id || "", workshopID: lesson._id })}
                >
                  <CardLession
                    data={lesson}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setSelected(lesson);
                      open({ position: { x: e.clientX, y: e.clientY } });
                    }}
                  />
                </Link>
              ))}
          </div>
          <button
            className="fixed bottom-5 right-20 bg-cbs-primary rounded-full text-white w-14 h-14 text-3xl font-thin"
            onClick={() => {
              setSelected({});
              setIsShow(true);
            }}
          >
            +
          </button>
        </div>
      </div>
      <ModalExtraLarge show={isShow}>
        <ModalCreateContent
          toggle={() => setIsShow(!isShow)}
          show={isShow}
          initialValues={{ ...selected, parentID: subject?.data._id || "" }}
          onSubmit={handleSubmit}
        />
      </ModalExtraLarge>
    </div>
  );
};

export default WorkshopList;
