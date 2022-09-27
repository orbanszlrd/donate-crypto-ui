type ErrorProps = {
  message: string;
};

type LoaderProps = {
  title: string;
  description: string;
};

type SolidityContractType = {
  abi: any[];
  address: {
    [key: string]: string;
  };
};

type ContractType = {
  address: string;
  owner: string;
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
  loaderProps: LoaderProps | null;
  errorMessage: string;
  signer: SignerType | null;
  donors: string[];
  contract: ContractType | null;
  connectWallet(): void;
  donate(amount: string): void;
  withdraw(): void;
};

type EthereumProviderProps = {
  children: ReactNode;
};
