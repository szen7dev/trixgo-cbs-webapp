/* eslint-disable no-var */
import { FC, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import moment from "moment";

import SubjectRepositories from "apis/training/SubjectRepositories";

import type { Editor as EditorType, EditorEvent } from "tinymce";
import { User } from "typings/user";
import { toast } from "react-toastify";
import { useAuth } from "services/hooks/useAuth";

const WorkshopEditor: FC = () => {
  const { user } = useAuth();

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
          if (data && "content" in data.data) {
            editorRef.current?.setContent(data.data.content);
          }
        } catch (error) {
          console.log(error);
        }
      },
    }
  );

  async function handleSave(e: EditorEvent<any>) {
    try {
      if (editorRef.current && data?.data._id) {
        const lesson = await SubjectRepositories.update({
          subjectID: data.data._id,
          content: editorRef.current.getContent(),
        });
        toast.success("Cập nhật thành công");
        if ("_id" in lesson.data) {
          lesson.data.userCreate = user as User;
          queryClient.setQueryData(["subjects_detail", workshopID], lesson);
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  console.log(data);

  return (
    <>
      <div className="py-0.5 px-2.5 flex justify-between items-center">
        <div>
          <img src="/images/workshop/file.png" className="w-6 h-6 inline mr-3" alt="" />
          <span className="inline-block pl-1.5 py-1 pr-3 border-0.5 border-cbs-border">{data?.data?.name}</span>
          <span className="text-cbs-schedule-oneweek">
            {/* Deactive */}
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
					</svg> */}
            {/* Active */}
            <svg xmlns="http://www.w3.org/2000/svg" className="inline h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </span>
        </div>
        <span className="text-cbs-subtext">
          Chỉnh sửa lần cuối cách đây {data && moment(data.data.updatedAt).fromNow()} bởi {data && (data.data.userCreate as User).bizfullname}
        </span>
      </div>
      <Editor
        onInit={(evt, editor) => {
          editorRef.current = editor;
          refetch();
        }}
        // initialValue={``}
        onSaveContent={handleSave}
        init={{
          height: "calc(100% - 32.5px)",
          menu: {
            file: { title: "File", items: "newdocument restoredraft | preview | print | basicitem " },
            edit: { title: "Edit", items: "undo redo | cut copy paste | selectall | searchreplace" },
            view: { title: "View", items: "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen" },
            insert: {
              title: "Insert",
              items: "image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime",
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
            "fullpage save advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          fullpage_default_title: "My default page title",
          // toolbar: 'save undo redo | formatselect | ' +
          // 	'bold italic backcolor | alignleft aligncenter ' +
          // 	'alignright alignjustify | bullist numlist outdent indent | ' +
          // 	'removeformat | help',
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          content_css: "document",
          setup(editor) {
            editor.ui.registry.addMenuItem("basicitem", {
              text: "Save",
              onAction: function () {
                editor.save();
              },
              icon: "save",
            });
          },
        }}
      />
    </>
  );
};

export default WorkshopEditor;
