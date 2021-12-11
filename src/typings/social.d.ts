export type PostPayload = {
  title: string;
  content: string;
  files: Array<File>;
  images: Array<File>;
  type: string;
};

export type PostFileProps = {
  files?: Array<File | FileProps>;
  onRemove?(index: number): void;
};
export type PostImageProps = {
  images?: Array<File>;
  onRemove(index: number): void;
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
}