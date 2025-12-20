import React, { FC, HTMLAttributes } from 'react';

const ChevronRightIcon: FC<HTMLAttributes<HTMLOrSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M9 18L15 12L9 6" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default ChevronRightIcon;
