/**
 * Validates and parses a JSON string into a tree node object.
 * Returns { tree, error }.
 */
export function parseTree(jsonString) {
  if (!jsonString || !jsonString.trim()) {
    return { tree: null, error: 'Please enter a valid tree JSON.' };
  }

  let raw;
  try {
    raw = JSON.parse(jsonString);
  } catch (e) {
    return { tree: null, error: `Invalid JSON: ${e.message}` };
  }

  const validationError = validateNode(raw, 'root');
  if (validationError) {
    return { tree: null, error: validationError };
  }

  return { tree: raw, error: null };
}

function validateNode(node, path) {
  if (node === null || node === undefined) {
    return null; // null children are allowed
  }

  if (typeof node !== 'object' || Array.isArray(node)) {
    return `Node at "${path}" must be an object.`;
  }

  if (node.id === undefined || node.id === null) {
    return `Node at "${path}" is missing required field "id".`;
  }

  if (node.value === undefined || node.value === null) {
    return `Node at "${path}" is missing required field "value".`;
  }

  if (node.left !== undefined && node.left !== null) {
    const leftError = validateNode(node.left, `${path}.left`);
    if (leftError) return leftError;
  }

  if (node.right !== undefined && node.right !== null) {
    const rightError = validateNode(node.right, `${path}.right`);
    if (rightError) return rightError;
  }

  return null;
}

/**
 * Collects all node IDs from a tree into a Set.
 */
export function collectNodeIds(node, ids = new Set()) {
  if (!node) return ids;
  ids.add(String(node.id));
  collectNodeIds(node.left, ids);
  collectNodeIds(node.right, ids);
  return ids;
}
