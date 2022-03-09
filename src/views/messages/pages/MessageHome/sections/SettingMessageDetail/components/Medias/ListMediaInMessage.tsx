import React, {createContext, FC, useCallback, useContext, useEffect, useState} from "react";
import {map as _map} from "lodash";
import {DropdownSearchable,ModalFullContainer} from "shareComponents/common";
import PDFIcon from 'assets/images/CBS-PDF-Icon-48.svg';
import WordIcon from 'assets/images/CBS-Word-Icon.svg';
import ExcelIcon from 'assets/images/CBS-Excel-Icon.svg';
import OtherIcon from 'assets/images/CBS-Other-Icon.svg';
import {ItemMediaInMessage} from "./ItemMediaInMessage";
import {DatePickerWithRange} from "../../../../../../shareComponents/common/DatePickerWithRange";

import {MessageContext} from "../../../../index";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {ViewImage} from "../../../ChattingSection";

export const ListMediaInMessage:FC = () => {
    const {currentChat} = useContext(MessageContext);
    const {getListMediasOfConversation} = UseListConversation();
    const [modalShowImage, setModalShowImage] = useState<{ show: boolean, index: number }>({ show: false, index: 0 });
    const closeModalImage = () => setModalShowImage({ show: false, index: 0 });

    useEffect(() => {
        getListMediasOfConversation({conversationID: currentChat, typeMessage: 1})
    },[currentChat])
    const listImageInMessage = useSelector((state: RootState) => state.listMessage.data.listImages[currentChat]);

    const listImages = useCallback(() => {
        const images : string[] = [];
        if (!listImageInMessage) return images;
        listImageInMessage.forEach(media => {
            media.messages.forEach(image => {
                if (!image) {
                    return;
                }
                images.push(`${process.env.REACT_APP_URL_S3}${image?.path}`)
            })
        });

        return images;
    },[listImageInMessage]);

    const listIdsImage = useCallback(() => {
        const images : string[] = [];
        if (!listImageInMessage) return images;
        listImageInMessage.forEach(media => {
            media.messages.forEach(image => {
                if (!image) {
                    return;
                }
                images.push(image?._id)
            })
        });

        return images;
    },[listImageInMessage]);

    const renderListMedia = useCallback(() => {
        return _map(listImageInMessage??[], media => (
            <ItemMediaInMessage key={media._id} media={media} listImages={listIdsImage()} setModalShowImage={setModalShowImage}/>
        ))
    }, [listImageInMessage]);

    return (
        <div className={"bg-white flex-1"}>
            <div className={"sticky bg-white top-110px w-full z-10 flex items-center p-[10px]"}>
                <DropdownSearchable
                    placeholder={"Loại"}
                    className={"bg-gray-100 rounded-full flex-1 mr-2"}
                    data={[
                        {
                            id: 1,
                            imageUrl: PDFIcon,
                            text: "PDF"
                        },
                        {
                            id: 2,
                            imageUrl: WordIcon,
                            text: "Word"
                        },
                        {
                            id: 3,
                            imageUrl: ExcelIcon,
                            text: "Excel"
                        },
                        {
                            id: 4,
                            imageUrl: OtherIcon,
                            text: "Other"
                        }
                    ]}
                    renderItem={(item) => (
                        <div className={"flex align-items-center text-left"}>
                            <img  alt={"Avt"} src={item.imageUrl} className={"w-9 h-9 object-cover mr-3"}/>
                            <span className={"flex-1 ml-1 mr-1"}>{item.text}</span>
                        </div>
                    )}
                    searchInputClassName={"border rounded-full h-[28px] p-0 border-gray-300 mx-[10px]"}
                />
                <DropdownSearchable
                    placeholder={"Người gửi"}
                    className={"bg-gray-100 rounded-full flex-1 mr-2"}
                    searchInputClassName={"border rounded-full h-[28px] p-0 border-gray-300 mx-[10px]"}
                />
                <DatePickerWithRange/>
            </div>
            {renderListMedia()}
            <ModalFullContainer isModalOpen={modalShowImage.show} toggle={closeModalImage}>
                <div className="flex overflow-hidden transition-all transform w-full h-full">
                    <ViewImage show={modalShowImage.show} toggle={closeModalImage} imageList={[...listImages()]} index={modalShowImage.index} />
                </div>
            </ModalFullContainer>
        </div>
    )
}
