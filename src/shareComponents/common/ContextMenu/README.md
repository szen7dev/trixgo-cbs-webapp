
# Context menu guide

Context menu
## Example

```tsx
import React from 'react';
import { ContextMenuWrapper, ContextMenu } from "shareComponents/common/ContextMenu";

function Example() {
  return (
		<div>
			<ContextMenu>
			 	Hello! this is context menu
			</ContextMenu>
		  {/* Context menu work in context menu wrapper only */}
			<ContextMenuWrapper tag="div">
				<div>
					Right click to show context menu
				</div>
			</ContextMenuWrapper>
		</div>
  );
}
```

### Custom scroller

If scroller is not window, use props `scroller` as `id` of scroller

```tsx
	<ContextMenu scroller="scroller">
		Hello! this is context menu
	</ContextMenu>
	<div id="scroller">
		...
	</div>
```


## Props Reference

| Props 											| Type     	| Description                |
| :-------------------------- | :------- 	| :------------------------- |
| `scroller` 									| `string` 	| Id of scroller 						|
| `preventHideOnScroll`				| `boolean` | Disable hide when scroll						|
| `preventHideOnResize` 			| `boolean` | Disable hide when resize					|
| `preventHideOnContextMenu` 	| `boolean` | Disable hide when right click						|
| `preventHideOnClick` 				| `boolean` | Disable hide when click, use hooks to close manually						|

### Hooks

Because sometime you want to open context menu manually, you can use hook name `useContextMenu` with some action insde are `open` and `close`
```tsx
	import { ContextMenuWrapper, ContextMenu, useContextMenu } from "shareComponents/common/ContextMenu";

	function App() {
		const { open } = useContextMenu();

		return <div>
			<ContextMenu scroller="scroller">
				Hello! this is context menu
			</ContextMenu>
			<div id="scroller">
				<button onClick={open}>
					Open context menu
				</button>
			</div>
		</div>
	}
```

#### open(params)

params is an object. e.g: 
```js
	params = {
		position:{
			x: number, // horizontal position in screen, e.g: x = e.target.clientX
			y: number // vertical position in screen, e.g: y = e.target.clientY
		}
	}
```

