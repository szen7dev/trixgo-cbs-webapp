import * as React from 'react';
import JobDialog from '../DialogProjectDetail';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

import icons8pdf from "assets/images/icons8-pdf-100 1.svg";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import moment from 'moment';
import { PCM_STATUS_TASK } from 'apis/localdb';
import { subContentHtml } from 'views/homepage/pages';
import { useTask } from 'services/hooks/useTask';

const FilterItem = ({ item, userId }: any) => {
    const [selectStar, setSelectStar] = React.useState(item?.flags?.includes(userId) ?? false);
    const [open, setOpen] = React.useState(false);

    const { updateTaskAsync } = useTask({});

    const handleClose = () => setOpen(false);

    const handleMarkTask = async () => {
        setSelectStar(!selectStar);
        try {
            const { error, data } = await updateTaskAsync({
                taskID: item._id,
                ...selectStar ? { flagsRemoves: [userId] } : { flags: [userId] }
            })

            if(error) return toast.warn(data?.message);
        } catch (error) {
            if(error instanceof Error)
                toast.error(error.message);
            if(typeof error === 'string')
                toast.error(error);
        }
    };

    const files = item?.lastComment?.files && item?.lastComment?.files.length ? item?.lastComment?.files : [];
    const images = item?.lastComment?.images && item?.lastComment?.images.length ? item?.lastComment?.images : [];

    return (
        <div>
            <div className="flex justify-between gap-6 py-3">
                <div className="flex">
                    <div className="w-[50px]">
                        <input type="checkbox" />
                    </div>
                    <div>
                        <div className="flex">
                            <Link to={`/pcm/detail/${item._id}`}>
                                <div className="flex cursor-pointer	">
                                    {item?.priority === 3 ?
                                        <span className="rounded px-3 py-[1px] text-white bg-cbs-orage mr-[5px] text-sm">Cao</span> :
                                        <></>
                                    }
                                    <span className="font-bold text-sm	truncate max-w-4xl  mr-[5px]">{subContentHtml(item?.name)}</span>
                                </div>
                            </Link>
                            {/* <a onClick={handleClickOpen}>
                                <div className="flex cursor-pointer	">
                                    {item?.priority === 3 ?
                                        <span className="rounded px-3 py-[1px] text-white bg-cbs-orage mr-[5px] text-sm">Cao</span> :
                                        <></>
                                    }
                                    <span className="font-bold text-sm	truncate max-w-4xl  mr-[5px]">{subContentHtml(item?.name)}</span>
                                </div>
                            </a> */}
                            <button onClick={handleMarkTask}>
                                {(selectStar ? <StarIcon sx={{ color: '#FFCA28', width: 14, height: 14 }} /> : <StarBorderIcon sx={{ color: '#FFCA28', width: 14, height: 14 }} />)}
                            </button>
                        </div>
                        <div className="my-1 text-primary-gray text-xs truncate max-w-4xl">
                            {item?.project?.sign} - Người tạo: {item?.author?.fullname} - Ngày tạo: {moment(item?.createAt).format('DD/MM/YYYY HH:mm')}
                        </div>
                        {item?.lastComment?.author?.fullname ?
                            <div className="my-1 text-primary-gray text-xs truncate max-w-4xl">
                                {item?.lastComment?.author?.fullname}: {subContentHtml(item?.lastComment?.content)}
                            </div> : <></>
                        }
                        {images.length ?
                            <div className="flex gap-3 text-sm my-1">
                                <button className="rounded-full flex gap-2 border-0.5 border-cbs-border px-3 py-1">
                                    <img src={icons8pdf} alt="" />
                                    <span>{images[0]?.nameOrg}</span>
                                </button>
                                {images.length - 1 > 0 ?
                                    <button className="rounded-full border-0.5 border-cbs-border py-1 px-2">+{images.length - 1}</button> :
                                    <></>
                                }
                            </div> : <></>
                        }
                        {files.length ?
                            <div className="flex gap-3 text-sm my-1">
                                <button className="rounded-full flex gap-2 border-0.5 border-cbs-border px-3 py-1">
                                    <img src={icons8pdf} alt="" />
                                    <span>{files[0]?.nameOrg}</span>
                                </button>
                                {files.length - 1 > 0 ?
                                    <button className="rounded-full border-0.5 border-cbs-border py-1 px-2">+{files.length - 1}</button> :
                                    <></>
                                }
                            </div> : <></>
                        }
                    </div>
                </div>
                <div className="flex text-primary-gray">
                    <div className="w-[100px]">{moment(item?.actualFinishTime).format('DD/MM/YYYY')}</div>
                    <div className="w-[100px]">{PCM_STATUS_TASK[item?.status - 1]?.text}</div>
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