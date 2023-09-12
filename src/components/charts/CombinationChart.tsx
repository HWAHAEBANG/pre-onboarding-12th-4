import React, { FC, MouseEvent, TouchEvent } from "react";
import { AxisBottom, AxisLeft, AxisRight } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar, AreaClosed, Line } from "@visx/shape";
import { TooltipWithBounds, defaultStyles, useTooltip } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { curveMonotoneX } from "@visx/curve";
import useMeasure from "react-use-measure";
import { timeFormat } from "d3-time-format";

import Legend from "./Legend";
import { MappedDatas } from "../../types/mappedDatas";
import { MOCK_DATA } from "../../data/mock_data";

const mappedDatas = Object.entries(MOCK_DATA.response).map((item) => ({
  date: item[0],
  ...item[1],
}));

//==================================================================

interface Props {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

//==================================================================
const CombinationChart: FC<Props> = ({ setSelected, selected }) => {
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

  const innerWidth = width - marginX;
  const innerHeight = height - marginY;

  //==================================================================

  const xScale = scaleBand<string>({
    range: [marginX, innerWidth],
    domain: mappedDatas.map(getXValue),
    padding: 0.1,
  });

  const yScaleBar = scaleLinear<number>({
    range: [innerHeight, marginY],
    domain: [0, 20000],
  });

  const yScaleArea = scaleLinear<number>({
    range: [innerHeight, marginY],
    domain: [0, 200],
  });

  //==================================================================
  return (
    <>
      <svg
        ref={ref}
        width="100%"
        height="75%"
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
                fill={d.id === selected ? "#5741C0" : "#9EA1FF"}
              />
            );
          })}
        </Group>
        <Group>
          <AreaClosed<MappedDatas>
            data={mappedDatas}
            x={(d) => xScale(getXValue(d)) ?? 0}
            y={(d) => yScaleArea(getYValueArea(d)) ?? 0}
            opacity="0.9"
            fill="#f57b7f"
            curve={curveMonotoneX}
            yScale={yScaleArea}
            // width={xScale.bandwidth()}
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
            left={marginX}
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
        <Group>
          {mappedDatas.map((d) => {
            const xValue = getXValue(d);
            const barWidth = xScale.bandwidth();
            const barHeight = innerHeight - marginY;

            const barX = xScale(xValue);
            const barY = innerHeight - barHeight;

            return (
              <Bar
                key={`bar-${xValue}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill="transparent"
                onClick={() => setSelected(d.id)}
                style={{ cursor: "pointer" }}
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
        {tooltipData && (
          <g>
            <Line
              from={{ x: tooltipLeft, y: marginY }}
              to={{ x: tooltipLeft, y: innerHeight }}
              stroke="#727272"
              strokeWidth={2}
              pointerEvents="none"
              strokeDasharray="5,2"
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
            <b>id</b>: {tooltipData.id}
            <br />
            <b>value_area</b>: {getYValueArea(tooltipData)}
            <br />
            <b>value_bar</b>: {getYValueBar(tooltipData)}
          </TooltipWithBounds>
          <TooltipWithBounds
            key={Math.random()}
            top={innerHeight + marginY * 2}
            left={tooltipLeft}
            style={tooltipStyles}
          >
            {getXValue(tooltipData)}
          </TooltipWithBounds>
        </>
      ) : null}
      <Legend />
    </>
  );
};

export default CombinationChart;

//==================================================================

const marginY = 30;
const marginX = 100;
const defaultWidth = 100;
const defaultHeight = 100;
const getXValue = (d: MappedDatas) => d.date;
const getYValueBar = (d: MappedDatas) => d.value_bar;
const getYValueArea = (d: MappedDatas) => d.value_area;

const tooltipStyles = {
  ...defaultStyles,
  borderRadius: 4,
  background: "rgba(0, 0, 0, 0.5)",
  color: "white",
  padding: "5px",
  fontFamily: "source-code-pro, Menlo, Monaco, Consolas",
};
