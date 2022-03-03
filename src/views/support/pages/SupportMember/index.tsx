import { UIEvent, FC, useState, useCallback } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import moment from "moment";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

/**
 * Components
 */
import { DropdownSearchable, SearchInput, ModalContainer } from "shareComponents/common";
import { ModalConfirm } from "views/support/shareComponents/common";
import { ModalCreateOrUpdateUser } from 'views/support/shareComponents/common';

// import FinancialCashFlowFilterButton from "views/pages/financial/planning/components/FinancialCashFlow/FinancialCashFlowFilterButton";
// import ActionGroupFinancial from "views/pages/financial/planning/components/FinancialCashFlow/ActionGroupFinancial";

/**
 * Assets
 */
import PolygonIcon from "assets/images/icon-polygon.svg";
import ThreeDotVerticalIcon from "assets/images/icon-3dots-vertical-gray.svg";
import styles from "views/support/styles/support.module.css";
import DeleteIcon from "assets/images/icons8-remove.svg";
import iconPencil from 'assets/images/icons8-pencil-96 1.png';

/**
 * Hooks
 */
import { useModal } from "services/hooks/useModal";
import { useUserSystem } from 'services/hooks/users/useUserSystem';
import { useQueryListCompany } from 'services/hooks/useCompanies';
import { UserSystemRepository } from 'apis/users';

export const SupportMemberPage: FC = () => {
  const { closeModal, openModal } = useModal();
  const LIMIT_PER_PAGE_USER = 20;
  const [companySelected, setCompanySelected] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [keywordCompany, setKeywordCompany] = useState('');
  const [keywordUser, setKeywordUser] = useState('');
  const [idsChecked, setIdsChecked] = useState<Array<string>>([]);

  const [modalCreateOrUpdateUser, setModalCreateOrUpdateUser] = useState<boolean>(false);
  const [userID, setUserID] = useState('');

  const { data } = useQuery(`info_user.${userID}`,
		() => UserSystemRepository.infoUsersSystem(userID),
		{
			enabled: !!userID,
			refetchOnWindowFocus: false
		});

	const infoUser = data?.data;

  const { 
    data: listUsersSystem, 
    hasNextPage, 
    totalRecord, 
    refetch: refetchUser,
    fetchNextPage: fetchNextPageUser,
    deleteUserSystemAsync,
  } = useUserSystem({
    companyID: companySelected,
    keyword: keywordUser,
    isFetch: !!companySelected,
    limit: LIMIT_PER_PAGE_USER
  });

  const { data: listCompanies, fetchNextPage: fetchNextPageCompany } = useQueryListCompany({ 
    keyword: keywordCompany 
  });

  const handleChangeCompany = (value: any) => {
    setCompanyName(`${value.name} - ${value.sign}`);
    setCompanySelected(value._id);
  }

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const isBottom = scrollHeight - scrollTop === clientHeight;
    isBottom && fetchNextPageCompany();
  }

  const toggleModalCreateOrUpdateUser = () => setModalCreateOrUpdateUser(!modalCreateOrUpdateUser);

  const handleConfirmCreateOrUpdateUser = () => refetchUser();

  const handleSearchCompany = debounce((value) => setKeywordCompany(value), 500);

  const onChangeSearchUser = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setKeywordUser(event.target.value);
  }, 500);

  const onClickCheckButton = (userID: string) => {
		const check = idsChecked.includes(userID);
		if (check) {
			const newList = [...idsChecked];
			newList.splice(newList.findIndex((e: any) => e == userID), 1);
			setIdsChecked(newList);
		} else {
			const newList = [...idsChecked, userID];
			setIdsChecked(newList);
		};
	};

  const getStateChecked = useCallback((id: string) => {
		return idsChecked.includes(id) ? true : false;
	}, [idsChecked]);

  const getStateCheckedAll = useCallback(() => {
		return idsChecked.length == listUsersSystem.length;
	}, [idsChecked]);

	const onClickCheckAll = () => {
		if (idsChecked.length == listUsersSystem.length) {
			setIdsChecked([]);
		} else {
			const idsAll = listUsersSystem.map((e: any) => e._id);
			setIdsChecked(idsAll);
		}
	};

  const handleConfirmDelete = async (ids: string[]) => {
    const result = await deleteUserSystemAsync(ids);

    if(result.error) {
        return toast.error(result?.data?.message);
    }

    toast.success('Xoá dữ liệu thành công');
    closeModal();
    setIdsChecked([]);
    refetchUser();
  }

  return (
    <main className="relative h-full">
      <header className="sticky top-0 bg-primary-light z-10">
        <div className="h-10 border border-primary-border flex items-center justify-between px-5">
          <p className="text-lg">
            {companyName}
          </p>

          <DropdownSearchable
            placeholder="Chọn phân vùng để thực hiện"
            className="w-[322px] pl-0 bg-cbs-table-header"
            classNameInput="h-[28px] bg-cbs-table-header"
            isMultiple={false}
            allowClearValueSingleInput={false}
            showTriangle={true}
            maxWidthInput="max-w-none"
            renderSelectedItem={(item) => <span>{item.text}</span>}
            classNameItem="p-0"
            data={listCompanies}
            formatItem={{
              id: "_id",
              text: "name",
            }}
            inlineSearch={false}
            disableSearch={false}
            searchInputClassName="h-[40px] w-[322px] px-[46px]"
            onScroll={handleScroll}
            onchangeValue={handleChangeCompany}
            onSearchInputChange={handleSearchCompany}
          />
        </div>
        <div className="h-[50px] border border-primary-border flex items-center justify-between px-5">
          <div className="flex items-center">
            <p className="text-lg">Danh sách tài khoản</p>
            <SearchInput
              classNameWrapper="ml-4 mr-2"
              classNameInput="outline-none w-[296px]"
              onChange={onChangeSearchUser}
            />

            {idsChecked.length === 1 ? (
              <button 
                className="mr-3" 
                onClick={() => {
                  toast.info('Tính năng đang bị bug, vui lòng quay lại sau');
                  // toggleModalCreateOrUpdateUser();
                  // setUserID(idsChecked[0]);
                }}
              >
                <img src={iconPencil} alt="icon pencil" />
              </button>
            ) : ''}

            {idsChecked.length ? (
              <button
                onClick={() =>
                  openModal(
                    <div
                      className={
                        "inline-block w-[521px] h-[185px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
                      }
                    >
                      <ModalConfirm onConfirm={() => handleConfirmDelete(idsChecked)} />
                    </div>
                  )
                }>
                <img src={DeleteIcon} alt="Delete" />
              </button>
            ) : ''}

            {/* <FinancialCashFlowFilterButton />
            {itemChecked && (
              <div className="border-l-2 border-primary-border ml-5 pl-5">
                <ActionGroupFinancial />
              </div>
            )} */}
          </div>
          <div className="flex items-center">
            {companySelected ? (
              <button 
                className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold" 
                onClick={() => {
                  toggleModalCreateOrUpdateUser();
                  setUserID("");
                }} 
              >
                Tạo mới
              </button>
            ) : ''}
            <div className="w-10 h-10 bg-secondary-light rounded-full flex items-center justify-center ml-5 cursor-pointer">
              <img src={ThreeDotVerticalIcon} alt="Three Dot" />
            </div>
          </div>
        </div>
      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-[38px] border-b border-primary-border">
          <tr className="text-left text-sm">
            <th className={cn("py-1 text-center", styles.theadInput)}>
              <div className="border-r-2 border-gray-300 flex items-center justify-center">
                <input
                  className="form-check-input mr-2"
                  type="checkbox"
                  defaultChecked={getStateCheckedAll()}
                  onClick={onClickCheckAll}
                />
                <img src={PolygonIcon} alt="Polygon" />
              </div>
            </th>
            <th className="w-1/6 py-1">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Họ và tên
              </div>
            </th>
            <th className={cn("py-1 font-normal", styles.theadTwelvePercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Email
              </div>
            </th>
            <th className="w-1/12 py-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Phòng ban
              </div>
            </th>
            <th className={cn("py-1 font-normal", styles.theadTwelvePercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Chức danh
              </div>
            </th>
            <th className={cn("py-1 font-normal", styles.theadSignDate)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Quyền
              </div>
            </th>
            <th className="w-1/12 py-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Đăng nhập lần cuối
              </div>
            </th>
            <th className="w-1/12 py-1 font-normal">
              <div className="font-normal pl-2">Tình trạng</div>
            </th>
          </tr>
        </thead>

        <tbody>
          {listUsersSystem.length ? listUsersSystem.map(user => (
            <tr key={user._id} className="border-b border-primary-border h-10">
              <td className="py-1 px-2 text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  style={{ marginLeft: "-23px" }}
                  checked={getStateChecked(user._id)}
                  onChange={() => onClickCheckButton(user._id)}
                />
              </td>
              <td className="py-1 px-2">{user.fullname}</td>
              <td className="py-1 px-2">{user.email}</td>
              <td className="py-1 px-2">{user.department?.name}</td>
              <td className="py-1 px-2">{user.position?.name}</td>
              <td className={cn('py-1 px-2', user.level === 0 ? 'text-primary' : '')}>
                {user.level === 0 ? 'Admin' : 'Member'}
              </td>
              <td className="py-1 px-2">
                {user.lastLog ? moment(user.lastLog).format('DD/MM/YYYY - HH:mm') : ''}
              </td>
              <td className={cn('py-1 px-2', user.status === 1 ? 'text-primary' : '')}>
                {user.status === 1 ? 'Đang hoạt động' : 'Đã tạm khóa'}
              </td>
            </tr>
          )) : <></>}
        </tbody>
      </table>

      <ModalContainer isModalOpen={modalCreateOrUpdateUser} toggle={toggleModalCreateOrUpdateUser}>
        <div className="inline-flex flex-col text-black w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl">
          <ModalCreateOrUpdateUser
            modalType={userID ? 'update' : 'create'}
            show={modalCreateOrUpdateUser}
            initialValues={
              {
                userID: infoUser?._id,
                fullname: infoUser?.fullname,
                email: infoUser?.email,
                companyID: companySelected,
                departmentID: infoUser?.department,
                positionID: infoUser?.position,
                level: infoUser?.level,
              }
            }
            toggle={toggleModalCreateOrUpdateUser}
            onConfirm={handleConfirmCreateOrUpdateUser}
          />
        </div>
      </ModalContainer>

      {hasNextPage && (
				<div className="w-full flex justify-center my-5">
					<button onClick={fetchNextPageUser}>
						<span className="text-primary">
              {`Xem thêm (${totalRecord - listUsersSystem.length})`}
            </span>
					</button>
				</div>
			)}
    </main>
  );
};