import React from 'react';

import { List } from 'antd';
import { DutyItem } from '../DutyItem';
import { DutyProps } from '../../interface/Duty';

const duties: DutyProps[] = [
  {
    id: "1",
    name: "Duty 1"
  },
  {
    id: "2",
    name: "Duty 2"
  },
  {
    id: "3",
    name: "Duty 3"
  }
]

export const DutyList: React.FC = () => (
  <List
    locale={{
      emptyText: "There is no duty to do.",
    }}
    dataSource={duties}
    renderItem={(duty) => (
      <DutyItem duty={duty} />
    )}
  />
);