import React, { FC, HTMLAttributes } from 'react';

const ChevronLeftIcon: FC<HTMLAttributes<HTMLOrSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M15 18L9 12L15 6" stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default ChevronLeftIcon;
