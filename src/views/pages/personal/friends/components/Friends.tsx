import { FC, useEffect, useState } from "react";

import cn from "classnames";
import moment from 'moment'
import Paginate from "components/common/Paginate";
import SearchInput from "components/common/SearchInput";
import FinancialCashFlowFilterButton from "views/pages/financial/planning/components/FinancialCashFlow/FinancialCashFlowFilterButton";
import { AddFriendPayLoad, UnFriendPayLoad } from 'typings/user';
import styles from "../../style.module.css";

import PolygonIcon from "assets/images/icon-polygon.svg";
import Vertical3Dots from "assets/images/icon-3dots-vertical-gray.svg";
import MemberIcon from "assets/images/member-icon.svg";
import CopyIcon from "assets/images/icons8-copy-96.svg";
import { useUser } from 'services/hooks/useUser';
import { useAuth } from 'services/hooks/useAuth';

const Friends: FC = () => {
  const [code, setCode] = useState(null)
  const [codeSearch, setCodeSearch] = useState('')
  const [pageParam, setPageParam] = useState('')
  const [prevCursor, setPrevCursor] = useState(['']);
  const params = {limit: 10, select: 'fullname email phone birthDay', populates: '{"path": "company", "select": "name"}', lastestID: pageParam}
  const { listFriends, totalRecord, totalPage, nextCursor, refetchListFriends } = useUser(pageParam, params);
  const [friend, setFriend] = useState<any>(null)
  const [isFriend, setIsFriend] = useState(false)

  const { user } = useAuth();
  const { getCodeUser, checkCodeUser, requestAddFriend, requestUnFriend} = useUser();
  const getCode = async () => {
    const data = await getCodeUser()
    if(data?.code) {
      setCode(data.code)
    }
  }
  const checkCode = async () => {
    const data = await checkCodeUser({code: codeSearch});
    if(data?.user) {
      setFriend(data.user)
      const myFriends = data.user.friends
      if(user && myFriends.includes(user._id)) {
        setIsFriend(true)
      }
    }
  }

  const addFriend = async (values: AddFriendPayLoad) => {
    await requestAddFriend(values);
  }

  const unFriend = async (values: any) => {
    await requestUnFriend(values);
    refetchListFriends()
  }

  useEffect(() => {
    if(codeSearch === '') {
      setFriend(null)
    }
  },[codeSearch])

  useEffect(() => {
    if (!nextCursor) {
      return;
    }
    const isExist = prevCursor.find(item => item === nextCursor)
    if (!isExist) {
      setPrevCursor([...prevCursor, nextCursor])
    }
  }, [nextCursor]);

  const prevPageAction = () => {
    if (!nextCursor) {
      setPageParam(prevCursor[prevCursor.length - 2] || '')
    } else {
      const prev = prevCursor.findIndex(item => item === nextCursor)
      setPageParam(prevCursor[prev - 2] || '')
    }

  };

  const nextPageAction = () => {
    setPageParam(nextCursor)
  }
  useEffect(() => {
    console.log('1')
    refetchListFriends()
  }, [])
  return (
    <main className="flex-1">
      <header className="sticky top-[40px] z-10 flex items-center justify-between h-12 px-6 border border-primary-border">
        <div className="flex items-center">
          <p className="text-lg">Danh sách</p>
          <SearchInput
            classNameWrapper="ml-4"
            classNameInput="outline-none w-[296px]"
            placeholder="Nhập từ khóa hoặc mã kết bạn"
            // eslint-disable-next-line no-console
            onChange={(event) => setCodeSearch(event.target.value)}
          />
          <button className="flex items-center justify-center text-primary-light bg-cbs-green w-[80px] h-8 rounded font-bold mr-6" onClick={checkCode}>
            Tìm kiếm
          </button>
          <FinancialCashFlowFilterButton />
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-14">
            {code && <p className={cn("text-2xl mr-5", styles.textBoldBlue)}>{code}</p>}
            <img src={CopyIcon} alt="Copy" className="cursor-pointer" />
          </div>
          <button className="flex items-center justify-center text-primary-light bg-cbs-green w-[130px] h-8 rounded font-bold mr-6" onClick={getCode}>
            Cấp mã kết bạn
          </button>
          <button className="w-10 h-10 rounded-full bg-cbs-left-menu flex items-center justify-center">
            <img src={Vertical3Dots} alt="3Dots" />
          </button>
        </div>
      </header>

      <table className="border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-10 border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray">
            <th className={cn("pb-1 pt-1 text-center", styles.theadInput)}>
              <div className="border-r-2 border-gray-300 flex items-center justify-center">
                <input
                  className="form-check-input mr-2"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  defaultChecked
                />
                <img src={PolygonIcon} alt="Polygon" />
              </div>
            </th>
            <th className="w-1/5 pb-1 pt-1">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Tên
              </div>
            </th>
            <th className="w-1/5 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Công ty
              </div>
            </th>
            <th className="w-1/12 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Email
              </div>
            </th>
            <th className="w-1/12 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Điện thoại
              </div>
            </th>
            <th className="w-1/12 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Ngày sinh
              </div>
            </th>
            <th className="w-1/12 pb-1 pt-1 font-normal min-w-[130px]">
              <div className="font-normal pl-2">Hành động</div>
            </th>
          </tr>
        </thead>

        <tbody className="bg-primary-light">
          {listFriends?.length && !friend ? listFriends.map((friend, i) => (
            <tr className="border-b border-primary-border h-10" key={friend._id}>
              <td className="py-1 px-2 text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  style={{ marginLeft: "-23px" }}
                />
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center">
                  <img
                    src={MemberIcon}
                    alt="Member"
                    className="rounded-full mr-2"
                  />
                  <p>{ friend.fullname }</p>
                </div>
              </td>
              <td className="py-1 px-2 align-middle">
                {friend.company? friend.company.name : null}
              </td>
              <td className="py-1 px-2 align-middle">{ friend.email }</td>
              <td className="py-1 px-2 align-middle">{ friend.phone }</td>
              <td className="py-1 px-2 align-middle">{ friend.birthDay && moment(friend.birthDay).format('DD/MM/YYYY')}</td>
              <td className="py-1 px-2 text-negative align-middle cursor-pointer hover:text-opacity-50" onClick={() => unFriend({unFriendID: friend._id})}>Huỷ bạn bè</td>
            </tr>
          )) : null}
          {friend &&
            <tr className="border-b border-primary-border h-10" key={friend._id}>
              <td className="py-1 px-2 text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  style={{ marginLeft: "-23px" }}
                />
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center">
                  <img
                    src={MemberIcon}
                    alt="Member"
                    className="rounded-full mr-2"
                  />
                  <p>{ friend.fullname }</p>
                </div>
              </td>
              <td className="py-1 px-2 align-middle">
                {friend.company? friend.company.name : null}
              </td>
              <td className="py-1 px-2 align-middle">{ friend.email }</td>
              <td className="py-1 px-2 align-middle">{ friend.phone }</td>
              <td className="py-1 px-2 align-middle">{ friend.birthDay && moment(friend.birthDay).format('DD/MM/YYYY')}</td>
              {isFriend ?
                <td className="py-1 px-2 text-negative align-middle cursor-pointer hover:text-opacity-50" onClick={() => unFriend({unFriendID: friend._id})}>Huỷ bạn bè</td>
                : <td className="py-1 px-2 text-cbs-primary align-middle cursor-pointer hover:text-opacity-50" onClick={() => addFriend({sendRequestToFriendID: friend._id})}>Gửi yêu cầu kết bạn</td>
              }
            </tr>
          }
        </tbody>
      </table>

      <Paginate
        totalPages={totalPage}
        totalRecord={totalRecord} hasNextPage
        prevPageAction={() => prevPageAction()}
        nextPageAction={() => nextPageAction()} />
    </main>
  );
};

export default Friends;
