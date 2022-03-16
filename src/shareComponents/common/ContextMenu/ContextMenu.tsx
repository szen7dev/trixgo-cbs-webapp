import React, { FC, useEffect, useState } from 'react';

const createShareVariables = (): Map<"open" | "close", (...props: any) => void> => {
	const actions = new Map();
	actions.set("open", () => alert("not implemented"));
	actions.set("close", () => alert("not implemented"));

	return actions;
};

export const actions = createShareVariables();

export const showContextMenu = actions.get('open');
export const hideContextMenu = actions.get('close');

type Props = {
	preventHideOnScroll?: boolean;
	preventHideOnResize?: boolean;
	preventHideOnContextMenu?: boolean;
	preventHideOnClick?: boolean;
	scroller?: string;
}

const ContextMenu: FC<Props> = (props) => {
	// const { isVisible, setIsVisible, setPosition, position } = useStore(state => state)
	const [isVisible, setIsVisible] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const menuRef = React.useRef<HTMLElement>(null);

	function handleShow(e: { position: { x: number, y: number } }): void {
		setIsVisible(true);
		(menuRef.current as HTMLElement).style.zIndex = '10'
		if (props.scroller) {
			const container = document.querySelector('#' + props.scroller);
			if (!container) {
				setPosition(e.position)
				registerHandlers();
				return;
			};

			const { clientWidth, clientHeight } = (menuRef.current as HTMLElement);
			const reactContianer = container.getBoundingClientRect();
			let x = e.position.x;
			let y = e.position.y;

			if (clientWidth + x > reactContianer.right) x = x - clientWidth;
			if (clientHeight + y > reactContianer.bottom) y = y - clientHeight;
			setPosition({ x, y });
		} else setPosition(e.position);
		registerHandlers();
	}
	function hideMenu() {
		handleHide({});
		// unregisterHandlers();
	};

	function handleHide(e: any) {
		setIsVisible(false);
		unregisterHandlers();
	}
	const handleOutsideClick = (e: any) => {
		if (!menuRef.current) return;
		if (props.preventHideOnClick && menuRef.current.contains(e.target)) return;
		hideMenu();
	}

	function registerHandlers() {
		document.addEventListener('mousedown', handleOutsideClick);
		if (!props.preventHideOnScroll) {
			document.addEventListener('scroll', handleHide);
			if (props.scroller) document.querySelector('#' + props.scroller)?.addEventListener('scroll', handleHide);
		}
		if (!props.preventHideOnContextMenu) document.addEventListener('contextmenu', handleHide);
		if (!props.preventHideOnResize) window.addEventListener('resize', handleHide);
	}
	function unregisterHandlers() {
		document.removeEventListener('mousedown', handleOutsideClick);
		document.removeEventListener('touchstart', handleOutsideClick);
		document.removeEventListener('scroll', handleHide);
		if (props.scroller) document.querySelector('#' + props.scroller)?.removeEventListener('scroll', handleHide);
		document.removeEventListener('contextmenu', handleHide);
		window.removeEventListener('resize', handleHide);
	}

	useEffect(() => {
		actions.set('open', handleShow);
		actions.set('close', handleHide);
		return () => {
			unregisterHandlers();
			if (process.env.NODE_ENV === 'production') {
				actions.clear();
			} else {
				actions.set('open', () => alert("not implemented"));
				actions.set('close', () => alert("not implemented"));
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<nav
			ref={menuRef}
			style={{ position: 'fixed', opacity: !isVisible ? 0 : 1, top: position.y, left: position.x }}
			className="transition-opacity"
			onTransitionEnd={e => !isVisible ? e.currentTarget.style.zIndex = "-10" : null}
		>
			{props.children}
		</nav>
	)
}

export default ContextMenu