import React, { Component, useState, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
  useZoomPan
} from "react-simple-maps";
import * as data from "./DEU.json";
import { geoTransverseMercator } from "d3-geo";
import { zoom } from "d3";


function createTooltip({ name, Bauleistung, Ergebnis, Mitarbeiter }) {
  return (
    <>
      <h3>
        {name}
        <h5><p>Bauleistung [Mio]: € {Bauleistung}</p></h5>
        <h5><p>Ergebnis vor Steuern [Mio]: € {Ergebnis}</p></h5>
        <h5><p>Mitarbeiter: {Mitarbeiter}</p></h5>
      </h3>
    </>
  );
}

const CustomZoomableGroup = ({ children, ...restProps }) => {
  const { mapRef, transformString, position } = useZoomPan(restProps);
  return (
    <g ref={mapRef}>
      <rect width={window.innerWidth} height={window.innerHeight} fill="transparent" />
      <g transform={transformString}>{children(position)}</g>
    </g>
  );
};

const markers = [
  { markerOffset: -6,
    name: "1. Hochtief", 
    Bauleistung: "22.985", 
    Ergebnis: "881,9", 
    Mitarbeiter: "45.646", 
    coordinates: [ 6.998781, 51.424350]
  },
  { markerOffset: -6,
    name: "2. Strabag", 
    Bauleistung: "6.571", 
    Ergebnis: "k.A.", 
    Mitarbeiter: "22.196", 
    coordinates: [6.983306190678337, 50.922166623894086]
  },
  { markerOffset: -6,
    name: "3. Züblin", 
    Bauleistung: "4.010", 
    Ergebnis: "k.A.", 
    Mitarbeiter: "13.124", 
    coordinates: [9.13226314346125, 48.72842030979029]
  },
  { markerOffset: -6,
    name: "4. Goldbeck", 
    Bauleistung: "3.515", 
    Ergebnis: "231,7", 
    Mitarbeiter: "7.068", 
    coordinates: [ 8.45468349355798, 51.989009271138976]
  },
  { markerOffset: -6,
    name: "5. Zech", 
    Bauleistung: "2.870", 
    Ergebnis: "92,5", 
    Mitarbeiter: "11.348", 
    coordinates: [ 8.873976208491072, 53.08757747833831]
  },
  { markerOffset: -6,
    name: "6. VINCI", 
    Bauleistung: "2.851", 
    Ergebnis: "k.A.", 
    Mitarbeiter: "13.361", 
    coordinates: [ 8.436767988936655, 49.48441500236512]
  },
  { markerOffset: -6,
    name: "7. Max Bögl", 
    Bauleistung: "2.000", 
    Ergebnis: "9", 
    Mitarbeiter: "6.500", 
    coordinates: [ 11.452471428450231, 49.212458158752526]
  },
  { markerOffset: -6,
    name: "8. Kaefer", 
    Bauleistung: "1.700", 
    Ergebnis: "30,2", 
    Mitarbeiter: "28.000", 
    coordinates: [ 8.762050945165733, 53.10821334867593]
  },
  { markerOffset: -6,
    name: "9. Leonhard Weiss", 
    Bauleistung: "1.583", 
    Ergebnis: "137", 
    Mitarbeiter: "5.788", 
    coordinates: [ 9.706178033459043, 48.67227190081192]
  },
  { markerOffset: -6,
    name: "10. Bauer", 
    Bauleistung: "1.335", 
    Ergebnis: "16", 
    Mitarbeiter: "11.592", 
    coordinates: [ 11.25862591234283, 48.56394553055087]
  },
];

const MapChart = ({ setTooltipContent }) => {
  return (
    <ComposableMap
      data-tip=""
      height={350}
      //capHeight={1000}
      projection={
        (geoTransverseMercator()
          .scale(2000)
          .center([9, 51])
        )}
    >
      <CustomZoomableGroup center={[9, 51]}>
      {position => (
          <>
      <Geographies geography={data}> 
        {({ geographies }) =>
          geographies
            .map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#dddddd" 
                
                stroke="#ffffff"
                strokeWidth={0.4}
                
                />
            ))
        }
      </Geographies>
      {markers.map(({ name, coordinates, Bauleistung, Ergebnis, Mitarbeiter, markerOffset, globalscale }) => (
        
        <Marker 
        key={name} 
        coordinates={coordinates}
        onMouseEnter={() =>
          setTooltipContent(
            createTooltip({
              name,
              Bauleistung,
              Ergebnis,
              Mitarbeiter
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
            //Definiere Font (Standort)
            style={{ fontFamily: "Arial", fontSize: 20 / globalscale , fill: "#5D5A6D" }}
          >
          </text>
          </Marker>
  
      ))}
      </>
        )}
      </CustomZoomableGroup>
    </ComposableMap>
  );
};

export default MapChart;
