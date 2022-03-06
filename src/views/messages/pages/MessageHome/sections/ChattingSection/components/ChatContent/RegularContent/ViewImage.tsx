import React, {FC, useRef, useState} from 'react'
import iconNext from 'assets/images/icons8-next-page-50.png';

import { ModalProps } from 'typings/media';
import {ItemMessage} from "typings/apis/messages/listMessage";
import moment from "moment";
import {ReactZoomPanPinchRef, TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import cn from "classnames";

interface Props {
    imageList: string[]
    index?: number
    message?: ItemMessage
}

export const ViewImage: FC<Props & ModalProps> = ({ imageList, toggle, index, message }) => {
    const [imageIndex, setImageIndex] = useState<number>(index || 0);
    const [isZoom, setIsZoom] = useState<boolean>(false);
    const transform = useRef<ReactZoomPanPinchRef>(null);
    const settings = {
        min: 1,
        max: 8,
        step: 0.03
    }

    const handleNextImage = () => setImageIndex(imageIndex + 1);
    const handlePreviousImage = () => setImageIndex(imageIndex - 1);
    const handleZoom = (e: ReactZoomPanPinchRef) => {
        if (e.state.scale === settings.min) {
            setIsZoom(false)
        } else if (!isZoom && e.state.scale !== settings.min) {
            setIsZoom(true);
        }
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
                        <button onClick={() => { transform.current?.zoomIn(); setIsZoom(true) }} className="h-11 w-11 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                        </button>
                        <button onClick={() => {
                            transform.current?.zoomOut();
                            if (transform.current?.state.scale === 1) { setIsZoom(false) }
                        }} className="h-11 w-11 text-center">
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
                    <div className="react__slider flex flex-1 justify-center px-2">
                        <TransformWrapper
                            initialScale={1}
                            initialPositionX={0}
                            initialPositionY={0}
                            wheel={{ step: settings.step }}
                            onZoomStop={handleZoom}
                            onZoomStart={handleZoom}
                            centerZoomedOut
                            centerOnInit
                            ref={transform}
                        >
                            {({ zoomIn, zoomOut, resetTransform, ...rest }) => {
                                // console.log(rest.state.positionX)
                                return (
                                    <React.Fragment>
                                        <div className={cn("absolute bottom-9 z-10 bg-black opacity-60 rounded-lg flex items-center gap-x-2 text-white p-4", !isZoom ? "opacity-0 invisible" : '')}>
                                            <button onClick={() => {
                                                zoomOut()
                                                if (transform.current?.state.scale === 1) { setIsZoom(false) }
                                            }} className="h-6 w-6 text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                                                </svg>
                                            </button>
                                            <input value={rest.state.scale} className='input-slider' type="range" min={settings.min} max={settings.max} step={settings.step} onInput={e => rest.centerView(Number(e.currentTarget.value), 0)} />
                                            <button onClick={() => zoomIn()} className="h-6 w-6 text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                </svg>
                                            </button>
                                        </div>
                                        <TransformComponent
                                            wrapperStyle={{
                                                overflow: 'visible',
                                                position: 'relative',
                                                // width: '100%',
                                                margin: 'auto'
                                            }}
                                            wrapperClass='inset-0 justify-center items-center'
                                        >
                                            <img className="max-h-full object-contain w-full" alt="..." src={imageList[imageIndex]} />
                                        </TransformComponent>
                                    </React.Fragment>
                                )
                            }}
                        </TransformWrapper>
                    </div>
                    <div className="flex items-center px-3 select-none">
                        <button className="media__btn border-none outline-none disabled:opacity-30" disabled={imageIndex === imageList.length - 1} onClick={handleNextImage}>
                            <img  src={iconNext} alt="next" className="react__slider-btn transform rotate-180" />
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
