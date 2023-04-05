import * as React from 'react'
import iconAdd from "../../../../../assets/images/icons8-add-96-2.svg";

export default function BiddingInfro() {
    return (
        <div>
            <div className='flex justify-between my-6'>
                <div className='text-cbs-subtext text-lg  ml-3'>
                    Nhà thầu tham gia <span>(6)</span>
                </div>
                <div>
                    <a href="#"><img src={iconAdd} alt="" /></a>
                </div>
            </div>
            <div>
                <table className="border-collapse border-0.5 border-cbs-border-0.5 w-full ">
                    <thead>
                        <tr className='bg-cbs-active-comment'>
                            <th className="border-0.5 border-cbs-border-0.5 w-[50px] text-center m-auto py-2"><input type="checkbox" /></th>
                            <th className="border-0.5 border-cbs-border-0.5  w-[50px] text-center m-auto py-3">TT</th>
                            <th className="border-0.5 border-cbs-border-0.5 w-1/3 text-left pl-4">Tên nhà thầu</th>
                            <th className="border-0.5 border-cbs-border-0.5 text-left pl-4">Địa chỉ</th>
                            <th className="border-0.5 border-cbs-border-0.5 w-[180px] text-left pl-4">Mã số thuế</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-0.5 border-slate-700  w-[50px] text-center m-auto py-3"><input type="checkbox" /></td>
                            <td className="border-0.5 border-slate-700  w-[50px] text-center m-auto py-3">1</td>
                            <td className="border-0.5 border-slate-700 pl-4 py-3">Công ty TNHH Thang máy Hyundai Thành Công Việt Nam</td>
                            <td className="border-0.5 border-slate-700 pl-4 py-3">Tầng 3, tòa nhà 789, binh đoàn 11-BQP, số 147 Hoàng Quốc Việt, phường Nghĩa Tân, quận Cầu Giấy, Hà Nội</td>
                            <td className="border-0.5 border-slate-700 pl-4 py-3">001122334455</td>
                        </tr>
                        <tr>
                            <td className="border-0.5 border-slate-700  w-[50px] text-center m-auto py-3"><input type="checkbox" /></td>
                            <td className="border-0.5 border-slate-700  w-[50px] text-center m-auto py-3">1</td>
                            <td className="border-0.5 border-slate-700 pl-4 py-3">Công ty TNHH Thang máy Hyundai Thành Công Việt Nam</td>
                            <td className="border-0.5 border-slate-700 pl-4 py-3">Tầng 3, tòa nhà 789, binh đoàn 11-BQP, số 147 Hoàng Quốc Việt, phường Nghĩa Tân, quận Cầu Giấy, Hà Nội</td>
                            <td className="border-0.5 border-slate-700 pl-4 py-3">001122334455</td>
                        </tr>
                        <tr>
                            <td className="border-0.5 border-slate-700  w-[50px] text-center m-auto py-3"><input type="checkbox" /></td>
                            <td className="border-0.5 border-slate-700  w-[50px] text-center m-auto py-3">1</td>
                            <td className="border-0.5 border-slate-700 pl-4 py-3">Công ty TNHH Thang máy Hyundai Thành Công Việt Nam</td>
                            <td className="border-0.5 border-slate-700 pl-4 py-3">Tầng 3, tòa nhà 789, binh đoàn 11-BQP, số 147 Hoàng Quốc Việt, phường Nghĩa Tân, quận Cầu Giấy, Hà Nội</td>
                            <td className="border-0.5 border-slate-700 pl-4 py-3">001122334455</td>
                        </tr>
                        <tr>
                            <td className="border-0.5 border-slate-700  w-[50px] text-center m-auto py-3"><input type="checkbox" /></td>
                            <td className="border-0.5 border-slate-700  w-[50px] text-center m-auto py-3">1</td>
                            <td className="border-0.5 border-slate-700 pl-4 py-3">Công ty TNHH Thang máy Hyundai Thành Công Việt Nam</td>
                            <td className="border-0.5 border-slate-700 pl-4 py-3">Tầng 3, tòa nhà 789, binh đoàn 11-BQP, số 147 Hoàng Quốc Việt, phường Nghĩa Tân, quận Cầu Giấy, Hà Nội</td>
                            <td className="border-0.5 border-slate-700 pl-4 py-3">001122334455</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
