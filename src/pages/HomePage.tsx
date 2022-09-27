import { useContext } from 'react';
import ConnectForm from '../components/ConnectForm';
import DonationForm from '../components/DonationForm';
import Donors from '../components/Donors';
import EthereumCard from '../components/EthereumCard';
import WithdrawForm from '../components/WithdrawForm';
import { EthereumContext } from '../context/EthereumContext';
import './HomePage.css';

function HomePage() {
  const { signer, contract } = useContext(EthereumContext);

  return (
    <div className="HomePage">
      <h5 title={contract?.address}>
        Contract balance: {contract?.balance ?? 0} ETH
      </h5>
      <EthereumCard account={signer} />
      {!signer || !signer.address ? <ConnectForm /> : <DonationForm />}
      {signer && contract && signer.address == contract.owner ? (
        <WithdrawForm />
      ) : null}
      {contract ? <Donors /> : null}
    </div>
  );
}

export default HomePage;
