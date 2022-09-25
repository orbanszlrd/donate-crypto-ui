type ErrorProps = {
  message: string;
};

type SolidityContractType = {
  abi: any[];
  address: {
    [key: string]: string;
  };
};

type ContractType = {
  address: string;
  balance: string;
};

type SignerType = {
  address: string;
  balance: string;
  network: {
    name: string;
    chainId: number;
  };
};

type EthereumCardProps = {
  account: SignerType | null;
};

type EthereumContextType = {
  isLoading: boolean;
  errorMessage: string;
  signer: SignerType | null;
  contract: ContractType | null;
  connectWallet(): void;
  donate(amount: string): void;
};

type EthereumProviderProps = {
  children: ReactNode;
};
