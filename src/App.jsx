import React, { useState, useEffect, useRef, useCallback } from 'react';
import './styles/app.css';

import Header from './components/Header.jsx';
import TreeInputPanel from './components/TreeInputPanel.jsx';
import AlgorithmSelector from './components/AlgorithmSelector.jsx';
import CodePanel from './components/CodePanel.jsx';
import VisualizerPanel from './components/VisualizerPanel.jsx';
import Controls from './components/Controls.jsx';
import OutputPanel from './components/OutputPanel.jsx';
import LogPanel from './components/LogPanel.jsx';
import CallStackPanel from './components/CallStackPanel.jsx';

import { parseTree } from './utils/treeParser.js';
import { generateSteps } from './algorithms/treeTraversal.js';
import { deriveStateFromSteps, SPEED_MAP } from './utils/stepPlayer.js';
import { DEFAULT_TREE_JSON } from './utils/sampleTrees.js';

export default function App() {
  // Input state 
  const [treeJson, setTreeJson] = useState(DEFAULT_TREE_JSON);
  const [parsedTree, setParsedTree] = useState(null);
  const [parseError, setParseError] = useState(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('inorder');

  // Playback state 
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState('normal');

  const intervalRef = useRef(null);

  // Parse + generate steps when tree or algorithm changes 
  useEffect(() => {
    const { tree, error } = parseTree(treeJson);
    if (error) {
      setParseError(error);
      // Keep previous parsed tree if available
    } else {
      setParseError(null);
      setParsedTree(tree);
    }
  }, [treeJson]);

  useEffect(() => {
    if (!parsedTree) {
      setSteps([]);
      setCurrentStepIndex(0);
      return;
    }
    const newSteps = generateSteps(parsedTree, selectedAlgorithm);
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [parsedTree, selectedAlgorithm]);

  // Auto-play interval
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, SPEED_MAP[speed]);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, speed, steps.length]);

  // Control handlers
  const handlePlay = useCallback(() => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(true);
  }, [currentStepIndex, steps.length]);

  const handlePause = useCallback(() => setIsPlaying(false), []);

  const handleNext = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const handlePrevious = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  }, []);

  const handleSpeedChange = useCallback((newSpeed) => {
    setSpeed(newSpeed);
  }, []);

  const handleAlgorithmChange = useCallback((algo) => {
    setSelectedAlgorithm(algo);
    setIsPlaying(false);
  }, []);

  const handleTreeChange = useCallback((newJson) => {
    setTreeJson(newJson);
    setIsPlaying(false);
  }, []);

  // Derive current visualization state
  const {
    activeNodeId,
    visitedNodeIds,
    traversalOutput,
    callStack,
    currentMessage,
    activeEdgeKey,
    activeLine,
  } = deriveStateFromSteps(steps, currentStepIndex);

  return (
    <div className="app-root">
      <Header />

      <div className="app-body">
        {/* Left Column */}
        <div className="left-column">
          <AlgorithmSelector
            selected={selectedAlgorithm}
            onChange={handleAlgorithmChange}
          />
          <TreeInputPanel
            treeJson={treeJson}
            onTreeChange={handleTreeChange}
            error={parseError}
          />
          <CodePanel
            algorithm={selectedAlgorithm}
            activeLine={activeLine}
          />
        </div>

        {/* Right Column */}
        <div className="right-column">
          <div className="top-right">
            <VisualizerPanel
              tree={parsedTree}
              activeNodeId={activeNodeId}
              visitedNodeIds={visitedNodeIds}
              activeEdgeKey={activeEdgeKey}
              currentMessage={currentMessage}
            />
          </div>

          <Controls
            isPlaying={isPlaying}
            onPlay={handlePlay}
            onPause={handlePause}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onReset={handleReset}
            speed={speed}
            onSpeedChange={handleSpeedChange}
            currentStepIndex={currentStepIndex}
            totalSteps={steps.length}
          />
        </div>
      </div>

      {/* Bottom Area */}
      <div className="app-bottom">
        <div className="bottom-left">
          <OutputPanel output={traversalOutput} algorithm={selectedAlgorithm} />
          <LogPanel steps={steps} currentStepIndex={currentStepIndex} />
        </div>
        <div className="bottom-right">
          <CallStackPanel callStack={callStack} />
        </div>
      </div>
    </div>
  );
}
