import React, { useEffect, useReducer, useState } from 'react';
import logo from './../logo.svg';
import './Duties.css';
import { Card, Col, Row, Typography } from 'antd';
import { CreateDutyForm } from '../components/CreateDutyForm';
import { DutyList } from '../components/DutyList';
import { DutyProps } from '../interface/Duty';
import useLoading from '../hook/useLoading';
const { Title, Paragraph, Text } = Typography;

function Duties() {

  const API_PATH = process.env.REACT_APP_API_URL;

  const [duties, setDuties] = useState<DutyProps[]>([]);

  const [init, setInit] = useState<boolean>(true);

  const [error, setError] = useState<String>('');

  const { LoadingScreen, triggerLoading, closeLoading } = useLoading();

  const handleFormSubmit = (name: string) => {
    triggerLoading();
    return fetch(`${API_PATH}/duty`,
      {
        method: 'POST',
        body: JSON.stringify({
          name: name
        })
      },).then(() => {
        setInit(true)
        closeLoading();
        return true;
      }).catch(() => {
        setError('Cannot create duty, please try again or contact system administrator.')
        closeLoading();
        return false;
      })
  }

  const handleUpdateDuty = (id: string, name: string) => {
    triggerLoading();
    fetch(`${API_PATH}/duty/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          name: name
        })
      },).then(() => {
        setInit(true)
        closeLoading();
      }).catch(() => {
        setError('Cannot update duty, please try again or contact system administrator.')
        closeLoading();
      })
  }

  const handleDeleteDuty = (id: string) => {
    triggerLoading();
    fetch(`${API_PATH}/duty/${id}`,
      {
        method: 'DELETE',
      },).then(() => {
        setInit(true)
        closeLoading();
      }).catch(() => {
        setError('Cannot delete duty, please try again or contact system administrator.')
        closeLoading();
      })
  }

  useEffect(() => {
    if (init) {
      triggerLoading();
      fetch(`${API_PATH}/duties`,
        {
          method: 'GET'
        }).then(response => {
          return response.json()
        }).then(data => {
          setDuties(data);
          setInit(false);
          closeLoading();
        }).catch(() => {
          setError('Cannot query duties, please try again or contact system administrator.')
          closeLoading();
        })
    }

  }, [init])

  return (
    <>
      {LoadingScreen}
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
            <Text type="danger">
              {error}
            </Text>
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
            <CreateDutyForm handleFormSubmit={handleFormSubmit} />
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
            <DutyList duties={duties} handleUpdateDuty={handleUpdateDuty} handleDeleteDuty={handleDeleteDuty} />
          </Card>
        </Col>
      </Row>
    </>

  );
}

export default Duties;
