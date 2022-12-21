import * as React from 'react';
import defaultAva from "assets/images/image 166.jpg";
import iconReply from "assets/images/icons8-reply-arrow-48 1.svg";
import iconAttach from "assets/images/icons8-attach.svg";
import iconLink from "assets/images/icons8-link-96 1.svg";
import iconEmoji from "assets/images/icons8-grinning-face-with-sweat-48 7.svg";

const DialogComment: React.FC = () => {
    return (
        <div>
            <div className='text-primary'>Xem <span>152</span> bình luận trước</div>
            <div className='border-b-0.5 border-cbs-border'>
                <div className='flex gap-2 py-3'>
                    <div className='w-[50px]'>
                        <img src={defaultAva} alt="" className='w-[44px] h-[44px] rounded-full' />
                    </div>
                    <div className='w-full'>
                        <div>
                            <div className='flex justify-between'>
                                <div className='font-bold'>Vũ Thanh Bình-CPMI</div>
                                <div className='flex gap-7'>
                                    <div className='text-primary-gray'>15:30 22/12/2012 (10 day ago)</div>
                                    <img src={iconReply} alt="" />
                                    <input type="checkbox" />
                                </div>
                            </div>
                            <div className='text-primary-gray'>tới Lê Lưu Phong-CPMI, Nguyễn Đắc Toàn-TRX và 3 người khác</div>
                            <div>
                                <p>
                                    Gửi anh Phong, <br />
                                    Em thêm Mr.Phan Châu Tín-ARMO và Mr. Nguyễn Mạnh Hùng-ARMO
                                </p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='flex gap-2'>
                                    <img src={iconAttach} alt="" />
                                    <div>
                                        <div className='text-cbs-highlight-color'>20220223-CPMI.PGI.NBK.VPU-HopTraoDoi.pdf (111 KB)</div>
                                        <div className='text-primary-gray'>Vũ Thanh Bình-CPMI 25/02/2022 16:44 (1 day ago)</div>
                                    </div></div>
                                <div>
                                    <textarea name="" id="" cols={20} rows={2}></textarea>
                                </div>
                                <button><img src={iconLink} alt="" /></button>
                            </div>
                            <div className='flex justify-between'>
                                <div className='flex gap-6 text-primary-gray'>
                                    <div className='font-bold'>Thích</div>
                                    <div className='font-bold'>Trả lời</div>
                                    <div>15:30 22/12/2012 (2 day ago)</div>
                                </div>
                                <div className='flex gap-1 text-xs'>
                                    <span>215</span>
                                    <img src={iconEmoji} alt="" />
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-2 py-3'>
                            <div className='w-[50px]'>
                                <img src={defaultAva} alt="" className='w-[44px] h-[44px] rounded-full' />
                            </div>
                            <div className='w-full'>
                                <div>
                                    <div className='flex justify-between'>
                                        <div className='font-bold'>Vũ Thanh Bình-CPMI</div>
                                        <div className='flex gap-7'>
                                            <div className='text-primary-gray'>15:30 22/12/2012 (10 day ago)</div>
                                            <img src={iconReply} alt="" />
                                            <input type="checkbox" />
                                        </div>
                                    </div>
                                    <div className='text-primary-gray'>tới Lê Lưu Phong-CPMI, Nguyễn Đắc Toàn-TRX và 3 người khác</div>
                                    <div>
                                        <p>
                                            Gửi anh Phong, <br />
                                            Em thêm Mr.Phan Châu Tín-ARMO và Mr. Nguyễn Mạnh Hùng-ARMO
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex gap-2'>
                                            <img src={iconAttach} alt="" />
                                            <div>
                                                <div className='text-cbs-highlight-color'>20220223-CPMI.PGI.NBK.VPU-HopTraoDoi.pdf (111 KB)</div>
                                                <div className='text-primary-gray'>Vũ Thanh Bình-CPMI 25/02/2022 16:44 (1 day ago)</div>
                                            </div></div>
                                        <div>
                                            <textarea name="" id="" cols={20} rows={2}></textarea>
                                        </div>
                                        <button><img src={iconLink} alt="" /></button>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-6 text-primary-gray'>
                                            <div className='font-bold'>Thích</div>
                                            <div className='font-bold'>Trả lời</div>
                                            <div>15:30 22/12/2012 (2 day ago)</div>
                                        </div>
                                        <div className='flex gap-1 text-xs'>
                                            <span>215</span>
                                            <img src={iconEmoji} alt="" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex pt-3 pb-4 w-full gap-2'>
                <div className='w-[50px]'>
                    <img src={defaultAva} alt="" className='w-[44px] h-[44px] rounded-full' />
                </div>
                <div className='w-full'>
                    <textarea
                        className="rounded-lg resize-none w-[600px] border-0.5 border-cbs-border px-3 py-1 w-full"
                        style={{outline: 0, }}
                        placeholder='Add a comment....'
                    >
                    </textarea>
                </div>
            </div>
        </div>
    );
}
export default DialogComment;