import React from 'react';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="header-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="5" r="2.5" />
            <circle cx="5" cy="17" r="2.5" />
            <circle cx="19" cy="17" r="2.5" />
            <line x1="12" y1="7.5" x2="5" y2="14.5" />
            <line x1="12" y1="7.5" x2="19" y2="14.5" />
          </svg>
        </div>
        <div>
          <h1 className="header-title">Algorithm Visualizer</h1>
          <p className="header-subtitle">Visualize binary tree traversal step by step</p>
        </div>
      </div>
      <div className="header-badge">
        <span className="badge-dot" />
        Binary Tree Traversal
      </div>
    </header>
  );
}
