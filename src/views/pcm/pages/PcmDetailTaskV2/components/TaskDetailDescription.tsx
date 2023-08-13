import React, { FC, useEffect, useRef, useState } from "react";
import iconNote from "assets/images/icons8-note-48.svg";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as EditorType } from "tinymce";
import { Task } from "typings/task";
import { useTask } from "services/hooks/useTask";
import { humanFileSize } from 'utils/converter';
import iconAttach from "assets/images/icons8-attach-48.svg";
import iconLink from "assets/images/icons8-link-96-v3.svg";
import { debounce } from "lodash";
import { toast } from "react-toastify";

// import imageDemo from "assets/images/task-detail-image.png";
import moment from "moment";
import { ModalZoomView } from "shareComponents/common";
import { ImageProps } from "typings/common";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import { useFileCore } from 'services/hooks/useFileCore';

type Props = {
    task: Task;
    refetchInfo?: () => void;
}

function checkCreateAtWith60minute(time: any){
    const timeStartComment = time;
    const nowDate = moment();
    if (nowDate.diff(timeStartComment, 'minutes') < 60) {
        return true;
    }else{
        return false;
    }
}

export const TaskDetailDescription: FC<Props> = ({ task, refetchInfo }) => {
    const { updateFileAsync } = useFileCore();
    const editorRef = useRef<EditorType>();
    const [editDescription, setEditDescription] = useState(false);
    const [isHasPermissionUpdateDescription, setIsPermissionUpdateDescription] = useState(false);
    const [isShowImageFullScreen, setIsShowImageFullScreen] = useState(false);
    const [defaultState, setDefaultState] = useState({
        mediaID: '',
        images: [] as ImageProps[],
        index: 0,
        createAt: ""
    });

    const { updateTaskAsync } = useTask({});

    const handleUpdateDescription = async () => {
        if (editorRef.current) {
            const contentRaw = editorRef.current.getContent({ format: 'raw' });
            const contentRawCv = editorRef.current.getContent({ format: 'text' });

            await updateTaskAsync({
                taskID: task._id,
                isUpdateNews: true,
                description: contentRaw,
                descriptioncv: contentRawCv,
            });
            refetchInfo?.();
            setEditDescription(false);
        }
    }

    const handleClickImage = (file: any, index: number) => {
        const images = task.authorAttachs?.filter((file: any) => file.type == 1);

		if (images?.length) {
            setDefaultState({
                mediaID: file._id,
                images: images,
                index,
                createAt: file.createAt
            });
            setIsShowImageFullScreen(true);
        }
	}

    useEffect(() => {
        if(checkCreateAtWith60minute(task?.createAt)){
            setIsPermissionUpdateDescription(true);
        }
    }, [task?.createAt])

    const handleChangeDescriptionFile = debounce(async(e: any) => {
        await updateFileAsync({
            fileID: e.target.name,
            description: e.target.value
        });
		toast.success('Cập nhật ghi chú thành công', { autoClose: 2000 });
    }, 1000);
    return (
        <div className={"task-description flex items-start mt-5"}>
            <span className={"mr-4"}>
                <img src={iconNote} alt={'-----'} />
            </span>
            <div className={"flex-1"}>
                <div className={"text-primary-gray text-[16px] font-bold"}>
                    Mô tả
                </div>
                <div className={"mt-2 editor"}>
                    {
                        (!editDescription && isHasPermissionUpdateDescription) ?
                            <div onClick={() => setEditDescription(true)} >
                                <img src={PencilIcon} alt="Pencil" />
                            </div> : (
                                isHasPermissionUpdateDescription ? (
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
                <div className={"mt-2"} dangerouslySetInnerHTML={{
                    __html: (editDescription && task.description) ? task.description : task.description?.replace?.(/\n/g, '<br />')
                }} />
                { task.authorAttachs?.length ? (
                    <div className={"mt-2"}>
                        <div className={"user-attach mt-4"}>
                            {task.authorAttachs?.map(file => {
                                if (file.type == '1') return;
                                // console.log({ file })
                                return (
                                    <div key={file._id} className={"comment-attach-item flex items-start justify-between mb-2"}>
                                        <img src={iconAttach} alt={"---"} />
                                        <div className={"comment-attach-item-file-infor mx-2"}>
                                            <a href={`${process.env.REACT_APP_URL_S3}${file.path}`} download className={"text-primary"}>
                                                {file.nameOrg} ({humanFileSize(file.size)})
                                            </a>
                                            <p className={"text-primary-gray text-xs"}>
                                                {file.author?.bizfullname} -
                                                {moment(file.createAt).format('DD/MM/YYYY HH:mm')} {moment(file.createAt).fromNow()}
                                            </p>
                                        </div>
                                        <input
                                            type="text"
                                            // name="description"
                                            className={"flex-1 text-primary-gray text-center focus:outline-none focus:ring-none"}
                                            name={file._id}
                                            defaultValue={ file.description }
                                            onChange={handleChangeDescriptionFile}
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
                                    task.authorAttachs?.map((file, index) => {
                                        if(file.type == '2') return;

                                        return (
                                            <div key={file._id} className={" border-0.5 border-primary-border bg-cbs-form-input-bg mb-2"}>
                                                <div className={"relative"} onClick={() => handleClickImage(file, index)}>
                                                    <img
                                                        className={"h-[120px] max-h-[120px] min-h-[120px] object-cover w-full"}
                                                        src={`${process.env.REACT_APP_URL_S3}${file.path}`}
                                                        alt={file.nameOrg}
                                                    />
                                                    <div className={"text-white px-2 py-4 bg-black opacity-60 absolute text-xs bottom-0 w-full truncate"}>
                                                        {moment(file.createAt).format('DD/MM/YYYY HH:mm')} {moment(file.createAt).fromNow()}
                                                    </div>
                                                </div>
                                                <textarea
                                                    className={"p-2 w-full text-xs h-[60px] min-h-[60px] max-h-[60px] bg-cbs-form-input-bg"}
                                                    placeholder={"Nhập nội dung ghi chú"}
                                                    name={file._id}
                                                    defaultValue={ file.description }
                                                    onChange={handleChangeDescriptionFile}
                                                    >
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
                                                {file.author?.bizfullname} -
                                                {moment(file.createAt).format('DD/MM/YYYY HH:mm')} {moment(file.createAt).fromNow()}
                                            </p>
                                        </div>
                                        <input
                                            type="text"
                                            // name="description"
                                            className={"flex-1 text-primary-gray text-center focus:outline-none focus:ring-none"}
                                            name={file._id}
                                            defaultValue={ file.description }
                                            onChange={handleChangeDescriptionFile}
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
                                    task.assigneeAttachs?.map((file, index) => {
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
                                                        asdasd{moment(file.createAt).format('DD/MM/YYYY HH:mm')} {moment(file.createAt).fromNow()}
                                                    </div>
                                                </div>
                                                <textarea
                                                    className={"p-2 w-full text-xs h-[60px] min-h-[60px] max-h-[60px] bg-cbs-form-input-bg"}
                                                    placeholder={"Nhập nội dung ghi chú"}
                                                    name={file._id}
                                                    defaultValue={ file.description }
                                                    onChange={handleChangeDescriptionFile}
                                                    >
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

            <ModalZoomView
                isShow={isShowImageFullScreen}
                toggle={() => setIsShowImageFullScreen(!isShowImageFullScreen)}
                initialData={defaultState}
            />
        </div>
    )
}