import React, { FC, useRef, useState } from "react";
import iconNote from "assets/images/icons8-note-48.svg";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as EditorType } from "tinymce";
import { Task } from "typings/task";
import { useTask } from "services/hooks/useTask";

type Props = {
    task: Task;
    refetchInfo?: () => void;
}

export const TaskDetailDescription: FC<Props> = ({ task, refetchInfo }) => {
    const editorRef = useRef<EditorType>();
    const [editDescription, setEditDescription] = useState(false);

    const { updateTaskAsync } = useTask({});

    const handleUpdateDescription = async () => {
        if (editorRef.current) {
            const description = editorRef.current.getContent();
            await updateTaskAsync({
                taskID: task._id,
                isUpdateNews: true,
                description
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
            </div>
        </div>
    )
}