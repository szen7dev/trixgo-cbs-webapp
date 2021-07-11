import { FC } from "react";

import CheckIcon from "assets/icons/Check";

const MessageBody: FC = () => {
  return (
    <div className="chat-body-height p-8">
      {/* Outgoing message */}
      <div className="block max-w-[75%] ml-auto mb-12">
        <div className="flex items-center mb-4">
          <figure className="w-9 h-9 rounded-full mr-4">
            <img
              src="https://s120-ava-talk.zadn.vn/0/3/a/a/3/120/5969a751f836b7a12687ae71350086d8.jpg"
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </figure>
          <div className="flex flex-col justify-center">
            <h5 className="font-semibold text-lg leading-5 mb-1">
              Lê Trung Hiếu
            </h5>
            <small className="font-normal text-sm leading-4 text-secondary-gray">
              <i className="flex items-center">
                11:05 AM
                <CheckIcon className="w-4 h-4 text-positive ml-2" />
                <CheckIcon className="w-4 h-4 text-positive -ml-1" />
              </i>
            </small>
          </div>
        </div>

        <div className="bg-secondary text-primary-light rounded-md py-3 px-6">
          Thank you so much. These files are very important to me. I guess you
          did not make any changes to these files. So I need the original
          versions of these files. Thank you very much again.
        </div>
      </div>

      {/* Single message */}
      <div className="w-max max-w-[75%] mb-12">
        <div className="flex items-center mb-4">
          <figure className="w-9 h-9 rounded-full mr-4">
            <img
              src="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </figure>
          <div className="flex flex-col justify-center">
            <h5 className="font-semibold text-lg leading-5 mb-1">Khánh Ney</h5>
            <small className="font-normal text-sm leading-4 text-secondary-gray">
              <i>11:05 AM</i>
            </small>
          </div>
        </div>

        <div className="bg-secondary text-primary-light rounded-md py-3 px-6">
          I thank you. We are glad to help you. 😃
        </div>
      </div>

      {/* Outgoing message */}
      <div className="block max-w-[75%] ml-auto mb-12">
        <div className="flex items-center mb-4">
          <figure className="w-9 h-9 rounded-full mr-4">
            <img
              src="https://s120-ava-talk.zadn.vn/0/3/a/a/3/120/5969a751f836b7a12687ae71350086d8.jpg"
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </figure>
          <div className="flex flex-col justify-center">
            <h5 className="font-semibold text-lg leading-5 mb-1">
              Lê Trung Hiếu
            </h5>
            <small className="font-normal text-sm leading-4 text-secondary-gray">
              <i className="flex items-center">
                11:05 AM
                <CheckIcon className="w-4 h-4 text-positive ml-2" />
                <CheckIcon className="w-4 h-4 text-positive -ml-1" />
              </i>
            </small>
          </div>
        </div>

        <div className="bg-secondary text-primary-light rounded-md py-3 px-6">
          😃 😃 ❤ ❤
        </div>
      </div>

      {/* Single message */}
      <div className="w-max max-w-[75%] mb-12">
        <div className="flex items-center mb-4">
          <figure className="w-9 h-9 rounded-full mr-4">
            <img
              src="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </figure>
          <div className="flex flex-col justify-center">
            <h5 className="font-semibold text-lg leading-5 mb-1">Khánh Ney</h5>
            <small className="font-normal text-sm leading-4 text-secondary-gray">
              <i>11:05 AM</i>
            </small>
          </div>
        </div>

        <img
          src="https://slek.laborasyon.com/demos/default/dist/media/img/image1.jpg"
          alt="Message"
          className="w-28"
        />
      </div>

      {/* Outgoing message */}
      <div className="block max-w-[75%] ml-auto mb-12">
        <div className="flex items-center mb-4">
          <figure className="w-9 h-9 rounded-full mr-4">
            <img
              src="https://s120-ava-talk.zadn.vn/0/3/a/a/3/120/5969a751f836b7a12687ae71350086d8.jpg"
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </figure>
          <div className="flex flex-col justify-center">
            <h5 className="font-semibold text-lg leading-5 mb-1">
              Lê Trung Hiếu
            </h5>
            <small className="font-normal text-sm leading-4 text-secondary-gray">
              <i className="flex items-center">
                11:05 AM
                <CheckIcon className="w-4 h-4 text-positive ml-2" />
                <CheckIcon className="w-4 h-4 text-positive -ml-1" />
              </i>
            </small>
          </div>
        </div>

        <div className="bg-secondary text-primary-light rounded-md py-3 px-6">
          You are good ❤❤
        </div>
      </div>

      {/* Message divider */}
      <div className="message-divider" data-label="1 message unread"></div>

      {/* Single message */}
      <div className="w-max max-w-[75%] mb-12">
        <div className="flex items-center mb-4">
          <figure className="w-9 h-9 rounded-full mr-4">
            <img
              src="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </figure>
          <div className="flex flex-col justify-center">
            <h5 className="font-semibold text-lg leading-5 mb-1">Khánh Ney</h5>
            <small className="font-normal text-sm leading-4 text-secondary-gray">
              <i>11:05 AM</i>
            </small>
          </div>
        </div>

        <div className="bg-secondary-light rounded-md py-3 px-6">
          I sent you all the files. Good luck with 😃
        </div>
      </div>
    </div>
  );
};

export default MessageBody;
