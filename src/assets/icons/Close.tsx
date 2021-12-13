import { FC } from "react";

type Props = {
    className?: string;
};

const Close: FC<Props> = ({ className }) => {
    return (
        <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 1.4128L10.588 0.000266647L6.00027 4.58773L1.4128 0L0.000266647 1.412L4.588 6L0 10.5877L1.41253 11.9997L6.00027 7.41227L10.5877 12L11.9997 10.5875L7.41253 6L12 1.4128Z" fill="#666666"/>
        </svg>
    );
};

export default Close;
