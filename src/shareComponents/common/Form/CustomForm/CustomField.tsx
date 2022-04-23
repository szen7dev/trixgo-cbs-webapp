/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ElementType } from "react";
import cn from "classnames";

type PropsOf<TTag = any> = TTag extends React.ElementType ? React.ComponentProps<TTag> : never;
type PropsComponent = {
  title?: string;
  required?: boolean;
  name: string;
  icon?: React.ElementType;
  wrapperClassName?: string;
  containerClassName?: string;
  header?: React.ElementType<{ title?: string; required?: boolean }>;
};

type Props<A extends React.ElementType> = PropsComponent & { as?: A } & Omit<
    PropsOf<A>,
    keyof PropsComponent | "as"
  >;

function CustomField<A extends ElementType = "input">(props: Props<A>): JSX.Element {
  const {
    header: Header,
    icon: Icon,
    title,
    required,
    as: Tag = "input",
    field,
    name,
    wrapperClassName,
    containerClassName,
    error,
    ...rest
  } = props;
  return (
    <label className={cn("block focus-within:text-cbs-primary", wrapperClassName)}>
      {Header && <Header title={title} required={required} />}
      {/* <div className="mb-1.5 flex justify-between">
        <span>
          {title} {required && "(*)"}
        </span>
      </div> */}
      <div
        className={cn(
          "text-black w-full border-0.5 border-cbs-border bg-white focus-within:bg-white focus-within:border-cbs-primary resize-none overflow-hidden",
          containerClassName
        )}
      >
        <Tag
          className="w-full h-full py-1.5 px-3 focus:outline-none"
          placeholder={title}
          {...field}
          {...rest}
        />
        {Icon && <Icon />}
      </div>
    </label>
  );
}

export default CustomField;
