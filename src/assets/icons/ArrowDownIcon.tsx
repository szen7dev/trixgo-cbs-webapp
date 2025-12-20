import React, { FC, HTMLAttributes } from 'react';

const ArrowDownIcon: FC<HTMLAttributes<HTMLOrSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M19 9L12 16L5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default ArrowDownIcon;
