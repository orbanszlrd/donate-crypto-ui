import { createContext, FunctionComponent, useEffect, useState } from 'react';
import { ethers } from 'ethers';

import {
  donateCrypto,
  ERROR_METAMASK_NOT_INSTALLED,
  ERROR_UNSUPPORTED_NETWORK,
  ethereum,
  supportedNetworks,
} from '../constants';

export const EthereumContext = createContext<EthereumContextType>(
  {} as EthereumContextType
);

export const EthereumProvider: FunctionComponent<EthereumProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loaderProps, setLoaderProps] = useState<LoaderProps | null>(null);

  const [errorMessage, setErrorMessage] = useState('');
  const [ethersProvider, setEthersProvider] =
    useState<ethers.providers.Provider | null>(null);
  const [ethersContract, setEthersContract] = useState<ethers.Contract | null>(
    null
  );
  const [ethersSigner, setEthersSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ContractType | null>(null);
  const [signer, setSigner] = useState<SignerType | null>(null);

  const donate = async (amount: string) => {
    if (ethereumExists()) {
      setIsLoading(true);

      setLoaderProps({
        title: 'Waiting for confirmation',
        description:
          'Transactions have been initiated. Waiting for confirmation.',
      });

      try {
        if (ethersProvider && ethersSigner && ethersContract) {
          const tx = await ethersContract.donate({
            value: ethers.utils.parseEther(amount),
          });

          setLoaderProps({
            title: 'Transaction confirmed',
            description: `You have confirmed to donate ${amount} ETH.`,
          });

          await transactionReceipt(tx, ethersProvider);

          setLoaderProps({
            title: 'Successful transaction',
            description: `You have successfully donated ${amount} ETH. Thank You!`,
          });

          refreshEthereumData();
        }
      } catch (error) {
        setLoaderProps({
          title: 'Transactions rejected',
          description: 'You have rejected the transaction.',
        });
      }

      setTimeout(() => {
        setLoaderProps(null);
        setIsLoading(false);
      }, 2000);
    }
  };

  const transactionReceipt = (
    tx: ethers.Transaction,
    ethersProvider: ethers.providers.Provider
  ) => {
    return new Promise((resolve, reject) => {
      try {
        ethersProvider.once(tx.hash!, (receipt) => {
          resolve(receipt);
        });
      } catch (error) {
        reject();
      }
    });
  };

  const connectWallet = async () => {
    if (ethereumExists()) {
      try {
        await ethereum.request({
          method: 'eth_requestAccounts',
        });
      } catch (error) {}
    }
  };

  const updateSigner = async () => {
    if (ethereumExists()) {
      try {
        const ethersProvider = new ethers.providers.Web3Provider(
          ethereum as any
        );
        const ethersNetwork = await ethersProvider.getNetwork();

        if (ethersSigner) {
          const address = await ethersSigner.getAddress();
          const balance = ethers.utils.formatEther(
            await ethersProvider.getBalance(address)
          );

          setSigner({
            address,
            balance,
            network: {
              name: ethersNetwork.name,
              chainId: ethersNetwork.chainId,
            },
          });

          if (!supportedNetworks.includes(ethersNetwork.chainId)) {
            setErrorMessage(ERROR_UNSUPPORTED_NETWORK);
          } else {
            setErrorMessage('');
          }
        } else {
        }
      } catch (error) {
        setSigner(null);
      }
    }
  };

  const ethereumExists = (): boolean => {
    try {
      if (typeof window.ethereum === 'undefined') {
        setErrorMessage(ERROR_METAMASK_NOT_INSTALLED);
        return false;
      }
    } catch (error: any) {
      return false;
    }

    return true;
  };

  const retrieveEthereumData = async () => {
    if (ethereumExists()) {
      try {
        const ethersProvider = new ethers.providers.Web3Provider(
          ethereum as any
        );
        setEthersProvider(ethersProvider);
        const ethersNetwork = await ethersProvider.getNetwork();
        const ethersSigner = await ethersProvider.getSigner();
        setEthersSigner(ethersSigner);

        if (supportedNetworks.includes(ethersNetwork.chainId)) {
          const ethersContract = new ethers.Contract(
            donateCrypto.address[ethersNetwork.chainId],
            donateCrypto.abi,
            ethersSigner
          );

          setEthersContract(ethersContract);

          const balance = ethers.utils.formatEther(
            await ethersProvider.getBalance(ethersContract.address)
          );

          setContract({ address: ethersContract.address, balance });
        } else {
          setEthersContract(null);
          setContract(null);
        }
      } catch (error) {
        setEthersContract(null);
        setContract(null);
      }
    }
  };

  const refreshEthereumData = () => {
    retrieveEthereumData();
  };

  const init = async () => {
    ethereum.on('chainChanged', refreshEthereumData);
    ethereum.on('accountsChanged', refreshEthereumData);
    refreshEthereumData();
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    updateSigner();
  }, [ethersSigner]);

  return (
    <EthereumContext.Provider
      value={{
        isLoading,
        loaderProps,
        errorMessage,
        contract,
        signer,
        connectWallet,
        donate,
      }}
    >
      {children}
    </EthereumContext.Provider>
  );
};
