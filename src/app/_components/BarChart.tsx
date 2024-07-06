/* eslint-disable */

// MyResponsiveBar.tsx
"use client";

import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

interface BarData {
    id: string;
    value: number;
}

type MyResponsiveBarProps = {
    data2: BarData[];
}

const MyResponsiveBar: React.FC<MyResponsiveBarProps> = ({ data2 }) => ( /* eslint-disable-line */
    <ResponsiveBar
        data={data2}
        keys={['expense']}
        indexBy="id"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.45}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [['darker', 2]]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Day',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Expense',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0
        }}
        enableLabel={false}
        enableTotals={true}
        labelTextColor={{
            from: 'color',
            modifiers: [['darker', 1.6]]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 121,
                translateY: -2,
                itemsSpacing: 6,
                itemWidth: 107,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        isInteractive={false}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e: { id: any; formattedValue: any; indexValue: any; }) => `${e.id}: ${e.formattedValue} in country: ${e.indexValue}`} /* eslint-disable-line */
    />
);

export default MyResponsiveBar;
