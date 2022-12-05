import React from 'react';
import { Input } from 'antd';
import { Form, FormItem } from 'antd-easy-form';
import 'antd/dist/antd.css';

export default {
  title: 'Example/Page',
};

export const Basic = () => {
  return (
    <Form onValuesChange={console.log}>
      <FormItem label="Input1" tip="memo text" name="input" component="input" />
      <FormItem label="Input2" name="input2" component={Input} />
      <FormItem label="Input3" name="input3">
        <Input />
      </FormItem>
    </Form>
  );
};

const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          {
            value: 'leaf1',
            title: 'leaf1',
          },
          {
            value: 'leaf2',
            title: 'leaf2',
          },
        ],
      },
    ],
  },
];

const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];

export const Components = () => {
  return (
    <Form onValuesChange={console.log}>
      <FormItem label="Input" name="input" component="input" />
      <FormItem
        label="InputNumber"
        name="inputNumber"
        component="inputNumber"
      />
      <FormItem
        label="select"
        name="select"
        component="select"
        componentProps={{ options }}
      />
      <FormItem
        label="multiSelect"
        name="multiSelect"
        component="multiSelect"
        componentProps={{ options }}
      />
      <FormItem
        label="treeSelect"
        name="treeSelect"
        component="treeSelect"
        componentProps={{ treeData }}
      />
      <FormItem
        label="multiTreeSelect"
        name="multiTreeSelect"
        component="multiTreeSelect"
        componentProps={{ treeData }}
      />
      <FormItem label="switch" name="switch" component="switch" />
      <FormItem
        label="radioGroup"
        name="radioGroup"
        component="radioGroup"
        componentProps={{ options }}
      />
      <FormItem
        label="radioButtonGroup"
        name="radioButtonGroup"
        component="radioButtonGroup"
        componentProps={{ options }}
      />
      <FormItem
        label="checkboxGroup"
        name="checkboxGroup"
        component="checkboxGroup"
        componentProps={{ options }}
      />
    </Form>
  );
};
