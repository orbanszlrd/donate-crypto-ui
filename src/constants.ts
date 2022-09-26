import { MetaMaskInpageProvider } from '@metamask/providers';

import donateCryptoJson from './contracts/DonateCrypto.json';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export const { ethereum } = window;

export enum Network {
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  SEPOLIA = 11155111,
}

export const supportedNetworks = [
  Network.ROPSTEN,
  Network.RINKEBY,
  Network.GOERLI,
  Network.SEPOLIA,
];

export const donateCrypto: SolidityContractType = {
  abi: donateCryptoJson.abi,
  address: {
    [Network.ROPSTEN]:
      import.meta.env.VITE_CONTRACT_ADDRESS_ROPSTEN || ('' as string),
    [Network.RINKEBY]:
      import.meta.env.VITE_CONTRACT_ADDRESS_RINKEBY || ('' as string),
    [Network.GOERLI]:
      import.meta.env.VITE_CONTRACT_ADDRESS_GOERLI || ('' as string),
    [Network.SEPOLIA]:
      import.meta.env.VITE_CONTRACT_ADDRESS_SEPOLIA || ('' as string),
  },
};

export const ERROR_METAMASK_NOT_INSTALLED = 'MetaMask not installed';
export const ERROR_UNSUPPORTED_NETWORK =
  'Your wallet is connected to an unsupported Network';
