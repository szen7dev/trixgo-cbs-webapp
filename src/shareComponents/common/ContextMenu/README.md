
# Context menu guide
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

## Configuration

If scroller is not window, use props `scroller` as `id` of scroller

```tsx
	<ContextMenu scroller="scroller">
		Hello! this is context menu
	</ContextMenu>
	<div id="scroller">
		...
	</div>
```