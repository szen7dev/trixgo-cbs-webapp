import React, { FC, useRef, useState } from "react";
import moment from "moment";
import PaginateV2, { RefPaginateHandle } from "shareComponents/common/PaginateV2";
import { NavLink, useParams } from "react-router-dom";
import { convertCurrency } from "utils/converter";
import {
  useQueryListSalaryParent,
} from "services/hooks/useSalary";

const DATE_FORMAT = "DD/MM/YYYY HH:mm";
interface TimesheetHomePageProps {
  type?: number
}

const SalaryMineDetailPage: FC<TimesheetHomePageProps> = ({ type = 2 }) => {
  const params = useParams<{ id: string }>();
  console.log(params)
  const humanID = params["id"];
  const [keyword, setKeyword] = React.useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const ref = useRef<RefPaginateHandle>(null);

  const {
    dataNotFilter,
    refetch,
    limit,
    totalPages,
    totalRecord,
    fetchNextPage,
    fetchPrevPage,
    loading,
    hasNextPage,
  } = useQueryListSalaryParent({ 
    option: 1,
    sortOption: 1,
    populates: {
      path: 'parent',
      select: 'name date'
  },
   })

  // console.log(dataNotFilter)

  return (
    <div className={"financial-cashflow-listing paginate-wrapper relative"}>
      <div
        className={
          "financial-cashflow-listing-heading flex items-center border-b py-2 px-6"
        }
      >
        <div className={"flex items-center flex-1"}>
          <div className={"text-lg"}>Chi tiết lương của tôi</div>
        </div>
        <PaginateV2
          ref={ref}
          totalRecord={totalRecord}
          totalPages={totalPages}
          limit={limit}
          hasNextPage={hasNextPage}
          isFetching={loading}
          nextPageAction={() => {
            setPageIndex((oldState) => oldState + 1);
            fetchNextPage();
          }}
          prevPageAction={() => {
            setPageIndex((oldState) => oldState - 1);
            fetchPrevPage();
          }}
        />
      </div>

      <div className={"financial-planning-table mt-2"}>
          <div className={"relative table border-collapse w-full"}>
            <div className={"header table-row sticky z-10"}>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Nội dung
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Lương cứng
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Hệ số
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Lương lễ, phép
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Thưởng hiệu quả
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Thưởng thành tích
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Phụ cấp
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Trừ vi phạm
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Trừ bảo hiểm
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Trừ thuế TNCN
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Trừ công đoàn
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Trừ quỹ chia sẻ
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Trừ khác
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Đã tạm ứng
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Đã chi trả
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Còn lại phải trả
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Ghi chú
              </div>
          </div>
          {dataNotFilter[pageIndex] && dataNotFilter[pageIndex].map((item: any, index: any) => (
            <div className={"body-table table-row"} key={item._id}>
              <div
                className={
                  "px-1 py-2 table-cell box-border border-b align-middle"
                }
              >
                <p>{item?.parent?.name} | {moment(item?.parent?.date).format('DD/MM/YYYY')}</p>
                <p className={"mt-1 text-gray-500"}>
                  Tạo: {item?.userCreate?.fullname} {moment(item.createAt).format(DATE_FORMAT)}
                </p>
                <p className={"mt-1 text-gray-500"}>
                  Cập nhật: {item?.userUpdate?.fullname} {moment(item.modifyAt).format(DATE_FORMAT)}
                </p>
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b text-right"}>{convertCurrency(item.salary)}</div>
              <div className={"px-2 py-2 table-cell box-border border-b text-right"}>{Number(item.kpiFactor).toFixed(4)}</div>
              <div className={"px-2 py-2 table-cell box-border border-b text-right"}>{convertCurrency(item.onLeaveSalary)}</div>
              <div className={"px-2 py-2 table-cell box-border border-b text-right"}>{convertCurrency(item.revenueBonus)}</div>
              <div className={"px-2 py-2 table-cell box-border border-b text-right"}>{convertCurrency(item.reward)}</div>
              <div className={"px-2 py-2 table-cell box-border border-b text-right"}>{convertCurrency(item.mealAllowance)}</div>
              <div className={"px-2 py-2 table-cell box-border border-b text-right"}>{convertCurrency(item.punishment)}</div>
              <div className={"px-2 py-2 table-cell box-border border-b text-right"}>{convertCurrency(item.insurance)}</div>
              <div className={"px-2 py-2 table-cell box-border border-b text-right"}>{convertCurrency(item.pitax)}</div>
              <div className={"px-2 py-2 table-cell box-border border-b text-right"}>{convertCurrency(item.union)}</div>
              <div className={"px-2 py-2 table-cell box-border border-b text-right"}>{convertCurrency(item.share)}</div>
              <div className={"px-2 py-2 table-cell box-border border-b text-right"}>{convertCurrency(item.other)}</div>
              <div className={"px-2 py-2 table-cell box-border border-b text-right"}>{convertCurrency(item.advance)}</div>
              <div className={"px-2 py-2 table-cell box-border border-b text-right"}>{convertCurrency(item.paid)}</div>
              <div className={"px-2 py-2 table-cell box-border border-b text-right"}>{convertCurrency(item.remaining)}</div>
              <div className={"px-2 py-2 table-cell box-border border-b text-right"}>{item.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalaryMineDetailPage