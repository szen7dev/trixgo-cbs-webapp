import { FC, useContext, useState } from "react";

import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

// Context
import { Context } from "views/pages/document/contexts/contextModal";

import DropdownFilterButton from "views/pages/document/components/DocumentFilterButton";
import SearchInput from "components/common/SearchInput";
import ButtonMore from "views/pages/document/components/common/ButtonMore";
import ButtonCreate from "views/pages/document/components/common/ButtonCreate";

import projectImage from "assets/images/project.jpg";
import "views/pages/document/document.css";

import { useQueryListDepartments } from "services/hooks/items/useDepartment";

interface IData {
  id: number;
  title: string;
  company: string;
  count: number;
}

const DocumentHomePage: FC = () => {
  const { toggleModal } = useContext(Context);

  const { listDepartments, totalRecord, fetchNextPageDepartments } =
    useQueryListDepartments({
      select: "image sign name company numberOfDocs",
      populates: {
        path: "company",
        select: "name",
      },
    });
  return (
    <div className="flex flex-col text-sm text-black overflow-hidden h-full">
      {/* Header */}
      <div className="px-4 flex items-center w-full text-primary-gray bg-white border border-gray-300 py-1">
        <div className="flex flex-1 items-center">
          <span className="text-x-large mr-7 text-black">Danh sách</span>
          <SearchInput
            classNameWrapper="rounded-sm flex bg-cbs-left-menu mr-2"
            onChange={() => 1}
          />
          <DropdownFilterButton />
        </div>
        <ButtonCreate onClick={toggleModal} />
        <ButtonMore />
      </div>

      {/* Content */}
      <div id="scrollable" className="flex-1 overflow-y-auto">
        <InfiniteScroll
          dataLength={totalRecord} //This is important field to render the next data
          next={fetchNextPageDepartments}
          hasMore={true}
          loader={<div className="w-full pt-2 text-center">Loading...</div>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollableTarget="scrollable"
          className="flex flex-wrap w-full px-2 pt-2 pb-20 gap-y-2.5 text-primary-gray"
        >
          {listDepartments.map((item, index) => {
            return (
              <div key={index} className="document__card-container">
                <div className="document__home-card relative mt-2 border-cbs-border box-border border">
                  <div className="flex mb-5">
                    <img
                      src={item.image || projectImage}
                      alt="Avatar"
                      className="h-[90px] w-[90px] object-cover"
                    />
                    <div className="flex flex-1 justify-center items-center">
                      <div className="rounded-full flex flex-col justify-center items-center w-[75px] h-[75px] border-cbs-border border-b bg-cbs-gray">
                        <p className="text-x-large text-black">
                          {item.numberOfDocs || 0}
                        </p>
                        <p>Hồ sơ</p>
                      </div>
                    </div>
                  </div>
                  <Link
                    className="document__line text-large text-black"
                    to={`/document/project/${item._id}/document`}
                  >
                    {`${item.sign}.${item.name}`}
                  </Link>
                  <p className="text-x-small document__line-min mt-1.5">
                    {item?.company?.name}
                  </p>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default DocumentHomePage;
