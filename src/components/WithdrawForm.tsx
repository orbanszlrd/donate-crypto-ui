import React, { useContext } from 'react';
import { EthereumContext } from '../context/EthereumContext';
import './WithdrawForm.css';

const WithdrawForm = () => {
  const { withdraw } = useContext(EthereumContext);

  const withdrawCrypto = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    withdraw();
  };

  return (
    <form className="WithdrawForm" onSubmit={withdrawCrypto}>
      <div>
        <button type="submit">Withdraw</button>
      </div>
    </form>
  );
};

export default WithdrawForm;
