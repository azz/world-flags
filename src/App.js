import React, { Component } from "react";
import "./App.css";

import countries from "i18n-iso-countries";
import Flag from "react-world-flags";
import Html5 from "react-dnd-html5-backend";
import { DragSource, DragDropContext, DropTarget } from "react-dnd";

import WorldMap from "./WorldMap";

const DropTargetWorldMap = DropTarget(
  "Flag",
  {
    canDrop(props, monitor) {
      // You can disallow drop based on props or item
      // const item = monitor.getItem();
      return true;
    },

    hover(props, monitor, component) {
      // This is fired very often and lets you perform side effects
      // in response to the hover. You can't handle enter and leave
      // here—if you need them, put monitor.isOver() into collect() so you
      // can just use componentWillReceiveProps() to handle enter/leave.
      // You can access the coordinates if you need them
      // const clientOffset = monitor.getClientOffset();
      // const componentRect = findDOMNode(component).getBoundingClientRect();
      // // You can check whether we're over a nested drop target
      // const isJustOverThisOne = monitor.isOver({ shallow: true });
      // // You will receive hover() even for items for which canDrop() is false
      // const canDrop = monitor.canDrop();
    },

    drop(props, monitor, component) {

      if (monitor.didDrop()) {
        // If you want, you can check whether some nested
        // target already handled drop
        return;
      }

      // Obtain the dragged item
      const item = monitor.getItem();
      console.log("drop", item);

      // You can also do nothing and return a drop result,
      // which will be available as monitor.getDropResult()
      // in the drag source's endDrag() method
      return { moved: true };
    }
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop()
  })
)(({ connectDropTarget }) =>
  connectDropTarget(
    <div>
      <WorldMap />
    </div>
  )
);

const cardSource = {
  beginDrag(props) {
    console.log("drag", props);
    return {
      code: props.code
    };
  }
};

const DraggableFlag = DragSource("Flag", cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(({ code, connectDragSource, isDragging }) =>
  connectDragSource(
    <div className="Flag">
      <Flag code={code} height={24} />
    </div>
  )
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-map">
          <DropTargetWorldMap />
        </div>
        <div className="App-flags">
          {Object.keys(countries.getAlpha3Codes()).map(code => (
            <DraggableFlag key={code} code={code} />
          ))}
        </div>
      </div>
    );
  }
}

export default DragDropContext(Html5)(App);
