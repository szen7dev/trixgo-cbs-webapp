import React, {FC, HTMLAttributes, useEffect, useState} from "react";

type Props = {
    prevPageAction?: () => void;
    nextPageAction?: () => void;
    isFetching?: boolean;
    totalRecord?: number;
    totalPages?:number;
    hasNextPage?:boolean;
}

const Paginate:FC<Props & HTMLAttributes<HTMLDivElement>> = ({prevPageAction,nextPageAction,totalRecord, totalPages, isFetching, hasNextPage, ...props}) => {
    const [isNavigating, setNavigating] = useState('');
    const [currentIndex, setCurrentIndex] = useState(1);

    useEffect(() => {
        if (!isFetching) {
            setNavigating('');
        }
    },[isFetching])
    const handlePrevPage = () => {
        setNavigating('prev');
        setCurrentIndex(currentIndex => currentIndex-1);
        if (prevPageAction) prevPageAction()
    }

    const handleNextPage = () => {
        setNavigating('next');
        setCurrentIndex(currentIndex => currentIndex+1);
        if (nextPageAction) nextPageAction()
    }

    return (
        <div className={'min-w-24 min-h-24 absolute bottom-0 w-full border-t z-10 flex items-center justify-center py-2 bg-white'} {...props}>
            <div className="bg-white px-4 items-center flex items-center justify-center relative">
                <div className={'inline-flex'}>
                    <button
                        disabled={currentIndex===1||isFetching}
                        onClick={() => handlePrevPage()}
                        className={"relative border text-sm font-medium text-gray-700 w-px-24 h-px-24 flex items-center justify-center border-gray-300 rounded-tl-md rounded-bl-md"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={isNavigating==='prev'?"#0060E1":"currentColor"}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className={"flex items-center justify-center border-t border-b pl-4 pr-4 text-gray-700 border-gray-300"}>
                        <span> {currentIndex} trong {totalPages}</span>
                    </div>
                    <button
                        disabled={!hasNextPage||isFetching}
                        onClick={() => handleNextPage()}
                        className={"relative border text-sm font-medium text-gray-700 w-px-24 h-px-24 flex items-center justify-center border-gray-300 rounded-tr-md rounded-br-md"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={isNavigating==='next'?"#0060E1":"currentColor"}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={"absolute right-2 text-gray-500"}>
                {totalRecord} MẨU TIN
            </div>
        </div>
    )
}

export default Paginate;
