import { FC } from "react";

import FeedbackItem from "./FeedbackItem";
import IconDownload from "assets/images/icons8-reply-arrow-96.svg";

const RelatedFeedback: FC = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-end my-5 space-x-8">
        <div>
          <p className="text-x-large">Phản hồi liên quan</p>
        </div>
        <div className="border-b-2 border-primary">
          <span className="text-[13px] font-bold">Tất cả (12)</span>
        </div>
        <div>
          <span className="text-[13px] text-primary-gray">Đã đánh dấu (3)</span>
        </div>
      </div>
      <p className="my-5 text-sm text-primary">Xem 152 phản hồi trước</p>
      <div>
        <FeedbackItem />
        <FeedbackItem />
        <FeedbackItem />
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
