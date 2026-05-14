/**
 * Converts a tree object into React Flow nodes and edges.
 * Uses a recursive layout algorithm.
 */

const LEVEL_HEIGHT = 110;
const MIN_NODE_SEPARATION = 70;

/**
 * First pass: compute the subtree width for each node.
 */
function computeWidths(node) {
  if (!node) return 0;
  const leftWidth = computeWidths(node.left) || MIN_NODE_SEPARATION;
  const rightWidth = computeWidths(node.right) || MIN_NODE_SEPARATION;
  node._width = leftWidth + rightWidth;
  return node._width;
}

/**
 * Second pass: assign x, y to each node.
 */
function assignPositions(node, x, y, nodes, edges, parentId = null) {
  if (!node) return;

  nodes.push({
    id: String(node.id),
    type: 'treeNode',
    position: { x, y },
    data: { label: String(node.value), nodeId: String(node.id) },
  });

  if (parentId !== null) {
    edges.push({
      id: `e-${parentId}-${node.id}`,
      source: String(parentId),
      target: String(node.id),
      type: 'default',
      style: { stroke: '#1f2e44', strokeWidth: 2 },
      animated: false,
    });
  }

  const leftWidth = node.left ? (node.left._width || MIN_NODE_SEPARATION) : 0;
  const rightWidth = node.right ? (node.right._width || MIN_NODE_SEPARATION) : 0;

  if (node.left) {
    assignPositions(node.left, x - (rightWidth / 2 + leftWidth / 2) / 2 - 30, y + LEVEL_HEIGHT, nodes, edges, node.id);
  }
  if (node.right) {
    assignPositions(node.right, x + (rightWidth / 2 + leftWidth / 2) / 2 + 30, y + LEVEL_HEIGHT, nodes, edges, node.id);
  }
}

export function buildReactFlowGraph(tree) {
  if (!tree) return { nodes: [], edges: [] };

  // Clone to avoid mutating the original
  const clone = deepClone(tree);

  computeWidths(clone);

  const nodes = [];
  const edges = [];
  assignPositions(clone, 0, 0, nodes, edges, null);

  return { nodes, edges };
}

function deepClone(obj) {
  if (!obj) return obj;
  return {
    ...obj,
    left: obj.left ? deepClone(obj.left) : undefined,
    right: obj.right ? deepClone(obj.right) : undefined,
  };
}

/**
 * Apply visual state to nodes based on current step.
 */
export function applyNodeStyles(nodes, edges, activeNodeId, visitedNodeIds, activeEdgeKey) {
  const styledNodes = nodes.map((node) => {
    const isActive = node.id === activeNodeId;
    const isVisited = visitedNodeIds.has(node.id);

    return {
      ...node,
      data: {
        ...node.data,
        isActive,
        isVisited,
      },
    };
  });

  const styledEdges = edges.map((edge) => {
    const key = `${edge.source}-${edge.target}`;
    const isActive = key === activeEdgeKey;
    return {
      ...edge,
      style: {
        stroke: isActive ? '#f472b6' : '#1f2e44',
        strokeWidth: isActive ? 3 : 2,
      },
      animated: isActive,
    };
  });

  return { styledNodes, styledEdges };
}
