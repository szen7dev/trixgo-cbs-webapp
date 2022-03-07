import { FC, Fragment, useState } from "react";

import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";

import { useModal } from "services/hooks/useModal";

// import AddNewTaskDialog from "components/common/add-new-task-dialog";
// import PersonalNotePage from "views/pages/personal/note/PersonalNotePage";

import icon1 from "assets/images/icons8-star-96.png";
import icon2 from "assets/images/icons8-inbox-100.png";
import icon3 from "assets/images/icons8-note-100.png";
import icon4 from "assets/images/icons8-user-manual-64.png";
import icon5 from "assets/images/icons8-bill-96.png";
import icon6 from "assets/images/icons8-calendar-128.png";
import iconPlus from "assets/images/icons8-plus-math-24.png";
import {ChatsOnRightSideBar} from "shareComponents/common";

export const HomeRightSideBar: FC = () => {
  const [openNotes, setOpenNotes] = useState(false);
  const { openModal } = useModal();

  return (
    <div className="tm-right-sidebar transition-all duration-500 ease-out fixed top-16 bottom-0 right-0 border-l border-secondary-light z-5">
      <div className="flex items-center flex-col">
        <button
          onClick={() =>
            openModal(
              <div className="t-add-new-task-dialog text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block">
                {/* <AddNewTaskDialog /> */}
              </div>
            )
          }
          className="t-right-sidebar-btn-add w-10 h-10 rounded-full bg-secondary-light hover:bg-accent-light mt-14"
        >
          <img
            src={iconPlus}
            alt="Thumbnail"
            className="w-6 h-6 mr-auto ml-auto rounded-full filter-blue"
          />
        </button>
        {/* <Link to={`/personal/notifications`} className="mt-4">
          <img
            className="w-6 h-6 object-contain"
            src={icon6}
            alt="Left side bar"
          />
        </Link> */}
        <Link to={`/pcm/home`} className="mt-4">
          <img
            className="w-6 h-6 object-contain"
            src={icon2}
            alt="Left side bar"
          />
        </Link>
        {/* <Link to={`/pcm/bookmark`} className="mt-4">
          <img
            className="w-6 h-6 object-contain"
            src={icon1}
            alt="Left side bar"
          />
        </Link> */}
        <div
          // to={`/personal/notes`}
          className="mt-4 cursor-pointer"
          onClick={() =>
            // openModal(
            //   <div className="transition-all h-full right-0 absolute transform bg-primary-light shadow-xl rounded inline-block">
            //     <PersonalNotePage />
            //   </div>
            // )
            setOpenNotes(!openNotes)
          }
        >
          {/* <img
            className="w-6 h-6 object-contain"
            src={icon3}
            alt="Left side bar"
          /> */}
        </div>
        {openNotes && (
          <Transition appear show={openNotes} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-50 overflow-y-auto"
              onClose={() => setOpenNotes(!openNotes)}
            >
              <div className="min-h-screen text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="inline-block h-screen align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>

                {openNotes && (
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <div className="transition-all h-full right-0 absolute transform bg-primary-light shadow-xl rounded inline-block">
                      {/* <PersonalNotePage /> */}
                    </div>
                  </Transition.Child>
                )}
              </div>
            </Dialog>
          </Transition>
        )}
        {/*<Link to={`/personal/bills`} className="mt-4">*/}
        {/*  <img*/}
        {/*    className="w-6 h-6 object-contain"*/}
        {/*    src={icon5}*/}
        {/*    alt="Left side bar"*/}
        {/*  />*/}
        {/*</Link>*/}
        {/*<Link to={`/help/home`} className="mt-4">*/}
        {/*  <img*/}
        {/*    className="w-6 h-6 object-contain"*/}
        {/*    src={icon4}*/}
        {/*    alt="Left side bar"*/}
        {/*  />*/}
        {/*</Link>*/}
      </div>
       <ChatsOnRightSideBar/>
    </div>
  );
};
