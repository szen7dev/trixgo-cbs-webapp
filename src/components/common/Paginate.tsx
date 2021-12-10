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

    const handlePrevPage = () => {
        prevPageAction()
    }

    const handleNextPage = () => {
        nextPageAction()
    }

    return (
        <div className={'pagination-container border-t z-10 pt-2 pb-2'}>
            <div className="bg-white px-4 items-center sm:px-6 flex items-center justify-center">
                <div className={'inline-flex'}>
                    <button
                        onClick={() => handlePrevPage()}
                        className="relative border inline-flex items-center justify-center py-2 text-sm font-medium text-gray-700 bg-gray-200 px-2 border-gray-400"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className={"flex items-center justify-center border-t border-b bg-gray-200 pl-4 pr-4 text-gray-700 border-gray-400"}>
                        <span> {pager.currentIndex} OF {pager.totalPage}</span>
                    </div>
                    <button
                        onClick={() => handleNextPage()}
                        className="relative border inline-flex items-center justify-center py-2 text-sm font-medium text-gray-700 bg-gray-200 px-2 border-gray-400"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Paginate;
