import React from 'react';
import { isValidElementType } from 'react-is';
import { Form as AntForm, Space, Tooltip } from 'antd';
import type { FormItemProps as AntFormItemProps } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

type CreateFormItemRenderProps<T> = Omit<T, 'value' | 'onChange'> & {
  value?: any;
  onChange?: (val: any, ...rest: any[]) => void;
};

export type CreateFormItemOptionsType<T = object> = {
  name?: string;
  component?: string | React.ComponentType<T>;
  render?: (props?: CreateFormItemRenderProps<T>) => React.ReactNode;
  props?: object;
};

export interface FormItemProps<T = object> extends AntFormItemProps {
  component?: CreateFormItemOptionsType<T>['component'];
  componentProps?: T;
  tip?: React.ReactNode;
  options?: any[];
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
    label: labelProp,
    tip,
    options,
    ...props
  }: FormItemProps) {
    const label = tip ? (
      <Space size="small">
        <span>{labelProp}</span>
        <Tooltip title={tip}>
          <InfoCircleOutlined />
        </Tooltip>
      </Space>
    ) : (
      labelProp
    );
    const componentProps = {
      ...factoryProps,
      ...componentPropsProp,
    };
    return (
      <AntForm.Item label={label} {...props}>
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
