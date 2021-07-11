import { FC } from "react";

import cn from "classnames";

type Props = {
  className?: string;
};

const Spinner: FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full h-14 w-14 border-t-4 border-b-4",
        {
          [className as string]: className,
        }
      )}
    />
  );
};

export default Spinner;
