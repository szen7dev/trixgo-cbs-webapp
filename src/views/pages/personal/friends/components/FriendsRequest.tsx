import { FC, useEffect, useState } from "react";
import { useUser } from 'services/hooks/useUser';
import { AcceptRequestFriend, RemoveRequestFriend } from 'typings/user';

import MaleLogo from "assets/images/male-friend-logo.svg";
import FemaleLogo from "assets/images/female-friend-logo.svg";

const FriendsRequest: FC = () => {
  const [pageParam, setPageParam] = useState('')
  const params = {limit: 10, select: 'fullname email gender image', populates: '{"path": "company", "select": "name"}', lastestID: pageParam}
  const { listRequestFriends, totalRecordRequest, totalPagesRequest, refetchListRequestFriends } = useUser(pageParam, params);
  const { acceptRequestFriend, removeRequestFriend } = useUser()
  
  const acceptRequest = async (values: AcceptRequestFriend) => {
    await acceptRequestFriend(values);
    await refetchListRequestFriends()
  }

  const removeRequest = async (values: RemoveRequestFriend) => {
    await removeRequestFriend(values);
    await refetchListRequestFriends()
  }
  useEffect(() => {
    refetchListRequestFriends()
  }, [])
  return (
    <main className="h-screen bg-cbs-gray">
      <header className="flex items-center justify-between px-5 py-4">
        <p className="font-bold text-lg">Yêu cầu kết bạn</p>
        <p className="text-primary text-base">Xem thêm (125)</p>
      </header>

      <section className="grid grid-cols-6 gap-y-3 gap-x-1 px-12">
        {listRequestFriends?.length ? listRequestFriends.map((request, i) => (
          <div key={request._id} className="bg-primary-light border border-primary-border rounded max-w-[202px] max-h-[374px]">
            <img src={request.gender === 1 ? MaleLogo : FemaleLogo} alt="Male" />
            <div className="px-4 flex flex-col gap-2 mt-1">
              <p className="text-base">{ request.fullname }</p>
              <p className="text-primary-gray">{ request.company? request.company.name : '' }</p>
              <button className="rounded bg-primary text-primary-light text-[15px] h-[36px]" onClick={() => acceptRequest({acceptFriendRequestID : request._id })}>
                Xác nhận
              </button>
              <button className="rounded bg-cbs-gray text-dark text-[15px] h-[36px] mb-[13px]" onClick={() => removeRequest({removeFriendRequestID : request._id })}>
                Huỷ bỏ
              </button>
            </div>
          </div>
        )) : null}
      </section> 
    </main>
  );
};

export default FriendsRequest;
