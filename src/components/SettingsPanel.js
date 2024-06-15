import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SettingsPanel = ({ selectedNode, setNodes, setSelectedNode }) => {
    const [label, setLabel] = useState(selectedNode.data.label);

    // Update local state when `selectedNode` changes
    useEffect(() => {
        setLabel(selectedNode.data.label);
    }, [selectedNode]);

    // Handler for input change
    const onChange = (event) => {
        const updatedNode = {
            ...selectedNode,
            data: {
                ...selectedNode.data,
                label: event.target.value,
            },
        };
        setLabel(event.target.value); // Update local state immediately

        // Update nodes state, replacing the selected node with the updated one
        setNodes((els) =>
            els.map((el) => (el.id === selectedNode.id ? updatedNode : el))
        );
    };

    return (
        <div className="settings-panel">
            {/* Settings panel header */}
            <div className="settings-header">
                <ArrowBackIcon
                    onClick={(_) => {
                        setSelectedNode(null); // Handle click to deselect node
                    }}
                />
                <span>Message</span>
            </div>
            {/* Settings input section */}
            <div className="settings-input">
                <label>Text:</label>
                {/* Textarea for editing node label */}
                <textarea rows={5} type="text" value={label} onChange={onChange} />
            </div>
        </div>
    );
};

export default SettingsPanel;
