import { FC } from "react";

import { Disclosure } from "@headlessui/react";

import CaretIcon from "assets/icons/Caret";

const ImagesVideosInformation: FC = () => {
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div className="border-b-6 border-solid border-secondary-light">
          <Disclosure.Button className="flex justify-between items-center w-full text-base font-semibold bg-transparent focus:outline-none px-5 py-2">
            <span>Ảnh / Videos</span>
            <CaretIcon
              className={`${
                open ? "transform rotate-180" : "transform rotate-90"
              } w-3 h-3 text-primary-gray`}
            />
          </Disclosure.Button>
          <Disclosure.Panel>
            <div className="grid grid-cols-4 gap-1 px-5">
              {Array.from(Array(8), (_e, i) => (
                <div
                  key={`images-videos-information-${i}`}
                  className="w-full h-16 bg-no-repeat bg-cover align-middle cursor-pointer"
                  style={{
                    backgroundImage:
                      "url(https://link.photo.talk.zdn.vn/photolinkv2/720/aHR0cHM6Ly92aWNvc3RvbmUuY29tLy0vbWVkaWEvbmctLS1pbWFnZXMvb2ctaW1hZ2UuYXNoeD9hcz0xJmlhcj0xJmg9NjMwJnc9MTIwMA==)",
                    backgroundPosition: "50%",
                  }}
                />
              ))}
            </div>

            <button className="block w-fill font-semibold text-sm leading-8 text-primary-gray bg-secondary-light hover:bg-secondary-gray hover:bg-opacity-40 rounded focus:outline-none py-0.5 my-3 mx-5">
              Xem tất cả
            </button>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default ImagesVideosInformation;
