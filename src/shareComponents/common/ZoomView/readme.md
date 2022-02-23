
## Example

Insert gif or link to demo

```tsx
import React from 'react';
import { useForm } from 'react-hook-form';

function App() {
  const [isShow,setIsShow]= useState(false);
	const [state,setState]

	const toggle = ()=>setIsShow(!isShow)

  return (
    <>
			<div>
				Example
				<button>Toggle modal</button>
			</div>
			<ImageDetail isShow={isShow} toggle={toggle} />
		</>
  );
}
```