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

function createTooltip({ name, coordinates }) {
 
  return (
    <>
      <h3>
        {name}
        <p>
          {coordinates}
        </p>
      </h3>
    </>
  );
}

const markers = [
  { markerOffset: -15, name: "Neue Marker", coordinates: [8,51] },
  { markerOffset: -15, name: "test", coordinates: [8,50] },
  { markerOffset: -15, name: "test2", coordinates: [9,50] }
  
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
                fill="#dddddd" 
                stroke="#000000"
                strokeWidth={0}
                />
            ))
        }
      </Geographies>
      {markers.map(({ name, coordinates, markerOffset }) => (
        <Marker 
        key={name} 
        coordinates={coordinates}
        onMouseEnter={() =>
          setTooltipContent(
            createTooltip({
              name,
              coordinates
            })
          )
        }
      
        onMouseLeave={() => {
          setTooltipContent("");
        }}
        >
          <circle r={5} fill="#0000dd" stroke="#ffffff" strokeWidth={0} />
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
