import { AxisBottom, AxisLeft, AxisRight } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar, AreaClosed, Line } from "@visx/shape";
import React, { MouseEvent, TouchEvent, useCallback, useState } from "react";
import useMeasure from "react-use-measure";

import { MOCK_DATA } from "../../data/mock_data";
import { TooltipWithBounds, defaultStyles, useTooltip } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { timeFormat } from "d3-time-format";
import { curveMonotoneX } from "@visx/curve";

interface MappedDatas {
  date: string;
  id: string;
  value_area: number;
  value_bar: number;
}

const margin = 100;
const defaultWidth = 100;
const defaultHeight = 50;
const getXValue = (d: MappedDatas) => d.date;
const getYValueBar = (d: MappedDatas) => d.value_bar;
const getYValueArea = (d: MappedDatas) => d.value_area;
const tooltipStyles = {
  ...defaultStyles,
  borderRadius: 4,
  background: "black",
  color: "white",
  fontFamily: "source-code-pro, Menlo, Monaco, Consolas",
};

const CombinationChart = () => {
  const mappedDatas = Object.entries(MOCK_DATA.response).map((item) => ({
    date: item[0],
    ...item[1],
  }));
  console.log(mappedDatas);

  const [ref, bounds] = useMeasure();
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<MappedDatas>();

  const width = bounds.width || defaultWidth;
  const height = bounds.height || defaultHeight;

  const innerWidth = width - margin;
  const innerHeight = height - margin;

  const xScale = scaleBand<string>({
    range: [margin, innerWidth],
    domain: mappedDatas.map(getXValue),
    padding: 0.1,
  });

  const yScaleBar = scaleLinear<number>({
    range: [innerHeight, margin],
    domain: [0, 20000],
  });

  const yScaleArea = scaleLinear<number>({
    range: [innerHeight, margin],
    domain: [0, 200],
  });
  ///========================
  const handleTooltip = (
    event: TouchEvent<SVGRectElement> | MouseEvent<SVGRectElement>,
  ) => {
    const point = localPoint(event);
    if (!point) return;
    console.log("test", event);

    // showTooltip({
    //     tooltipData: event.target,
    //     tooltipLeft: point.x,
    //     tooltipTop: point.y,
    // })
  };

  // ===
  const [selected, setSelected] = useState<string>('해제');

const selectCategory = (e:MouseEvent<HTMLButtonElement>) => {
    // console.log(e);
    
setSelected(e.currentTarget.innerText);
}  

const CATEGORYS = ['해제','성북구','강남구','노원구','중랑구']


  return (
    <>
    {CATEGORYS.map((CATEGORY)=><button onClick={selectCategory} style={CATEGORY===selected?{background:'blue'}:{}}>{CATEGORY}</button>)}
    {selected}
    
      <svg
        ref={ref}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
      >
        <Group>
          {mappedDatas.map((d) => {
            const xValue = getXValue(d);
            const barWidth = xScale.bandwidth();
            const barHeight = innerHeight - yScaleBar(getYValueBar(d) ?? 0);

            const barX = xScale(xValue);
            const barY = innerHeight - barHeight;

            return (
              <Bar
                key={`bar-${xValue}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={d.id===selected?"#454bf5":"#9EA1FF"}
                onClick={()=>setSelected(d.id)}
                onMouseMove={(
                  event:
                    | TouchEvent<SVGRectElement>
                    | MouseEvent<SVGRectElement>,
                ) => {
                  const point = localPoint(event);

                  if (!point) return;

                  showTooltip({
                    tooltipData: d,
                    tooltipTop: point.y,
                    tooltipLeft: point.x,
                  });
                }}
                onMouseLeave={() => hideTooltip()}
              />
            );
          })}
        </Group>
        <Group>
          <AreaClosed<MappedDatas>
            data={mappedDatas}
            x={(d) => xScale(getXValue(d)) ?? 0}
            y={(d) => yScaleArea(getYValueArea(d)) ?? 0}
            // stroke="#23DBBD"
            opacity="0.9"
            fill="#f57b7f"
            strokeWidth={2}
            curve={curveMonotoneX}
            yScale={yScaleArea}
          />
        </Group>

        <Group>
          <AxisBottom
            top={innerHeight}
            scale={xScale}
            tickFormat={(date) => timeFormat("%H:%M:%S")(new Date(date))}
            numTicks={15}
          />
        </Group>
        <Group>
          <AxisLeft
            left={margin}
            scale={yScaleArea}
            numTicks={4}
            label="area"
            labelOffset={50}
          />
        </Group>
        <Group>
          <AxisRight
            left={innerWidth}
            scale={yScaleBar}
            numTicks={4}
            label="bar"
            labelOffset={50}
          />
        </Group>
        {/* <Group>
          <Bar
            x={margin}
            y={margin}
            width={innerWidth - margin}
            height={innerHeight - margin}
            fill="red"
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
        </Group> */}
        {tooltipData && (
          <g>
            <Line
              from={{ x: tooltipLeft, y: margin }}
              to={{ x: tooltipLeft, y: innerHeight }}
              stroke="#75daad"
              strokeWidth={2}
              pointerEvents="none"
              strokeDasharray="5,2"
            />
            <circle
              cx={tooltipLeft}
              cy={tooltipTop + 1}
              r={4}
              fill="black"
              fillOpacity={0.1}
              stroke="black"
              strokeOpacity={0.1}
              strokeWidth={2}
              pointerEvents="none"
            />
            <circle
              cx={tooltipLeft}
              cy={tooltipTop}
              r={4}
              fill="#75daad"
              stroke="white"
              strokeWidth={2}
              pointerEvents="none"
            />
          </g>
        )}
      </svg>
      {tooltipData ? (
        <>
          <TooltipWithBounds
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
            style={tooltipStyles}
          >
            {/* <b>id</b>: {getYValueBar(tooltipData.id)}
            <b>value_area</b>: {getYValueBar(tooltipData.value_area)}
            <b>value_bar</b>: {getYValueBar(tooltipData.value_bar)} */}
          </TooltipWithBounds>
          <TooltipWithBounds
            key={Math.random()}
            top={innerHeight}
            left={tooltipLeft}
            style={tooltipStyles}
          >
            {getXValue(tooltipData)}
          </TooltipWithBounds>
        </>
      ) : null}
    </>
  );
};

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
