import { FC, useState, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import moment from "moment";

// import {useOnClickOutside} from "../../../../../../services/hooks/useOnclickOutside";

import iconAttach from "assets/images/icons8-attach-48.svg";
import iconReply from "assets/images/icons8-reply-arrow-48.svg";
import taskUserAvt from "assets/images/task-user.svg";
import trigangleDown from "assets/images/triangle-down.svg";
import iconUpload from "assets/images/icons8-upload-48.svg";
import iconLink from "assets/images/icons8-link-96-v3.svg";

import { nl2p, removeHTMLTags, sliceText } from 'utils';
import { humanFileSize } from 'utils/converter';
import type { Comment as CommentType, CommentProps, Task } from "typings/task";
import { ReplyResponseComment } from "../ReplyResponseComment";

type Props = {
    userId?: string;
    comment: CommentProps;
    task: Task;
    parent: CommentProps;
    socket?: any;
    tab: number;
	onClickImage?: (comment: CommentType, index: number) => void,
    handleUploadAttachments: (filesSelected: FileList | null, commentChildId: string) => void;
    handleUpdateDescriptionFile: (e: any) => void;
}

export const ChildResponseComment: FC<Props> = ({ userId, comment, parent, socket, tab, task, onClickImage, handleUploadAttachments, handleUpdateDescriptionFile }) => {
    const [collapseComment, setCollapseComment] = useState(true);
    const [showDetail, setShowDetail] = useState(false);
    const [openReply, setOpenReply] = useState(false);
    const detailRef = useRef<HTMLDivElement>(null);

    // useOnClickOutside(detailRef, () => setShowDetail(false));

    const receiversText = useMemo(() => {
        if (!comment.receivers) return 'Tới';

        const totalRemainPeople = comment.receivers.length - 2;
        const receiversWillShow = comment.receivers.slice(0, 2);
        const receiversName = receiversWillShow.map(receiver => receiver.bizfullname).join(', ');

        {/* tới Lê Lưu Phong-CPMI, Nguyễn Đắc Toàn-TRX và 3 người khác */ }
        const str = totalRemainPeople > 0 ? `${receiversName} và ${totalRemainPeople} người khác` : receiversName;

        return `Tới ${str}`;
    }, [comment.receivers]);

    const receiversFullText = useMemo(() => {
        if(!comment.receivers) return '';

        return comment.receivers.map(receiver => receiver.bizfullname).join(', ');
    }, [comment.receivers]);

    const handleCopyLinkAttachment = (path: string) => {
        const copyText = `${process.env.REACT_APP_URL_S3}${path}`;
        navigator.clipboard.writeText(copyText);
        toast.info('Đã copy link vào clipboard', { autoClose: 1000 });
    }

    return (
        <div className={"child-comment mt-4"}>
            <div className={"item-comment flex items-start border-b-0.5 border-primary-border pb-4"}>
                <img
                    alt={comment.author?.bizfullname}
                    src={comment?.author?.image ? `${process.env.REACT_APP_URL_S3_USER}/${comment?.author?.image}` : taskUserAvt}
                    className={"rounded-full overflow-hidden h-[44px] w-[44px] min-h-[44px] min-w-[44px] max-h-[44px] max-w-[44px] mx-2"}
                />
                <div className={"comment-content ml-4 flex-1"}>
                    <div className={"comment-content-wrapper"}>
                        <div className={"flex items-center justify-between"}>
                            <div className={"user-name"}>
                                <div className={"font-bold cursor-pointer"} onClick={() => setCollapseComment(!collapseComment)}>
                                    {comment.author?.bizfullname}
                                </div>
                                {
                                    !collapseComment &&
                                    <div className={"text-primary-gray flex items-center"}>
                                        <span className={"mr-2"}>
                                            {receiversText}
                                        </span>
                                        <button
                                            onClick={() => setShowDetail(!showDetail)}
                                            className={"relative"}>
                                            <img src={trigangleDown} alt={"-----"} />
                                            {
                                                showDetail &&
                                                <div
                                                    ref={detailRef}
                                                    className={"absolute top-full bg-white left-[50%] shadow-lg rounded-md max-w-[600px] min-w-[456px] p-3 z-10"}>
                                                    <table className={"table-fixed w-full"}>
                                                        <tbody>
                                                        <tr>
                                                            <td className={"text-primary-gray w-1/6 text-left py-2"}>
                                                                Từ
                                                            </td>
                                                            <td className={"text-left text-black py-2"}>
                                                                {comment.author?.bizfullname}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className={"text-primary-gray w-1/6 text-left py-2"}>
                                                                Tới
                                                            </td>
                                                            <td className={"text-left text-black py-2"}>
                                                                {receiversFullText}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className={"text-primary-gray w-1/6 text-left py-2"}>
                                                                Ngày tạo
                                                            </td>
                                                            <td className={"text-left text-black py-2"}>
                                                                {moment(comment.createAt).format('HH:mm DD/MM/YYYY')} ({moment(comment.createAt).fromNow()})
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            }
                                        </button>
                                    </div>
                                }
                            </div>
                            <div className={"comment-infor flex items-center"}>
                                <span className={"text-primary-gray"}>
                                    {moment(comment.createAt).format('HH:mm DD/MM/YYYY')} ({moment(comment.createAt).fromNow()})
                                </span>
                                {
                                    !collapseComment && (
                                        <button className={"mx-2"} onClick={() => setOpenReply(!openReply)}>
                                            <img src={iconReply} alt={"----"} className="h-[18px] w-[18px]" />
                                        </button>
                                    )
                                }
                                {
                                    (!collapseComment && userId === comment.author?._id) && (
                                        <label className="ml-1">
                                            <img
                                                src={iconUpload}
                                                alt="Icon attach"
                                                className="h-6 w-6"
                                            />
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="*"
                                                multiple
                                                onChange={e => handleUploadAttachments(e.target.files, comment._id)}
                                            />
                                        </label>
                                    )
                                }
                            </div>
                        </div>
                        <div
                            className={"comment-text mt-2 break-all"}
                            dangerouslySetInnerHTML={{
                                __html: nl2p((comment.content && collapseComment) ? sliceText(removeHTMLTags(comment.content), 0, 100) : comment.content)
                            }}
                        />
                        <div className={"comment-extra-content transition-all " + (collapseComment ? "h-0 overflow-hidden" : "")}>
                            {!!comment.files?.length && (
                                <div className={"comment-attach mt-4"}>
                                    {comment.files.map(file => (
                                        <div key={file._id} className={"comment-attach-item flex items-start justify-between mb-2"}>
                                            <img src={iconAttach} alt={file.nameOrg} />
                                            <div className={"text-cbs-highlight-color mx-2"}>
                                                <a href={`${process.env.REACT_APP_URL_S3}${file.path}`} download className={"text-primary"} target="_blank" rel="noreferrer">
                                                    {file.nameOrg} ({humanFileSize(file.size)})
                                                </a>
                                                <p className={"text-primary-gray text-xs"}>
                                                    {file.author?.bizfullname} - {moment(file.createAt).format('DD/MM/YYYY HH:mm')} ({moment(file.createAt).fromNow()})
                                                </p>
                                            </div>
                                            <input
                                                className={"flex-1 text-primary-gray text-center focus:outline-none focus:ring-none"}
                                                placeholder={"Nhập nội dung ghi chú"}
                                                data-fileid={file._id}
                                                defaultValue={file.description}
                                                onKeyUp={handleUpdateDescriptionFile}
                                            />
                                            <button onClick={handleCopyLinkAttachment.bind(null, file.path)}>
                                                <img src={iconLink} alt={file.path} />
                                            </button>
                                        </div>
                                    ))}
                                    {/* <div className={"comment-attach-item flex items-start justify-between mb-2"}>
                                    <img src={iconAttach} alt={"---"} />
                                    <div className={"comment-attach-item-file-infor mx-2"}>
                                        <a href={"#"} download className={"text-primary"}>20220223-CPMI.PGI.NBK.VPU-HopTraoDoi.pdf (111 KB)</a>
                                        <p className={"text-primary-gray text-xs"}>Vũ Thanh Bình-CPMI 25/02/2022 16:44 (1 day ago)</p>
                                    </div>
                                    <input className={"flex-1 text-primary-gray text-center focus:outline-none focus:ring-none"} placeholder={"Nhập nội dung ghi chú"} />
                                    <button>
                                        <img src={iconLink} alt={"---"} />
                                    </button>
                                </div> */}
                                </div>
                            )}

                            {!!comment.images?.length && (
                                <div className={"comment-images mt-4"}>
                                    <div className={"grid grid-cols-6 gap-4"}>
                                        {
                                            comment.images.map((image, index) => (
                                                <div key={image._id} className={" border-0.5 border-primary-border bg-cbs-form-input-bg mb-2"}>
                                                    <div className={"relative"} onClick={() => onClickImage?.(comment, index)}>
                                                        <img className={"h-[120px] max-h-[120px] min-h-[120px] object-cover w-full"} src={`${process.env.REACT_APP_URL_S3}${image.path}`} alt={image.nameOrg} />
                                                        <div className={"text-white px-2 py-4 bg-black opacity-60 absolute text-xs bottom-0 w-full truncate"}>
                                                            {moment(image.createAt).format('DD/MM/YYYY HH:mm')}
                                                            ({moment(image.createAt).fromNow()})
                                                        </div>
                                                    </div>
                                                    <textarea
                                                        className={"p-2 w-full text-xs h-[60px] min-h-[60px] max-h-[60px] bg-cbs-form-input-bg"}
                                                        placeholder={"Nhập nội dung ghi chú"}
                                                        data-fileid={image._id}
                                                        onKeyUp={handleUpdateDescriptionFile}
                                                        defaultValue={image.description}
                                                    ></textarea>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )}

                            {/* <div className={"comment-attach mt-4"}>
                                <div className={"comment-attach-item flex items-start justify-between mb-2"}>
                                    <img src={iconAttach} alt={"---"} />
                                    <div className={"comment-attach-item-file-infor mx-2"}>
                                        <a href={"#"} download className={"text-primary"}>20220223-CPMI.PGI.NBK.VPU-HopTraoDoi.pdf (111 KB)</a>
                                        <p className={"text-primary-gray text-xs"}>Vũ Thanh Bình-CPMI 25/02/2022 16:44 (1 day ago)</p>
                                    </div>
                                    <input className={"flex-1 text-primary-gray text-center focus:outline-none focus:ring-none"} placeholder={"Nhập nội dung ghi chú"} />
                                    <button>
                                        <img src={iconLink} alt={"---"} />
                                    </button>
                                </div>
                                <div className={"comment-attach-item flex items-start justify-between mb-2"}>
                                    <img src={iconAttach} alt={"---"} />
                                    <div className={"comment-attach-item-file-infor mx-2"}>
                                        <a href={"#"} download className={"text-primary"}>20220223-CPMI.PGI.NBK.VPU-HopTraoDoi.pdf (111 KB)</a>
                                        <p className={"text-primary-gray text-xs"}>Vũ Thanh Bình-CPMI 25/02/2022 16:44 (1 day ago)</p>
                                    </div>
                                    <input className={"flex-1 text-primary-gray text-center focus:outline-none focus:ring-none"} placeholder={"Nhập nội dung ghi chú"} />
                                    <button>
                                        <img src={iconLink} alt={"---"} />
                                    </button>
                                </div>
                            </div>

                            <div className={"comment-images mt-4"}>
                                <div className={"grid grid-cols-6 gap-4"}>
                                    <div className={" border-0.5 border-primary-border bg-cbs-form-input-bg mb-2"}>
                                        <div className={"relative"}>
                                            <img className={"h-[120px] max-h-[120px] min-h-[120px] object-cover w-full"} src={imageDemo} alt={"---"} />
                                            <div className={"text-white px-2 py-4 bg-black opacity-60 absolute text-xs bottom-0 w-full truncate"}>25/02/2022 16:44 (1 day ago)</div>
                                        </div>
                                        <textarea className={"p-2 w-full text-xs h-[60px] min-h-[60px] max-h-[60px] bg-cbs-form-input-bg"} placeholder={"Nhập nội dung ghi chú"}>
                                            Khu vực để xe của tòa nhà có cam bảo vệ, tại trục A1-A2 khu Z
                                        </textarea>
                                    </div>
                                    {
                                        [...Array(2)].map((e, i) => (
                                            <div key={i} className={" border-0.5 border-primary-border bg-cbs-form-input-bg mb-2"}>
                                                <div className={"relative"}>
                                                    <img className={"h-[120px] max-h-[120px] min-h-[120px] object-cover w-full"} src={imageDemo} alt={"---"} />
                                                    <div className={"text-white px-2 py-4 bg-black opacity-60 absolute text-xs bottom-0 w-full truncate"}>25/02/2022 16:44 (1 day ago)</div>
                                                </div>
                                                <textarea className={"p-2 w-full text-xs h-[60px] min-h-[60px] max-h-[60px] bg-cbs-form-input-bg"} placeholder={"Nhập nội dung ghi chú"}>
                                                </textarea>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div> */}

                            <div className={"comment-action mt-4 flex items-center justify-between"}>
                                <div className={"actions"}>
                                    <button
                                        className={"font-bold text-primary-gray mr-6"}
                                        onClick={() => setOpenReply(!openReply)}
                                    >
                                        Trả lời
                                    </button>
                                    {/* <button className={"font-bold text-primary-gray mr-6"}>
                                        Thích
                                    </button> */}
                                    {/* <span className={"text-primary-gray"}>15:30 22/12/2012 (2 day ago)</span> */}
                                </div>
                                {/* <div className={"reactions flex items-center"}>
                                    <span className={"text-secondary-gray mr-2"}>215</span>
                                    <div className={"flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-1.5"}>
                                        {
                                            listEmoji.map(reaction => (
                                                <img key={reaction.id} src={reaction.icon} alt="-----" className="w-[24px] h-[24px] rounded-full bg-slate-100 ring-2 ring-white" loading="lazy" />
                                            ))
                                        }
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    {openReply &&
                        <ReplyResponseComment
                            task={task}
                            parent={parent}
                            tab={tab}
                            socket={socket}
                            userId={userId}
                            receiversDefault={[{
                                label: comment.author?.bizfullname,
                                value: comment.author?._id,
                                image: comment.author?.image ? `${process.env.REACT_APP_URL_S3_USER}/${comment.author?.image}` : taskUserAvt
                            }]}
                            onCancelCreateResponse={() => setOpenReply(false)}
                            onConfirmCreate={() => setOpenReply(false)}
                        />
                    }

                </div>
            </div>
        </div>
    )
}