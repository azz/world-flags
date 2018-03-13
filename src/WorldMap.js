import React from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";
import { Subscribe } from "unstated";
import SelectionContainer from "./SelectionContainer";

import map from "./data/world-50m.json";

const WorldMap = () => (
  <Subscribe to={[SelectionContainer]}>
    {({ state: { zoom }, zoomIn, zoomOut }) => (
      <div>
        <button onClick={zoomIn}>{"Zoom in"}</button>
        <button onClick={zoomOut}>{"Zoom out"}</button>
        <ComposableMap
          projectionConfig={{
            scale: 205,
            rotation: [-11, 0, 0]
          }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "80vh"
          }}
        >
          <ZoomableGroup center={[0, 20]} zoom={zoom}>
            <Geographies geography={map}>
              {(geographies, projection) =>
                geographies.map(
                  (geography, i) =>
                    geography.id !== "ATA" && (
                      <Subscribe key={i} to={[SelectionContainer]}>
                        {({ state: { code, codesComplete }, matchCountry }) => (
                          <Geography
                            geography={geography}
                            projection={projection}
                            data-tip={geography.properties.NAME}
                            data-code={geography.properties.ISO_A3}
                            onClick={() =>
                              matchCountry(geography.properties.ISO_A3)
                            }
                            style={{
                              default: {
                                fill: codesComplete[geography.properties.ISO_A3]
                                  ? "#FF5722"
                                  : "#ECEFF1",
                                stroke: "#607D8B",
                                strokeWidth: 0.75,
                                outline: "none"
                              },
                              hover: {
                                fill: "#607D8B",
                                stroke: "#607D8B",
                                strokeWidth: 0.75,
                                outline: "none"
                              },
                              pressed: {
                                fill: "#FF5722",
                                stroke: "#607D8B",
                                strokeWidth: 0.75,
                                outline: "none"
                              }
                            }}
                          />
                        )}
                      </Subscribe>
                    )
                )
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )}
  </Subscribe>
);

export default WorldMap;
