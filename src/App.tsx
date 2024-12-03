import './App.css'
import HintsInput from './components/hints-input';
import { NonogramGrid } from './components/nonogram-grid';

function App() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Nonogram Solver</h1>
      <HintsInput />
      <NonogramGrid />
    </div>
  );
}

export default App
