import { FC, useEffect, useState } from "react";

// Hook
import { DropdownFilterButton } from "views/document/sharedComponents/common";
import {
  Paginate,
  SearchInput,
  GroupActions,
  ButtonMore,
  DropdownSearchable,
} from "shareComponents/common";
import ModalReport from "./ModalReport";
import { ModalContainer } from "shareComponents/common";

// assets
import iconGraphReport from "assets/images/icons8-stop-graph-report-96.png";

const PageTwoDetail: FC = () => {
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [data, setData] = useState<{ id: number; [key: string]: any }[]>([]);

  useEffect(() => {
    document.title = "Trixgo | Sổ quỹ"
    setData(
      Array.from({ length: 5 }).map((_, index) => ({
        id: index,
        content: "Thu tiền về của dự án CHG đợt 5, phí Quản lý dự án",
        opening_balance: 250000000000,
        increased_balance: 1250000000000,
        closing_balance: 1250000000000,
        created_by: "Nguyễn Thị Ngân-CPMI",
        updated_by: "Hương-CPMI",
        created_at: "25/12/2021",
        updated_at: "17:20 14/11/21",
      }))
    );
  }, []);

  const toggleVisible = () => {
    setVisibleDrawer(!visibleDrawer);
  };
  const toggleDeleteModal = () => setIsShowDeleteModal(!isShowDeleteModal);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
        <span className="text-x-large mr-7">Sổ quỹ công ty tháng 1-12/2021</span>
        <SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={() => 1} />
        <DropdownFilterButton />
        <GroupActions className="flex items-center flex-1" onClickTrash={toggleDeleteModal} />

        {/* <ButtonCreate onClick={toggleModal} /> */}
        <button
          className="w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center"
          onClick={toggleVisible}
        >
          <img src={iconGraphReport} alt="" />
        </button>
        <ButtonMore />
      </div>
      <div className="flex-1 overflow-y-auto">
        <table
          className="text-black text-medium border-separate space-x-0 space-y-0 w-full"
          style={{ borderSpacing: 0 }}
        >
          <thead className="z-10 relative">
            <tr className="text-primary-gray whitespace-nowrap align-middle text-left">
              <th className="px-2 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                Ngày tháng
              </th>
              <th className="px-2 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                Nội dung
              </th>
              <th className="px-2 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                Tài khoản
              </th>
              <th className="px-2 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                Mã khách
              </th>
              <th className="px-2 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                Hợp đồng
              </th>
              <th className="px-2 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                Thu
              </th>
              <th className="px-2 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                Chi
              </th>
              <th className="px-2 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                Tồn
              </th>
              <th className="px-2 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                {/* <span className="pl-2 border-l border-cbs-border"> */}
                Mô tả/ghi chú
                {/* </span> */}
              </th>
            </tr>
          </thead>
          <tbody className="text-small">
            {data.map(
              ({
                id,
                content,
                opening_balance,
                increased_balance,
                closing_balance,
                created_by,
                updated_by,
                created_at,
                updated_at,
              }) => {
                return (
                  <tr key={id} className="text-left hover:bg-cbs-active-comment cursor-pointer">
                    <td className="pt-2.5 pb-3 px-2 border-0.5 border-t-0 border-cbs-border text-center">
                      {created_at}
                    </td>
                    <td className="pt-2.5 pb-3 px-2 border-0.5 border-t-0 border-cbs-border text-left">
                      {content}
                    </td>
                    <td className="pb-3 px-2 border-0.5 border-t-0 border-cbs-border text-left">
                      <DropdownSearchable
                        id="ticket-creator"
                        placeholder="Hợp đồng"
                        initialValue={{
                          id: "quangtt",
                          text: "1111-Tiền mặt tại quỹ công ty",
                        }}
                        data={[
                          {
                            id: "quangtt",
                            text: "1111-Tiền mặt tại quỹ công ty",
                          },
                          {
                            id: 2,
                            text: "1111-Tiền mặt tại quỹ công ty",
                          },
                        ]}
                      />
                    </td>
                    <td className="pb-3 px-2 border-0.5 border-t-0 border-cbs-border text-left">
                      <DropdownSearchable
                        id="ticket-creator"
                        placeholder="Công ty"
                        initialValue={{
                          id: "quangtt",
                          text: "Công ty TNHH Hoàng Mai Xanh và Tím",
                        }}
                        data={[
                          {
                            id: "quangtt",
                            text: "Công ty TNHH Hoàng Mai Xanh và Tím",
                          },
                          {
                            id: 2,
                            text: "Công ty TNHH Hoàng Mai Xanh và Tím",
                          },
                        ]}
                      />
                    </td>
                    <td className="pb-3 px-2 border-0.5 border-t-0 border-cbs-border text-left">
                      <DropdownSearchable
                        id="ticket-creator"
                        placeholder="Công ty"
                        initialValue={{
                          id: "quangtt",
                          text: "Cung cấp dịch vụ tư vấn chất lượng nhân sự",
                        }}
                        data={[
                          {
                            id: "quangtt",
                            text: "Cung cấp dịch vụ tư vấn chất lượng nhân sự",
                          },
                          {
                            id: 2,
                            text: "Cung cấp dịch vụ tư vấn chất lượng nhân sự",
                          },
                        ]}
                      />
                    </td>
                    <td className="pt-2.5 pb-3 px-2 border-0.5 border-t-0 border-cbs-border text-right">
                      {parseInt(opening_balance).toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })}
                    </td>
                    <td className="pt-2.5 pb-3 px-2 border-0.5 border-t-0 border-cbs-border text-right">
                      {parseInt(increased_balance).toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })}
                    </td>
                    <td className="pt-2.5 pb-3 px-2 border-0.5 border-t-0 border-cbs-border text-right">
                      {parseInt(closing_balance).toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })}
                    </td>
                    <td className="pt-2.5 pb-3 px-2 border-0.5 border-t-0 border-cbs-border text-left">
                      Xây dựng mẫu BoQ cho công tác preliminaries
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
      <Paginate className="min-h-24 w-full border-t z-10 flex items-center justify-center py-2 bg-white" />
      <ModalReport open={visibleDrawer} onClose={setVisibleDrawer} />
      <ModalContainer isModalOpen={isShowDeleteModal} toggle={toggleVisible}>
        <div className="inline-flex flex-col text-black w-full max-w-lg my-8 overflow-hidden text-left transition-all transform bg-white">
          <div className="px-5 pt-5 pb-3.5 text-xl leading-6 font-bold">Bạn có muốn xóa không?</div>
          <p className="px-5 mb-7">
            Dữ liệu của bạn sẽ bị xóa vĩnh viễn và bạn không thể khôi phục lại dữ liệu này
          </p>
          <div className="text-right pt-6 pb-5 px-8 text-base leading-5">
            <button className="py-1.5 px-5 mr-2 uppercase" onClick={toggleDeleteModal}>
              Hủy
            </button>
            <button
              className="py-1.5 px-3 border border-primary bg-primary hover:bg-opacity-90 text-white rounded-md"
              onClick={toggleDeleteModal}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export default PageTwoDetail;
