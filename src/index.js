
import ReactDOM from 'react-dom';
import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import "./index.css";
import MapChart from "./MapChart";

function MapApp() {
  const [content, setContent] = useState("");
  return (
    <div>
      <center>
      <h2>
      Auftragseingang im Bauhauptgewerbe in Deutschland, 2020 [%]
      </h2>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
      </center>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<MapApp />, rootElement);

