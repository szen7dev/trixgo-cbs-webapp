import React, {
    FC,
    Fragment,
    ReactEventHandler,
    ReactNode,
    RefObject,
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";
import {useOnClickOutside} from "../../services/hooks/useOnclickOutside";

type Props = {
    wrapperRef: RefObject<HTMLDivElement>;
    menu: ReactNode;
}

const RightClickMenu: FC<Props> = ({wrapperRef, menu}) => {
    const innerRef = useRef<HTMLDivElement>(null);

    const [xPos, setXPos] = useState("0px");
    const [yPos, setYPos] = useState("0px");
    const [showMenu, setShowMenu] = useState(false);
    useOnClickOutside(innerRef, () => setShowMenu(false));

    const handleContextMenu = useCallback(
        (e) => {
            e.preventDefault();

            setXPos(`${e.pageX}px`);
            setYPos(`${e.pageY}px`);
            setShowMenu(true);
        },
        [setXPos, setYPos]
    );

    const handleClick = useCallback(() => {
        showMenu && setShowMenu(false);
    }, [showMenu]);

    useEffect(() => {
        wrapperRef?.current?.addEventListener("click", handleClick);
        wrapperRef?.current?.addEventListener("contextmenu", handleContextMenu);

        return () => {
            document.addEventListener("click", handleClick);
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    });

    return (
        showMenu?
            <div
                ref={innerRef}
                style={{
                    top: yPos,
                    left: xPos
                }}
                onClick={() => setShowMenu(false)}
                className={"fixed transition duration-150 right-click-menu z-10"}>
                {menu}
            </div>
            :null
    );
};

export default RightClickMenu;
