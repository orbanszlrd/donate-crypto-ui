type ErrorProps = {
  message: string;
};

type AccountType = {
  address: string;
  balance: string;
  network: {
    name: string;
    chainId: number;
  };
};

type EthereumCardProps = {
  account: AccountType;
};

type EthereumContextType = {
  isLoading: boolean;
  errorMessage: string;
  provider: ethers.providers.Provider | null;
  network: ethers.providers.Network | null;
  contract: ethers.Contract | null;
  signer: ethers.Signer | null;
  account: AccountType;
  contractNetwork: ethers.providers.Network | null;
  contractBalance: string;
  connectAccount(): void;
  donateCrypto(amount: string): void;
};

type EthereumProviderProps = {
  children: ReactNode;
};
