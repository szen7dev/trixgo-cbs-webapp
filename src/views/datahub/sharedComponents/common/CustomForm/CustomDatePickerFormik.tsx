import classNames from 'classnames';
import { Field, FieldProps } from 'formik'
import React, { FC } from 'react';
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

type Props = {
	name: string,
	title: string,
	required?: boolean,
	placeholder?: string,
} & Omit<ReactDatePickerProps, 'onChange'>

const CustomDatePickerFormik: FC<Props> = ({ name, title, required, placeholder, ...rest }) => {
	return (
		<Field name={name}>
			{({ field, form, meta }: FieldProps) => (
				<div className={classNames('block focus-within:text-cbs-primary', { 'text-red-400': meta.touched && meta.error })}>
					<div className='mb-1.5'>
						{title} {required && "(*)"}
					</div>
					<DatePicker
						{...field}
						className={classNames("py-1.5 px-3 w-full border-0.5 placeholder-shown:bg-cbs-gray border-cbs-border bg-white focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md", {
							'border-red-400': meta.touched && meta.error
						})}
						placeholderText={placeholder ? placeholder : title}
						selected={(field.value && new Date(field.value)) || null}
						{...rest}
						onChange={val => {
							form.setFieldValue(field.name, val);
						}}
					/>
				</div>
			)}
		</Field>
	)
}

export default CustomDatePickerFormik