/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import { User } from "typings/user";
import { Lesson } from "typings/workshop";

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: Lesson;
}

function CardLession({ data, ...props }: Props): JSX.Element {
  return (
    <div
      {...props}
      className="border-cbs-border border-0.5 rounded-cbs-md px-3.5 pb-3 h-full grid space-y-4"
      style={{ gridTemplateRows: "133px max-content 1fr" }}
    >
      <div className="w-full object-cover overflow-hidden">
        <img src="/images/workshop/workshop.png" alt="" />
      </div>
      {/* TAGS */}
      <div>
        <span className="inline-block text-x-small pl-2.5 pr-3 bg-[#FFEED9] py-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-cbs-schedule-oneweek mr-2"></span>
          <span>{(data.userCreate as User).bizfullname}</span>
        </span>
      </div>
      <p className="text-x-large line-clamp-2 flex-1">
        <strong>{data.name}</strong>
      </p>
      <div>
        <div className="mb-4">
          <img className="inline mr-2 w-6 h-6" src="/images/workshop/google-presentation.png" alt="" />
          <span>{data.amountLessions || 0} Workshops</span>
        </div>
        <div className="h-[3px] bg-cbs-schedule-after-7days"></div>
        <div
          className="flex justify-between text-medium pt-3"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <div>
            <img className="inline-block w-[18px] h-[18px]" src="/images/workshop/love.png" alt="" />
            <span>{data.amountReaction || 0}</span>
          </div>
          <div>
            <img className="inline-block w-[18px] h-[18px]" src="/images/workshop/view.png" alt="" />
            <span>{data.amountViews || 0}</span>
          </div>
          <div>
            <img className="inline-block w-[18px] h-[18px]" src="/images/workshop/user.png" alt="" />
            <span>{data.amountUserViews || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardLession;
