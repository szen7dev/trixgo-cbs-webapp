/*=====1.LIBRARY=====*/
import { FC, useEffect, useState, useCallback } from "react";
import cn from "classnames";
import { toast } from "react-toastify";

/*=====2.CSS=====*/
import styles from "views/human/styles/style.module.css";

/*=====3.ICONS=====*/

/*=====4.PAGES/COMPONENTS=====*/

/*=====5.TYPINGS=====*/
import { BackupItem, BackupListData } from "apis/backup";

/*=====6.HOOKS/APIS=====*/
import BackupRepository from "apis/backup";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";

/*=====7.OTHER=====*/

/**
 * ⭐ Ngưỡng báo động sức khoẻ.
 *
 * CronJob chạy 23:15 hằng ngày, nên bản mới nhất bình thường KHÔNG BAO GIỜ quá 24 giờ tuổi.
 * Lấy 36 giờ để một lượt chạy chậm hoặc lệch múi giờ không kêu oan, mà bỏ lỡ HẲN một đêm thì
 * kêu ngay — chứ không đợi tới lúc cần khôi phục mới biết.
 */
const NGUONG_BAO_DONG_GIO = 36;

/** Cỡ tệp đọc được. Bản sao lưu Trixgo cỡ GB nên phải có nấc GB, không dừng ở MB. */
const doTep = (byte: number): string => {
    if (!byte && byte !== 0) return "—";
    if (byte >= 1024 ** 3) return `${(byte / 1024 ** 3).toFixed(2)} GB`;
    if (byte >= 1024 ** 2) return `${(byte / 1024 ** 2).toFixed(1)} MB`;
    return `${Math.round(byte / 1024)} KB`;
};

/** "8 giờ trước" — người đọc cần biết bản sao lưu CŨ tới mức nào, không cần biết chính xác giây. */
const cachDay = (khi: string): string => {
    const phut = Math.floor((Date.now() - new Date(khi).getTime()) / 60000);
    if (phut < 60) return `${phut} phút trước`;
    const gio = Math.floor(phut / 60);
    if (gio < 48) return `${gio} giờ trước`;
    return `${Math.floor(gio / 24)} ngày trước`;
};

const gioTuoi = (khi: string): number => (Date.now() - new Date(khi).getTime()) / 3600000;

export const OwnerBackupPage: FC = () => {
    useEffect(() => {
        document.title = "Trixgo | Sao lưu cơ sở dữ liệu";
    }, []);

    /**
     * ⛔ Chốt quyền phía giao diện — CHỈ Admin ứng dụng (`level == 0`).
     *
     * ⚠️ Đây là lớp che mắt, KHÔNG phải lớp bảo vệ: người dùng sửa được mọi thứ chạy trong
     * trình duyệt họ. Lớp chặn thật nằm ở `admin.backup-handler.js` phía máy chủ. Có lớp này
     * chỉ để người không có quyền không thấy một màn trống rồi tưởng hệ hỏng.
     */
    const { hasPermission, isSuccess, dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.OWNER.id });
    const laAdmin = hasPermission && dataUserAccess?.level == 0;

    const [dangTai, setDangTai] = useState<boolean>(true);
    const [duLieu, setDuLieu] = useState<BackupListData | null>(null);
    const [loi, setLoi] = useState<string>("");
    const [dangXinLink, setDangXinLink] = useState<string>("");

    const nap = useCallback(async () => {
        setDangTai(true);
        setLoi("");
        try {
            const res = await BackupRepository.getList();
            if (res?.error) {
                setDuLieu(null);
                setLoi(res?.data?.message || "Không đọc được kho sao lưu.");
                return;
            }
            setDuLieu(res?.data ?? null);
        } catch (e: any) {
            setDuLieu(null);
            setLoi(e?.message || "Không đọc được kho sao lưu.");
        } finally {
            setDangTai(false);
        }
    }, []);

    useEffect(() => {
        if (isSuccess && !laAdmin) return;
        if (isSuccess) nap();
    }, [isSuccess, laAdmin, nap]);

    const taiVe = async (item: BackupItem) => {
        /* Hỏi lại trước khi tải: tệp này là TOÀN BỘ cơ sở dữ liệu, không phải một bản báo cáo.
           Nó rời khỏi vòng kiểm soát của hệ ngay khi chạm ổ cứng của người tải. */
        const dong_y = window.confirm(
            `Tệp này chứa TOÀN BỘ cơ sở dữ liệu Trixgo (${doTep(item.size)}).\n\n`
            + `Tải về là đưa toàn bộ dữ liệu khách hàng ra ngoài hệ thống. `
            + `Lượt tải này được ghi lại kèm tài khoản của bạn.\n\nTiếp tục?`
        );
        if (!dong_y) return;

        setDangXinLink(item.name);
        try {
            const res = await BackupRepository.getDownloadUrl(item.name);
            if (res?.error || !res?.data?.url) {
                return toast.error(res?.data?.message || "Không cấp được link tải.");
            }
            /* Tạo thẻ <a> bấm ngầm thay vì đổi `location`: đổi địa chỉ trang là rời khỏi màn
               đang đứng, và với tệp cỡ GB thì người dùng sẽ thấy một trang trắng hàng phút mà
               không biết chuyện gì đang xảy ra. */
            const a = document.createElement("a");
            a.href = res.data.url;
            a.download = item.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (e: any) {
            toast.error(e?.message || "Không cấp được link tải.");
        } finally {
            setDangXinLink("");
        }
    };

    if (isSuccess && !laAdmin) {
        return (
            <div className={cn(styles.content)}>
                <div className="p-4 text-[14px] text-primary-gray">
                    Chức năng này chỉ dành cho Quản trị viên ứng dụng.
                </div>
            </div>
        );
    }

    const items: BackupItem[] = duLieu?.items ?? [];
    const moiNhat = items[0];
    const quaCu = moiNhat ? gioTuoi(moiNhat.at) > NGUONG_BAO_DONG_GIO : false;

    return (
        <div className={cn(styles.content)}>
            <div className="flex items-center justify-between px-4 pt-4">
                <h2 className="text-[16px] font-semibold">
                    💾 Sao lưu cơ sở dữ liệu
                    {duLieu?.configured ? (
                        <span className="ml-2 text-[13px] font-normal text-primary-gray">{items.length}</span>
                    ) : null}
                </h2>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={nap}
                        disabled={dangTai}
                        className="px-3 py-1 rounded-full border text-[13px] disabled:opacity-50"
                    >
                        ↻ Làm mới
                    </button>
                    <span className="px-3 py-1 rounded-full bg-secondary-light text-[12px] text-primary-gray">
                        {duLieu?.bucket ? `kho: ${duLieu.bucket}` : "—"}
                    </span>
                </div>
            </div>

            <div className="px-4 pb-6 pt-3">
                {dangTai ? (
                    <div className="py-6 text-[14px] text-primary-gray">Đang tải…</div>
                ) : loi ? (
                    <div className="py-4 px-3 rounded bg-red-50 text-red-700 text-[14px]">
                        ⚠️ {loi}
                    </div>
                ) : !duLieu?.configured ? (
                    /* Chưa khai khoá KHÔNG phải hỏng — dev và staging vốn không có kho sao lưu.
                       Nói đúng như vậy, để không ai đi tìm sự cố không tồn tại. */
                    <div className="py-4 px-3 rounded bg-yellow-50 text-yellow-800 text-[14px]">
                        {duLieu?.message || "Chưa khai khoá kho sao lưu (BACKUP_S3_*) cho máy chủ này."}
                    </div>
                ) : !items.length ? (
                    /* ⭐ Ca NGUY nhất, và nó trông giống hệt ca bình thường nếu chỉ vẽ một bảng
                       rỗng. Kho trống nghĩa là KHÔNG CÓ bản sao lưu nào — phải nói thẳng ra. */
                    <div className="py-4 px-3 rounded bg-red-50 text-red-700 text-[14px]">
                        ⚠️ KHO SAO LƯU TRỐNG — không có bản sao lưu nào. Kiểm CronJob{" "}
                        <code>backup-mongodb</code> trong namespace <code>trixgo-prod</code>.
                    </div>
                ) : (
                    <>
                        {quaCu ? (
                            <div className="mb-3 py-3 px-3 rounded bg-red-50 text-red-700 text-[14px]">
                                ⚠️ Bản mới nhất đã <b>{cachDay(moiNhat.at)}</b> — quá {NGUONG_BAO_DONG_GIO} giờ.
                                Việc sao lưu nhiều khả năng đang hỏng; kiểm CronJob <code>backup-mongodb</code>.
                            </div>
                        ) : null}

                        <div className="overflow-x-auto">
                            <table className="w-full text-[14px]">
                                <thead>
                                    <tr className="text-left text-primary-gray border-b">
                                        <th className="py-2 pr-3 font-medium">TÊN TỆP</th>
                                        <th className="py-2 pr-3 font-medium">THỜI ĐIỂM</th>
                                        <th className="py-2 pr-3 font-medium">CÁCH ĐÂY</th>
                                        <th className="py-2 pr-3 font-medium">DUNG LƯỢNG</th>
                                        <th className="py-2 font-medium" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, i) => (
                                        <tr key={item.name} className="border-b last:border-0">
                                            <td className={cn("py-2 pr-3", i === 0 && "font-semibold")}>
                                                {item.name}
                                                {i === 0 ? (
                                                    <span className="ml-2 px-2 py-0.5 rounded-full bg-secondary-light text-[11px] font-normal">
                                                        mới nhất
                                                    </span>
                                                ) : null}
                                            </td>
                                            <td className="py-2 pr-3">
                                                {new Date(item.at).toLocaleString("vi-VN")}
                                            </td>
                                            <td className="py-2 pr-3">{cachDay(item.at)}</td>
                                            <td className="py-2 pr-3">{doTep(item.size)}</td>
                                            <td className="py-2 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => taiVe(item)}
                                                    disabled={dangXinLink === item.name}
                                                    className="px-3 py-1 rounded-full border text-[13px] disabled:opacity-50"
                                                >
                                                    {dangXinLink === item.name ? "Đang xin link…" : "⬇ Tải về"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <p className="mt-3 text-[12px] text-primary-gray">
                            Sao lưu tự động 23:15 hằng ngày · giữ 14 ngày trên kho · khôi phục{" "}
                            <b>chỉ vào cơ sở dữ liệu RỖNG</b>.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};
