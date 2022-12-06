import React from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd';

export function Submit({ children = 'Submit', ...props }: ButtonProps) {
  return React.createElement(
    Button,
    {
      type: 'primary',
      htmlType: 'submit',
      ...props,
    },
    children
  );
}
