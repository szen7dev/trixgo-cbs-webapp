import React, { FC, useRef, useState } from "react";
import iconNote from "assets/images/icons8-note-48.svg";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as EditorType } from "tinymce";
import { Task } from "typings/task";
import { useTask } from "services/hooks/useTask";
import { humanFileSize } from 'utils/converter';
import iconAttach from "assets/images/icons8-attach-48.svg";
import iconLink from "assets/images/icons8-link-96-v3.svg";
import imageDemo from "assets/images/task-detail-image.png";
import moment from "moment";

type Props = {
    task: Task;
    refetchInfo?: () => void;
}

export const TaskDetailDescription: FC<Props> = ({ task, refetchInfo }) => {
    // console.log(task)
    // console.log(task.authorAttachs.length)

    const editorRef = useRef<EditorType>();
    const [editDescription, setEditDescription] = useState(false);

    const { updateTaskAsync } = useTask({});

    const handleUpdateDescription = async () => {
        if (editorRef.current) {
            const contentRaw = editorRef.current.getContent({ format: 'raw' });

            await updateTaskAsync({
                taskID: task._id,
                isUpdateNews: true,
                description: contentRaw
            });
            refetchInfo?.();
            setEditDescription(false);
        }
    }

    return (
        <div className={"task-description flex items-start mt-5"}>
            <span className={"mr-4"}>
                <img src={iconNote} alt={'-----'} />
            </span>
            <div className={"flex-1"}>
                <div className={"text-primary-gray text-[16px] font-bold"}>Mô tả</div>
                <div className={"mt-2"} dangerouslySetInnerHTML={{
                    __html: (editDescription && task.description) ? task.description : task.description?.replace(/\n/g, '<br />')
                }} />
                <div className={"mt-2 editor"}>
                    {
                        (!editDescription && !task.description) ?
                            <div
                                onClick={() => setEditDescription(true)}
                                className={"bg-cbs-form-input-bg border-0.5 border-primary-border px-4 pt-2 h-[60px] cursor-pointer rounded text-primary-gray"}>
                                Biên soạn nội dung mô tả...
                            </div> : (
                                !task.description ? (
                                    <>
                                        <Editor
                                            onInit={(evt, editor) => {
                                                editorRef.current = editor;
                                            }}
                                            apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                                            initialValue={task.description}
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
                                        <div className={"flex items-center justify-end mt-2"}>
                                            <button
                                                onClick={() => setEditDescription(false)}
                                                className={"py-2 px-4 bg-cbs-form-input-bg rounded text-primary-gray mr-4"}>
                                                Bỏ qua
                                            </button>
                                            <button className={"py-2 px-4 bg-primary rounded text-white"} onClick={handleUpdateDescription}>
                                                Xác nhận
                                            </button>
                                        </div>
                                    </>
                                ) : <></>
                            )
                    }
                </div>
                {/*  UI DEMO  */}
                { task.authorAttachs?.length ? (
                    <div className={"mt-2"}>
                        <div className={"user-attach mt-4"}>
                            {task.authorAttachs?.map(file => {
                                if (file.type == '1') return;

                                return (
                                    <div key={file._id} className={"comment-attach-item flex items-start justify-between mb-2"}>
                                        <img src={iconAttach} alt={"---"} />
                                        <div className={"comment-attach-item-file-infor mx-2"}>
                                            <a href={`${process.env.REACT_APP_URL_S3}/${file.path}`} download className={"text-primary"}>
                                                {file.nameOrg} ({humanFileSize(file.size)})
                                            </a>
                                            <p className={"text-primary-gray text-xs"}>
                                                {file.author?.bizfullname}
                                                {moment(file.createAt).format('DD/MM/YYYY HH:mm')} {moment(file.createAt).fromNow()}
                                            </p>
                                        </div>
                                        <input
                                            className={"flex-1 text-primary-gray text-center focus:outline-none focus:ring-none"}
                                            placeholder={"Nhập nội dung ghi chú"}
                                        />
                                        <button>
                                            <img src={iconLink} alt={"---"} />
                                        </button>
                                    </div>
                                )
                            })}
                        </div>

                        <div className={"user-images mt-4"}>
                            <div className={"grid grid-cols-6 gap-4"}>
                                {
                                    task.authorAttachs?.map(file => {
                                        if(file.type == '2') return;

                                        return (
                                            <div key={file._id} className={" border-0.5 border-primary-border bg-cbs-form-input-bg mb-2"}>
                                                <div className={"relative"}>
                                                    <img
                                                        className={"h-[120px] max-h-[120px] min-h-[120px] object-cover w-full"}
                                                        src={`${process.env.REACT_APP_URL_S3}/${file.path}`}
                                                        alt={file.nameOrg}
                                                    />
                                                    <div className={"text-white px-2 py-4 bg-black opacity-60 absolute text-xs bottom-0 w-full truncate"}>
                                                        {moment(file.createAt).format('DD/MM/YYYY HH:mm')} {moment(file.createAt).fromNow()}
                                                    </div>
                                                </div>
                                                <textarea className={"p-2 w-full text-xs h-[60px] min-h-[60px] max-h-[60px] bg-cbs-form-input-bg"} placeholder={"Nhập nội dung ghi chú"}>
                                                </textarea>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                ) : <></>}
                { task.assigneeAttachs?.length ? (
                    <div className={"mt-2"}>
                        <div className={"user-attach mt-4"}>
                            {task.assigneeAttachs?.map(file => {
                                if (file.type == '1') return;

                                return (
                                    <div key={file._id} className={"comment-attach-item flex items-start justify-between mb-2"}>
                                        <img src={iconAttach} alt={"---"} />
                                        <div className={"comment-attach-item-file-infor mx-2"}>
                                            <a href={`${process.env.REACT_APP_URL_S3}${file.path}`} download className={"text-primary"}>
                                                {file.nameOrg} ({humanFileSize(file.size)})
                                            </a>
                                            <p className={"text-primary-gray text-xs"}>
                                                {file.author?.bizfullname}
                                                {moment(file.createAt).format('DD/MM/YYYY HH:mm')} {moment(file.createAt).fromNow()}
                                            </p>
                                        </div>
                                        <input
                                            className={"flex-1 text-primary-gray text-center focus:outline-none focus:ring-none"}
                                            placeholder={"Nhập nội dung ghi chú"}
                                        />
                                        <button>
                                            <img src={iconLink} alt={"---"} />
                                        </button>
                                    </div>
                                )
                            })}
                        </div>

                        <div className={"user-images mt-4"}>
                            <div className={"grid grid-cols-6 gap-4"}>
                                {
                                    task.assigneeAttachs?.map(file => {
                                        if(file.type == '2') return;

                                        return (
                                            <div key={file._id} className={" border-0.5 border-primary-border bg-cbs-form-input-bg mb-2"}>
                                                <div className={"relative"}>
                                                    <img
                                                        className={"h-[120px] max-h-[120px] min-h-[120px] object-cover w-full"}
                                                        src={`${process.env.REACT_APP_URL_S3}${file.path}`}
                                                        alt={file.nameOrg}
                                                    />
                                                    <div className={"text-white px-2 py-4 bg-black opacity-60 absolute text-xs bottom-0 w-full truncate"}>
                                                        {moment(file.createAt).format('DD/MM/YYYY HH:mm')} {moment(file.createAt).fromNow()}
                                                    </div>
                                                </div>
                                                <textarea className={"p-2 w-full text-xs h-[60px] min-h-[60px] max-h-[60px] bg-cbs-form-input-bg"} placeholder={"Nhập nội dung ghi chú"}>
                                                </textarea>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                ) : <></>}
            </div>
        </div>
    )
}