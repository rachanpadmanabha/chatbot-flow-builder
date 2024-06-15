/* eslint-disable no-unused-vars */
import React from "react";
import { useDrag } from "react-dnd";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";

// NodePanel component to render a draggable node item
const NodePanel = () => {
    // Setup drag functionality using react-dnd
    const [{ isDragging }, drag] = useDrag({
        type: "textNode", // Specify the type of draggable item
        item: { type: "textNode" }, // Data describing the item being dragged
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(), // Collect drag state
        }),
    });

    return (
        <div className="node-panel">
            {/* Draggable node item */}
            <div ref={drag} className="node-item">
                <MessageOutlinedIcon /> {/* Icon for the node */}
                Message {/* Label for the node */}
            </div>
        </div>
    );
};

export default NodePanel;
