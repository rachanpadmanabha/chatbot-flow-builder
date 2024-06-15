/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from "react";
import ReactFlow, {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
} from "react-flow-renderer";
import NodePanel from "./NodePanel";
import SettingsPanel from "./SettingsPanel";
import SaveButton from "./SaveButton";
import TextNode from "./nodes/TextNode";
import removeElements from "../utils/removeElements";
import { useDrop } from "react-dnd";

//custom node types
//as we had custom node with differnt design we are creating a custom Node
const nodeTypes = {
    textNode: TextNode,
};

// initial set of nodes so 
//that our canvas is not empty
const initialNodes = [
    {
        id: "1",
        data: { label: "Hello Sir" },
        position: { x: 0, y: 0 },
        sourcePosition: "right",
        type: "textNode",
        targetPosition: "left",
    },
    {
        id: "2",
        data: { label: "Oh Hey!" },
        position: { x: 100, y: 100 },
        type: "textNode",
        sourcePosition: "right",
        targetPosition: "left",
    },
];

// iitial set of edges for the canvas
const initialEdges = [{ id: "1-2", source: "1", target: "2" }];

function FlowBuilder() {
    // state to manage the currently selected node, nodes and edges
    const [selectedNode, setSelectedNode] = useState(null);

    const [nodes, setNodes] = useState(initialNodes);

    const [edges, setEdges] = useState(initialEdges);

    //node deletion code
    const onNodesDelete = useCallback(
        (elementsToRemove) =>
            setEdges((els) => removeElements(elementsToRemove, els)),
        []
    );

    //node click event to set selected 
    //node so that settings panel Open up
    const onNodeClick = (event, element) => {
        if (element.data.label !== "") {
            setSelectedNode(element);
        } else {
            setSelectedNode(null);
        }
    };

    // load and fit the canvas view to the container
    const onLoad = (reactFlowInstance) => {
        reactFlowInstance.fitView();
    };

    // handle node changes like drag and drop
    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );

    // handle edge changes like creation and deletion
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    // handle connecting nodes, 
    //ensuring only one outgoing edge per node
    const onConnect = useCallback(
        (params) => {
            const hasOutgoingEdge = edges.some(
                (edge) => edge.source === params.source
            );
            if (!hasOutgoingEdge) {
                setEdges((eds) => addEdge(params, eds));
            } else {
                alert("A node can only have one outgoing edge.");
            }
        },
        [edges]
    );

    // dropping a new node onto the canvas
    const onDrop = useCallback(
        (item, monitor) => {
            const delta = monitor.getSourceClientOffset();
            const position = monitor.getClientOffset();
            const newNode = {
                id: `new-node-${nodes.length + 1}`,
                data: { label: `New Node ${nodes.length + 1}` },
                position: {
                    x: position.x - delta.x,
                    y: position.y - delta.y,
                },
                type: item.type,
                sourcePosition: "right",
                targetPosition: "left",
            };
            setNodes((prevNodes) => [...prevNodes, newNode]);
        },
        [nodes, setNodes]
    );

    // Drag And Drop setup for handling node drop events
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: "textNode",
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    return (
        <div className="flow-builder">
            {/* Button to save the flow */}
            <SaveButton edges={edges} nodes={nodes} />
            <div className="flow-container">
                <div
                    className="container"
                    style={{ width: "100%", height: "100vh", backgroundColor: "#f0f0f0" }}
                    ref={drop}
                >
                    {/* The main flow chart component */}
                    <ReactFlow
                        nodes={nodes}
                        onNodesChange={onNodesChange}
                        edges={edges}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        fitView
                        onNodeClick={onNodeClick}
                        onNodesDelete={onNodesDelete}
                        nodeTypes={nodeTypes}
                        onInit={onLoad}
                        snapToGrid={true}
                        onPaneClick={(_) => setSelectedNode(null)}
                    ></ReactFlow>
                </div>

                {/* Conditional rendering of the settings panel or node panel */}
                {selectedNode ? (
                    <SettingsPanel
                        selectedNode={selectedNode}
                        setNodes={setNodes}
                        setSelectedNode={setSelectedNode}
                    />
                ) : (
                    <NodePanel />
                )}
            </div>
        </div>
    );
}

export default FlowBuilder;
