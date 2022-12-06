import React from 'react';
import { isValidElementType } from 'react-is';
import { Form as AntForm, Space, Tooltip } from 'antd';
import type { FormItemProps as AntFormItemProps } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

interface FormComponentBaseProps {
  onChange?: (val: any, ...rest: any[]) => void;
  value?: any;
  [key: string]: any;
}

export type CreateFormItemOptionsType = {
  name?: string;
  component?: string | React.ComponentType<object>;
  render?: (props?: FormComponentBaseProps) => React.ReactNode;
  props?: object;
};

export interface FormItemProps<T = object> extends AntFormItemProps {
  component?: CreateFormItemOptionsType['component'];
  componentProps?: T;
  required?: boolean;
  requiredMessage?: string;
}

function createFormItem({
  render: factory,
  component: factoryComponent,
  props: factoryProps,
}: CreateFormItemOptionsType = {}) {
  return function Item({
    component,
    componentProps: componentPropsProp = {},
    children,
    rules: rulesProp = [],
    required,
    requiredMessage,
    ...props
  }: FormItemProps) {
    const componentProps = {
      ...factoryProps,
      ...componentPropsProp,
    };
    const rules = [...rulesProp];
    if (required) {
      rules.unshift({ required, message: requiredMessage });
    }
    return (
      <AntForm.Item rules={rules} {...props}>
        {children ??
          factory?.(componentProps) ??
          (isValidElementType(factoryComponent)
            ? React.createElement(factoryComponent, componentProps)
            : null) ??
          (isValidElementType(component)
            ? React.createElement(component, componentProps)
            : null)}
      </AntForm.Item>
    );
  };
}

const FORM_ITEMS_MAP = {};

export function FormItem(props: FormItemProps) {
  const { component } = props;
  if (typeof component === 'string') {
    const Comp = FORM_ITEMS_MAP[component];
    return React.createElement(Comp, props);
  }
  return React.createElement(createFormItem(), props);
}

export function register(options: CreateFormItemOptionsType) {
  FORM_ITEMS_MAP[options.name] = createFormItem(options);
}
