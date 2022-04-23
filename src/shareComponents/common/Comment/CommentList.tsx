import React, { HTMLAttributes, useState } from "react";
import CommentItem, { RenderAttribute } from "./CommentItem";

import type { CommentWithReplyExtra } from "typings/ppt/comment";
import ReplyCommentField, { SubmitComment } from "../ZoomView/components/ReplyCommentField";
import classNames from "classnames";

type Props<T extends Record<string, any>> = {
  level?: number;
  item: T & Partial<CommentWithReplyExtra<T>>;
  attributes?: RenderAttribute<T>;
} & HTMLAttributes<HTMLDivElement>;

function CommentList<T extends Record<string, any>>({
  item,
  attributes,
  level = 0,
  ...props
}: Props<T>): JSX.Element {
  const [showInput, setShowInput] = useState(false);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);

  async function handleSubmitComment(params: SubmitComment) {
    console.log(params);
  }

  return (
    <>
      <CommentItem
        item={item}
        attribute={attributes}
        onClickReply={(comment) => {
          setShowInput(true);
        }}
        {...props}
      />
      <div>
        {/* listReply */}
        {item.listReply && item.listReply.data.length && (
          <ul>
            {item.listReply?.data.map((_item, index) => (
              <li key={_item._id}>
                <CommentList
                  item={_item}
                  attributes={attributes}
                  level={level + 1}
                  className="pl-11"
                />
              </li>
            ))}
          </ul>
        )}

        {/* Reply */}
        {showInput && (
          <ReplyCommentField
            inputContainerClassName={classNames("flex w-full p-2", { "pl-11": level !== 0 })}
            level={level}
            content={content} // set reply or comment
            files={files}
            images={images}
            onSubmitChat={handleSubmitComment}
          />
        )}
      </div>
    </>
  );
}

export default CommentList;
