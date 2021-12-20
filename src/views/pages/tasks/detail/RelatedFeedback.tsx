import { FC, useState } from "react";

import FeedbackItem from "./FeedbackItem";
import IconDownload from "assets/images/icons8-reply-arrow-96.svg";
import ChevronUpIcon from "assets/images/icon-chevron-up.png";

const RelatedFeedback: FC = () => {
  const [isExpand, setIsExpand] = useState(true);
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-end my-5 space-x-8">
          <div>
            <p className="text-x-large">Phản hồi liên quan</p>
          </div>
          <div className="border-b-2 border-primary">
            <span className="text-[13px] font-bold">Tất cả (12)</span>
          </div>
          <div>
            <span className="text-[13px] text-primary-gray">
              Đã đánh dấu (3)
            </span>
          </div>
        </div>
        <div className="flex justify-center w-10 h-10 rounded-full bg-gray-200">
          <button onClick={() => setIsExpand(!isExpand)}>
            <div className="flex flex-col space-y-1">
              <img
                src={ChevronUpIcon}
                alt="Cheveron Icon"
                className={`${
                  isExpand ? "transform rotate-180" : "transform rotate-0"
                } w-3`}
              />
              <img
                src={ChevronUpIcon}
                alt="Cheveron Icon"
                className={`${
                  isExpand ? "transform rotate-0" : "transform rotate-180"
                } w-3`}
              />
            </div>
          </button>
        </div>
      </div>
      <p className="my-5 text-sm text-primary">Xem 152 phản hồi trước</p>
      <div>
        <FeedbackItem expanded={isExpand} />
        <FeedbackItem expanded={isExpand} />
        <FeedbackItem expanded={isExpand} />
      </div>

      <div>
        <button className="flex items-center px-3 py-1 rounded-t-sm border-2 hover:bg-gray-200">
          <img src={IconDownload} alt="Rely" className="w-6" />
          <span className="mx-1 text-[13px]">Phản hồi</span>
        </button>
      </div>
    </div>
  );
};

export default RelatedFeedback;
