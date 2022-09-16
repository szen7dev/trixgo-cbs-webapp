import React, { FC } from "react";
import iconWallet from "assets/images/icons8-wallet-100.png";

type Props = {
  title: string | number;
  description: string;
};

const Wallethub: FC<Props & Omit<React.HTMLAttributes<HTMLDivElement>, "title">> = ({
  title,
  description,
  ...props
}) => {
  return (
    <div className="flex flex-col items-center">
      <img src={iconWallet} alt="Icon wallet" className="w-6 h-6" />
      <p className="text-x-large mt-1.5">
        <strong>{title}</strong>
      </p>
      <p className="text-medium text-cbs-subtext mt-1">{description}</p>
    </div>
  );
};

export default Wallethub;
