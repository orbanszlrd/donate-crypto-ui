import { FaEthereum } from 'react-icons/fa';
import addressShortener from '../utils/addressShortener';
import './EthereumCard.css';
const EthereumCard = ({ account }: EthereumCardProps) => {
  const { address, network, balance } = account;

  return (
    <article className="ethereum-card">
      <h3>Ethereum</h3>
      <div className="logo">
        <FaEthereum size={32} />
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
            Balance: {Number(balance).toFixed(4)} ETH
          </div>
        </>
      ) : null}
    </article>
  );
};

export default EthereumCard;
