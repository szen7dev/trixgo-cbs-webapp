import { FC } from "react";
import { useTranslation } from "react-i18next";

import AddIcon from "assets/images/icon-add.svg";

type Props = {
    title: string;
    onClickAddNew: () => void;
};

export const HumanInfoHeader: FC<Props> = (props) => {
    const { t: i18n } = useTranslation(["human"]);
    return (
        <div>
            <div className="flex justify-between items-center">
                <span className="flex items-center text-bold text-primary-gray text-lg uppercase">
                    {props.title}
                </span>
                <button className="flex justify-center items-center w-24 h-10 bg-accent-light rounded" onClick={props.onClickAddNew}>
                    <img src={AddIcon} alt="Add" />
                    <span className="ml-2 text-primary">
                        {i18n('button-add')}
                    </span>
                </button>
            </div>
        </div>
    );
};
