import { FC, Fragment, useRef } from "react";

import { Dialog, Transition } from "@headlessui/react";

type Props = {
  showUpdateStatus: boolean;
  setShowUpdateStatus: any;
  onPress: any;
};
export const UpdateStatusDialog: FC<Props> = ({
  showUpdateStatus,
  setShowUpdateStatus,
  onPress,
}) => {
  const focusElementRef = useRef<HTMLDivElement>(null);

  return (
    <Transition appear show={showUpdateStatus} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto delete-confirm"
        onClose={() => setShowUpdateStatus(false)}
        initialFocus={focusElementRef}
      >
        <div
          ref={focusElementRef}
          className="min-h-screen flex items-center justify-center z-51"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={
                "w-[400px] rounded-md shadow-lg bg-white p-[22px] z-51"
              }
            >
              <div className={"font-bold text-xl"}>Bạn có muốn đánh dấu tất cả thành đã đọc không?</div>
              <div className={"flex justify-end mt-[20px]"}>
                <button
                  className={
                    "w-[95px] h-[32px] rounded-md mr-[10px] font-semibold"
                  }
                  onClick={() => setShowUpdateStatus(false)}
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    setShowUpdateStatus(false);
                    onPress();
                  }}
                  className={"h-[36px] w-[105px] rounded-md bg-primary text-white disabled:bg-gray-300"}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
