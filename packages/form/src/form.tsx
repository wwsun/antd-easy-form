import React from 'react';
import { Form as AntForm } from 'antd';
import { FormProps as AntFormProps } from 'antd';
import { FormItem } from './form-item';

export interface FormProps
  extends Omit<AntFormProps, 'labelCol' | 'wrapperCol'> {
  labelCol: number | AntFormProps['labelCol'];
  wrapperCol: number | AntFormProps['wrapperCol'];
}

function fixCol(col: any): AntFormProps['labelCol'] {
  if (typeof col === 'number') {
    return {
      span: col,
    };
  }
  return col;
}

export function Form({
  labelCol = 4,
  wrapperCol = 16,
  colon = false,
  ...rest
}: FormProps) {
  return React.createElement(AntForm, {
    labelCol: fixCol(labelCol),
    wrapperCol: fixCol(wrapperCol),
    colon,
    ...(rest as any),
  });
}

Form.Item = FormItem;
Form.List = AntForm.List;
Form.ErrorList = AntForm.ErrorList;
Form.Provider = AntForm.Provider;
