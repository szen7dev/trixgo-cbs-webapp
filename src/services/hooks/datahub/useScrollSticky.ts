import React, { useEffect } from "react";

const useScrollSticky = (
  id: string,
  options: {
    offsetTop: number;
    offsetBottom: number;
  } = {
    offsetTop: 0,
    offsetBottom: 0,
  }
): {
  sticky: React.RefObject<HTMLDivElement>;
  innerRef: React.RefObject<HTMLDivElement>;
} => {
  const sticky = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastScrollTop = 0;
    let type = "up";
    function handleScroll(this: HTMLDivElement, event: Event) {
      if (!sticky.current || !innerRef.current) return;
      if (sticky.current.scrollHeight <= this.clientHeight)
        return (sticky.current.style.top = options.offsetTop + "px");

      if (type === "up" && lastScrollTop < this.scrollTop) {
        // downscroll code
        const scrolled =
          innerRef.current.offsetTop +
          innerRef.current.scrollHeight -
          this.scrollTop;
        if (scrolled >= 0) {
          if (this.scrollTop <= innerRef.current.offsetTop - options.offsetTop)
            innerRef.current.style.height = "";
          else
            innerRef.current.style.height =
              innerRef.current.scrollHeight -
              scrolled +
              options.offsetTop +
              "px";
        }

        sticky.current.style.top =
          this.clientHeight -
          sticky.current.scrollHeight -
          options.offsetBottom +
          "px";
        sticky.current.style.bottom = "";
        type = "down";
      } else if (type === "down" && lastScrollTop > this.scrollTop) {
        // upscroll code

        innerRef.current.style.height =
          sticky.current.offsetTop - innerRef.current.offsetTop + "px";
        sticky.current.style.bottom =
          this.clientHeight -
          sticky.current.scrollHeight -
          options.offsetTop +
          "px";
        sticky.current.style.top = "";
        type = "up";
      }
      lastScrollTop = this.scrollTop;
    }
    document.querySelector(id)?.addEventListener("scroll", handleScroll, false);
    return () => {
      document
        .querySelector(id)
        ?.removeEventListener("scroll", handleScroll, false);
    };
  }, []);
  return { sticky, innerRef };
};

export default useScrollSticky;
