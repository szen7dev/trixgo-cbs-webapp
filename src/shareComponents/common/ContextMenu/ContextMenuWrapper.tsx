import React from 'react';
import { action } from './ContextMenu'

type PropsComponent<A> = {
	tag: A;
	disable?: boolean;
}
type Props<A extends React.ElementType> = PropsComponent<A> & React.HTMLAttributes<HTMLElement>

export default class ContextMenuWrapper<T extends React.ElementType = 'div'> extends React.Component<Props<T>> {
	static defaultProps = {
		tag: 'div',
	}

	constructor(props: Props<T>) {
		super(props);
		this.handleContextClick = this.handleContextClick.bind(this);
		this.handleContextMenu = this.handleContextMenu.bind(this);
	}

	handleContextClick(event: React.MouseEvent<HTMLElement, MouseEvent>): void {
		if (this.props.disable) return;

		event.preventDefault();
		event.stopPropagation();

		// action.hideMenu();
		action.showMenu({
			position: { x: event.clientX, y: event.clientY },
		});
	}

	handleContextMenu(e: React.MouseEvent<HTMLElement, MouseEvent>): void {
		this.handleContextClick(e);
	}

	render(): JSX.Element {
		const { tag, children } = this.props;
		const newAttrs = {
			onContextMenu: this.handleContextMenu,
		}

		return React.createElement(tag || 'div', newAttrs, children);
	}
}
