export type TransactionRecord = {
  position: number;
  username: string;
  wallet: string;
  hash: string;
  transactions: number;
  amount: number;
  registration: Date;
  lastTransaction: Date;
  awarded: number;
};

export type NFTSRecord = {
  username: string;
  wallet: string;
  hash: string;
  status: string;
  typeOfAward: string;
  date: Date;
  preview: string;
  name: string;
  description: string;
  image: string;
};
