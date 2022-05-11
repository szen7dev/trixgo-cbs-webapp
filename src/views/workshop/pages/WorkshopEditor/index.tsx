/* eslint-disable no-var */
import { FC, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";

import SubjectRepositories from "apis/training/SubjectRepositories";

import type { Editor as EditorType, EditorEvent } from "tinymce";
import { User } from "typings/user";
import { toast } from "react-toastify";
import { useAuth } from "services/hooks/auth/useAuth";
import { SerialQueue } from "utils/ppt";
import { useUpload } from "services/hooks/useUpload";

const serialQueue = new SerialQueue(1);
const WorkshopEditor: FC = () => {
  const { user } = useAuth();
  const isMounted = useRef(false);
  const isSetted = useRef(false);
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const editorRef = useRef<EditorType>();
  const { workshopID } = useParams<{ workshopID: string }>();
  const queryClient = useQueryClient();
  const { data, refetch } = useQuery(
    ["subjects_detail", workshopID],
    () =>
      SubjectRepositories.get({
        subjectID: workshopID,
        select: "image name content userCreate updatedAt",
        populates: { path: "userCreate", select: "bizfullname" },
      }),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      cacheTime: Infinity,
      enabled: false,
      onSuccess: (data) => {
        try {
          if (data && "content" in data.data && !isSetted.current) {
            editorRef.current?.setContent(data.data.content);
          }
        } catch (error) {
          console.log(error);
        }
        isSetted.current = true;
      },
    }
  );

  const { isLoading, mutate } = useMutation(SubjectRepositories.update, {
    mutationKey: "update_subject",
    onSuccess(lesson) {
      try {
        toast.success("Cập nhật thành công");
        if ("_id" in lesson.data && isMounted.current) {
          lesson.data.userCreate = user as User;
          queryClient.setQueryData(["subjects_detail", workshopID], lesson);
        }
        refetch();
      } catch (error: any) {
        toast.error(error.message);
      }
    },
  });

  const { uploadFileToS3, generateLinkS3 } = useUpload({ appID: "61e049e7fdebf77b072d1b15" });

  function handleSave(e: EditorEvent<Record<string, any>>) {
    if (data?.data._id) {
      if (e.immediate) {
        if (timeout.current) clearTimeout(timeout.current);
        return mutate({ subjectID: data.data._id, content: editorRef.current?.getContent() });
      }
      serialQueue.addIfNotRunning(() => {
        return new Promise((resolve) => {
          timeout.current = setTimeout(() => {
            mutate({ subjectID: data.data._id, content: editorRef.current?.getContent() });
            resolve(true);
          }, 5000);
        });
      });
    }
  }

  const imagesUploadHandler: EditorType["settings"]["images_upload_handler"] = async (blobInfo, success, failure) => {
    try {
      const file = new File([blobInfo.blob()], blobInfo.filename(), { type: blobInfo.blob().type });
      const { signedUrl, result } = await generateLinkS3({ file, fileType: 1 });
      await uploadFileToS3({
        file,
        signedUrl,
      });
      success(process.env.REACT_APP_URL_S3 + result?.path);
    } catch (error: any) {
      failure(error.message);
    }
  };

  return (
    <>
      <div className="py-0.5 px-2.5 flex justify-between items-center">
        <div>
          <img src="/images/workshop/file.png" className="w-6 h-6 inline mr-3" alt="" />
          <span className="inline-block pl-1.5 py-1 pr-3 border-0.5 border-cbs-border">{data?.data?.name}</span>
          <span className="text-cbs-schedule-oneweek">
            <svg xmlns="http://www.w3.org/2000/svg" className="inline h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </span>
        </div>
        <span className="text-cbs-subtext">
          Chỉnh sửa lần cuối cách đây{" "}
          <u>
            <i>{data && moment(data.data.updatedAt).fromNow()}</i>
          </u>{" "}
          bởi <b>{data && (data.data.userCreate as User).bizfullname}</b>
        </span>
      </div>
      <form style={{ height: "calc(100% - 32.5px)" }}>
        <Editor
          // onActivate={}
          onInit={(evt, editor) => {
            editorRef.current = editor;
            refetch();
          }}
          apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
          onSaveContent={handleSave}
          init={{
            height: "100%",
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
            menubar: true,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace code",
              "insertdatetime media table paste code help wordcount",
            ],
            fullpage_default_title: "My default page title",

            // images_upload_url: "/api/upload/image",
            file_picker_types: "image",
            images_upload_handler: imagesUploadHandler,
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help | image",
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
      </form>
    </>
  );
};

export default WorkshopEditor;
