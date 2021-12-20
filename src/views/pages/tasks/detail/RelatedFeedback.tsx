import { FC, useState } from "react";

import FeedbackItem from "./FeedbackItem";
import IconDownload from "assets/images/icons8-reply-arrow-96.svg";
import ChevronUpIcon from "assets/images/icon-chevron-up.png";
import AttachIcon from "assets/images/icons8-attach-50.png";

const RelatedFeedback: FC = () => {
  const [isExpand, setIsExpand] = useState(true);
  const [visibleForm, setVisibleForm] = useState(false);

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

      {visibleForm ? (
        <div className="ml-16">
          <div className="w-full border-2 rounded my-2">
            <textarea
              className="w-full focus: outline-none p-3"
              placeholder="Biên soạn nội dung (sẽ sử dụng thư viện Editor đổ vào khung này-sử dụng Tiny)"
              rows={10}
            />
          </div>
          <div className="flex justify-between mt-3">
            <label className="w-10 h-10">
              <img
                src={AttachIcon}
                alt="Icon attach"
                className="h-6 w-6 transform -rotate-45"
              />
              <input
                type="file"
                name="files"
                id="file"
                className="hidden"
                accept="image/*"
                multiple
              />
            </label>

            <div>
              <button
                className="px-3 py-2 rounded bg-gray-300 text-primary-gray"
                onClick={() => setVisibleForm(false)}
              >
                Bỏ qua
              </button>
              <button
                className="mx-3 px-3 py-2 rounded bg-primary text-white"
                onClick={() => setVisibleForm(false)}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <button
            className="flex items-center px-3 py-1 rounded-t-sm border-2 hover:bg-gray-200"
            onClick={() => setVisibleForm(true)}
          >
            <img src={IconDownload} alt="Rely" className="w-6" />
            <span className="mx-1 text-[13px]">Phản hồi</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default RelatedFeedback;
