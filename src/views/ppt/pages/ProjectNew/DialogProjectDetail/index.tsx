import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import iconsEye from "assets/images/icons8-eye-96 2.svg";
import iconsPrint from "assets/images/icons8-print-96 1.svg";
import iconsLink from "assets/images/icons8-link-96 1.svg";
import iconsClose from "assets/images/iconCloseDialog.svg";
import iconsTask from "assets/images/icons8-task-completed-48 1.svg";
import defaultAva from "assets/images/image 166.jpg";
import iconClock from "assets/images/icons8-snooze-48 1.svg";
import CommentProvider from 'views/pcm/contexts/comment/comment.provider';
import { TaskDetailComment } from 'views/pcm/pages/PcmDetailTaskV2/components/TaskDetailComment';
import { useTask } from 'services/hooks/useTask';
import { useParams } from 'react-router-dom';
import DialogComment from './Comment';

export interface DialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

export default function JobDialog(props: DialogProps) {
    const [selectStar, setSelectStar] = React.useState(false)
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
    };
    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth={"lg"}>
            <div className='pb-3 h-full overflow-y-auto	'>
                <div className='flex justify-between border-b-0.5 pt-4 pb-3 px-8 sticky top-0 bg-white'>
                    <div className='text-primary-gray'>
                        PGI.BLD / CVI / NBO / BLD-122
                    </div>
                    <div className='flex gap-3'>
                        <button onClick={() => setSelectStar(!selectStar)}>
                            {(selectStar ? <StarIcon sx={{ color: '#FFCA28', width: 14, height: 14 }} /> : <StarBorderIcon sx={{ color: '#FFCA28', width: 14, height: 14 }} />)}
                        </button>
                        <div className='flex gap-1 ml-6'>
                            <img src={iconsEye} alt="" /> <span>122</span>
                        </div>
                        <button className="ml-6">
                            <img src={iconsPrint} alt="" />
                        </button>
                        <button className="ml-6">
                            <img src={iconsLink} alt="" />
                        </button>
                        <button onClick={handleClose} className="ml-6">
                            <img src={iconsClose} alt="" />
                        </button>
                    </div>
                </div>
                <div className="w-full px-8 py-3">
                    <div className='flex gap-7'>
                        <div className='w-2/3'>
                            <div className='text-2xl font-bold'>
                                Change the status error message background to popup in dashboad page instead
                            </div>
                            <div className='text-sm'>
                                <div className='flex gap-2 py-3'>
                                    <img src={iconsTask} alt="" />
                                    <span className='text-primary-gray'>Việc cha: Hồ sơ thanh toán của công ty tư vấn thiết kế 112</span>
                                </div>
                                <div className='py-3'>
                                    <div className='font-bold'>
                                        Mô tả
                                    </div>
                                    <div className='text-primary-gray'>
                                        Đây là cuộc điện đàm thứ hai giữa các Bộ trưởng Quốc phòng Nga Sergei Shoigu và Mỹ Lloyd Austin kể từ khi bắt đầu chiến dịch quân sự đặc biệt ở Ukraine. Cuộc trò chuyện đầu tiên diễn ra vào giữa tháng 5. Cả hai lần, hai bộ trưởng đều thảo luận về an ninh quốc tế và tình hình Ukraine.
                                    </div>
                                </div>
                                <div className='py-3'>
                                    <div className='font-bold mb-2'>
                                        Hoạt động
                                    </div>
                                    <div>
                                        <DialogComment />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-1/3 border-0.5 border-cbs-border'>
                            <div className='border-b-0.5 px-3 py-4 text-sm	font-bold text-primary-gray'>Chi tiết</div>
                            <div className='px-3 py-4'>
                                <div className='flex mb-6'>
                                    <div className='w-[150px] text-sm	font-bold text-primary-gray'>
                                        Thực hiện
                                    </div>
                                    <div className='w-[250px] flex gap-2'>
                                        <img src={defaultAva} alt="" className='w-[24px] h-[24px] rounded-full' />
                                        <div>Nguyễn Phan Thanh Toan-KAA</div>
                                    </div>
                                </div>
                                <div className='flex  mb-6'>
                                    <div className='w-[150px] text-sm	font-bold text-primary-gray'>
                                        Tạo việc
                                    </div>
                                    <div className='w-[250px] flex gap-2'>
                                        <img src={defaultAva} alt="" className='w-[24px] h-[24px] rounded-full' />
                                        <div>
                                            <div>Nguyễn Phan Thanh Toan-KAA</div>
                                            <div className='text-primary-gray'>15/2/2021 15:30</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex mb-6'>
                                    <div className='w-[150px] text-sm	font-bold text-primary-gray'>
                                        Thời hạn
                                    </div>
                                    <div className='w-[250px]'>
                                        <div className='flex'>
                                            <span className='mr-[16px]'>15/2/2021 15:30</span>
                                            <img src={iconClock} alt="" className='mr-[6px]' />
                                            <span className='text-primary-gray'>1 ngày</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex mb-6'>
                                    <div className='w-[150px] text-sm	font-bold text-primary-gray'>
                                        Trạng thái
                                    </div>
                                    <div className='w-[250px]'>
                                        <span className='bg-primary text-white rounded-full px-2'>Đang triển khai</span>
                                    </div>
                                </div>
                                <div className='flex mb-6'>
                                    <div className='w-[150px] text-sm	font-bold text-primary-gray'>
                                        Ưu tiên
                                    </div>
                                    <div className='w-[250px]'>
                                        <span className='bg-cbs-orage text-white rounded-full px-2'>Cao</span>
                                    </div>
                                </div>
                                <div className='flex mb-6'>
                                    <div className='w-[150px] text-sm	font-bold text-primary-gray'>
                                        Tính chất
                                    </div>
                                    <div className='w-[250px]'>
                                        Đề nghị phê duyệt
                                    </div>
                                </div>
                                <div className='flex mb-6'>
                                    <div className='w-[150px] text-sm	font-bold text-primary-gray'>
                                        Người liên quan
                                    </div>
                                    <div className='w-[250px]'>
                                        <div className='whitespace-normal'>Nguyễn Phan Thanh Hương-CPMI, Nguyễn Phan Thanh Hương-CPMI, Nguyễn Phan Thanh Hương-CPMI, Nguyễn Phan Thanh Hương-CPMI, Nguyễn Phan Thanh Hương-CPMI, Nguyễn Phan Thanh Hương-CPMI</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}