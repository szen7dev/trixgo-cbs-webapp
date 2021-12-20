import { FC } from "react";

import FeedbackItem from "./FeedbackItem";

const RelatedFeedback: FC = () => {
  return (
    <div>
      <p className="text-x-large my-5">Phản hồi liên quan</p>
      {/* Header */}
      <div>
        <FeedbackItem />
      </div>
    </div>
  );
};

export default RelatedFeedback;
