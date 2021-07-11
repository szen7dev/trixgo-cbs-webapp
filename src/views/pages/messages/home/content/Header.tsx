import { Dispatch, SetStateAction, FC } from "react";

import PhoneIcon from "assets/icons/Phone";
import VideoCameraIcon from "assets/icons/VideoCamera";
import InformationCircleIcon from "assets/icons/InformationCircle";

type Props = {
  isShowInformation: boolean;
  handleInformationCb: Dispatch<SetStateAction<boolean>>;
};

const MessageHeader: FC<Props> = ({
  isShowInformation,
  handleInformationCb,
}) => {
  return (
    <div className="flex justify-between border-b border-solid border-secondary-light shadow-sm py-3 px-5">
      <div className="flex">
        <figure className="w-14 h-14 rounded-full mr-4">
          <img
            src="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            alt="User Avatar"
            className="w-full h-full object-cover rounded-full"
          />
        </figure>

        <div className="flex flex-col justify-center">
          <h5 className="font-semibold text-lg leading-5 mb-1">Khánh Ney</h5>
          <small className="font-normal text-sm leading-4 text-secondary-gray">
            <i>Hoạt động 10 phút trước</i>
          </small>
        </div>
      </div>

      <div className="flex items-center">
        <button className="w-10 h-10 inline-flex items-center justify-center rounded-full focus:outline-none mx-1.5">
          <PhoneIcon isFill className="w-7 h-7 text-secondary" />
        </button>

        <button className="w-10 h-10 inline-flex items-center justify-center rounded-full focus:outline-none mx-1.5">
          <VideoCameraIcon isFill className="w-7 h-7 text-secondary" />
        </button>

        <button
          className="w-10 h-10 inline-flex items-center justify-center rounded-full focus:outline-none mx-1.5"
          onClick={() => handleInformationCb(!isShowInformation)}
        >
          <InformationCircleIcon isFill className="w-7 h-7 text-secondary" />
        </button>
      </div>
    </div>
  );
};

export default MessageHeader;
