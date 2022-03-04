import React, {FC, useEffect, useRef} from 'react'
import {map as _map} from "lodash";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {RightClickMenuWrapper} from "shareComponents/common";
import {RightClickFolder} from "./RightClickFolder";
import PlusIcon from "assets/images/icons8-plus-math-96.svg";
import moment from "moment";
import {setCurrentSelectedFolders} from "redux/reducer/messages/ListFolders"

export const ListFolders:FC = () => {
    const {listFolders, nextCursor, hasMoreData, currentSelectedFolders} = useSelector((state: RootState) => state.listFolders.data);
    const amountMissMessage = useSelector((state: RootState) => state.listConversation.data.amountMissMessage);
    const dispatch = useDispatch();
    const listFoldersRef = useRef<HTMLDivElement>(null);
    const {getListFoldersConversation} = UseListConversation();

    const nexListFolder = () => {
        nextCursor&&getListFoldersConversation({nextCursor: nextCursor, limit:10})
    }

    useEffect(() => {
        Object.keys(listFolders).length===0&&getListFoldersConversation({limit:10})
    }, []);

    useEffect(() => {
        if (listFoldersRef.current) {
            listFoldersRef.current.addEventListener("wheel", (evt) => {
                evt.preventDefault();
                if (listFoldersRef.current) {
                    listFoldersRef.current.scrollLeft = listFoldersRef.current.scrollLeft + evt.deltaY;
                }
            });
        }
    }, [listFoldersRef])

    if (Object.keys(listFolders).length <= 0) return null;
    return (
        <div ref={listFoldersRef} className={"flex overflow-auto max-w-full border-b border-gray-100 no-webkit-scrollbar"}>
            <div
                className={"flex items-center px-4 hover:bg-gray-100 rounded-tl-md rounded-tr-md"}
            >
                <button
                    onClick={() => {
                        dispatch(setCurrentSelectedFolders({
                            currentSelectedFolders: {
                                _id: "all",
                                name: "All",
                                amountMissMessage
                            }
                        }))
                    }}
                    className={"whitespace-nowrap text-center block p-2 " + ((!currentSelectedFolders||"all"===currentSelectedFolders._id)?"border-b-2 border-primary text-primary":"text-primary-gray")}
                >
                    All
                </button>
                {amountMissMessage>0&&<span className={"rounded-full bg-primary text-xs text-white w-[18px] h-[18px] text-center leading-[18px]"}>{amountMissMessage}</span>}
            </div>
            {_map(Object.values(listFolders).sort((a,b) => (moment(b.createdAt).toDate().getTime() > moment(a.createdAt).toDate().getTime())?1:-1), tab => (
                <RightClickMenuWrapper
                    className={"flex items-center px-4 hover:bg-gray-100 rounded-tl-md rounded-tr-md"}
                    key={tab._id}
                    contextMenu={<RightClickFolder folder={tab}/>}
                    onClick={() => {
                        dispatch(setCurrentSelectedFolders({currentSelectedFolders: tab}))
                    }}
                >
                    <button
                        className={"whitespace-nowrap text-center block p-2 " + ((currentSelectedFolders&&tab._id===currentSelectedFolders._id)?"border-b-2 border-primary text-primary":"text-primary-gray")}
                    >
                        {tab.name}
                    </button>
                    {tab.amountMissMessage>0&&<span className={"rounded-full bg-primary text-xs text-white w-[18px] h-[18px] text-center leading-[18px]"}>{tab.amountMissMessage}</span>}
                </RightClickMenuWrapper>
            ))}
            {
                hasMoreData &&
                <button
                    onClick={() => nexListFolder()}
                    className={"rounded-lg flex flex-col items-center justify-center"}>
                    <img src={PlusIcon} className={"w-[20px] h-[20px]"} alt={"==="}/>
                </button>
            }
        </div>
    )
}