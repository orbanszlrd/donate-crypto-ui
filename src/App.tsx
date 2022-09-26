import HomePage from './pages/HomePage';

import './App.css';
import { EthereumContext } from './context/EthereumContext';
import { useContext } from 'react';
import Error from './components/Error';
import Loader from './components/Loader';

function App() {
  const { isLoading, errorMessage } = useContext(EthereumContext);

  return (
    <main>
      {errorMessage ? <Error message={errorMessage} /> : null}
      {isLoading ? <Loader /> : <HomePage />}
    </main>
  );
}

export default App;
