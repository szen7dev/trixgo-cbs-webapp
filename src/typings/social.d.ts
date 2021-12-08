export type PostPayload = {
  title: string;
  content: string;
  files: Array<File>;
  images: Array<File>;
};

export type PostFileProps = {
	files?: Array<File>;
}
export type PostImageProps = {
	images?: Array<File>;
}