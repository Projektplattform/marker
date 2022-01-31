
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
      TOP 10 Bauunternehmen in Deutschland 2020 [Umsatz]
      </h2>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
      </center>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<MapApp />, rootElement);

