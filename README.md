# React Flow Builder for Chatbots

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Project Structure](#project-structure)
5. [Component Breakdown](#component-breakdown)
6. [Getting Started](#getting-started)
7. [Usage](#usage)
8. [Customization](#customization)
9. [Flow Validation](#flow-validation)
10. [Contributing](#contributing)
11. [License](#license)

## Introduction

The React Flow Builder for Chatbots is a powerful, interactive tool designed to help create and manage chatbot conversation flows. It provides a user-friendly interface for designing complex conversation structures through a drag-and-drop mechanism.

## Features

- Interactive flow chart creation with drag-and-drop functionality
- Custom node types for representing different conversation elements
- Node connection management with validation
- Settings panel for editing node properties
- Flow validation to ensure proper chatbot conversation structure
- Ability to save and validate the created flow

## Technologies Used

- React
- react-flow-renderer
- react-dnd (React DnD)
- Material-UI icons

## Project Structure

```
src/
|-- components/
|   |-- FlowBuilder.js
|   |-- NodePanel.js
|   |-- SettingsPanel.js
|   |-- SaveButton.js
|   |-- nodes/
|       |-- TextNode.js (assumed)
|-- utils/
|   |-- removeElements.js
|-- App.js (assumed)
|-- index.js (assumed)
```

## Component Breakdown

### FlowBuilder.js

- Main component that manages the overall state and logic of the flow builder
- Handles node and edge management, drag-and-drop functionality, and component rendering

### NodePanel.js

- Renders draggable node items that can be added to the flow

### SettingsPanel.js

- Provides an interface for editing the properties of selected nodes

### SaveButton.js

- Implements flow validation logic and provides a save functionality

### TextNode.js (assumed)

- Custom node type for representing text messages in the chatbot flow

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/your-username/react-flow-builder.git
   ```
2. Navigate to the project directory:
   ```
   cd react-flow-builder
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Drag nodes from the NodePanel onto the canvas to create new conversation elements.
2. Connect nodes by dragging from one node's handle to another.
3. Click on a node to open the SettingsPanel and edit its properties.
4. Use the SaveButton to validate and save your flow.

## Customization

### Adding New Node Types

To add new node types:

1. Create a new component in the `nodes/` directory.
2. Add the new node type to the `nodeTypes` object in `FlowBuilder.js`.
3. Update the NodePanel to include the new node type.

### Styling

The project uses CSS for styling. Modify the CSS classes in the component files to change the appearance of the Flow Builder.

## Flow Validation

The SaveButton component includes a `validateFlow` function that checks for:

- Isolated nodes
- Multiple source nodes
- Nodes with multiple outgoing edges
- Self-loops
- Unreachable nodes

Ensure your flow passes these validations before saving.

## Contributing

We welcome contributions to improve the React Flow Builder! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

For any additional questions or support, please open an issue in the GitHub repository.
