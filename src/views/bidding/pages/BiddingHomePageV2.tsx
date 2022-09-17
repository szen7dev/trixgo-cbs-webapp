import companyIcon from "assets/images/company_default.png";
import iconBack from "assets/images/icon-back-gray.svg";
import { debounce } from "lodash";
import { FC, Fragment, useState } from "react";
import { generatePath, Link, useHistory, useLocation, useParams } from "react-router-dom";

import { useDatahubArea, useDatahubCompanies } from "services/hooks/datahub";

import DatahubRepository from "apis/datahub";
import iconDatabase from "assets/images/icons8-database-96 2.png";
import { useQuery } from "react-query";
import useInfiniteDatahubTypes from "services/hooks/datahub/types/useInfiniteDatahubTypes";
import { CustomAutoComplete } from "shareComponents/common/Form/CustomForm";
import { DatahubArea } from "typings/datahub/area";
import { DatahubTypes, DatahubTypesBase } from "typings/datahub/datahubtypes";
import { useEffect } from "react";
import { buildKeyDatahubPackage } from "apis/datahub/package";
import { buildDatahubTypeKey } from "apis/datahub/types";
import { buildDatahubAreaKey } from "apis/datahub/area";

type Props = {
  //
};

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
  const { id } = useParams<{ id?: string }>();
  const history = useHistory();
  const location = useLocation<DatahubTypes>();

  const [company, setCompany] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchArea, setSearchArea] = useState("");
  const [type, setType] = useState<DatahubTypes>();
  const [area, setArea] = useState<DatahubArea>();

  useEffect(() => {
    if (location.state) setType(location.state);
  }, [location.state]);

  // Important for each page
  const key = id ? ["company", company, id] : ["company", company];

  const {
    data: listCompanies,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useDatahubCompanies(
    key,
    {
      select: "_id name sign image address description birthDay",
      limit: 24,
      keyword: company,
    },
    { enable: Boolean(company.length) }
  );

  const datahubAreas = useDatahubArea(
    buildDatahubAreaKey({ keyword: searchArea, limit: 20, populates: "multiple" }),
    {
      select: "_id name parent level",
      limit: 20,
      keyword: searchArea,
      populates: JSON.stringify({
        path: "parent",
        select: "name sign parent level",
        populate: { path: "parent", select: "name sign parent level" },
      }),
    },
    { enable: true }
  );

  const selectTypes = "_id name description numberOfContractors numberOfPosts numverOfViews";
  const datahubTypes = useInfiniteDatahubTypes(
    buildDatahubTypeKey({ keyword: searchType, select: selectTypes }),
    {
      keyword: searchType,
      select: selectTypes,
    },
    { enable: true }
  );

  const datahubPackages = useQuery(
    buildKeyDatahubPackage({ mode: 1, areaID: area?._id, fieldID: id, level: area?.level }),
    () =>
      DatahubRepository.getDatahubPackageList(1, {
        fieldID: id,
        areaID: area?._id,
        level: area?.level,
      }),
    {
      enabled: Boolean(id) && Boolean(type || area),
    }
  );

  // Handler
  const handleChangeRoute = (d: DatahubTypesBase) => {
    history.push("/bidding/home/tag/" + d._id, d);
  };

  const handleSearch = () => {
    if (type) handleChangeRoute(type);
    else refetch();
  };

  return (
    <div
      className="h-full w-full overflow-auto"
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
          <p className="text-4x-large font-bold text-center mt-3">DataHub năng lực nhà thầu</p>
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
                <CustomAutoComplete
                  server
                  data={datahubTypes.data?.pages.flatMap((p) => p.data.listRecords) || []}
                  onScroll={console.log}
                  value={type}
                  onChange={debounce((keyword) => {
                    setType(undefined);
                    if (!keyword) {
                      // setUserSelected("");
                    }
                    setSearchType(keyword);
                  }, 300)}
                  onChangeValue={(type) => {
                    setType(type);
                    history.replace("/bidding/home/tag/" + type._id);
                  }}
                  renderValue={(v) => v.name}
                  attribute="types"
                  wrapperClassName=""
                  className="w-full h-full py-2.5 px-3 focus:outline-none text-medium"
                  placeholder="Theo lĩnh vực"
                />
              </div>
              <div className="w-4/12 h-full">
                <CustomAutoComplete
                  server
                  data={datahubAreas.data?.pages.flatMap((p) => p.data.listRecords) || []}
                  onScroll={console.log}
                  onChange={debounce((keyword) => {
                    setArea(undefined);
                    if (!keyword) {
                      // setUserSelected("");
                    }
                    setSearchArea(keyword);
                  }, 300)}
                  onChangeValue={setArea}
                  renderValue={(v) =>
                    v.name + ", " + (v.parent as any).name + ", " + (v.parent as any).parent?.name
                  }
                  attribute="area"
                  wrapperClassName=""
                  className="w-full h-full py-2.5 px-3 focus:outline-none text-medium"
                  placeholder="Theo khu vực"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-cbs-green px-4 py-2 rounded-cbs-sm whitespace-nowrap font-bold text-white"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
        {!company && !type && !area ? (
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
              {datahubTypes.data?.pages.map((page, idx) =>
                page.data.listRecords.map((record) => (
                  <div
                    key={record._id}
                    className="w-3/12 px-2 mb-3 cursor-pointer"
                    onClick={() => handleChangeRoute(record)}
                  >
                    <div
                      // to={generatePath(location.pathname + "/:id", { id: record._id })}
                      className="flex flex-col h-full rounded-cbs-sm overflow-hidden border-cbs-border border-0.5 "
                    >
                      <div className="p-3">
                        <div>
                          <div className="inline-block bg-[#E1ECF4] border border-cbs-border px-4 py-2 rounded-cbs-sm">
                            <h3 className=" line-clamp-1">{record.name}</h3>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p>{record.description}</p>
                        </div>
                        <div className="flex justify-between mt-4">
                          <div className="flex-1 leading-5">
                            <div className="text-black">{record.numberOfContractors}</div>
                            <div className="text-cbs-subtext">đơn vị</div>
                          </div>
                          {/* <div className="flex-1 leading-5">
                            <div className="text-black">{record.numberOfPosts}</div>
                            <div className="text-cbs-subtext">bài viết</div>
                          </div>
                          <div className="leading-5">
                            <div className="text-black">{record.numberOfViews || 0}</div>
                            <div className="text-cbs-subtext">lượt xem</div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : id ? (
          <div className="mt-10 pl-3.5">
            <div className="flex items-center">
              <button
                className="rounded-full bg-cbs-gray p-3 mr-2"
                onClick={() => history.goBack()}
              >
                <img src={iconBack} alt={"----"} className={"w-[18px]"} />
              </button>
              <div className="text-[22px] leading-6">{type?.name}</div>
            </div>
            <div className="flex flex-wrap text-cbs-subtext pt-1 text-medium pl-3.5 pr-1.5">
              {datahubPackages.data?.data.map((pack, idx) => {
                const { _id, address, image, name, sign } = pack._id.contractor;
                return (
                  <div key={_id} className="w-3/12 px-2 mb-3">
                    <Link
                      to={generatePath("/bidding/home/contractor/:id", {
                        id: _id,
                      })}
                      className="flex flex-col h-full rounded-cbs-md overflow-hidden border-cbs-border border-0.5 "
                    >
                      <div className="h-36">
                        <img
                          className="w-full h-full z-0 object-cover"
                          src={
                            image ? `${process.env.REACT_APP_URL_S3_COMPANY}/${image}` : companyIcon
                          }
                          alt="News"
                        />
                      </div>
                      <div className="bg-cbs-active-comment text-black text-medium px-3 py-3.5 flex-1 max-h-[60px]">
                        <p className="line-clamp-2">
                          {sign} {name}
                        </p>
                      </div>
                      <div className="text-cbs-subtext text-x-small px-4 py-2.5">
                        <p className="line-clamp-2">{address}</p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-10 pl-3.5">
            <div className="text-[22px] leading-6">Kết quả tìm kiếm</div>
            <div className="flex flex-wrap text-cbs-subtext pt-1 text-medium pl-3.5 pr-1.5">
              {/* {console.log(listCompanies)} */}
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
                            src={
                              record.image
                                ? `${process.env.REACT_APP_URL_S3_COMPANY}/${record.image}`
                                : companyIcon
                            }
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
