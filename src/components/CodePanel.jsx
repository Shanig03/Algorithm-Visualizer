import React, { useMemo } from 'react';

const ALGORITHM_CODE = {
  inorder: [
    { line: 1, code: 'function inorder(node) {' },
    { line: 2, code: '  if (node === null) {' },
    { line: 3, code: '    return;' },
    { line: 4, code: '  }' },
    { line: 5, code: '' },
    { line: 6, code: '  inorder(node.left);' },
    { line: 7, code: '  visit(node);' },
    { line: 8, code: '  inorder(node.right);' },
    { line: 9, code: '}' },
  ],
  preorder: [
    { line: 1, code: 'function preorder(node) {' },
    { line: 2, code: '  if (node === null) {' },
    { line: 3, code: '    return;' },
    { line: 4, code: '  }' },
    { line: 5, code: '' },
    { line: 6, code: '  visit(node);' },
    { line: 7, code: '  preorder(node.left);' },
    { line: 8, code: '  preorder(node.right);' },
    { line: 9, code: '}' },
  ],
  postorder: [
    { line: 1, code: 'function postorder(node) {' },
    { line: 2, code: '  if (node === null) {' },
    { line: 3, code: '    return;' },
    { line: 4, code: '  }' },
    { line: 5, code: '' },
    { line: 6, code: '  postorder(node.left);' },
    { line: 7, code: '  postorder(node.right);' },
    { line: 8, code: '  visit(node);' },
    { line: 9, code: '}' },
  ],
};

function tokenize(code) {
  if (!code.trim()) return [{ type: 'empty', text: code }];
  const tokens = [];
  const patterns = [
    { type: 'keyword', re: /\b(function|if|return|null)\b/ },
    { type: 'fn',      re: /\b(inorder|preorder|postorder|visit)\b/ },
    { type: 'paren',   re: /[(){}]/ },
    { type: 'word',    re: /\b\w+\b/ },
    { type: 'semi',    re: /;/ },
    { type: 'dot',     re: /\./ },
    { type: 'space',   re: /\s+/ },
  ];
  let rem = code;
  while (rem.length > 0) {
    let matched = false;
    for (const { type, re } of patterns) {
      const m = rem.match(new RegExp('^' + re.source));
      if (m) { tokens.push({ type, text: m[0] }); rem = rem.slice(m[0].length); matched = true; break; }
    }
    if (!matched) { tokens.push({ type: 'other', text: rem[0] }); rem = rem.slice(1); }
  }
  return tokens;
}

const TOKEN_COLORS = {
  keyword: '#f472b6', fn: '#22d3ee', paren: '#7a90b0',
  dot: '#7a90b0', semi: '#3d5070', word: '#e8f0fe',
  space: 'inherit', other: '#e8f0fe', empty: 'inherit',
};

function CodeLine({ lineNum, code, isActive }) {
  const tokens = useMemo(() => tokenize(code), [code]);
  return (
    <div className={`code-line ${isActive ? 'code-line--active' : ''}`}>
      <span className="code-linenum">{lineNum}</span>
      <span className="code-content">
        {tokens.map((tok, i) => (
          <span key={i} style={{ color: TOKEN_COLORS[tok.type] || 'inherit' }}>{tok.text}</span>
        ))}
        {code === '' && '\u00a0'}
      </span>
    </div>
  );
}

export default function CodePanel({ algorithm, activeLine }) {
  const lines = ALGORITHM_CODE[algorithm] || ALGORITHM_CODE.inorder;
  return (
    <div className="panel panel--code">
      <div className="panel-header">
        <span className="panel-title">Algorithm Code</span>
        {activeLine && <span className="code-line-badge">Line {activeLine}</span>}
      </div>
      <div className="code-editor">
        {lines.map(({ line, code }) => (
          <CodeLine key={line} lineNum={line} code={code} isActive={activeLine === line} />
        ))}
      </div>
      <div className="code-note">
        Monaco Editor integration available — code editing in a future version.
      </div>
    </div>
  );
}
