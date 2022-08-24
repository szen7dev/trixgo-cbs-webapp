import React, {createContext, FC, ReactNode, useEffect, useMemo, useState} from "react";
import cn from "classnames";

// import FinLeftSideBar from "components/common/FinLeftSideBar";
import {LeftNavigate, MainHeaderV2} from "shareComponents/common";
import {MessageList, SearchUserAndConversation} from "../../pages/MessageHome/sections/MessageList";
import {useLocation} from "react-router-dom";
import Editor from "@draft-js-plugins/editor";
import {useSocket} from "services/hooks/useSocket";
import {useDispatch} from "react-redux";
import {dismissSearchMode} from "redux/reducer/messages/SearchMessage";
import {setIsReviewOldMessages} from "redux/reducer/messages/ListMessage";
import {SubComponents} from "../../pages/MessageHome/sections/SubComponents";
import {LeftMenuMessage} from "./LeftMenuMessage";

export const MessageContext = createContext<{
  currentChat: string;
  setCurrentChat: React.Dispatch<React.SetStateAction<string>>;
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  socketRef: any;
  editorRef: any;
  setEditorRef: React.Dispatch<React.SetStateAction<any>>;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  isDragOver: boolean;
  setIsDragOver: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  currentChat: '',
  setCurrentChat: () => undefined,
  showMenu: false,
  setShowMenu: () => undefined,
  socketRef: null,
  editorRef: null,
  setEditorRef: () => undefined,
  showSearch: false,
  setShowSearch: () => undefined,
  isDragOver: false,
  setIsDragOver: () => undefined
});
export const populates = JSON.stringify({
  path: 'lastMessage members avatar',
  option: {
    limit: 4
  },
  select: 'content conversation createAt createdAt file sender type image bizfullname path',
  populate: {
    path: 'files sender members',
    select: 'bizfullname email image createdAt image bizfullname',
  }
});

type Props = {
  children: ReactNode;
};

export const MessagesLayoutV2: FC<Props> = ({ children }) => {
  const [isLeftMenuCollapse, setIsLeftMenuCollapse] = useState(false);

  const location = useLocation();
  const [currentChat, setCurrentChat] = useState(location.hash.replace("#",""));
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [editorRef, setEditorRef] = useState<Editor>();
  const socketRef = useSocket();
  const dispatch = useDispatch();

  const value = useMemo(
      () => ({ currentChat, setCurrentChat , showMenu, setShowMenu, socketRef, editorRef, setEditorRef, showSearch, setShowSearch, isDragOver, setIsDragOver}),
      [currentChat, showMenu, socketRef, editorRef, showSearch, isDragOver]
  );

  useEffect(() => {
    currentChat&&setShowMenu(true)
    currentChat&&setShowSearch(false)
    currentChat&&dispatch(dismissSearchMode({conversationId: currentChat}));
    currentChat&&dispatch(setIsReviewOldMessages({conversationId: currentChat, isReview: false}));
  }, [currentChat])

  const handleMenuEvent = () => {
    setIsLeftMenuCollapse(!isLeftMenuCollapse);
  };

  return (
      <section
          className={cn("home-layout relative bg-primary-light", {
            "collapse-left": isLeftMenuCollapse
          })}
      >
        {/* Collapse menu button */}

        <div className={"flex"}>
          <LeftNavigate handleMenuEvent={handleMenuEvent}/>
          <section className={"main-content-wrapper flex-1"}>
            <MessageContext.Provider value={value}>
              {/*  Main header */}
              <MainHeaderV2
                  headerTitle={"Chat"}
              >
                <SearchUserAndConversation/>
              </MainHeaderV2>

              {/* Left navigation */}
              <LeftMenuMessage>
                <MessageList/>
              </LeftMenuMessage>

              {/* Content area */}
              <main className="main-route-content transition-all duration-500 ease-out overflow-auto relative h-left-over-content max-h-left-over-content min-h-left-over-content">
                {children}
              </main>
              <SubComponents/>
            </MessageContext.Provider>
          </section>
        </div>
      </section>
  );
};
