import { FC, useState, useCallback } from "react";

import { useModal } from "services/hooks/useModal";

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import SearchIcon from "assets/images/icons8-search.svg";
import PolygonIcon from "assets/images/icon-polygon.svg";
import MemberIcon from "assets/images/member-icon.svg";
import { useGetUsersByCompany } from "services/hooks/auth/useAdmin";
import { useAppUser } from 'services/hooks/apps/useAppUser';
import debounce from "lodash/debounce";
import { toast } from "react-toastify";

type Props = {
  appID: string,
  companyID: string,
  onlyUserCompany?: boolean;
}

export const ModalCreateMember: FC<Props> = ({ appID, companyID, onlyUserCompany }) => {
  const LIMIT_PER_USER_APP = 20;
  const { closeModal } = useModal();
  const [keyword, setKeyword] = useState("");
  const { listMembers, nextPageGetUsersBySystem, hasnextPageGetUsersBySystem, totalRecord } = useGetUsersByCompany(onlyUserCompany ? "" : companyID, keyword);
  const { addMemberToAppUserAsync, refetch } = useAppUser({ appID, companyID, limit: LIMIT_PER_USER_APP });

  const [idsChecked, setIdsChecked] = useState<Array<string>>([]);
  const getStateChecked = useCallback((id: string) => {
		return idsChecked.includes(id) ? true : false;
	}, [idsChecked]);

	const onClickCheckButton = (id: string) => {
		const check = idsChecked.includes(id);
		if (check) {
			const newList = [...idsChecked];
			newList.splice(newList.findIndex((e: any) => e == id), 1);
			setIdsChecked(newList);
		} else {
			const newList = [...idsChecked];
			newList.push(id);
			setIdsChecked(newList);
		};
	};

	const getStateCheckedAll = useCallback(() => {
		return idsChecked.length == listMembers.length;
	}, [idsChecked]);

	const onClickCheckAll = () => {
		if (idsChecked.length == listMembers.length) {
			setIdsChecked([]);
		} else {
			const idsAll = listMembers.map((e: any) => e._id);
			setIdsChecked(idsAll);
		}
	};

  const handleConfirmAddMember = async () => {
    if (!idsChecked || !idsChecked.length) return;

    const result = await addMemberToAppUserAsync({
      appID, companyID, users: idsChecked
    });

    if(result.error) {
      return toast.error(result?.data?.message);
    }

    refetch();
    setIdsChecked([]);
    closeModal();
    toast.success('Thêm thành viên thành công');
  };

  return (
    <main className="py-[18px]">
      <header className="flex item-center justify-between px-[30px]">
        <p className="text-xl">Thêm thành viên</p>
        <div
          className="w-10 h-10 rounded-full bg-cbs-gray flex items-center justify-center cursor-pointer"
          onClick={closeModal}
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
            onChange={debounce(
              (event: any) => setKeyword(event.target.value),
              500
            )}
          />
          <img
            src={SearchIcon}
            alt="Search"
            className="w-4 h-4 absolute top-3 left-2"
          />
        </div>

        <div className="flex items-center mt-4">
          <input
            className="form-check-input mr-2"
            type="checkbox"
            id="flexCheckDefault"
            checked={getStateCheckedAll()}
						onChange={onClickCheckAll}
          />
          <img src={PolygonIcon} alt="Polygon" />
        </div>
        <div className="flex flex-col gap-2 mt-4 h-[420px] overflow-auto">
          {listMembers.map((item: any, index: number) => (
            <div key={index} className="flex items-center">
              <input
                className="form-check-input mr-9"
                type="checkbox"
                checked={getStateChecked(item._id)}
                onChange={() => onClickCheckButton(item._id)}
              />

              <div className="flex items-center">
                <img
                  src={item.image ? `${process.env.REACT_APP_URL_S3_USER}/${item.image}` : MemberIcon}
                  alt="Member"
                  className="w-10 h-10 rounded-full"
                />
                <p className="px-4">{item.bizfullname}</p>
              </div>
            </div>
          ))
          }
          {hasnextPageGetUsersBySystem && (
            <div className="w-full flex justify-center my-5">
              <button onClick={nextPageGetUsersBySystem}>
                <span className="text-primary">{`Xem thêm (${totalRecord - listMembers.length
                  })`}</span>
              </button>
            </div>
          )}
        </div>
      </section>

      <footer className="pb-6 w-full text-right px-[30px]">
        <button className="w-[95px] h-8 bg-primary text-primary-light rounded font-bold hover:opacity-90"
          onClick={handleConfirmAddMember}>
          Xác nhận
        </button>
      </footer>
    </main>
  );
};