import { FC, useMemo, useCallback, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";

// Custom Blot for images with alt text
const Image = Quill.import('formats/image');
class ImageBlot extends Image {
  static create(value: string | { src: string; alt: string }) {
    const node = super.create(typeof value === 'string' ? value : value.src);
    if (typeof value === 'object') {
      node.setAttribute('src', value.src);
      node.setAttribute('alt', value.alt || '');
    }
    node.setAttribute('loading', 'lazy');
    return node;
  }

  static value(node: HTMLElement) {
    return {
      src: node.getAttribute('src'),
      alt: node.getAttribute('alt') || ''
    };
  }
}
Quill.register('formats/image', ImageBlot, true);
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
  const [altText, setAltText] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-4 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Add Image Alt Text</h3>
        <div className="mb-4">
          <label htmlFor="altText" className="block text-sm font-medium text-gray-700 mb-2">
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
};

export const QuillEditor: FC<Props> = ({ onUploadImage, ...props }) => {
  const quillRef = useRef<ReactQuill>(null);
  const [showAltTextModal, setShowAltTextModal] = useState(false);
  const [pendingImage, setPendingImage] = useState<{ file: File | null; url: string | null }>({
    file: null,
    url: null
  });

  const insertImage = useCallback((url: string, altText: string) => {
    const editor = quillRef.current?.getEditor();
    console.log({ editor })
    if (!editor) return;

    const range = editor.getSelection(true);
    console.log({ range })
    if (!range) return;

    editor.insertEmbed(range?.index, 'image', { src: url, alt: altText }, 'user');
    // editor.setSelection(range.index + 1);
  }, []);

  const handleImageUpload = useCallback(async (file: File) => {
    if (!onUploadImage) return;

    try {
      const url = await onUploadImage(file);
      setPendingImage({ file, url });
      setShowAltTextModal(true);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }, [onUploadImage]);

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
          image: function() {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();

            input.onchange = async () => {
              const file = input.files?.[0];
              if (file) {
                await handleImageUpload(file);
              }
            };
          }
        }
      },
      clipboard: {
        matchVisual: false,
      },
      imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize"]
      }
    }),
    []
  );

  const handleAltTextConfirm = useCallback((altText: string) => {
    console.log({ pendingImage, altText })
    if (pendingImage.url) {
      insertImage(pendingImage.url, altText);
    }
    setShowAltTextModal(false);
    setPendingImage({ file: null, url: null });
  }, [pendingImage, insertImage]);

  const handleAltTextCancel = useCallback(() => {
    setShowAltTextModal(false);
    setPendingImage({ file: null, url: null });
  }, []);

  return (
    <>
      <ReactQuill
        ref={quillRef}
        onChange={props.onChange}
        value={props.value || ''}
        modules={modules}
        formats={formats}
        placeholder={props.placeholder}
      />
      {showAltTextModal && (
        <AltTextModal
          onConfirm={handleAltTextConfirm}
          onCancel={handleAltTextCancel}
        />
      )}
    </>
  );
};
