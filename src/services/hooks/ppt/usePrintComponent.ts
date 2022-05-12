import React, { useEffect } from "react";
import { useReactToPrint } from "react-to-print";

type Props = {
  ref: React.MutableRefObject<null>;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const usePrintComponent = ({ ref: componentRef }: Props) => {
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    function handlePrintFromKeyboard(e: KeyboardEvent) {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "p" || e.charCode === 16 || e.charCode === 112 || e.keyCode === 80)
      ) {
        e.cancelBubble = true;
        e.preventDefault();

        e.stopImmediatePropagation();
        handlePrint();
      }
    }
    window.addEventListener("keydown", handlePrintFromKeyboard);
    return () => {
      window.removeEventListener("keydown", handlePrintFromKeyboard);
    };
  }, [handlePrint]);

  return handlePrint;
};

export default usePrintComponent;
