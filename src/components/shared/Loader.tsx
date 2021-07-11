import { FC } from "react";

import cn from "classnames";

import Spinner from "components/common/Spinner";

type Props = {
  className?: string;
};

const Loader: FC<Props> = ({ className }) => {
  return (
    <div className="w-full h-full fixed flex justify-center top-0 left-0 bg-primary-light opacity-75 z-50 pt-96">
      <Spinner
        className={cn({
          [className as string]: className,
        })}
      />
    </div>
  );
};

export default Loader;
