import { FC } from "react";
import { Link } from "react-router-dom";

const MenuTab: FC<any> = ({tab}: any) => {
    return (
        <div className={"filter-bar flex flex-wrap px-4 py-2 header-table flex px-4 w-full top-0 bg-white pb-4"}>
            <Link to={"/pcm/tags"}>
                <button
                    className={
                        "py-1 px-6 mr-2 rounded-full border border-primary-border " +
                        (!tab || tab === "1"
                            ? "text-white bg-cbs-secondary border-none"
                            : "text-primary-gray bg-white")
                    }
                >
                    Tất cả hoạt động
                </button>
            </Link>
            <Link to={"/pcm/tags/2"}>
                <button
                    className={
                        "py-1 px-6 mr-2 rounded-full border border-primary-border " +
                        (tab === "2"
                            ? "text-white bg-cbs-secondary border-none"
                            : "text-primary-gray bg-white")
                    }
                >
                    Hoạt động ngày nay
                </button>
            </Link>
            <Link to={"/pcm/tags/3"}>
                <button
                    className={
                        "py-1 px-6 mr-2 rounded-full border border-primary-border " +
                        (tab === "3"
                            ? "text-white bg-cbs-secondary border-none"
                            : "text-primary-gray bg-white")
                    }
                >
                    Đơn vị tạo việc
                </button>
            </Link>
            <Link to={"/pcm/tags/4"}>
                <button
                    className={
                        "py-1 px-6 mr-2 rounded-full border border-primary-border " +
                        (tab === "4"
                            ? "text-white bg-cbs-secondary border-none"
                            : "text-primary-gray bg-white")
                    }
                >
                    Đơn vị thực hiện
                </button>
            </Link>
        </div>
    );
};

export default MenuTab;