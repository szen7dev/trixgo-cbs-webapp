import { FC } from "react";
import moment from "moment";

import ChevronUpIcon from "assets/images/icon-chevron-up.png";
import LineConnector from "assets/images/line-connector.svg";
import LongArrowIcon from "assets/images/icon-long-arrow.svg";
import { ModalAddRelationUser } from "views/pcm/pages/PcmDetailTask/components";
import ModalLarge from "shareComponents/common/ModalContainer/components/ModalLarge";
import useModal from "views/pcm/hooks/useModal";

import type { Author, Assignee } from "typings/task";
import type { User } from "typings/user";

type Props = {
  taskID: string;
  author: Author;
  assignee: Assignee;
  createAt: string;
  related?: Array<User>;
  confirmUsers: Array<User>;
};

export const SideBar: FC<Props> = ({
  taskID,
  author,
  assignee,
  createAt,
  related,
  confirmUsers,
}) => {
  const [{ isShow }, { toggleModal, openAddUserRelation: openListUserRelation  }] = useModal();

  return (
    <div>
      <div>
        <div className="flex justify-between mb-2.5">
          <span className="font-bold text-[13px] leading-4">
            Gửi và nhận
          </span>
          <button title="Toggle header" className="p-1 rounded bg-gray-200">
            <img className="w-3" src={ChevronUpIcon} alt="Toggle button" />
          </button>
        </div>
        <div className="flex">
          <div className="w-1/2">
            <div className="flex">
              <img
                src={`${process.env.REACT_APP_URL_S3_USER}/${author?.image}`}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex items-center flex-1">
                <img
                  className="px-2 w-auto h-6"
                  src={LongArrowIcon}
                  alt="Arrow icon"
                />
              </div>
            </div>
            <span className="mt-2 text-[13px] leading-4">
              {author?.fullname}
            </span>
          </div>
          <div className="w-1/2">
            <img
              src={`${process.env.REACT_APP_URL_S3_USER}/${assignee?.image}`}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="mt-2 text-[13px] leading-4">
              {assignee?.fullname}
            </span>
          </div>
        </div>
        <span className="text-xs text-primary-gray">
          {`${moment(createAt).format("HH:mm DD/MM/YY")} - ${moment(
            createAt
          ).fromNow()}`}
        </span>
      </div>

      <div className="mt-5">
        <div className="flex justify-between items-end mb-2.5">
          <span className="font-bold text-[13px] leading-4">
            Người liên quan
          </span>
          <button onClick={openListUserRelation}>
            <span className="text-primary text-[13px] leading-4">
              Xem tất cả
            </span>
          </button>
        </div>
        <div className="flex overflow-hidden space-x-3">
          {(related || []).map((user, index) => (
            <img
              key={user?._id || index}
              src={`${process.env.REACT_APP_URL_S3_USER}/${user?.image}`}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          ))}
        </div>
      </div>

      {/* <div className="mt-5">
        <div className="flex justify-between items-center mb-2.5">
          <span className="font-bold text-[13px] leading-4">
            Xác nhận
          </span>
					<button>
            <span className="text-white bg-cbs-completed text-small px-4 py-2 rounded-cbs-sm">
							<strong>
								Đồng ý
							</strong>
            </span>
          </button>
        </div>
        <div>
          
          {confirmUsers.map((user, index) => (
            <div key={user?._id || index}>
              <div className="flex justify-between">
                <div className="flex items-start">
                  <img
                    src={`${process.env.REACT_APP_URL_S3_USER}/${user?.image}`}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="ml-2">
                    <p className="text-[13px]">{user?.bizfullname}</p>
                    <p className="text-xs text-primary-gray">
                      {moment().format('HH:mm DD/MM/YY')} - {moment().fromNow()}
                     
                    </p>
                  </div>
                </div>
                <span className="font-bold rounded min-w-max text-green-600 text-[13px]">
                  Đã đồng ý
                </span>
              </div>
              {index !== confirmUsers?.length - 1 && (
                <img
                  className="w-10 h-6"
                  src={LineConnector}
                  alt="Timeline icon"
                />
              )}
            </div>
          ))}
        </div>
      </div> */}

      {/* <div className="mt-5">
        <div className="mb-2.5">
          <span className="font-bold text-[13px] leading-4">Mở thầu</span>
        </div>
        <div>
          <div className="flex justify-between">
            <div className="flex items-start">
              <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
              <div className="ml-2">
                <p className="text-[13px]">Lê Trọng Quyền-CPMI</p>
                <p className="text-xs text-primary-gray">
                  13:15 28/2/21 - 2h ago
                </p>
              </div>
            </div>
            <span className="font-bold rounded min-w-max text-green-600 text-[13px]">
              Đã mở
            </span>
          </div>
          <img className="w-10 h-6" src={LineConnector} alt="Timeline icon" />
          <div className="flex justify-between">
            <div className="flex items-start">
              <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
              <div className="ml-2">
                <p className="text-[13px]">Trần Tiến Tùng-PGI</p>
                <p className="text-xs text-primary-gray"></p>
              </div>
            </div>
            <button className="font-bold px-4 h-8 rounded min-w-max text-primary-light text-[13px] bg-green-600">
              Mở thầu
            </button>
          </div>
          <img className="w-10 h-6" src={LineConnector} alt="Timeline icon" />
          <div className="flex justify-between">
            <div className="flex items-start">
              <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
              <div className="ml-2">
                <p className="text-[13px]">Hà Tiến Dũng-CHG</p>
                <p className="text-xs text-primary-gray">
                  13:15 28/2/21 - 2h ago
                </p>
              </div>
            </div>
            <span className="font-bold rounded min-w-max text-green-600 text-[13px]">
              Đã mở
            </span>
          </div>
          <img className="w-10 h-6" src={LineConnector} alt="Timeline icon" />
          <div className="flex justify-between">
            <div className="flex items-start">
              <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
              <div className="ml-2">
                <p className="text-[13px]">Đỗ Hữu Khu-CHG</p>
                <p className="text-xs text-primary-gray">Cán bộ thanh toán</p>
              </div>
            </div>
            <button className="font-bold px-4 h-6 rounded-xl min-w-max text-red-600 text-[13px] bg-red-100">
              Rejected
            </button>
          </div>
          <img className="w-10 h-6" src={LineConnector} alt="Timeline icon" />
          <div className="flex justify-between">
            <div className="flex items-start">
              <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
              <div className="ml-2">
                <p className="text-[13px]">Vũ Thị Lan-CHG</p>
                <p className="text-xs text-primary-gray"></p>
              </div>
            </div>
            <button className="font-bold px-4 h-6 rounded-xl min-w-max text-green-600 text-[13px] bg-green-100">
              Pending
            </button>
          </div>
        </div>
      </div> */}

      <ModalLarge
        show={isShow}
        toggle={toggleModal}
        className="inline-flex flex-col text-black w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white max-w-[600px] rounded-cbs-md"
      >
          <ModalAddRelationUser 
            toggle={toggleModal} 
            taskID={taskID} 
            projectID=""
            related={related}
            modalType={'LIST_ALL_RELATION_USER'}
          />
      </ModalLarge>
    </div>
  );
};

SideBar.defaultProps = {
  related: [],
};