import React from 'react';
import { useNonograms } from '../contexts/NonogramContext';
import './nonogram-grid.css';

export const NonogramGrid: React.FC = () => {
  const { grid, rowHints, colHints } = useNonograms();

  return (
    <div className="nonogram-container">
      {/* Render the column hints */}
      <div className="column-hints">
        {colHints.map((colHint, colIndex) => (
          <div key={colIndex} className="column-hint">
            {colHint.map((hint, hintIndex) => (
              <div key={hintIndex} className="hint">
                {hint}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Render the grid with row hints */}
      <div className="grid-with-row-hints">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row-with-hint">
            {/* Render the row hint */}
            <div className="row-hint">
              {rowHints[rowIndex].map((hint, hintIndex) => (
                <div key={hintIndex} className="hint">
                  {hint}
                </div>
              ))}
            </div>

            {/* Render the grid row */}
            <div className="grid-row">
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className={`grid-cell ${
                    cell === 1
                      ? 'filled'
                      : cell === -1
                      ? 'cannot-fill'
                      : 'not-filled'
                  }`}
                >
                  {cell === -1 ? 'X' : ''}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

