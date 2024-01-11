import { Spin } from 'antd';
import React, { useState } from 'react';

function useLoading() {

    const [loading, setLoading] = useState<boolean>(false);

    const triggerLoading = () => {
        setLoading(true);
    }

    const closeLoading = () => {
        setLoading(false);
    }

    const LoadingScreen = (
        <Spin spinning={loading} fullscreen />
    )

    return { LoadingScreen, triggerLoading, closeLoading }
}

export default useLoading;
