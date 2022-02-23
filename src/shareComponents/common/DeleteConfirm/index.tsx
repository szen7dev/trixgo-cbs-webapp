import {FC, Fragment, useRef} from "react";

import { Dialog, Transition } from "@headlessui/react";

import {useDeleteConfirm} from "services/hooks/useDeleteConfirm";

export const DeleteConfirm: FC = () => {
  const { isDeleteConfirmOpen, closeDeleteConfirm, deleteConfirmContent } = useDeleteConfirm();
  const focusElementRef = useRef<HTMLDivElement>(null);

  const handleConfirm = () => {
    deleteConfirmContent.deleteAction();
    closeDeleteConfirm();
  }
  return (
      <Transition appear show={isDeleteConfirmOpen} as={Fragment}>
        <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto delete-confirm"
            onClose={closeDeleteConfirm}
            initialFocus={focusElementRef}
        >
          <div ref={focusElementRef} className="min-h-screen flex items-center justify-center z-51">
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-secondary-gray bg-opacity-50 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
            >
            &#8203;
          </span>

            {isDeleteConfirmOpen && (
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                  <div className={"max-w-[521px] rounded-md shadow-lg bg-white p-[22px] z-51"}>
                    <div className={"font-bold text-lg"}>{deleteConfirmContent.title}</div>
                    <div className={"mt-[14px] text-gray-500"}>
                      {deleteConfirmContent.message}
                    </div>
                    <div className={"flex justify-end mt-[50px]"}>
                      <button
                          className={"w-[95px] h-[32px] rounded-md mr-[10px]"}
                          onClick={() => closeDeleteConfirm()}
                      >
                        Hủy
                      </button>
                      <button
                          onClick={() => handleConfirm()}
                          className={"w-[95px] h-[32px] rounded-md bg-primary text-white"}
                      >
                        Xác nhận
                      </button>
                    </div>
                  </div>
                </Transition.Child>
            )}
          </div>
        </Dialog>
      </Transition>
  );
};
