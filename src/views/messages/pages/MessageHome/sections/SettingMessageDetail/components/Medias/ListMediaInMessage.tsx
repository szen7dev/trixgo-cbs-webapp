import React, { FC, useCallback, useContext, useState} from "react";
import {map as _map} from "lodash";
import {DropdownSearchable,ModalFullContainer} from "shareComponents/common";
import {ItemMediaInMessage} from "./ItemMediaInMessage";

import {MessageContext} from "../../../../index";
import {ViewImage} from "../../../ChattingSection";
import {UseInformationMessage} from "services/hooks/messages/useInformationMessage";
import {ItemFileMessage} from "typings/apis/messages/listConversation";
import moment from "moment";

type Props = {
    isActive: boolean
}
export const ListMediaInMessage:FC<Props> = ({isActive}) => {
    const {currentChat} = useContext(MessageContext);
    const [modalShowImage, setModalShowImage] = useState<{ show: boolean, index: number }>({ show: false, index: 0 });
    const closeModalImage = () => setModalShowImage({ show: false, index: 0 });

    const [dateRange, setDateRage] = useState({fromDate: "", toDate:""});
    const [author, setAuthor] = useState("");
    const params = {conversationID: currentChat, type: 1, fromDate: dateRange.fromDate, toDate: dateRange.toDate, authorID: author};
    const {listMediasMessage, hasListMediasNextPage, nextPageListMedias} = UseInformationMessage(params, isActive, "images");

    const [searchUser, setSearchUser] = useState("");
    const paramsListMember = {conversationID: currentChat, populates: JSON.stringify({"path": "addedBy member", "select": "_id bizfullname image"}), keyword: searchUser};
    const {listMembersMessage} = UseInformationMessage(paramsListMember, isActive, "members");

    const groupByDate = useCallback(() : {
        dateFormat: string,
        files: ItemFileMessage[]
    }[] => {
        const group : {[key: string]: ItemFileMessage[]} = {};
        if (!listMediasMessage) return [];
        listMediasMessage.forEach(media => {
            if (!media) {
                return;
            }
            group[moment(media.createAt).format("DD/MM/YYYY")] = [];
        });
        listMediasMessage.forEach((media, index) => {
            if (!media) {
                return;
            }
            group[moment(media.createAt).format("DD/MM/YYYY")].push({...media, index});
        })

        const listAfterGroup: {
            dateFormat: string,
            files: ItemFileMessage[]
        }[] = [];
        Object.keys(group).forEach(key => {
            listAfterGroup.push({
                dateFormat: key,
                files: group[key]
            })
        })
        return listAfterGroup;
    }, [listMediasMessage])

    const listImages = useCallback(() => {
        const images : string[] = [];
        if (!listMediasMessage) return images;
        listMediasMessage.forEach(media => {
            if (!media) {
                return;
            }
            images.push(`${process.env.REACT_APP_URL_S3}${media?.path}`)
        });

        return images;
    },[listMediasMessage]);

    const renderListMedia = () => {
        return _map(groupByDate(), media => (
            <ItemMediaInMessage key={media.dateFormat} media={media} setModalShowImage={setModalShowImage}/>
        ))
    };

    return (
        <div className={"bg-white flex-1"}>
            <div className={"sticky bg-white top-110px w-full z-10 flex flex-wrap items-center p-[10px]"}>
                {/*<DropdownSearchable*/}
                {/*    placeholder={"Loại"}*/}
                {/*    className={"bg-gray-100 rounded-full flex-1 mr-2"}*/}
                {/*    data={[*/}
                {/*        {*/}
                {/*            id: 1,*/}
                {/*            imageUrl: PDFIcon,*/}
                {/*            text: "PDF"*/}
                {/*        },*/}
                {/*        {*/}
                {/*            id: 2,*/}
                {/*            imageUrl: WordIcon,*/}
                {/*            text: "Word"*/}
                {/*        },*/}
                {/*        {*/}
                {/*            id: 3,*/}
                {/*            imageUrl: ExcelIcon,*/}
                {/*            text: "Excel"*/}
                {/*        },*/}
                {/*        {*/}
                {/*            id: 4,*/}
                {/*            imageUrl: OtherIcon,*/}
                {/*            text: "Other"*/}
                {/*        }*/}
                {/*    ]}*/}
                {/*    allowClearValueSingleInput={true}*/}
                {/*    bordered={false}*/}
                {/*    renderItem={(item) => (*/}
                {/*        <div className={"flex align-items-center text-left"}>*/}
                {/*            <img  alt={"Avt"} src={item.imageUrl} className={"w-9 h-9 object-cover mr-3"}/>*/}
                {/*            <span className={"flex-1 ml-1 mr-1"}>{item.text}</span>*/}
                {/*        </div>*/}
                {/*    )}*/}
                {/*    searchInputClassName={"border rounded-full h-[28px] p-0 border-gray-300 mx-[10px]"}*/}
                {/*/>*/}
                <DropdownSearchable
                    placeholder={"Người gửi"}
                    className={"bg-gray-100 rounded-full flex-1 mr-2 text-xs"}
                    searchInputClassName={"border rounded-full h-[28px] p-0 border-gray-300 mx-[10px] focus:border-primary"}
                    allowClearValueSingleInput={true}
                    bordered={false}
                    onSearchInputChange={valueSearch => setSearchUser(valueSearch)}
                    data={listMembersMessage.filter(member => member).map(member => {
                        return {
                            ...member,
                            id: member?.member?._id,
                            text: member?.member?.bizfullname,
                            imageUrl: `${process.env.REACT_APP_URL_S3_USER}/${member?.member?.image}`,
                            _id: member?.member?._id
                        }
                    })}
                    onchangeValue={({_id}) => setAuthor(_id)}
                    onClearData={() => {
                        setAuthor("");
                    }}
                />
                <DropdownSearchable
                    placeholder={"Ngày gửi"}
                    className={"bg-gray-100 rounded-full flex-1 mr-2 text-xs"}
                    allowClearValueSingleInput={true}
                    bordered={false}
                    data={[
                        {
                            id: 1,
                            text: "Trong vòng 24h",
                            fromDate: moment().subtract(1, 'days').format("yyyy-MM-DD"),
                            toDate: moment().format("yyyy-MM-DD")
                        },
                        {
                            id: 2,
                            text: "Trong vòng 1 tuần",
                            fromDate: moment().subtract(1, 'weeks').format("yyyy-MM-DD"),
                            toDate: moment().format("yyyy-MM-DD")
                        },
                        {
                            id: 3,
                            text: "Trong vòng 1 tháng",
                            fromDate: moment().subtract(1, 'months').format("yyyy-MM-DD"),
                            toDate: moment().format("yyyy-MM-DD")
                        },
                    ]}
                    disableSearch={true}
                    onchangeValue={({fromDate, toDate}) => setDateRage({fromDate, toDate})}
                    onClearData={() => {
                        setDateRage({fromDate: "", toDate:""});
                    }}
                />
            </div>
            {renderListMedia()}
            {
                hasListMediasNextPage &&
                <button
                    onClick={() => nextPageListMedias()}
                    className={"rounded-lg w-full flex flex-col items-center py-[15px] px-[10px] justify-center text-primary font-semibold"}>
                    Xem thêm
                </button>
            }
            <ModalFullContainer isModalOpen={modalShowImage.show} toggle={closeModalImage}>
                <div className="flex overflow-hidden transition-all transform w-full h-full">
                    <ViewImage show={modalShowImage.show} toggle={closeModalImage} imageList={[...listImages()]} index={modalShowImage.index} />
                </div>
            </ModalFullContainer>
        </div>
    )
}
