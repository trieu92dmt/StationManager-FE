import React from 'react';
import { Column } from '@ant-design/plots';

interface ChartProps {
    data: { label: string; value: number }[];
}

export const BarChart: React.FC<ChartProps> = ({ data }) => {
    const config = {
        data,
        xField: 'label',
        yField: 'value',
        xAxis: {
            label: {
                autoRotate: false,
            },
        },
        tooltip: {
            formatter: (data: any) => {
                return { name: 'Số chuyến xe', value: data.value };
            },
        },
    };

    return <Column {...config} />;
};