import { FC, useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

import ImageResize from "quill-image-resize-module-react";

Quill.register("modules/imageResize", ImageResize);

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

type Props = {
  placeholder: string;
  value: string;
  onChange: (value: string, delta: any, source: any, editor: any) => void;
  onUploadImage?: (file: any) => Promise<string>;
};

export const QuillEditor: FC<Props> = ({ onUploadImage, ...props }) => {
  const quillRef = useRef<ReactQuill>(null);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["image", "link"],
        ],
        handlers: {
          image: function () {
            const editor = quillRef.current?.getEditor();

            if (!editor || !onUploadImage) return;

            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();

            input.onchange = async () => {
              const file = input.files?.[0];
              if (!file) return;

              try {
                const url = await onUploadImage(file);

                setTimeout(() => {
                  const range = editor.getSelection();

                  if (range) {
                    editor.insertEmbed(range.index, "image", url);
                  }
                }, 1000);
              } catch (error) {
                console.error("Error uploading image:", error);
              }
            };
          },
        },
      },
      clipboard: {
        matchVisual: false,
      },
      imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize"],
      },
    }),
    []
  );

  return (
    <ReactQuill
      ref={quillRef}
      onChange={props.onChange}
      value={props.value || ""}
      modules={modules}
      formats={formats}
      placeholder={props.placeholder}
    />
  );
};
