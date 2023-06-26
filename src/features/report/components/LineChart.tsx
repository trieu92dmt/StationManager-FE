import React from 'react';
import { Line } from '@ant-design/charts';

interface ChartProps {
    data: { label: string; value: number }[];
}

export const LineChart: React.FC<ChartProps> = ({ data }) => {
    const config = {
        data,
        height: 400,
        xField: 'label',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
        },
        tooltip: {
            formatter: (data: any) => {
                const formattedValue = data.value.toLocaleString(); // Định dạng giá trị thành số phần nghìn
                return { name: 'Doanh thu', value: formattedValue + ' VNĐ' };
            },
        },
        state: {
            active: {
                style: {
                    shadowBlur: 4,
                    stroke: '#000',
                    fill: 'red',
                },
            },
        },
        interactions: [
            {
                type: 'marker-active',
            },
        ],
    };

    return <Line {...config} />;
};