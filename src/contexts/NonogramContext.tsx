import React, { createContext, useContext, useState, ReactNode } from 'react';

type Grid = number[][];
type Hints = number[][];

interface NonogramContextType {
  grid: Grid;
  rowHints: Hints;
  colHints: Hints;
  setGrid: React.Dispatch<React.SetStateAction<Grid>>;
  setRowHints: React.Dispatch<React.SetStateAction<Hints>>;
  setColHints: React.Dispatch<React.SetStateAction<Hints>>;
}

const NonogramContext = createContext<NonogramContextType | undefined>(undefined);

export const NonogramContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [grid, setGrid] = useState<Grid>(
    Array.from({ length: 5 }, () => Array(5).fill(0))
  );
  const [rowHints, setRowHints] = useState<Hints>([
    [3], [1, 2], [5], [1], [2, 1]
  ]);
  const [colHints, setColHints] = useState<Hints>([
    [2], [1, 3], [5], [1], [1, 1]
  ]);

  return (
    <NonogramContext.Provider value={{
      grid,
      rowHints,
      colHints,
      setGrid,
      setRowHints,
      setColHints
      }}>
      {children}
    </NonogramContext.Provider>
  );
};

// Create a custom hook to use the NonogramContext
export const useNonograms = () => {
  const context = useContext(NonogramContext);
  if (!context) {
    throw new Error('useNonograms must be used within a NonogramContextProvider');
  }
  return context;
};
