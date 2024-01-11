import React from 'react';

import { List } from 'antd';
import { DutyItem } from '../DutyItem';
import { DutyProps } from '../../interface/Duty';

interface DutyListProps {
  duties: DutyProps[];
  handleUpdateDuty: (id: string, name: string) => void;
  handleDeleteDuty: (id: string) => void;
}

export const DutyList: React.FC<DutyListProps> = ({ duties, handleUpdateDuty, handleDeleteDuty }) => (
  <List
    locale={{
      emptyText: "There is no duty to do.",
    }}
    dataSource={duties.sort((a: DutyProps, b: DutyProps) => parseInt(a.id) - parseInt(b.id))} // Make sure the order is according to data ID
    renderItem={(duty) => (
      <DutyItem duty={duty} handleUpdateDuty={handleUpdateDuty} handleDeleteDuty={handleDeleteDuty} />
    )}
  />
);