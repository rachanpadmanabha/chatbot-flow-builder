import React from "react";

// function to validate the flow of nodes and edges
const validateFlow = (nodes, edges) => {
    const errors = [];
    const nodeIds = new Set(nodes.map((node) => node.id));
    const edgeSourceCounts = {};
    const edgeTargetCounts = {};
    const adjacencyList = {};
    const visited = new Set();

    // initializing adjacency list
    nodeIds.forEach((id) => {
        adjacencyList[id] = [];
    });

    // counting edges for each node and pushing in adjacencyList
    edges.forEach((edge) => {
        if (edge.source in edgeSourceCounts) {
            edgeSourceCounts[edge.source]++;
        } else {
            edgeSourceCounts[edge.source] = 1;
        }

        if (edge.target in edgeTargetCounts) {
            edgeTargetCounts[edge.target]++;
        } else {
            edgeTargetCounts[edge.target] = 1;
        }

        adjacencyList[edge.source].push(edge.target);
    });

    // Check for isolated nodes
    nodes.forEach((node) => {
        if (!edgeSourceCounts[node.id] && !edgeTargetCounts[node.id]) {
            errors.push(
                `Node ${node.id} is isolated (no incoming or outgoing edges).`
            );
        }
    });

    // Check for multiple source nodes
    const sourceNodes = nodes.filter((node) => !edgeTargetCounts[node.id]);
    if (sourceNodes.length > 1) {
        errors.push("There are multiple source nodes.");
    }

    // Check for nodes with multiple outgoing edges
    nodes.forEach((node) => {
        if (edgeSourceCounts[node.id] > 1) {
            errors.push(`Node ${node.id} has multiple outgoing edges.`);
        }
    });

    // Check for self-loops
    edges.forEach((edge) => {
        if (edge.source === edge.target) {
            errors.push(`Node ${edge.source} has a self-loop.`);
        }
    });

    // Check for unreachable nodes using Depth-First Search (DFS)
    const dfs = (nodeId) => {
        visited.add(nodeId);
        adjacencyList[nodeId].forEach((neighborId) => {
            if (!visited.has(neighborId)) {
                dfs(neighborId);
            }
        });
    };

    // Start DFS from the first source node if available
    if (sourceNodes.length > 0) {
        dfs(sourceNodes[0].id);
    }

    // Identify nodes that are unreachable from the source node
    nodes.forEach((node) => {
        if (!visited.has(node.id)) {
            errors.push(`Node ${node.id} is unreachable from the source node.`);
        }
    });

    return errors;
};

// SaveButton component to trigger validation and save the flow
const SaveButton = ({ nodes, edges }) => {
    const handleSave = () => {
        const errors = validateFlow(nodes, edges);

        // Show validation errors or success message
        if (errors.length > 0) {
            alert(`Errors:\n${errors.join("\n")}`);
        } else {
            alert("Save successful!");
        }
    };

    return (
        <div className="button-container">
            <div className="header"> Chatbot flow builder</div>
            <button onClick={handleSave} className="save-button">
                Save
            </button>
        </div>
    );
};

export default SaveButton;
