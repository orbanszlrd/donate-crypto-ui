import { useContext } from 'react';
import { EthereumContext } from '../context/EthereumContext';
import './Donors.css';

const Donors = () => {
  const { donors, signer } = useContext(EthereumContext);

  return (
    <div className="Donors">
      <h4>Donors</h4>
      {donors.map((donor) => (
        <div key={donor}>
          <a
            href={`https://${signer?.network.name}.etherscan.io/address/${donor}`}
            title="Open on Etherscan"
            target="_blank"
            rel="noreferrer"
          >
            {donor}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Donors;
