import React from 'react';
import {
  Checkbox,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
import { CreateFormItemOptionsType, register } from './form-item';

const list: CreateFormItemOptionsType[] = [
  {
    name: 'input',
    render: ({ onChange, ...props }) => (
      <Input onChange={(e) => onChange?.(e.target.value)} {...props} />
    ),
    props: {
      placeholder: '请输入',
    },
  },
  {
    name: 'inputNumber',
    component: InputNumber,
    props: {
      placeholder: '请输入',
    },
  },
  {
    name: 'select',
    component: Select,
    props: {
      placeholder: '请选择',
    },
  },
  {
    name: 'multiSelect',
    render: (props) => (
      <Select mode="multiple" placeholder="请选择" {...props} />
    ),
  },
  {
    name: 'treeSelect',
    component: TreeSelect,
    props: {
      placeholder: '请选择',
    },
  },
  {
    name: 'multiTreeSelect',
    component: (props) => (
      <TreeSelect multiple placeholder="请选择" {...props} />
    ),
  },
  {
    name: 'switch',
    render: ({ value, ...props }) => <Switch checked={value} {...props} />,
  },
  {
    name: 'radioGroup',
    render: ({ onChange, ...props }) => (
      <Radio.Group onChange={(e) => onChange?.(e.target.value)} {...props} />
    ),
  },
  {
    name: 'radioButtonGroup',
    render: ({ onChange, ...props }) => (
      <Radio.Group
        optionType="button"
        buttonStyle="solid"
        onChange={(e) => onChange?.(e.target.value)}
        {...props}
      />
    ),
  },
  {
    name: 'checkboxGroup',
    component: Checkbox.Group,
  },
];

list.forEach(register);
