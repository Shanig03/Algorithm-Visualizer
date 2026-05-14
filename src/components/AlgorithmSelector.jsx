import React from 'react';

const ALGORITHMS = [
  { value: 'inorder', label: 'Inorder Traversal', description: 'Left → Node → Right' },
  { value: 'preorder', label: 'Preorder Traversal', description: 'Node → Left → Right' },
  { value: 'postorder', label: 'Postorder Traversal', description: 'Left → Right → Node' },
];

export default function AlgorithmSelector({ selected, onChange }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-title">Algorithm</span>
      </div>
      <div className="algo-options">
        {ALGORITHMS.map((algo) => (
          <button
            key={algo.value}
            className={`algo-option ${selected === algo.value ? 'algo-option--active' : ''}`}
            onClick={() => onChange(algo.value)}
          >
            <span className="algo-option__label">{algo.label}</span>
            <span className="algo-option__desc">{algo.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
