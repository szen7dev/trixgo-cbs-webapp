import React from 'react';
import { useContextMenu } from './ContextMenu'

type PropsComponent<A> = {
	tag: A;
	disable?: boolean;
}
type Props<A extends React.ElementType> = PropsComponent<A> & React.HTMLAttributes<HTMLElement>

export default function ContextMenuWrapper<T extends React.ElementType = 'div'>(props: Props<T>): React.ReactElement {
	const { tag: Tag = 'div', children, disable } = props;
	const { open } = useContextMenu();
	function handleContextMenu(e: React.MouseEvent<HTMLElement, MouseEvent>): void {
		if (disable) return;
		e.preventDefault();
		e.stopPropagation();
		open({ position: { x: e.clientX, y: e.clientY } });
	}

	return <Tag onContextMenu={handleContextMenu}>
		{children}
	</Tag>
}
