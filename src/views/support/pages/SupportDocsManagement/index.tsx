import React, { FC, useState, useCallback } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import { useModal } from "services/hooks/useModal";
import { SearchInput } from "shareComponents/common";
import { ModalCreateMember, ModalConfirm } from "views/support/shareComponents/common";
import { useAppUser } from 'services/hooks/apps/useAppUser';

import ThreeDotVerticalIcon from "assets/images/icon-3dots-vertical-gray.svg";
import DeleteIcon from "assets/images/icons8-remove.svg";
import MemberIcon from "assets/images/member-icon.svg";

import styles from "views/support/styles/support.module.css";

export const SupportDocsManagementPage: FC = () => {
  const LIMIT_PER_PAGE_USER_APP = 20;

  const { appID, companyID, appName } = useParams<{ appID: string, companyID: string, appName: string }>();
  const [idsChecked, setIdsChecked] = useState<Array<string>>([]);
  const { openModal, closeModal } = useModal();

  const { 
    data: listUsersApp, 
    fetchNextPage,
    totalRecord,
    hasNextPage,
    refetch,
    updateMemberAppUserAsync,
    deleteMemberAppUserAsync
  } = useAppUser({
    appID, 
    companyID, 
    limit: LIMIT_PER_PAGE_USER_APP, 
    keyword: ''
  });

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

  const getStateChecked = useCallback((id: string) => {
		return idsChecked.includes(id) ? true : false;
	}, [idsChecked]);

  const getStateCheckedAll = useCallback(() => {
		return idsChecked.length == listUsersApp.length;
	}, [idsChecked]);

	const onClickCheckAll = () => {
		if (idsChecked.length == listUsersApp.length) {
			setIdsChecked([]);
		} else {
			const idsAll = listUsersApp.map((e: any) => e._id);
			setIdsChecked(idsAll);
		}
	};

  const onChangeLevel = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const [memberID, level] = event.target.value.split('__');
    if(!memberID || !level) return;

    const result = await updateMemberAppUserAsync({
      appID,
      companyID,
      memberID,
      level: +level
    });

    if(result.error) {
        return toast.error(result?.message);
    }
  }

  const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    toast.warn('Tính năng đang phát triển')
    // const keyword = event.target.value;
    // setParams(previousValue => ({ ...previousValue, keyword }));
  }, 500);

  const handleConfirmDelete = async (ids: string[]) => {
    const result = await deleteMemberAppUserAsync(ids);

    if(result.error) {
        return toast.error(result?.data?.message);
    }

    closeModal();
    refetch();
    setIdsChecked([]);
    toast.success('Xoá dữ liệu thành công');
  }

  return (
    <main className="relative h-full">
      <header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-12 px-6 border border-primary-border">
        <div className="flex items-center">
          <p className="text-lg">{appName}</p>
          <SearchInput
            classNameWrapper="ml-4"
            classNameInput="outline-none w-[296px]"
            onChange={onChangeSearch}
          />
          {idsChecked.length ? (
            <button
              onClick={() =>
                openModal(
                  <div
                    className={
                      "inline-block w-[521px] h-[185px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
                    }
                  >
                    <ModalConfirm  onConfirm={() => handleConfirmDelete(idsChecked)} />
                  </div>
                )
              }>
              <img src={DeleteIcon} alt="Delete" />
            </button>
          ) : ''}
        </div>
        <div className="flex items-center">
          <button
            className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold"
            onClick={() =>
              openModal(
                <div
                  className={
                    "inline-block w-[600px] h-[630px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded-lg"
                  }
                >
                  <ModalCreateMember appID={appID} companyID={companyID} />
                </div>
              )
            }
          >
            Tạo mới
          </button>
          <div className="w-10 h-10 bg-secondary-light rounded-full flex items-center justify-center ml-5 cursor-pointer">
            <img src={ThreeDotVerticalIcon} alt="Three Dot" />
          </div>
        </div>
      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-10 border-b border-primary-border">
          <tr className="text-left text-sm">
            <th className={cn("py-1 text-center", styles.theadInput)}>
              <div className="border-r-2 border-gray-300 flex items-center justify-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={getStateCheckedAll()}
                  onChange={onClickCheckAll}
                />
              </div>
            </th>
            <th className="w-1/5 py-1">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Tài khoản
              </div>
            </th>
            <th className="w-1/6 py-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Email
              </div>
            </th>
            <th className="w-1/6 py-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Admin
              </div>
            </th>
            <th className="w-1/6 py-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Member
              </div>
            </th>
            <th className="w-1/6 py-1 font-normal">
              <div className="font-normal pl-2">Xóa bỏ</div>
            </th>
          </tr>
        </thead>

        <tbody>
          {listUsersApp.length ? listUsersApp.map(appUser => (
            <tr key={appUser._id} className="border-b border-primary-border h-10">
              <td className="p-2 text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={getStateChecked(appUser._id)}
                  onChange={() => onClickCheckButton(appUser._id)}
                />
              </td>
              <td className="py-1 px-2 flex items-center">
                <img
                  src={appUser.user?.image ? `${process.env.REACT_APP_URL_S3_USER}/${appUser.user?.image}` : MemberIcon}
                  alt="Member"
                  className="rounded-full mr-2 w-[40px] h-[40px] object-cover"
                />
                <p>{appUser.user?.bizfullname}</p>
              </td>
              <td className="p-2">{appUser.user?.email}</td>
              <td className="p-2">
                <input 
                  type="radio" 
                  name={`userAppLevel_${appUser._id}`} 
                  value={`${appUser.user?._id}__0`}
                  defaultChecked={appUser.level === 0}
                  onChange={onChangeLevel}
                />
              </td>
              <td className="p-2">
                <input 
                  type="radio" 
                  name={`userAppLevel_${appUser._id}`} 
                  value={`${appUser.user?._id}__1`}
                  defaultChecked={appUser.level === 1}
                  onChange={onChangeLevel}
                />
              </td>
              <td className="p-2 text-negative">
                <button
                  onClick={() =>
                    openModal(
                      <div
                        className={
                          "inline-block w-[521px] h-[185px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
                        }
                      >
                        <ModalConfirm  onConfirm={() => handleConfirmDelete([appUser._id])} />
                      </div>
                    )
                  }>
                  Xoá bỏ
                </button>
              </td>
            </tr>
          )) : <></>}
        </tbody>
      </table>

      {hasNextPage && (
				<div className="w-full flex justify-center my-5">
					<button onClick={fetchNextPage}>
						<span className="text-primary">
              {`Xem thêm (${totalRecord - listUsersApp.length})`}
            </span>
					</button>
				</div>
			)}

      {/* <Paginate
        totalPages={totalPages}
        totalRecord={totalRecord}
        hasNextPage={hasNextPage}
        prevPageAction={fetchPreviousPage}
        nextPageAction={fetchNextPage} /> */}
    </main>
  );
};