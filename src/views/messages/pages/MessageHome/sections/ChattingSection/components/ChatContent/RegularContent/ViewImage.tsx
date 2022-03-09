import React, {FC, useRef, useState} from 'react'
import iconNext from 'assets/images/icons8-next-page-50.png';

import { ModalProps } from 'typings/media';
import {ItemMessage} from "typings/apis/messages/listMessage";
import moment from "moment";
import classNames from 'classnames';

interface Props {
    imageList: string[]
    index?: number
    message?: ItemMessage
}

export const ViewImage: FC<Props & ModalProps> = ({ imageList, toggle, index, message }) => {
    const [imageIndex, setImageIndex] = useState<number>(index || 0);
    const [isMove, setIsMove] = useState(false);
    const [zoom, setZoom] = useState(0);

    const imageRef = useRef<HTMLDivElement>(null);
    const settings = {
        min: 0,
        max: 4,
        step: 1
    };

    const handleNextImage = () => setImageIndex(imageIndex + 1);
    const handlePreviousImage = () => setImageIndex(imageIndex - 1);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        setIsMove(true);
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsMove(false);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isMove || !imageRef.current) return;
        const { a, d, e, f } = new DOMMatrixReadOnly(imageRef.current.style.transform);
        const { movementX, movementY } = event;
        imageRef.current.style.transform = `matrix(${a}, 0, 0, ${d}, ${e + movementX}, ${f + movementY})`
    }
    const handleSlide = (v: number) => {
        if (!imageRef.current) return;
        const { e, f } = new DOMMatrixReadOnly(imageRef.current.style.transform);
        switch (v) {
            case 1:
                imageRef.current.style.transform = `matrix(1.5, 0, 0, 1.5, ${e}, ${f})`;
                break;
            case 2:
                imageRef.current.style.transform = `matrix(2.2, 0, 0, 2.2, ${e}, ${f})`;
                break;
            case 3:
                imageRef.current.style.transform = `matrix(3.3, 0, 0, 3.3, ${e}, ${f})`;
                break;
            case 4:
                imageRef.current.style.transform = `matrix(5.5, 0, 0, 5.5, ${e}, ${f})`;
                break;
            default:
                imageRef.current.style.transform = "matrix(1, 0, 0, 1, 0, 0)";
                break;
        }
        setZoom(v);
    }

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
                            {message&&<p className="text-base">{message.sender.bizfullname||message.sender.fullname}</p>}
                            {message&&<p className="text-sm">{moment(message.createAt).format("hh:mm:ss DD/MM/YYYY")}</p>}
                        </div>
                    </div>
                    <div className="flex gap-x-5">
                        <button
                            onClick={() => handleSlide(1)}
                            className="h-11 w-11 text-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => handleSlide(0)}
                            className="h-11 w-11 text-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                            </svg>
                        </button>
                        <a target="_blank" href={imageList[imageIndex]} download className="h-11 w-11 text-center flex items-center" rel="noreferrer">
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
                            <img  src={iconNext} alt="next" className="react__slider-btn" />
                        </button>
                    </div>
                    <div className="relative row-start-1 row-end-[-1] col-start-1 col-end-[-1] flex flex-1 justify-center">
                        <div className='w-full h-full'>
                            <div
                                className='w-full h-full'
                                onMouseDown={handleMouseDown}
                                onMouseUp={handleMouseUp}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseUp}
                                draggable={false}
                            >
                                <div
                                    ref={imageRef}
                                    className={classNames("relative w-full h-full", isMove ? "transition-none" : "transition-transform duration-300 ease-in")}
                                    style={{ transform: "matrix(1, 0, 0, 1, 0, 0)" }}
                                >
                                    <div className='absolute inset-0 py-12 inline-flex items-center justify-center'>
                                        <img
                                            className="object-contain max-w-screen max-h-[calc(100vh-8.25rem)]"
                                            alt="..."
                                            src={imageList[imageIndex]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center px-3 select-none">
                        <button className="media__btn border-none outline-none disabled:opacity-30" disabled={imageIndex === imageList.length - 1} onClick={handleNextImage}>
                            <img  src={iconNext} alt="next" className="react__slider-btn transform rotate-180" />
                        </button>
                    </div>
                    <div className={classNames("absolute left-1/2 bottom-5 -translate-x-1/2 z-10 bg-black opacity-60 rounded-lg flex items-center gap-x-2 text-white p-4", !zoom ? "opacity-0 invisible" : '')}>
                        <button
                            onClick={() => handleSlide(zoom < settings.min ? 0 : zoom - 1)}
                            className="h-6 w-6 text-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                            </svg>
                        </button>
                        <input
                            className='input-slider'
                            type="range"
                            value={zoom}
                            min={settings.min}
                            max={settings.max}
                            step={settings.step}
                            onChange={e => handleSlide(Number(e.target.value))}
                        />
                        <button
                            onClick={() => handleSlide(zoom > settings.max ? 4 : zoom + 1)}
                            className="h-6 w-6 text-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
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
