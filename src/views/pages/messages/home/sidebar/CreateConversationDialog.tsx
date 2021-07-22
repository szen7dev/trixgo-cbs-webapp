import { CSSProperties, FC, useEffect, useRef, useState } from "react";

import { List } from "react-virtualized";
import cn from "classnames";
import { map as _map } from "lodash";
import { find as _find } from "lodash";
import { filter as _filter } from "lodash";

import { useModal } from "services/hooks/useModal";
import { useAuth } from "services/hooks/useAuth";
import { useWindowDimensions } from "services/hooks/useWindowDimensions";
import { useChat } from "services/hooks/useChat";

import XIcon from "assets/icons/X";
import SearchIcon from "assets/icons/Search";

import { NEW_CONVERSATION_NAME_MAX_LENGTH } from "utils/constants";

import { CreateConversationPayload } from "typings/apis/chatting";
import { User } from "typings/auth";

const CreateConversationDialog: FC = () => {
  const { closeModal } = useModal();
  const { user, friendContacts } = useAuth();
  const { width } = useWindowDimensions();
  const { createConversation } = useChat();

  const inviteFriendsEditableContentRef = useRef<HTMLDivElement>(null);
  const inviteFriendsRef = useRef<HTMLDivElement>(null);
  const [selectedContact, setSelectedContact] = useState<User[]>([]);
  const [payload, setPayload] = useState<CreateConversationPayload>({
    name: "",
    logo: [],
    userIds: [],
  });

  const onSelectContact = (selectContact: User) => {
    if (!_find(selectedContact, (contact) => contact === selectContact)) {
      setSelectedContact([...selectedContact, ...[selectContact]]);
    } else {
      setSelectedContact(
        _filter(selectedContact, (contact) => contact !== selectContact)
      );
    }
  };

  const onRemoveContact = (removeContact: User) => {
    setSelectedContact(
      _filter(selectedContact, (contact) => contact !== removeContact)
    );
  };

  const getConversationNameFromContactNames = (): string => {
    let name = `${user?.firstName} ${user?.lastName},`;

    for (let index = 0; index < selectedContact.length; index++) {
      if (name.length > NEW_CONVERSATION_NAME_MAX_LENGTH) break;

      const element = selectedContact[index];
      name += ` ${element.firstName} ${element.lastName},`;
    }

    if (name.length > NEW_CONVERSATION_NAME_MAX_LENGTH) {
      name = name.replace(
        name.substring(NEW_CONVERSATION_NAME_MAX_LENGTH - 4, name.length),
        "..."
      );
    } else {
      if (name.slice(-1) === ",") name = name.slice(0, -1);
    }

    return name;
  };

  const handleSubmit = () => {
    const query = {
      ...payload,
      name: !payload.name.length
        ? getConversationNameFromContactNames()
        : payload.name,
      logo: [user?.avatar, ...payload.logo] as string[],
      userIds: [...[user?._id], ...payload.userIds] as string[],
    };

    createConversation(query);
  };

  const contactsRender = ({
    key,
    index,
    style,
  }: {
    key: string;
    index: number;
    style: CSSProperties;
  }) => {
    const { _id, avatar, firstName, lastName } = friendContacts[index];

    return (
      <div
        key={key}
        className="flex items-center w-full h-12 rounded-md hover:bg-secondary-light cursor-pointer py-1 px-2 my-1"
        onClick={() => onSelectContact(friendContacts[index])}
        style={style}
      >
        <div className="round-checkbox mr-6">
          <input
            id={`invite-friend-contact-${_id}`}
            type="checkbox"
            checked={
              !!_find(
                selectedContact,
                (contact) => contact === friendContacts[index]
              )
            }
            onChange={() => onSelectContact(friendContacts[index])}
          />
          <label htmlFor={`invite-friend-contact-${_id}`}></label>
        </div>

        <div className="relative mr-3">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>

        <span className="max-w-[250px] truncate font-bold">
          {firstName} {lastName}
        </span>
      </div>
    );
  };

  useEffect(() => {
    setPayload({
      ...payload,
      logo: _map(selectedContact, (contact) => contact?.avatar),
      userIds: _map(selectedContact, (contact) => contact?._id),
    });

    inviteFriendsEditableContentRef?.current?.focus();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedContact]);

  return (
    <div className="w-full max-h-full overflow-auto rounded shadow-lg">
      {/* Modal header */}
      <div className="flex h-12 justify-between items-center border-b border-solid border-secondary-light px-4 mb-4">
        <h5 className="font-semibold text-lg">Tạo mới hộp thoại</h5>
        <XIcon
          className="w-6 h-6 text-primary-gray cursor-pointer"
          onClick={closeModal}
        />
      </div>

      <div className="px-4">
        <label
          htmlFor="new-conversation-name"
          className="block uppercase tracking-wider text-left text-xs font-bold mb-3"
        >
          Tên hội thoại
        </label>
        <input
          id="new-conversation-name"
          type="text"
          value={payload.name}
          placeholder="Nhập tên hội thoại..."
          className="form-input py-2 px-4"
          onChange={(e) => setPayload({ ...payload, name: e.target.value })}
        />
      </div>

      <div className="relative p-4">
        <label className="block uppercase tracking-wider text-left text-xs font-bold mb-3">
          Mời thêm bạn vào trò chuyện
        </label>

        <div
          ref={inviteFriendsRef}
          className="flex flex-wrap min-h-[54px] max-h-[98px] overflow-y-auto overflow-x-hidden border border-solid border-primary rounded-md py-1 pr-4 pl-8"
          onClick={() => inviteFriendsEditableContentRef?.current?.focus()}
        >
          <SearchIcon className="absolute left-6 top-[55%] w-4 h-4 flex-shrink-0" />

          <span
            key={`invite-friend-contact-tag-${user?._id}`}
            className={cn(
              "flex justify-center items-center rounded-full font-bold bg-secondary-light text-sm leading-loose py-1 pl-2 pr-3 m-1",
              {
                hidden: !selectedContact.length,
              }
            )}
          >
            <img
              src={user?.avatar}
              alt="User avatar"
              className="w-6 h-6 object-cover rounded-full mr-2"
            />
            <span className="max-w-[100px] truncate">
              {user?.firstName} {user?.lastName}
            </span>
          </span>

          {_map(selectedContact, (contact: User, idx: number) => (
            <span
              key={`invite-friend-contact-tag-${contact._id}`}
              className="flex justify-center items-center rounded-full font-bold bg-secondary-light text-sm leading-loose py-1 pl-2 pr-3 m-1"
            >
              <img
                src={contact?.avatar}
                alt="User avatar"
                className="w-6 h-6 object-cover rounded-full mr-2"
              />
              <span className="max-w-[100px] truncate">
                {contact?.firstName} {contact?.lastName}
              </span>
              <XIcon
                className="w-5 h-5 text-primary-gray cursor-pointer ml-2"
                onClick={() => onRemoveContact(contact)}
              />
            </span>
          ))}

          <div
            ref={inviteFriendsEditableContentRef}
            contentEditable
            className="flex items-center min-w-[5px] h-6 outline-none mt-3 mb-2"
          />
        </div>
      </div>

      <div className="px-4">
        <label className="block uppercase tracking-wider text-left text-xs font-bold mb-3">
          Trò chuyện gần đây
        </label>

        <List
          width={width / 4 - 32}
          height={390}
          rowCount={friendContacts.length}
          rowHeight={52}
          rowRenderer={contactsRender}
        />
      </div>

      <div className="flex h-12 justify-end items-center border-t border-solid border-secondary-light py-8 px-4 mt-4">
        <button
          type="button"
          className="medium-button cancel-button mr-5"
          onClick={closeModal}
        >
          Huỷ
        </button>
        <button
          type="button"
          disabled={!selectedContact.length}
          className={cn("medium-button", {
            "disabled-button": !selectedContact.length,
            "primary-button": !!selectedContact.length,
          })}
          onClick={handleSubmit}
        >
          Tạo hội thoại
        </button>
      </div>
    </div>
  );
};

export default CreateConversationDialog;
