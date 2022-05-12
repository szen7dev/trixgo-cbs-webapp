import { FC } from "react";
import { Assignee } from "typings/task";

type Props = {
  assignee: Assignee;
  color: string;
};

export const Executor: FC<Props> = ({ color, assignee }) => {
  return (
    <div className="flex items-center space-x-1">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <img
        src={`${process.env.REACT_APP_URL_S3_USER}/${assignee.image}`}
        alt="Thumbnail"
        className="w-4 h-4 rounded-full"
      />
      <span className="text-[13px]">{assignee.bizfullname ?? assignee.fullname}</span>
    </div>
  );
};
