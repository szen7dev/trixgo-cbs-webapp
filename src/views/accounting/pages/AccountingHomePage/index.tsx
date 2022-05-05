/*=====1.LIBRARY=====*/
import { FC, useState, useCallback } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import moment from "moment";
import { toast } from "react-toastify";
import { Link, useParams, useHistory } from "react-router-dom";

/*=====2.CSS=====*/
import styles from "views/support/styles/support.module.css";

/*=====3.ICONS=====*/
import DeleteIcon from "assets/images/icons8-remove.svg";
import iconPencil from 'assets/images/icons8-pencil-96 1.png';

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput } from "shareComponents/common";

/*=====5.TYPINGS=====*/
import { Funda } from "typings/items";

/*=====6.HOOKS/APIS=====*/
import { useModal } from "services/hooks/useModal";
import { useFunda } from "services/hooks/items/useFunda";

export const AccountingHomePage: FC = () => {
  const history = useHistory();
  const { closeModal, openModal } = useModal();
  const [keyword, setKeyword] = useState('');
  const { parentID } = useParams<{ parentID: string }>();

  const [itemsChecked, setItemsChecked] = useState<Array<Funda.Funda>>([]);
  const [initialValues, setInitialValues] = useState({
    fundaID: '',
    name: '',
    description: '',
  });

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
  });

  // Reset form
  const clearData = () => {
    setInitialValues(previousValue => ({
      ...previousValue,
      fundaID: '',
      name: '',
      description: '',
    }))
  }

  // Gọi lại API refetch lại danh sách sau khi tạo/update thành công
  const handleConfirmCreateOrUpdate = () => refetch();

  // Xử lý sự kiện tìm kiếm
  const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  }, 500);

  // Làm việc với update mẩu tin  
  const onClickCheckButton = (doc: Funda.Funda) => {
    const check = itemsChecked.find(item => item._id === doc._id);
    let newListIDChecked = [];

    if (check) {
      newListIDChecked = itemsChecked.filter(item => item._id !== doc._id)
      setItemsChecked(newListIDChecked);
    } else {
      newListIDChecked = [...itemsChecked, doc];
      setItemsChecked(newListIDChecked);
    };

    if (newListIDChecked.length === 1) {
      const { _id, name, description } = newListIDChecked[0];
      setInitialValues({
        fundaID: _id,
        name,
        description: description || '',
      });
    } else {
      clearData();
    }
  };

  // Check chọn 1 hoặc nhiều mẩu tin
  const getStateChecked = useCallback((id: string) => {
    const user = itemsChecked.find(item => item._id === id);
    return user ? true : false;
  }, [itemsChecked]);

  const getStateCheckedAll = useCallback(() => {
    return itemsChecked.length == listFundas.length;
  }, [itemsChecked]);

  const onClickCheckAll = () => {
    if (itemsChecked.length == listFundas.length) {
      setItemsChecked([]);
    } else {
      setItemsChecked(listFundas);
    }
  };

  // Xóa 1 hoặc nhiều mẩu tin
  const handleConfirmDelete = async () => {
    try {
      const ids = itemsChecked.map(item => item._id);
      const { error, data } = await deleteAsync(ids);

      if (error) {
        return toast.warn(data?.message);
      }

      toast.success('Xoá dữ liệu thành công', { autoClose: 1500 });
      closeModal();
      clearData();
      refetch();
      setItemsChecked([]);
    } catch (error) {
      if (typeof error === "string") {
        toast.error(error);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

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
            {/* Nếu chọn 1 phẩn tử => chỉ cho update */}

            {/* Xóa 1 hoặc nhiều */}

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
  );
};

// export default ItemFundaPage;
