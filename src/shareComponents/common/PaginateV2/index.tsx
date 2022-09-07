import React, {forwardRef, useState, useImperativeHandle} from "react";
import nextIcon from "assets/images/icons-arrow-next.svg";

type Props = {
    prevPageAction?: () => void;
    nextPageAction?: () => void;
    isFetching?: boolean;
    limit?: number;
    totalRecord?: number;
    totalPages?: number;
    hasNextPage?: boolean;
    fitContent?: boolean
};

type PaginateHandle = {
    resetPaginate: () => void
}
const PaginateV2 = forwardRef<PaginateHandle, Props>(
    ({fitContent, prevPageAction, nextPageAction, limit = 10, totalRecord = 0, totalPages, isFetching, hasNextPage, ...props}, paginateRef) => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const totalPagesNumber = totalPages || 0

    useImperativeHandle(paginateRef, () => ({
        resetPaginate() {
            setCurrentIndex(1);
        }
    }));

    const handlePrevPage = () => {
        setCurrentIndex(currentIndex => currentIndex - 1);
        if (prevPageAction) prevPageAction()
    }

    const handleNextPage = () => {
        if (currentIndex < totalPagesNumber) {
            setCurrentIndex(currentIndex => currentIndex + 1);
        }
        if (nextPageAction) nextPageAction()
    }

    return (
        <div className={(fitContent?"":"flex-1") + " flex items-center justify-end"}>
            <span className={"text-primary-gray"}>{(currentIndex - 1) * limit + 1}-{(currentIndex * limit) >= totalRecord ? totalRecord : currentIndex * limit} trong số {totalRecord}</span>
            <button
                onClick={handlePrevPage}
                disabled={currentIndex === 1 || isFetching}
                className={"w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"}>
                <img src={nextIcon} alt={"----"} className={"rotate-180"}/>
            </button>
            <button
                onClick={handleNextPage}
                disabled={isFetching || currentIndex >= totalPagesNumber}
                className={"w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"}>
                <img src={nextIcon} alt={"----"}/>
            </button>
        </div>
    )
})

PaginateV2.displayName = "PaginateV2";

export default PaginateV2;