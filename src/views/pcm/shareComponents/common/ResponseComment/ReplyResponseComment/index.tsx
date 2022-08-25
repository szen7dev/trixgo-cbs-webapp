import React, { FC, useRef, useState, useContext } from "react";
import { captureException } from "@sentry/react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as EditorType } from "tinymce";
import { SendToMultiSelected } from "views/pcm/shareComponents/common/SendToMultiSelected";
import { Item } from "shareComponents/common";
import { CommentPayload, CommentProps, Task } from "typings/task";
import { toast } from "react-toastify";
import { useCommentPcm } from "services/hooks/useTask";
import CommentContext from "views/pcm/contexts/comment/comment.context";
import { useSocket } from "services/hooks/useSocket";
import { APP_KEY } from "utils/constants";

type Props = {
    task: Task;
    parent?: CommentProps;
    isOfficial?: boolean;
    onCancelCreateResponse: () => void;
    onConfirmCreate?: () => void;
}

export const ReplyResponseComment: FC<Props> = ({ task, parent, isOfficial = false, onCancelCreateResponse, onConfirmCreate }) => {
    const editorRef = useRef<EditorType>();
    const [selectedUser, setSelectedUser] = useState<Item[]>([]);

    const { dispatch } = useContext(CommentContext);
	const { current: socket }: any = useSocket();

    const { createCommentAsync } = useCommentPcm({});

    const handleCreateResponseComment = async () => {
        if(!editorRef.current) return;

        if(!editorRef.current?.getContent()) {
            return toast.warn("Vui lòng nhập nội dung trả lời");
        }

        try {
            const dataInsert: CommentPayload = {
                taskID: task?._id,
			    content: editorRef.current?.getContent(),
                parentID: parent?._id,
                type: 1,
                isOfficial
            }

            if(selectedUser.length) {
                dataInsert.receiversID = selectedUser.map(user => user.id) as string[];
            }

            const { error, data } = await createCommentAsync(dataInsert);

            if(error) {
                return toast.warn(data?.message || 'Tạo bình luận thất bại')
            }

            onConfirmCreate?.();
            dispatch({ type: 'ADD_COMMENT', payload: data });

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
			})

			// socket?.emit('NOTIFICATION_CSS_RECEIVE_NEW_NOTIFICATION', {
			// 	receivers: data.receiversNoti
			// });
        } catch(error) {
			captureException(error);
            if (typeof error === "string") {
				toast.error(error);
			} else if (error instanceof Error) {
				toast.error(error.message);
			}
        }
    }

    return (
        <>
            <div className={"mt-2 editor ml-12 border border-primary-border rounded"}>
                <div className={"px-2 py-4"}>
                    <SendToMultiSelected selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                </div>
                <Editor
                    // onActivate={}
                    onInit={(evt, editor) => {
                        editorRef.current = editor;
                    }}
                    // disabled={user?.email !== 'contact@trixgo.com'}
                    apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                    // onSaveContent={handleSave}
                    init={{
                        height: "350px",
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

                        // images_upload_url: "/api/upload/image",
                        // file_picker_types: "image",
                        // images_upload_handler: imagesUploadHandler,
                        // menubar: user?.email === 'contact@trixgo.com',
                        // toolbar: user?.email === 'contact@trixgo.com' ?
                        //     "undo redo | formatselect | " +
                        //     "bold italic backcolor | alignleft aligncenter " +
                        //     "alignright alignjustify | bullist numlist outdent indent | " +
                        //     "removeformat | help | image" : false,
                        // content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        // content_css: "document",
                        // save_enablewhendirty: true,
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
                        },
                    }}
                />
            </div>
            <div className={"flex items-center justify-end mt-2"}>
                <button className={"py-2 px-4 bg-cbs-form-input-bg rounded text-primary-gray mr-4"} onClick={onCancelCreateResponse}>
                    Bỏ qua
                </button>
                <button className={"py-2 px-4 bg-primary rounded text-white"} onClick={handleCreateResponseComment}>
                    Xác nhận
                </button>
            </div>
        </>
    )
}