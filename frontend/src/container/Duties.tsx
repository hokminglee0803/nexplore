import React, { useEffect, useState } from 'react';
import logo from './../logo.svg';
import './Duties.css';
import { Card, Col, Row, Typography } from 'antd';
import { CreateDutyForm } from '../components/CreateDutyForm';
import { DutyList } from '../components/DutyList';
import { DutyProps } from '../interface/Duty';
const { Title, Paragraph } = Typography;

function Duties() {

  const [duties, setDuties] = useState<DutyProps[]>([]);

  useEffect(() => {
  })

  return (
    <Row
      justify="center"
      align="middle"
      gutter={[0, 20]}
      className="container"
    >
      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        <Typography>
          <Title>Duties</Title>
          <Paragraph>
            You can Add, Update, Delete your duties in this application.
          </Paragraph>
        </Typography>
      </Col>

      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        <Card title="Create a Duty">
          <CreateDutyForm />
        </Card>
      </Col>

      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        <Card title="Duites List">
          <DutyList />
        </Card>
      </Col>
    </Row>
  );
}

export default Duties;
