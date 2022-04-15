import React, { FC, useContext } from "react";
import fakeThumbnail from "assets/images/thumbnail1.jpg";
import Close from "assets/icons/Close";
import { DropdownSearchable, Item } from "shareComponents/common";
import { ShareContext } from "../ShareModal";
import { map as _map } from "lodash";
import { useModal } from "services/hooks/useModal";
const ShareListing: FC = () => {
  const { setShareUser } = useContext(ShareContext);
  const { closeModal } = useModal();

  const handleChange = (item: Item) => {
    setShareUser((oldValues) => [...(oldValues ?? []), item.id]);
  };
  const users = [
    {
      _id: 1,
      content: "Trần Thanh Quang",
      imageUrl: fakeThumbnail,
    },
    {
      _id: 2,
      content: "Trần Thanh Quang 2",
      imageUrl: fakeThumbnail,
    },
    {
      _id: 3,
      content: "Trần Thanh Quang 3",
      imageUrl: fakeThumbnail,
    },
    {
      _id: 4,
      content: "Trần Thanh Quang 4",
      imageUrl: fakeThumbnail,
    },
  ];
  return (
    <div className="w-full max-h-full overflow-visible rounded shadow-lg">
      <div className={"py-3 px-4"}>
        <div className={"flex items-center mb-3"}>
          <div className={"flex-1 flex items-center"}>
            <img src={fakeThumbnail} alt="Thumbnail" className="w-8 h-8 rounded-full mr-1" />
            <p className={"text-lg ml-2"}>Chia sẻ với mọi người</p>
          </div>
          <button
            onClick={() => closeModal()}
            className={"w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"}
          >
            <Close />
          </button>
        </div>
        <DropdownSearchable
          placeholder={"Thêm người"}
          className={"w-full flex-1 border-b border-gray-200 mb-4 bg-gray-50 py-1 px-3"}
          focusedClass={"border-b border-primary"}
          maxWidthInput={"max-w-none"}
          isMultiple={true}
          showTriangle={false}
          allowClearValueSingleInput={true}
          renderSelectedItem={(item) => (
            <div className={"flex items-center py-1 bg-white"}>
              <img className={"w-4 h-4 rounded-full mr-2"} alt={"tag icon"} src={item.imageUrl} />
              <span>{item.text}</span>
            </div>
          )}
          data={users}
          formatItem={{
            id: "_id",
            text: "content",
          }}
          inlineSearch={true}
          onchangeValue={(item) => {
            handleChange(item);
          }}
          onClearData={() => {
            setShareUser([]);
          }}
        />
      </div>
      {_map(users, (user) => (
        <div
          key={user._id}
          className={"flex items-center py-2 px-4 hover:bg-gray-50 transition duration-100"}
        >
          <div className={"flex-1 flex items-center"}>
            <img className={"w-8 h-8 rounded-full mr-3"} alt={"tag icon"} src={user.imageUrl} />
            <span>{user.content}</span>
          </div>
          <DropdownSearchable
            placeholder={"Thêm người"}
            className={"rounded-md hover:bg-gray-100 py-1 px-3"}
            maxHeightInput={"max-h-[36px]"}
            data={[
              {
                _id: 1,
                content: "Người chỉnh sửa",
              },
              {
                _id: 2,
                content: "Người xem",
              },
              {
                _id: 3,
                content: "Xóa bỏ",
              },
            ]}
            formatItem={{
              id: "_id",
              text: "content",
            }}
            disableSearch={true}
            onchangeValue={(item) => {
              console.log(item);
            }}
          />
        </div>
      ))}
      <div className={"flex justify-end items-center mt-4 px-4 pb-2"}>
        <button className={"bg-primary rounded h-[32px] w-[95px] text-white font-semibold"}>
          Xong
        </button>
      </div>
    </div>
  );
};

export default ShareListing;
