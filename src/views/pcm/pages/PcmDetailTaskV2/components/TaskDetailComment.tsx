import React, {FC, useRef, useState} from "react";
import iconForum from "assets/images/icons8-discussion-forum-64.svg";
import taskUserAvt from "assets/images/task-user.svg";
import trigangleDown from "assets/images/triangle-down.svg";
import iconReply from "assets/images/icons8-reply-arrow-48.svg";
import iconUpload from "assets/images/icons8-upload-48.svg";
import {listEmoji} from "../../../../messages/pages/MessageHome/sections/ChattingSection";
import iconAttach from "assets/images/icons8-attach-48.svg";
import iconLink from "assets/images/icons8-link-96-v3.svg";
import imageDemo from "assets/images/task-detail-image.png";
import {Editor} from "@tinymce/tinymce-react";
import {Editor as EditorType} from "tinymce";
import {SendToMultiSelected} from "./SendToMultiSelected";

export const TaskDetailComment:FC = () => {
    const [filter, setFilter] = useState(1);
    const editorRef = useRef<EditorType>();

    return (
        <div className={"task-comment mt-8"}>
            <div className={"flex items-center"}>
                    <img src={iconForum} alt={'-----'} className={"mr-4"}/>
                    <button onClick={() => setFilter(1)} className={"text-primary-gray text-lg " + (filter === 1 ? "font-bold border-b border-primary-gray": "")}>
                        Phản hồi liên quan (122)
                    </button>
                    <button onClick={() => setFilter(2)} className={"text-primary-gray text-lg mx-4 " + (filter === 2 ? "font-bold border-b border-primary-gray": "")}>
                        Nội dung chốt (8)
                    </button>
                    <button onClick={() => setFilter(3)} className={"text-primary-gray text-lg mx-4 " + (filter === 3 ? "font-bold border-b border-primary-gray": "")}>
                        Hiện trạng (2)
                    </button>
                    <button onClick={() => setFilter(4)} className={"text-primary-gray text-lg mx-4 " + (filter === 4 ? "font-bold border-b border-primary-gray": "")}>
                        Giải pháp (4)
                    </button>
    </div>

            <button className={"font-bold text-primary-gray my-6"}>
                Xem 152 phản hồi trước
            </button>

            <div className={"list-comment mt-4"}>
                <div className={"item-comment flex items-start border-b-0.5 border-primary-border pb-4"}>
                    <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[44px] w-[44px] min-h-[44px] min-w-[44px] max-h-[44px] max-w-[44px] mx-2"}/>
                    <div className={"comment-content ml-4 flex-1"}>
                        <div className={"comment-content-wrapper"}>
                            <div className={"flex items-center justify-between"}>
                                <div className={"user-name"}>
                                    <div className={"font-bold"}>Vũ Thanh Bình-CPMI</div>
                                    <div className={"text-primary-gray flex items-center"}>
                                        <span className={"mr-2"}>tới Lê Lưu Phong-CPMI, Nguyễn Đắc Toàn-TRX và 3 người khác</span><img src={trigangleDown} alt={"-----"}/>
                                    </div>
                                </div>
                                <div className={"comment-infor flex items-center"}>
                                    <span className={"text-primary-gray"}>15:30 22/12/2012 (10 day ago)</span>
                                    <button className={"mx-4"}>
                                        <img src={iconReply} alt={"----"}/>
                                    </button>
                                    <input className="form-check-input mx-4" type="checkbox" value="" id="check"/>
                                    <button className={"ml-4"}>
                                        <img src={iconUpload} alt={"-----"}/>
                                    </button>
                                </div>
                            </div>
                            <div className={"comment-text mt-2"}>
                                Gửi anh Phong, <br/>
                                Em thêm Mr.Phan Châu Tín-ARMO và Mr. Nguyễn Mạnh Hùng-ARMO vào mục người liên quan của đầu việc này để nắm thông tin nhé.
                            </div>

                            <div className={"comment-attach mt-4"}>
                                <div className={"comment-attach-item flex items-start justify-between mb-2"}>
                                    <img src={iconAttach} alt={"---"}/>
                                    <div className={"comment-attach-item-file-infor mx-2"}>
                                        <a href={"#"} download className={"text-primary"}>20220223-CPMI.PGI.NBK.VPU-HopTraoDoi.pdf (111 KB)</a>
                                        <p className={"text-primary-gray text-xs"}>Vũ Thanh Bình-CPMI 25/02/2022 16:44 (1 day ago)</p>
                                    </div>
                                    <input className={"flex-1 text-primary-gray text-center focus:outline-none focus:ring-none"} placeholder={"Nhập nội dung ghi chú"}/>
                                    <button>
                                        <img src={iconLink} alt={"---"}/>
                                    </button>
                                </div>
                                <div className={"comment-attach-item flex items-start justify-between mb-2"}>
                                    <img src={iconAttach} alt={"---"}/>
                                    <div className={"comment-attach-item-file-infor mx-2"}>
                                        <a href={"#"} download className={"text-primary"}>20220223-CPMI.PGI.NBK.VPU-HopTraoDoi.pdf (111 KB)</a>
                                        <p className={"text-primary-gray text-xs"}>Vũ Thanh Bình-CPMI 25/02/2022 16:44 (1 day ago)</p>
                                    </div>
                                    <input className={"flex-1 text-primary-gray text-center focus:outline-none focus:ring-none"} placeholder={"Nhập nội dung ghi chú"}/>
                                    <button>
                                        <img src={iconLink} alt={"---"}/>
                                    </button>
                                </div>
                            </div>

                            <div className={"comment-images mt-4"}>
                                <div className={"grid grid-cols-6 gap-4"}>
                                    <div className={" border-0.5 border-primary-border bg-cbs-form-input-bg mb-2"}>
                                        <div className={"relative"}>
                                            <img className={"h-[120px] max-h-[120px] min-h-[120px] object-cover w-full"} src={imageDemo} alt={"---"}/>
                                            <div className={"text-white px-2 py-4 bg-black opacity-60 absolute text-xs bottom-0 w-full truncate"}>25/02/2022 16:44 (1 day ago)</div>
                                        </div>
                                        <textarea className={"p-2 w-full text-xs h-[60px] min-h-[60px] max-h-[60px] bg-cbs-form-input-bg"} placeholder={"Nhập nội dung ghi chú"}>
                                            Khu vực để xe của tòa nhà có cam bảo vệ, tại trục A1-A2 khu Z
                                        </textarea>
                                    </div>
                                    {
                                        [...Array(10)].map((e,i) => (
                                            <div key={i} className={" border-0.5 border-primary-border bg-cbs-form-input-bg mb-2"}>
                                                <div className={"relative"}>
                                                    <img className={"h-[120px] max-h-[120px] min-h-[120px] object-cover w-full"} src={imageDemo} alt={"---"}/>
                                                    <div className={"text-white px-2 py-4 bg-black opacity-60 absolute text-xs bottom-0 w-full truncate"}>25/02/2022 16:44 (1 day ago)</div>
                                                </div>
                                                <textarea className={"p-2 w-full text-xs h-[60px] min-h-[60px] max-h-[60px] bg-cbs-form-input-bg"} placeholder={"Nhập nội dung ghi chú"}>
                                                </textarea>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className={"comment-action mt-4 flex items-center justify-between"}>
                                <div className={"actions"}>
                                    <button className={"font-bold text-primary-gray mr-6"}>
                                        Thích
                                    </button>
                                    <button className={"font-bold text-primary-gray mr-6"}>
                                        Trả lời
                                    </button>
                                    <span className={"text-primary-gray"}>15:30 22/12/2012 (2 day ago)</span>
                                </div>
                                <div className={"reactions flex items-center"}>
                                    <span className={"text-secondary-gray mr-2"}>215</span>
                                    <div className={"flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-1.5"}>
                                        {
                                            listEmoji.map(reaction => (
                                                <img key={reaction.id} src={reaction.icon} alt="-----" className="w-[24px] h-[24px] rounded-full bg-slate-100 ring-2 ring-white" loading="lazy"/>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={"child-comment mt-4"}>
                            <div className={"item-comment flex items-start border-b-0.5 border-primary-border pb-4"}>
                                <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[44px] w-[44px] min-h-[44px] min-w-[44px] max-h-[44px] max-w-[44px] mx-2"}/>
                                <div className={"comment-content ml-4 flex-1"}>
                                    <div className={"comment-content-wrapper"}>
                                        <div className={"flex items-center justify-between"}>
                                            <div className={"user-name"}>
                                                <div className={"font-bold"}>Vũ Thanh Bình-CPMI</div>
                                                <div className={"text-primary-gray flex items-center"}>
                                                    <span className={"mr-2"}>tới Lê Lưu Phong-CPMI, Nguyễn Đắc Toàn-TRX và 3 người khác</span><img src={trigangleDown} alt={"-----"}/>
                                                </div>
                                            </div>
                                            <div className={"comment-infor flex items-center"}>
                                                <span className={"text-primary-gray"}>15:30 22/12/2012 (10 day ago)</span>
                                                <button className={"mx-4"}>
                                                    <img src={iconReply} alt={"----"}/>
                                                </button>
                                                <input className="form-check-input mx-4" type="checkbox" value="" id="check"/>
                                                <button className={"ml-4"}>
                                                    <img src={iconUpload} alt={"-----"}/>
                                                </button>
                                            </div>
                                        </div>
                                        <div className={"comment-text mt-2"}>
                                            Gửi anh Phong, <br/>
                                            Em thêm Mr.Phan Châu Tín-ARMO và Mr. Nguyễn Mạnh Hùng-ARMO vào mục người liên quan của đầu việc này để nắm thông tin nhé.
                                        </div>

                                        <div className={"comment-attach mt-4"}>
                                            <div className={"comment-attach-item flex items-start justify-between mb-2"}>
                                                <img src={iconAttach} alt={"---"}/>
                                                <div className={"comment-attach-item-file-infor mx-2"}>
                                                    <a href={"#"} download className={"text-primary"}>20220223-CPMI.PGI.NBK.VPU-HopTraoDoi.pdf (111 KB)</a>
                                                    <p className={"text-primary-gray text-xs"}>Vũ Thanh Bình-CPMI 25/02/2022 16:44 (1 day ago)</p>
                                                </div>
                                                <input className={"flex-1 text-primary-gray text-center focus:outline-none focus:ring-none"} placeholder={"Nhập nội dung ghi chú"}/>
                                                <button>
                                                    <img src={iconLink} alt={"---"}/>
                                                </button>
                                            </div>
                                            <div className={"comment-attach-item flex items-start justify-between mb-2"}>
                                                <img src={iconAttach} alt={"---"}/>
                                                <div className={"comment-attach-item-file-infor mx-2"}>
                                                    <a href={"#"} download className={"text-primary"}>20220223-CPMI.PGI.NBK.VPU-HopTraoDoi.pdf (111 KB)</a>
                                                    <p className={"text-primary-gray text-xs"}>Vũ Thanh Bình-CPMI 25/02/2022 16:44 (1 day ago)</p>
                                                </div>
                                                <input className={"flex-1 text-primary-gray text-center focus:outline-none focus:ring-none"} placeholder={"Nhập nội dung ghi chú"}/>
                                                <button>
                                                    <img src={iconLink} alt={"---"}/>
                                                </button>
                                            </div>
                                        </div>

                                        <div className={"comment-action mt-4 flex items-center justify-between"}>
                                            <div className={"actions"}>
                                                <button className={"font-bold text-primary-gray mr-6"}>
                                                    Thích
                                                </button>
                                                <button className={"font-bold text-primary-gray mr-6"}>
                                                    Trả lời
                                                </button>
                                                <span className={"text-primary-gray"}>15:30 22/12/2012 (2 day ago)</span>
                                            </div>
                                            <div className={"reactions flex items-center"}>
                                                <span className={"text-secondary-gray mr-2"}>215</span>
                                                <div className={"flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-1.5"}>
                                                    {
                                                        listEmoji.map(reaction => (
                                                            <img key={reaction.id} src={reaction.icon} alt="-----" className="w-[24px] h-[24px] rounded-full bg-slate-100 ring-2 ring-white" loading="lazy"/>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"mt-2 editor ml-12 border border-primary-border rounded"}>
                <div className={"px-2 py-4"}>
                    <SendToMultiSelected/>
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
                        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        content_css: "document",
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
                <button className={"py-2 px-4 bg-cbs-form-input-bg rounded text-primary-gray mr-4"}>
                    Bỏ qua
                </button>
                <button className={"py-2 px-4 bg-primary rounded text-white"}>
                    Xác nhận
                </button>
            </div>
        </div>
    )
}