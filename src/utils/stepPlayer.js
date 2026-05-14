/**
 * Derives visualization state from a step and previous steps.
 */
export function deriveStateFromSteps(steps, currentStepIndex) {
  if (!steps || steps.length === 0) {
    return {
      activeNodeId: null,
      visitedNodeIds: new Set(),
      traversalOutput: [],
      callStack: [],
      currentMessage: '',
      activeEdgeKey: null,
      activeLine: null,
    };
  }

  const currentStep = steps[Math.min(currentStepIndex, steps.length - 1)];

  // Visited nodes: all nodes visited up to and including current step
  const visitedNodeIds = new Set();
  for (let i = 0; i <= currentStepIndex && i < steps.length; i++) {
    if (steps[i].type === 'visit' && steps[i].nodeId) {
      visitedNodeIds.add(String(steps[i].nodeId));
    }
  }

  const activeEdgeKey =
    currentStep.type === 'move' && currentStep.fromNodeId && currentStep.toNodeId
      ? `${currentStep.fromNodeId}-${currentStep.toNodeId}`
      : null;

  return {
    activeNodeId: currentStep.nodeId ? String(currentStep.nodeId) : null,
    visitedNodeIds,
    traversalOutput: currentStep.output || [],
    callStack: currentStep.callStack || [],
    currentMessage: currentStep.message || '',
    activeEdgeKey,
    activeLine: currentStep.activeLine || null,
  };
}

export const SPEED_MAP = {
  slow: 1200,
  normal: 700,
  fast: 300,
};
