import React, { Fragment, HTMLAttributes } from "react";
import { Menu, Transition } from "@headlessui/react";
import cn from "classnames";

/**
 * ASSETS
 */
import iconTrash from "assets/images/icons8-remove.svg";
import iconPencil from "assets/images/icons8-pencil.svg";
import iconCopy from "assets/images/icons8-copy-96.png";
import iconPrint from "assets/images/icons8-print-96.png";

interface Props {
  icon?: "vertical" | "horizontal";

  onClickUpdate?: () => unknown;
  onClickRemove?: () => unknown;
  onClickCopy?: () => unknown;
  onClickPrint?: () => unknown;
}

const ButtonMore: React.FC<Props & HTMLAttributes<HTMLDivElement>> = ({
  icon,
  onClickCopy,
  onClickPrint,
  onClickRemove,
  onClickUpdate,
  ...props
}) => {
  return (
    <Menu as="div" {...props} className={cn("relative inline-block", props.className)}>
      <Menu.Button className="w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={cn("h-6 w-6", { "rotate-90": icon === "vertical" })}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="z-10 absolute right-0 mt-2 text-right origin-top-right border border-gray-300 bg-white divide-y divide-gray-100 rounded-md whitespace-nowrap"
          style={{ width: "264px" }}
        >
           {/* onClick={() => onClickPrint?.apply(null)} */}
          <Menu.Item>
            <button className="block px-8 py-2 hover:bg-gray-200 w-full text-left">
              <img src={iconPrint} alt="Icon Edit" className="inline-block mr-6" />
              In ấn
            </button>
          </Menu.Item>
          {/* onClick={() => onClickCopy?.apply(null)} */}
          <Menu.Item>
            <button className="block px-8 py-2 hover:bg-gray-200 w-full text-left">
              <img src={iconCopy} alt="Icon Edit" className="inline-block mr-6" />
              Copy link
            </button>
          </Menu.Item>
          {/* onClick={() => onClickUpdate?.apply(null)} */}
          <Menu.Item>
            <button className="block px-8 py-2 hover:bg-gray-200 w-full text-left">
              <img src={iconPencil} alt="Icon Edit" className="inline-block mr-6" />
              Cập nhật
            </button>
          </Menu.Item>
          {/* onClick={() => onClickRemove?.apply(null)} */}
          <Menu.Item>
            <button className="block px-8 py-2 hover:bg-gray-200 w-full text-left">
              <img src={iconTrash} alt="Icon trash" className="inline-block mr-6" />
              Xóa
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ButtonMore;
