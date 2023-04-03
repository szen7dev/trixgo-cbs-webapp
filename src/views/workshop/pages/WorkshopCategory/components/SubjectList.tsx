import SubjectRepositories from "apis/training/SubjectRepositories";
import React, { PropsWithChildren } from "react";
import { useQuery } from "react-query";
import { Link, generatePath } from "react-router-dom";

// Types
import { Subject } from "typings/workshop";
import ArrowRight from "views/workshop/sharedComponents/common/Icons/ArrowRight";
import CardLession from "./CardLession";

interface Props {
  subject: Subject;
  onContextMenu?: React.MouseEventHandler<HTMLAnchorElement>;
}

function SubjectList({ subject, onContextMenu }: PropsWithChildren<Props>): JSX.Element {
  const { data } = useQuery(
    ["subjects_list", subject._id],
    () =>
      SubjectRepositories.get({
        limit: 4,
        parentID: subject._id,
        select: "image name amountLessions userCreate amountLessions amountViews amountUserViews amountReaction",
        populates: { path: "userCreate", select: "bizfullname" },
      }),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: Infinity,
      enabled: Boolean(subject._id),
    }
  );

  return (
    <div key={subject._id}>
      <Link
        to={generatePath("/workshop/home/category/:id", { id: subject._id })}
        className="text-cbs-subtext font-bold text-2xl group"
        onContextMenu={onContextMenu}
      >
        <span className="mr-6">
          {subject.name} ({subject.amountLessions} workshop)
        </span>
        <span className="w-6 h-6 inline-flex items-center justify-center rounded-full bg-cbs-primary text-white">
          <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
      <div className="grid grid-cols-4 gap-x-3.5 pt-7 pb-3">
        {data?.data.listRecords.map((lesson, i) => (
          <Link key={lesson._id} to={generatePath("/workshop/home/category/:id/:workshopID", { id: subject._id, workshopID: lesson._id })}>
            <CardLession data={lesson} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SubjectList;
