import { FC, useContext, useState } from "react";

import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import debounce from "lodash/debounce";

import { ModalContext } from "views/document/contexts/modal";

import {
  ButtonMore,
  ButtonCreate,
  SearchInput,
  DropdownFilterButton
} from 'views/document/sharedComponents/common';

import projectImage from "assets/images/project.jpg";
import "views/document/styles/document.css";

import { useQueryListDepartmentsIsMember } from "services/hooks/items/useDepartment";

export const DocumentHomePage: FC = () => {
  const { toggleModal } = useContext(ModalContext);
  const [keyword, setKeyword] = useState("");

  const { data: listDepartments, totalRecord, fetchNextPage: fetchNextPageDepartments } =
  useQueryListDepartmentsIsMember({ keyword, isFetch: true });

  return (
    <div className="flex flex-col text-sm text-black overflow-hidden h-full">
      {/* Header */}
      <div className="px-4 flex items-center w-full text-primary-gray bg-white border border-gray-300 py-1">
        <div className="flex flex-1 items-center">
          <span className="text-x-large mr-7 text-black">Danh sách</span>
          <SearchInput
            classNameWrapper="rounded-sm flex bg-cbs-left-menu mr-2"
            onChange={debounce((event: any) => setKeyword(event.target.value), 500)}
          />
          <DropdownFilterButton />
        </div>
        {/* <ButtonCreate onClick={toggleModal} /> */}
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
              {/* <b>Yay! You have seen it all</b> */}
            </p>
          }
          scrollableTarget="scrollable"
          className="flex flex-wrap w-full px-2 pt-2 pb-20 gap-y-2.5 text-primary-gray"
        >
          {listDepartments.map((item, index) => {
            const imgUrl = item?.image
              ? (item?.image?.startsWith('files/db')
              ? `${process.env.REACT_APP_URL_S3}/${item?.image}`
              : `${process.env.REACT_APP_URL_S3_PROJECT}/${item?.image}`)
              : projectImage;
            return (
              <div key={index} className="document__card-container">
                <div className="document__home-card relative mt-2 border-cbs-border box-border border">
                  <div className="flex mb-5">
                    <img
                      src={imgUrl}
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
                    to={`/document/project/${item._id}/home`}
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