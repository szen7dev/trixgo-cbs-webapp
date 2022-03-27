import React from 'react';

interface Props {
	indeterminate?: boolean,
}

export const IndeterminateCheckbox = React.forwardRef<any, Props>(
	({ indeterminate, ...rest }, ref) => {
		const defaultRef = React.useRef<any>()
		const resolvedRef = ref || defaultRef

		React.useEffect(() => {
			if ((resolvedRef as any).current) (resolvedRef as any).current.indeterminate = Boolean(indeterminate)
		}, [resolvedRef, indeterminate])

		return (
			<>
				<input type="checkbox" ref={resolvedRef} {...rest} />
			</>
		)
	}
)
IndeterminateCheckbox.displayName = 'IndeterminateCheckbox';