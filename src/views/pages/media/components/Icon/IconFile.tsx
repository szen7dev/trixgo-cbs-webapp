import { FC, HTMLAttributes } from 'react'

const IconFile: FC<HTMLAttributes<HTMLOrSVGElement>> = ({ ...props }) => {
	return (
		<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M1.8 6.3H16.2V4.5C16.2 4.00294 15.7971 3.6 15.3 3.6H7.35442L5.55442 1.8H2.7C2.20294 1.8 1.8 2.20294 1.8 2.7V6.3ZM1.8 8.1V15.3C1.8 15.7971 2.20294 16.2 2.7 16.2H15.3C15.7971 16.2 16.2 15.7971 16.2 15.3V8.1H1.8ZM2.7 0H5.55442C6.03181 0 6.48964 0.189642 6.82721 0.527208L8.1 1.8H15.3C16.7912 1.8 18 3.00883 18 4.5V15.3C18 16.7912 16.7912 18 15.3 18H2.7C1.20883 18 0 16.7912 0 15.3V2.7C0 1.20883 1.20883 0 2.7 0Z" fill="#666666" />
		</svg>
	)
}

export default IconFile
