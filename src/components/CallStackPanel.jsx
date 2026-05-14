import React from 'react';

export default function CallStackPanel({ callStack }) {
  // Display newest call at top (reverse the array for display)
  const displayed = [...callStack].reverse();

  return (
    <div className="panel panel--callstack">
      <div className="panel-header">
        <span className="panel-title">Call Stack</span>
        <span className="panel-hint">{callStack.length} frames</span>
      </div>
      <div className="callstack-body">
        {displayed.length === 0 ? (
          <div className="callstack-empty">Stack is empty</div>
        ) : (
          displayed.map((frame, i) => (
            <div
              key={i}
              className={`stack-frame ${i === 0 ? 'stack-frame--top' : ''}`}
              style={{ opacity: 1 - i * 0.1 }}
            >
              <span className="stack-frame__depth">{displayed.length - i}</span>
              <span className="stack-frame__name">{frame}</span>
              {i === 0 && <span className="stack-frame__badge">active</span>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
