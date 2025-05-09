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
  status: "Waiting campaign completion" | "Awarded";
  typeOfAward: "Campaign Winner" | "Direct Transfer";
  date: Date;
  preview: string;
};
