import React, {createContext, FC, useCallback, useContext, useEffect, useState} from "react";
import {map as _map} from "lodash";
import {mapValues as _mapValues} from "lodash";
import {DropdownSearchable,ModalFullContainer} from "shareComponents/common";
import PDFIcon from 'assets/images/CBS-PDF-Icon-48.svg';
import WordIcon from 'assets/images/CBS-Word-Icon.svg';
import ExcelIcon from 'assets/images/CBS-Excel-Icon.svg';
import OtherIcon from 'assets/images/CBS-Other-Icon.svg';
import {ItemMediaInMessage} from "./ItemMediaInMessage";
import {DatePickerWithRange} from "../../../../../../shareComponents/common/DatePickerWithRange";

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
    const [dateRange, setDateRage] = useState({fromDate: "", toDate:""})
    const params = {conversationID: currentChat, type: 1, fromDate: dateRange.fromDate, toDate: dateRange.toDate};
    const {listFilesMessage, hasListFilesNextPage, nextPageListFiles} = UseInformationMessage(params, isActive, "images");

    const [searchUser, setSearchUser] = useState("");
    const paramsListMember = {conversationID: currentChat, populates: JSON.stringify({"path": "addedBy member", "select": "_id bizfullname image"}), keyword: searchUser};
    const {listMembersMessage} = UseInformationMessage(paramsListMember, isActive, "members");

    const groupByDate = useCallback(() : {
        dateFormat: string,
        files: ItemFileMessage[]
    }[] => {
        const group : {[key: string]: ItemFileMessage[]} = {};
        if (!listFilesMessage) return [];
        listFilesMessage.forEach(media => {
            if (!media) {
                return;
            }
            group[moment(media.createAt).format("DD/MM/YYYY")] = [];
        });
        listFilesMessage.forEach((media, index) => {
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
    }, [listFilesMessage])

    const listImages = useCallback(() => {
        const images : string[] = [];
        if (!listFilesMessage) return images;
        listFilesMessage.forEach(media => {
            if (!media) {
                return;
            }
            images.push(`${process.env.REACT_APP_URL_S3}${media?.path}`)
        });

        return images;
    },[listFilesMessage]);

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
                    className={"bg-gray-100 rounded-full flex-1 mr-2"}
                    searchInputClassName={"border rounded-full h-[28px] p-0 border-gray-300 mx-[10px]"}
                    allowClearValueSingleInput={true}
                    bordered={false}
                    onSearchInputChange={valueSearch => setSearchUser(valueSearch)}
                    data={listMembersMessage.map(member => {
                        return {
                            ...member,
                            id: member.member._id,
                            text: member.member.bizfullname,
                            imageUrl: `${process.env.REACT_APP_URL_S3_USER}/${member?.member?.image}`
                        }
                    })}
                />
                <DropdownSearchable
                    placeholder={"Ngày gửi"}
                    className={"bg-gray-100 rounded-full flex-1 mr-2"}
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
                />
            </div>
            {renderListMedia()}
            {
                hasListFilesNextPage &&
                <button
                    onClick={() => nextPageListFiles()}
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
