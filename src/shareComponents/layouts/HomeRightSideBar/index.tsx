import { FC, Fragment, useState } from "react";

import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";

import { useModal } from "services/hooks/useModal";

import icon2 from "assets/images/icons8-inbox-100.png";
import iconPlus from "assets/images/icons8-plus-math-24.png";
import {ChatsOnRightSideBar} from "shareComponents/common";

export const HomeRightSideBar: FC = () => {
  const [openNotes, setOpenNotes] = useState(false);
  const { openModal } = useModal();

  return (
    <div className="tm-right-sidebar transition-all duration-500 ease-out fixed top-16 bottom-0 right-0 border-l border-secondary-light z-50">
      <div className="flex items-center flex-col"></div>
    </div>
  );
};
