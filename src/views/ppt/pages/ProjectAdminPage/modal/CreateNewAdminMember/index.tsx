import { FC } from "react";

import { useModal } from "services/hooks/useModal";

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import SearchIcon from "assets/images/icons8-search.svg";
import PolygonIcon from "assets/images/icon-polygon.svg";
import MemberIcon from "assets/images/member-icon.svg";
import { useGetUsersByCompany } from "services/hooks/pcm/usePcmAdminDetail";
import InfiniteScroll from "react-infinite-scroll-component";

const CreateNewAdminMember: FC<any> = ({ companyID }) => {
  const { closeModal } = useModal();
  const { listMembers, totalRecord, fetchNextPage, hasNextPageGetUsersByCompany } = useGetUsersByCompany(companyID, "");
  console.log("listMembers", listMembers);
  return (
    <main className="py-[18px]">
      <header className="flex item-center justify-between h-[50] px-[30px]">
        <p className="text-xl">Thêm thành viên</p>
        <div
          className="w-10 h-10 rounded-full bg-cbs-gray flex items-center justify-center cursor-pointer"
          onClick={() => closeModal()}
        >
          <img src={CloseIcon} alt="Close" className="w-3 h-3" />
        </div>
      </header>

      <section className="mt-4 px-[30px]">
        <div className="relative">
          <input
            type="text"
            className="h-10 w-full bg-cbs-table-header border border-primary-border outline-none px-8"
            placeholder="Nhập từ khóa tìm kiếm"
          />
          <img
            src={SearchIcon}
            alt="Search"
            className="w-4 h-4 absolute top-3 left-2"
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center mb-4">
            <input
              className="form-check-input mr-2"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              defaultChecked
            />
            <img src={PolygonIcon} alt="Polygon" />
          </div>

          {/* Content */}
          <div id="scrollable" className="flex-1 overflow-y-auto">
            <InfiniteScroll
              dataLength={totalRecord || 0}
              next={fetchNextPage}
              hasMore={Boolean(hasNextPageGetUsersByCompany)}
              loader={<div className="w-full pt-2 text-center">
                Loading...
              </div>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  {/* <b>Yay! You have seen it all</b> */}
                </p>
              }

              scrollableTarget="scrollable"
              className="flex-wrap w-full px-2 pt-2 pb-20 gap-y-4 text-primary-gray"
            >
              {
                listMembers.map((item: any, index: number) => (
                  <div key={index} className="flex items-center">
                    <input
                      className="form-check-input mr-9"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />

                    <div className="flex items-center">
                      <img
                        src={MemberIcon}
                        alt="Member"
                        className="mr-4 rounded-full"
                      />
                      <p>{item.bizfullname}</p>
                    </div>
                  </div>
                ))
              }
            </InfiniteScroll>
          </div>
        </div>
      </section>

      <footer className="absolute bottom-0 pb-6 w-full text-right px-[30px]">
        <button className="w-[95px] h-8 bg-primary text-primary-light rounded font-bold hover:opacity-90">
          Xác nhận
        </button>
      </footer>
    </main>
  );
};

export default CreateNewAdminMember;
