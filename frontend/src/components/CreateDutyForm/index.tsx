import React from 'react';
import { Form, Row, Col, Button, Input } from 'antd';

interface CreateDutyFormProps {
  handleFormSubmit: (name: string) => Promise<boolean>;
}

export const CreateDutyForm: React.FC<CreateDutyFormProps> = ({ handleFormSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    handleFormSubmit(form.getFieldValue('name')).then(success => {
      // Only reset value when submit successfully
      if (success) {
        form.resetFields();
      }
    })
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
    >
      <Row gutter={20}>
        <Col xs={24} sm={24} md={17} lg={19} xl={20}>
          <Form.Item
            name={'name'}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input placeholder="Please enter your duty." />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={7} lg={5} xl={4}>
          <Button type="dashed" htmlType="submit" block>
            + Create
          </Button>
        </Col>
      </Row>
    </Form>
  );
};