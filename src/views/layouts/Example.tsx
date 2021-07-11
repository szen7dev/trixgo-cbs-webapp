import { ReactNode, FC } from "react";

type Props = {
  children: ReactNode;
};

const ExampleLayout: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <main>{children}</main>
    </div>
  );
};

export default ExampleLayout;
