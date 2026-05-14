import React from 'react';

const SPEEDS = [
  { value: 'slow', label: 'Slow' },
  { value: 'normal', label: 'Normal' },
  { value: 'fast', label: 'Fast' },
];

export default function Controls({
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onReset,
  speed,
  onSpeedChange,
  currentStepIndex,
  totalSteps,
}) {
  const isAtStart = currentStepIndex === 0;
  const isAtEnd = currentStepIndex >= totalSteps - 1;
  const hasSteps = totalSteps > 0;
  const progress = hasSteps ? ((currentStepIndex + 1) / totalSteps) * 100 : 0;

  return (
    <div className="panel panel--controls">
      <div className="controls-main">
        <div className="controls-buttons">
          <button
            className="ctrl-btn ctrl-btn--icon"
            onClick={onReset}
            disabled={!hasSteps || isAtStart}
            title="Reset"
          >
            <SkipBackIcon />
          </button>
          <button
            className="ctrl-btn ctrl-btn--icon"
            onClick={onPrevious}
            disabled={!hasSteps || isAtStart}
            title="Previous"
          >
            <PrevIcon />
          </button>
          <button
            className={`ctrl-btn ctrl-btn--play ${isPlaying ? 'ctrl-btn--pause' : ''}`}
            onClick={isPlaying ? onPause : onPlay}
            disabled={!hasSteps || isAtEnd}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            className="ctrl-btn ctrl-btn--icon"
            onClick={onNext}
            disabled={!hasSteps || isAtEnd}
            title="Next"
          >
            <NextIcon />
          </button>
          <button
            className="ctrl-btn ctrl-btn--icon"
            onClick={onReset}
            disabled={!hasSteps}
            title="Reset to start"
          >
            <ResetIcon />
          </button>
        </div>

        <div className="controls-speed">
          {SPEEDS.map((s) => (
            <button
              key={s.value}
              className={`speed-btn ${speed === s.value ? 'speed-btn--active' : ''}`}
              onClick={() => onSpeedChange(s.value)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="controls-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-label">
          {hasSteps ? `${currentStepIndex + 1} / ${totalSteps}` : '0 / 0'}
        </span>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

function PrevIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="15,4 9,12 15,20" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="9,4 15,12 9,20" />
    </svg>
  );
}

function SkipBackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="19,4 9,12 19,20" />
      <rect x="5" y="4" width="3" height="16" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-4.5" />
    </svg>
  );
}
