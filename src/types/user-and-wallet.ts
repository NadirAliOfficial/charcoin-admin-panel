export enum UserStatus {
  Active = "Active",
  Blocked = "Blocked",
}

export interface UserWallet {
  id: number;
  username: string;
  wallet: string;
  transactions: number;
  balance: number;
  tokens: string;
  registration: Date;
  lastTransaction: Date;
  status: UserStatus;
}
