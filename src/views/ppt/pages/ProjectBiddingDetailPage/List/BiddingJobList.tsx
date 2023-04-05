import * as React from 'react'
import iconAdd from "../../../../../assets/images/icons8-add-96-2.svg";
import iconStar from "../../../../../assets/images/icons8-star-96 3.svg";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function BiddingJobList() {
    const [selectStar, setSelectStar] = React.useState(false)
    return (
        <div className='py-4'>
            <div className='flex justify-between my-6'>
                <div className='text-cbs-subtext text-lg  ml-3'>
                    Công việc <span>(4)</span>
                </div>
                <div>
                    <a href="#"><img src={iconAdd} alt="" /></a>
                </div>
            </div>
            <div>
                <div className='flex w-full'>
                    <div className='w-[50px] text-center'><input type="checkbox" /></div>
                    <div className='bidding-job-list-detail'>
                        <div>
                            <span className='font-bold'>Kiểm tra rà soát việc dự thầu các đơn vị gói cọc Marriott và xây dựng giá gói thầu </span>
                            <span className='px-2 py-0.5 bg-cbs-orage text-white text-xs	rounded'>High</span>
                        </div>
                        <div className='text-cbs-subtext'>
                            <span>BLD-721 - PGI.BLD - Người tạo: Trương Thành Văn-TRX - Ngày tạo: 15/2/2021 15:30</span>
                        </div>
                    </div>
                    <div className='w-[100px] text-cbs-subtext'>
                        15/9/2022
                    </div>
                    <div className='w-[100px] text-cbs-subtext'>
                        Đang triển khai
                    </div>
                </div>
                <div className='flex w-full'>
                    <div className='w-[50px] text-center'><input type="checkbox" /></div>
                    <div className='bidding-job-list-detail'>
                        <div>
                            <span className='font-bold'>Kiểm tra rà soát việc dự thầu các đơn vị gói cọc Marriott và xây dựng giá gói thầu </span>
                            {/* <span className='px-2 py-0.5 bg-cbs-orage text-white text-xs rounded'>High</span> */}
                            <button onClick={() => setSelectStar(!selectStar)}>
                                {(selectStar ? <StarBorderIcon sx={{ color: '#FFCA28', width:14, height:14 }} /> : <StarIcon sx={{ color: '#FFCA28', width:14, height:14 }} />)}
                            </button>
                        </div>
                        <div className='text-cbs-subtext'>
                            <span>BLD-721 - PGI.BLD - Người tạo: Trương Thành Văn-TRX - Ngày tạo: 15/2/2021 15:30</span>
                        </div>
                    </div>
                    <div className='w-[100px] text-cbs-subtext'>
                        15/9/2022
                    </div>
                    <div className='w-[100px] text-cbs-subtext'>
                        Đang triển khai
                    </div>
                </div>
            </div>
        </div>
    );
}
