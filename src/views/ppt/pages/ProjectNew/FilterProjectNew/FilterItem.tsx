import * as React from 'react';
import JobDialog from '../DialogProjectDetail';

import icons8pdf from "assets/images/icons8-pdf-100 1.svg";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const FilterItem: React.FC = () => {
    const [selectStar, setSelectStar] = React.useState(false)
    // dialog
    const emails = ['username@gmail.com', 'user02@gmail.com'];
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
        // setSelectedValue(value);
    };
    return (
        <div>
            <div className="flex justify-between gap-6 py-3">
                <div className="flex">
                    <div className="w-[50px]">
                        <input type="checkbox" />
                    </div>
                    <div>
                        <div className="flex">
                            <a onClick={handleClickOpen}>
                                <div className="flex cursor-pointer	">
                                    <span className="rounded px-3 py-[1px] text-white bg-cbs-orage mr-[5px] text-sm">Cao</span>
                                    <span className="font-bold text-sm	truncate max-w-4xl  mr-[5px]">Kiểm tra rà soát việc dự thầu các đơn vị gói cọc Marriott và xây dựng giá gói thầu Kiểm tra rà soát việc dự thầu các đơn vị gói cọc Marriott và xây dựng giá gói thầu Kiểm tra rà soát việc dự thầu các đơn vị gói cọc Marriott và xây dựng giá gói thầu</span>
                                </div>
                            </a>
                            <button onClick={() => setSelectStar(!selectStar)}>
                                {(selectStar ? <StarIcon sx={{ color: '#FFCA28', width: 14, height: 14 }} /> : <StarBorderIcon sx={{ color: '#FFCA28', width: 14, height: 14 }} />)}
                            </button>
                        </div>
                        <div className="my-1 text-primary-gray text-xs truncate max-w-4xl">
                            BLD-721 - PGI.BLD - Người tạo: Trương Thành Văn-TRX - Ngày tạo: 15/2/2021 15:30
                        </div>
                        <div className="my-1 text-primary-gray text-xs truncate max-w-4xl">
                            Phùng Thị Thu-TRX: Kính gửi anh Hiếu và các anh Chủ đầu tư, Đính kèm là Biên bản họp giao ban tuần 1 tháng 12.2021 ngày 10/12/2021 lúc 2:00 PM giữa Chủ đầu tư và Ban quản lý dự án...
                        </div>
                        <div className="flex gap-3 text-sm my-1">
                            <button className="rounded-full flex gap-2 border-0.5 border-cbs-border px-3 py-1">
                                <img src={icons8pdf} alt="" />
                                <span>2022.09.26.FCT</span>
                            </button>
                            <button className="rounded-full border-0.5 border-cbs-border py-1 px-2">+2</button>
                        </div>
                    </div>
                </div>
                <div className="flex text-primary-gray">
                    <div className="w-[100px]">12/10/2022</div>
                    <div className="w-[100px]">Đang triển khai</div>
                </div>
            </div>
            <JobDialog
                selectedValue=""
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}
export default FilterItem;