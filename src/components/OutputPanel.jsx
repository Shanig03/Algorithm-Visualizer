import React from 'react';

export default function OutputPanel({ output, algorithm }) {
  return (
    <div className="panel panel--output">
      <div className="panel-header">
        <span className="panel-title">Traversal Output</span>
        <span className="panel-hint">{output.length} nodes visited</span>
      </div>
      <div className="output-row">
        {output.length === 0 ? (
          <span className="output-empty">No output yet — press Play or Step</span>
        ) : (
          output.map((val, i) => (
            <div key={`${val}-${i}`} className="output-box" style={{ animationDelay: `${i * 30}ms` }}>
              <span>{val}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
