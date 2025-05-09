export enum StakingStatus {
  Active = "Active",
  Completed = "Completed",
  Stopped = "Stopped",
  Pending = "Pending",
  Expired = "Expired",
}

export interface StakedAmount {
  tokens: number;
  usd_value: number;
}

export interface StakingEntry {
    username: string;
    wallet: string;
    staking_id: string;
    staked_amount: number;
    start_date: Date;
    expiration_date: Date;
    staking_duration: number;
    voting_power: number;
    status: "Active" | "Completed" | "Stopped";
}

export interface StakingSummary {
  total_tokens_staked: number;
  staking_profits: number;
  profit_percentage: number;
}

export interface StakingData {
  staking_summary: StakingSummary;
  display_data: string;
  total_records: number;
  staking_data: StakingEntry[];
}
