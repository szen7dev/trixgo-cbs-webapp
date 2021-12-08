import { useEffect } from "react";

export const useOnClickOutside = (ref: any, handler: any) => {
  useEffect(
    () => {
      const listener = (event: Event) => {
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("click", listener);
      return () => {
        document.removeEventListener("click", listener);
      };
    },
   
    [ref, handler]
  );
};