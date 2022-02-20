import { FC } from "react";
import { ListCollection1, ListCollection2, UpdateCollectionName } from "./components";

export const Page1: FC = () => {
    return (
        <>
            <ListCollection1 />
            <ListCollection2 />
            <UpdateCollectionName />
        </>
    );
};