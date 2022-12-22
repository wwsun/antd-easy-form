import React from 'react';
import { isValidElementType } from 'react-is';
import { Form as AntForm } from 'antd';
import type { FormItemProps as AntFormItemProps } from 'antd';

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
  /**
   * 渲染的组件
   */
  component?: CreateFormItemOptionsType['component'];
  /**
   * 组件的属性
   */
  componentProps?: T;
  /**
   * 必选
   */
  required?: boolean;
  /**
   * 必选消息
   */
  requiredMessage?: string;
  /**
   * 输入提示，仅子组件可用时
   */
  placeholder?: string;
  /**
   * 输入组件禁用
   */
  disabled?: boolean;
  /**
   * 输入组件只读
   */
  readonly?: boolean;
}

function createFormItem({
  render: factory,
  component: factoryComponent,
  props: factoryProps,
}: CreateFormItemOptionsType = {}) {
  return function Item({
    component,
    componentProps: componentPropsProp = {},
    placeholder,
    disabled,
    readonly,
    children,
    rules: rulesProp = [],
    required,
    requiredMessage,
    ...props
  }: FormItemProps) {
    const componentProps = filterUndefined({
      ...factoryProps,
      placeholder,
      disabled,
      readonly,
      ...componentPropsProp,
    });
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

function filterUndefined(obj: object) {
  let ret = {};
  for (const key in obj) {
    if (obj[key] !== undefined) {
      ret[key] = obj[key];
    }
  }
  return ret;
}
