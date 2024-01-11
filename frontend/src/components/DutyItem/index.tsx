import React from 'react';
import { List, Button, Popconfirm, Typography } from 'antd';
import { DutyProps } from '../../interface/Duty';
const { Paragraph } = Typography;
interface DutyItemProps {
    duty: DutyProps;
    handleUpdateDuty: (id: string, name: string) => void;
    handleDeleteDuty: (id: string) => void;
}

export const DutyItem: React.FC<DutyItemProps> = ({ duty, handleUpdateDuty, handleDeleteDuty }) => {
    return (
        <List.Item
            key={duty.id}
            actions={[
                <Popconfirm
                    title="Are you sure you want to delete?"
                    onConfirm={() => {
                        handleDeleteDuty(duty.id)
                    }}
                >
                    <Button type="primary" danger>
                        X
                    </Button>
                </Popconfirm>,
            ]}
        >
            <Paragraph editable={{ onChange: (value) => handleUpdateDuty(duty.id, value) }}>{duty.name}</Paragraph>
        </List.Item >
    );
};