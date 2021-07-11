import { FC } from "react";

type Props = {
  className?: string;
};

const CheckCircleIcon: FC<Props> = ({ className }) => {
  return (
    <svg
      viewBox="2 2 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={className}
    >
      <path d="m12 2a10 10 0 1 0 10 10 10.011 10.011 0 0 0 -10-10zm5.219 8-6.019 6.016a1 1 0 0 1 -1.414 0l-3.005-3.008a1 1 0 1 1 1.419-1.414l2.3 2.3 5.309-5.31a1 1 0 1 1 1.41 1.416z"></path>
    </svg>
  );
};

export default CheckCircleIcon;
