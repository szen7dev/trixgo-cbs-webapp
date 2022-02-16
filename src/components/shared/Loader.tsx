import { FC } from "react";

import cn from "classnames";

import Spinner from "components/common/Spinner";

type Props = {
  className?: string;
  absolute?: boolean;
};

const Loader: FC<Props> = ({ className, absolute = false }) => {
  return (
    <div 
      className={cn("w-full h-full flex justify-center top-0 left-0 bg-primary-light opacity-75 z-50 pt-96", {
        "absolute": absolute,
        "fixed": !absolute,
      })}
    >
      <Spinner
        className={cn({
          [className as string]: className,
        })}
      />
    </div>
  );
};

export default Loader;