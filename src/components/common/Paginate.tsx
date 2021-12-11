import React, {FC, useState} from "react";

type Page = {
    totalPage: number;
    nextPageScope: string;
    currentIndex: number
}

type Props = {
    prevPageAction: () => void;
    nextPageAction: () => void
}

const Paginate:FC<Props> = ({prevPageAction,nextPageAction}) => {
    const [pager, setPager] = useState<Page>({
        totalPage:0,
        nextPageScope:'',
        currentIndex:0
    });
    const [isNavigating, setNavigating] =useState('');

    const handlePrevPage = () => {
        setNavigating('prev');
        prevPageAction()
    }

    const handleNextPage = () => {
        setNavigating('next');
        nextPageAction()
    }

    return (
        <div className={'min-w-24 min-h-24 pagination-container border-t z-10 flex items-center justify-center py-2'}>
            <div className="bg-white px-4 items-center flex items-center justify-center relative">
                <div className={'inline-flex'}>
                    <button
                        onClick={() => handlePrevPage()}
                        className={"relative border text-sm font-medium text-gray-700 w-px-24 h-px-24 flex items-center justify-center border-gray-300 rounded-tl-md rounded-bl-md"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={isNavigating==='prev'?"#0060E1":"currentColor"}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className={"flex items-center justify-center border-t border-b pl-4 pr-4 text-gray-700 border-gray-300"}>
                        <span> {pager.currentIndex} trong {pager.totalPage}</span>
                    </div>
                    <button
                        onClick={() => handleNextPage()}
                        className={"relative border text-sm font-medium text-gray-700 w-px-24 h-px-24 flex items-center justify-center border-gray-300 rounded-tr-md rounded-br-md"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={isNavigating==='next'?"#0060E1":"currentColor"}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={"absolute right-0 text-gray-500"}>
                180 MẨU TIN
            </div>
        </div>
    )
}

export default Paginate;
