import { FC, useMemo, useCallback, useRef, useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import "./quillEditor.css";

// Custom Blot for images with alt text
const Image = Quill.import("formats/image");
class ImageBlot extends Image {
  static create(value: string | { src: string; alt: string }) {
    const node = super.create(typeof value === "string" ? value : value.src);
    if (typeof value === "object") {
      node.setAttribute("src", value.src);
      node.setAttribute("alt", value.alt || "");
    }
    node.setAttribute("loading", "lazy");
    return node;
  }

  static value(node: HTMLElement) {
    return {
      src: node.getAttribute("src"),
      alt: node.getAttribute("alt") || "",
    };
  }
}
Quill.register("formats/image", ImageBlot, true);
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

interface AltTextModalProps {
  onConfirm: (altText: string) => void;
  onCancel: () => void;
}

const AltTextModal: FC<AltTextModalProps> = ({ onConfirm, onCancel }) => {
  const [altText, setAltText] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-4 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Add Image Alt Text</h3>
        <div className="mb-4">
          <label
            htmlFor="altText"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Image Description (Alt Text)
          </label>
          <input
            type="text"
            id="altText"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the image for accessibility"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => onConfirm(altText)}
          >
            Add Image
          </button>
        </div>
      </div>
    </div>
  );
};

type Props = {
  placeholder: string;
  value: string;
  onChange: (value: string, delta: any, source: any, editor: any) => void;
  onUploadImage?: (file: any) => Promise<string>;
  height?: string;
  autoResize?: boolean;
};

/**
 * QuillEditor - A rich text editor component with image support
 *
 * Features:
 * - Rich text formatting
 * - Image upload via button
 * - Image upload via paste
 * - Image resizing
 * - Alt text for accessibility
 * - Manual resizing of editor
 * - Auto-resize option
 */
export const QuillEditor: FC<Props> = ({
  onUploadImage,
  height,
  autoResize = false,
  ...props
}) => {
  const quillRef = useRef<ReactQuill>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showAltTextModal, setShowAltTextModal] = useState(false);
  const [pendingImage, setPendingImage] = useState<{
    file: File | null;
    url: string | null;
  }>({
    file: null,
    url: null,
  });

  // Add state for manual resizing
  const [isResizing, setIsResizing] = useState(false);
  const [editorHeight, setEditorHeight] = useState(height || "300px");

  const insertImage = useCallback((url: string, altText: string) => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const range = editor.getSelection(true);
    if (!range) return;

    editor.insertEmbed(
      range?.index,
      "image",
      { src: url, alt: altText },
      "user"
    );
    // editor.setSelection(range.index + 1);
  }, []);

  const handleImageUpload = useCallback(
    async (file: File) => {
      if (!onUploadImage) return;

      try {
        const url = await onUploadImage(file);
        setPendingImage({ file, url });
        setShowAltTextModal(true);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    },
    [onUploadImage]
  );

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
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();

            input.onchange = async () => {
              const file = input.files?.[0];
              if (file) {
                await handleImageUpload(file);
              }
            };
          },
        },
      },
      clipboard: {
        // Allow pasting with custom handling
        matchVisual: false,
      },
      imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize"],
      },
    }),
    []
  );

  const handleAltTextConfirm = useCallback(
    (altText: string) => {
      if (pendingImage.url) {
        insertImage(pendingImage.url, altText);
      }
      setShowAltTextModal(false);
      setPendingImage({ file: null, url: null });
    },
    [pendingImage, insertImage]
  );

  const handleAltTextCancel = useCallback(() => {
    setShowAltTextModal(false);
    setPendingImage({ file: null, url: null });
  }, []);

  useEffect(() => {
    if (autoResize && quillRef.current) {
      const quillEditor = quillRef.current.getEditor();
      const container = quillRef.current.getEditingArea() as HTMLDivElement;

      const resizeObserver = new ResizeObserver(() => {
        // Adjust container height based on content
        if (container && quillEditor) {
          const editorHeight = quillEditor.root.scrollHeight;
          container.style.height = `${editorHeight + 20}px`; // Add some padding
        }
      });

      if (container) {
        resizeObserver.observe(quillEditor.root);
      }

      return () => {
        if (container) {
          resizeObserver.disconnect();
        }
      };
    }
  }, [autoResize, props.value]);

  // Add resize handlers
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);

    const startY = e.clientY;
    const startHeight = containerRef.current?.offsetHeight || 0;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (containerRef.current) {
        const newHeight = startHeight + moveEvent.clientY - startY;
        setEditorHeight(`${Math.max(100, newHeight)}px`);
        containerRef.current.style.height = `${Math.max(100, newHeight)}px`;
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  // Add paste handler for images
  useEffect(() => {
    if (!quillRef.current || !onUploadImage) return;

    const editor = quillRef.current.getEditor();
    const editorContainer = editor.root;

    const handlePaste = async (e: ClipboardEvent) => {
      if (!e.clipboardData || !e.clipboardData.items) return;

      const items = e.clipboardData.items;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          e.preventDefault();
          e.stopPropagation();

          const file = items[i].getAsFile();
          if (file) {
            await handleImageUpload(file);
          }
          break;
        }
      }
    };

    editorContainer.addEventListener("paste", handlePaste);

    return () => {
      editorContainer.removeEventListener("paste", handlePaste);
    };
  }, [handleImageUpload, onUploadImage]);

  // Create a safe onChange handler
  const handleChange = useCallback((content: string, delta: any, source: any, editor: any) => {
    // Make sure all parameters are defined before passing to the onChange prop
    if (props.onChange) {
      props.onChange(content, delta || {}, source || 'user', editor);
    }
  }, [props.onChange]);

  return (
    <>
      <div
        ref={containerRef}
        className={`quill-editor-container ${autoResize ? "auto-resize" : ""} ${
          isResizing ? "resizing" : ""
        }`}
        style={{
          marginBottom: "20px",
          height: autoResize ? "auto" : editorHeight,
          position: "relative",
        }}
      >
        <ReactQuill
          ref={quillRef}
          onChange={handleChange}
          value={props.value || ""}
          modules={modules}
          formats={formats}
          placeholder={props.placeholder}
          style={{
            height: autoResize ? "auto" : "100%",
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        />
        {!autoResize && (
          <div className="resize-handle" onMouseDown={handleResizeStart} />
        )}
      </div>
      {showAltTextModal && (
        <AltTextModal
          onConfirm={handleAltTextConfirm}
          onCancel={handleAltTextCancel}
        />
      )}
    </>
  );
};
