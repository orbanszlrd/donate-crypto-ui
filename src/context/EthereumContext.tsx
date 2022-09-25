import { createContext, FunctionComponent, useEffect, useState } from 'react';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { ethers } from 'ethers';

import contractJson from '../contracts/DonateCrypto.json';
const contractAbi = contractJson.abi;

export const supportedNetworks = [3, 4, 5, 11155111];

const contractAddressRopsten = import.meta.env.VITE_CONTRACT_ADDRESS_ROPSTEN;
const contractAddressRinkeby = import.meta.env.VITE_CONTRACT_ADDRESS_RINKEBY;
const contractAddressGoerli = import.meta.env.VITE_CONTRACT_ADDRESS_GOERLI;
const contractAddressSepolia = import.meta.env.VITE_CONTRACT_ADDRESS_SEPOLIA;

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const { ethereum } = window;

export const EthereumContext = createContext<EthereumContextType | null>(null);

export const EthereumProvider: FunctionComponent<EthereumProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [provider, setProvider] = useState<ethers.providers.Provider | null>(
    null
  );
  const [network, setNetwork] = useState<ethers.providers.Network | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [contractBalance, setContractBalance] = useState('');
  const [contractNetwork, setContractNetwork] =
    useState<ethers.providers.Network | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [account, setAccount] = useState<AccountType>({
    address: '',
    balance: '',
    network: {
      name: '',
      chainId: 0,
    },
  });

  const ethereumExists = (): boolean => {
    try {
      if (typeof (window as any).ethereum === 'undefined') {
        setErrorMessage('MetaMask is not Installed');
        return false;
      }
    } catch (error: any) {
      return false;
    }

    return true;
  };

  const retrieveProviderData = async () => {
    if (ethereumExists()) {
      try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        setProvider(provider);
        const network = await provider.getNetwork();
        setNetwork(network);
      } catch (error) {}
    }
  };

  const retrieveContract = async () => {
    if (ethereumExists()) {
      try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const network = await provider.getNetwork();
        const signer = await provider.getSigner();

        let contractAddress;

        switch (network.chainId) {
          case 3:
            contractAddress = contractAddressRopsten;
            break;

          case 4:
            contractAddress = contractAddressRinkeby;
            break;

          case 5:
            contractAddress = contractAddressGoerli;
            break;

          case 11155111:
            contractAddress = contractAddressSepolia;
            break;

          default:
            throw new Error();
        }

        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );

        const balance = ethers.utils.formatEther(
          await provider.getBalance(contract.address)
        );

        setContract(contract);
        setContractBalance(balance);
        setContractNetwork(await contract.provider.getNetwork());
      } catch (error) {}
    }
  };

  const retrieveSigner = async () => {
    if (ethereumExists()) {
      try {
        const provider = new ethers.providers.Web3Provider(ethereum);

        const signer = await provider.getSigner();

        setSigner(signer);
      } catch (error) {}
    }
  };

  const connectAccount = async () => {
    if (ethereumExists()) {
      try {
        await ethereum.request({
          method: 'eth_requestAccounts',
        });
      } catch (error) {}
    }
  };

  const updateAccount = async () => {
    if (ethereumExists()) {
      try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const network = await provider.getNetwork();

        if (signer) {
          const address = await signer.getAddress();
          const balance = ethers.utils.formatEther(
            await provider.getBalance(address)
          );

          setAccount({
            address,
            balance,
            network: { name: network.name, chainId: network.chainId },
          });

          if (!supportedNetworks.includes(network.chainId)) {
            setErrorMessage(
              `Your wallet is connected to ${network.name} (${network.chainId}) network. This network is not supported.`
            );
          } else {
            setErrorMessage('');
          }
        } else {
        }
      } catch (error) {
        setAccount({
          address: '',
          balance: '',
          network: {
            name: '',
            chainId: 0,
          },
        });
      }
    }
  };

  const donateCrypto = async (amount: string) => {
    if (ethereumExists()) {
      setIsLoading(true);

      try {
        if (signer && contract) {
          const tx = await contract.donate({
            value: ethers.utils.parseEther(amount),
          });

          await listenTransaction(tx, provider!);

          refreshEthereumData();
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  const listenTransaction = (tx: any, provider: ethers.providers.Provider) => {
    return new Promise((resolve, reject) => {
      try {
        provider.once(tx.hash, (receipt) => {
          resolve(receipt);
        });
      } catch (error) {
        reject();
      }
    });
  };

  const init = async () => {
    ethereum.on('chainChanged', refreshEthereumData);
    ethereum.on('accountsChanged', refreshEthereumData);
    refreshEthereumData();
  };

  const refreshEthereumData = () => {
    retrieveProviderData();
    retrieveContract();
    retrieveSigner();
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    updateAccount();
  }, [signer]);

  return (
    <EthereumContext.Provider
      value={{
        isLoading,
        errorMessage,
        provider,
        network,
        contract,
        signer,
        account,
        connectAccount,
        contractNetwork,
        contractBalance,
        donateCrypto,
      }}
    >
      {children}
    </EthereumContext.Provider>
  );
};
