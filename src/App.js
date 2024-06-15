import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FlowBuilder from "./components/FlowBuilder";
import "./App.css";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <FlowBuilder />
      </div>
    </DndProvider>
  );
};

export default App;
