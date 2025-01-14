import { FC, useEffect, useState, useCallback, ChangeEvent, useRef } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import moment from "moment";
import { toast } from "react-toastify";
import { read, utils } from 'xlsx';
import { useUser } from 'services/hooks/personal/useUser';
import { useAuth } from "services/hooks/auth/useAuth";
import { useUpload } from 'services/hooks/useUpload';
import CameraIcon from "assets/images/camera-icon.svg";
import PersonalLogo from "assets/images/personal-logo.svg";

/**
 * Components
 */
import { SearchInput, ModalContainer } from "shareComponents/common";
import { ModalCreateOrUpdateUser } from 'views/support/shareComponents/common';

import styles from "views/support/styles/support.module.css";
import pencilIcon from 'assets/images/icons8-pencil-96 1.png';

/**
 * Hooks
 */
import { useUserSystem } from 'services/hooks/users/useUserSystem';
import { UserSystemProps } from "typings/users/userSystem";

export const OwnerMemberPage: FC = () => {
  const currentUser = localStorage.getItem("currentUser") ?? "{}";
  const profile = JSON.parse(currentUser);
  const LIMIT_PER_PAGE_USER = 20;
  const [companySelected, setCompanySelected] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [keywordUser, setKeywordUser] = useState('');
  const [usersChecked, setUsersChecked] = useState<Array<UserSystemProps>>([]);
  const [initialValues, setInitialValues] = useState({
    companyID: companySelected,
    userID: "",
    fullname: "",
    email: "",
    phone: "",
    departmentID: "",
    positionID: "",
    level: 1,
    positionName: "",
    departmentName: "",
    startingTime: "",
    status: 1,
    storageUse: 0,
  });

  const [modalCreateOrUpdateUser, setModalCreateOrUpdateUser] = useState<boolean>(false);

  useEffect(() => {
    setCompanySelected(profile?.company?._id);
    setCompanyName(`${profile?.company?.name} - ${profile?.company?.sign}`);
  }, []);

  const {
    data: listUsersSystem,
    hasNextPage,
    totalRecord,
    refetch: refetchUser,
    fetchNextPage: fetchNextPageUser,
  } = useUserSystem({
    companyID: companySelected,
    keyword: keywordUser,
    limit: LIMIT_PER_PAGE_USER
  }, !!companySelected);

  const toggleModalCreateOrUpdateUser = () => setModalCreateOrUpdateUser(!modalCreateOrUpdateUser);

  const handleConfirmCreateOrUpdateUser = () => refetchUser();

  const onChangeSearchUser = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setKeywordUser(event.target.value);
  }, 500);

  const clearData = () => {
    setInitialValues(previousValue => ({
      ...previousValue,
      userID: "",
      fullname: "",
      email: "",
      phone: "",
      departmentID: "",
      positionID: "",
      level: -1,
      positionName: "",
      departmentName: "",
      startingTime: "",
      status: 1,
      storageUse: 0,
    }))
  }

  const onClickCheckButton = (user: UserSystemProps) => {
    const check = usersChecked.find(item => item._id === user._id);
    let newListIDChecked = [];

    if (check) {
      newListIDChecked = usersChecked.filter(item => item._id !== user._id)
      setUsersChecked(newListIDChecked);
    } else {
      newListIDChecked = [...usersChecked, user];
      setUsersChecked(newListIDChecked);
    };

    if (newListIDChecked.length === 1) {
      const { _id, fullname, email, phone, department, position, level, status, storageUse, startingTime } = newListIDChecked[0];
      setInitialValues({
        userID: _id,
        companyID: companySelected,
        fullname: fullname,
        email: email ? `${email}` : "",
        phone: phone ? `${phone}` : "",
        startingTime: startingTime ? `${startingTime}` : "",
        departmentID: department?._id,
        positionID: position?._id,
        level: Number(level),
        positionName: position?.name,
        departmentName: department?.name,
        status,
        storageUse: Number(storageUse)
      });
    } else {
      clearData();
    }
  };

  const getStateChecked = useCallback((id: string) => {
    const user = usersChecked.find(item => item._id === id);
    return user ? true : false;
  }, [usersChecked]);

  const getStateCheckedAll = useCallback(() => {
    return usersChecked.length == listUsersSystem.length;
  }, [usersChecked]);

  const onClickCheckAll = () => {
    if (usersChecked.length == listUsersSystem.length) {
      setUsersChecked([]);
    } else {
      setUsersChecked(listUsersSystem);
    }
  };

  useEffect(() => {
    companySelected && setInitialValues(previousValue => ({ ...previousValue, companyID: companySelected }));
  }, [companySelected]);

  //_____Import, export excel
  const [dataImport, setDataImport] = useState([]);
  const { importUserSystemAsync } = useUserSystem({});

  const handleImport = ($event: any) => {
      const files = $event.target.files;
      if (files.length) {
          const file = files[0];
          const reader = new FileReader();
          reader.onload = (event: any) => {
              const wb = read(event.target.result);
              const sheets = wb.SheetNames;

              if (sheets.length) {
                  const rows: any = utils.sheet_to_json(wb.Sheets[sheets[0]]); // Index=1 (tức Sheet số 2 từ trái sang)
                  
                  // Set data để Import
                  setDataImport(rows)
              }
          }
          
          reader.readAsArrayBuffer(file);
      }

      // Đọc xong thì xóa value trong Input đi
      $event.target.value = null;
  }

  // Gọi tới API để đẩy data lên
    useEffect(() => {
        if(dataImport.length){
            const fetchData = async () => {
                const data = await importUserSystemAsync({ dataImport: JSON.stringify(dataImport) });
                setDataImport([]);
                // console.log(dataImport)

                if(!data.error){
                    return toast.success("Import thành công");
                }
                return toast.error(data.message);
            }
            fetchData();
        }
    }, [dataImport])

    const { addFileToUpload } = useUpload({
      typeUpload: 'user'
    });

    const { updateUser } = useUser();

    const handleChangeAvatar = async (event: ChangeEvent<HTMLInputElement>, param: any) => {
      const files = event.target.files;
      if(!files || !files.length) return toast.warning("Vui lòng chọn ảnh đại diện");
  
      const { name } = await addFileToUpload({
        files: files[0] as any,
        fileType: 1,
        useCompress: true
      })

      if(name){
        updateUser({ image: name, userID: param })
        refetchUser()
      }
    }

  return (
    <main className="relative h-full">
      <header className="sticky top-0 bg-primary-light z-10">
        <div className="h-10 border border-primary-border flex items-center justify-between px-5">
          <p className="text-lg">
            {companyName}
          </p>
        </div>
        <div className="h-[50px] border border-primary-border flex items-center justify-between px-5">
          <div className="flex items-center">
            <p className="text-lg">Danh sách tài khoản</p>
            <SearchInput
              classNameWrapper="ml-4 mr-2"
              classNameInput="outline-none w-[296px]"
              onChange={onChangeSearchUser}
            />

            <button className={"flex items-center justify-center mx-3 ml-3"}>
                <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required hidden onChange={handleImport}
                accept=".xlsx, .xlsm, .xls, .csv"/>
                <label className="custom-file-label" htmlFor="inputGroupFile">Import excel tạo tài khoản</label>
            </button>

            {usersChecked.length === 1 ? (
              <button
                className="mr-3"
                onClick={() => {
                  setUsersChecked([]);
                  toggleModalCreateOrUpdateUser();
                }}
              >
                <img src={pencilIcon} alt="icon pencil" />
              </button>
            ) : ''}

          </div>
          <div className="flex items-center">
            {companySelected ? (
              <button
                className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold"
                onClick={() => {
                  setUsersChecked([]);
                  clearData();
                  toggleModalCreateOrUpdateUser();
                }}
              >
                Tạo mới
              </button>
            ) : ''}
          </div>
        </div>
      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-[38px] border-b border-primary-border">
          <tr className="text-left text-sm">
            <th className={cn("py-1 text-center", styles.theadInput)}>
              <div className="border-r-2 border-gray-300 flex items-center justify-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultChecked={getStateCheckedAll()}
                  onClick={onClickCheckAll}
                />
              </div>
            </th>
            <th style={{width: "5%"}}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Ảnh đại diện
              </div>
            </th>
            <th className="w-1/6 py-1">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Họ và tên
              </div>
            </th>
            <th className={cn("py-1 font-normal", styles.theadTwelvePercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Email/Phone
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
            <th className={cn("py-1 font-normal", styles.theadTwelvePercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Giờ bắt đầu làm việc
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
          {listUsersSystem.length ? listUsersSystem.map(item => (
            <tr key={item._id} className="border-b border-primary-border h-10">
              <td className="py-1 px-2 text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={getStateChecked(item._id)}
                  onChange={() => onClickCheckButton(item)}
                />
              </td>
              <td className="py-1 px-2">
                <img
                  src={`${process.env.REACT_APP_URL_S3_USER}/${item?.image}`}
                  alt="User Avatar"
                  className="w-14 h-14 rounded-full"
                />
              <div className="bg-primary-light relative bottom-10 left-8 h-9 w-9 rounded-full flex items-center justify-center">
                <label>
                  <div className="w-[30px] h-[30px] bg-secondary-gray rounded-full flex items-center justify-center">
                    <img
											src={CameraIcon}
											alt="Camera"
											className="w-[15px] h-[13px]"
											/>
											<input type="file" name="files" id="file" className="hidden" accept="image/*" onChange={(event)=>handleChangeAvatar(event, item._id)} />
                  </div>
                </label>
              </div>
              </td>
              <td className="py-1 px-2">
                {item.fullname}
                <p className="text-primary-gray text-[12px]"><i>{item._id}</i></p>
                <p className="text-primary-gray text-[12px]"><i>Tạo: {moment(item?.createAt).format('DD/MM/YYYY HH:mm')}</i></p>
              </td>
              <td className="py-1 px-2">
                {item.email}
                <p>{item?.phone}</p>
              </td>
              <td className="py-1 px-2">{item.department?.name}</td>
              <td className="py-1 px-2">{item.position?.name}</td>
              <td className="py-1 px-2">
                {item.startingTime ? moment(item.startingTime).format('HH:mm') : ''}
              </td>
              <td className={cn('py-1 px-2', item.level === 0 ? 'text-primary' : '')}>
                {item.level === 0 ? 'Admin' : 'Member'}
              </td>
              <td className="py-1 px-2">
                {item.lastLog ? moment(item.lastLog).format('DD/MM/YYYY - HH:mm') : ''}
              </td>
              <td className={cn('py-1 px-2', item.status === 1 ? 'text-primary' : '')}>
                {item.status === 1 ? 'Đang hoạt động' : 'Đã tạm khóa'}
              </td>
            </tr>
          )) : <></>}
        </tbody>
      </table>

      <ModalContainer isModalOpen={modalCreateOrUpdateUser} toggle={toggleModalCreateOrUpdateUser}>
        <div className="inline-flex flex-col text-black w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl">
          <ModalCreateOrUpdateUser
            modalType={initialValues.userID ? 'update' : 'create'}
            show={modalCreateOrUpdateUser}
            initialValues={initialValues}
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
  )
}