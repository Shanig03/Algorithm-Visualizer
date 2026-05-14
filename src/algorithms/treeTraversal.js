/**
 * Algorithm simulation layer.
 * Generates an array of step objects for binary tree traversal algorithms.
 * Does NOT animate directly — just builds step data.
 */

// Line numbers in the displayed code (1-indexed)
const INORDER_LINES = { enter: 1, nullCheck: 2, goLeft: 5, visit: 6, goRight: 7 };
const PREORDER_LINES = { enter: 1, nullCheck: 2, visit: 5, goLeft: 6, goRight: 7 };
const POSTORDER_LINES = { enter: 1, nullCheck: 2, goLeft: 5, goRight: 6, visit: 7 };

function buildStep(type, nodeId, message, output, callStack, activeLine, extra = {}) {
  return {
    type,
    nodeId: nodeId !== undefined && nodeId !== null ? String(nodeId) : null,
    message,
    output: [...output],
    callStack: [...callStack],
    activeLine,
    ...extra,
  };
}

// ─── Inorder ──────────────────────────────────────────────────────────────────

export function generateInorderSteps(root) {
  const steps = [];
  const output = [];

  function inorder(node, stack) {
    const callName = node ? `inorder(${node.value})` : 'inorder(null)';
    const currentStack = [...stack, callName];

    steps.push(buildStep('highlight', node?.id, `Call inorder(${node ? node.value : 'null'})`, output, currentStack, INORDER_LINES.enter));

    if (node === null || node === undefined) {
      steps.push(buildStep('null', null, 'Node is null → return', output, currentStack, INORDER_LINES.nullCheck));
      return;
    }

    steps.push(buildStep('highlight', node.id, `Node ${node.value} is not null`, output, currentStack, INORDER_LINES.nullCheck));

    // Go left
    const leftLabel = node.left ? String(node.left.value) : 'null';
    steps.push(buildStep('move', node.id, `Go left from ${node.value} to ${leftLabel}`, output, currentStack, INORDER_LINES.goLeft, {
      fromNodeId: String(node.id),
      toNodeId: node.left ? String(node.left.id) : null,
    }));
    inorder(node.left || null, currentStack);

    // Visit
    output.push(node.value);
    steps.push(buildStep('visit', node.id, `Visit node ${node.value}`, output, currentStack, INORDER_LINES.visit));

    // Go right
    const rightLabel = node.right ? String(node.right.value) : 'null';
    steps.push(buildStep('move', node.id, `Go right from ${node.value} to ${rightLabel}`, output, currentStack, INORDER_LINES.goRight, {
      fromNodeId: String(node.id),
      toNodeId: node.right ? String(node.right.id) : null,
    }));
    inorder(node.right || null, currentStack);

    steps.push(buildStep('backtrack', node.id, `Backtrack from ${node.value}`, output, stack, INORDER_LINES.enter));
  }

  inorder(root, []);
  steps.push(buildStep('done', null, 'Traversal completed ✓', output, [], null));
  return steps;
}

// ─── Preorder ─────────────────────────────────────────────────────────────────

export function generatePreorderSteps(root) {
  const steps = [];
  const output = [];

  function preorder(node, stack) {
    const callName = node ? `preorder(${node.value})` : 'preorder(null)';
    const currentStack = [...stack, callName];

    steps.push(buildStep('highlight', node?.id, `Call preorder(${node ? node.value : 'null'})`, output, currentStack, PREORDER_LINES.enter));

    if (node === null || node === undefined) {
      steps.push(buildStep('null', null, 'Node is null → return', output, currentStack, PREORDER_LINES.nullCheck));
      return;
    }

    steps.push(buildStep('highlight', node.id, `Node ${node.value} is not null`, output, currentStack, PREORDER_LINES.nullCheck));

    // Visit first
    output.push(node.value);
    steps.push(buildStep('visit', node.id, `Visit node ${node.value}`, output, currentStack, PREORDER_LINES.visit));

    // Go left
    const leftLabel = node.left ? String(node.left.value) : 'null';
    steps.push(buildStep('move', node.id, `Go left from ${node.value} to ${leftLabel}`, output, currentStack, PREORDER_LINES.goLeft, {
      fromNodeId: String(node.id),
      toNodeId: node.left ? String(node.left.id) : null,
    }));
    preorder(node.left || null, currentStack);

    // Go right
    const rightLabel = node.right ? String(node.right.value) : 'null';
    steps.push(buildStep('move', node.id, `Go right from ${node.value} to ${rightLabel}`, output, currentStack, PREORDER_LINES.goRight, {
      fromNodeId: String(node.id),
      toNodeId: node.right ? String(node.right.id) : null,
    }));
    preorder(node.right || null, currentStack);

    steps.push(buildStep('backtrack', node.id, `Backtrack from ${node.value}`, output, stack, PREORDER_LINES.enter));
  }

  preorder(root, []);
  steps.push(buildStep('done', null, 'Traversal completed ✓', output, [], null));
  return steps;
}

// ─── Postorder ────────────────────────────────────────────────────────────────

export function generatePostorderSteps(root) {
  const steps = [];
  const output = [];

  function postorder(node, stack) {
    const callName = node ? `postorder(${node.value})` : 'postorder(null)';
    const currentStack = [...stack, callName];

    steps.push(buildStep('highlight', node?.id, `Call postorder(${node ? node.value : 'null'})`, output, currentStack, POSTORDER_LINES.enter));

    if (node === null || node === undefined) {
      steps.push(buildStep('null', null, 'Node is null → return', output, currentStack, POSTORDER_LINES.nullCheck));
      return;
    }

    steps.push(buildStep('highlight', node.id, `Node ${node.value} is not null`, output, currentStack, POSTORDER_LINES.nullCheck));

    // Go left
    const leftLabel = node.left ? String(node.left.value) : 'null';
    steps.push(buildStep('move', node.id, `Go left from ${node.value} to ${leftLabel}`, output, currentStack, POSTORDER_LINES.goLeft, {
      fromNodeId: String(node.id),
      toNodeId: node.left ? String(node.left.id) : null,
    }));
    postorder(node.left || null, currentStack);

    // Go right
    const rightLabel = node.right ? String(node.right.value) : 'null';
    steps.push(buildStep('move', node.id, `Go right from ${node.value} to ${rightLabel}`, output, currentStack, POSTORDER_LINES.goRight, {
      fromNodeId: String(node.id),
      toNodeId: node.right ? String(node.right.id) : null,
    }));
    postorder(node.right || null, currentStack);

    // Visit last
    output.push(node.value);
    steps.push(buildStep('visit', node.id, `Visit node ${node.value}`, output, currentStack, POSTORDER_LINES.visit));

    steps.push(buildStep('backtrack', node.id, `Backtrack from ${node.value}`, output, stack, POSTORDER_LINES.enter));
  }

  postorder(root, []);
  steps.push(buildStep('done', null, 'Traversal completed ✓', output, [], null));
  return steps;
}

// ─── Dispatcher ───────────────────────────────────────────────────────────────

export function generateSteps(tree, algorithm) {
  if (!tree) return [];
  switch (algorithm) {
    case 'inorder': return generateInorderSteps(tree);
    case 'preorder': return generatePreorderSteps(tree);
    case 'postorder': return generatePostorderSteps(tree);
    default: return generateInorderSteps(tree);
  }
}
