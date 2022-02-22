import { FC } from "react";
import cn from "classnames";

type Props = {
  avatar: string;
  title: string;
  description: string;
  author: string;
  expiredDate: string;
  expireType: string;
};

const KanbanBoardItem: FC<Props> = ({
  avatar, title, description, author, expiredDate, expireType
}) => {
  return (
    <div
      className={cn("t-kanban-item border-b border-solid border-primary-border pl-3 pr-3 pb-3 pt-2", {
        "t-kanban-item-expired": expireType === 'expired',
        "t-kanban-item-success": expireType === 'success',
      })}
    >
      <div className="t-kanban-item-title text-lg font-bold">
        {title}
      </div>
      <div className="t-kanban-item-description text-primary-gray">
        {description}
      </div>
      <div className="t-kanban-item-footer flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={avatar}
            alt="Avatar"
            className="w-6 h-6 rounded-full mr-1"
          />
          {author}
        </div>
        <span
          className={cn("t-kanban-item-orange", {
            "t-kanban-item-orange": expireType === 'incoming',
            "t-kanban-item-green": expireType === 'good',
            "t-kanban-item-white": expireType === 'expired' || expireType === 'success',
          })}
        >{expiredDate}</span>
      </div>
    </div>
  );
};

export default KanbanBoardItem;
