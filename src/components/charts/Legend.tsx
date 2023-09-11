import React from "react";
import {scaleOrdinal } from "@visx/scale";
import {
  LegendOrdinal,
  LegendItem,
  LegendLabel,
  
} from '@visx/legend';

const Legend = () => {
    return (
    <LegendOrdinal scale={ordinalColorScale}>
          {(labels) => (
            <div style={{ display: 'flex', justifyContent:'center' ,gap:'20px', fontSize:'12px'}}>
              {labels.map((label, index) => (
                <LegendItem key={index}
                >
                  <svg width={legendGlyphSize} height={legendGlyphSize}>
                    <rect fill={label.value} width={legendGlyphSize} height={legendGlyphSize} />
                  </svg>
                  <LegendLabel margin="4px">
                    {label.text}
                  </LegendLabel>
                </LegendItem>
              ))}
            </div>
          )}
        </LegendOrdinal>
    )
}

export default Legend;

const legendGlyphSize = 12;


const ordinalColorScale = scaleOrdinal({
  domain: ['value_bar', 'value_area'],
  range: ['#9EA1FF', '#f57b7f'],
});