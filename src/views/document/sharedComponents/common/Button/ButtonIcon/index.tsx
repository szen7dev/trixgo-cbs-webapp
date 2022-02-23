import { ElementType, FC, HTMLAttributes } from 'react';

interface Props {
	icon?: ElementType;
	title: string
}

export const ButtonIcon: FC<Props & HTMLAttributes<HTMLButtonElement>> = ({ title, icon: Icon, ...props }) => {
	return (
		<button className='bg-cbs-gray rounded-md p-2 min-w-[100px] flex items-center whitespace-nowrap text-cbs-primary' {...props}>
			{Icon && <Icon />}
			{title}
		</button>
	)
}