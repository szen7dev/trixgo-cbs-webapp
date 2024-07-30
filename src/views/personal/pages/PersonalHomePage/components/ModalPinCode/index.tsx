/**
 * Libraries
 */
import { FC, KeyboardEvent, useState, useRef } from "react";

/**
 * Components, Assets
 */
import CloseIcon from "assets/images/icon-small-bold-close.svg";
import { ModalContainer } from "shareComponents/common";
import { CircularProgress } from "@mui/material";

import "../../../../styles/update-info.module.css";

type Props = {
  isToggle: boolean;
  toggle: () => void;
}

const maxLength = 4

export const ModalPinCode: FC<Props> = ({ isToggle, toggle }) => {
  const inputRefs = useRef(Array(maxLength).fill(null));

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    const currentIndex = inputRefs.current.findIndex((ref) => ref === event.target);
    const value = inputRefs.current[currentIndex].value

    const regex = /^\d$/;
    if (!regex.test(value)) {
      inputRefs.current[currentIndex].value = value.slice(0, -1);
    }

    const regexNumber = /^\d+$/;
    if (regexNumber.test(value)) {
      if (currentIndex !== -1 && currentIndex < maxLength - 1) {
        inputRefs.current[currentIndex + 1].focus();
      }
    }

    if (event.key === 'Backspace') {
      const currentIndex = inputRefs.current.findIndex((ref) => ref === event.target);

      if (currentIndex !== -1 && currentIndex > 0) {
        inputRefs.current[currentIndex - 1].focus();
      }
    }
  }

  const inputs = Array(maxLength)
    .fill(null)
    .map((_, index) => (
      <input
        key={index}
        ref={(ref) => (inputRefs.current[index] = ref)}
        type="number"
        maxLength={1}
      />
    ));

  return (
    <ModalContainer isModalOpen={isToggle} toggle={toggle}>
      <div className="inline-flex flex-col text-black max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-md" style={{ minWidth: '300px', minHeight: '150px' }}>
        <main className="mb-5 ml-6 mr-6">
          <header className="py-5 flex items-center w-full justify-between">
            <p className="font-bold text-xl">
              Cập nhật mã Pin
            </p>
            <img
              src={CloseIcon}
              alt="Close"
              className="cursor-pointer"
              onClick={toggle}
            />
          </header>
          <div className="flex justify-center items-center" style={{ minWidth: '250px', minHeight: '100px' }}>
            {/* <CircularProgress /> */}
            <div className="pin-code" onKeyUp={handleKeyUp}>
              {inputs}
            </div>
          </div>
          <button
            type="button"
            className="text-primary-light text-[15px] h-[38px] bg-primary rounded w-full"
          >
            Cập nhật
          </button>
        </main>
      </div>
    </ModalContainer>
  );
};