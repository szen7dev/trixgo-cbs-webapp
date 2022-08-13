import React, {FC, useRef} from "react";
import iconBack from "assets/images/icon-back-gray.svg";
import iconLinkCopy from "assets/images/icons8-link-96-v3.svg";
import iconCopy from "assets/images/icons8-copy-96.svg";
import iconRemove from "assets/images/icons8-remove-96.svg";
import iconPrint from "assets/images/icons8-print-96.svg";
import iconChat from "assets/images/icons8-chat-48.svg";
import iconMember from "assets/images/icons8-member-48-white.svg";
import iconFolder from "assets/images/icons8-folder-48.svg";
import iconTaskCompleted from "assets/images/icons8-task-completed-48.svg";
import iconCheckmark from "assets/images/icons8-checkmark-yes-64.svg";
import iconSnooze from "assets/images/icons8-snooze-48.svg";
import iconAddGroup from "assets/images/icons8-add-user-group-man-man-64.svg";
import taskUserAvt from "assets/images/task-user.svg";
import iconNote from "assets/images/icons8-note-48.svg";
import iconAssessment from "assets/images/icons8-assessments-64.svg";
import demoSignature from "assets/images/demo-signature.png";

import {TaskHistoryLog} from "./components/TaskHistoryLog";
import DotsVerticalIcon from "assets/icons/DotsVertical";
import {SendEmailNotification} from "./components/SendEmailNotification";
import iconStar from "assets/images/icon-star.svg";
import InlineBadgeSelect from "./components/InlineBadgeSelect";
import TimeRange from "./components/TimeRange";
import { Editor } from '@tinymce/tinymce-react';
import {Editor as EditorType} from "tinymce";

const PcmDetailTaskV2:FC = () => {
    const editorRef = useRef<EditorType>();

    const folders = ["CHG.THT","Tư vấn thiết kế 112","Hồ sơ thanh toán"];
    return (
        <div className={"task-detail"}>
            <div className={"action-bar bg-white flex items-center px-2 py-1 border-b-0.5 border-primary-border sticky top-0"}>
                <div className={"flex items-center flex-1"}>
                    <button className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] bg-cbs-form-input-bg mr-3"}>
                        <img src={iconBack} alt={"----"} className={"w-[18px]"}/>
                    </button>
                    <button className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mx-3"}>
                        <img src={iconLinkCopy} alt={"----"} className={"w-[18px]"}/>
                    </button>
                    <SendEmailNotification/>
                    <button className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mx-3"}>
                        <img src={iconCopy} alt={"----"} className={"w-[18px]"}/>
                    </button>
                    <button className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mx-3"}>
                        <img src={iconRemove} alt={"----"} className={"w-[18px]"}/>
                    </button>
                    <button className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mx-3"}>
                        <img src={iconPrint} alt={"----"} className={"w-[18px]"}/>
                    </button>
                    <button className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mx-3"}>
                        <img src={iconChat} alt={"----"} className={"w-[18px]"}/>
                    </button>
                </div>
                <TaskHistoryLog/>
                <button className={"rounded bg-cbs-green-medium h-[36px] text-white flex items-center justify-center px-3 mx-3"}>
                    <img src={iconMember} alt={"----"} className={"w-[24px] mr-2"}/>
                    <span>Chia sẻ</span>
                </button>
                <button className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] bg-cbs-form-input-bg mr-3"}>
                    <DotsVerticalIcon/>
                </button>
            </div>
            <div className={"task-content p-4"}>
                <div className={"task-detail-title"}>
                    <span className={"text-xl "}>
                        Hồ sơ thanh toán đợt 05 gói thầu Tư vấn thiết kế của đơn vị Công ty Cổ phần tư vấn thiết kế 112 - Dự án Xây dựng cụm trường tiểu học và trung học cơ sở Tây Hồ Tây
                    </span>
                    <span className={"inline-block ml-2"}>
                        <button>
                            <img src={iconStar} alt={"bookmark"} className={"w-[18px] h-[18px]"}/>
                        </button>
                    </span>
                    <InlineBadgeSelect
                        wrapperClassName={"-translate-y-1"}
                        className={"text-xs bg-cbs-inline-badge-blue rounded-full text-white px-2 py-1 mx-1"}
                        defaultValue={1}
                        options={[
                            {
                                id: 1,
                                text: "Khởi tạo"
                            },
                            {
                                id: 2,
                                text: "Đang triển khai"
                            },
                            {
                                id: 3,
                                text: "Hoàn thành"
                            },
                        ]}
                        placeholder={"Trạng thái"}
                        onValueChange={value => console.log(value)}
                    />
                    <InlineBadgeSelect
                        wrapperClassName={"-translate-y-1"}
                        className={"text-xs bg-negative rounded-full text-white px-2 py-1 mx-1"}
                        defaultValue={1}
                        options={[
                            {
                                id: 1,
                                text: "Khởi tạo"
                            },
                            {
                                id: 2,
                                text: "Đang triển khai"
                            },
                            {
                                id: 3,
                                text: "Hoàn thành"
                            },
                        ]}
                        placeholder={"Ưu tiên"}
                        onValueChange={value => console.log(value)}
                    />
                    <InlineBadgeSelect
                        wrapperClassName={"-translate-y-1"}
                        className={"text-xs bg-cbs-form-input-bg rounded-full text-primary-gray px-2 py-1 mx-1"}
                        defaultValue={1}
                        options={[
                            {
                                id: 1,
                                text: "Khởi tạo"
                            },
                            {
                                id: 2,
                                text: "Đang triển khai"
                            },
                            {
                                id: 3,
                                text: "Hoàn thành"
                            },
                        ]}
                        placeholder={"Rủi ro"}
                        onValueChange={value => console.log(value)}
                    />
                </div>
                <div className={"task-folder flex items-center text-primary-gray mt-6"}>
                    <div className={"flex items-center flex-1"}>
                        <span className={"mr-4"}>
                            <img src={iconFolder} alt={'-----'}/>
                        </span>
                        <div className={"flex"}>
                            {
                                folders.map((folder, index) => (
                                    <span key={folder}>{folder}{(index < folders.length-1) ? "> " : "" }</span>
                                ))
                            }
                        </div>
                    </div>
                    <div className={"flex items-center"}>
                        <button className={"flex text-primary-gray items-center rounded border-0.5 border-primary-gray bg-cbs-form-input-bg px-3 h-[30px]"}>
                            <img src={iconCheckmark} alt={"----"} className={"mr-2"}/>
                            <span>Xác nhận</span>
                        </button>

                        <div className={"flex items-center mx-6 text-primary-gray"}>
                            <img src={iconSnooze} alt={"----"} className={"mr-2"}/>
                            <span>1 day</span>
                        </div>

                        <TimeRange
                            fromDateDefault={"12/07/2022"}
                            toDateDefault={"12/08/2022"}
                            toTimeDefault={"12:00"}
                            onApplyNewTime={time => console.log(time)}
                        />
                    </div>
                </div>
                <div className={"flex items-center mt-6"}>
                    <span className={"mr-4"}>
                        <img src={iconTaskCompleted} alt={'-----'}/>
                    </span>
                    <div className={"flex text-cbs-highlight-color"}>
                        Hồ sơ thanh toán của công ty tư vấn thiết kế 112
                    </div>
                </div>
                <div className={"flex items-start mt-6"}>
                    <span className={"mr-4"}>
                        <img src={iconAddGroup} alt={'-----'}/>
                    </span>
                    <div className={"flex-1"}>
                        <div className={"text-primary-gray text-lg font-bold"}>Thành viên</div>
                        <div className={"flex items-center mt-2"}>
                            <div className={"create-user flex items-center"}>
                                <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px]"}/>
                                <div className={"flex-1 ml-2"}>
                                    <p>Trương Văn Doanh-DSP</p>
                                    <p className={"text-primary-gray text-xs"}>Tạo việc 15:00 20/2/2022</p>
                                </div>
                            </div>
                            <div className={"assigned-user flex items-center ml-4"}>
                                <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px]"}/>
                                <div className={"flex-1 ml-2"}>
                                    <p>Trương Văn Doanh-DSP</p>
                                    <p className={"text-primary-gray text-xs"}>Người thực hiện</p>
                                </div>
                            </div>
                            <div className={"flex items-center flex-1 justify-end"}>
                                <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1"}/>
                                <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1"}/>
                                <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1"}/>
                                <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1"}/>
                                <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1"}/>
                                <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1"}/>
                                <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1"}/>
                                <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1"}/>
                                <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1"}/>
                                <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1"}/>
                                <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1"}/>

                                <div className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1 bg-cbs-form-input-bg border-0.5 border-primary-border flex items-center justify-center text-primary-gray"}>
                                    15+
                                </div>
                                <button className={"text-xl rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1 bg-cbs-form-input-bg border-0.5 border-primary-border flex items-center justify-center text-primary-gray"}>
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"flex items-start mt-6"}>
                    <span className={"mr-4"}>
                        <img src={iconAssessment} alt={'-----'}/>
                    </span>
                    <div className={"flex-1"}>
                        <div className={"text-primary-gray text-lg font-bold"}>Ký xác nhận</div>
                        <div className={"mt-2 w-1/3"}>
                            <div className={"user-sign flex items-center mb-2"}>
                                <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px]"}/>
                                <div className={"flex-1 ml-2"}>
                                    <p>Trương Văn Doanh-DSP</p>
                                    <p className={"text-primary-gray text-xs"}>15:00 20/2/2022 (cách đây 2 ngày)</p>
                                </div>
                                <img className={"h-[50px] object-contain"} src={demoSignature} alt={"----"}/>
                            </div>
                            <div className={"user-sign flex items-center mb-2"}>
                                <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px]"}/>
                                <div className={"flex-1 ml-2"}>
                                    <p>Trương Văn Doanh-DSP</p>
                                    <p className={"text-primary-gray text-xs"}>15:00 20/2/2022 (cách đây 2 ngày)</p>
                                </div>
                                <img className={"h-[50px] object-contain"} src={demoSignature} alt={"----"}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"flex items-start mt-6"}>
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
                            <div className={"flex items-center justify-end mt-2"}>
                                <button className={"py-2 px-4 bg-cbs-form-input-bg rounded text-primary-gray"}>
                                    Bỏ qua
                                </button>
                                <button className={"py-2 px-4 bg-primary text-white"}>
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PcmDetailTaskV2