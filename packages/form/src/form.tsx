import React from 'react';
import { Form as AntForm } from 'antd';
import { FormProps as AntFormProps } from 'antd';
import { FormItem } from './form-item';
import { Submit } from './submit';

export interface FormProps
  extends Omit<AntFormProps, 'labelCol' | 'wrapperCol'> {
  labelCol?: number | AntFormProps['labelCol'];
  wrapperCol?: number | AntFormProps['wrapperCol'];
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
  layout = 'horizontal',
  labelCol = layout === 'horizontal' ? 4 : undefined,
  wrapperCol = layout === 'horizontal' ? 16 : undefined,
  colon = false,
  ...rest
}: FormProps) {
  return React.createElement(AntForm, {
    labelCol: fixCol(labelCol),
    wrapperCol: fixCol(wrapperCol),
    colon,
    layout,
    ...(rest as any),
  });
}

Form.Item = FormItem;
Form.Submit = Submit;
Form.List = AntForm.List;
Form.ErrorList = AntForm.ErrorList;
Form.Provider = AntForm.Provider;
Form.useForm = AntForm.useForm;
Form.useWatch = AntForm.useWatch;
