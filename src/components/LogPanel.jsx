import React, { useRef, useEffect } from 'react';

const STEP_TYPE_STYLE = {
  visit: 'log-entry--visit',
  move: 'log-entry--move',
  backtrack: 'log-entry--backtrack',
  null: 'log-entry--null',
  done: 'log-entry--done',
  highlight: 'log-entry--highlight',
};

export default function LogPanel({ steps, currentStepIndex }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentStepIndex]);

  const visibleSteps = steps.slice(0, currentStepIndex + 1);

  return (
    <div className="panel panel--log">
      <div className="panel-header">
        <span className="panel-title">Step Log</span>
        <span className="panel-hint">{visibleSteps.length} steps</span>
      </div>
      <div className="log-scroll" ref={scrollRef}>
        {visibleSteps.length === 0 ? (
          <div className="log-empty">Log is empty — start the visualization</div>
        ) : (
          visibleSteps.map((step, i) => {
            const isCurrent = i === currentStepIndex;
            const typeClass = STEP_TYPE_STYLE[step.type] || '';
            return (
              <div
                key={i}
                className={`log-entry ${typeClass} ${isCurrent ? 'log-entry--current' : ''}`}
              >
                <span className="log-idx">{String(i + 1).padStart(3, '0')}</span>
                <span className="log-type-dot" />
                <span className="log-msg">{step.message}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
