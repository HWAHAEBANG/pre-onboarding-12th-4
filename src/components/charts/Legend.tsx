import { scaleOrdinal } from "@visx/scale";
import { LegendOrdinal, LegendItem, LegendLabel } from "@visx/legend";
import { AREA_CHARTS, BAR_CHARTS } from "../../constants/chartConstArray";

const Legend = () => {

  return (
    <LegendOrdinal scale={ordinalColorScale}>
      {(labels) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            fontSize: "12px",
          }}
        >
          {labels.map((label, index) => (
            <LegendItem key={index}>
              <svg width={legendGlyphSize} height={legendGlyphSize}>
                <rect
                  fill={label.value}
                  width={legendGlyphSize}
                  height={legendGlyphSize}
                />
              </svg>
              <LegendLabel margin="4px">{label.text}</LegendLabel>
            </LegendItem>
          ))}
        </div>
      )}
    </LegendOrdinal>
  );
};

export default Legend;


const legendGlyphSize = 12;

const ordinalColorScale = scaleOrdinal({
  domain: [BAR_CHARTS.kind, AREA_CHARTS.kind],
  range: [BAR_CHARTS.color, AREA_CHARTS.color],
});