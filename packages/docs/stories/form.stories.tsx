import React, { useEffect, useRef, useState } from 'react';
import { Button, Space, Modal, Avatar, Typography } from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined,
  UserOutlined,
  SmileOutlined,
} from '@ant-design/icons';
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
        tooltip="this is your domain account name"
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

export const FormMethods = () => {
  const [form] = Form.useForm();

  const onGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        return;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        return;
    }
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

  return (
    <Form form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="note" label="Note" required component="input" />
      <Form.Item
        name="gender"
        label="Gender"
        required
        component="select"
        componentProps={{
          options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ],
          onChange: onGenderChange,
        }}
      />
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.gender !== currentValues.gender
        }
      >
        {({ getFieldValue }) =>
          getFieldValue('gender') === 'other' ? (
            <Form.Item
              name="customizeGender"
              label="Customize Gender"
              required
              component="input"
            />
          ) : null
        }
      </Form.Item>
      <Form.Item label=" ">
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          <Button type="link" htmlType="button" onClick={onFill}>
            Fill form
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export const WatchFields = () => {
  const [form] = Form.useForm<{ name: string; age: number }>();
  const nameValue = Form.useWatch('name', form);

  return (
    <>
      <Form form={form} layout="vertical" autoComplete="off">
        <Form.Item
          name="name"
          label="Name (Watch to trigger rerender)"
          component="input"
        />
        <Form.Item name="age" label="Age (Not Watch)" component="inputNumber" />
      </Form>

      <div>
        <pre>Name Value: {nameValue}</pre>
      </div>
    </>
  );
};

export const DynamicItemList = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  return (
    <Form name="dynamic_form_item" layout="vertical" onFinish={onFinish}>
      <Form.List
        name="names"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 2) {
                return Promise.reject(new Error('At least 2 passengers'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                label={index === 0 ? 'Passengers' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message:
                        "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                  component="input"
                />
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '60%' }}
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
              <Button
                type="dashed"
                onClick={() => {
                  add('The head item', 0);
                }}
                style={{ width: '60%', marginTop: '20px' }}
                icon={<PlusOutlined />}
              >
                Add field at head
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export const DynamicNestItemList = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  return (
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: 'flex', marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, 'first']}
                  rules={[{ required: true, message: 'Missing first name' }]}
                  component="input"
                  componentProps={{
                    placeholder: 'First Name',
                  }}
                />
                <Form.Item
                  {...restField}
                  name={[name, 'last']}
                  rules={[{ required: true, message: 'Missing last name' }]}
                  component="input"
                  componentProps={{
                    placeholder: 'Last Name',
                  }}
                />
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Form.Submit />
      </Form.Item>
    </Form>
  );
};

// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, open }: any) => {
  const prevOpenRef = useRef();
  useEffect(() => {
    prevOpenRef.current = open;
  }, [open]);
  const prevOpen = prevOpenRef.current;
  useEffect(() => {
    if (!open && prevOpen) {
      form.resetFields();
    }
  }, [form, prevOpen, open]);
};
const ModalForm = ({ open, onCancel }: any) => {
  const [form] = Form.useForm();
  useResetFormOnCloseModal({
    form,
    open,
  });
  const onOk = () => {
    form.submit();
  };
  return (
    <Modal title="Basic Drawer" open={open} onOk={onOk} onCancel={onCancel}>
      <Form form={form} name="userForm" layout="vertical">
        <Form.Item name="name" label="User Name" required component="input" />
        <Form.Item
          name="age"
          label="User Age"
          required
          component="inputNumber"
        />
      </Form>
    </Modal>
  );
};

export const RelatedSubForms = () => {
  const [open, setOpen] = useState(false);
  const showUserModal = () => {
    setOpen(true);
  };
  const hideUserModal = () => {
    setOpen(false);
  };
  const onFinish = (values: any) => {
    console.log('Finish:', values);
  };
  return (
    <Form.Provider
      onFormFinish={(name, { values, forms }) => {
        if (name === 'userForm') {
          const { basicForm } = forms;
          const users = basicForm.getFieldValue('users') || [];
          basicForm.setFieldsValue({
            users: [...users, values],
          });
          setOpen(false);
        }
      }}
    >
      <Form name="basicForm" onFinish={onFinish}>
        <Form.Item name="group" label="Group Name" required component="input" />
        <Form.Item
          label="User List"
          shouldUpdate={(prevValues, curValues) =>
            prevValues.users !== curValues.users
          }
        >
          {({ getFieldValue }) => {
            const users = getFieldValue('users') || [];
            return users.length ? (
              <ul>
                {users.map((user: any, index: number) => (
                  <li key={index} className="user">
                    <Avatar icon={<UserOutlined />} />
                    {user.name} - {user.age}
                  </li>
                ))}
              </ul>
            ) : (
              <Typography.Text className="ant-form-text" type="secondary">
                ( <SmileOutlined /> No user yet. )
              </Typography.Text>
            );
          }}
        </Form.Item>
        <Form.Item label=" ">
          <Space>
            <Form.Submit />
            <Button htmlType="button" onClick={showUserModal}>
              Add User
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <ModalForm open={open} onCancel={hideUserModal} />
    </Form.Provider>
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
