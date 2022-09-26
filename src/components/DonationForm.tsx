import React, { useContext, useState } from 'react';
import { supportedNetworks } from '../constants';
import { EthereumContext } from '../context/EthereumContext';
import './DonationForm.css';

const DonationForm = () => {
  const { signer, donate } = useContext(EthereumContext);

  const minAmount = '0.01';
  const [amount, setAmount] = useState('0.1');

  const changeAmount = (e: React.FormEvent<HTMLInputElement>) => {
    setAmount(e.currentTarget.value);
  };

  const sendDonation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    donate(amount);
  };

  return (
    <form className="DonationForm" onSubmit={sendDonation}>
      <div>
        <button
          type="submit"
          disabled={!supportedNetworks.includes(signer!.network.chainId)}
        >
          Donate
        </button>
      </div>
      <div>
        <input
          type="number"
          placeholder={minAmount}
          step={minAmount}
          min={minAmount}
          value={amount}
          onInput={changeAmount}
        />
        <label>ETH</label>
      </div>
    </form>
  );
};

export default DonationForm;
