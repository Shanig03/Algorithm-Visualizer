import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const TreeNode = memo(({ data }) => {
  const { label, isActive, isVisited } = data;

  let nodeClass = 'rf-node';
  if (isActive) nodeClass += ' rf-node--active';
  else if (isVisited) nodeClass += ' rf-node--visited';

  return (
    <div className={nodeClass}>
      <Handle type="target" position={Position.Top} className="rf-handle" />
      <span className="rf-node__label">{label}</span>
      <Handle type="source" position={Position.Bottom} className="rf-handle" />
    </div>
  );
});

TreeNode.displayName = 'TreeNode';
export default TreeNode;
