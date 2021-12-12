import { CancelTokenSource } from "axios";

export type PostPayload = {
  title: string;
  content: string;
  files: Array<File>;
  images: Array<File>;
  type: string;
};

export type PostFileProps = {
  files?: Array<FileProps | FilePropsUpload>;
  onRemove?(file: FileProps | FilePropsUpload): void;
};
export type PostImageProps = {
  images?: Array<FileProps | FilePropsUpload>;
  onRemove?(file: FileProps | FilePropsUpload): void;
};

export type FileProps = {
  id: number | string;
  url: string;
  name: string;
  size: number;
};

export type ImageProps = {
  id: number | string;
  url: string;
  name: string;
  size: number;
};

export type FilePropsUpload = {
  id: number;
  file: File;
  progress: number;
	cancelTokenSource: CancelTokenSource;
	proimise?: Interval;
};

interface ModalProps {
	show: boolean
	toggle(): void
}