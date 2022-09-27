import HomePage from './pages/HomePage';

import './App.css';
import { EthereumContext } from './context/EthereumContext';
import { useContext } from 'react';
import Error from './components/Error';
import Loader from './components/Loader';
import Footer from './components/Footer';

function App() {
  const { isLoading, errorMessage, loaderProps } = useContext(EthereumContext);

  return (
    <main>
      {errorMessage ? <Error message={errorMessage} /> : null}
      {isLoading ? (
        <Loader
          title={loaderProps?.title ?? ''}
          description={loaderProps?.description ?? ''}
        />
      ) : (
        <HomePage />
      )}
      <Footer />
    </main>
  );
}

export default App;
