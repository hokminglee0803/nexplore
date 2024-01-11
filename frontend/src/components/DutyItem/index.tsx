import React from 'react';
import { List, Button, Popconfirm, Typography } from 'antd';
import { DutyProps } from '../../interface/Duty';

interface DutyItemProps {
    duty: DutyProps
}

export const DutyItem: React.FC<DutyItemProps> = ({ duty }) => {
    return (
        <List.Item
            key={duty.id}
            actions={[
                <Popconfirm
                    title="Are you sure you want to delete?"
                    onConfirm={() => {
                        // Delete Task
                    }}
                >
                    <Button type="primary" danger>
                        X
                    </Button>
                </Popconfirm>,
            ]}
        >
            <Typography.Title editable level={5} style={{ margin: 0 }}>
                {duty.name}
            </Typography.Title>
        </List.Item>
    );
};