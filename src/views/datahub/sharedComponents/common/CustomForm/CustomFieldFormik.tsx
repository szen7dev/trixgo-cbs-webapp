/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, FieldProps } from 'formik'
import React, { ElementType } from 'react'

type PropsOf<TTag = any> = TTag extends React.ElementType ? React.ComponentProps<TTag> : never;
type PropsComponent = {
	title: string
	required?: boolean
	name: string
}

type Props<A extends React.ElementType> = PropsComponent & { as?: A } & Omit<PropsOf<A>, keyof PropsComponent | 'as'>

function CustomFieldFormik<A extends ElementType = 'input'>(props: Props<A>): JSX.Element {
	const { title, required, as: Tag = 'input', field, name, error, ...rest } = props
	return (
		<Field name={name} as={Tag}>
			{({ field, form, meta }: FieldProps) => (
				<label className='block'>
					<div className='mb-1.5'>
						{title} {required && "(*)"}
					</div>
					<Tag
						className="py-1.5 px-3 w-full border-0.5 placeholder-shown:bg-cbs-gray border-cbs-border bg-white focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
						placeholder={title}
						{...field}
						{...rest}
					/>
				</label>
			)}
		</Field>
	)
}

export default CustomFieldFormik