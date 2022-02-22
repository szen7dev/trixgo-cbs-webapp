import { FC } from "react";
import { Filter } from "../../shareComponents/common";
import { Layout1 } from "../../shareComponents/layouts";
import { ListCollection1, ListCollection2, UpdateCollectionName } from "./components";

export const Page1: FC = () => {
    return (
        <>
            <UpdateCollectionName />
            <Filter />
            <Layout1>
                <ListCollection1 />
                <ListCollection2 />
            </Layout1>
        </>
    );
};