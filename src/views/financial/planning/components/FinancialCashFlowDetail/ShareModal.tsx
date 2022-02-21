import React, {createContext, FC, useMemo, useState} from "react";
import ShareToPerSon from "./ShareModalPages/ShareToPerson";
import ShareListing from "./ShareModalPages/ShareListing";

export const ShareContext = createContext<{
    shareUser: Array<string|number|undefined>;
    setShareUser: React.Dispatch<React.SetStateAction<Array<string|number|undefined>>>;
}>({
    shareUser: [],
    setShareUser: () => undefined,
});

const ShareModal:FC = () => {
    const [shareUser, setShareUser] = useState<Array<string|number|undefined>>([]);
    const value = useMemo(
        () => ({ shareUser, setShareUser }),
        [shareUser]
    );

    return (
        <ShareContext.Provider value={value}>
            {
                shareUser.length > 0 ?
                    <ShareToPerSon/>:
                    <ShareListing/>
            }
        </ShareContext.Provider>
    )
}

export default ShareModal;
