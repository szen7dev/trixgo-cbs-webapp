import React, {FC, useRef, useState} from "react";
import iconNote from "assets/images/icons8-note-48.svg";
import {Editor} from "@tinymce/tinymce-react";
import {Editor as EditorType} from "tinymce";

export const TaskDetailDescription:FC = () => {
    const editorRef = useRef<EditorType>();
    const [editDescription, setEditDescription] = useState(false);
    return (
        <div className={"task-description flex items-start mt-5"}>
                    <span className={"mr-4"}>
                        <img src={iconNote} alt={'-----'}/>
                    </span>
            <div className={"flex-1"}>
                <div className={"text-primary-gray text-lg font-bold"}>Mô tả</div>
                <div className={"mt-2"}>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Bộ trưởng Tư pháp Mỹ Garland nói đã "đích thân phê duyệt" cuộc đột kích tư dinh ông Trump ở Florida và đang yêu cầu công khai lệnh khám xét.
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    "Chính tôi đã phê duyệt quyết định yêu cầu lệnh khám xét", Bộ trưởng Tư pháp Mỹ Merrick Garland nói với phóng viên hôm 11/8 trong bình luận công khai đầu tiên kể từ cuộc đột kích nhà riêng của cựu tổng thống Donald Trump ở bang Florida đầu tuần này. "Bộ không xem nhẹ quyết định như vậy".
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Garland lưu ý "các nghĩa vụ đạo đức" không cho phép ông nêu chi tiết lý do cuộc đột kích, nhưng ông đã yêu cầu một thẩm phán Florida công bố lệnh khám xét vì cựu tổng thống Trump đã công khai xác nhận vụ đột kích và có "mối quan tâm đáng kể của công chúng trong vấn đề này".
                </div>
                <div className={"mt-2 editor"}>
                    {
                        !editDescription ?
                            <div
                                onClick={() => setEditDescription(true)}
                                className={"bg-cbs-form-input-bg border-0.5 border-primary-border px-4 pt-2 h-[60px] cursor-pointer rounded text-primary-gray"}>
                                Biên soạn nội dung mô tả...
                            </div> :
                            <>
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
                                <div className={"flex items-center justify-end mt-2"}>
                                    <button
                                        onClick={() => setEditDescription(false)}
                                        className={"py-2 px-4 bg-cbs-form-input-bg rounded text-primary-gray mr-4"}>
                                        Bỏ qua
                                    </button>
                                    <button className={"py-2 px-4 bg-primary rounded text-white"}>
                                        Xác nhận
                                    </button>
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}