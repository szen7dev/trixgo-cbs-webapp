import { FC } from "react";

import { Disclosure } from "@headlessui/react";

import CaretIcon from "assets/icons/Caret";

const LinksInformation: FC = () => {
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div className="border-b-6 border-solid border-secondary-light">
          <Disclosure.Button className="flex justify-between items-center w-full text-base font-semibold bg-transparent focus:outline-none px-5 py-2">
            <span>Links</span>
            <CaretIcon
              className={`${
                open ? "transform rotate-180" : "transform rotate-90"
              } w-3 h-3 text-primary-gray`}
            />
          </Disclosure.Button>
          <Disclosure.Panel>
            <div className="flex flex-nowrap items-center content cursor-pointer hover:bg-lighter-gray py-3 px-5">
              <img
                src="https://t-f17-zpg.zdn.vn/480/5815411426164403865/bf221b044b45bf1be654.jpg"
                alt="Link Information"
                className="flex flex-grow-0 flex-shrink-0 w-10 h-10 rounded border border-solid border-secondary-light object-cover bg-secondary bg-opacity-10"
              />

              <div className="block flex-1 ml-3">
                <div className="truncate max-w-[250px] font-semibold text-sm text-dark">
                  Mailtrap - Safe Email Testing
                </div>
                <div className="flex justify-between items-end cursor-pointer mt-1">
                  <div className="truncate max-w-[250px] text-xs text-secondary">
                    mailtrap.io
                  </div>
                  <div className="text-xs text-primary-gray">07/06</div>
                </div>
              </div>
            </div>

            <div className="flex flex-nowrap items-center content cursor-pointer hover:bg-lighter-gray py-3 px-5">
              <img
                src="https://t-f18-zpg.zdn.vn/480/2427096813563595735/ba4fe6a83b65ce3b9774.jpg"
                alt="Link Information"
                className="flex flex-grow-0 flex-shrink-0 w-10 h-10 rounded border border-solid border-secondary-light object-cover bg-secondary bg-opacity-10"
              />

              <div className="block flex-1 ml-3">
                <div className="truncate max-w-[250px] font-semibold text-sm text-dark">
                  Figma
                </div>
                <div className="flex justify-between items-end cursor-pointer mt-1">
                  <div className="truncate max-w-[250px] text-xs text-secondary">
                    www.figma.com
                  </div>
                  <div className="text-xs text-primary-gray">19/05</div>
                </div>
              </div>
            </div>

            <div className="flex flex-nowrap items-center content cursor-pointer hover:bg-lighter-gray py-3 px-5">
              <img
                src="https://link.photo.talk.zdn.vn/photolinkv2/720/aHR0cDovL3N0YWdpbmcudmljb3N0b25lLmNvbS8tL21lZGlhL3ZpY29zdG9uZV9wcm9zaXRlL2Jhbm5lci9jYXJvdXNlbF9tb2JpbGUuYXNoeA=="
                alt="Link Information"
                className="flex flex-grow-0 flex-shrink-0 w-10 h-10 rounded border border-solid border-secondary-light object-cover bg-secondary bg-opacity-10"
              />

              <div className="block flex-1 ml-3">
                <div className="truncate max-w-[250px] font-semibold text-sm text-dark">
                  http://staging.vicostone.com/-/media/vicostone_prosite/banner/carousel_mobile.ashx
                </div>
                <div className="flex justify-between items-end cursor-pointer mt-1">
                  <div className="truncate max-w-[250px] text-xs text-secondary">
                    staging.vicostone.com
                  </div>
                  <div className="text-xs text-primary-gray">07/06</div>
                </div>
              </div>
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

export default LinksInformation;
