import { FC } from "react";

type Props = {
  name: string;
  age: number;
};

export const SampleCommon: FC<Props> = ({ name, age }) => {
  return (
    <>
      <h1>Tên: {name}</h1>
      <h2>Tuổi: {age}</h2>
    </>
  );
};