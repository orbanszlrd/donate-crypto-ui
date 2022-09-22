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

  const minAmount = '0.1';
  const [amount, setAmount] = useState(minAmount);

  return (
    <div className="HomePage">
      {errorMessage ? <Error message={errorMessage} /> : null}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h4>Contract balance: {contractBalance} ETH</h4>
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
                <div>
                  <label>Amount</label>
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
                <div>
                  <button type="submit">Donate Cypto</button>
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
