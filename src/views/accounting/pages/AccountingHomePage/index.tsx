/*=====1.LIBRARY=====*/
import { FC, useState } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import { Link, useParams } from "react-router-dom";

/*=====2.CSS=====*/
import styles from "views/support/styles/support.module.css";

/*=====3.ICONS=====*/

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput } from "shareComponents/common";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useModal } from "services/hooks/useModal";
import { useFunda } from "services/hooks/items/useFunda";

export const AccountingHomePage: FC = () => {
  const [keyword, setKeyword] = useState('');
  const { parentID } = useParams<{ parentID: string }>();

  const {
    deleteAsync,
    list: listFundas,
    hasNextPage,
    refetch,
    fetchNextPage,
    totalRecord
  } = useFunda({
    params: { keyword, isListParentOfListChilds: "1", parentID }, // Khi keyword thay đổi giá trị => API thay đổi data => refretch kết quả
    isFetchList: true
  })

  const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  }, 500);

  return (
    <main className="relative h-full">
      <header className="sticky top-0 bg-primary-light z-10">
        <div className="h-[50px] border border-primary-border flex items-center justify-between px-5">
          <div className="flex items-center">
            <p className="text-lg ml-2">Đơn vị cơ sở</p>
            <SearchInput
              classNameWrapper="ml-4 mr-2"
              classNameInput="outline-none w-[296px]"
              onChange={onChangeSearch}
            />
          </div>

        </div>
      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-[38px] border-b border-primary-border">
          <tr className="text-left text-sm">
            <th className="w-1/6 py-1">
              <div className="border-r-2 border-gray-300 font-normal pl-4">
                Nội dung
              </div>
            </th>
            <th className={cn("py-1 font-normal", styles.theadTwelvePercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-4">
                Mã hiệu
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {listFundas.length ? listFundas.map((item: any) => (
            <tr key={item._id} className="border-b border-primary-border h-10 pl-4">

              <td className="py-1 px-2 pl-4">
                <Link to={`/accounting/${item._id}/accbill`}>
                  {<b>{item?.name}</b>}
                </Link>
              </td>
              <td className="py-1 px-2 pl-4">{item.sign}</td>
            </tr>
          )) : <></>}
        </tbody>
      </table>

      {hasNextPage && (
        <div className="w-full flex justify-center my-5">
          <button onClick={fetchNextPage}>
            <span className="text-primary">
              {`Xem thêm (${totalRecord - listFundas.length})`}
            </span>
          </button>
        </div>
      )}
    </main>
  )
}