import {FC, useContext, useEffect, useMemo, useRef, useState} from "react";
import trigangleDown from "assets/images/triangle-down.svg";
import iconUpload from "assets/images/icons8-upload-48.svg";
import iconLink from "assets/images/icons8-link-96-v3.svg";
import iconReply from "assets/images/icons8-reply-arrow-48.svg";
import taskUserAvt from "assets/images/task-user.svg";
import iconAttach from "assets/images/icons8-attach-48.svg";
// import imageDemo from "assets/images/task-detail-image.png";
// import { listEmoji } from "../../../../../messages/pages/MessageHome/sections/ChattingSection";
import {ChildResponseComment} from "../ChildResponseComment";
import {Comment as CommentType, CommentPayload, CommentProps, Task} from "typings/task";
import moment from 'moment';
import {debounce} from 'lodash';
import {nl2p} from 'utils';
import {APP_KEY} from 'utils/constants';
import {APP_ID} from "apis/localdb";
import {humanFileSize} from 'utils/converter';
import useUploadFile, {modifyUploadedFilesV2} from 'services/hooks/useUploadFile';
import {validateFiles} from 'validation/file';
import {useUpload} from "services/hooks/useUpload";
import {toast} from "react-toastify";
import {useCommentPcm} from "services/hooks/useTask";
import CommentContext from "views/pcm/contexts/comment/comment.context";
import {ReplyResponseComment} from "../ReplyResponseComment";
import {captureException} from "@sentry/react";
import TaskRepository from "apis/task";
import {useFileCore} from 'services/hooks/useFileCore';
import {useOnClickOutside} from "../../../../../../services/hooks/useOnclickOutside";
import {OptionsComment} from "../OptionsComment";

type Props = {
    userId?: string;
    task: Task;
    comment: CommentProps;
    tab: number;
    socket?: any;
	onClickImage?: (comment: CommentType, index: number) => void,
    onConfirmUpdate?: () => void;
}

export const ParentResponseComment: FC<Props> = ({ userId, task, comment, tab, socket, onClickImage, onConfirmUpdate }) => {
    const [collapseComment, setCollapseComment] = useState(false);
    const [openReply, setOpenReply] = useState(false);
    const [isOfficial, setIsOfficial] = useState(comment.official);
	const [amountReply, setAmountReply] = useState(
        comment?.amountCommentReply > 0 ? comment?.amountCommentReply - 1 : 0
    );
    const [showDetail, setShowDetail] = useState(false);
    const detailRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(detailRef, () => setShowDetail(false));

	const { state, dispatch } = useContext(CommentContext);
	// const { current: socket }: any = useSocket();

    const { addFileToUpload } = useUpload({
        appID: APP_ID.PCM.id,
        companyID: task?.company?._id,
        projectID: task?.project?._id,
        groupID: task?.group?._id,
    });

	const { updateFileAsync } = useFileCore();
    const { updateCommentAsync } = useCommentPcm({});

    const [uploads, {
        setIDImageUploaded,
        setIDFileUploaded,
        // setUploadImage,
        // setUploadFile,
        // setUploadImageProgress,
        // setUploadFileProgress,
        // removeUploadedImage,
        // removeUploadedFile,
        // removeAllFiles
    }] = useUploadFile({});

    const commentsReply = (state.commentsReply[comment._id] || []).filter(Boolean);

	useEffect(() => {
		// Add last reply comment in first time render page
		if (commentsReply.length === 0 && comment.lastestReplyID) {
			dispatch({
				type: 'ADD_COMMENT',
				payload: comment.lastestReplyID
			});
		}
	}, [])

    const receiversText = useMemo(() => {
        if(!comment.receivers) return 'Tới';

        const totalRemainPeople = comment.receivers.length - 2;
        const receiversWillShow = comment.receivers.slice(0, 2);
        const receiversName = receiversWillShow.map(receiver => receiver.bizfullname).join(', ');

        const str = totalRemainPeople > 0 ? `${receiversName} và ${totalRemainPeople} người khác` : receiversName;

        {/* tới Lê Lưu Phong-CPMI, Nguyễn Đắc Toàn-TRX và 3 người khác */}
        return `Tới ${str}`;
    }, [comment.receivers]);

    const receiversFullText = useMemo(() => {
        if(!comment.receivers) return '';

        return comment.receivers.map(receiver => receiver.bizfullname).join(', ');
    }, [comment.receivers]);

    const handleCheckOfficial = async () => {
        try {
            const dataUpdate: any = {
                taskID: comment.task?._id,
                commentID: comment._id,
                isOfficial: true,
            }

            const { error, data } = await updateCommentAsync(dataUpdate);

            if(error) {
                return toast.warn(data?.message || 'Đánh dấu chính thức thất bại')
            }

            setIsOfficial(true);
            onConfirmUpdate?.();
        } catch(error) {
			captureException(error);
            if (typeof error === "string") {
				toast.error(error);
			} else if (error instanceof Error) {
				toast.error(error.message);
			}
        }
    }

    // Handle for parent/child comment
    const handleUploadAttachments = async (fileSelected: FileList | null, commentChildId?: string) => {
        if (!fileSelected || !fileSelected?.length) return;

        const validation = await validateFiles(fileSelected);
        if (validation.error) return toast.warn(validation.message);

        const [files, images] = modifyUploadedFilesV2({
            imgLastKey: Object.keys(uploads.images).length || null,
            fileLastKey: Object.keys(uploads.files).length || null,
        }, fileSelected);

        const filesID: string[] = [];
        const imagesID: string[] = [];

        // setUploadImage(images);
        // setUploadFile(files);

        // Upload images
        for (const [key, { file }] of Object.entries(images)) {
            const { _id } = await addFileToUpload({
                files: file,
                fileType: 1,
                progress: percentCompleted => {
                    console.log(`${percentCompleted}%`, key);
                    // setUploadImageProgress(key, percentCompleted)
                }
            })
            _id && imagesID.push(_id);
            setIDImageUploaded(key, _id);
        }

        // Upload files
        for (const [key, { file }] of Object.entries(files)) {
            const { _id } = await addFileToUpload({
                files: file,
                fileType: 2,
                progress: percentCompleted => {
                    console.log(`${percentCompleted}%`, key);
                    // setUploadFileProgress(key, percentCompleted)
                }
            })
            _id && filesID.push(_id);
            setIDFileUploaded(key, _id);
        }

        handleUpdateResponseComment({
            files: filesID,
            images: imagesID,
            commentID: commentChildId || comment._id,
            parentID: commentChildId ? comment._id : null,
        });
    }

    const handleUpdateResponseComment = async (values: any) => {
        try {
            const dataUpdate: CommentPayload = {
                ...values,
                taskID: comment.task?._id,
                type: 1,
            }

            const { error, data } = await updateCommentAsync(dataUpdate);

            if(error) {
                return toast.warn(data?.message || 'Cập nhật bình luận thất bại')
            }

            dispatch({
                type: 'UPDATE_COMMENT',
                payload: {
                    commentID: values.commentID,
                    parent: values?.parentID,
                    body: data,
                }
            });

            socket?.emit('COMMENT_CSS_ADD_COMMENT', {
				app: APP_KEY.PCM_PLAN_TASK,
				objectID: comment.task?._id,
				method: 'UPDATE',
				parentID: values?.parentID,
				commentType: 'COMMENT',
				infoComment: data,
				populates: JSON.stringify({
					path: 'project author'
				})
			})
        } catch(error) {
			captureException(error);
            if (typeof error === "string") {
				toast.error(error);
			} else if (error instanceof Error) {
				toast.error(error.message);
			}
        }
    }

    const handleUpdateDescriptionFile = debounce(async (e: any) => {
		await updateFileAsync({
			fileID: e.target.dataset.fileid,
			description: e.target.value
		});
	}, 1000)

    const handleClickViewMore = async () => {
		const lastestID = commentsReply.length ? commentsReply[0]._id : null;

		const { error, data } = await TaskRepository.listComments({
			lastestID,
			taskID: comment.task?._id,
			parentID: comment._id,
		});
		setAmountReply(amountReply - 5);

		if (!error && data?.listRecords?.length) {
			dispatch({
				type: 'VIEW_MORE_COMMENTS_REPLY',
				payload: {
					parent: comment._id,
					comments: data?.listRecords?.reverse()
				}
			});
		}
	}

    const handleCopyLinkAttachment = (path: string) => {
        const copyText = `${process.env.REACT_APP_URL_S3}${path}`;
        navigator.clipboard.writeText(copyText);
        toast.info('Đã copy link vào clipboard', { autoClose: 1000 });
    }

    const handleClickImage = (index: number) => {
		onClickImage?.(comment, index);
	}
    
    if (!comment) return <></>;
    
    if (task.subtype === 4 && task.openedStatus === 0) {
        const currentTime = new Date().getTime();
        const actualFinishTime = new Date(task.actualFinishTime).getTime();
        // now(FE)<=infoTask.actualFinishTime và infoTask.openedStatus=0
        if (currentTime < actualFinishTime) {
            // Chỉ người thực hiện mới nhìn thấy comment
            if (task?.assignee?._id !== userId && comment.official) {
                return <></>;
            }
        }
    };

    return (
        <div className={"item-comment flex items-start border-b-0.5 border-primary-border pb-4 mb-3"}>
            <img
                alt={comment.author?.bizfullname}
                src={comment?.author?.image ? `${process.env.REACT_APP_URL_S3_USER}/${comment?.author?.image}` : taskUserAvt}
                className={"rounded-full overflow-hidden h-[44px] w-[44px] min-h-[44px] min-w-[44px] max-h-[44px] max-w-[44px] mx-2"}
            />
            <div className={"comment-content ml-4 flex-1"}>
                <div className={"comment-content-wrapper"}>
                    <div className={"flex items-center justify-between"}>
                        <div className={"user-name"}>
                            <div className={"font-bold"}>{comment.author?.bizfullname}</div>
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
                                                className={"absolute top-full bg-white left-[50%] shadow-lg rounded-md max-w-[600px] min-w-[600px] p-3 z-10"}>
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
                                    <button className={"mx-4"} onClick={() => setOpenReply(!openReply)}>
                                        <img src={iconReply} alt={"----"} className="h-[18px] w-[18px]"/>
                                    </button>
                                )
                            }
                            {userId === comment.author?._id && (
                                <input
                                    className="form-check-input mx-4"
                                    type="checkbox"
                                    disabled={isOfficial}
                                    defaultChecked={isOfficial}
                                    onChange={handleCheckOfficial}
                                />
                            )}
                            {
                                (!collapseComment && userId === comment.author?._id) && (
                                    <OptionsComment
                                        handleUploadAttachments={(files => handleUploadAttachments(files))}
                                    />
                                )
                            }
                        </div>
                    </div>
                    <div
                        className={"comment-text mt-2 break-all"}
                        dangerouslySetInnerHTML={{
                            __html: nl2p(comment.content)
                        }}
                    />

                    <div className={"comment-extra-content transition-all " + (collapseComment ? "h-0 overflow-hidden" : "")}>
                        {!!comment.files?.length && (
                            <div className={"comment-attach mt-4"}>
                                {comment.files.map(file => (
                                    <div key={file._id} className={"comment-attach-item flex items-start justify-between mb-2"}>
                                        <img src={iconAttach} alt={file.nameOrg} />
                                        <div className={"text-cbs-highlight-color mx-2"}>
                                            <a href={`${process.env.REACT_APP_URL_S3}${file.path}`} download className={"text-primary"}>
                                                {file.nameOrg} ({humanFileSize(file.size)})
                                            </a>
                                            <p className={"text-primary-gray text-xs"}>
                                                {file.author?.bizfullname}
                                                {moment(file.createAt).format('DD/MM/YYYY HH:mm')}
                                                ({moment(file.createAt).fromNow()})
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
                                    {/* <div className={" border-0.5 border-primary-border bg-cbs-form-input-bg mb-2"}>
                                        <div className={"relative"}>
                                            <img className={"h-[120px] max-h-[120px] min-h-[120px] object-cover w-full"} src={imageDemo} alt={"---"} />
                                            <div className={"text-white px-2 py-4 bg-black opacity-60 absolute text-xs bottom-0 w-full truncate"}>
                                                {moment(file.createAt).format('DD/MM/YYYY HH:mm')}
                                                ({moment(file.createAt).fromNow()})
                                            </div>
                                        </div>
                                        <textarea className={"p-2 w-full text-xs h-[60px] min-h-[60px] max-h-[60px] bg-cbs-form-input-bg"} placeholder={"Nhập nội dung ghi chú"}>
                                            Khu vực để xe của tòa nhà có cam bảo vệ, tại trục A1-A2 khu Z
                                        </textarea>
                                    </div> */}
                                    {
                                        comment.images.map((image, index) => (
                                            <div key={image._id} className={" border-0.5 border-primary-border bg-cbs-form-input-bg mb-2"}>
                                                <div className={"relative"} onClick={() => handleClickImage(index)}>
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

                        <div className={"comment-action mt-4 flex items-center justify-between"}>
                            <div className={"actions"}>
                                <button
                                    className={"font-bold text-primary-gray mr-6"}
                                    onClick={() => setOpenReply(!openReply)}
                                >
                                    Trả lời
                                </button>
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
                        parent={comment}
                        tab={tab}
                        socket={socket}
                        userId={userId}
                        onCancelCreateResponse={() => setOpenReply(false)}
                        onConfirmCreate={() => setOpenReply(false)}
                    />
                }

                {amountReply > 0 && (
                    <button className={"font-bold text-primary-gray my-2"} onClick={handleClickViewMore}>
                        Xem {amountReply} phản hồi trước
                    </button>
                )}

                {!!commentsReply.length && commentsReply.map((commentReply, index) => (
                    <ChildResponseComment
                        key={commentReply._id}
                        userId={userId}
                        comment={commentReply}
                        onClickImage={onClickImage}
                        handleUploadAttachments={handleUploadAttachments}
                        handleUpdateDescriptionFile={handleUpdateDescriptionFile}
                    />
                ))}
            </div>
        </div>
    )
}