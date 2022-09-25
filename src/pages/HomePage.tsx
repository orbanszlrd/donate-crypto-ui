import { useContext, useState } from 'react';
import Error from '../components/Error';
import EthereumCard from '../components/EthereumCard';
import Loader from '../components/Loader';
import { supportedNetworks } from '../constants';
import { EthereumContext } from '../context/EthereumContext';
import './HomePage.css';

function HomePage() {
  const { isLoading, errorMessage, signer, contract, connectWallet, donate } =
    useContext(EthereumContext);

  const minAmount = '0.001';
  const [amount, setAmount] = useState('0.1');

  return (
    <div className="HomePage">
      {errorMessage ? <Error message={errorMessage} /> : null}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h4 title={contract?.address}>
            Contract balance: {contract?.balance} ETH
          </h4>
          <EthereumCard account={signer} />

          <section>
            {!signer || !signer.address ? (
              <div>
                <button type="button" onClick={connectWallet}>
                  Connect Wallet
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  donate(amount);
                }}
              >
                <div className="donation-form">
                  <div>
                    <button
                      type="submit"
                      disabled={
                        !supportedNetworks.includes(signer.network.chainId)
                      }
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
