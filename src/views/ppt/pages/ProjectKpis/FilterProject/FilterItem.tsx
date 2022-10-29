import * as React from 'react';

import defaultAva from "assets/images/image 166.jpg";

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
            <table className="border-collapse border-0.5 border-cbs-border text-[13px] leading-4">
                <thead>
                    <tr className='font-bold text-left text-[13px] leading-4'>
                        <th className="border-0.5 border-cbs-border px-[5px] w-[50px] py-3 text-center px-2">TT</th>
                        <th className="border-0.5 border-cbs-border px-[5px] w-[258px] py-3 px-2" style={{ width: "258px" }}>Nhân sự</th>
                        <th className="border-0.5 border-cbs-border px-[5px] w-[132px] py-3 px-2" style={{ width: "132px" }}>Phòng ban</th>
                        <th className="border-0.5 border-cbs-border px-[5px] w-90 py-3">Tháng 1/22</th>
                        <th className="border-0.5 border-cbs-border px-[5px] w-90 py-3">Tháng 2/22</th>
                        <th className="border-0.5 border-cbs-border px-[5px] w-90 py-3">Tháng 3/22</th>
                        <th className="border-0.5 border-cbs-border px-[5px] w-90 py-3">Tháng 4/22</th>
                        <th className="border-0.5 border-cbs-border px-[5px] w-90 py-3">Tháng 5/22</th>
                        <th className="border-0.5 border-cbs-border px-[5px] w-90 py-3">Tháng 6/22</th>
                        <th className="border-0.5 border-cbs-border px-[5px] w-90 py-3">Tháng 7/22</th>
                        <th className="border-0.5 border-cbs-border px-[5px] w-90 py-3">Tháng 8/22</th>
                        <th className="border-0.5 border-cbs-border px-[5px] w-90 py-3">Tháng 9/22</th>
                        <th className="border-0.5 border-cbs-border px-[5px] w-90 py-3">Tháng 10/22</th>
                        <th className="border-0.5 border-cbs-border px-[5px] w-90 py-3">Tháng 11/22</th>
                        <th className="border-0.5 border-cbs-border px-[5px] w-90 py-3">Tháng 12/22</th>
                        <th className="border-0.5 border-cbs-border px-[5px] w-[100px] py-3">Tổng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='font-bold bg-cbs-active-comment text-[13px] leading-4'>
                        <td className="border-0.5 border-cbs-border py-4 text-center px-2"></td>
                        <td className="border-0.5 border-cbs-border py-4 px-2"></td>
                        <td className="border-0.5 border-cbs-border py-4 px-2"></td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">220.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">220.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">220.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">220.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">220.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">220.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">220.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">220.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">220.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">220.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">220.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">220.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">2.640.000.000</td>
                    </tr>
                    <tr className='text-[13px] leading-4'>
                        <td className="border-0.5 border-cbs-border py-4 text-center px-2">1</td>
                        <td className="border-0.5 border-cbs-border py-4 px-2">
                            <a href="/pcm/kpis//:userID">
                                <div className="flex gap-2 items-center">
                                    <img src={defaultAva}
                                        className={"w-[20px] h-[20px] rounded-full border-0.5 "}
                                    />
                                    <span className="">Đỗ Minh Phúc-SJVN</span>
                                </div>
                            </a>
                        </td>
                        <td className="border-0.5 border-cbs-border py-4 px-2">Phòng dự toán</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">220.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">220.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">220.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">220.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">220.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">220.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">220.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">220.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">220.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">220.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">220.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">220.000.000</td>
                        <td className="border-0.5 border-cbs-border font-bold px-[5px] py-4">2.640.000.000</td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
}
export default FilterItem;