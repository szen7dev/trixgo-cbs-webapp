import React, { FC, useState } from 'react'
import iconNext from 'assets/images/icons8-next-page-50.png';

import { ModalProps } from 'typings/social';
import {ItemMessage} from "typings/apis/messages/listMessage";
import moment from "moment";
import {LazyLoadImage} from "react-lazy-load-image-component";

interface Props {
    images: any[]
    index?: number
    message: ItemMessage
}

const ViewImage: FC<Props & ModalProps> = ({ images, toggle, index, message }) => {
    const [imageIndex, setImageIndex] = useState<number>(index || 0);
    const handleNextImage = () => setImageIndex(imageIndex + 1);
    const handlePreviousImage = () => setImageIndex(imageIndex - 1);

    return (
        <>
            {/* Image slider */}
            <div className="flex flex-col min-h-full flex-auto text-white">
                {/* Header react with image */}
                <div className="flex justify-between px-6 pt-3 pb-7">
                    <div className="flex items-start justify-center" style={{ minWidth: "100px" }}>
                        <button className="focus:outline-none rounded-3xl mr-8" onClick={toggle}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div>
                            <p className="text-base">{message.sender.fullname}</p>
                            <p className="text-sm">{moment(message.createAt).format("hh:mm:ss DD/MM/YYYY")}</p>
                        </div>
                    </div>
                    <div className="flex gap-x-5">
                        <button className="h-11 w-11 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                        </button>
                        <button className="h-11 w-11 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                            </svg>
                        </button>
                        <a href={images[imageIndex].file.file.url} download className="h-11 w-11 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
                {/* Main images */}
                <div className="flex flex-grow overflow-hidden">
                    <div className="flex items-center px-3 select-none">
                        <button className="media__btn border-none outline-none disabled:opacity-30" disabled={imageIndex === 0} onClick={handlePreviousImage}>
                            <LazyLoadImage effect="blur" src={iconNext} alt="next" className="react__slider-btn" />
                        </button>
                    </div>
                    <div className="react__slider flex flex-1 justify-center px-2">
                        <LazyLoadImage effect="blur" className="max-h-full object-contain w-full" alt="..." src={images[imageIndex].file.file.url} />
                    </div>
                    <div className="flex items-center px-3 select-none">
                        <button className="media__btn border-none outline-none disabled:opacity-30" disabled={imageIndex === images.length - 1} onClick={handleNextImage}>
                            <LazyLoadImage effect="blur" src={iconNext} alt="next" className="react__slider-btn transform rotate-180" />
                        </button>
                    </div>
                </div>
                {/* Footer Image */}
                <div className="react__images-footer text-center py-7">
                {/*    Chứng kiến công tác thí nghiệm thép tại công trường số 3, Hoàng Tôn....*/}
                </div>
            </div>
        </>
    )
}

export default ViewImage
