import { AxisBottom, AxisLeft, AxisTop } from '@visx/axis';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Bar } from '@visx/shape';
import React, { MouseEvent, TouchEvent } from 'react'
import useMeasure from 'react-use-measure';

import { MOCK_DATA } from '../../data/mock_data';
import { TooltipWithBounds, defaultStyles, useTooltip } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { timeFormat } from 'd3-time-format';

interface MappedDatas {
date: string; 
id: string; 
value_area: number; 
value_bar:number;
}

 const margin = 32;
 const defaultWidth = 100;
 const defaultHeight = 50;
 const getXValue = (d: MappedDatas) => d.date
 const getYValue = (d: MappedDatas) => d.value_bar
 const tooltipStyles = {...defaultStyles, borderRadius: 4, background: 'black', color: 'white',fontFamily: 'source-code-pro, Menlo, Monaco, Consolas'}
 
const CombinationChart = () => {

    const mappedDatas = Object.entries(MOCK_DATA.response).map((item)=>({date:item[0], ...item[1]}));
    console.log(mappedDatas);
    
    const [ref, bounds] = useMeasure();
    const { showTooltip, hideTooltip, tooltipData, tooltipLeft = 0,tooltipTop = 0 } = useTooltip<MappedDatas>();

    const width = bounds.width || defaultWidth;
    const height = bounds.height || defaultHeight;

    const innerWidth = width - margin;
    const innerHeight = height - margin;

    const xScale = scaleBand<string>({
        range: [margin, innerWidth],
        domain: mappedDatas.map(getXValue),
        padding: 0.2,
    });

    const yScale = scaleLinear<number>({
        range: [innerHeight, margin],
        domain: [
            Math.min(...mappedDatas.map(getYValue))-1,
            Math.max(...mappedDatas.map(getYValue))+1,
        ]
    })


    return (
        <>
        <svg ref={ref} width='100%' height='100%' viewBox={`0 0 ${width} ${height}`}>
            <Group>
                {mappedDatas.map((d) => {
                    const xValue = getXValue(d);
                    const barWidth = xScale.bandwidth();
                    const barHeight = innerHeight - (yScale(getYValue(d) ?? 0))

                    const barX = xScale(xValue);
                    const barY = innerHeight - barHeight;

                    return (
                        <Bar
                        key={`bar-${xValue}`}
                        x={barX}
                        y={barY}
                        width={barWidth}
                        height={barHeight}
                        fill="orange"
                        onMouseMove={(event:TouchEvent<SVGRectElement> | MouseEvent<SVGRectElement>)=>{
                            const point = localPoint(event);
                            if(!point) return;
                            showTooltip({
                                tooltipData: d,
                                tooltipLeft: point.x,
                                tooltipTop: point.y,
                            })
                        }}
                        onMouseLeave={
                            ()=> hideTooltip()
                        }
                        />
                    )
                })}
            </Group>
            <Group>
                <AxisBottom top={innerHeight} scale={xScale} tickFormat={date=>timeFormat("%H:%M:%S")(new Date(date))}/>
            </Group>
            <Group>
                <AxisLeft left={margin} scale={yScale}/>
            </Group>
        </svg>
        {tooltipData ? (
        <TooltipWithBounds
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
            style={tooltipStyles}
        >
            <b>value_bar</b>: {getYValue(tooltipData)}
        </TooltipWithBounds>
        ):null}
        </>
    )
}

export default CombinationChart;


 // data
 // margins
 // width and height
 // innerWidth and innerHeight
 // create the svg
 // define selectors
 // define the scales
 // create the axis
 // gruout it all