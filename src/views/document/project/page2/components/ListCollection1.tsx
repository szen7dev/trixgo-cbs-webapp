import { FC } from "react";
import { CommonComponent1 } from "../../../shareComponents/common";
import { useFetchListHuman } from "services/hooks/useHuman";

export const ListCollection1: FC = () => {
  const humans: any = useFetchListHuman({});
  return (
    <>
      {
        humans.map((item: any, index: number) => (
          <CommonComponent1 key={index} name={item.name} age={item.age} />
        ))
      }
    </>
  );
};