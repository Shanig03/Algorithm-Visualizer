import React, { useState, useEffect } from 'react';

export default function TreeInputPanel({ treeJson, onTreeChange, error }) {
  const [localJson, setLocalJson] = useState(treeJson);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setLocalJson(treeJson);
    setIsDirty(false);
  }, [treeJson]);

  function handleChange(e) {
    setLocalJson(e.target.value);
    setIsDirty(true);
  }

  function handleApply() {
    onTreeChange(localJson);
    setIsDirty(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleApply();
    }
    // Allow tab indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newVal = localJson.substring(0, start) + '  ' + localJson.substring(end);
      setLocalJson(newVal);
      setIsDirty(true);
      requestAnimationFrame(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      });
    }
  }

  return (
    <div className="panel panel--input">
      <div className="panel-header">
        <span className="panel-title">Tree Input</span>
        <span className="panel-hint">JSON</span>
      </div>
      <textarea
        className={`tree-textarea ${error ? 'tree-textarea--error' : ''}`}
        value={localJson}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        spellCheck={false}
      />
      {error && <div className="input-error">{error}</div>}
      <div className="input-actions">
        <span className="input-hint">Ctrl+Enter to apply</span>
        <button
          className={`btn btn--primary ${isDirty ? 'btn--dirty' : ''}`}
          onClick={handleApply}
        >
          Apply Tree
        </button>
      </div>
    </div>
  );
}
