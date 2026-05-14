import React, { useMemo, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import TreeNode from './TreeNode.jsx';
import { buildReactFlowGraph, applyNodeStyles } from '../utils/treeLayout.js';

const nodeTypes = { treeNode: TreeNode };

function FlowInner({ tree, activeNodeId, visitedNodeIds, activeEdgeKey }) {
  const { baseNodes, baseEdges } = useMemo(() => {
    const { nodes, edges } = buildReactFlowGraph(tree);
    return { baseNodes: nodes, baseEdges: edges };
  }, [tree]);

  const { styledNodes, styledEdges } = useMemo(() => {
    return applyNodeStyles(baseNodes, baseEdges, activeNodeId, visitedNodeIds, activeEdgeKey);
  }, [baseNodes, baseEdges, activeNodeId, visitedNodeIds, activeEdgeKey]);

  const [nodes, , onNodesChange] = useNodesState(styledNodes);
  const [edges, , onEdgesChange] = useEdgesState(styledEdges);

  // Update nodes/edges when styled versions change
  const syncedNodes = styledNodes;
  const syncedEdges = styledEdges;

  return (
    <ReactFlow
      nodes={syncedNodes}
      edges={syncedEdges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.3 }}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      zoomOnDoubleClick={false}
      panOnScroll={false}
      proOptions={{ hideAttribution: true }}
    >
      <Background color="#1f2e44" gap={28} size={1} />
      <Controls showInteractive={false} />
    </ReactFlow>
  );
}

export default function VisualizerPanel({ tree, activeNodeId, visitedNodeIds, activeEdgeKey, currentMessage }) {
  const isEmpty = !tree;

  return (
    <div className="panel panel--visualizer">
      <div className="panel-header">
        <span className="panel-title">Tree Visualization</span>
        {currentMessage && (
          <span className="viz-message">{currentMessage}</span>
        )}
      </div>
      <div className="flow-container">
        {isEmpty ? (
          <div className="viz-empty">
            <div className="viz-empty__icon">⊘</div>
            <div className="viz-empty__text">No tree to display</div>
            <div className="viz-empty__hint">Enter valid JSON in the Tree Input panel</div>
          </div>
        ) : (
          <ReactFlowProvider>
            <FlowInner
              tree={tree}
              activeNodeId={activeNodeId}
              visitedNodeIds={visitedNodeIds}
              activeEdgeKey={activeEdgeKey}
            />
          </ReactFlowProvider>
        )}
      </div>
    </div>
  );
}
