import { useContext } from 'react';
import { EthereumContext } from '../context/EthereumContext';
import './ConnectForm.css';

const ConnectForm = () => {
  const { connectWallet } = useContext(EthereumContext);

  const connect = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    connectWallet();
  };

  return (
    <form className="ConnectForm" onSubmit={connect}>
      <div>
        <button type="submit">Connect Wallet</button>
      </div>
    </form>
  );
};

export default ConnectForm;
