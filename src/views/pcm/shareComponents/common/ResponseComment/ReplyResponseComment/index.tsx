import { FC, useRef, useState, useContext, useMemo } from "react";
import Axios from 'axios';
import { captureException } from "@sentry/react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as EditorType } from "tinymce";
import { SendToMultiSelected } from "views/pcm/shareComponents/common/SendToMultiSelected";
import { Item } from "shareComponents/common";
import { CommentPayload, CommentProps, Task } from "typings/task";
import { toast } from "react-toastify";
import { useCommentPcm } from "services/hooks/useTask";
import CommentContext from "views/pcm/contexts/comment/comment.context";
import { APP_KEY } from "utils/constants";
import iconAttach from 'assets/images/icons8-attach-50.png';
import { IconImage } from 'views/media/shareComponents/common';
import useUploadFile, { modifyUploadedFilesV2 } from 'services/hooks/useUploadFile';
import { validateFiles } from 'validation/file';
import { useUpload } from 'services/hooks/useUpload';
import { PostImage, PostFile } from 'shareComponents/common';
import classNames from 'classnames';
import { toArray } from 'lodash';
import { FileProps, FilePropsUpload } from 'typings/common';
import taskUserAvt from "assets/images/task-user.svg";

type Props = {
    task: Task;
    parent?: CommentProps;
    userId?: string;
    tab: number;
    socket?: any;
    receiversDefault?: Item[];
    onCancelCreateResponse: () => void;
    onConfirmCreate?: () => void;
}

export const ReplyResponseComment: FC<Props> = ({ task, parent, userId, tab, socket, receiversDefault, onCancelCreateResponse, onConfirmCreate }) => {
    const refDivFile = useRef<HTMLDivElement | null>(null);
    const editorRef = useRef<EditorType>();
    // const [rawContent, setRawContent] = useState('');

    const initUsersSelected = useMemo(() => {
        if(receiversDefault?.length) return receiversDefault;

        let arr = [];

        if(parent) {
            const { _id, bizfullname, image } = parent.author;
            arr = [{
                label: bizfullname,
                value: _id,
                image: image ? `${process.env.REACT_APP_URL_S3_USER}/${image}` : taskUserAvt
            }];

            if(_id === userId) {
                return arr;
            }
        } else{
            if(task.accessUsers && task.accessUsers.length) {
                arr = task.accessUsers.map(({ bizfullname, _id, image }) => ({
                    label: bizfullname,
                    value: _id,
                    image: image ? `${process.env.REACT_APP_URL_S3_USER}/${image}` : taskUserAvt
                }))
            } else{
                const accessUsers = [task.author, task.assignee, ...task.related];
                arr = accessUsers.map(({ bizfullname, _id, image }) => ({
                    label: bizfullname,
                    value: _id,
                    image: image ? `${process.env.REACT_APP_URL_S3_USER}/${image}` : taskUserAvt
                }))
            }
        }

        return arr.filter((item, index, self) => {
            return item.value !== userId && index === self.findIndex((el) => el.value === item.value);
        });
    }, [task, parent, receiversDefault])

    const [selectedUser, setSelectedUser] = useState<Item[]>(initUsersSelected);
    const [isUploading, setIsUploading] = useState(false);
    const [tokens, setTokens] = useState<any[]>([]);

    const [uploads, {
        setUploadImageProgress,
        setUploadFileProgress,
        setIDImageUploaded,
        setIDFileUploaded,
        setUploadImage,
        setUploadFile,
        removeAllFiles,
        removeUploadedImage,
        removeUploadedFile
    }] = useUploadFile({});

    const { dispatch } = useContext(CommentContext);

    const { addFileToUpload } = useUpload({
        appID: APP_KEY.PCM_PLAN_TASK,
        companyID: task.company?._id,
        projectID: task.project?._id,
        groupID: task.group?._id,
        taskID: task._id
    });

    const { createCommentAsync } = useCommentPcm({});

    const getCancelTokenRequest = (key: string, file: any) => {
        const CancelToken = Axios.CancelToken;
        const source = CancelToken.source();

        setTokens(previousValue => ([
            ...previousValue,
            {
                key,
                file,
                source
            }
        ]))

        return source;
    }

    const handleSetFiles = async (filesSelected: FileList | null) => {
        if (!filesSelected) return;

        const { error, message } = await validateFiles(filesSelected);
        if (error) return toast.warn(message);

        const [files, images] = modifyUploadedFilesV2({
            imgLastKey: Object.keys(uploads.images).length || null,
            fileLastKey: Object.keys(uploads.files).length || null,
        }, filesSelected);

        setIsUploading(true);
        setUploadImage(images);
        setUploadFile(files);

        // Upload images
        for (const [key, { file }] of Object.entries(images)) {
            const source = getCancelTokenRequest(key, file);
            const { _id } = await addFileToUpload({
                files: file,
                fileType: 1,
                source,
                progress: percentCompleted => {
                    console.log(`${percentCompleted}%`, key);
                    setUploadImageProgress(key, percentCompleted)
                }
            })
            setIDImageUploaded(key, _id);
        }

        // Upload files
        for (const [key, { file }] of Object.entries(files)) {
            const source = getCancelTokenRequest(key, file);
            const { _id } = await addFileToUpload({
                files: file,
                fileType: 2,
                source,
                progress: percentCompleted => {
                    console.log(`${percentCompleted}%`, key);
                    setUploadFileProgress(key, percentCompleted)
                }
            })
            setIDFileUploaded(key, _id);
        }

        setIsUploading(false);
    }

    const handleCreateResponseComment = async () => {
        if (!editorRef.current) return;

        const contentRaw = editorRef.current?.getContent({ format: 'raw' });
        const contentText = editorRef.current?.getContent({ format: 'text' });

        let images: string[] = [];
        let files: string[] = [];

        // Get MessageList file uploaded
        for (const [, { _id }] of Object.entries(uploads.images)) {
            _id && (images = [...images, _id]);
        }

        for (const [, { _id }] of Object.entries(uploads.files)) {
            _id && (files = [...files, _id]);
        }

        if (!files.length && !images.length && !contentText) return;

        try {
            const dataInsert: CommentPayload = {
                taskID: task?._id,
                content: contentRaw,
                rawContent: contentText,
                parentID: parent?._id,
                type: 1,
                isOfficial: tab === 2,
                files,
                images,
            }

            switch (tab) {
                case 1:
                case 2:
                    dataInsert.type = 1;
                    break;
                default:
                    dataInsert.type = tab;
                    break;
            }

            if (selectedUser.length) {
                dataInsert.receiversID = selectedUser.map(user => user.value) as string[];
            }

            const { error, data } = await createCommentAsync(dataInsert);

            if (error) {
                return toast.warn(data?.message || 'Tạo bình luận thất bại')
            }

            socket?.emit('COMMENT_CSS_ADD_COMMENT', {
                app: APP_KEY.PCM_PLAN_TASK,
                objectID: task?._id,
                method: 'INSERT',
                parentID: parent?._id,
                commentType: 'COMMENT',
                infoComment: data,
                populates: JSON.stringify({
                    path: 'project author'
                })
            });
            socket?.emit('SUBJECT_PCM_CSS_UPDATE_NOTIFICATION', { taskID: task?._id, isGetCountNotification: true });

            // Clear text input
            removeAllFiles();
            onConfirmCreate?.();
            dispatch({ type: 'ADD_COMMENT', payload: data });
        } catch (error) {
            captureException(error);
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    }

    const handleRemoveUpload = (file: FileProps | FilePropsUpload, type: 'FILE' | 'IMAGE') => {
        if ('id' in file) {
            const token = tokens.find(item => (item.key == file.id) && (item?.file?.name === file?.file?.name))
            token && token?.source?.cancel('Operation request canceled by the user.');

            type === 'IMAGE' ? removeUploadedImage(file.id) : removeUploadedFile(file.id);
        } else {
            const token = tokens.find(item => (item.key == file._id) && (item?.file?.name === file?.name))
            token && token?.source?.cancel('Operation request canceled by the user.');

            type === 'IMAGE' ? removeUploadedImage(file._id) : removeUploadedFile(file._id);
        }
    }

    const handleCancelCreateResponseComment = () => {
        tokens.map(token => {
            token?.source?.cancel('Operation request canceled by the user.');
        })

        removeAllFiles();
        onCancelCreateResponse();
    }

    const handlePasteFile = (event: any) => {
		// event.preventDefault();

		if(event.clipboardData?.files?.length) {
		  return handleSetFiles(event.clipboardData.files)
		}

		const text = event.clipboardData.getData('text/plain');
		text && window.document.execCommand('insertText', false, text);
	}

    return (
        <>
            <div className={"mt-2 editor ml-12 border border-primary-border rounded"} id="input-comment">
                <div className={"px-2 py-4"}>
                    <SendToMultiSelected
                        projectId={task.project?._id}
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                    />
                </div>
                <Editor
                    onInit={(evt, editor) => {
                        editorRef.current = editor;
                    }}
                    onPaste={handlePasteFile}
                    apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                    init={{
                        height: "350px",
                        force_br_newlines: true,
                        force_p_newlines : false,
                        forced_root_block : '',
                        menu: {
                            file: { title: "File", items: "newdocument restoredraft | preview | print | basicitem " },
                            edit: { title: "Edit", items: "undo redo | cut copy paste | selectall | searchreplace" },
                            view: { title: "View", items: "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen" },
                            insert: {
                                title: "Insert",
                                items: `image link media template codesample inserttable |
                                                    charmap emoticons hr |
                                                    pagebreak nonbreaking anchor toc |
                                                    insertdatetime`,
                            },
                            format: {
                                title: "Format",
                                items:
                                    "bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat",
                            },
                            tools: { title: "Tools", items: "spellchecker spellcheckerlanguage | code wordcount" },
                            table: { title: "Table", items: "inserttable | cell row column | tableprops deletetable" },
                            help: { title: "Help", items: "help" },
                        },
                        plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace code",
                            "insertdatetime media table paste code help wordcount",
                        ],
                        fullpage_default_title: "My default page title",
                        setup(editor) {
                            editor.on("Paste input Undo Redo", () => {
                                editor.save();
                            });
                            editor.ui.registry.addMenuItem("basicitem", {
                                text: "Save",
                                onAction: function (e) {
                                    editor.save({ immediate: true });
                                },
                                icon: "save",
                            });

                            editor.on('dragover', function(e) {
                                e.stopPropagation();
                                e.preventDefault();
                            });

                            editor.on('drop', function(e) {
                                e.stopPropagation();
                                e.preventDefault();
                                if (e.dataTransfer) {
                                    tokens.map(token => {
                                        token?.source?.cancel('Operation request canceled by the user.');
                                    })

                                    removeAllFiles();
                                    handleSetFiles(e.dataTransfer.files);
                                }
                            });
                        },
                    }}
                />
            </div>
            <div
                className={
                    classNames("flex flex-wrap max-h-44 w-full pr-4 pl-12 py-2 custom-scroll overflow-x-hidden overflow-y-auto",
                        (!Object.keys(uploads.images).length && !Object.keys(uploads.files).length) ? "h-0" : "")
                }
                ref={refDivFile}
            >
                <PostFile
                    files={toArray(uploads.files)}
                    onRemove={handleRemoveUpload}
                    className="text-black w-full"
                />
                <PostImage
                    images={toArray(uploads.images)}
                    onRemove={handleRemoveUpload}
                    className="post__files-row pt-5 text-black gap-5 flex-wrap"
                />
            </div>
            <div className={"flex items-center justify-between mt-2"}>
                <div className="flex pl-12">
                    <label className="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-300 flex justify-center items-center cursor-pointer mr-2">
                        <IconImage />
                        <input
                            type="file"
                            name="images"
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={e => handleSetFiles(e.target.files)}
                        />
                    </label>
                    <label className="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-300 flex justify-center items-center cursor-pointer">
                        <img
                            src={iconAttach}
                            alt="Icon attach"
                            className="h-6 w-6"
                        />
                        <input
                            type="file"
                            name="files"
                            className="hidden"
                            accept="*"
                            multiple
                            onChange={e => handleSetFiles(e.target.files)}
                        />
                    </label>
                </div>
                <div>
                    <button
                        className={"py-2 px-4 bg-cbs-form-input-bg rounded text-primary-gray mr-4"}
                        onClick={handleCancelCreateResponseComment}
                    >
                        Bỏ qua
                    </button>
                    <button
                        className={classNames("py-2 px-4 bg-primary rounded text-white", {
                            'disabled:opacity-60': isUploading
                        })}
                        onClick={handleCreateResponseComment}
                        disabled={isUploading}
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </>
    )
}