import { useContext, useState } from 'react';
import Error from '../components/Error';
import EthereumCard from '../components/EthereumCard';
import Loader from '../components/Loader';
import { EthereumContext } from '../context/EthereumContext';
import './HomePage.css';

function HomePage() {
  const {
    isLoading,
    errorMessage,
    account,
    contractBalance,
    connectAccount,
    donateCrypto,
  } = useContext(EthereumContext);

  const minAmount = '0.001';
  const [amount, setAmount] = useState('0.1');

  return (
    <div className="HomePage">
      {errorMessage ? <Error message={errorMessage} /> : null}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h4 style={{ textShadow: '1px 1px 8px #242424' }}>
            Contract balance: {contractBalance} ETH
          </h4>
          <EthereumCard account={account} />

          <section>
            {!account || !account.address ? (
              <div>
                <button type="button" onClick={connectAccount}>
                  Connect Wallet
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  donateCrypto(amount);
                }}
              >
                <div className="donation-form">
                  <div>
                    <button
                      type="submit"
                      disabled={account.network.chainId !== 5}
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
                      onInput={(e) => setAmount(e.currentTarget.value)}
                    />
                    <label>ETH</label>
                  </div>
                </div>
              </form>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default HomePage;
