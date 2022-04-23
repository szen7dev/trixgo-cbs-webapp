/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLAttributes } from "react";

import cn from "classnames";
import moment from "moment";
import { get } from "lodash";

import { nl2p } from "utils";
import { PostFile } from "shareComponents/common";
import { Comment as CommentType } from "typings/ppt/comment";

type OptionsProps = {
  onUpdate?: () => unknown;
  onDelete?: () => unknown;
};

type PropertyList<T> = keyof T | [keyof T, keyof T[keyof T]];

// eslint-disable-next-line @typescript-eslint/ban-types
interface Props<T extends Partial<CommentType>> {
  onClickLike?: () => unknown;
  onClickReply?: (comment: T) => unknown;
  onClickImage?: (comment: T, index: number) => unknown;
  onClickEdit?: (comment: T) => unknown;
  onClickDelete?: (comment: T) => unknown;
  renderOptions?: React.ComponentType<HTMLAttributes<HTMLElement> & OptionsProps>;
  renderEndComment?: React.ComponentType;
  item: T;
  small?: boolean;
  disableReply?: boolean;
  showOptions?: boolean;

  // Attribute;
  attribute?: RenderAttribute<T>;
}

export type RenderAttribute<T> = {
  header?: PropertyList<T>;
  content?: PropertyList<T>;
  avatar?: PropertyList<T>;
  images?: PropertyList<T>;
};

// eslint-disable-next-line @typescript-eslint/ban-types
function CommentItem<T extends Partial<CommentType>>({
  disableReply,
  item,
  small,
  onClickReply,
  onClickDelete,
  onClickEdit,
  onClickImage,
  renderEndComment: EndComment,
  renderOptions: Options,
  showOptions,
  attribute,
  ...props
}: Props<T> & HTMLAttributes<HTMLDivElement>): JSX.Element {
  const {
    avatar = ["author", "item"],
    content = "content",
    header = ["author", "bizfullname"],
  } = attribute || {};

  const handleDeleteComment = () => {
    onClickDelete?.(item);
  };

  const handleEditComment = () => {
    onClickEdit?.(item);
  };

  const handleClickImage = (index: number) => {
    onClickImage?.(item, index);
  };
  const images = item?.images || [];
  const files = item?.files || [];

  return (
    <div {...props} className={cn("flex pb-1.5", props.className)}>
      {/* Avatar */}
      <div className="rounded-full overflow-hidden self-start mr-2 min-w-min">
        <div className="h-9 w-9">
          <img
            src={`${process.env.REACT_APP_URL_S3_USER}/${get(item, avatar)}`}
            alt=""
            className="h-9 w-9 object-cover"
          />
        </div>
      </div>
      {/* Info and reply */}
      <div className="group w-full">
        {/* Content */}
        <div className="flex items-center">
          <div className="bg-gray-100 rounded-xl p-2 hover:bg-primary hover:bg-opacity-10 ">
            {/* Title */}
            <p className="font-bold text-medium">{get(item, header)}</p>
            <p
              className="mt-0.5 text-[15px] leading-4"
              dangerouslySetInnerHTML={{
                __html: nl2p(get(item, content)),
              }}
            ></p>
          </div>
          {showOptions && Options && (
            <Options
              className="opacity-0 group-hover:opacity-100"
              onUpdate={handleEditComment}
              onDelete={handleDeleteComment}
            />
          )}
        </div>
        {/* Images and file */}
        <div>
          <div className="flex flex-wrap gap-x-2">
            {images.slice(0, 3).map((image: any, i: any) => {
              if (!image) return null;
              const id = image.file ? image.file._id : image._id;
              const name = image.file ? image.file.name : image.name;
              const url = image.file
                ? `${process.env.REACT_APP_URL_S3}${image.file.path}`
                : `${process.env.REACT_APP_URL_S3}${image.path}`;

              return (
                <div
                  key={id}
                  className="mt-2 cursor-pointer relative"
                  onClick={() => handleClickImage(i)}
                >
                  <img
                    src={url}
                    alt={name}
                    className={cn("object-cover", small ? "w-24 h-24" : "w-[156px] h-[156px]")}
                  />
                  {i === 2 && images.length > 3 && (
                    <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-60 text-3xl leading-9">
                      +{images.length - 2}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div>
            <PostFile files={files} className="px-0" />
          </div>
        </div>
        {/* Data */}
        {EndComment ? (
          <EndComment />
        ) : (
          <div className="flex justify-between mt-1">
            <ul className="inline-block">
              <li className="inline-block mr-2">
                <a href="/">{moment(item?.createAt).format("DD/MM/YYYY HH:mm")}</a>
              </li>
              {!disableReply && (
                <li className="inline-block">
                  <button className="font-bold" onClick={() => onClickReply?.(item)}>
                    Phản hồi
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentItem;
