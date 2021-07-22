import { FC } from "react";

type Props = {
  logo: string[];
  isOnline: boolean;
};

const ConversationLogo: FC<Props> = ({ logo, isOnline }) => {
  const length = logo.length;

  if (!length)
    return (
      <div className="relative">
        <img
          src="https://images.assetsdelivery.com/compings_v2/triken/triken1608/triken160800029.jpg"
          alt="Chat Item Avatar"
          className="w-[52px] h-[52px] rounded-full"
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-positive border-2 border-primary-light"></span>
        )}
      </div>
    );

  return (
    <>
      {length === 2 ? (
        <div className="relative">
          <img
            src={logo[1]}
            alt="Chat Item Avatar"
            className="w-[52px] h-[52px] rounded-full"
          />
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-positive border-2 border-primary-light"></span>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center cursor-pointer">
          <div className="flex flex-wrap w-[52px] h-[52px]">
            <div
              className="w-6 h-6 rounded-full text-xs bg-no-repeat bg-cover"
              style={{
                backgroundImage:
                  "url(https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg)",
                backgroundPosition: "50%",
              }}
            />
            <div
              className="w-6 h-6 rounded-full text-xs bg-no-repeat bg-cover"
              style={{
                backgroundImage:
                  "url(https://s120-ava-talk.zadn.vn/1/e/7/3/5/120/b3fbae654335aec95c35e350a5850017.jpg)",
                backgroundPosition: "50%",
              }}
            />
            <div
              className="w-6 h-6 rounded-full text-xs bg-no-repeat bg-cover"
              style={{
                backgroundImage:
                  "url(https://s120-ava-talk.zadn.vn/7/9/0/2/45/120/f573ead9e85e2e06ac3b86072ffc8e4e.jpg)",
                backgroundPosition: "50%",
              }}
            />
            <div className="w-6 h-6 rounded-full text-center text-sm leading-6 bg-lighter-gray">
              7
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConversationLogo;
