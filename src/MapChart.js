import React, { Component, useState, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from "react-simple-maps";
import * as data from "./DEU.json";
import { geoTransverseMercator } from "d3-geo";
import ReactTooltip from "react-tooltip";

const markers = [
  {
    markerOffset: -15,
    name: "Neue Marker",
    coordinates: [8,51]
  },
  { markerOffset: -15, name: "test", coordinates: [8,50] },
  { markerOffset: 25, name: "test2", coordinates: [9,50] }
  
];

const MapChart = ({ setTooltipContent }) => {
  return (
    <ComposableMap
      data-tip=""
      projection={
        (geoTransverseMercator()
          .scale(2000)
          .center([8, 49.5])
        )}
    >
      <Geographies geography={data}> 
        {({ geographies }) =>
          geographies
            .map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => {
                  const { NAME_1, AUFTRAG } = geo.properties;
                  setTooltipContent(`${NAME_1}: ${AUFTRAG}`);
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
                style={{
                  default: {
                    fill: "#D6D6DA",
                    outline: "none"
                  },
                  hover: {
                    fill: "#5500FF",
                    outline: "none"
                  },
                  pressed: {
                    fill: "#E42",
                    outline: "none"
                  }
                }}
                
              />
            ))
        }
      </Geographies>
      {markers.map(({ name, coordinates, markerOffset }) => (
        <Marker key={name} coordinates={coordinates}>
          <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
          <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {name}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default MapChart;
