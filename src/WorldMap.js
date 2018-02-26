import React, { Component } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";
import map from "./data/world-50m.json";

const WorldMap = () => (
  <div>
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
      <ZoomableGroup center={[0, 20]} disablePanning>
        <Geographies geography={map}>
          {(geographies, projection) =>
            geographies.map(
              (geography, i) =>
                geography.id !== "ATA" && (
                  <Geography
                    key={i}
                    geography={geography}
                    projection={projection}
                    style={{
                      default: {
                        fill: "#ECEFF1",
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
                )
            )
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  </div>
);

export default WorldMap;
