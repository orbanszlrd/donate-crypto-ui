import { FaEthereum } from 'react-icons/fa';
import { AccountType } from '../context/EthereumContext';
import addressShortener from '../utils/addressShortener';
import './EthereumCard.css';

export type EthereumCardProps = {
  account: AccountType;
};

const EthereumCard = ({ account }: EthereumCardProps) => {
  const { address, network, balance } = account;

  return (
    <article className="ethereum-card">
      <h3>Ethereum</h3>
      <div className="logo">
        <FaEthereum size={92} />
      </div>
      {address && balance ? (
        <>
          <div className="account" title={address}>
            Address: {addressShortener(address)}
          </div>
          <div className="network" title={network.name}>
            {network.name} network
          </div>
          <div className="balance" title={balance}>
            Balance: {balance.slice(0, 6)} ETH
          </div>
        </>
      ) : null}
    </article>
  );
};

export default EthereumCard;
