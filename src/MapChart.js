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
    name: "Buenos Aires",
    coordinates: [-58.3816, -34.6037]
  },
  { markerOffset: -15, name: "La Paz", coordinates: [-68.1193, -16.4897] },
  { markerOffset: 25, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
  { markerOffset: 25, name: "Santiago", coordinates: [-70.6693, -33.4489] },
  { markerOffset: 25, name: "Bogota", coordinates: [-74.0721, 4.711] },
  { markerOffset: 25, name: "Quito", coordinates: [-78.4678, -0.1807] },
  { markerOffset: -15, name: "Georgetown", coordinates: [-58.1551, 6.8013] },
  { markerOffset: -15, name: "Asuncion", coordinates: [-57.5759, -25.2637] },
  { markerOffset: 25, name: "Paramaribo", coordinates: [-55.2038, 5.852] },
  { markerOffset: 25, name: "Montevideo", coordinates: [-56.1645, -34.9011] },
  { markerOffset: -15, name: "Caracas", coordinates: [-66.9036, 10.4806] },
  { markerOffset: -15, name: "Lima", coordinates: [-77.0428, -12.0464] }
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
