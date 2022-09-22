import HomePage from './pages/HomePage';

import './App.css';
import { EthereumProvider } from './context/EthereumContext';

function App() {
  return (
    <EthereumProvider>
      <HomePage />
    </EthereumProvider>
  );
}

export default App;
