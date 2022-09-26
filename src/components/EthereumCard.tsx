import { FaEthereum } from 'react-icons/fa';
import addressShortener from '../utils/addressShortener';
import './EthereumCard.css';
const EthereumCard = ({ account }: EthereumCardProps) => {
  return (
    <article className="ethereum-card">
      <h3>Ethereum</h3>
      <div className="logo">
        <FaEthereum size={32} />
      </div>
      {account && account.address && account.balance ? (
        <>
          <div
            className="network"
            title={`${account.network.name}: ${account.network.chainId}`}
          >
            {account.network.name} network
          </div>
          <div className="account" title={account.address}>
            Address: {addressShortener(account.address)}
          </div>
          <div className="balance" title={account.balance}>
            Balance: {Number(account.balance).toFixed(4)} ETH
          </div>
        </>
      ) : null}
    </article>
  );
};

export default EthereumCard;
