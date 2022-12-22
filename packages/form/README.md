# Easy Antd Form

> A much more simple antd form

## Docs

[Online demos](https://main--638de074961131d6d6059786.chromatic.com/)

## Usage

```jsx
import { Form, FormItem } from 'antd-easy-form';

const App = () => {
  return (
    <Form onValuesChange={console.log}>
      <FormItem label="Input1" tip="memo text" name="input" component="input" required requiredMessage="input is required!" />
      <FormItem label="Input2" name="input2" component={Input as any} />
      <FormItem label="Input3" name="input3">
        <Input />
      </FormItem>
    </Form>
  );
}
```
