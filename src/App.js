import React, { Component } from "react";
import "./App.css";

import countries from "i18n-iso-countries";
import Flag from "react-world-flags";
import { Provider, Subscribe } from "unstated";
import ReactTooltip from "react-tooltip";

import WorldMap from "./WorldMap";
import SelectionContainer from "./SelectionContainer";

class App extends Component {
  render() {
    return (
      <Provider>
        <ReactTooltip />

        <div className="App">
          <div className="App-map">
            <WorldMap />
          </div>
          <Subscribe to={[SelectionContainer]}>
            {selection => (
              <div className="App-flags">
                {Object.keys(countries.getAlpha3Codes())
                  .filter(code => !selection.state.codesComplete[code])
                  .map(code => (
                    <Flag
                      className={
                        "Flag " +
                        (code === selection.state.code ? "-selected" : "")
                      }
                      key={code}
                      code={code}
                      onClick={() => selection.selectFlagByCode(code)}
                    />
                  ))}
              </div>
            )}
          </Subscribe>
        </div>
      </Provider>
    );
  }
}

export default App;
