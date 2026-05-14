# Algorithm Visualizer

An interactive React + Vite application for visualizing **binary tree traversal algorithms** step by step.

This project helps you understand how recursive traversals work by showing:
- the current node being processed,
- movement between parent/child nodes,
- recursive call stack changes,
- traversal output as it is built,
- and pseudo-code line highlighting synced to each step.

## Features

- **Three traversal algorithms**
  - Inorder (`Left → Node → Right`)
  - Preorder (`Node → Left → Right`)
  - Postorder (`Left → Right → Node`)
- **Step-by-step playback controls**
  - Play / Pause
  - Previous / Next
  - Reset
  - Adjustable speed
- **Editable JSON tree input** with validation and inline errors
- **Synchronized learning panels**
  - Tree visualizer
  - Code panel with active line highlighting
  - Traversal output panel
  - Execution log
  - Recursive call stack panel

## Getting Started

### Prerequisites

- **Node.js 18+** (recommended)
- npm (comes with Node.js)

### Installation

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

Then open the local URL printed by Vite (usually `http://localhost:5173`).

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Tree Input Format

The app expects a JSON object representing a binary tree.
Each non-null node should contain:
- `id` (required)
- `value` (required)
- `left` (optional, node or `null`)
- `right` (optional, node or `null`)

### Example

```json
{
  "id": 1,
  "value": 10,
  "left": {
    "id": 2,
    "value": 5,
    "left": null,
    "right": null
  },
  "right": {
    "id": 3,
    "value": 15,
    "left": null,
    "right": null
  }
}
```

> Tip: In the tree input panel, use **Ctrl+Enter** (or **Cmd+Enter** on macOS) to apply your updated JSON.

## Available Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — create production build in `dist/`
- `npm run preview` — preview the production build locally

## Project Structure

```text
src/
  algorithms/
    treeTraversal.js      # Step generation for inorder/preorder/postorder
  components/             # UI panels (controls, code, logs, call stack, etc.)
  utils/
    treeParser.js         # Tree JSON validation/parsing
    treeLayout.js         # Tree layout helpers
    stepPlayer.js         # Derives current visual state from traversal steps
  styles/
    app.css               # Main app styles
```

## Why this project is useful

This visualizer is designed for students and interview prep learners who want to **build strong recursion intuition**. Instead of only showing final traversal output, it exposes the intermediate execution state so you can track *how* each algorithm progresses.

---

## Ideas to potentially develop later
- level-order traversal,
- iterative stack-based traversals,
- BST insert/delete/search visualizations,
- or graph algorithms in the same UI pattern.
