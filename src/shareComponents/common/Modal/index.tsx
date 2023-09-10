import { FC, Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";

import { useModal } from "services/hooks/useModal";

export const Modal: FC = () => {
  const { isModalOpen, closeModal, isManualClose, modalContent } = useModal();

  const handleCloseModal = () => isManualClose ? closeModal() : null;

  return (
    <Transition show={isModalOpen} as={Fragment}>
      <Dialog
        static={true}
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleCloseModal}
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
            <Dialog.Overlay className="fixed inset-0 bg-secondary-gray bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          {isModalOpen && (
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {modalContent}
            </Transition.Child>
          )}
        </div>
      </Dialog>
    </Transition>
  );
};
