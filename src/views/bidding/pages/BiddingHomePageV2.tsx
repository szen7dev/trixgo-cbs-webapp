import React, { FC, Fragment, useState } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Listbox, Transition } from "@headlessui/react";
import { debounce } from "lodash";
import iconBack from "assets/images/icon-back-gray.svg";
import {
  useLocation,
  generatePath,
  useRouteMatch,
  Link,
  useHistory,
  useParams,
} from "react-router-dom";

import { useDatahubCompanies } from "services/hooks/datahub";

import iconDatabase from "assets/images/icons8-database-96 2.png";
import classNames from "classnames";

type Props = {
  //
};

SwiperCore.use([Navigation]);

const people = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];

const IconSearch = (...rest: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const BiddingHomePageV2: FC<Props> = (props) => {
  const location = useLocation();
  const { id } = useParams<{ id?: string }>();
  const history = useHistory();
  const match = useRouteMatch();

  console.log({ location, match });

  const [selected, setSelected] = useState<typeof people[0] | null>(null);
  const [company, setCompany] = useState("");

  // Important for each page
  const key = id ? ["company", company, id] : ["company", company];

  const {
    data: listCompanies,
    fetchNextPage,
    hasNextPage,
  } = useDatahubCompanies(
    key,
    {
      select: "_id name sign image address",
      limit: 24,
      keyword: company,
    },
    { enable: Boolean(company.length) }
  );

  // Handler
  const handleChangeRoute = () => {
    // location.
    history.push("/bidding/home/test");
  };

  return (
    <div
      className="h-full w-full overflow-auto bg-cbs-gray"
      onScroll={(e) => {
        if (!company || !hasNextPage) return;
        // FetchNextPage before scrolled to end
        if (
          e.currentTarget.clientHeight + e.currentTarget.scrollTop + 100 >
          e.currentTarget.scrollHeight
        ) {
          fetchNextPage();
        }
      }}
    >
      <div className="w-full max-w-[1185px] mx-auto bg-white min-h-full pb-9">
        <div className="pt-6">
          <div className="w-32 h-32 rounded-full p-[30px] bg-cbs-gray mx-auto">
            <img src={iconDatabase} alt="" />
          </div>
          <p className="text-4x-large font-bold text-center mt-3">DataHub</p>
          <div className="mt-6">
            <div className="mx-auto max-w-[831px] bg-cbs-gray py-6 px-5 space-x-4 flex items-center">
              <div className="w-4/12 relative">
                <label className="">
                  <span className="absolute inset-y-0 left-2 flex items-center text-cbs-subtext">
                    <IconSearch />
                  </span>
                  <input
                    type="text"
                    placeholder="Tìm kiếm nhà thầu"
                    onChange={debounce((e) => setCompany(e.target.value), 300)}
                    className="pl-10 pr-6 py-2.5 w-full focus:outline-none bg-white placeholder-cbs-subtext text-medium border-[0.5px] border-cbs-border"
                  />
                </label>
              </div>
              <div className="w-4/12 h-full">
                <Listbox value={selected} onChange={setSelected}>
                  <div className="relative h-full z-2">
                    <Listbox.Button className="text-left px-3 py-2.5 h-full relative w-full bg-white placeholder-cbs-subtext text-medium border-[0.5px] border-cbs-border">
                      {selected ? selected.name : "Theo lĩnh vực"}
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {people.map((person, personIdx) => (
                          <Listbox.Option
                            key={personIdx}
                            className={({ active }) =>
                              classNames(
                                "cursor-default select-none relative py-2 pl-10 pr-4",
                                active ? "text-yellow-900 bg-yellow-100" : "text-gray-900"
                              )
                            }
                            value={person}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={classNames(
                                    selected ? "font-medium" : "font-normal",
                                    "block truncate"
                                  )}
                                >
                                  {person.name}
                                </span>
                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? "text-yellow-600" : "text-yellow-600",
                                      "absolute inset-y-0 left-0 flex items-center pl-3"
                                    )}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
              <div className="w-4/12 h-full">
                <Listbox value={selected} onChange={setSelected}>
                  <div className="relative h-full z-2">
                    <Listbox.Button className="text-left px-3 py-2.5 h-full relative w-full bg-white placeholder-cbs-subtext text-medium border-[0.5px] border-cbs-border">
                      {selected ? selected.name : "Theo khu vực"}
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {people.map((person, personIdx) => (
                          <Listbox.Option
                            key={personIdx}
                            className={({ active }) =>
                              classNames(
                                "cursor-default select-none relative py-2 pl-10 pr-4",
                                active ? "text-yellow-900 bg-yellow-100" : "text-gray-900"
                              )
                            }
                            value={person}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={classNames(
                                    selected ? "font-medium" : "font-normal",
                                    "block truncate"
                                  )}
                                >
                                  {person.name}
                                </span>
                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? "text-yellow-600" : "text-yellow-600",
                                      "absolute inset-y-0 left-0 flex items-center pl-3"
                                    )}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
              <button
                onClick={() => null}
                className="bg-cbs-green px-4 py-2 rounded-cbs-sm whitespace-nowrap font-bold text-white"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
        {!company && !id ? (
          <div className="mt-10">
            <div className="flex px-3">
              <div className="pl-12 py-2 pr-1 border border-cbs-border rounded-cbs-sm relative">
                <span className="absolute inset-y-0 left-2 flex items-center text-cbs-subtext">
                  <IconSearch />
                </span>
                <input className="outline-none" placeholder="Filter by tag name" />
              </div>
            </div>
            <div className="flex flex-wrap text-cbs-subtext pt-3 text-medium -mx-2 px-3">
              {Array.from({ length: 10 }).map((record, idx) => (
                <div key={idx} className="w-3/12 px-2 mb-3" onClick={() => handleChangeRoute()}>
                  <div
                    // to={generatePath(location.pathname + "/:id", { id: record._id })}
                    className="flex flex-col h-full rounded-cbs-sm overflow-hidden border-cbs-border border-0.5 "
                  >
                    <div className="p-3">
                      <div>
                        <div className="inline-block bg-cbs-hightlight-right-navigate border border-cbs-border px-4 py-2 rounded-cbs-sm">
                          <h3 className=" line-clamp-1">Vật liệu hoàn thiện - gạch</h3>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p>
                          For questions regarding programming in ECMAScript (JavaScript/JS) and its
                          various dialects/implementations (excluding ActionScript). Note...
                        </p>
                      </div>
                      <div className="flex justify-between mt-4">
                        <div className="flex-1 leading-5">
                          <div className="text-black">125</div>
                          <div className="text-cbs-subtext">đơn vị</div>
                        </div>
                        <div className="flex-1 leading-5">
                          <div className="text-black">666</div>
                          <div className="text-cbs-subtext">bài viết</div>
                        </div>
                        <div className="leading-5">
                          <div className="text-black">9 tỷ</div>
                          <div className="text-cbs-subtext">lượt xem</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-10 pl-3.5">
            {id ? (
              <div className="flex items-center">
                <button className="rounded-full bg-cbs-gray p-3 mr-2">
                  <img src={iconBack} alt={"----"} className={"w-[18px]"} />
                </button>
                <div className="text-[22px] leading-6">Vật liệu hoàn thiện-gạch</div>
              </div>
            ) : (
              <div className="text-[22px] leading-6">Kết quả tìm kiếm</div>
            )}
            <div className="flex flex-wrap text-cbs-subtext pt-1 text-medium pl-3.5 pr-1.5">
              {listCompanies?.pages.map((page, idx) => (
                <Fragment key={idx}>
                  {page.data.listRecords.map((record, idx) => (
                    <div key={record._id} className="w-3/12 px-2 mb-3">
                      <Link
                        to={generatePath("/bidding/home/contractor/:id", {
                          id: record._id,
                        })}
                        className="flex flex-col h-full rounded-cbs-md overflow-hidden border-cbs-border border-0.5 "
                      >
                        <div className="h-36">
                          <img
                            className="w-full h-full z-0 object-cover"
                            src={`${process.env.REACT_APP_URL_S3_COMPANY}/${record.image}`}
                            alt="News"
                          />
                        </div>
                        <div className="bg-cbs-active-comment text-black text-medium px-3 py-3.5 flex-1 max-h-[60px]">
                          <p className="line-clamp-2">
                            {record.sign} {record.name}
                          </p>
                        </div>
                        <div className="text-cbs-subtext text-x-small px-4 py-2.5">
                          <p className="line-clamp-2">{record.address}</p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BiddingHomePageV2;
