import React, { FC } from "react";
import { useModal } from "services/hooks/useModal";
import ShareModal from "./ShareModal";

const ShareButton: FC = () => {
  const { openModal } = useModal();
  return (
    <button
      className={"bg-primary rounded-md text-white px-5 py-2 ml-3"}
      onClick={() =>
        openModal(
          <div className="inline-block w-5/12 overflow-visible align-top transition-all transform bg-primary-light shadow-xl rounded mt-28">
            <ShareModal />
          </div>
        )
      }
    >
      Share
    </button>
  );
};
export default ShareButton;
