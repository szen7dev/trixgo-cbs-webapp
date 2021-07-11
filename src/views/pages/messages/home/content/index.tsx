import { FC, useState } from "react";

import MessageHeader from "./Header";
import MessageBody from "./Body";
import MessageInfo from "../information";

const MessageContent: FC = () => {
  const [isShowInformation, setIsShowInformation] = useState(false);

  return (
    <>
      <div className="flex flex-1 justify-between">
        <div className="flex flex-col w-full">
          <MessageHeader
            isShowInformation={isShowInformation}
            handleInformationCb={setIsShowInformation}
          />

          <MessageBody />

          <div className="border-t border-solid border-secondary-light py-4 px-8">
            Message Footer
          </div>
        </div>

        {isShowInformation && (
          <MessageInfo handleInformationCb={setIsShowInformation} />
        )}
      </div>
    </>
  );
};

export default MessageContent;
