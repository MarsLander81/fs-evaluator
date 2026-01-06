import './App.css'
import Tasks from "./Tasks"
import Users from './Users';

function App() {
  return (
    <div className="app">
      <h1>📝 React Task Evaluator</h1>
      <div><Users></Users></div>
      <Tasks />
    </div>
  );
}

export default App
