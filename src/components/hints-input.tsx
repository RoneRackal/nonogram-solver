import React, { useState } from 'react';
import { useNonograms } from '../contexts/NonogramContext';
import './hints-input.css';

const HintsInput: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const { setRowHints, setColHints, setGrid } = useNonograms();

  // Parse the input and update hints
  const handleSubmit = () => {
    try {
      const lines = inputText.trim().split('\n');
      const rowHints: number[][] = [];
      const colHints: number[][] = [];

      lines.forEach((line) => {
        const [indicator, ...values] = line.trim().split(' ');
        if (indicator === 'R') {
          const rows = values.join(' ').split(',').map((row) =>
            row
              .trim()
              .split(' ')
              .map(Number)
          );
          rowHints.push(...rows);
        } else if (indicator === 'C') {
          const cols = values.join(' ').split(',').map((col) =>
            col
              .trim()
              .split(' ')
              .map(Number)
          );
          colHints.push(...cols);
        } else {
          throw new Error('Invalid format');
        }
      });
      
      setGrid(Array.from({ length: rowHints.length }, () => Array(colHints.length).fill(0)));
      setRowHints(rowHints);
      setColHints(colHints);
      setIsOpen(false); // Close dialog on success
    } catch (error) {
      alert('Error parsing input. Please ensure it is in the correct format.');
    }
  };

  return (
    <div className="hints-input-container">
      <button onClick={() => setIsOpen(true)} className="open-dialog-button">
        Edit Hints
      </button>
      {isOpen && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h2>Enter Hints</h2>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter hints here (e.g., R 1 2, 3\nC 1, 2 3)"
            />
            <div className="dialog-actions">
              <button onClick={handleSubmit} className="submit-button">
                Submit
              </button>
              <button onClick={() => setIsOpen(false)} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HintsInput;
