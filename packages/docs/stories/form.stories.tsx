import React from 'react';
import { Button } from 'antd';
import { Form, FormItem } from 'antd-easy-form';
import 'antd/dist/antd.css';

export default {
  title: 'Form',
  component: Form,
  subcomponents: {
    FormItem,
  },
};

export const Basic = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        required
        requiredMessage="Please input your username!"
        component="input"
      />

      <Form.Item
        label="Password"
        name="password"
        required
        requiredMessage="Please input your password!"
        component="password"
      />

      <Form.Item
        label=" "
        name="remember"
        component="checkbox"
        componentProps={{ children: 'Remember me' }}
      />

      <Form.Item label=" ">
        <Form.Submit />
      </Form.Item>
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
